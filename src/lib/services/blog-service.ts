/**
 * Blog Service Layer
 *
 * Handles blog post data fetching, filtering, and processing for the travel blog system.
 * Integrates with MDX content processing and multilingual support.
 */

import { getGeneratedBlogPostsForLocale } from "@/lib/generated-blog-data";
import type {
  BlogPostData,
  BlogFilterOptions,
  PaginatedBlogResponse,
} from "../types/blog";
import { languages } from "@/app/i18n/settings";

// Re-export types from shared module for application use
export type {
  BlogPostData,
  BlogFilterOptions,
  PaginatedBlogResponse,
} from "../types/blog";

/**
 * Get all blog posts for a specific locale with optional filtering and pagination
 */
export function getAllBlogPosts(
  locale: string,
  limit?: number
): BlogPostData[] {
  try {
    const posts = getGeneratedBlogPostsForLocale(locale);

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
export function getBlogPosts(
  options: BlogFilterOptions
): PaginatedBlogResponse {
  try {
    const {
      locale,
      limit = 10,
      offset = 0,
      tag,
      destination,
      author,
    } = options;

    let posts = getGeneratedBlogPostsForLocale(locale);

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
export function getBlogPostsByDestination(
  destination: string,
  locale: string,
  limit?: number
): BlogPostData[] {
  try {
    let posts = getGeneratedBlogPostsForLocale(locale);

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
export function getBlogPostsByTag(
  tag: string,
  locale: string,
  limit?: number
): BlogPostData[] {
  try {
    let posts = getGeneratedBlogPostsForLocale(locale);

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
export function getRelatedBlogPosts(
  destination: string,
  locale: string,
  limit: number = 3
): BlogPostData[] {
  try {
    const posts = getGeneratedBlogPostsForLocale(locale);

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
export function getBlogPostBySlug(
  slug: string,
  locale: string
): BlogPostData | null {
  try {
    const posts = getGeneratedBlogPostsForLocale(locale);
    const post = posts.find((p: BlogPostData) => p.slug === slug);

    return post || null;
  } catch {
    // Graceful degradation - return null if content unavailable
    return null;
  }
}

/**
 * Get all unique tags from all blog posts for a locale
 */
export function getAllTagsForLocale(locale: string): string[] {
  try {
    const posts = getGeneratedBlogPostsForLocale(locale);
    const allTags = posts.flatMap(
      (post: BlogPostData) => post.frontmatter.tags || []
    );
    const uniqueTags = [...new Set(allTags)];

    return uniqueTags.sort();
  } catch {
    // Graceful degradation - return empty array if content unavailable
    return [];
  }
}

/**
 * Get all unique destinations from all blog posts for a locale
 */
export function getAllDestinationsForLocale(locale: string): string[] {
  try {
    const posts = getGeneratedBlogPostsForLocale(locale);
    const allDestinations = posts.flatMap(
      (post: BlogPostData) => post.frontmatter.destinations || []
    );
    const uniqueDestinations = [...new Set(allDestinations)];

    return uniqueDestinations.sort();
  } catch {
    // Graceful degradation - return empty array if content unavailable
    return [];
  }
}

/**
 * Search blog posts by text content (title, description, content)
 */
export function searchBlogPosts(
  query: string,
  locale: string,
  limit?: number
): BlogPostData[] {
  try {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    let posts = getGeneratedBlogPostsForLocale(locale);

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
export function getFeaturedBlogPosts(
  locale: string,
  limit: number = 5
): BlogPostData[] {
  try {
    const posts = getGeneratedBlogPostsForLocale(locale);

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
 * Get a single blog post by slug and locale (runtime version using generated data)
 */
export function getBlogPost(slug: string, locale: string): BlogPostData | null {
  return getBlogPostBySlug(slug, locale);
}

/**
 * Get all blog posts for a specific locale (runtime version using generated data)
 */
export function getBlogPostsForLocale(locale: string): BlogPostData[] {
  return getAllBlogPosts(locale);
}

/**
 * Get all blog post slugs for generateStaticParams
 */
export function getAllBlogPostSlugs(): { locale: string; slug: string }[] {
  try {
    const allSlugs: { locale: string; slug: string }[] = [];

    for (const locale of languages) {
      const posts = getAllBlogPosts(locale);
      for (const post of posts) {
        allSlugs.push({ locale, slug: post.slug });
      }
    }

    return allSlugs;
  } catch {
    return [];
  }
}

/**
 * Get all unique tags across all locales for generateStaticParams
 */
export function getAllUniqueTagsAcrossLocales(): string[] {
  try {
    const allTags = new Set<string>();

    for (const locale of languages) {
      const localeTags = getAllTagsForLocale(locale);
      localeTags.forEach(tag => allTags.add(tag));
    }

    return Array.from(allTags).sort();
  } catch {
    return [];
  }
}

/**
 * Get all blog posts across all locales with locale information
 */
export function getAllBlogPostsAcrossLocales(): (BlogPostData & {
  locale: string;
})[] {
  try {
    const allPosts: (BlogPostData & { locale: string })[] = [];

    for (const locale of languages) {
      const localePosts = getAllBlogPosts(locale);
      localePosts.forEach(post => {
        allPosts.push({ ...post, locale });
      });
    }

    return allPosts;
  } catch {
    return [];
  }
}

/**
 * Get blog posts for a specific locale (alias for getBlogPostsForLocale for sitemap compatibility)
 */
export function getBlogDataForLocale(locale: string): BlogPostData[] {
  return getBlogPostsForLocale(locale);
}
