import { and, eq, inArray, isNull } from "drizzle-orm";
import { countries, countriesI18n } from "../db/schema/countries";
import {
  getDbAsync,
  isDatabaseAvailableAsync,
  type Database,
} from "../db/connection";
import { languages } from "@/app/i18n/settings";

/**
 * Service for country-related database operations
 * Provides testable, reusable database query abstractions
 */

/**
 * Validate and normalize locale code
 * Returns primary locale code (e.g., "en" from "en-US")
 */
function normalizeLocale(locale: string): string {
  if (!locale || typeof locale !== "string") {
    return "en";
  }

  const primaryLocale = locale.toLowerCase().split("-")[0];

  return languages.includes(primaryLocale) ? primaryLocale : "en";
}

export interface Country {
  id: number;
  code: string;
  name: string;
}

export interface CountryWithI18n extends Country {
  localizedName: string;
  heroImage: string | null;
  about: string | null;
  continent: string;
}

/**
 * Get country names for multiple country codes and locale from database
 * Optimized to use a single query instead of multiple individual queries
 */
export async function getCountryNames(
  countryCodes: string[],
  locale: string
): Promise<string[]> {
  if (countryCodes.length === 0) {
    return [];
  }

  // Check if database is available
  const isDatabaseReady = await isDatabaseAvailableAsync();
  if (!isDatabaseReady) {
    // eslint-disable-next-line no-console
    console.warn("Database not available, using country codes as fallback");
    return countryCodes;
  }

  try {
    const db = (await getDbAsync()) as Database;

    // Use a single query to get all country names at once
    const results = await db
      .select({
        code: countries.code,
        name: countriesI18n.name,
      })
      .from(countries)
      .innerJoin(countriesI18n, eq(countries.id, countriesI18n.countryId))
      .where(
        and(
          eq(countriesI18n.locale, locale),
          inArray(countries.code, countryCodes)
        )
      );

    // Create a map for quick lookups
    const countryMap = new Map<string, string>();
    results.forEach(result => {
      if (result.code && result.name) {
        countryMap.set(result.code, result.name);
      }
    });

    // Return names in the same order as input codes, with fallback to code if not found
    return countryCodes.map(code => countryMap.get(code) || code);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      `Failed to get country names for ${countryCodes.join(", ")} (${locale}):`,
      error
    );
    return countryCodes; // Fallback to codes if queries fail
  }
}

/**
 * Get all countries for a specific locale with fallback support
 */
export async function getAllCountries(
  locale: string
): Promise<CountryWithI18n[]> {
  const isDatabaseReady = await isDatabaseAvailableAsync();
  if (!isDatabaseReady) {
    // eslint-disable-next-line no-console
    console.warn("Database not available, using country codes as fallback");
    return [];
  }

  try {
    const db = (await getDbAsync()) as Database;
    const normalizedLocale = normalizeLocale(locale);

    // Get data in the requested locale
    const results = await db
      .select({
        id: countries.id,
        code: countries.code,
        name: countries.code, // Use code as fallback name since countries table doesn't have name field
        heroImage: countries.heroImage,
        continent: countries.continent,
        localizedName: countriesI18n.name,
        about: countriesI18n.about,
      })
      .from(countries)
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, normalizedLocale)
        )
      )
      .where(and(eq(countries.isActive, true), isNull(countries.deletedAt)));

    // If not using English and some translations are missing, get English fallbacks
    if (normalizedLocale !== "en") {
      const missingTranslations = results.filter(r => !r.localizedName);

      if (missingTranslations.length > 0) {
        // Get English fallback data for countries
        const englishCountryResults = await db
          .select({
            countryId: countriesI18n.countryId,
            localizedName: countriesI18n.name,
            about: countriesI18n.about,
          })
          .from(countriesI18n)
          .where(eq(countriesI18n.locale, "en"));

        // Create map for quick lookup
        const englishCountryMap = new Map<
          number,
          { name: string; about: string | null }
        >();

        englishCountryResults.forEach(er => {
          englishCountryMap.set(er.countryId, {
            name: er.localizedName,
            about: er.about,
          });
        });

        // Apply fallbacks
        results.forEach(result => {
          if (!result.localizedName && englishCountryMap.has(result.id)) {
            const englishData = englishCountryMap.get(result.id)!;
            result.localizedName = englishData.name;
            if (!result.about) {
              result.about = englishData.about;
            }
          }
        });
      }
    }

    return results.map(result => ({
      id: result.id,
      code: result.code,
      name: result.name,
      heroImage: result.heroImage,
      continent: result.continent,
      localizedName: result.localizedName || result.name,
      about: result.about,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to get all countries for locale ${locale}:`, error);
    return [];
  }
}

/**
 * Get country by code with fallback support
 */
export async function getCountryByCode(
  countryCode: string,
  locale: string = "en"
): Promise<CountryWithI18n | null> {
  const isDatabaseReady = await isDatabaseAvailableAsync();
  if (!isDatabaseReady) {
    // eslint-disable-next-line no-console
    console.warn("Database not available");
    return null;
  }

  try {
    const db = (await getDbAsync()) as Database;
    const normalizedLocale = normalizeLocale(locale);

    const results = await db
      .select({
        id: countries.id,
        code: countries.code,
        name: countries.code, // Use code as fallback name since countries table doesn't have name field
        heroImage: countries.heroImage,
        continent: countries.continent,
        localizedName: countriesI18n.name,
        about: countriesI18n.about,
      })
      .from(countries)
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, normalizedLocale)
        )
      )
      .where(
        and(
          eq(countries.code, countryCode),
          eq(countries.isActive, true),
          isNull(countries.deletedAt)
        )
      )
      .limit(1);

    if (results.length === 0) {
      return null;
    }

    const result = results[0];

    // If missing translations and not using English, try English fallback
    if (!result.localizedName && normalizedLocale !== "en") {
      const englishCountryResult = await db
        .select({
          localizedName: countriesI18n.name,
          about: countriesI18n.about,
        })
        .from(countriesI18n)
        .where(
          and(
            eq(countriesI18n.countryId, result.id),
            eq(countriesI18n.locale, "en")
          )
        )
        .limit(1);

      // Apply English fallbacks
      if (englishCountryResult.length > 0) {
        result.localizedName =
          result.localizedName || englishCountryResult[0].localizedName;
        result.about = result.about || englishCountryResult[0].about;
      }
    }

    return {
      id: result.id,
      code: result.code,
      name: result.name,
      heroImage: result.heroImage,
      continent: result.continent,
      localizedName: result.localizedName || result.name,
      about: result.about,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to get country by code ${countryCode}:`, error);
    return null;
  }
}

/**
 * Search countries by name (for autocomplete/search features)
 */
export async function searchCountries(
  query: string,
  locale: string,
  limit: number = 10
): Promise<CountryWithI18n[]> {
  if (!query.trim()) {
    return [];
  }

  const isDatabaseReady = await isDatabaseAvailableAsync();
  if (!isDatabaseReady) {
    // eslint-disable-next-line no-console
    console.warn("Database not available");
    return [];
  }

  try {
    const db = (await getDbAsync()) as Database;
    const normalizedLocale = normalizeLocale(locale);

    const results = await db
      .select({
        id: countries.id,
        code: countries.code,
        name: countries.code, // Use code as fallback name since countries table doesn't have name field
        heroImage: countries.heroImage,
        continent: countries.continent,
        localizedName: countriesI18n.name,
        about: countriesI18n.about,
      })
      .from(countries)
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, normalizedLocale)
        )
      )
      .where(and(eq(countries.isActive, true), isNull(countries.deletedAt)))
      .limit(limit);

    // Filter results by query on the application side for now
    // In production, you'd want to do this in the database with proper search
    return results
      .filter(result => {
        const localizedName = (
          result.localizedName || result.name
        ).toLowerCase();
        const originalName = result.name.toLowerCase();
        const searchQuery = query.toLowerCase();

        return (
          localizedName.includes(searchQuery) ||
          originalName.includes(searchQuery) ||
          result.code.toLowerCase().includes(searchQuery)
        );
      })
      .map(result => ({
        id: result.id,
        code: result.code,
        name: result.name,
        heroImage: result.heroImage,
        continent: result.continent,
        localizedName: result.localizedName || result.name,
        about: result.about,
      }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to search countries with query "${query}":`, error);
    return [];
  }
}

/**
 * Get country codes that are commonly used as destinations
 * This could be enhanced with analytics data or configuration
 */
export async function getPopularDestinations(
  locale: string,
  limit: number = 20
): Promise<CountryWithI18n[]> {
  // For now, return all countries, but this could be enhanced with:
  // - Analytics data about popular destinations
  // - Configuration for featured countries
  // - Visa application statistics
  const countries = await getAllCountries(locale);
  return countries.slice(0, limit);
}

/**
 * Batch operation to get countries for multiple codes
 * More efficient than individual queries
 */
export async function getCountriesByCodes(
  countryCodes: string[],
  locale: string
): Promise<CountryWithI18n[]> {
  if (countryCodes.length === 0) {
    return [];
  }

  const isDatabaseReady = await isDatabaseAvailableAsync();
  if (!isDatabaseReady) {
    // eslint-disable-next-line no-console
    console.warn("Database not available");
    return [];
  }

  try {
    const db = (await getDbAsync()) as Database;
    const normalizedLocale = normalizeLocale(locale);

    const results = await db
      .select({
        id: countries.id,
        code: countries.code,
        name: countries.code, // Use code as fallback name since countries table doesn't have name field
        heroImage: countries.heroImage,
        continent: countries.continent,
        localizedName: countriesI18n.name,
        about: countriesI18n.about,
      })
      .from(countries)
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, normalizedLocale)
        )
      )
      .where(
        and(
          inArray(countries.code, countryCodes),
          eq(countries.isActive, true),
          isNull(countries.deletedAt)
        )
      );

    // Maintain order from input array
    const countryMap = new Map<string, CountryWithI18n>();
    results.forEach(result => {
      countryMap.set(result.code, {
        id: result.id,
        code: result.code,
        name: result.name,
        heroImage: result.heroImage,
        continent: result.continent,
        localizedName: result.localizedName || result.name,
        about: result.about,
      });
    });

    return countryCodes
      .map(code => countryMap.get(code))
      .filter((country): country is CountryWithI18n => country !== undefined);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      `Failed to get countries by codes ${countryCodes.join(", ")}:`,
      error
    );
    return [];
  }
}
