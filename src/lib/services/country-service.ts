import { and, eq, inArray, isNull, or, isNotNull, sql } from "drizzle-orm";

/**
 * Input validation and sanitization utilities
 */

/**
 * Validate and sanitize country code
 */
function validateCountryCode(code: string): string | null {
  if (!code || typeof code !== "string") return null;

  const sanitized = code.trim().toUpperCase();
  // Basic validation for 2-3 character country codes
  if (!/^[A-Z]{2,3}$/.test(sanitized)) return null;

  return sanitized;
}

/**
 * Validate sort criteria
 */
function validateSortBy(
  sortBy: string
): "popular" | "alphabetical" | "processing_time" | "visa_fee" {
  const validSorts = [
    "popular",
    "alphabetical",
    "processing_time",
    "visa_fee",
  ] as const;
  type ValidSortBy = (typeof validSorts)[number];
  return validSorts.includes(sortBy as ValidSortBy)
    ? (sortBy as ValidSortBy)
    : "popular";
}

/**
 * Validate limit parameter
 */
function validateLimit(limit: number): number {
  if (!limit || typeof limit !== "number" || limit < 1) return 20;
  return Math.min(Math.max(1, Math.floor(limit)), 100); // Max 100 results
}
import { countries, countriesI18n } from "../db/schema/countries";
import { visaTypes, visaTypesI18n } from "../db/schema/visa-types";
import { visaEligibility } from "../db/schema/visa-eligibility";
import { getDb } from "../db/connection";

/**
 * Service for country-related database operations
 * Provides testable, reusable database query abstractions
 */

export interface Country {
  id: number;
  code: string;
  name: string;
}

export interface CountryWithI18n extends Country {
  localizedName: string;
  heroImage: string | null;
  about: string | null;
}

/**
 * Enhanced destination interface with visa type relationships
 */
export interface DestinationWithVisaTypes extends CountryWithI18n {
  visaTypes: VisaTypeInfo[];
  totalVisaTypes: number;
  hasVisaFreeEntry: boolean;
  hasVisaOnArrival: boolean;
  continent?: string;
  region?: string | null;
}

/**
 * Visa type information for destinations
 */
export interface VisaTypeInfo {
  id: number;
  type: string;
  name: string;
  duration: number;
  fee: number;
  currency: string;
  processingTime: number;
  requiresInterview: boolean;
  isMultiEntry: boolean;
}

/**
 * Destination metadata for catalog listings
 */
export interface DestinationMetadata {
  id: number;
  code: string;
  name: string;
  localizedName: string;
  heroImage: string | null;
  about: string | null;
  continent: string;
  region: string | null;
  totalVisaTypes: number;
  avgProcessingTime: number;
  minVisaFee: number;
  hasVisaFreeOptions: boolean;
}

export interface PaginatedDestinationsResponse {
  destinations: DestinationMetadata[];
  total: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
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

  try {
    const db = getDb();

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
    console.warn(
      `Failed to get country names for ${countryCodes.join(", ")} (${locale}):`,
      error
    );
    return countryCodes; // Fallback to codes if queries fail
  }
}
/**
 * Get all countries for a specific locale
 */
export async function getAllCountries(
  locale: string
): Promise<CountryWithI18n[]> {
  try {
    const db = getDb();

    const results = await db
      .select({
        id: countries.id,
        code: countries.code,
        name: countries.code, // Use code as fallback name since countries table doesn't have name field
        heroImage: countries.heroImage,
        localizedName: countriesI18n.name,
        about: countriesI18n.about,
      })
      .from(countries)
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, locale)
        )
      )
      .where(isNull(countries.deletedAt));

    return results.map(result => ({
      id: result.id,
      code: result.code,
      name: result.name,
      heroImage: result.heroImage,
      localizedName: result.localizedName || result.name,
      about: result.about,
    }));
  } catch (error) {
    console.warn(`Failed to get all countries for locale ${locale}:`, error);
    return [];
  }
}

/**
 * Get country by code
 */
export async function getCountryByCode(
  countryCode: string,
  locale?: string
): Promise<CountryWithI18n | null> {
  try {
    const db = getDb();

    const results = await db
      .select({
        id: countries.id,
        code: countries.code,
        name: countries.code, // Use code as fallback name since countries table doesn't have name field
        heroImage: countries.heroImage,
        localizedName: countriesI18n.name,
        about: countriesI18n.about,
      })
      .from(countries)
      .leftJoin(
        countriesI18n,
        locale
          ? and(
              eq(countries.id, countriesI18n.countryId),
              eq(countriesI18n.locale, locale)
            )
          : eq(countries.id, countriesI18n.countryId)
      )
      .where(and(eq(countries.code, countryCode), isNull(countries.deletedAt)))
      .limit(1);

    if (results.length === 0) {
      return null;
    }

    const result = results[0];
    return {
      id: result.id,
      code: result.code,
      name: result.name,
      heroImage: result.heroImage,
      localizedName: result.localizedName || result.name,
      about: result.about,
    };
  } catch (error) {
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

  try {
    const db = getDb();

    const results = await db
      .select({
        id: countries.id,
        code: countries.code,
        name: countries.code, // Use code as fallback name since countries table doesn't have name field
        heroImage: countries.heroImage,
        localizedName: countriesI18n.name,
        about: countriesI18n.about,
      })
      .from(countries)
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, locale)
        )
      )
      .where(isNull(countries.deletedAt))
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
        localizedName: result.localizedName || result.name,
        about: result.about,
      }));
  } catch (error) {
    console.warn(`Failed to search countries with query "${query}":`, error);
    return [];
  }
}

/**
 * Get destinations with comprehensive metadata for catalog listings
 * Replaces the legacy getPopularDestinations() function with enhanced data
 *
 * @param locale - Language locale for localized content
 * @param limit - Maximum number of destinations to return
 * @param sortBy - Sort criteria: 'popular', 'alphabetical', 'processing_time', 'visa_fee'
 * @returns Promise<DestinationMetadata[]> - Array of destination metadata
 */
export async function getDestinationsListWithMetadata(
  locale: string,
  limit: number = 20,
  sortBy:
    | "popular"
    | "alphabetical"
    | "processing_time"
    | "visa_fee" = "popular"
): Promise<DestinationMetadata[]> {
  const validatedLimit = validateLimit(limit);
  const validatedSortBy = validateSortBy(sortBy);

  try {
    const db = getDb();

    // Build query to get countries that have either visa types or visa-free options
    const results = await db
      .select({
        id: countries.id,
        code: countries.code,
        name: countries.code,
        localizedName: countriesI18n.name,
        heroImage: countries.heroImage,
        about: countriesI18n.about,
        continent: countries.continent,
        region: countries.region,
      })
      .from(countries)
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, locale)
        )
      )
      .leftJoin(
        visaTypes,
        and(
          eq(visaTypes.destinationId, countries.id),
          eq(visaTypes.isActive, true),
          isNull(visaTypes.deletedAt)
        )
      )
      .leftJoin(
        visaEligibility,
        and(
          eq(visaEligibility.destinationId, countries.id),
          inArray(visaEligibility.eligibilityStatus, [
            "visa_free",
            "on_arrival",
          ]),
          eq(visaEligibility.isActive, true),
          isNull(visaEligibility.deletedAt)
        )
      )
      .where(
        and(
          eq(countries.isActive, true),
          isNull(countries.deletedAt),
          // Only include countries that have either visa types OR visa-free options
          or(
            isNotNull(visaTypes.id), // Has visa types
            isNotNull(visaEligibility.id) // Has visa-free/on-arrival options
          )
        )
      )
      .limit(validatedLimit);

    // Remove duplicates based on country ID
    const uniqueResults = results.filter(
      (destination, index, arr) =>
        arr.findIndex(d => d.id === destination.id) === index
    );

    // For each destination, get visa statistics
    const destinationsWithStats = await Promise.all(
      uniqueResults.map(async destination => {
        const visaStats = await db
          .select({
            count: visaTypes.id,
            avgProcessingTime: visaTypes.processingTime,
            minFee: visaTypes.fee,
          })
          .from(visaTypes)
          .where(
            and(
              eq(visaTypes.destinationId, destination.id),
              eq(visaTypes.isActive, true),
              isNull(visaTypes.deletedAt)
            )
          );

        const totalVisaTypes = visaStats.length;
        const avgProcessingTime =
          totalVisaTypes > 0
            ? Math.round(
                visaStats.reduce((sum, v) => sum + v.avgProcessingTime, 0) /
                  totalVisaTypes
              )
            : 0;
        const minVisaFee =
          totalVisaTypes > 0 ? Math.min(...visaStats.map(v => v.minFee)) : 0;

        // Check for visa-free options
        const visaFreeCount = await db
          .select({ count: visaEligibility.id })
          .from(visaEligibility)
          .where(
            and(
              eq(visaEligibility.destinationId, destination.id),
              inArray(visaEligibility.eligibilityStatus, [
                "visa_free",
                "on_arrival",
              ]),
              eq(visaEligibility.isActive, true),
              isNull(visaEligibility.deletedAt)
            )
          );

        return {
          id: destination.id,
          code: destination.code,
          name: destination.name,
          localizedName: destination.localizedName || destination.name,
          heroImage: destination.heroImage,
          about: destination.about,
          continent: destination.continent,
          region: destination.region,
          totalVisaTypes,
          avgProcessingTime,
          minVisaFee,
          hasVisaFreeOptions: visaFreeCount.length > 0,
        };
      })
    );

    // Apply sorting
    switch (validatedSortBy) {
      case "alphabetical":
        return destinationsWithStats.sort((a, b) =>
          a.localizedName.localeCompare(b.localizedName, locale)
        );
      case "processing_time":
        return destinationsWithStats.sort(
          (a, b) => a.avgProcessingTime - b.avgProcessingTime
        );
      case "visa_fee":
        return destinationsWithStats.sort(
          (a, b) => a.minVisaFee - b.minVisaFee
        );
      case "popular":
      default:
        // Sort by visa-free options first, then by total visa types
        return destinationsWithStats.sort((a, b) => {
          if (a.hasVisaFreeOptions && !b.hasVisaFreeOptions) return -1;
          if (!a.hasVisaFreeOptions && b.hasVisaFreeOptions) return 1;
          return b.totalVisaTypes - a.totalVisaTypes;
        });
    }
  } catch (error) {
    console.error(
      `Failed to get destinations list for locale ${locale}:`,
      error
    );
    return [];
  }
}

/**
 * Get destinations list with metadata, pagination, and filtering support
 *
 * @param locale - Language locale for localized content
 * @param limit - Number of destinations per page
 * @param offset - Number of destinations to skip
 * @param sortBy - Sort criteria: 'popular', 'alphabetical', 'processing_time', 'visa_fee'
 * @param search - Optional search term for destination names
 * @param continent - Optional continent filter
 * @returns Promise<PaginatedDestinationsResponse> - Paginated destinations with metadata
 */
export async function getDestinationsListWithMetadataPaginated(
  locale: string,
  limit: number = 20,
  offset: number = 0,
  sortBy:
    | "popular"
    | "alphabetical"
    | "processing_time"
    | "visa_fee" = "popular",
  search?: string,
  continent?: string
): Promise<PaginatedDestinationsResponse> {
  const validatedLimit = validateLimit(limit);
  const validatedSortBy = validateSortBy(sortBy);
  const validatedOffset = Math.max(0, Math.floor(offset));

  try {
    const db = getDb();

    // Build base where conditions
    const baseWhereConditions = [
      eq(countries.isActive, true),
      isNull(countries.deletedAt),
      // Only include countries that have either visa types OR visa-free options
      or(
        isNotNull(visaTypes.id), // Has visa types
        isNotNull(visaEligibility.id) // Has visa-free/on-arrival options
      ),
    ];

    // Add search filter
    if (search && search.trim()) {
      const searchTerm = `%${search.trim().toLowerCase()}%`;
      baseWhereConditions.push(
        or(
          sql`LOWER(${countriesI18n.name}) LIKE ${searchTerm}`,
          sql`LOWER(${countries.code}) LIKE ${searchTerm}`
        )
      );
    }

    // Add continent filter
    if (continent && continent.toLowerCase() !== "all") {
      baseWhereConditions.push(
        sql`LOWER(${countries.continent}) = ${continent.toLowerCase()}`
      );
    }

    // Get total count first
    const totalCountQuery = db
      .selectDistinct({ id: countries.id })
      .from(countries)
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, locale)
        )
      )
      .leftJoin(
        visaTypes,
        and(
          eq(visaTypes.destinationId, countries.id),
          eq(visaTypes.isActive, true),
          isNull(visaTypes.deletedAt)
        )
      )
      .leftJoin(
        visaEligibility,
        and(
          eq(visaEligibility.destinationId, countries.id),
          inArray(visaEligibility.eligibilityStatus, [
            "visa_free",
            "on_arrival",
          ]),
          eq(visaEligibility.isActive, true),
          isNull(visaEligibility.deletedAt)
        )
      )
      .where(and(...baseWhereConditions));

    const totalCountResults = await totalCountQuery;
    const total = totalCountResults.length;

    // Calculate pagination info
    const currentPage = Math.floor(validatedOffset / validatedLimit) + 1;
    const totalPages = Math.ceil(total / validatedLimit);
    const hasMore = validatedOffset + validatedLimit < total;

    // Get paginated results
    const results = await db
      .select({
        id: countries.id,
        code: countries.code,
        name: countries.code,
        localizedName: countriesI18n.name,
        heroImage: countries.heroImage,
        about: countriesI18n.about,
        continent: countries.continent,
        region: countries.region,
      })
      .from(countries)
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, locale)
        )
      )
      .leftJoin(
        visaTypes,
        and(
          eq(visaTypes.destinationId, countries.id),
          eq(visaTypes.isActive, true),
          isNull(visaTypes.deletedAt)
        )
      )
      .leftJoin(
        visaEligibility,
        and(
          eq(visaEligibility.destinationId, countries.id),
          inArray(visaEligibility.eligibilityStatus, [
            "visa_free",
            "on_arrival",
          ]),
          eq(visaEligibility.isActive, true),
          isNull(visaEligibility.deletedAt)
        )
      )
      .where(and(...baseWhereConditions))
      .limit(validatedLimit)
      .offset(validatedOffset);

    // Remove duplicates based on country ID
    const uniqueResults = results.filter(
      (destination, index, arr) =>
        arr.findIndex(d => d.id === destination.id) === index
    );

    // For each destination, get visa statistics
    const destinationsWithStats = await Promise.all(
      uniqueResults.map(async destination => {
        const visaStats = await db
          .select({
            count: visaTypes.id,
            avgProcessingTime: visaTypes.processingTime,
            minFee: visaTypes.fee,
          })
          .from(visaTypes)
          .where(
            and(
              eq(visaTypes.destinationId, destination.id),
              eq(visaTypes.isActive, true),
              isNull(visaTypes.deletedAt)
            )
          );

        const totalVisaTypes = visaStats.length;
        const avgProcessingTime =
          totalVisaTypes > 0
            ? Math.round(
                visaStats.reduce((sum, v) => sum + v.avgProcessingTime, 0) /
                  totalVisaTypes
              )
            : 0;
        const minVisaFee =
          totalVisaTypes > 0 ? Math.min(...visaStats.map(v => v.minFee)) : 0;

        // Check for visa-free options
        const visaFreeCount = await db
          .select({ count: visaEligibility.id })
          .from(visaEligibility)
          .where(
            and(
              eq(visaEligibility.destinationId, destination.id),
              inArray(visaEligibility.eligibilityStatus, [
                "visa_free",
                "on_arrival",
              ]),
              eq(visaEligibility.isActive, true),
              isNull(visaEligibility.deletedAt)
            )
          );

        return {
          id: destination.id,
          code: destination.code,
          name: destination.name,
          localizedName: destination.localizedName || destination.name,
          heroImage: destination.heroImage,
          about: destination.about,
          continent: destination.continent,
          region: destination.region,
          totalVisaTypes,
          avgProcessingTime,
          minVisaFee,
          hasVisaFreeOptions: visaFreeCount.length > 0,
        };
      })
    );

    // Apply sorting
    let sortedDestinations: DestinationMetadata[];
    switch (validatedSortBy) {
      case "alphabetical":
        sortedDestinations = destinationsWithStats.sort((a, b) =>
          a.localizedName.localeCompare(b.localizedName, locale)
        );
        break;
      case "processing_time":
        sortedDestinations = destinationsWithStats.sort(
          (a, b) => a.avgProcessingTime - b.avgProcessingTime
        );
        break;
      case "visa_fee":
        sortedDestinations = destinationsWithStats.sort(
          (a, b) => a.minVisaFee - b.minVisaFee
        );
        break;
      case "popular":
      default:
        // Sort by visa-free options first, then by total visa types
        sortedDestinations = destinationsWithStats.sort((a, b) => {
          if (a.hasVisaFreeOptions && !b.hasVisaFreeOptions) return -1;
          if (!a.hasVisaFreeOptions && b.hasVisaFreeOptions) return 1;
          return b.totalVisaTypes - a.totalVisaTypes;
        });
        break;
    }

    return {
      destinations: sortedDestinations,
      total,
      hasMore,
      currentPage,
      totalPages,
    };
  } catch (error) {
    console.error(
      `Failed to get paginated destinations list for locale ${locale}:`,
      error
    );
    return {
      destinations: [],
      total: 0,
      hasMore: false,
      currentPage: 1,
      totalPages: 0,
    };
  }
}

/**
 * Get unique continents for destinations filter (lightweight query)
 *
 * @param locale - Language locale (not used but kept for consistency)
 * @returns Promise<string[]> - Array of unique continent names
 */
export async function getDestinationContinents(
  _locale?: string
): Promise<string[]> {
  try {
    const db = getDb();

    const results = await db
      .selectDistinct({ continent: countries.continent })
      .from(countries)
      .leftJoin(
        visaTypes,
        and(
          eq(visaTypes.destinationId, countries.id),
          eq(visaTypes.isActive, true),
          isNull(visaTypes.deletedAt)
        )
      )
      .leftJoin(
        visaEligibility,
        and(
          eq(visaEligibility.destinationId, countries.id),
          inArray(visaEligibility.eligibilityStatus, [
            "visa_free",
            "on_arrival",
          ]),
          eq(visaEligibility.isActive, true),
          isNull(visaEligibility.deletedAt)
        )
      )
      .where(
        and(
          eq(countries.isActive, true),
          isNull(countries.deletedAt),
          isNotNull(countries.continent),
          // Only include countries that have either visa types OR visa-free options
          or(
            isNotNull(visaTypes.id), // Has visa types
            isNotNull(visaEligibility.id) // Has visa-free/on-arrival options
          )
        )
      )
      .orderBy(countries.continent);

    return results
      .map(result => result.continent)
      .filter(
        continent => continent && continent.trim().length > 0
      ) as string[];
  } catch (error) {
    console.error("Failed to get destination continents:", error);
    return [];
  }
}

/**
 * Get comprehensive destination details with visa types and eligibility data
 *
 * @param destinationCode - Country code for the destination
 * @param locale - Language locale for localized content
 * @param passportCode - Optional passport country code for eligibility filtering
 * @returns Promise<DestinationWithVisaTypes | null> - Destination with visa information
 */
export async function getDestinationDetails(
  destinationCode: string,
  locale: string,
  passportCode?: string
): Promise<DestinationWithVisaTypes | null> {
  // Input validation and sanitization
  const validatedDestinationCode = validateCountryCode(destinationCode);
  if (!validatedDestinationCode) {
    console.error(`Invalid destination code provided: ${destinationCode}`);
    return null;
  }

  let validatedPassportCode: string | null = null;
  if (passportCode) {
    validatedPassportCode = validateCountryCode(passportCode);
    if (!validatedPassportCode) {
      console.warn(`Invalid passport code provided: ${passportCode}, ignoring`);
    }
  }

  try {
    const db = getDb();

    // Get destination country information
    const destinationResults = await db
      .select({
        id: countries.id,
        code: countries.code,
        name: countries.code,
        localizedName: countriesI18n.name,
        heroImage: countries.heroImage,
        about: countriesI18n.about,
        continent: countries.continent,
        region: countries.region,
        isActive: countries.isActive,
        createdAt: countries.createdAt,
        updatedAt: countries.updatedAt,
        deletedAt: countries.deletedAt,
      })
      .from(countries)
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, locale)
        )
      )
      .where(
        and(
          eq(countries.code, validatedDestinationCode),
          eq(countries.isActive, true),
          isNull(countries.deletedAt)
        )
      )
      .limit(1);

    if (destinationResults.length === 0) {
      return null;
    }

    const destination = destinationResults[0];

    // Get visa types for this destination
    const visaTypeResults = await db
      .select({
        id: visaTypes.id,
        type: visaTypes.type,
        name: visaTypesI18n.name,
        duration: visaTypes.duration,
        fee: visaTypes.fee,
        currency: visaTypes.currency,
        processingTime: visaTypes.processingTime,
        requiresInterview: visaTypes.requiresInterview,
        isMultiEntry: visaTypes.isMultiEntry,
      })
      .from(visaTypes)
      .leftJoin(
        visaTypesI18n,
        and(
          eq(visaTypes.id, visaTypesI18n.visaTypeId),
          eq(visaTypesI18n.locale, locale)
        )
      )
      .where(
        and(
          eq(visaTypes.destinationId, destination.id),
          eq(visaTypes.isActive, true),
          isNull(visaTypes.deletedAt)
        )
      );

    // Check for visa-free and visa-on-arrival options
    const eligibilityResults = await db
      .select({
        eligibilityStatus: visaEligibility.eligibilityStatus,
        maxStayDays: visaEligibility.maxStayDays,
      })
      .from(visaEligibility)
      .where(
        and(
          eq(visaEligibility.destinationId, destination.id),
          inArray(visaEligibility.eligibilityStatus, [
            "visa_free",
            "on_arrival",
          ]),
          eq(visaEligibility.isActive, true),
          isNull(visaEligibility.deletedAt)
        )
      );

    const destinationVisaTypes: VisaTypeInfo[] = visaTypeResults.map(vt => ({
      id: vt.id,
      type: vt.type,
      name: vt.name || vt.type,
      duration: vt.duration,
      fee: vt.fee,
      currency: vt.currency,
      processingTime: vt.processingTime,
      requiresInterview: vt.requiresInterview,
      isMultiEntry: vt.isMultiEntry,
    }));

    return {
      ...destination,
      localizedName: destination.localizedName || destination.name,
      name: destination.name,
      visaTypes: destinationVisaTypes,
      totalVisaTypes: destinationVisaTypes.length,
      hasVisaFreeEntry: eligibilityResults.some(
        er => er.eligibilityStatus === "visa_free"
      ),
      hasVisaOnArrival: eligibilityResults.some(
        er => er.eligibilityStatus === "on_arrival"
      ),
    };
  } catch (error) {
    console.error(
      `Failed to get destination details for ${validatedDestinationCode}:`,
      error
    );
    return null;
  }
}

/**
 * Get destination with all visa type relationships
 * Optimized for comprehensive destination catalog pages
 *
 * @param destinationCode - Country code for the destination
 * @param locale - Language locale for localized content
 * @returns Promise<DestinationWithVisaTypes | null> - Complete destination information
 */
export async function getDestinationWithVisaTypes(
  destinationCode: string,
  locale: string
): Promise<DestinationWithVisaTypes | null> {
  // Reuse the comprehensive getDestinationDetails function
  return getDestinationDetails(destinationCode, locale);
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

  try {
    const db = getDb();

    const results = await db
      .select({
        id: countries.id,
        code: countries.code,
        name: countries.code, // Use code as fallback name since countries table doesn't have name field
        heroImage: countries.heroImage,
        localizedName: countriesI18n.name,
        about: countriesI18n.about,
      })
      .from(countries)
      .leftJoin(
        countriesI18n,
        and(
          eq(countries.id, countriesI18n.countryId),
          eq(countriesI18n.locale, locale)
        )
      )
      .where(
        and(inArray(countries.code, countryCodes), isNull(countries.deletedAt))
      );

    // Maintain order from input array
    const countryMap = new Map<string, CountryWithI18n>();
    results.forEach(result => {
      countryMap.set(result.code, {
        id: result.id,
        code: result.code,
        name: result.name,
        heroImage: result.heroImage,
        localizedName: result.localizedName || result.name,
        about: result.about,
      });
    });

    return countryCodes
      .map(code => countryMap.get(code))
      .filter((country): country is CountryWithI18n => country !== undefined);
  } catch (error) {
    console.warn(
      `Failed to get countries by codes ${countryCodes.join(", ")}:`,
      error
    );
    return [];
  }
}
