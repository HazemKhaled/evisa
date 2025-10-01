import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema";

// Configure Neon for edge environments
neonConfig.poolQueryViaFetch = true;

// Types for our database instances
export type Database = NeonHttpDatabase<typeof schema>;

// Singleton instance
let dbInstance: Database | null = null;

/**
 * Get Neon database connection with singleton caching for optimization
 *
 * This function provides a singleton Neon database connection that works in both
 * development and production environments, including edge runtime.
 *
 * @returns Database - A singleton Drizzle database instance with Neon HTTP driver
 *
 * @throws {Error} When DATABASE_URL is not configured
 *
 * @note This function is synchronous and does not need to be awaited
 * @note Uses neon-http driver for edge compatibility
 * @note Connection pooling is configured via neonConfig.poolQueryViaFetch
 */
export function getDb(): Database {
  if (!dbInstance) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error(
        "DATABASE_URL is not set. Please configure your Neon database connection."
      );
    }
    const sql = neon(databaseUrl);
    dbInstance = drizzle(sql, { schema });
  }
  return dbInstance;
}

// Export schema for external use
export * from "./schema";
export { schema };
