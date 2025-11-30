import {
  and,
  countries,
  countriesI18n,
  desc,
  eq,
  getDb,
  isNull,
  sql,
  visaEligibility,
  visaEligibilityI18n,
  visaTypes,
  visaTypesI18n,
} from "@repo/database";
import { unstable_cache } from "next/cache";

/**
 * Service for visa-related database operations
 * Provides testable, reusable database query abstractions
 */

export interface VisaType {
  id: number;
  destinationCode: number;
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

export interface VisaTypeWithI18n {
  id: number;
  destinationCode: string;
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
  name: string;
  description: string | null;
  destinationName: string;
}

/**
 * Visa eligibility status for passport-destination combinations
 */
export type EligibilityStatus =
  | "required"
  | "visa_free"
  | "on_arrival"
  | "eta"
  | "not_allowed";

/**
 * Visa eligibility information for a specific passport-destination combination
 */
export interface VisaEligibilityInfo {
  destinationCode: string;
  destinationName: string;
  passportCode: string;
  passportName: string;
  eligibilityStatus: EligibilityStatus;
  maxStayDays?: number;
  notes?: string;
  visaTypes?: VisaTypeWithEligibility[];
}

/**
 * Visa type with eligibility information
 */
export interface VisaTypeWithEligibility extends VisaTypeWithI18n {
  eligibilityStatus: EligibilityStatus;
  maxStayDays?: number;
  eligibilityNotes?: string;
}

/**
 * Comprehensive visa requirements for a destination
 */
export interface VisaRequirements {
  destinationCode: string;
  destinationName: string;
  visaTypes: VisaTypeWithI18n[];
  visaFreeCountries: string[];
  visaOnArrivalCountries: string[];
  etaCountries: string[];
  notAllowedCountries: string[];
  generalRequirements: string[];
  processingTimeRange: { min: number; max: number };
  feeRange: { min: number; max: number; currency: string };
}

/**
 * Check visa eligibility for a specific passport-destination combination
 *
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 *
 * @param passportCode - Passport country code (3-letter ISO)
 * @param destinationCode - Destination country code (3-letter ISO)
 * @param locale - Language locale for localized content
 * @returns Promise<VisaEligibilityInfo | null> - Eligibility information or null if not found
 */
export async function checkVisaEligibility(
  passportCode: string,
  destinationCode: string,
  locale: string
): Promise<VisaEligibilityInfo | null> {
  const cachedFn = unstable_cache(
    async (): Promise<VisaEligibilityInfo | null> => {
      try {
        const db = getDb();

        // Get destination and passport country information
        const [destinationResult, passportResult] = await Promise.all([
          db
            .select({
              code: countries.code,
              name: countriesI18n.name,
            })
            .from(countries)
            .leftJoin(
              countriesI18n,
              and(
                eq(countries.code, countriesI18n.countryCode),
                eq(countriesI18n.locale, locale)
              )
            )
            .where(
              and(
                eq(countries.code, destinationCode),
                eq(countries.isActive, true),
                isNull(countries.deletedAt)
              )
            )
            .limit(1),

          db
            .select({
              code: countries.code,
              name: countriesI18n.name,
            })
            .from(countries)
            .leftJoin(
              countriesI18n,
              and(
                eq(countries.code, countriesI18n.countryCode),
                eq(countriesI18n.locale, locale)
              )
            )
            .where(
              and(
                eq(countries.code, passportCode),
                eq(countries.isActive, true),
                isNull(countries.deletedAt)
              )
            )
            .limit(1),
        ]);

        if (destinationResult.length === 0 || passportResult.length === 0) {
          return null;
        }

        const destination = destinationResult[0];
        const passport = passportResult[0];

        // Check eligibility status
        const eligibilityResults = await db
          .select({
            eligibilityStatus: visaEligibility.eligibilityStatus,
            maxStayDays: visaEligibility.maxStayDays,
            notes: visaEligibilityI18n.notes,
            visaTypeId: visaEligibility.visaTypeId,
          })
          .from(visaEligibility)
          .leftJoin(
            visaEligibilityI18n,
            and(
              eq(visaEligibility.id, visaEligibilityI18n.visaEligibilityId),
              eq(visaEligibilityI18n.locale, locale)
            )
          )
          .where(
            and(
              eq(visaEligibility.destinationCode, destination.code),
              eq(visaEligibility.passportCode, passport.code),
              eq(visaEligibility.isActive, true),
              isNull(visaEligibility.deletedAt)
            )
          );

        if (eligibilityResults.length === 0) {
          // Default to 'required' if no specific eligibility found
          const availableVisaTypes = await getVisaTypesByDestination(
            destinationCode,
            locale
          );
          return {
            destinationCode: destination.code,
            destinationName: destination.name || destination.code,
            passportCode: passport.code,
            passportName: passport.name || passport.code,
            eligibilityStatus: "required" as EligibilityStatus,
            visaTypes: availableVisaTypes.map(vt => ({
              ...vt,
              eligibilityStatus: "required" as EligibilityStatus,
            })),
          };
        }

        // Get the primary eligibility status (most permissive)
        const primaryEligibility = eligibilityResults.reduce(
          (prev, current) => {
            const statusPriority = {
              visa_free: 1,
              on_arrival: 2,
              eta: 3,
              required: 4,
              not_allowed: 5,
            };

            return statusPriority[
              current.eligibilityStatus as EligibilityStatus
            ] < statusPriority[prev.eligibilityStatus as EligibilityStatus]
              ? current
              : prev;
          }
        );

        // Get associated visa types if required
        let visaTypesWithEligibility: VisaTypeWithEligibility[] = [];
        if (
          primaryEligibility.eligibilityStatus === "required" ||
          primaryEligibility.eligibilityStatus === "eta"
        ) {
          const availableVisaTypes = await getVisaTypesByDestination(
            destinationCode,
            locale
          );
          visaTypesWithEligibility = availableVisaTypes.map(vt => ({
            ...vt,
            eligibilityStatus:
              primaryEligibility.eligibilityStatus as EligibilityStatus,
            maxStayDays: primaryEligibility.maxStayDays || undefined,
            eligibilityNotes: primaryEligibility.notes || undefined,
          }));
        }

        return {
          destinationCode: destination.code,
          destinationName: destination.name || destination.code,
          passportCode: passport.code,
          passportName: passport.name || passport.code,
          eligibilityStatus:
            primaryEligibility.eligibilityStatus as EligibilityStatus,
          maxStayDays: primaryEligibility.maxStayDays || undefined,
          notes: primaryEligibility.notes || undefined,
          visaTypes: visaTypesWithEligibility,
        };
      } catch (error) {
        console.error(
          `Failed to check visa eligibility for ${passportCode} -> ${destinationCode}:`,
          error
        );
        return null;
      }
    },
    ["visa-eligibility", passportCode, destinationCode, locale],
    {
      tags: [
        "visas",
        `visa-eligibility-${passportCode}-${destinationCode}`,
        `visas-${locale}`,
      ],
      revalidate: 86400,
    }
  );

  return cachedFn();
}

/**
 * Get eligible visa types for a specific passport-destination combination
 *
 * @param passportCode - Passport country code
 * @param destinationCode - Destination country code
 * @param locale - Language locale for localized content
 * @returns Promise<VisaTypeWithEligibility[]> - Array of eligible visa types
 */
export async function getEligibleVisaTypes(
  passportCode: string,
  destinationCode: string,
  locale: string
): Promise<VisaTypeWithEligibility[]> {
  const eligibilityInfo = await checkVisaEligibility(
    passportCode,
    destinationCode,
    locale
  );
  return eligibilityInfo?.visaTypes || [];
}

/**
 * Get comprehensive visa requirements for a destination
 *
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 *
 * @param destinationCode - Destination country code
 * @param locale - Language locale for localized content
 * @returns Promise<VisaRequirements | null> - Complete visa requirements information
 */
export async function getVisaRequirements(
  destinationCode: string,
  locale: string
): Promise<VisaRequirements | null> {
  const cachedFn = unstable_cache(
    async (): Promise<VisaRequirements | null> => {
      try {
        const db = getDb();

        // Get destination information
        const destinationResult = await db
          .select({
            id: countries.code,
            code: countries.code,
            name: countriesI18n.name,
          })
          .from(countries)
          .leftJoin(
            countriesI18n,
            and(
              eq(countries.code, countriesI18n.countryCode),
              eq(countriesI18n.locale, locale)
            )
          )
          .where(
            and(
              eq(countries.code, destinationCode),
              eq(countries.isActive, true),
              isNull(countries.deletedAt)
            )
          )
          .limit(1);

        if (destinationResult.length === 0) {
          return null;
        }

        const destination = destinationResult[0];

        // Get all visa types for this destination
        const visaTypesForDestination = await getVisaTypesByDestination(
          destinationCode,
          locale
        );

        // Get eligibility information grouped by status
        const eligibilityResults = await db
          .select({
            eligibilityStatus: visaEligibility.eligibilityStatus,
            passportCode: countries.code,
          })
          .from(visaEligibility)
          .innerJoin(
            countries,
            eq(visaEligibility.passportCode, countries.code)
          )
          .where(
            and(
              eq(visaEligibility.destinationCode, destination.id),
              eq(visaEligibility.isActive, true),
              isNull(visaEligibility.deletedAt),
              eq(countries.isActive, true),
              isNull(countries.deletedAt)
            )
          );

        // Group countries by eligibility status
        const visaFreeCountries = eligibilityResults
          .filter(er => er.eligibilityStatus === "visa_free")
          .map(er => er.passportCode);

        const visaOnArrivalCountries = eligibilityResults
          .filter(er => er.eligibilityStatus === "on_arrival")
          .map(er => er.passportCode);

        const etaCountries = eligibilityResults
          .filter(er => er.eligibilityStatus === "eta")
          .map(er => er.passportCode);

        const notAllowedCountries = eligibilityResults
          .filter(er => er.eligibilityStatus === "not_allowed")
          .map(er => er.passportCode);

        // Calculate processing time and fee ranges
        const processingTimes = visaTypesForDestination.map(
          vt => vt.processingTime
        );
        const fees = visaTypesForDestination.map(vt => vt.fee);
        const currency = visaTypesForDestination[0]?.currency || "USD";

        return {
          destinationCode: destination.code,
          destinationName: destination.name || destination.code,
          visaTypes: visaTypesForDestination,
          visaFreeCountries,
          visaOnArrivalCountries,
          etaCountries,
          notAllowedCountries,
          generalRequirements: [], // Can be enhanced with actual requirements data
          processingTimeRange: {
            min: Math.min(...processingTimes) || 0,
            max: Math.max(...processingTimes) || 0,
          },
          feeRange: {
            min: Math.min(...fees) || 0,
            max: Math.max(...fees) || 0,
            currency,
          },
        };
      } catch (error) {
        console.error(
          `Failed to get visa requirements for ${destinationCode}:`,
          error
        );
        return null;
      }
    },
    ["visa-requirements", destinationCode, locale],
    {
      tags: [
        "visas",
        `visa-requirements-${destinationCode}`,
        `visas-${locale}`,
      ],
      revalidate: 86400,
    }
  );

  return cachedFn();
}

/**
 * Get random visa types with localized information
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 */
export async function getRandomVisaTypes(
  locale: string,
  limit = 6
): Promise<VisaTypeWithI18n[]> {
  const cachedFn = unstable_cache(
    async (): Promise<VisaTypeWithI18n[]> => {
      try {
        const db = getDb();

        const results = await db
          .select({
            id: visaTypes.id,
            destinationCode: visaTypes.destinationCode,
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
          .innerJoin(countries, eq(visaTypes.destinationCode, countries.code))
          .leftJoin(
            countriesI18n,
            and(
              eq(countries.code, countriesI18n.countryCode),
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
          .orderBy(sql`RANDOM()`)
          .limit(limit);

        return results.map(result => ({
          id: result.id,
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
        console.warn(
          `Failed to get random visa types for locale ${locale}:`,
          error
        );
        return [];
      }
    },
    ["random-visa-types", locale, limit.toString()],
    { tags: ["visas", `visas-${locale}`], revalidate: 86400 }
  );

  return cachedFn();
}

/**
 * Get visa types by destination country code
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 */
export async function getVisaTypesByDestination(
  destinationCode: string,
  locale: string
): Promise<VisaTypeWithI18n[]> {
  const cachedFn = unstable_cache(
    async (): Promise<VisaTypeWithI18n[]> => {
      try {
        const db = getDb();

        const results = await db
          .select({
            id: visaTypes.id,
            destinationCode: visaTypes.destinationCode,
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
          .innerJoin(countries, eq(visaTypes.destinationCode, countries.code))
          .leftJoin(
            countriesI18n,
            and(
              eq(countries.code, countriesI18n.countryCode),
              eq(countriesI18n.locale, locale)
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
        console.warn(
          `Failed to get visa types for destination ${destinationCode}:`,
          error
        );
        return [];
      }
    },
    ["visa-types-destination", destinationCode, locale],
    {
      tags: ["visas", `visa-types-${destinationCode}`, `visas-${locale}`],
      revalidate: 86400,
    }
  );

  return cachedFn();
}

/**
 * Get all visa types with localized information
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 */
export async function getAllVisaTypes(
  locale: string
): Promise<VisaTypeWithI18n[]> {
  const cachedFn = unstable_cache(
    async (): Promise<VisaTypeWithI18n[]> => {
      try {
        const db = getDb();

        const results = await db
          .select({
            id: visaTypes.id,
            destinationCode: visaTypes.destinationCode,
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
          .innerJoin(countries, eq(visaTypes.destinationCode, countries.code))
          .leftJoin(
            countriesI18n,
            and(
              eq(countries.code, countriesI18n.countryCode),
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
        console.warn(
          `Failed to get all visa types for locale ${locale}:`,
          error
        );
        return [];
      }
    },
    ["all-visa-types", locale],
    { tags: ["visas", `visas-${locale}`], revalidate: 86400 }
  );

  return cachedFn();
}

/**
 * Get visa type by ID
 * Cached for 24 hours (86400 seconds) with ISR revalidation tag
 */
export async function getVisaTypeById(
  visaTypeId: number,
  locale: string
): Promise<VisaTypeWithI18n | null> {
  const cachedFn = unstable_cache(
    async (): Promise<VisaTypeWithI18n | null> => {
      try {
        const db = getDb();

        const results = await db
          .select({
            id: visaTypes.id,
            destinationCode: visaTypes.destinationCode,
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
          .innerJoin(countries, eq(visaTypes.destinationCode, countries.code))
          .leftJoin(
            countriesI18n,
            and(
              eq(countries.code, countriesI18n.countryCode),
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
        console.warn(`Failed to get visa type by ID ${visaTypeId}:`, error);
        return null;
      }
    },
    ["visa-type-by-id", visaTypeId.toString(), locale],
    {
      tags: ["visas", `visa-type-${visaTypeId}`, `visas-${locale}`],
      revalidate: 86400,
    }
  );

  return cachedFn();
}
