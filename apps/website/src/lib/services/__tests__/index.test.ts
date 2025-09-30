/**
 * Tests for the services index file
 * This file primarily contains re-exports, so we test that the exports are available
 */

import * as services from "../index";

describe("Services index exports", () => {
  it("should export country service functions", () => {
    expect(services.getCountryNames).toBeDefined();
    expect(services.getAllCountries).toBeDefined();
    expect(services.getCountryByCode).toBeDefined();
    expect(services.searchCountries).toBeDefined();
    expect(services.getCountriesByCodes).toBeDefined();
    expect(services.getDestinationsListWithMetadata).toBeDefined();
    expect(services.getDestinationDetails).toBeDefined();
    expect(services.getDestinationWithVisaTypes).toBeDefined();
  });

  it("should export visa service functions", () => {
    expect(services.getRandomVisaTypes).toBeDefined();
    expect(services.getVisaTypesByDestination).toBeDefined();
    expect(services.getAllVisaTypes).toBeDefined();
    expect(services.getVisaTypeById).toBeDefined();
    expect(services.checkVisaEligibility).toBeDefined();
    expect(services.getEligibleVisaTypes).toBeDefined();
    expect(services.getVisaRequirements).toBeDefined();
  });

  it("should export all functions from country-service", () => {
    // Test that all the main country service functions are available
    expect(typeof services.getCountryNames).toBe("function");
    expect(typeof services.getAllCountries).toBe("function");
    expect(typeof services.getCountryByCode).toBe("function");
    expect(typeof services.searchCountries).toBe("function");
    expect(typeof services.getCountriesByCodes).toBe("function");
    expect(typeof services.getDestinationsListWithMetadata).toBe("function");
    expect(typeof services.getDestinationDetails).toBe("function");
    expect(typeof services.getDestinationWithVisaTypes).toBe("function");
  });

  it("should export all functions from visa-service", () => {
    // Test that all the main visa service functions are available
    expect(typeof services.getRandomVisaTypes).toBe("function");
    expect(typeof services.getVisaTypesByDestination).toBe("function");
    expect(typeof services.getAllVisaTypes).toBe("function");
    expect(typeof services.getVisaTypeById).toBe("function");
    expect(typeof services.checkVisaEligibility).toBe("function");
    expect(typeof services.getEligibleVisaTypes).toBe("function");
    expect(typeof services.getVisaRequirements).toBe("function");
  });

  it("should have correct number of exports", () => {
    const exportedFunctions = Object.keys(services).filter(
      key => typeof services[key as keyof typeof services] === "function"
    );

    // We expect at least 15 functions to be exported (7 from country + 7 from visa + others)
    expect(exportedFunctions.length).toBeGreaterThanOrEqual(15);
  });

  it("should export functions with correct names", () => {
    const expectedCountryFunctions = [
      "getCountryNames",
      "getAllCountries",
      "getCountryByCode",
      "searchCountries",
      "getCountriesByCodes",
      "getDestinationsListWithMetadata",
      "getDestinationDetails",
      "getDestinationWithVisaTypes",
    ];

    const expectedVisaFunctions = [
      "getRandomVisaTypes",
      "getVisaTypesByDestination",
      "getAllVisaTypes",
      "getVisaTypeById",
      "checkVisaEligibility",
      "getEligibleVisaTypes",
      "getVisaRequirements",
    ];

    expectedCountryFunctions.forEach(funcName => {
      expect(services).toHaveProperty(funcName);
      expect(typeof services[funcName as keyof typeof services]).toBe(
        "function"
      );
    });

    expectedVisaFunctions.forEach(funcName => {
      expect(services).toHaveProperty(funcName);
      expect(typeof services[funcName as keyof typeof services]).toBe(
        "function"
      );
    });
  });
});
