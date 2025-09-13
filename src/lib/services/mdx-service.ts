import "server-only";

/**
 * MDX Service Layer
 *
 * Handles runtime MDX compilation, caching, and ISR-compatible data fetching.
 * This service replaces build-time generation with on-demand processing.
 * Server-only module for Node.js filesystem operations.
 */

import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import { validateBlogPost } from "../blog-validation";
import { type BlogPostData } from "../types/blog";
import { languages } from "@/app/i18n/settings";

// Cloudflare Cache API configuration
const CACHE_NAME = "mdx-service-cache";
const CACHE_TTL = 60 * 60; // 1 hour in seconds for Cache-Control header

// Type for global cache fallback (development only)
declare global {
  var __mdx_cache:
    | Map<string, { data: unknown; timestamp: number }>
    | undefined;
}

/**
 * Get Cloudflare Cache API instance
 * In production (Cloudflare Workers), uses caches.default or named cache
 * In development, uses a simple in-memory fallback
 */
async function getCache(): Promise<Cache> {
  // Check if we're in Cloudflare Workers environment
  if (typeof caches !== "undefined") {
    // Use named cache for better organization
    return await caches.open(CACHE_NAME);
  }

  // Development fallback - simple in-memory cache
  if (typeof global !== "undefined") {
    if (!global.__mdx_cache) {
      global.__mdx_cache = new Map();
    }

    // Return a Cache-like interface for development
    return {
      async match(request: RequestInfo | URL): Promise<Response | undefined> {
        const key =
          request instanceof Request ? request.url : request.toString();
        const cached = global.__mdx_cache?.get(key);
        if (!cached) return undefined;

        const { data, timestamp } = cached;
        if (Date.now() - timestamp > CACHE_TTL * 1000) {
          global.__mdx_cache?.delete(key);
          return undefined;
        }

        return new Response(JSON.stringify(data), {
          headers: {
            "content-type": "application/json",
            "cache-control": `public, max-age=${CACHE_TTL}`,
          },
        });
      },

      async put(request: RequestInfo | URL, response: Response): Promise<void> {
        const key =
          request instanceof Request ? request.url : request.toString();
        // Clone the response to read its data
        const responseClone = response.clone();
        const data = await responseClone.json();
        global.__mdx_cache?.set(key, { data, timestamp: Date.now() });
      },

      async delete(request: RequestInfo | URL): Promise<boolean> {
        const key =
          request instanceof Request ? request.url : request.toString();
        return global.__mdx_cache?.delete(key) || false;
      },
    } as Cache;
  }

  throw new Error("Cache API not available");
}

/**
 * Generate cache key URL for blog post
 * Uses a consistent URL pattern that works well with Cloudflare Cache API
 */
function getCacheKey(
  locale: string,
  slug?: string,
  type: string = "post"
): string {
  const baseKey = slug ? `${locale}/${slug}` : `${locale}/all`;
  // Use a consistent domain that won't conflict with actual requests
  return `https://mdx-cache.internal/${type}/${baseKey}`;
}

/**
 * Get data from Cloudflare Cache
 */
async function getFromCache<T>(cacheKey: string): Promise<T | null> {
  try {
    const cache = await getCache();
    const request = new Request(cacheKey, { method: "GET" });
    const response = await cache.match(request);

    if (!response) {
      return null;
    }

    // Parse the cached JSON data
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.warn("Cache read error:", error);
    return null;
  }
}

/**
 * Set data in Cloudflare Cache
 */
async function setInCache<T>(cacheKey: string, data: T): Promise<void> {
  try {
    const cache = await getCache();
    const request = new Request(cacheKey, { method: "GET" });

    // Create response with proper headers for caching
    const response = new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": `public, max-age=${CACHE_TTL}`,
        // Add ETag for better cache validation
        etag: `"${Date.now()}"`,
        "last-modified": new Date().toUTCString(),
      },
    });

    // Store in cache - cache.put handles cloning internally
    await cache.put(request, response);
  } catch (error) {
    console.warn("Cache write error:", error);
  }
}

/**
 * Get the blog content directory for a locale
 */
function getBlogDirectory(locale: string): string {
  return path.join(process.cwd(), "src", "contents", locale, "blog");
}

/**
 * Read and parse a single MDX file
 */
async function parseMDXFile(
  filePath: string,
  slug: string
): Promise<BlogPostData | null> {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContent);

    // Validate the blog post
    const validationResult = validateBlogPost(frontmatter, content, slug);
    if (!validationResult.isValid) {
      console.warn(`Invalid blog post: ${slug}`, validationResult.errors);
      return null;
    }

    // For now, store the raw content and handle compilation at render time
    // This avoids build-time compilation issues and allows for better error handling
    let compiledContent: string;
    try {
      // Store raw content - we'll compile at render time for better flexibility
      compiledContent = content;
    } catch (compilationError) {
      console.error(`MDX processing failed for ${slug}:`, compilationError);
      // Fallback to raw content if processing fails
      compiledContent = content;
    }

    return {
      content: compiledContent,
      slug,
      frontmatter: frontmatter as BlogPostData["frontmatter"],
      // Store original raw content for fallback scenarios
      rawContent: content,
    };
  } catch (error) {
    console.error(`Error parsing MDX file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all blog posts for a specific locale with proper caching
 */
export async function getBlogPostsForLocale(
  locale: string
): Promise<BlogPostData[]> {
  const cacheKey = getCacheKey(locale, undefined, "posts-list");

  // Check cache first
  const cachedPosts = await getFromCache<BlogPostData[]>(cacheKey);
  if (cachedPosts) {
    return cachedPosts;
  }

  const blogDir = getBlogDirectory(locale);
  const blogPosts: BlogPostData[] = [];

  try {
    // Check if directory exists
    if (!fs.existsSync(blogDir)) {
      console.warn(`Blog directory does not exist for locale: ${locale}`);
      await setInCache(cacheKey, []);
      return [];
    }

    const files = fs.readdirSync(blogDir).filter(file => file.endsWith(".mdx"));

    if (files.length === 0) {
      console.warn(
        `No MDX files found in blog directory for locale: ${locale}`
      );
      await setInCache(cacheKey, []);
      return [];
    }

    // Process files in parallel for better performance
    const parsePromises = files.map(async file => {
      const slug = file.replace(".mdx", "");
      const filePath = path.join(blogDir, file);
      return parseMDXFile(filePath, slug);
    });

    const results = await Promise.all(parsePromises);

    // Filter out null results and add to array
    for (const result of results) {
      if (result) {
        blogPosts.push(result);
        // Cache individual posts
        const postCacheKey = getCacheKey(locale, result.slug, "post");
        await setInCache(postCacheKey, result);
      }
    }

    // Sort by publication date (newest first)
    blogPosts.sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );

    // Cache the sorted posts list
    await setInCache(cacheKey, blogPosts);

    return blogPosts;
  } catch (error) {
    console.error(`Error reading blog posts for locale ${locale}:`, error);
    await setInCache(cacheKey, []);
    return [];
  }
}

/**
 * Get a specific blog post by locale and slug
 */
export async function getBlogPost(
  locale: string,
  slug: string
): Promise<BlogPostData | null> {
  const cacheKey = getCacheKey(locale, slug, "post");

  // Check cache first
  const cachedPost = await getFromCache<BlogPostData>(cacheKey);
  if (cachedPost) {
    return cachedPost;
  }

  const blogDir = getBlogDirectory(locale);
  const filePath = path.join(blogDir, `${slug}.mdx`);

  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const post = await parseMDXFile(filePath, slug);

    if (post) {
      await setInCache(cacheKey, post);
    }

    return post;
  } catch (error) {
    console.error(`Error reading blog post ${locale}/${slug}:`, error);
    return null;
  }
}

/**
 * Get all unique tags from all blog posts across all locales
 */
export async function getAllUniqueTags(): Promise<string[]> {
  const cacheKey = getCacheKey("all", undefined, "tags");

  // Check cache first
  const cachedTags = await getFromCache<string[]>(cacheKey);
  if (cachedTags) {
    return cachedTags;
  }

  const allTags = new Set<string>();

  // Get tags from all locales
  const tagPromises = languages.map(async locale => {
    const posts = await getBlogPostsForLocale(locale);
    return posts.flatMap(post => post.frontmatter.tags || []);
  });

  const results = await Promise.all(tagPromises);

  // Combine all tags
  for (const tags of results) {
    for (const tag of tags) {
      allTags.add(tag);
    }
  }

  const uniqueTags = Array.from(allTags).sort();
  await setInCache(cacheKey, uniqueTags);

  return uniqueTags;
}

/**
 * Get all blog posts across all locales for generateStaticParams
 */
export async function getAllBlogPosts(): Promise<
  { locale: string; slug: string }[]
> {
  const cacheKey = getCacheKey("all", undefined, "all-posts");

  // Check cache first
  const cachedAllPosts =
    await getFromCache<{ locale: string; slug: string }[]>(cacheKey);
  if (cachedAllPosts) {
    return cachedAllPosts;
  }

  const allPosts: { locale: string; slug: string }[] = [];

  for (const locale of languages) {
    const blogDir = getBlogDirectory(locale);

    try {
      if (!fs.existsSync(blogDir)) {
        continue;
      }

      const files = fs
        .readdirSync(blogDir)
        .filter(file => file.endsWith(".mdx"));

      for (const file of files) {
        const slug = file.replace(".mdx", "");
        allPosts.push({ locale, slug });
      }
    } catch (error) {
      console.error(
        `Error reading blog directory for locale ${locale}:`,
        error
      );
    }
  }

  await setInCache(cacheKey, allPosts);
  return allPosts;
}

/**
 * Compile MDX content to React component (for runtime usage)
 */
export async function compileMDX(content: string): Promise<string> {
  try {
    const compiled = await compile(content, {
      outputFormat: "function-body",
      development: process.env.NODE_ENV === "development",
    });

    return String(compiled);
  } catch (error) {
    console.error("Error compiling MDX:", error);
    throw new Error("Failed to compile MDX content");
  }
}

/**
 * Invalidate cache for a specific entry or all entries
 */
export async function invalidateCache(
  locale?: string,
  slug?: string
): Promise<void> {
  try {
    const cache = await getCache();

    if (locale && slug) {
      // Invalidate specific post
      const cacheKey = getCacheKey(locale, slug, "post");
      const request = new Request(cacheKey);
      await cache.delete(request);
    } else if (locale) {
      // For Cloudflare Cache API, we need to manually track and delete entries
      // In a real implementation, you might want to use a different strategy
      // like cache tags or structured keys for bulk invalidation

      // Invalidate posts list for locale
      const postsListKey = getCacheKey(locale, undefined, "posts-list");
      await cache.delete(new Request(postsListKey));

      // Note: Cloudflare Cache API doesn't support wildcard deletion
      // In production, consider using cache tags or a different approach
      console.warn(
        `Cache invalidation for locale ${locale} completed for known keys only`
      );
    } else {
      // Clear all caches - this is limited in Cloudflare Cache API
      // You would need to track cache keys separately for bulk deletion
      console.warn(
        "Full cache invalidation not fully supported with Cloudflare Cache API"
      );
    }
  } catch (error) {
    console.warn("Cache invalidation error:", error);
  }
}

/**
 * Get cache statistics for monitoring
 */
export function getCacheStats() {
  return {
    message: "Cache statistics not available with Cloudflare Cache API",
    note: "Use Cloudflare dashboard or analytics for cache metrics",
    cacheType: "Cloudflare Cache API",
    fallbackInMemory:
      typeof global !== "undefined" && Boolean(global.__mdx_cache),
  };
}
