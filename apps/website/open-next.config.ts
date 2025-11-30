import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
  // This is only required if you use On-demand revalidation
  tagCache: d1NextTagCache,
  // If you don't use `revalidatePath`, you can also filter internal soft tags using the `softTagFilter`
  // tagCache: withFilter({
  //   tagCache: d1NextTagCache,
  //   filterFn: softTagFilter,
  // }),
  // Disable this if you want to use PPR
  enableCacheInterception: true,
  // Note: Regional cache configuration is handled automatically by OpenNext
  // The R2 incremental cache provides fast response times on subsequent requests
  // with ISR/SSG pages cached for up to 30 minutes by default
});
