/**
 * Database Index
 *
 * Central exports for database connections, schemas, and utilities
 */

// Export database connections
export {
  getDb,
  getDbAsync,
  getLocalD1Db,
  getCloudflareDb,
  isDatabaseAvailable,
  isDatabaseAvailableAsync,
} from "./connection";

// Export default database connection as 'db' for convenience
export { getDb as db } from "./connection";

// Export schemas
export * from "./schema";

// Export types
export type {
  Database,
  CloudflareDatabase,
  LocalD1Database,
} from "./connection";
