import { drizzle } from "drizzle-orm/d1";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

// Type for our database instance
export type Database = DrizzleD1Database<typeof schema>;

// For Cloudflare Workers / Pages (production)
export function createDrizzleD1(d1: D1Database): Database {
  return drizzle(d1, { schema });
}

// Extend globalThis interface for D1 database
// Note: 'var' is required for global scope extension in TypeScript
declare global {
  var DB: D1Database | undefined;
}

// For development with Wrangler
export function createDrizzleLocal(): Database {
  if (typeof globalThis.DB === "undefined") {
    throw new Error(
      "D1 database not found. Make sure you're running with Wrangler and have configured your D1 database."
    );
  }
  return drizzle(globalThis.DB, { schema });
}

// Export schema for use in other parts of the app
export * from "./schema";
export { schema };
