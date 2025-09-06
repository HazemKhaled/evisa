import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { cache } from "react";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import { shouldUseLocalDb, getLocalDbPath } from "../consts/env";
import * as schema from "./schema";

// Types for our database instances
export type CloudflareDatabase = DrizzleD1Database<typeof schema>;
export type LocalDatabase = LibSQLDatabase<typeof schema>;
export type Database = CloudflareDatabase | LocalDatabase;

/**
 * Get local SQLite database connection for development
 * Uses React cache for optimization
 *
 * This function provides a cached local SQLite database connection for development.
 * It uses React's `cache()` function to ensure that multiple calls within the same
 * request return the same database instance.
 *
 * @returns LocalDatabase - A cached Drizzle database instance with local SQLite
 *
 * @throws {Error} When LOCAL_DB_PATH is not configured or file cannot be accessed
 *
 * @note This function is synchronous and should not be awaited
 * @note Only used when shouldUseLocalDb is true (development environment)
 */
export const getLocalDb = cache((): LocalDatabase => {
  try {
    const dbPath = getLocalDbPath();
    const client = createClient({ url: `file:${dbPath}` });
    return drizzleLibsql(client, { schema });
  } catch (error) {
    throw new Error(
      `Local SQLite database not available: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
});

/**
 * Get Cloudflare D1 database connection for production
 * Uses React cache for optimization
 *
 * This function provides a cached Cloudflare D1 database connection for production.
 * It uses React's `cache()` function to ensure that multiple calls within the same
 * request return the same database instance.
 *
 * @returns CloudflareDatabase - A cached Drizzle database instance with Cloudflare D1
 *
 * @throws {Error} When the D1 binding 'DB' is not configured in the Cloudflare environment
 *
 * @note This function is synchronous and should not be awaited
 * @note Only used when shouldUseLocalDb is false (production environment)
 */
export const getCloudflareDb = cache((): CloudflareDatabase => {
  const { env } = getCloudflareContext();
  if (!env.DB) {
    throw new Error(
      "Database not available - ensure D1 binding 'DB' is configured"
    );
  }
  return drizzle(env.DB, { schema });
});

/**
 * Get database connection (environment-aware)
 * Automatically chooses between local SQLite and Cloudflare D1
 *
 * This function provides a unified database connection interface that automatically
 * selects the appropriate database based on the environment configuration.
 *
 * **Environment Detection:**
 * - **Local Development**: Uses SQLite when `shouldUseLocalDb` is true
 * - **Production**: Uses Cloudflare D1 when `shouldUseLocalDb` is false
 *
 * @returns Database - A cached Drizzle database instance
 *
 * @throws {Error} When database is not available for the current environment
 *
 * @example
 * ```typescript
 * // Works in both development (SQLite) and production (D1)
 * export default async function UserProfile({ userId }: { userId: string }) {
 *   const db = getDb();
 *   const user = await db.query.users.findFirst({
 *     where: eq(users.id, userId)
 *   });
 *   return <div>{user?.name}</div>;
 * }
 * ```
 */
export const getDb = cache((): Database => {
  if (shouldUseLocalDb) {
    return getLocalDb();
  } else {
    return getCloudflareDb();
  }
});

/**
 * Get database connection for static routes (ISR/SSG)
 * Uses async Cloudflare context for static generation in production
 *
 * This function provides an asynchronous database connection for static routes.
 * In development, it returns the local SQLite connection synchronously.
 * In production, it uses async Cloudflare context for static generation.
 *
 * **Environment Handling:**
 * - **Local Development**: Returns local SQLite connection (no async needed)
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
 *   const db = await getDbAsync();
 *   const countries = await db.query.countries.findMany();
 *   return countries.map(country => ({ locale: 'en', slug: country.slug }));
 * }
 * ```
 *
 * @note This function must be awaited as it returns a Promise
 * @note In development, it resolves immediately with local SQLite
 * @note In production, requires async Cloudflare context
 */
export const getDbAsync = cache(async (): Promise<Database> => {
  if (shouldUseLocalDb) {
    // In development, return local SQLite connection
    return getLocalDb();
  } else {
    // In production, use async Cloudflare context
    const { env } = await getCloudflareContext({ async: true });
    if (!env.DB) {
      throw new Error(
        "Database not available - ensure D1 binding 'DB' is configured"
      );
    }
    return drizzle(env.DB, { schema });
  }
});

/**
 * Check if database is available (environment-aware)
 * Useful for conditional logic in components
 */
export const isDatabaseAvailable = (): boolean => {
  try {
    if (shouldUseLocalDb) {
      // Check if local database path is configured
      getLocalDbPath();
      return true;
    } else {
      // Check if Cloudflare D1 is available
      const { env } = getCloudflareContext();
      return !!env.DB;
    }
  } catch {
    return false;
  }
};

/**
 * Check if database is available (async version, environment-aware)
 * Useful for static routes
 */
export const isDatabaseAvailableAsync = async (): Promise<boolean> => {
  try {
    if (shouldUseLocalDb) {
      // Check if local database path is configured
      getLocalDbPath();
      return true;
    } else {
      // Check if Cloudflare D1 is available
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
