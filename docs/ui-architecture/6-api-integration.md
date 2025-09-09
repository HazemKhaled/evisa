# 6. API Integration

## Service Template

```typescript
import {
  type Country,
  type VisaType,
  type VisaEligibility,
} from "@/lib/types/database";
import { db } from "@/lib/db/connection";
import { countries, visaTypes, visaEligibility } from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";

/**
 * VisaEligibilityService handles all visa eligibility checking and related operations
 */
export class VisaEligibilityService {
  /**
   * Check visa eligibility for a specific passport-destination combination
   * @param passportCountry - ISO country code of passport issuing country
   * @param destinationCountry - ISO country code of destination country
   * @param locale - Language locale for translated content
   * @returns Array of available visa types with details
   */
  static async checkEligibility(
    passportCountry: string,
    destinationCountry: string,
    locale: string = "en"
  ): Promise<VisaType[]> {
    try {
      // Input validation
      if (!passportCountry || !destinationCountry) {
        throw new VisaEligibilityError(
          "Missing required parameters: passportCountry and destinationCountry"
        );
      }

      if (passportCountry === destinationCountry) {
        return []; // No visa required for domestic travel
      }

      // Query visa eligibility with translations
      const eligibleVisas = await db
        .select({
          visaType: visaTypes,
          eligibility: visaEligibility,
        })
        .from(visaEligibility)
        .innerJoin(visaTypes, eq(visaTypes.id, visaEligibility.visaTypeId))
        .where(
          and(
            eq(visaEligibility.passportCountryCode, passportCountry),
            eq(visaEligibility.destinationCountryCode, destinationCountry),
            eq(visaEligibility.available, true)
          )
        );

      // Transform and localize results
      const localizedVisas = await Promise.all(
        eligibleVisas.map(async ({ visaType, eligibility }) => ({
          ...visaType,
          // Get localized name and description
          localizedName: await this.getLocalizedVisaName(visaType.id, locale),
          localizedDescription: await this.getLocalizedVisaDescription(
            visaType.id,
            locale
          ),
          // Include eligibility-specific details
          processingTime: eligibility.processingTimeMin,
          processingTimeMax: eligibility.processingTimeMax,
          fees: eligibility.fees,
          validity: eligibility.validityPeriod,
          multipleEntry: eligibility.multipleEntry,
          requirements: eligibility.requirements,
        }))
      );

      return localizedVisas;
    } catch (error) {
      console.error(
        "[VisaEligibilityService] Error checking eligibility:",
        error
      );
      throw new VisaEligibilityError(
        `Failed to check visa eligibility for ${passportCountry} -> ${destinationCountry}`,
        { cause: error }
      );
    }
  }
}
```

## API Client Configuration

```typescript
/**
 * API client configuration with error handling and interceptors
 */

// Custom fetch wrapper with error handling and logging
export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Make HTTP request with error handling and retries
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData
        );
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType?.includes("application/json")) {
        return await response.json();
      }

      return (await response.text()) as unknown as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      console.error("[ApiClient] Request failed:", { url, error });
      throw new ApiError("Network request failed", 500, {
        originalError: error,
      });
    }
  }

  // HTTP method helpers
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const searchParams = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request<T>(`${endpoint}${searchParams}`);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}
```

---
