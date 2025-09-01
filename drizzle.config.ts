import type { Config } from "drizzle-kit";

const {
  LOCAL_DB_PATH,
  CLOUDFLARE_D1_DATABASE_ID,
  CLOUDFLARE_API_TOKEN,
  CLOUDFLARE_ACCOUNT_ID,
} = process.env;

// Function to validate required environment variables for production
function validateProductionEnv(): {
  databaseId: string;
  token: string;
  accountId: string;
} {
  const missing: string[] = [];

  if (!CLOUDFLARE_D1_DATABASE_ID) missing.push("CLOUDFLARE_D1_DATABASE_ID");
  if (!CLOUDFLARE_API_TOKEN) missing.push("CLOUDFLARE_API_TOKEN");
  if (!CLOUDFLARE_ACCOUNT_ID) missing.push("CLOUDFLARE_ACCOUNT_ID");

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables for Cloudflare D1: ${missing.join(", ")}.\n` +
        "Please set these variables in your .env.local file or environment."
    );
  }

  return {
    databaseId: CLOUDFLARE_D1_DATABASE_ID as string,
    token: CLOUDFLARE_API_TOKEN as string,
    accountId: CLOUDFLARE_ACCOUNT_ID as string,
  };
}

// Use local SQLite driver for development, d1-http for production
export default LOCAL_DB_PATH
  ? ({
      schema: "./src/lib/db/schema/*",
      out: "./drizzle",
      dialect: "sqlite",
      dbCredentials: {
        url: LOCAL_DB_PATH,
      },
    } satisfies Config)
  : ({
      schema: "./src/lib/db/schema/*",
      out: "./drizzle",
      dialect: "sqlite",
      driver: "d1-http",
      dbCredentials: validateProductionEnv(),
    } satisfies Config);
