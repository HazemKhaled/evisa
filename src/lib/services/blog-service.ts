import "server-only";

/**
 * Blog Service Layer
 *
 * Handles blog post data fetching, filtering, and processing for the travel blog system.
 * Integrates with MDX content processing and multilingual support.
 * Now uses runtime MDX compilation with ISR caching.
 * Server-only module for MDX processing operations.
 */

import {
  getBlogPostsForLocale as getMDXBlogPostsForLocale,
  getBlogPost as getMDXBlogPost,
  getAllUniqueTags as getMDXAllUniqueTags,
  getAllBlogPosts as getMDXAllBlogPosts,
} from "./mdx-service";
import type {
  BlogPostData,
  BlogFilterOptions,
  PaginatedBlogResponse,
} from "../types/blog";

// Re-export types from shared module for application use
export type {
  BlogPostData,
  BlogFilterOptions,
  PaginatedBlogResponse,
} from "../types/blog";

/**
 * Get all blog posts for a specific locale with optional filtering and pagination
 */
export async function getAllBlogPosts(
  locale: string,
  limit?: number
): Promise<BlogPostData[]> {
  try {
    const posts = await getMDXBlogPostsForLocale(locale);

    if (limit) {
      return posts.slice(0, limit);
    }

    return posts;
  } catch {
    // Graceful degradation - return empty array if content unavailable
    return [];
  }
}

/**
 * Get blog posts with advanced filtering and pagination
 */
export async function getBlogPosts(
  options: BlogFilterOptions
): Promise<PaginatedBlogResponse> {
  try {
    const {
      locale,
      limit = 10,
      offset = 0,
      tag,
      destination,
      author,
    } = options;

    let posts = await getMDXBlogPostsForLocale(locale);

    // Apply filters
    if (tag) {
      posts = posts.filter((post: BlogPostData) =>
        post.frontmatter.tags?.some(
          (postTag: string) => postTag.toLowerCase() === tag.toLowerCase()
        )
      );
    }

    if (destination) {
      posts = posts.filter((post: BlogPostData) =>
        post.frontmatter.destinations?.some(
          (dest: string) => dest.toLowerCase() === destination.toLowerCase()
        )
      );
    }

    if (author) {
      posts = posts.filter((post: BlogPostData) =>
        post.frontmatter.author?.toLowerCase().includes(author.toLowerCase())
      );
    }

    // Sort by publication date (newest first)
    posts.sort((a: BlogPostData, b: BlogPostData) => {
      const dateA = new Date(a.frontmatter.publishedAt);
      const dateB = new Date(b.frontmatter.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });

    const total = posts.length;
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor(offset / limit) + 1;
    const hasMore = offset + limit < total;

    // Apply pagination
    const paginatedPosts = posts.slice(offset, offset + limit);

    return {
      posts: paginatedPosts,
      total,
      hasMore,
      currentPage,
      totalPages,
    };
  } catch {
    // Graceful degradation - return empty result set
    return {
      posts: [],
      total: 0,
      hasMore: false,
      currentPage: 1,
      totalPages: 0,
    };
  }
}

/**
 * Get blog posts filtered by destination
 */
export async function getBlogPostsByDestination(
  destination: string,
  locale: string,
  limit?: number
): Promise<BlogPostData[]> {
  try {
    let posts = await getMDXBlogPostsForLocale(locale);

    // Filter by destination (exact match)
    posts = posts.filter((post: BlogPostData) =>
      post.frontmatter.destinations?.some(
        (dest: string) => dest.toLowerCase() === destination.toLowerCase()
      )
    );

    // Sort by publication date (newest first)
    posts.sort((a: BlogPostData, b: BlogPostData) => {
      const dateA = new Date(a.frontmatter.publishedAt);
      const dateB = new Date(b.frontmatter.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });

    if (limit) {
      posts = posts.slice(0, limit);
    }

    return posts;
  } catch {
    // Graceful degradation - return empty array if content unavailable
    return [];
  }
}

/**
 * Get blog posts filtered by tag
 */
export async function getBlogPostsByTag(
  tag: string,
  locale: string,
  limit?: number
): Promise<BlogPostData[]> {
  try {
    let posts = await getMDXBlogPostsForLocale(locale);

    // Filter by tag (case-insensitive partial match)
    posts = posts.filter((post: BlogPostData) =>
      post.frontmatter.tags?.some((postTag: string) =>
        postTag.toLowerCase().includes(tag.toLowerCase())
      )
    );

    // Sort by publication date (newest first)
    posts.sort((a: BlogPostData, b: BlogPostData) => {
      const dateA = new Date(a.frontmatter.publishedAt);
      const dateB = new Date(b.frontmatter.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });

    if (limit) {
      posts = posts.slice(0, limit);
    }

    return posts;
  } catch {
    // Graceful degradation - return empty array if content unavailable
    return [];
  }
}

/**
 * Get related blog posts for destination page integration
 */
export async function getRelatedBlogPosts(
  destination: string,
  locale: string,
  limit: number = 3
): Promise<BlogPostData[]> {
  try {
    const posts = await getMDXBlogPostsForLocale(locale);

    // Filter by destination - prioritize exact destination matches
    const destinationPosts = posts.filter((post: BlogPostData) =>
      post.frontmatter.destinations?.some(
        (dest: string) => dest.toLowerCase() === destination.toLowerCase()
      )
    );

    // Sort destination posts by publication date (newest first)
    destinationPosts.sort((a: BlogPostData, b: BlogPostData) => {
      const dateA = new Date(a.frontmatter.publishedAt);
      const dateB = new Date(b.frontmatter.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });

    // If we have any destination-specific posts, return them first
    if (destinationPosts.length > 0) {
      return destinationPosts.slice(
        0,
        Math.min(limit, destinationPosts.length)
      );
    }

    // Only if no destination-specific posts exist, fallback to general travel posts
    const generalPosts = posts.filter((post: BlogPostData) => {
      const hasGeneralTags = post.frontmatter.tags?.some((tag: string) =>
        ["travel", "visa", "guide", "tips"].includes(tag.toLowerCase())
      );
      const isNotDestinationSpecific =
        !post.frontmatter.destinations?.length ||
        post.frontmatter.destinations.length === 0;

      return hasGeneralTags || isNotDestinationSpecific;
    });

    // Sort general posts by publication date (newest first)
    generalPosts.sort((a: BlogPostData, b: BlogPostData) => {
      const dateA = new Date(a.frontmatter.publishedAt);
      const dateB = new Date(b.frontmatter.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });

    return generalPosts.slice(0, limit);
  } catch {
    // Graceful degradation - return empty array if content unavailable
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(
  slug: string,
  locale: string
): Promise<BlogPostData | null> {
  try {
    return await getMDXBlogPost(locale, slug);
  } catch {
    // Graceful degradation - return null if content unavailable
    return null;
  }
}

/**
 * Get all unique tags from all blog posts for a locale
 */
export async function getAllTagsForLocale(locale: string): Promise<string[]> {
  try {
    const posts = await getMDXBlogPostsForLocale(locale);
    const allTags = posts.flatMap(
      (post: BlogPostData) => post.frontmatter.tags || []
    );
    const uniqueTags = [...new Set(allTags)];

    return (uniqueTags as string[]).sort();
  } catch {
    // Graceful degradation - return empty array if content unavailable
    return [];
  }
}

/**
 * Get all unique destinations from all blog posts for a locale
 */
export async function getAllDestinationsForLocale(
  locale: string
): Promise<string[]> {
  try {
    const posts = await getMDXBlogPostsForLocale(locale);
    const allDestinations = posts.flatMap(
      (post: BlogPostData) => post.frontmatter.destinations || []
    );
    const uniqueDestinations = [...new Set(allDestinations)];

    return (uniqueDestinations as string[]).sort();
  } catch {
    // Graceful degradation - return empty array if content unavailable
    return [];
  }
}

/**
 * Search blog posts by text content (title, description, content)
 */
export async function searchBlogPosts(
  query: string,
  locale: string,
  limit?: number
): Promise<BlogPostData[]> {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    let posts = await getMDXBlogPostsForLocale(locale);

    // Search in title, description, and content
    posts = posts.filter((post: BlogPostData) => {
      const title = post.frontmatter.title?.toLowerCase() || "";
      const description = post.frontmatter.description?.toLowerCase() || "";
      const content = post.content?.toLowerCase() || "";
      const tags = (post.frontmatter.tags || []).join(" ").toLowerCase();

      return (
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        content.includes(searchTerm) ||
        tags.includes(searchTerm)
      );
    });

    // Sort by relevance (title matches first, then description, then content)
    posts.sort((a: BlogPostData, b: BlogPostData) => {
      const aTitle = a.frontmatter.title?.toLowerCase() || "";
      const bTitle = b.frontmatter.title?.toLowerCase() || "";
      const aDesc = a.frontmatter.description?.toLowerCase() || "";
      const bDesc = b.frontmatter.description?.toLowerCase() || "";

      // Prioritize exact title matches
      if (aTitle.includes(searchTerm) && !bTitle.includes(searchTerm))
        return -1;
      if (!aTitle.includes(searchTerm) && bTitle.includes(searchTerm)) return 1;

      // Then prioritize description matches
      if (aDesc.includes(searchTerm) && !bDesc.includes(searchTerm)) return -1;
      if (!aDesc.includes(searchTerm) && bDesc.includes(searchTerm)) return 1;

      // Finally sort by publication date
      const dateA = new Date(a.frontmatter.publishedAt);
      const dateB = new Date(b.frontmatter.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });

    if (limit) {
      posts = posts.slice(0, limit);
    }

    return posts;
  } catch {
    // Graceful degradation - return empty array if search fails
    return [];
  }
}

/**
 * Get featured blog posts (posts marked with featured tag or most popular)
 */
export async function getFeaturedBlogPosts(
  locale: string,
  limit: number = 5
): Promise<BlogPostData[]> {
  try {
    const posts = await getMDXBlogPostsForLocale(locale);

    // First, try to get posts with 'featured' tag
    const featuredPosts = posts.filter((post: BlogPostData) =>
      post.frontmatter.tags?.some(
        (tag: string) => tag.toLowerCase() === "featured"
      )
    );

    // If we have any featured posts, prioritize them
    if (featuredPosts.length > 0) {
      featuredPosts.sort((a: BlogPostData, b: BlogPostData) => {
        const dateA = new Date(a.frontmatter.publishedAt);
        const dateB = new Date(b.frontmatter.publishedAt);
        return dateB.getTime() - dateA.getTime();
      });
      return featuredPosts.slice(0, limit);
    }

    // Only if no featured posts exist, fallback to most recent posts
    posts.sort((a: BlogPostData, b: BlogPostData) => {
      const dateA = new Date(a.frontmatter.publishedAt);
      const dateB = new Date(b.frontmatter.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });

    return posts.slice(0, limit);
  } catch {
    // Graceful degradation - return empty array if content unavailable
    return [];
  }
}

/**
 * Get a single blog post by slug and locale (runtime version using MDX service)
 */
export async function getBlogPost(
  slug: string,
  locale: string
): Promise<BlogPostData | null> {
  try {
    if (!slug || !locale) {
      console.warn(`Invalid parameters: slug="${slug}", locale="${locale}"`);
      return null;
    }

    return await getMDXBlogPost(locale, slug);
  } catch (error) {
    console.error(
      `Error fetching blog post ${slug} for locale ${locale}:`,
      error
    );
    return null;
  }
}

/**
 * Get all blog posts for a specific locale (runtime version using MDX service)
 */
export async function getBlogPostsForLocale(
  locale: string
): Promise<BlogPostData[]> {
  try {
    if (!locale) {
      console.warn(`Invalid locale parameter: "${locale}"`);
      return [];
    }

    return await getAllBlogPosts(locale);
  } catch (error) {
    console.error(`Error fetching blog posts for locale ${locale}:`, error);
    return [];
  }
}

/**
 * Get all blog post slugs for generateStaticParams
 */
export function getAllBlogPostSlugs(): { locale: string; slug: string }[] {
  try {
    return getMDXAllBlogPosts();
  } catch {
    return [];
  }
}

/**
 * Get all unique tags across all locales for generateStaticParams
 */
export async function getAllUniqueTagsAcrossLocales(): Promise<string[]> {
  try {
    return await getMDXAllUniqueTags();
  } catch {
    return [];
  }
}

/**
 * Get blog posts for a specific locale (alias for getBlogPostsForLocale for sitemap compatibility)
 */
export async function getBlogDataForLocale(
  locale: string
): Promise<BlogPostData[]> {
  return getBlogPostsForLocale(locale);
}
