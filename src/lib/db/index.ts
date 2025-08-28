import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export function getDatabase() {
  const { env } = getCloudflareContext();

  if (!env.DB) {
    throw new Error("Database binding not found. Make sure DB is configured in wrangler.jsonc");
  }

  return drizzle(env.DB, { schema });
}

export { schema };
