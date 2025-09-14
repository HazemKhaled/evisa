import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { shouldUseLocalD1, validateLocalD1Env } from "../consts/env";
import * as schema from "./schema";

// Types for our database instances
export type CloudflareDatabase = DrizzleD1Database<typeof schema>;
export type LocalD1Database = DrizzleD1Database<typeof schema>;
export type Database = CloudflareDatabase | LocalD1Database;

/**
 * Get local D1 database connection for development
 * Uses React cache for optimization
 *
 * This function provides a cached local D1 database connection for development.
 * It uses React's `cache()` function to ensure that multiple calls within the same
 * request return the same database instance.
 *
 * @returns LocalD1Database - A cached Drizzle database instance with local D1
 *
 * @throws {Error} When D1 binding 'DB' is not configured in local development
 *
 * @note This function is synchronous and should not be awaited
 * @note Only used when shouldUseLocalD1 is true (development environment)
 * @note Requires running within wrangler dev environment for local D1 access
 */
const getLocalD1Db = cache((): LocalD1Database => {
  try {
    validateLocalD1Env(); // Ensure database ID is configured
    const { env } = getCloudflareContext();
    if (!env.DB) {
      throw new Error(
        "Local D1 database not available - ensure you're running within 'wrangler dev' environment"
      );
    }
    return drizzle(env.DB, { schema });
  } catch (error) {
    throw new Error(
      `Local D1 database not available: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
});

/**
 * Get database connection for static routes (ISR/SSG)
 * Uses async Cloudflare context for static generation in production
 *
 * This function provides an asynchronous database connection for static routes.
 * In development, it returns the local D1 connection synchronously.
 * In production, it uses async Cloudflare context for static generation.
 *
 * **Environment Handling:**
 * - **Local Development**: Returns local D1 connection (no async needed)
 * - **Production**: Uses async Cloudflare D1 context for static generation
 *
 * @returns Promise<Database> - A cached Drizzle database instance
 *
 * @throws {Error} When database is not available for the current environment
 *
 * @example
 * ```typescript
 * // In a static route with ISR
 * export async function generateStaticParams() {
 *   const db = await getDb();
 *   const countries = await db.query.countries.findMany();
 *   return countries.map(country => ({ locale: 'en', slug: country.slug }));
 * }
 * ```
 *
 * @note This function must be awaited as it returns a Promise
 * @note In development, it resolves immediately with local D1
 * @note In production, requires async Cloudflare context
 */
export const getDb = cache(async (): Promise<Database> => {
  if (shouldUseLocalD1) {
    // In development, return local D1 connection
    return getLocalD1Db();
  } else {
    // In production, use async Cloudflare context
    const { env } =
      process.env.WORKERS_CI === null
        ? getCloudflareContext()
        : // Async context for ISR/SSG
          await getCloudflareContext({ async: true });
    if (!env.DB) {
      throw new Error(
        "Database not available - ensure D1 binding 'DB' is configured"
      );
    }
    return drizzle(env.DB, { schema });
  }
});

/**
 * Check if database is available (async version, environment-aware)
 * Useful for static routes
 */
export const isDatabaseAvailable = async (): Promise<boolean> => {
  try {
    if (shouldUseLocalD1) {
      // Check if local D1 database is configured
      validateLocalD1Env();
      const { env } = await getCloudflareContext({ async: true });
      return !!env.DB;
    } else {
      // Check if production Cloudflare D1 is available
      const { env } = await getCloudflareContext({ async: true });
      return !!env.DB;
    }
  } catch {
    return false;
  }
};

// Export schema for external use
export * from "./schema";
export { schema };
