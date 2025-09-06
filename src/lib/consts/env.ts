/**
 * Centralized environment variables for the GetTravelVisa.com platform
 *
 * This file provides a single source of truth for all environment variables
 * used throughout the application, with proper TypeScript typing and validation.
 */

interface CloudflareCredentials {
  accountId: string;
  databaseId: string;
  token: string;
}

interface Environment {
  // Node.js environment
  NODE_ENV: "development" | "production" | "test";

  // Cloudflare configuration
  cloudflare: {
    accountId: string | undefined;
    databaseId: string | undefined;
    apiToken: string | undefined;
  };

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
  NODE_ENV: (process.env.NODE_ENV as Environment["NODE_ENV"]) || "development",
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_D1_DATABASE_ID: process.env.CLOUDFLARE_D1_DATABASE_ID,
  CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
} as const;

/**
 * Typed and validated environment variables
 * Use this instead of directly accessing process.env
 */
export const env: Environment = {
  NODE_ENV: rawEnv.NODE_ENV,

  cloudflare: {
    accountId: rawEnv.CLOUDFLARE_ACCOUNT_ID,
    databaseId: rawEnv.CLOUDFLARE_D1_DATABASE_ID,
    apiToken: rawEnv.CLOUDFLARE_API_TOKEN,
  },

  baseUrl: rawEnv.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com",

  sentryDsn: rawEnv.NEXT_PUBLIC_SENTRY_DSN,
} as const;

/**
 * Validate that required Cloudflare environment variables are present
 * Used by drizzle.config.ts and other database-related code
 */
export function validateCloudflareEnv(): CloudflareCredentials {
  const missing: string[] = [];

  if (!env.cloudflare.databaseId) missing.push("CLOUDFLARE_D1_DATABASE_ID");
  if (!env.cloudflare.apiToken) missing.push("CLOUDFLARE_API_TOKEN");
  if (!env.cloudflare.accountId) missing.push("CLOUDFLARE_ACCOUNT_ID");

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables for Cloudflare D1: ${missing.join(", ")}.\n` +
        "Please set these variables in your .env.local file or environment."
    );
  }

  return {
    accountId: env.cloudflare.accountId as string,
    databaseId: env.cloudflare.databaseId as string,
    token: env.cloudflare.apiToken as string,
  };
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
 * Check if we're in local development mode with D1
 * Uses NODE_ENV to determine if we should use local D1 development setup
 */
export const shouldUseLocalD1 = isDevelopment;

/**
 * Validate environment variables for local D1 development
 * Requires at least database ID for local operations
 */
export function validateLocalD1Env(): { databaseId: string } {
  if (!env.cloudflare.databaseId) {
    throw new Error(
      "Missing CLOUDFLARE_D1_DATABASE_ID environment variable for local D1 development.\n" +
        "Please set this variable in your .env.local file."
    );
  }

  return {
    databaseId: env.cloudflare.databaseId,
  };
}

/**
 * Legacy exports for backward compatibility
 * @deprecated Use the `env` export instead
 */
export const {
  NODE_ENV,
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_D1_DATABASE_ID,
  CLOUDFLARE_API_TOKEN,
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_SENTRY_DSN,
} = rawEnv;
