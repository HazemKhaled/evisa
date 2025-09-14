import "server-only";

/**
 * Database-Driven Blog Service Layer
 *
 * Replaces MDX-based blog service with database queries using Drizzle ORM.
 * Provides the same interface but fetches data from blog_posts and blog_posts_i18n tables.
 * Server-only module for database operations.
 */

import { getDb } from "@/lib/db";
import {
  blogPosts,
  blogPostsI18n,
  blogTags,
  blogPostTags,
} from "@/lib/db/schema/blog-posts";
import { eq, and, desc, like, inArray, sql, count } from "drizzle-orm";
import type {
  BlogPostData,
  BlogFilterOptions,
  PaginatedBlogResponse,
} from "../types/blog";

/**
 * Convert database result to BlogPostData interface
 */
function convertDbToBlogPostData(
  post: unknown,
  i18nContent: unknown,
  tags: string[] = []
): BlogPostData {
  const postRecord = post as Record<string, unknown>;
  const i18nRecord = i18nContent as Record<string, unknown>;
  return {
    slug: String(postRecord.slug),
    content: String(i18nRecord.content),
    frontmatter: {
      title: String(i18nRecord.title),
      description: String(i18nRecord.description),
      destinations: postRecord.destinations
        ? String(postRecord.destinations).split(",")
        : [],
      image: postRecord.image ? String(postRecord.image) : "",
      tags,
      passport: postRecord.passports ? String(postRecord.passports) : undefined,
      related_visas: postRecord.passports
        ? String(postRecord.passports).split(",")
        : [],
      author: String(postRecord.author),
      publishedAt: new Date(
        postRecord.publishedAt as string | Date
      ).toISOString(),
      lastUpdated: postRecord.updatedAt
        ? new Date(postRecord.updatedAt as string | Date).toISOString()
        : undefined,
    },
    rawContent: String(i18nRecord.content),
  };
}

/**
 * Get all blog post slugs across all locales for generateStaticParams
 */
export async function getAllBlogPostSlugs(): Promise<
  { locale: string; slug: string }[]
> {
  try {
    const db = await getDb();
    const results = await db
      .select({
        locale: blogPostsI18n.locale,
        slug: blogPosts.slug,
      })
      .from(blogPosts)
      .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
      .where(eq(blogPosts.isPublished, true));

    return results;
  } catch (error) {
    console.error("Error fetching blog post slugs:", error);
    return [];
  }
}

/**
 * Get all blog posts for a specific locale with optional limit
 */
export async function getAllBlogPosts(
  locale: string,
  limit?: number
): Promise<BlogPostData[]> {
  try {
    const db = await getDb();
    const query = db
      .select({
        post: blogPosts,
        i18n: blogPostsI18n,
      })
      .from(blogPosts)
      .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
      .where(
        and(eq(blogPostsI18n.locale, locale), eq(blogPosts.isPublished, true))
      )
      .orderBy(desc(blogPosts.publishedAt));

    const results = limit ? await query.limit(limit) : await query;

    // Get tags for each post
    const blogPostsWithTags = await Promise.all(
      results.map(async result => {
        const postTags = await (await getDb())
          .select({ tagSlug: blogTags.slug })
          .from(blogPostTags)
          .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
          .where(eq(blogPostTags.postId, result.post.id));

        const tags = postTags.map(tag => tag.tagSlug);
        return convertDbToBlogPostData(result.post, result.i18n, tags);
      })
    );

    return blogPostsWithTags;
  } catch (error) {
    console.error("Error fetching all blog posts:", error);
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
    const db = await getDb();
    const {
      locale,
      limit = 10,
      offset = 0,
      tag,
      destination,
      author,
    } = options;

    const whereConditions = [
      eq(blogPostsI18n.locale, locale),
      eq(blogPosts.isPublished, true),
    ];

    // Add destination filter
    if (destination) {
      whereConditions.push(like(blogPosts.destinations, `%${destination}%`));
    }

    // Add author filter
    if (author) {
      whereConditions.push(like(blogPosts.author, `%${author}%`));
    }

    // Handle tag filtering separately since it requires a join
    let results;
    if (tag) {
      const tagQuery = db
        .select({
          post: blogPosts,
          i18n: blogPostsI18n,
        })
        .from(blogPosts)
        .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
        .innerJoin(blogPostTags, eq(blogPosts.id, blogPostTags.postId))
        .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
        .where(and(...whereConditions, eq(blogTags.slug, tag)));
      results = await tagQuery
        .orderBy(desc(blogPosts.publishedAt))
        .limit(limit || 50)
        .offset(offset || 0);
    } else {
      const baseQuery = db
        .select({
          post: blogPosts,
          i18n: blogPostsI18n,
        })
        .from(blogPosts)
        .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
        .where(and(...whereConditions));
      results = await baseQuery
        .orderBy(desc(blogPosts.publishedAt))
        .limit(limit || 50)
        .offset(offset || 0);
    }

    // Get total count
    const totalQuery = tag
      ? db
          .select({ count: count() })
          .from(blogPosts)
          .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
          .innerJoin(blogPostTags, eq(blogPosts.id, blogPostTags.postId))
          .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
          .where(and(...whereConditions, eq(blogTags.slug, tag)))
      : db
          .select({ count: count() })
          .from(blogPosts)
          .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
          .where(and(...whereConditions));

    const totalResults = await totalQuery;

    const total = totalResults[0].count;
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor(offset / limit) + 1;
    const hasMore = offset + limit < total;

    // Get tags for each post
    const blogPostsWithTags = await Promise.all(
      results.map(async result => {
        const postTags = await (await getDb())
          .select({ tagSlug: blogTags.slug })
          .from(blogPostTags)
          .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
          .where(eq(blogPostTags.postId, result.post.id));

        const tags = postTags.map(tag => tag.tagSlug);
        return convertDbToBlogPostData(result.post, result.i18n, tags);
      })
    );

    return {
      posts: blogPostsWithTags,
      total,
      hasMore,
      currentPage,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching blog posts with filters:", error);
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
    const db = await getDb();
    const query = db
      .select({
        post: blogPosts,
        i18n: blogPostsI18n,
      })
      .from(blogPosts)
      .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
      .where(
        and(
          eq(blogPostsI18n.locale, locale),
          eq(blogPosts.isPublished, true),
          like(blogPosts.destinations, `%${destination}%`)
        )
      )
      .orderBy(desc(blogPosts.publishedAt));

    const results = limit ? await query.limit(limit) : await query;

    // Get tags for each post
    const blogPostsWithTags = await Promise.all(
      results.map(async result => {
        const postTags = await (await getDb())
          .select({ tagSlug: blogTags.slug })
          .from(blogPostTags)
          .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
          .where(eq(blogPostTags.postId, result.post.id));

        const tags = postTags.map(tag => tag.tagSlug);
        return convertDbToBlogPostData(result.post, result.i18n, tags);
      })
    );

    return blogPostsWithTags;
  } catch (error) {
    console.error("Error fetching blog posts by destination:", error);
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
    const db = await getDb();
    const query = db
      .select({
        post: blogPosts,
        i18n: blogPostsI18n,
      })
      .from(blogPosts)
      .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
      .innerJoin(blogPostTags, eq(blogPosts.id, blogPostTags.postId))
      .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
      .where(
        and(
          eq(blogPostsI18n.locale, locale),
          eq(blogPosts.isPublished, true),
          eq(blogTags.slug, tag)
        )
      )
      .orderBy(desc(blogPosts.publishedAt));

    const results = limit ? await query.limit(limit) : await query;

    // Get tags for each post
    const blogPostsWithTags = await Promise.all(
      results.map(async result => {
        const postTags = await (await getDb())
          .select({ tagSlug: blogTags.slug })
          .from(blogPostTags)
          .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
          .where(eq(blogPostTags.postId, result.post.id));

        const tags = postTags.map(tag => tag.tagSlug);
        return convertDbToBlogPostData(result.post, result.i18n, tags);
      })
    );

    return blogPostsWithTags;
  } catch (error) {
    console.error("Error fetching blog posts by tag:", error);
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
    const db = await getDb();
    // First try destination-specific posts
    let results = await db
      .select({
        post: blogPosts,
        i18n: blogPostsI18n,
      })
      .from(blogPosts)
      .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
      .where(
        and(
          eq(blogPostsI18n.locale, locale),
          eq(blogPosts.isPublished, true),
          like(blogPosts.destinations, `%${destination}%`)
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);

    // If no destination-specific posts, get general travel posts
    if (results.length === 0) {
      results = await db
        .select({
          post: blogPosts,
          i18n: blogPostsI18n,
        })
        .from(blogPosts)
        .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
        .innerJoin(blogPostTags, eq(blogPosts.id, blogPostTags.postId))
        .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
        .where(
          and(
            eq(blogPostsI18n.locale, locale),
            eq(blogPosts.isPublished, true),
            inArray(blogTags.slug, ["travel", "visa", "guide", "tips"])
          )
        )
        .orderBy(desc(blogPosts.publishedAt))
        .limit(limit);
    }

    // Get tags for each post
    const blogPostsWithTags = await Promise.all(
      results.map(async result => {
        const postTags = await (await getDb())
          .select({ tagSlug: blogTags.slug })
          .from(blogPostTags)
          .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
          .where(eq(blogPostTags.postId, result.post.id));

        const tags = postTags.map(tag => tag.tagSlug);
        return convertDbToBlogPostData(result.post, result.i18n, tags);
      })
    );

    return blogPostsWithTags;
  } catch (error) {
    console.error("Error fetching related blog posts:", error);
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
    const db = await getDb();
    const results = await db
      .select({
        post: blogPosts,
        i18n: blogPostsI18n,
      })
      .from(blogPosts)
      .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
      .where(
        and(
          eq(blogPosts.slug, slug),
          eq(blogPostsI18n.locale, locale),
          eq(blogPosts.isPublished, true)
        )
      )
      .limit(1);

    if (results.length === 0) {
      return null;
    }

    const result = results[0];

    // Get tags for the post
    const postTags = await (await getDb())
      .select({ tagSlug: blogTags.slug })
      .from(blogPostTags)
      .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
      .where(eq(blogPostTags.postId, result.post.id));

    const tags = postTags.map(tag => tag.tagSlug);
    return convertDbToBlogPostData(result.post, result.i18n, tags);
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return null;
  }
}

/**
 * Get all unique tags from all blog posts for a locale
 */
export async function getAllTagsForLocale(locale: string): Promise<string[]> {
  try {
    const results = await (
      await getDb()
    )
      .selectDistinct({ tagSlug: blogTags.slug })
      .from(blogTags)
      .innerJoin(blogPostTags, eq(blogTags.id, blogPostTags.tagId))
      .innerJoin(blogPosts, eq(blogPostTags.postId, blogPosts.id))
      .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
      .where(
        and(eq(blogPostsI18n.locale, locale), eq(blogPosts.isPublished, true))
      )
      .orderBy(blogTags.slug);

    return results.map(result => result.tagSlug);
  } catch (error) {
    console.error("Error fetching tags for locale:", error);
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
    const results = await (
      await getDb()
    )
      .selectDistinct({ destinations: blogPosts.destinations })
      .from(blogPosts)
      .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
      .where(
        and(eq(blogPostsI18n.locale, locale), eq(blogPosts.isPublished, true))
      );

    // Parse comma-separated destinations and flatten
    const allDestinations = results
      .filter(result => result.destinations)
      .flatMap(result => result.destinations!.split(","))
      .map(dest => dest.trim())
      .filter(dest => dest.length > 0);

    const uniqueDestinations = [...new Set(allDestinations)];
    return uniqueDestinations.sort();
  } catch (error) {
    console.error("Error fetching destinations for locale:", error);
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

    const db = await getDb();
    const searchTerm = `%${query.toLowerCase().trim()}%`;

    const results = await db
      .select({
        post: blogPosts,
        i18n: blogPostsI18n,
      })
      .from(blogPosts)
      .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
      .where(
        and(
          eq(blogPostsI18n.locale, locale),
          eq(blogPosts.isPublished, true),
          sql`(
            LOWER(${blogPostsI18n.title}) LIKE ${searchTerm} OR
            LOWER(${blogPostsI18n.description}) LIKE ${searchTerm} OR
            LOWER(${blogPostsI18n.content}) LIKE ${searchTerm} OR
            LOWER(${blogPosts.author}) LIKE ${searchTerm}
          )`
        )
      )
      .orderBy(
        // Prioritize title matches first
        sql`CASE 
          WHEN LOWER(${blogPostsI18n.title}) LIKE ${searchTerm} THEN 1
          WHEN LOWER(${blogPostsI18n.description}) LIKE ${searchTerm} THEN 2
          ELSE 3
        END`,
        desc(blogPosts.publishedAt)
      )
      .limit(limit || 50);

    // Get tags for each post
    const blogPostsWithTags = await Promise.all(
      results.map(async result => {
        const postTags = await (await getDb())
          .select({ tagSlug: blogTags.slug })
          .from(blogPostTags)
          .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
          .where(eq(blogPostTags.postId, result.post.id));

        const tags = postTags.map(tag => tag.tagSlug);
        return convertDbToBlogPostData(result.post, result.i18n, tags);
      })
    );

    return blogPostsWithTags;
  } catch (error) {
    console.error("Error searching blog posts:", error);
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
    const db = await getDb();
    // First try to get posts with 'featured' tag
    let results = await db
      .select({
        post: blogPosts,
        i18n: blogPostsI18n,
      })
      .from(blogPosts)
      .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
      .innerJoin(blogPostTags, eq(blogPosts.id, blogPostTags.postId))
      .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
      .where(
        and(
          eq(blogPostsI18n.locale, locale),
          eq(blogPosts.isPublished, true),
          eq(blogTags.slug, "featured")
        )
      )
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);

    // If no featured posts, get most recent posts
    if (results.length === 0) {
      results = await db
        .select({
          post: blogPosts,
          i18n: blogPostsI18n,
        })
        .from(blogPosts)
        .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
        .where(
          and(eq(blogPostsI18n.locale, locale), eq(blogPosts.isPublished, true))
        )
        .orderBy(desc(blogPosts.publishedAt))
        .limit(limit);
    }

    // Get tags for each post
    const blogPostsWithTags = await Promise.all(
      results.map(async result => {
        const postTags = await (await getDb())
          .select({ tagSlug: blogTags.slug })
          .from(blogPostTags)
          .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
          .where(eq(blogPostTags.postId, result.post.id));

        const tags = postTags.map(tag => tag.tagSlug);
        return convertDbToBlogPostData(result.post, result.i18n, tags);
      })
    );

    return blogPostsWithTags;
  } catch (error) {
    console.error("Error fetching featured blog posts:", error);
    return [];
  }
}

/**
 * Get a single blog post by slug and locale (alias for getBlogPostBySlug)
 */
export async function getBlogPost(
  slug: string,
  locale: string
): Promise<BlogPostData | null> {
  return getBlogPostBySlug(slug, locale);
}

/**
 * Get all blog posts for a specific locale (alias for getAllBlogPosts)
 */
export async function getBlogPostsForLocale(
  locale: string
): Promise<BlogPostData[]> {
  return getAllBlogPosts(locale);
}

/**
 * Get all unique tags across all locales for generateStaticParams
 */
export async function getAllUniqueTagsAcrossLocales(): Promise<string[]> {
  try {
    const results = await (await getDb())
      .selectDistinct({ tagSlug: blogTags.slug })
      .from(blogTags)
      .orderBy(blogTags.slug);

    return results.map(result => result.tagSlug);
  } catch (error) {
    console.error("Error fetching all unique tags:", error);
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

// Re-export types for convenience
export type {
  BlogPostData,
  BlogFilterOptions,
  PaginatedBlogResponse,
} from "../types/blog";
