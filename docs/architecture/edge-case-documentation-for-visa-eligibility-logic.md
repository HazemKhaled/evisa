# Edge Case Documentation for Visa Eligibility Logic

## Complex Eligibility Scenarios

**Multi-Passport Holder Edge Cases:**

```typescript
// lib/services/visa-eligibility-edge-cases.ts
export interface EdgeCaseHandler {
  scenario: string;
  detection: (request: VisaEligibilityRequest) => boolean;
  resolution: (
    request: VisaEligibilityRequest
  ) => Promise<VisaEligibilityResponse>;
  fallback: () => VisaEligibilityResponse;
}

const EDGE_CASE_HANDLERS: EdgeCaseHandler[] = [
  {
    scenario: "dual_citizenship_conflict",
    detection: request => request.passportCountries?.length > 1,
    resolution: async request => {
      // Handle multiple passport scenarios
      const eligibilityResults = await Promise.all(
        request.passportCountries.map(passportCountry =>
          getVisaEligibility({
            ...request,
            passportCountry,
            passportCountries: [passportCountry],
          })
        )
      );

      // Return most favorable option
      return selectBestEligibilityOption(eligibilityResults);
    },
    fallback: () => ({
      eligibilityStatus: "REQUIRE_MANUAL_REVIEW",
      message: "Multiple passport eligibility requires manual review",
      recommendedAction: "CONTACT_EMBASSY",
    }),
  },

  {
    scenario: "transit_visa_confusion",
    detection: request =>
      request.travelType === "TRANSIT" &&
      request.destinationCountry !== request.finalDestination,
    resolution: async request => {
      // Check both transit and destination requirements
      const transitRequirement = await getTransitVisaRequirement(
        request.passportCountry,
        request.destinationCountry,
        request.transitDuration
      );

      const finalDestinationRequirement = await getVisaEligibility({
        passportCountry: request.passportCountry,
        destinationCountry: request.finalDestination,
        travelType: "TOURISM",
      });

      return {
        transitRequirement,
        finalDestinationRequirement,
        eligibilityStatus: "COMPLEX_ITINERARY",
        recommendedAction: "VERIFY_BOTH_REQUIREMENTS",
      };
    },
    fallback: () => ({
      eligibilityStatus: "REQUIRE_MANUAL_REVIEW",
      message: "Transit visa requirements need manual verification",
    }),
  },

  {
    scenario: "special_passport_category",
    detection: request =>
      ["DIPLOMATIC", "OFFICIAL", "SERVICE"].includes(request.passportType),
    resolution: async request => {
      // Special passport categories have different rules
      const specialRequirements = await getSpecialPassportRequirements(
        request.passportCountry,
        request.destinationCountry,
        request.passportType
      );

      if (!specialRequirements) {
        // Fallback to regular passport requirements
        return getVisaEligibility({
          ...request,
          passportType: "REGULAR",
        });
      }

      return specialRequirements;
    },
    fallback: () => ({
      eligibilityStatus: "REQUIRE_EMBASSY_CONTACT",
      message: "Special passport categories require embassy verification",
    }),
  },

  {
    scenario: "seasonal_restrictions",
    detection: request => {
      const travelDate = new Date(request.plannedTravelDate);
      return hasSeasonalRestrictions(request.destinationCountry, travelDate);
    },
    resolution: async request => {
      const seasonalInfo = await getSeasonalRestrictions(
        request.destinationCountry,
        new Date(request.plannedTravelDate)
      );

      if (seasonalInfo.isRestricted) {
        return {
          eligibilityStatus: "SEASONALLY_RESTRICTED",
          restrictionPeriod: seasonalInfo.restrictionPeriod,
          alternativeDates: seasonalInfo.suggestedDates,
          message: `Travel restrictions apply during ${seasonalInfo.restrictionReason}`,
        };
      }

      // Continue with normal processing
      return getStandardVisaEligibility(request);
    },
    fallback: () => ({
      eligibilityStatus: "CHECK_SEASONAL_RESTRICTIONS",
      message: "Please verify seasonal travel restrictions",
    }),
  },

  {
    scenario: "country_name_ambiguity",
    detection: request =>
      getCountryNameVariations(request.destinationCountry).length > 1,
    resolution: async request => {
      const countryVariations = getCountryNameVariations(
        request.destinationCountry
      );

      // Try to resolve based on additional context
      const resolvedCountry = await resolveCountryAmbiguity(
        request.destinationCountry,
        request.context
      );

      if (resolvedCountry) {
        return getVisaEligibility({
          ...request,
          destinationCountry: resolvedCountry.code,
        });
      }

      return {
        eligibilityStatus: "AMBIGUOUS_DESTINATION",
        countryOptions: countryVariations,
        message: "Please specify which country you mean",
      };
    },
    fallback: () => ({
      eligibilityStatus: "REQUIRE_CLARIFICATION",
      message: "Destination country name needs clarification",
    }),
  },

  {
    scenario: "data_inconsistency",
    detection: request => hasInconsistentData(request),
    resolution: async request => {
      // Attempt to resolve data inconsistencies
      const cleanedRequest = await cleanInconsistentData(request);

      if (cleanedRequest.confidence < 0.8) {
        return {
          eligibilityStatus: "DATA_QUALITY_ISSUE",
          issues: cleanedRequest.issues,
          message: "Data quality issues detected, manual review needed",
        };
      }

      return getVisaEligibility(cleanedRequest.request);
    },
    fallback: () => ({
      eligibilityStatus: "DATA_ERROR",
      message: "Unable to process request due to data issues",
    }),
  },

  {
    scenario: "outdated_information",
    detection: request => {
      const lastUpdate = getLastDataUpdate(
        request.passportCountry,
        request.destinationCountry
      );
      const daysSinceUpdate =
        (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceUpdate > 30; // Data older than 30 days
    },
    resolution: async request => {
      // Attempt to fetch fresh data
      try {
        const freshData = await fetchLatestVisaRequirements(
          request.passportCountry,
          request.destinationCountry
        );

        if (freshData) {
          return getVisaEligibility(request, freshData);
        }
      } catch (error) {
        // Fresh data fetch failed, use cached with warning
      }

      const cachedResult = await getCachedVisaEligibility(request);
      return {
        ...cachedResult,
        dataFreshness: "POTENTIALLY_OUTDATED",
        lastUpdate: getLastDataUpdate(
          request.passportCountry,
          request.destinationCountry
        ),
        recommendedAction: "VERIFY_WITH_EMBASSY",
      };
    },
    fallback: () => ({
      eligibilityStatus: "VERIFY_REQUIREMENTS",
      message: "Please verify current requirements with embassy",
    }),
  },
];

// Main edge case processor
export async function processVisaEligibilityWithEdgeCases(
  request: VisaEligibilityRequest
): Promise<VisaEligibilityResponse> {
  // Check for edge cases
  for (const handler of EDGE_CASE_HANDLERS) {
    if (handler.detection(request)) {
      try {
        console.log(`Processing edge case: ${handler.scenario}`);
        return await handler.resolution(request);
      } catch (error) {
        console.error(
          `Edge case handler failed for ${handler.scenario}:`,
          error
        );
        return handler.fallback();
      }
    }
  }

  // No edge cases detected, proceed with standard processing
  return getStandardVisaEligibility(request);
}
```

**Fallback Data Handling:**

```typescript
// lib/services/visa-eligibility-fallbacks.ts
export class VisaEligibilityFallbackManager {
  private readonly fallbackStrategies = [
    this.tryRegionalDefaults,
    this.useHistoricalData,
    this.applyConservativeRules,
    this.requireManualReview,
  ];

  async getVisaEligibilityWithFallbacks(
    request: VisaEligibilityRequest
  ): Promise<VisaEligibilityResponse> {
    let lastError: Error | null = null;

    for (const strategy of this.fallbackStrategies) {
      try {
        const result = await strategy.call(this, request, lastError);
        if (result.eligibilityStatus !== "UNKNOWN") {
          return result;
        }
      } catch (error) {
        lastError = error as Error;
        console.warn(`Fallback strategy failed:`, error);
      }
    }

    // All strategies failed
    return {
      eligibilityStatus: "SYSTEM_ERROR",
      message: "Unable to determine visa requirements",
      recommendedAction: "CONTACT_EMBASSY",
      errorDetails: lastError?.message,
    };
  }

  private async tryRegionalDefaults(
    request: VisaEligibilityRequest,
    previousError?: Error
  ): Promise<VisaEligibilityResponse> {
    // Use regional visa agreements as fallback
    const region = await getCountryRegion(request.destinationCountry);
    const passportRegion = await getCountryRegion(request.passportCountry);

    const regionalAgreement = await getRegionalVisaAgreement(
      passportRegion,
      region
    );

    if (regionalAgreement) {
      return {
        eligibilityStatus: regionalAgreement.defaultStatus,
        source: "REGIONAL_AGREEMENT",
        confidence: 0.7,
        message: `Based on ${regionalAgreement.name} agreement`,
      };
    }

    throw new Error("No regional agreement found");
  }

  private async useHistoricalData(
    request: VisaEligibilityRequest,
    previousError?: Error
  ): Promise<VisaEligibilityResponse> {
    // Fall back to last known good data
    const historicalData = await getHistoricalVisaRequirements(
      request.passportCountry,
      request.destinationCountry,
      { maxAgeMonths: 6 }
    );

    if (historicalData) {
      return {
        ...historicalData,
        source: "HISTORICAL_DATA",
        confidence: 0.6,
        dataAge: historicalData.dataAge,
        message:
          "Based on historical data - please verify current requirements",
      };
    }

    throw new Error("No historical data available");
  }

  private async applyConservativeRules(
    request: VisaEligibilityRequest,
    previousError?: Error
  ): Promise<VisaEligibilityResponse> {
    // Apply conservative "visa required" default for safety
    return {
      eligibilityStatus: "VISA_REQUIRED",
      source: "CONSERVATIVE_DEFAULT",
      confidence: 0.3,
      message:
        "Conservative estimate - visa likely required. Please verify with embassy.",
      recommendedAction: "CONTACT_EMBASSY",
      processingTime: "7-14 days",
      note: "This is a safety-first estimate due to insufficient data",
    };
  }

  private async requireManualReview(
    request: VisaEligibilityRequest,
    previousError?: Error
  ): Promise<VisaEligibilityResponse> {
    // Last resort - manual review required
    return {
      eligibilityStatus: "REQUIRE_MANUAL_REVIEW",
      source: "FALLBACK_SYSTEM",
      confidence: 0.0,
      message: "Unable to determine requirements automatically",
      recommendedAction: "CONTACT_EMBASSY",
      supportContact: {
        email: "support@gettravelvisa.com",
        phone: "+1-800-VISA-HELP",
      },
    };
  }
}
```

---
