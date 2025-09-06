import type { Config } from "drizzle-kit";
import {
  shouldUseLocalDb,
  getLocalDbPath,
  validateCloudflareEnv,
} from "./src/lib/consts";

if (shouldUseLocalDb) {
  console.debug("Drizzle: Using local SQLite database");
}

// Use local SQLite driver for development, d1-http for production
export default shouldUseLocalDb
  ? ({
      schema: "./src/lib/db/schema/*",
      out: "./drizzle",
      dialect: "sqlite",
      dbCredentials: {
        url: getLocalDbPath(),
      },
    } satisfies Config)
  : ({
      schema: "./src/lib/db/schema/*",
      out: "./drizzle",
      dialect: "sqlite",
      driver: "d1-http",
      dbCredentials: validateCloudflareEnv(),
    } satisfies Config);
