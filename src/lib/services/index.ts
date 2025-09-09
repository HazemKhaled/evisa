/**
 * Centralized exports for all service modules
 * Provides a single entry point for importing services
 */

export * from "./country-service";
export * from "./visa-service";

// Re-export commonly used country services
export {
  getCountryNames,
  getAllCountries,
  getCountryByCode,
  searchCountries,
  getCountriesByCodes,
  // New enhanced destination functions
  getDestinationsListWithMetadata,
  getDestinationDetails,
  getDestinationWithVisaTypes,
} from "./country-service";

// Re-export commonly used visa services
export {
  getRandomVisaTypes,
  getVisaTypesByDestination,
  getAllVisaTypes,
  getVisaTypeById,
  // New visa eligibility functions
  checkVisaEligibility,
  getEligibleVisaTypes,
  getVisaRequirements,
} from "./visa-service";
