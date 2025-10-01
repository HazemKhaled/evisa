import type { Config } from "drizzle-kit";

/**
 * Drizzle Kit Configuration
 *
 * This configuration is used for:
 * - Generating migrations
 * - Pushing schema changes
 * - Running Drizzle Studio
 */

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not set. Please configure your Neon database connection."
  );
}

console.debug("Drizzle: Using Neon database via HTTP driver");

export default {
  schema: "./src/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
} satisfies Config;
