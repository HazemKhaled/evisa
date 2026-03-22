/**
 * Database Index
 *
 * Central exports for database connections, schemas, and utilities
 */

// Export database connections
export { getDb } from "./connection";

// Export default database connection as 'db' for convenience
export { getDb as db } from "./connection";

// Export schemas
export * from "./schema";

// Export types
export type { Database } from "./connection";

// Re-export common drizzle-orm utilities
export {
  and,
  avg,
  count,
  desc,
  eq,
  exists,
  inArray,
  isNotNull,
  isNull,
  like,
  min,
  or,
  sql,
} from "drizzle-orm";
