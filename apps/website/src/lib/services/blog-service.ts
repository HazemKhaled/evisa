/**
 * Blog Service Layer
 *
 * Database-Driven Blog Service using Drizzle ORM.
 * Provides blog post data fetching, filtering, and processing for the travel blog system.
 * Replaces MDX-based blog service with database queries using Drizzle ORM.
 */

import {
  and,
  blogPosts,
  blogPostsI18n,
  blogPostTags,
  blogTags,
  count,
  desc,
  eq,
  getDb,
  inArray,
  like,
  or,
  sql,
} from "@repo/database";
import { unstable_cache } from "next/cache";

import { languages } from "@/app/i18n/settings";

import type {
  BlogFilterOptions,
  BlogPostData,
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

  // Create new flat structure
  const blogPost: BlogPostData = {
    id: postRecord.id ? Number(postRecord.id) : undefined,
    slug: String(postRecord.slug),
    title: String(i18nRecord.title),
    description: String(i18nRecord.description),
    content: String(i18nRecord.content),
    author: String(postRecord.author),
    publishedAt: new Date(
      postRecord.publishedAt as string | Date
    ).toISOString(),
    lastUpdated: postRecord.updatedAt
      ? new Date(postRecord.updatedAt as string | Date).toISOString()
      : undefined,
    image: postRecord.image ? String(postRecord.image) : "",
    destinations: postRecord.destinations
      ? String(postRecord.destinations).split(",")
      : [],
    passports: postRecord.passports
      ? String(postRecord.passports).split(",")
      : undefined,
    tags,
    related_visas: postRecord.passports
      ? String(postRecord.passports).split(",")
      : [],
    isPublished: postRecord.isPublished
      ? Boolean(postRecord.isPublished)
      : true,
  };

  return blogPost;
}

/**
 * Get all blog post slugs across all locales for generateStaticParams
 */
export async function getAllBlogPostSlugs(): Promise<
  { locale: string; slug: string }[]
> {
  try {
    const db = getDb();
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
 * Get recent blog post slugs limited to N posts per language for SSG prerendering
 * This prevents build time explosion by only prerendering recent posts
 * Used for generateStaticParams to limit static page generation
 * Cached for 24 hours to prevent repeated database queries during builds
 */
export async function getAllBlogPostSlugsLimited(
  postsPerLanguage = 10
): Promise<{ locale: string; slug: string }[]> {
  const cachedFn = unstable_cache(
    async (): Promise<{ locale: string; slug: string }[]> => {
      try {
        const db = getDb();

        // Fetch recent N posts for each supported locale
        const allResults: { locale: string; slug: string }[] = [];

        for (const locale of languages) {
          const results = await db
            .select({
              locale: blogPostsI18n.locale,
              slug: blogPosts.slug,
            })
            .from(blogPosts)
            .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
            .where(
              and(
                eq(blogPostsI18n.locale, locale),
                eq(blogPosts.isPublished, true)
              )
            )
            .orderBy(desc(blogPosts.publishedAt))
            .limit(postsPerLanguage);

          allResults.push(...results);
        }

        return allResults;
      } catch (error) {
        console.error("Error fetching limited blog post slugs:", error);
        return [];
      }
    },
    ["blog-post-slugs-limited", postsPerLanguage.toString()],
    { tags: ["blog", "blog-slugs"], revalidate: 86400 }
  );

  return cachedFn();
}

/**
 * Get all blog posts for a specific locale with optional limit
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 */
export async function getAllBlogPosts(
  locale: string,
  limit?: number
): Promise<BlogPostData[]> {
  const cachedFn = unstable_cache(
    async (): Promise<BlogPostData[]> => {
      try {
        const db = getDb();
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
              eq(blogPosts.isPublished, true)
            )
          )
          .orderBy(desc(blogPosts.publishedAt));

        const results = limit ? await query.limit(limit) : await query;

        // Get tags for each post
        const blogPostsWithTags = await Promise.all(
          results.map(
            async (result: {
              post: typeof blogPosts.$inferSelect;
              i18n: typeof blogPostsI18n.$inferSelect;
            }) => {
              const postTags = await getDb()
                .select({ tagSlug: blogTags.slug })
                .from(blogPostTags)
                .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
                .where(eq(blogPostTags.postId, result.post.id));

              const tags = postTags.map(
                (tag: { tagSlug: string }) => tag.tagSlug
              );
              return convertDbToBlogPostData(result.post, result.i18n, tags);
            }
          )
        );

        return blogPostsWithTags;
      } catch (error) {
        console.error("Error fetching all blog posts:", error);
        return [];
      }
    },
    ["all-blog-posts", locale, limit?.toString() || "all"],
    { tags: ["blog", `blog-${locale}`], revalidate: 86400 }
  );

  return cachedFn();
}

/**
 * Get blog posts with advanced filtering and pagination
 */
export async function getBlogPosts(
  options: BlogFilterOptions
): Promise<PaginatedBlogResponse> {
  try {
    const db = getDb();
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
      results.map(
        async (result: {
          post: typeof blogPosts.$inferSelect;
          i18n: typeof blogPostsI18n.$inferSelect;
        }) => {
          const postTags = await getDb()
            .select({ tagSlug: blogTags.slug })
            .from(blogPostTags)
            .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
            .where(eq(blogPostTags.postId, result.post.id));

          const tags = postTags.map((tag: { tagSlug: string }) => tag.tagSlug);
          return convertDbToBlogPostData(result.post, result.i18n, tags);
        }
      )
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
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 */
export async function getBlogPostsByDestination(
  destination: string,
  locale: string,
  limit?: number
): Promise<BlogPostData[]> {
  const cachedFn = unstable_cache(
    async (): Promise<BlogPostData[]> => {
      try {
        const db = getDb();
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
          results.map(
            async (result: {
              post: typeof blogPosts.$inferSelect;
              i18n: typeof blogPostsI18n.$inferSelect;
            }) => {
              const postTags = await getDb()
                .select({ tagSlug: blogTags.slug })
                .from(blogPostTags)
                .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
                .where(eq(blogPostTags.postId, result.post.id));

              const tags = postTags.map(
                (tag: { tagSlug: string }) => tag.tagSlug
              );
              return convertDbToBlogPostData(result.post, result.i18n, tags);
            }
          )
        );

        return blogPostsWithTags;
      } catch (error) {
        console.error("Error fetching blog posts by destination:", error);
        return [];
      }
    },
    [
      "blog-posts-by-destination",
      destination,
      locale,
      limit?.toString() || "unlimited",
    ],
    { tags: ["blog", "blog-by-destination", `blog-${locale}`] }
  );

  return cachedFn();
}

/**
 * Get blog posts filtered by tag
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 */
export async function getBlogPostsByTag(
  tag: string,
  locale: string,
  limit?: number
): Promise<BlogPostData[]> {
  const cachedFn = unstable_cache(
    async (): Promise<BlogPostData[]> => {
      try {
        const db = getDb();
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
          results.map(
            async (result: {
              post: typeof blogPosts.$inferSelect;
              i18n: typeof blogPostsI18n.$inferSelect;
            }) => {
              const postTags = await getDb()
                .select({ tagSlug: blogTags.slug })
                .from(blogPostTags)
                .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
                .where(eq(blogPostTags.postId, result.post.id));

              const tags = postTags.map(
                (tag: { tagSlug: string }) => tag.tagSlug
              );
              return convertDbToBlogPostData(result.post, result.i18n, tags);
            }
          )
        );

        return blogPostsWithTags;
      } catch (error) {
        console.error("Error fetching blog posts by tag:", error);
        return [];
      }
    },
    ["blog-posts-by-tag", tag, locale, limit?.toString() || "unlimited"],
    { tags: ["blog", "blog-by-tag", `blog-${locale}`] }
  );

  return cachedFn();
}

/**
 * Get related blog posts based on destinations AND tags from a specific post (optimized for blog detail pages)
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 */
export async function getRelatedBlogPostsOptimized(
  currentPostSlug: string,
  destinations: string[],
  tags: string[],
  locale: string,
  limit = 3
): Promise<BlogPostData[]> {
  const cachedFn = unstable_cache(
    async (): Promise<BlogPostData[]> => {
      try {
        const db = getDb();

        // If no destinations or tags, fall back to recent posts
        if (
          (!destinations || destinations.length === 0) &&
          (!tags || tags.length === 0)
        ) {
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
                sql`${blogPosts.slug} != ${currentPostSlug}`
              )
            )
            .orderBy(desc(blogPosts.publishedAt))
            .limit(limit);

          return await Promise.all(
            results.map(async result => {
              const postTags = await db
                .select({ tagSlug: blogTags.slug })
                .from(blogPostTags)
                .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
                .where(eq(blogPostTags.postId, result.post.id));

              const tagSlugs = postTags.map(tag => tag.tagSlug);
              return convertDbToBlogPostData(
                result.post,
                result.i18n,
                tagSlugs
              );
            })
          );
        }

        // Build query for posts matching destinations OR tags
        const destinationConditions =
          destinations?.length > 0
            ? destinations.map(
                dest => sql`${blogPosts.destinations} LIKE ${"%" + dest + "%"}`
              )
            : [];

        const tagConditions =
          tags?.length > 0
            ? [
                sql`EXISTS (
          SELECT 1 FROM ${blogPostTags}
          INNER JOIN ${blogTags} ON ${blogPostTags.tagId} = ${blogTags.id}
          WHERE ${blogPostTags.postId} = ${blogPosts.id}
          AND ${blogTags.slug} IN (${sql.join(
            tags.map(tag => sql`${tag}`),
            sql`, `
          )})
        )`,
              ]
            : [];

        const matchingConditions = [...destinationConditions, ...tagConditions];

        if (matchingConditions.length === 0) {
          // Fallback to recent posts if no valid conditions
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
                sql`${blogPosts.slug} != ${currentPostSlug}`
              )
            )
            .orderBy(desc(blogPosts.publishedAt))
            .limit(limit);

          return await Promise.all(
            results.map(async result => {
              const postTags = await db
                .select({ tagSlug: blogTags.slug })
                .from(blogPostTags)
                .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
                .where(eq(blogPostTags.postId, result.post.id));

              const tagSlugs = postTags.map(tag => tag.tagSlug);
              return convertDbToBlogPostData(
                result.post,
                result.i18n,
                tagSlugs
              );
            })
          );
        }

        // Query for related posts matching destinations OR tags
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
              sql`${blogPosts.slug} != ${currentPostSlug}`,
              or(...matchingConditions)
            )
          )
          .orderBy(desc(blogPosts.publishedAt))
          .limit(limit);

        // Get tags for each post
        const blogPostsWithTags = await Promise.all(
          results.map(async result => {
            const postTags = await db
              .select({ tagSlug: blogTags.slug })
              .from(blogPostTags)
              .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
              .where(eq(blogPostTags.postId, result.post.id));

            const tagSlugs = postTags.map(tag => tag.tagSlug);
            return convertDbToBlogPostData(result.post, result.i18n, tagSlugs);
          })
        );

        return blogPostsWithTags;
      } catch (error) {
        console.error("Error fetching optimized related blog posts:", error);
        return [];
      }
    },
    [
      "related-blog-posts-optimized",
      currentPostSlug,
      locale,
      destinations.join(","),
      tags.join(","),
      limit?.toString() || "3",
    ],
    { tags: ["blog", "blog-related", `blog-${locale}`] }
  );

  return cachedFn();
}

/**
 * Get related blog posts for destination page integration
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 */
export async function getRelatedBlogPosts(
  destination: string,
  locale: string,
  limit = 3
): Promise<BlogPostData[]> {
  const cachedFn = unstable_cache(
    async (): Promise<BlogPostData[]> => {
      try {
        const db = getDb();
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
          results.map(
            async (result: {
              post: typeof blogPosts.$inferSelect;
              i18n: typeof blogPostsI18n.$inferSelect;
            }) => {
              const postTags = await getDb()
                .select({ tagSlug: blogTags.slug })
                .from(blogPostTags)
                .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
                .where(eq(blogPostTags.postId, result.post.id));

              const tags = postTags.map(
                (tag: { tagSlug: string }) => tag.tagSlug
              );
              return convertDbToBlogPostData(result.post, result.i18n, tags);
            }
          )
        );

        return blogPostsWithTags;
      } catch (error) {
        console.error("Error fetching related blog posts:", error);
        return [];
      }
    },
    ["related-blog-posts", destination, locale, limit?.toString() || "3"],
    { tags: ["blog", "blog-related", `blog-${locale}`] }
  );

  return cachedFn();
}

/**
 * Get a single blog post by slug
 * Cached for 30 days (2592000 seconds) with ISR revalidation tag
 */
export async function getBlogPostBySlug(
  slug: string,
  locale: string
): Promise<BlogPostData | null> {
  const cachedFn = unstable_cache(
    async (): Promise<BlogPostData | null> => {
      try {
        const db = getDb();
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
        const postTags = await getDb()
          .select({ tagSlug: blogTags.slug })
          .from(blogPostTags)
          .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
          .where(eq(blogPostTags.postId, result.post.id));

        const tags = postTags.map((tag: { tagSlug: string }) => tag.tagSlug);
        return convertDbToBlogPostData(result.post, result.i18n, tags);
      } catch (error) {
        console.error("Error fetching blog post by slug:", error);
        return null;
      }
    },
    ["blog-post-by-slug", slug, locale],
    { tags: ["blog", `blog-${locale}`, `blog-${slug}`], revalidate: 2592000 }
  );

  return cachedFn();
}

/**
 * Get all unique tags from all blog posts for a locale
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 */
export async function getAllTagsForLocale(locale: string): Promise<string[]> {
  const cachedFn = unstable_cache(
    async (): Promise<string[]> => {
      try {
        const results = await getDb()
          .selectDistinct({ tagSlug: blogTags.slug })
          .from(blogTags)
          .innerJoin(blogPostTags, eq(blogTags.id, blogPostTags.tagId))
          .innerJoin(blogPosts, eq(blogPostTags.postId, blogPosts.id))
          .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
          .where(
            and(
              eq(blogPostsI18n.locale, locale),
              eq(blogPosts.isPublished, true)
            )
          )
          .orderBy(blogTags.slug);

        return results.map((result: { tagSlug: string }) => result.tagSlug);
      } catch (error) {
        console.error("Error fetching tags for locale:", error);
        return [];
      }
    },
    ["all-tags-for-locale", locale],
    { tags: ["blog", "blog-tags", `blog-${locale}`], revalidate: 86400 }
  );

  return cachedFn();
}

/**
 * Get all unique destinations from all blog posts for a locale
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 */
export async function getAllDestinationsForLocale(
  locale: string
): Promise<string[]> {
  const cachedFn = unstable_cache(
    async (): Promise<string[]> => {
      try {
        const results = await getDb()
          .selectDistinct({ destinations: blogPosts.destinations })
          .from(blogPosts)
          .innerJoin(blogPostsI18n, eq(blogPosts.id, blogPostsI18n.postId))
          .where(
            and(
              eq(blogPostsI18n.locale, locale),
              eq(blogPosts.isPublished, true)
            )
          );

        // Parse comma-separated destinations and flatten
        const allDestinations = results
          .filter(
            (result: { destinations: string | null }) => result.destinations
          )
          .flatMap((result: { destinations: string | null }) =>
            result.destinations!.split(",")
          )
          .map((dest: string) => dest.trim())
          .filter((dest: string) => dest.length > 0);

        const uniqueDestinations = [...new Set(allDestinations)];
        return uniqueDestinations.sort();
      } catch (error) {
        console.error("Error fetching destinations for locale:", error);
        return [];
      }
    },
    ["all-destinations-for-locale", locale],
    { tags: ["blog", "blog-destinations", `blog-${locale}`] }
  );

  return cachedFn();
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

    const db = getDb();
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
      results.map(
        async (result: {
          post: typeof blogPosts.$inferSelect;
          i18n: typeof blogPostsI18n.$inferSelect;
        }) => {
          const postTags = await getDb()
            .select({ tagSlug: blogTags.slug })
            .from(blogPostTags)
            .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
            .where(eq(blogPostTags.postId, result.post.id));

          const tags = postTags.map((tag: { tagSlug: string }) => tag.tagSlug);
          return convertDbToBlogPostData(result.post, result.i18n, tags);
        }
      )
    );

    return blogPostsWithTags;
  } catch (error) {
    console.error("Error searching blog posts:", error);
    return [];
  }
}

/**
 * Get featured blog posts (posts marked with featured tag or most popular)
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 */
export async function getFeaturedBlogPosts(
  locale: string,
  limit = 5
): Promise<BlogPostData[]> {
  const cachedFn = unstable_cache(
    async (): Promise<BlogPostData[]> => {
      try {
        const db = getDb();
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
              and(
                eq(blogPostsI18n.locale, locale),
                eq(blogPosts.isPublished, true)
              )
            )
            .orderBy(desc(blogPosts.publishedAt))
            .limit(limit);
        }

        // Get tags for each post
        const blogPostsWithTags = await Promise.all(
          results.map(
            async (result: {
              post: typeof blogPosts.$inferSelect;
              i18n: typeof blogPostsI18n.$inferSelect;
            }) => {
              const postTags = await getDb()
                .select({ tagSlug: blogTags.slug })
                .from(blogPostTags)
                .innerJoin(blogTags, eq(blogPostTags.tagId, blogTags.id))
                .where(eq(blogPostTags.postId, result.post.id));

              const tags = postTags.map(
                (tag: { tagSlug: string }) => tag.tagSlug
              );
              return convertDbToBlogPostData(result.post, result.i18n, tags);
            }
          )
        );

        return blogPostsWithTags;
      } catch (error) {
        console.error("Error fetching featured blog posts:", error);
        return [];
      }
    },
    ["featured-blog-posts", locale],
    { tags: ["blog", "blog-featured", `blog-${locale}`], revalidate: 86400 }
  );

  return cachedFn();
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
 * Get all unique blog tags across all locales for tag page generation
 * Cached for 24 hours to prevent repeated database queries
 * Used by generateStaticParams for tag pages
 */
export async function getAllUniqueTagsAcrossLocales(): Promise<string[]> {
  const cachedFn = unstable_cache(
    async (): Promise<string[]> => {
      try {
        const results = await getDb()
          .selectDistinct({ tagSlug: blogTags.slug })
          .from(blogTags)
          .orderBy(blogTags.slug);

        return results.map((result: { tagSlug: string }) => result.tagSlug);
      } catch (error) {
        console.error("Error fetching all unique tags:", error);
        return [];
      }
    },
    ["all-unique-tags-across-locales"],
    { tags: ["blog", "blog-tags-all-locales"], revalidate: 86400 }
  );

  return cachedFn();
}

/**
 * Get blog posts for a specific locale (alias for getBlogPostsForLocale for sitemap compatibility)
 */
export async function getBlogDataForLocale(
  locale: string
): Promise<BlogPostData[]> {
  return getBlogPostsForLocale(locale);
}

/**
 * Get blog posts for a specific locale with pagination
 */
export async function getBlogPostsForLocalePaginated(
  locale: string,
  limit: number,
  offset: number
): Promise<PaginatedBlogResponse> {
  return getBlogPosts({
    locale,
    limit,
    offset,
  });
}

/**
 * Get blog posts filtered by tag with pagination
 */
export async function getBlogPostsByTagPaginated(
  tag: string,
  locale: string,
  limit: number,
  offset: number
): Promise<PaginatedBlogResponse> {
  return getBlogPosts({
    locale,
    limit,
    offset,
    tag,
  });
}

/**
 * Get blog posts filtered by destination with pagination
 */
export async function getBlogPostsByDestinationPaginated(
  destination: string,
  locale: string,
  limit: number,
  offset: number
): Promise<PaginatedBlogResponse> {
  return getBlogPosts({
    locale,
    limit,
    offset,
    destination,
  });
}

// Re-export types for convenience
export type {
  BlogFilterOptions,
  BlogPostData,
  PaginatedBlogResponse,
} from "../types/blog";
