import { and, eq, isNull, desc, sql } from "drizzle-orm";
import { visaTypes, visaTypesI18n } from "../db/schema/visa-types";
import { countries, countriesI18n } from "../db/schema/countries";
import {
  getDbAsync,
  isDatabaseAvailableAsync,
  type Database,
} from "../db/connection";

/**
 * Service for visa-related database operations
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

  const supportedLocales = ["en", "es", "ar", "pt", "ru", "de", "fr", "it"];
  const primaryLocale = locale.toLowerCase().split("-")[0];

  return supportedLocales.includes(primaryLocale) ? primaryLocale : "en";
}

export interface VisaType {
  id: number;
  destinationId: number;
  type: string;
  duration: number;
  maxStay: number | null;
  processingTime: number;
  fee: number;
  currency: string;
  requiresInterview: boolean;
  isMultiEntry: boolean;
  requirements: string[] | null;
  documents: string[] | null;
}

export interface VisaTypeWithI18n extends VisaType {
  name: string;
  description: string | null;
  destinationCode: string;
  destinationName: string;
}

/**
 * Get random visa types with localized information
 */
export async function getRandomVisaTypes(
  locale: string,
  limit: number = 6
): Promise<VisaTypeWithI18n[]> {
  const isDatabaseReady = await isDatabaseAvailableAsync();
  if (!isDatabaseReady) {
    // eslint-disable-next-line no-console
    console.warn("Database not available, returning empty visa types");
    return [];
  }

  try {
    const db = (await getDbAsync()) as Database;
    const normalizedLocale = normalizeLocale(locale);

    const results = await db
      .select({
        id: visaTypes.id,
        destinationId: visaTypes.destinationId,
        type: visaTypes.type,
        duration: visaTypes.duration,
        maxStay: visaTypes.maxStay,
        processingTime: visaTypes.processingTime,
        fee: visaTypes.fee,
        currency: visaTypes.currency,
        requiresInterview: visaTypes.requiresInterview,
        isMultiEntry: visaTypes.isMultiEntry,
        requirements: visaTypes.requirements,
        documents: visaTypes.documents,
        name: visaTypesI18n.name,
        description: visaTypesI18n.description,
        destinationCode: countries.code,
        destinationName: countriesI18n.name,
      })
      .from(visaTypes)
      .leftJoin(
        visaTypesI18n,
        and(
          eq(visaTypes.id, visaTypesI18n.visaTypeId),
          eq(visaTypesI18n.locale, normalizedLocale)
        )
      )
      .innerJoin(countries, eq(visaTypes.destinationId, countries.id))
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, normalizedLocale)
        )
      )
      .where(
        and(
          eq(visaTypes.isActive, true),
          isNull(visaTypes.deletedAt),
          eq(countries.isActive, true),
          isNull(countries.deletedAt)
        )
      )
      .orderBy(sql`RANDOM()`)
      .limit(limit);

    // Apply English fallback if needed and not using English
    if (normalizedLocale !== "en") {
      const missingTranslations = results.filter(
        r => !r.name || !r.destinationName
      );

      if (missingTranslations.length > 0) {
        const missingVisaIds = missingTranslations
          .filter(r => !r.name)
          .map(r => r.id);
        const missingCountryIds = missingTranslations
          .filter(r => !r.destinationName)
          .map(r => r.destinationId);

        const englishVisaResults =
          missingVisaIds.length > 0
            ? await db
                .select({
                  visaTypeId: visaTypesI18n.visaTypeId,
                  name: visaTypesI18n.name,
                  description: visaTypesI18n.description,
                })
                .from(visaTypesI18n)
                .where(eq(visaTypesI18n.locale, "en"))
            : [];

        const englishCountryResults =
          missingCountryIds.length > 0
            ? await db
                .select({
                  countryId: countriesI18n.countryId,
                  name: countriesI18n.name,
                })
                .from(countriesI18n)
                .where(eq(countriesI18n.locale, "en"))
            : [];

        // Create maps for quick lookup
        const englishVisaMap = new Map<
          number,
          { name: string; description: string | null }
        >();
        englishVisaResults.forEach(ev => {
          englishVisaMap.set(ev.visaTypeId, {
            name: ev.name,
            description: ev.description,
          });
        });

        const englishCountryMap = new Map<number, string>();
        englishCountryResults.forEach(ec => {
          englishCountryMap.set(ec.countryId, ec.name);
        });

        // Apply fallbacks
        results.forEach(result => {
          if (!result.name && englishVisaMap.has(result.id)) {
            const englishVisa = englishVisaMap.get(result.id)!;
            result.name = englishVisa.name;
            if (!result.description) {
              result.description = englishVisa.description;
            }
          }
          if (
            !result.destinationName &&
            englishCountryMap.has(result.destinationId)
          ) {
            result.destinationName = englishCountryMap.get(
              result.destinationId
            )!;
          }
        });
      }
    }

    return results.map(result => ({
      id: result.id,
      destinationId: result.destinationId,
      type: result.type,
      duration: result.duration,
      maxStay: result.maxStay,
      processingTime: result.processingTime,
      fee: result.fee,
      currency: result.currency,
      requiresInterview: result.requiresInterview,
      isMultiEntry: result.isMultiEntry,
      requirements: result.requirements,
      documents: result.documents,
      name: result.name || result.type,
      description: result.description,
      destinationCode: result.destinationCode,
      destinationName: result.destinationName || result.destinationCode,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      `Failed to get random visa types for locale ${locale}:`,
      error
    );
    return [];
  }
}

/**
 * Get visa types by destination country code
 */
export async function getVisaTypesByDestination(
  destinationCode: string,
  locale: string
): Promise<VisaTypeWithI18n[]> {
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
        id: visaTypes.id,
        destinationId: visaTypes.destinationId,
        type: visaTypes.type,
        duration: visaTypes.duration,
        maxStay: visaTypes.maxStay,
        processingTime: visaTypes.processingTime,
        fee: visaTypes.fee,
        currency: visaTypes.currency,
        requiresInterview: visaTypes.requiresInterview,
        isMultiEntry: visaTypes.isMultiEntry,
        requirements: visaTypes.requirements,
        documents: visaTypes.documents,
        name: visaTypesI18n.name,
        description: visaTypesI18n.description,
        destinationCode: countries.code,
        destinationName: countriesI18n.name,
      })
      .from(visaTypes)
      .leftJoin(
        visaTypesI18n,
        and(
          eq(visaTypes.id, visaTypesI18n.visaTypeId),
          eq(visaTypesI18n.locale, normalizedLocale)
        )
      )
      .innerJoin(countries, eq(visaTypes.destinationId, countries.id))
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, normalizedLocale)
        )
      )
      .where(
        and(
          eq(countries.code, destinationCode),
          eq(visaTypes.isActive, true),
          isNull(visaTypes.deletedAt),
          eq(countries.isActive, true),
          isNull(countries.deletedAt)
        )
      )
      .orderBy(desc(visaTypes.createdAt));

    return results.map(result => ({
      id: result.id,
      destinationId: result.destinationId,
      type: result.type,
      duration: result.duration,
      maxStay: result.maxStay,
      processingTime: result.processingTime,
      fee: result.fee,
      currency: result.currency,
      requiresInterview: result.requiresInterview,
      isMultiEntry: result.isMultiEntry,
      requirements: result.requirements,
      documents: result.documents,
      name: result.name || result.type,
      description: result.description,
      destinationCode: result.destinationCode,
      destinationName: result.destinationName || result.destinationCode,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(
      `Failed to get visa types for destination ${destinationCode}:`,
      error
    );
    return [];
  }
}

/**
 * Get all visa types with localized information
 */
export async function getAllVisaTypes(
  locale: string
): Promise<VisaTypeWithI18n[]> {
  const isDatabaseReady = await isDatabaseAvailableAsync();
  if (!isDatabaseReady) {
    // eslint-disable-next-line no-console
    console.warn("Database not available");
    return [];
  }

  try {
    const db = (await getDbAsync()) as Database;

    const results = await db
      .select({
        id: visaTypes.id,
        destinationId: visaTypes.destinationId,
        type: visaTypes.type,
        duration: visaTypes.duration,
        maxStay: visaTypes.maxStay,
        processingTime: visaTypes.processingTime,
        fee: visaTypes.fee,
        currency: visaTypes.currency,
        requiresInterview: visaTypes.requiresInterview,
        isMultiEntry: visaTypes.isMultiEntry,
        requirements: visaTypes.requirements,
        documents: visaTypes.documents,
        name: visaTypesI18n.name,
        description: visaTypesI18n.description,
        destinationCode: countries.code,
        destinationName: countriesI18n.name,
      })
      .from(visaTypes)
      .leftJoin(
        visaTypesI18n,
        and(
          eq(visaTypes.id, visaTypesI18n.visaTypeId),
          eq(visaTypesI18n.locale, locale)
        )
      )
      .innerJoin(countries, eq(visaTypes.destinationId, countries.id))
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, locale)
        )
      )
      .where(
        and(
          eq(visaTypes.isActive, true),
          isNull(visaTypes.deletedAt),
          eq(countries.isActive, true),
          isNull(countries.deletedAt)
        )
      )
      .orderBy(desc(visaTypes.createdAt));

    return results.map(result => ({
      id: result.id,
      destinationId: result.destinationId,
      type: result.type,
      duration: result.duration,
      maxStay: result.maxStay,
      processingTime: result.processingTime,
      fee: result.fee,
      currency: result.currency,
      requiresInterview: result.requiresInterview,
      isMultiEntry: result.isMultiEntry,
      requirements: result.requirements,
      documents: result.documents,
      name: result.name || result.type,
      description: result.description,
      destinationCode: result.destinationCode,
      destinationName: result.destinationName || result.destinationCode,
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to get all visa types for locale ${locale}:`, error);
    return [];
  }
}

/**
 * Get visa type by ID
 */
export async function getVisaTypeById(
  visaTypeId: number,
  locale: string
): Promise<VisaTypeWithI18n | null> {
  const isDatabaseReady = await isDatabaseAvailableAsync();
  if (!isDatabaseReady) {
    // eslint-disable-next-line no-console
    console.warn("Database not available");
    return null;
  }

  try {
    const db = (await getDbAsync()) as Database;

    const results = await db
      .select({
        id: visaTypes.id,
        destinationId: visaTypes.destinationId,
        type: visaTypes.type,
        duration: visaTypes.duration,
        maxStay: visaTypes.maxStay,
        processingTime: visaTypes.processingTime,
        fee: visaTypes.fee,
        currency: visaTypes.currency,
        requiresInterview: visaTypes.requiresInterview,
        isMultiEntry: visaTypes.isMultiEntry,
        requirements: visaTypes.requirements,
        documents: visaTypes.documents,
        name: visaTypesI18n.name,
        description: visaTypesI18n.description,
        destinationCode: countries.code,
        destinationName: countriesI18n.name,
      })
      .from(visaTypes)
      .leftJoin(
        visaTypesI18n,
        and(
          eq(visaTypes.id, visaTypesI18n.visaTypeId),
          eq(visaTypesI18n.locale, locale)
        )
      )
      .innerJoin(countries, eq(visaTypes.destinationId, countries.id))
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, locale)
        )
      )
      .where(
        and(
          eq(visaTypes.id, visaTypeId),
          eq(visaTypes.isActive, true),
          isNull(visaTypes.deletedAt),
          eq(countries.isActive, true),
          isNull(countries.deletedAt)
        )
      )
      .limit(1);

    if (results.length === 0) {
      return null;
    }

    const result = results[0];
    return {
      id: result.id,
      destinationId: result.destinationId,
      type: result.type,
      duration: result.duration,
      maxStay: result.maxStay,
      processingTime: result.processingTime,
      fee: result.fee,
      currency: result.currency,
      requiresInterview: result.requiresInterview,
      isMultiEntry: result.isMultiEntry,
      requirements: result.requirements,
      documents: result.documents,
      name: result.name || result.type,
      description: result.description,
      destinationCode: result.destinationCode,
      destinationName: result.destinationName || result.destinationCode,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to get visa type by ID ${visaTypeId}:`, error);
    return null;
  }
}
