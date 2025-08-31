import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export async function getDatabase() {
  try {
    const { env } = await getCloudflareContext({ async: true });

    if (!env.DB) {
      throw new Error("Database binding not found. Make sure DB is configured in wrangler.jsonc");
    }

    return drizzle(env.DB, { schema });
  } catch {
    // In development/local environment, return null to trigger fallback data
    return null;
  }
}

export { schema };
