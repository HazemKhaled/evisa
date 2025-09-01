import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Configure static assets handling for Cloudflare
  // https://opennext.js.org/cloudflare/howtos/assets
  // Enable SSG and image optimization as per CLAUDE.md requirements
  // https://opennext.js.org/cloudflare/caching#ssg-site
  // https://opennext.js.org/cloudflare/howtos/image

  // Uncomment to enable R2 cache for better performance,
  // It should be imported as:
  // `import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";`
  // See https://opennext.js.org/cloudflare/caching for more details
  // incrementalCache: r2IncrementalCache,
});
