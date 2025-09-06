import type { Config } from "drizzle-kit";
import {
  shouldUseLocalD1,
  validateLocalD1Env,
  validateCloudflareEnv,
} from "./src/lib/consts/env";

if (shouldUseLocalD1) {
  console.debug("Drizzle: Using local D1 database via wrangler");
} else {
  console.debug("Drizzle: Using production D1 database via HTTP API");
}

// Use local D1 for development, d1-http for production
export default shouldUseLocalD1
  ? ({
      schema: "./src/lib/db/schema/*",
      out: "./drizzle",
      dialect: "sqlite",
      driver: "d1-http",
      dbCredentials: {
        ...validateLocalD1Env(),
        // For local development, we don't need account ID and token
        // The wrangler CLI will handle authentication locally
        accountId: undefined as unknown as string,
        token: undefined as unknown as string,
      },
    } satisfies Config)
  : ({
      schema: "./src/lib/db/schema/*",
      out: "./drizzle",
      dialect: "sqlite",
      driver: "d1-http",
      dbCredentials: validateCloudflareEnv(),
    } satisfies Config);
