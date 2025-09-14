/**
 * Static Pages Manifest
 *
 * Static manifest of all available static pages for Cloudflare Workers compatibility.
 * Generated from public/pages directory structure.
 */

export const pagesManifest: { locale: string; slug: string }[] = [
  // English (en)
  { locale: "en", slug: "about-us" },
  { locale: "en", slug: "privacy-policy" },
  { locale: "en", slug: "terms-n-conditions" },

  // Arabic (ar)
  { locale: "ar", slug: "about-us" },
  { locale: "ar", slug: "privacy-policy" },
  { locale: "ar", slug: "terms-n-conditions" },

  // Spanish (es)
  { locale: "es", slug: "about-us" },
  { locale: "es", slug: "privacy-policy" },
  { locale: "es", slug: "terms-n-conditions" },

  // Portuguese (pt)
  { locale: "pt", slug: "about-us" },
  { locale: "pt", slug: "privacy-policy" },
  { locale: "pt", slug: "terms-n-conditions" },

  // Russian (ru)
  { locale: "ru", slug: "about-us" },
  { locale: "ru", slug: "privacy-policy" },
  { locale: "ru", slug: "terms-n-conditions" },

  // German (de)
  { locale: "de", slug: "about-us" },
  { locale: "de", slug: "privacy-policy" },
  { locale: "de", slug: "terms-n-conditions" },

  // French (fr)
  { locale: "fr", slug: "about-us" },
  { locale: "fr", slug: "privacy-policy" },
  { locale: "fr", slug: "terms-n-conditions" },

  // Italian (it)
  { locale: "it", slug: "about-us" },
  { locale: "it", slug: "privacy-policy" },
  { locale: "it", slug: "terms-n-conditions" },
];

/**
 * Get all static pages for a specific locale
 */
export function getStaticPagesForLocale(
  locale: string
): { locale: string; slug: string }[] {
  return pagesManifest.filter(page => page.locale === locale);
}

/**
 * Get all static pages across all locales
 */
export function getAllStaticPages(): { locale: string; slug: string }[] {
  return pagesManifest;
}

/**
 * Check if a static page exists for a given locale and slug
 */
export function staticPageExists(locale: string, slug: string): boolean {
  return pagesManifest.some(
    page => page.locale === locale && page.slug === slug
  );
}
