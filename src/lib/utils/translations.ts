import { getTranslation } from "@/app/i18n";

/**
 * Translation utilities to reduce duplication and improve testability
 * Provides consistent translation loading patterns across components
 */

export interface TranslationNamespaces {
  common: "common";
  navigation: "navigation";
  hero: "hero";
  features: "features";
  pages: "pages";
}

export type TranslationNamespace = keyof TranslationNamespaces;

/**
 * Load multiple translation namespaces at once
 * Reduces the need for multiple getTranslation calls in components
 */
export async function loadTranslations<T extends TranslationNamespace[]>(
  locale: string,
  namespaces: T
): Promise<{
  [K in T[number] as `t${Capitalize<K>}`]: Awaited<
    ReturnType<typeof getTranslation>
  >["t"];
}> {
  const translations = await Promise.all(
    namespaces.map(ns => getTranslation(locale, ns))
  );

  type ResultType = {
    [K in T[number] as `t${Capitalize<K>}`]: Awaited<
      ReturnType<typeof getTranslation>
    >["t"];
  };

  const result = {} as Record<
    string,
    Awaited<ReturnType<typeof getTranslation>>["t"]
  >;

  namespaces.forEach((ns, index) => {
    const key = `t${ns.charAt(0).toUpperCase() + ns.slice(1)}`;
    result[key] = translations[index]?.t;
  });

  return result as ResultType;
}

/**
 * Common translation combinations for different page types
 */
export const commonTranslationSets = {
  layout: ["common", "navigation"] as TranslationNamespace[],
  page: ["common", "navigation", "pages"] as TranslationNamespace[],
  hero: ["common", "navigation", "hero", "features"] as TranslationNamespace[],
  blog: ["common", "navigation", "pages"] as TranslationNamespace[],
};

/**
 * Load translations for layout components (header, footer)
 */
export async function loadLayoutTranslations(locale: string) {
  return loadTranslations(locale, commonTranslationSets.layout);
}

/**
 * Load translations for regular pages
 */
export async function loadPageTranslations(locale: string) {
  return loadTranslations(locale, commonTranslationSets.page);
}

/**
 * Load translations for hero/landing pages
 */
export async function loadHeroTranslations(locale: string) {
  return loadTranslations(locale, commonTranslationSets.hero);
}

/**
 * Load translations for blog pages
 */
export async function loadBlogTranslations(locale: string) {
  return loadTranslations(locale, commonTranslationSets.blog);
}

/**
 * Type-safe translation key builder
 * Helps prevent typos in translation keys
 */
export const translationKeys = {
  navigation: {
    header: {
      destinations: "header.destinations" as const,
      blog: "header.blog" as const,
    },
    footer: {
      company: "footer.company" as const,
      services: "footer.services" as const,
      about: "footer.about" as const,
      contact_us: "footer.contact_us" as const,
      terms: "footer.terms" as const,
      privacy: "footer.privacy" as const,
      visa_checker: "footer.visa_checker" as const,
      travel_blog: "footer.travel_blog" as const,
      copyright: "footer.copyright" as const,
    },
  },
  common: {
    site: {
      description: "site.description" as const,
    },
    buttons: {
      startApplication: "buttons.startApplication" as const,
    },
    forms: {
      passportCountry: "forms.passportCountry" as const,
      destinationCountry: "forms.destinationCountry" as const,
    },
  },
  hero: {
    headline: "headline" as const,
    subheadline: "subheadline" as const,
    search: {
      title: "search.title" as const,
      passportPlaceholder: "search.passportPlaceholder" as const,
      destinationPlaceholder: "search.destinationPlaceholder" as const,
      checkButton: "search.checkButton" as const,
    },
  },
  features: {
    howItWorks: {
      title: "howItWorks.title" as const,
      subtitle: "howItWorks.subtitle" as const,
      steps: {
        check: {
          title: "howItWorks.steps.check.title" as const,
          description: "howItWorks.steps.check.description" as const,
        },
      },
    },
  },
  pages: {
    blog: {
      pagination: {
        previous: "blog.pagination.previous" as const,
        next: "blog.pagination.next" as const,
        showing: "blog.pagination.showing" as const,
        of: "blog.pagination.of" as const,
        articles: "blog.pagination.articles" as const,
      },
    },
  },
} as const;

/**
 * Extract translation key from nested object
 * Provides better type safety for translation keys
 */
export function getTranslationKey<T extends Record<string, unknown>>(
  obj: T,
  path: string[]
): string {
  let current: unknown = obj;
  for (const key of path) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      throw new Error(`Invalid translation key path: ${path.join(".")}`);
    }
  }
  return current as string;
}

/**
 * Type for translation functions
 */
export type TranslationFunction = (
  key: string,
  options?: Record<string, string | number | boolean>
) => string;

/**
 * Create a cached translation loader to avoid repeated i18n initialization
 */
class TranslationCache {
  private cache = new Map<string, Awaited<ReturnType<typeof getTranslation>>>();

  async getTranslation(
    locale: string,
    namespace: string
  ): Promise<Awaited<ReturnType<typeof getTranslation>>> {
    const key = `${locale}:${namespace}`;

    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const translation = await getTranslation(locale, namespace);
    this.cache.set(key, translation);

    return translation;
  }

  clearCache() {
    this.cache.clear();
  }

  getCacheSize() {
    return this.cache.size;
  }
}

export const translationCache = new TranslationCache();
