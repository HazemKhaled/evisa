import "server-only";

/**
 * Blog Service Layer
 *
 * Handles blog post data fetching, filtering, and processing for the travel blog system.
 * Now uses database-driven approach with Drizzle ORM and D1 SQLite.
 * Replaced MDX file reading with database queries for Cloudflare Workers compatibility.
 * Server-only module for database operations.
 */

import * as dbBlogService from "./blog-service-db";
import type {
  BlogPostData,
  BlogFilterOptions,
  PaginatedBlogResponse,
} from "../types/blog";

/**
 * Get all blog post slugs across all locales for generateStaticParams
 */
export async function getAllBlogPostSlugs(): Promise<
  { locale: string; slug: string }[]
> {
  return dbBlogService.getAllBlogPostSlugs();
}

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
  return dbBlogService.getAllBlogPosts(locale, limit);
}

/**
 * Get blog posts with advanced filtering and pagination
 */
export async function getBlogPosts(
  options: BlogFilterOptions
): Promise<PaginatedBlogResponse> {
  return dbBlogService.getBlogPosts(options);
}

/**
 * Get blog posts filtered by destination
 */
export async function getBlogPostsByDestination(
  destination: string,
  locale: string,
  limit?: number
): Promise<BlogPostData[]> {
  return dbBlogService.getBlogPostsByDestination(destination, locale, limit);
}

/**
 * Get blog posts filtered by tag
 */
export async function getBlogPostsByTag(
  tag: string,
  locale: string,
  limit?: number
): Promise<BlogPostData[]> {
  return dbBlogService.getBlogPostsByTag(tag, locale, limit);
}

/**
 * Get related blog posts for destination page integration
 */
export async function getRelatedBlogPosts(
  destination: string,
  locale: string,
  limit: number = 3
): Promise<BlogPostData[]> {
  return dbBlogService.getRelatedBlogPosts(destination, locale, limit);
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(
  slug: string,
  locale: string
): Promise<BlogPostData | null> {
  return dbBlogService.getBlogPostBySlug(slug, locale);
}

/**
 * Get all unique tags from all blog posts for a locale
 */
export async function getAllTagsForLocale(locale: string): Promise<string[]> {
  return dbBlogService.getAllTagsForLocale(locale);
}

/**
 * Get all unique destinations from all blog posts for a locale
 */
export async function getAllDestinationsForLocale(
  locale: string
): Promise<string[]> {
  return dbBlogService.getAllDestinationsForLocale(locale);
}

/**
 * Search blog posts by text content (title, description, content)
 */
export async function searchBlogPosts(
  query: string,
  locale: string,
  limit?: number
): Promise<BlogPostData[]> {
  return dbBlogService.searchBlogPosts(query, locale, limit);
}

/**
 * Get featured blog posts (posts marked with featured tag or most popular)
 */
export async function getFeaturedBlogPosts(
  locale: string,
  limit: number = 5
): Promise<BlogPostData[]> {
  return dbBlogService.getFeaturedBlogPosts(locale, limit);
}

/**
 * Get a single blog post by slug and locale (runtime version using database service)
 */
export async function getBlogPost(
  slug: string,
  locale: string
): Promise<BlogPostData | null> {
  return dbBlogService.getBlogPost(slug, locale);
}

/**
 * Get all blog posts for a specific locale (runtime version using database service)
 */
export async function getBlogPostsForLocale(
  locale: string
): Promise<BlogPostData[]> {
  return dbBlogService.getBlogPostsForLocale(locale);
}

/**
 * Get all unique tags across all locales for generateStaticParams
 */
export async function getAllUniqueTagsAcrossLocales(): Promise<string[]> {
  return dbBlogService.getAllUniqueTagsAcrossLocales();
}

/**
 * Get blog posts for a specific locale (alias for getBlogPostsForLocale for sitemap compatibility)
 */
export async function getBlogDataForLocale(
  locale: string
): Promise<BlogPostData[]> {
  return dbBlogService.getBlogDataForLocale(locale);
}

/**
 * Get blog posts for a specific locale with pagination
 */
export async function getBlogPostsForLocalePaginated(
  locale: string,
  limit: number,
  offset: number
): Promise<PaginatedBlogResponse> {
  return dbBlogService.getBlogPosts({
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
  return dbBlogService.getBlogPosts({
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
  return dbBlogService.getBlogPosts({
    locale,
    limit,
    offset,
    destination,
  });
}
