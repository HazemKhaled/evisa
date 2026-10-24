import { revalidatePath, revalidateTag } from "next/cache";

/**
 * On-demand invalidation of the public site (`gtv`) from the admin worker
 * (`gtv-admin`).
 *
 * The two workers run separate Next builds, so `revalidatePath` called here
 * only reaches the public site's cache if both use the same tag cache. They do:
 * `apps/admin/wrangler.jsonc` and `apps/website/wrangler.jsonc` bind the same
 * `gtv-opennext-cache` D1 database as `NEXT_TAG_CACHE_D1`, and OpenNext keys tag
 * rows by build id, which is the constant `no-build-id` unless
 * `OPEN_NEXT_BUILD_ID` is set in the worker's environment.
 *
 * Tags are declared by the public site's `unstable_cache` calls in
 * `apps/website/src/lib/services/*`. Route paths are the public site's app
 * routes; passing one of the `[locale]` patterns with the `"page"` type
 * invalidates that route for every locale in a single call.
 */

/** Present on every entry `apps/website/src/lib/services/blog-service.ts` caches. */
const PUBLIC_SITE_BLOG_TAGS = ["blog"];

/** Destination data is cached under both umbrellas. */
const PUBLIC_SITE_DESTINATION_TAGS = [
  "countries",
  "destinations",
  "continents",
];

/** Present on every entry `apps/website/src/lib/services/visa-service.ts` caches. */
const PUBLIC_SITE_VISA_TAGS = ["visas"];

const PUBLIC_SITE_BLOG_ROUTES = [
  "/[locale]",
  "/[locale]/blog",
  "/[locale]/blog/[slug]",
  "/[locale]/blog/t/[tag]",
  "/[locale]/d/[destination]/blog",
];

const PUBLIC_SITE_DESTINATION_ROUTES = [
  "/[locale]",
  "/[locale]/d",
  "/[locale]/d/[destination]",
  "/[locale]/d/[destination]/blog",
];

const PUBLIC_SITE_VISA_ROUTES = [
  "/[locale]",
  "/[locale]/d/[destination]",
  "/[locale]/d/[destination]/v/[visaType]",
];

/**
 * `revalidateTag` requires a profile on Next 16. `{ expire: 0 }` is the form
 * OpenNext treats as immediate expiration; a named cache-life profile such as
 * `"max"` would instead write a future expiry that the public site's tag cache
 * reads as "not revalidated yet".
 */
function invalidate(tags: readonly string[], routes: readonly string[]): void {
  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }
  for (const route of routes) {
    revalidatePath(route, "page");
  }
}

/**
 * Call after creating, updating or deleting a blog post.
 */
export function invalidatePublicBlog(): void {
  invalidate(PUBLIC_SITE_BLOG_TAGS, PUBLIC_SITE_BLOG_ROUTES);
}

/**
 * Call after creating, updating or deleting a country.
 */
export function invalidatePublicDestinations(): void {
  invalidate(PUBLIC_SITE_DESTINATION_TAGS, PUBLIC_SITE_DESTINATION_ROUTES);
}

/**
 * Call after creating, updating or deleting a visa type.
 */
export function invalidatePublicVisaTypes(): void {
  invalidate(PUBLIC_SITE_VISA_TAGS, PUBLIC_SITE_VISA_ROUTES);
}
