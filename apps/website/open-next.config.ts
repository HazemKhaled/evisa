import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import queueCache from "@opennextjs/cloudflare/overrides/queue/queue-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";

export default defineCloudflareConfig({
  // `long-lived` reuses an ISR/SSG entry from the colo cache for up to 30 minutes
  // instead of reading the R2 bucket on every request.
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: "long-lived",
  }),
  // Deduplicates concurrent revalidations of the same key so a burst of stale
  // requests sends one message to the Durable Object instead of one each.
  queue: queueCache(doQueue, { regionalCacheTtlSec: 5 }),
  // This is only required if you use On-demand revalidation
  tagCache: d1NextTagCache,
  // If you don't use `revalidatePath`, you can also filter internal soft tags using the `softTagFilter`
  // tagCache: withFilter({
  //   tagCache: d1NextTagCache,
  //   filterFn: softTagFilter,
  // }),
  // Disable this if you want to use PPR
  enableCacheInterception: true,
  // Both regional-cache wrappers read `shouldLazilyUpdateOnCacheHit` and
  // `bypassTagCacheOnCacheHit` from their defaults on purpose:
  // `bypassTagCacheOnCacheHit` is incompatible with the SWR form of
  // `revalidateTag`, which is what Next 16 uses.
});
