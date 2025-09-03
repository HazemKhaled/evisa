/**
 * URL building utilities to eliminate duplication across the application
 * Provides consistent URL generation for different parts of the app
 */

export interface BlogSearchParams {
  page?: string | number;
  tag?: string;
  destination?: string;
}

/**
 * Build a localized URL path with optional trailing slash
 */
export function buildLocalePath(locale: string, path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `/${locale}${cleanPath ? `/${cleanPath}` : ""}`;
}

/**
 * Build URL for blog pages with search parameters
 */
export function buildBlogUrl(
  locale: string,
  searchParams?: BlogSearchParams
): string {
  const basePath = buildLocalePath(locale, "blog");

  if (!searchParams || Object.keys(searchParams).length === 0) {
    return basePath;
  }

  const urlSearchParams = new URLSearchParams();

  if (
    searchParams.page &&
    searchParams.page !== 1 &&
    searchParams.page !== "1"
  ) {
    urlSearchParams.set("page", searchParams.page.toString());
  }

  if (searchParams.tag) {
    urlSearchParams.set("tag", searchParams.tag);
  }

  if (searchParams.destination) {
    urlSearchParams.set("destination", searchParams.destination);
  }

  const queryString = urlSearchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Build URL for blog post by slug
 */
export function buildBlogPostUrl(locale: string, slug: string): string {
  return buildLocalePath(locale, `blog/${slug}`);
}

/**
 * Build URL for tag filtering
 */
export function buildTagUrl(locale: string, tag: string): string {
  return buildLocalePath(locale, `blog/t/${encodeURIComponent(tag)}`);
}

/**
 * Build URL for destination filtering
 */
export function buildDestinationFilterUrl(
  locale: string,
  destination: string
): string {
  return buildBlogUrl(locale, { destination });
}

/**
 * Build navigation URLs for header and footer
 */
export const buildNavUrls = (locale: string) => ({
  home: buildLocalePath(locale),
  destinations: buildLocalePath(locale, "destinations"),
  blog: buildLocalePath(locale, "blog"),
  contact: buildLocalePath(locale, "contact"),
  visaChecker: buildLocalePath(locale, "visa-checker"),
  about: buildLocalePath(locale, "p/about-us"),
  terms: buildLocalePath(locale, "p/terms-n-conditions"),
  privacy: buildLocalePath(locale, "p/privacy-policy"),
});

/**
 * Parse search parameters from URL for blog pages
 */
export function parseBlogSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): BlogSearchParams {
  const parsed: BlogSearchParams = {};

  if (searchParams.page && typeof searchParams.page === "string") {
    parsed.page = searchParams.page;
  }

  if (searchParams.tag && typeof searchParams.tag === "string") {
    parsed.tag = searchParams.tag;
  }

  if (
    searchParams.destination &&
    typeof searchParams.destination === "string"
  ) {
    parsed.destination = searchParams.destination;
  }

  return parsed;
}
