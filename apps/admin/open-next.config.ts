import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  // Required by the `revalidatePath` calls in `src/actions`. Without a tag
  // cache OpenNext installs a no-op one and those calls silently do nothing.
  // The D1 database is shared with the website worker so the same writes also
  // mark the public site's entries stale.
  tagCache: d1NextTagCache,
});
