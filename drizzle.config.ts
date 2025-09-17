import type { Config } from "drizzle-kit";
import { validateDatabaseUrl } from "./src/lib/consts/env";

console.debug("Drizzle: Using Neon database via HTTP driver");

export default {
  schema: "./src/lib/db/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: validateDatabaseUrl(),
  },
} satisfies Config;
