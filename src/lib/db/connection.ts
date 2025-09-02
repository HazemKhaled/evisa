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
