import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import { cache } from "react";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { validateDatabaseUrl } from "../consts/env";
import * as schema from "./schema";

// Configure Neon for edge environments
neonConfig.poolQueryViaFetch = true;

// Types for our database instances
export type Database = NeonHttpDatabase<typeof schema>;

/**
 * Get Neon database connection with caching for optimization
 *
 * This function provides a cached Neon database connection that works in both
 * development and production environments, including edge runtime.
 *
 * @returns Database - A cached Drizzle database instance with Neon HTTP driver
 *
 * @throws {Error} When DATABASE_URL is not configured
 *
 * @note This function is synchronous and does not need to be awaited
 * @note Uses neon-http driver for edge compatibility
 * @note Connection pooling is configured via neonConfig.poolQueryViaFetch
 */
export const getDb = cache((): Database => {
  const databaseUrl = validateDatabaseUrl();
  const sql = neon(databaseUrl);

  return drizzle(sql, { schema });
});

// Export schema for external use
export * from "./schema";
export { schema };
