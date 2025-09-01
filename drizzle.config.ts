import type { Config } from "drizzle-kit";

const {
  LOCAL_DB_PATH,
  CLOUDFLARE_D1_DATABASE_ID,
  CLOUDFLARE_API_TOKEN,
  CLOUDFLARE_ACCOUNT_ID,
} = process.env;

// Use better-sqlite driver for local development, d1-http for production
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
      dbCredentials: {
        databaseId: CLOUDFLARE_D1_DATABASE_ID!,
        token: CLOUDFLARE_API_TOKEN!,
        accountId: CLOUDFLARE_ACCOUNT_ID!,
      },
    } satisfies Config);
