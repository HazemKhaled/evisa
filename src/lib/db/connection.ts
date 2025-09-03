import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

// Type for our database instance
export type Database = DrizzleD1Database<typeof schema>;

/**
 * Get database connection for server components and dynamic routes
 * Uses React cache for optimization
 *
 * This function provides a cached database connection optimized for React Server Components
 * and dynamic routes. It uses React's `cache()` function to ensure that multiple calls
 * within the same request return the same database instance, improving performance
 * and preventing connection overhead.
 *
 * **When to use this function:**
 * - React Server Components (RSC) in dynamic routes
 * - API routes that need database access
 * - Server-side rendering contexts
 * - Any synchronous database operations in React components
 *
 * **When to use getDbAsync instead:**
 * - Static routes (ISR/SSG) that require async Cloudflare context
 * - Static generation contexts where async operations are needed
 * - Background jobs or non-React contexts
 *
 * **Performance benefits:**
 * - Database connection is cached per request using React's cache mechanism
 * - Multiple database calls within the same request share the same connection
 * - Eliminates connection overhead for repeated database access
 *
 * @returns Database - A cached Drizzle database instance with full schema access
 *
 * @throws {Error} When the D1 binding 'DB' is not configured in the Cloudflare environment.
 *                 Error message: "Database not available - ensure D1 binding 'DB' is configured"
 *
 * @example
 * ```typescript
 * // In a React Server Component
 * export default async function UserProfile({ userId }: { userId: string }) {
 *   const db = getDb();
 *   const user = await db.query.users.findFirst({
 *     where: eq(users.id, userId)
 *   });
 *
 *   // Multiple calls to getDb() in the same request return the same instance
 *   const db2 = getDb(); // Same instance as above
 *   const posts = await db2.query.posts.findMany({
 *     where: eq(posts.userId, userId)
 *   });
 *
 *   return <div>{user?.name}</div>;
 * }
 * ```
 *
 * @example
 * ```typescript
 * // In an API route
 * export async function GET() {
 *   try {
 *     const db = getDb();
 *     const countries = await db.query.countries.findMany();
 *     return Response.json({ countries });
 *   } catch (error) {
 *     if (error instanceof Error && error.message.includes('Database not available')) {
 *       return Response.json({ error: 'Database configuration error' }, { status: 500 });
 *     }
 *     throw error;
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Error handling for missing database binding
 * try {
 *   const db = getDb();
 * } catch (error) {
 *   if (error instanceof Error) {
 *     console.error('Database connection failed:', error.message);
 *     // Handle missing DB binding or other connection issues
 *   }
 * }
 * ```
 *
 * @note This function is synchronous and should not be awaited
 * @note The cache is per-request, so connections are not shared across different requests
 * @note Always handle potential errors when calling this function
 * @note For static generation contexts, use getDbAsync instead
 */
export const getDb = cache((): Database => {
  const { env } = getCloudflareContext();
  if (!env.DB) {
    throw new Error(
      "Database not available - ensure D1 binding 'DB' is configured"
    );
  }
  return drizzle(env.DB, { schema });
});

/**
 * Get database connection for static routes (ISR/SSG)
 * Uses async Cloudflare context for static generation
 *
 * This function provides an asynchronous database connection specifically designed for
 * static routes, Incremental Static Regeneration (ISR), and Static Site Generation (SSG).
 * It uses React's `cache()` function with async Cloudflare context to ensure proper
 * database access during static generation processes.
 *
 * **When to use this function:**
 * - Static routes that require database access during build time
 * - Incremental Static Regeneration (ISR) contexts
 * - Static Site Generation (SSG) processes
 * - Background jobs or non-React contexts that need async database access
 * - Any context where async Cloudflare context is required
 *
 * **When to use getDb instead:**
 * - React Server Components (RSC) in dynamic routes
 * - API routes that don't require async context
 * - Server-side rendering contexts
 * - Synchronous database operations in React components
 *
 * **Async context requirement:**
 * - This function requires async Cloudflare context (`{ async: true }`)
 * - Must be awaited when called
 * - Suitable for contexts where async operations are supported
 * - Essential for static generation where synchronous context is not available
 *
 * **Performance characteristics:**
 * - Database connection is cached per request using React's cache mechanism
 * - Multiple calls within the same async context return the same database instance
 * - Slightly higher overhead compared to getDb due to async context resolution
 *
 * @returns Promise<Database> - A promise that resolves to a cached Drizzle database
 *                              instance with full schema access
 *
 * @throws {Error} When the D1 binding 'DB' is not configured in the Cloudflare environment.
 *                 Error message: "Database not available - ensure D1 binding 'DB' is configured"
 *
 * @example
 * ```typescript
 * // In a static route with ISR
 * export async function generateStaticParams() {
 *   const db = await getDbAsync();
 *   const countries = await db.query.countries.findMany();
 *
 *   return countries.map(country => ({
 *     locale: 'en',
 *     slug: country.slug
 *   }));
 * }
 * ```
 *
 * @example
 * ```typescript
 * // In a static page component
 * export default async function StaticPage() {
 *   const db = await getDbAsync();
 *   const posts = await db.query.blogPosts.findMany({
 *     orderBy: desc(blogPosts.publishedAt),
 *     limit: 10
 *   });
 *
 *   return (
 *     <div>
 *       {posts.map(post => (
 *         <BlogPostCard key={post.id} post={post} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Error handling for static generation
 * export async function generateStaticParams() {
 *   try {
 *     const db = await getDbAsync();
 *     const destinations = await db.query.destinations.findMany();
 *
 *     return destinations.map(dest => ({
 *       locale: 'en',
 *       slug: dest.slug
 *     }));
 *   } catch (error) {
 *     if (error instanceof Error && error.message.includes('Database not available')) {
 *       console.error('Database not available during static generation');
 *       // Return empty array to prevent build failure
 *       return [];
 *     }
 *     throw error;
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Background job or non-React context
 * async function updateAnalytics() {
 *   const db = await getDbAsync();
 *   const stats = await db.query.analytics.findMany();
 *
 *   // Process analytics data
 *   for (const stat of stats) {
 *     await processStatistic(stat);
 *   }
 * }
 * ```
 *
 * @note This function must be awaited as it returns a Promise
 * @note Requires async Cloudflare context for proper operation
 * @note The cache is per-request, so connections are not shared across different requests
 * @note Always handle potential errors when calling this function
 * @note For synchronous React Server Components, use getDb instead
 * @note Essential for static generation contexts where getDb would fail
 */
export const getDbAsync = cache(async (): Promise<Database> => {
  const { env } = await getCloudflareContext({ async: true });
  if (!env.DB) {
    throw new Error(
      "Database not available - ensure D1 binding 'DB' is configured"
    );
  }
  return drizzle(env.DB, { schema });
});

/**
 * Check if database is available
 * Useful for conditional logic in components
 */
export const isDatabaseAvailable = (): boolean => {
  try {
    const { env } = getCloudflareContext();
    return !!env.DB;
  } catch {
    return false;
  }
};

/**
 * Check if database is available (async version)
 * Useful for static routes
 */
export const isDatabaseAvailableAsync = async (): Promise<boolean> => {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return !!env.DB;
  } catch {
    return false;
  }
};

// Export schema for external use
export * from "./schema";
export { schema };
