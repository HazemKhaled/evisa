/**
 * Centralized environment variables for the GetTravelVisa.com platform
 *
 * This file provides a single source of truth for all environment variables
 * used throughout the application, with proper TypeScript typing and validation.
 */

interface Environment {
  // Node.js environment
  NODE_ENV: "development" | "production" | "test";

  // Database configuration
  databaseUrl: string | undefined;

  // Public application URLs
  baseUrl: string;

  // Third-party services
  sentryDsn: string | undefined;
}

/**
 * Raw environment variables from process.env
 * Use the typed `env` export instead of accessing these directly
 */
const rawEnv = {
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
} as const;

/**
 * Typed and validated environment variables
 * Use this instead of directly accessing process.env
 */
export const env: Environment = {
  NODE_ENV: rawEnv.NODE_ENV,

  databaseUrl: rawEnv.DATABASE_URL,

  baseUrl: rawEnv.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com",

  sentryDsn: rawEnv.NEXT_PUBLIC_SENTRY_DSN,
} as const;

/**
 * Validate that required database environment variables are present
 * Used by drizzle.config.ts and database connection
 */
export function validateDatabaseUrl(): string {
  if (!env.databaseUrl) {
    throw new Error(
      "Missing DATABASE_URL environment variable.\n" +
        "Please set this variable in your .env.local file or environment."
    );
  }

  return env.databaseUrl;
}

/**
 * Check if we're in development environment
 */
export const isDevelopment = env.NODE_ENV === "development";

/**
 * Check if we're in production environment
 */
export const isProduction = env.NODE_ENV === "production";

/**
 * Check if we're in test environment
 */
export const isTest = env.NODE_ENV === "test";

/**
 * Legacy exports for backward compatibility
 * @deprecated Use the `env` export instead
 */
export const {
  NODE_ENV,
  DATABASE_URL,
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_SENTRY_DSN,
} = rawEnv;
