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

// Runtime cache for compiled MDX content
const mdxCache = new Map<string, BlogPostData>();
const tagsCache = new Map<string, string[]>();
const allPostsCache = new Map<string, { locale: string; slug: string }[]>();

// Cache TTL in milliseconds (1 hour for development, can be adjusted for production)
const CACHE_TTL = 60 * 60 * 1000;
const cacheTimestamps = new Map<string, number>();

/**
 * Generate cache key for blog post
 */
function getCacheKey(locale: string, slug?: string): string {
  return slug ? `${locale}:${slug}` : `${locale}:all`;
}

/**
 * Check if cache entry is still valid
 */
function isCacheValid(key: string): boolean {
  const timestamp = cacheTimestamps.get(key);
  if (!timestamp) return false;
  return Date.now() - timestamp < CACHE_TTL;
}

/**
 * Set cache entry with timestamp
 */
function setCacheEntry<T>(key: string, value: T, cache: Map<string, T>): void {
  cache.set(key, value);
  cacheTimestamps.set(key, Date.now());
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

    return {
      content,
      slug,
      frontmatter: frontmatter as BlogPostData["frontmatter"],
    };
  } catch (error) {
    console.error(`Error parsing MDX file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all blog posts for a specific locale with caching
 */
export async function getBlogPostsForLocale(
  locale: string
): Promise<BlogPostData[]> {
  const cacheKey = getCacheKey(locale);

  // Check cache first
  if (isCacheValid(cacheKey) && mdxCache.has(cacheKey)) {
    return [mdxCache.get(cacheKey)!].filter(Boolean);
  }

  const blogDir = getBlogDirectory(locale);
  const blogPosts: BlogPostData[] = [];

  try {
    // Check if directory exists
    if (!fs.existsSync(blogDir)) {
      console.warn(`Blog directory does not exist for locale: ${locale}`);
      return [];
    }

    const files = fs.readdirSync(blogDir).filter(file => file.endsWith(".mdx"));

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
        const postCacheKey = getCacheKey(locale, result.slug);
        setCacheEntry(postCacheKey, result, mdxCache);
      }
    }

    // Sort by publication date (newest first)
    blogPosts.sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );

    return blogPosts;
  } catch (error) {
    console.error(`Error reading blog posts for locale ${locale}:`, error);
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
  const cacheKey = getCacheKey(locale, slug);

  // Check cache first
  if (isCacheValid(cacheKey) && mdxCache.has(cacheKey)) {
    return mdxCache.get(cacheKey) || null;
  }

  const blogDir = getBlogDirectory(locale);
  const filePath = path.join(blogDir, `${slug}.mdx`);

  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const post = await parseMDXFile(filePath, slug);

    if (post) {
      setCacheEntry(cacheKey, post, mdxCache);
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
  const cacheKey = "all-tags";

  // Check cache first
  if (isCacheValid(cacheKey) && tagsCache.has(cacheKey)) {
    return tagsCache.get(cacheKey)!;
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
  setCacheEntry(cacheKey, uniqueTags, tagsCache);

  return uniqueTags;
}

/**
 * Get all blog posts across all locales for generateStaticParams
 */
export function getAllBlogPosts(): { locale: string; slug: string }[] {
  const cacheKey = "all-posts";

  // Check cache first
  if (isCacheValid(cacheKey) && allPostsCache.has(cacheKey)) {
    return allPostsCache.get(cacheKey)!;
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

  setCacheEntry(cacheKey, allPosts, allPostsCache);
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
export function invalidateCache(locale?: string, slug?: string): void {
  if (locale && slug) {
    const cacheKey = getCacheKey(locale, slug);
    mdxCache.delete(cacheKey);
    cacheTimestamps.delete(cacheKey);
  } else if (locale) {
    // Clear all entries for a locale
    const keys = Array.from(mdxCache.keys()).filter(key =>
      key.startsWith(`${locale}:`)
    );
    for (const key of keys) {
      mdxCache.delete(key);
      cacheTimestamps.delete(key);
    }
  } else {
    // Clear all caches
    mdxCache.clear();
    tagsCache.clear();
    allPostsCache.clear();
    cacheTimestamps.clear();
  }
}

/**
 * Get cache statistics for monitoring
 */
export function getCacheStats() {
  return {
    mdxCacheSize: mdxCache.size,
    tagsCacheSize: tagsCache.size,
    allPostsCacheSize: allPostsCache.size,
    totalCacheEntries: mdxCache.size + tagsCache.size + allPostsCache.size,
  };
}
