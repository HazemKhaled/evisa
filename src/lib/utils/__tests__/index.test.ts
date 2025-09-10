/**
 * Tests for the utils index file
 * This file primarily contains re-exports, so we test that the exports are available
 */

import * as utils from "../index";

describe("Utils index exports", () => {
  it("should export URL utility functions", () => {
    expect(utils.getBaseUrl).toBeDefined();
    expect(utils.buildLocalePath).toBeDefined();
    expect(utils.buildBlogUrl).toBeDefined();
    expect(utils.buildBlogPostUrl).toBeDefined();
    expect(utils.buildTagUrl).toBeDefined();
    expect(utils.buildNavUrls).toBeDefined();
  });

  it("should export style utility functions", () => {
    expect(utils.containerStyles).toBeDefined();
    expect(utils.textStyles).toBeDefined();
    expect(utils.buttonStyles).toBeDefined();
    expect(utils.cardStyles).toBeDefined();
    expect(utils.formStyles).toBeDefined();
    expect(utils.layoutStyles).toBeDefined();
    expect(utils.tagStyles).toBeDefined();
    expect(utils.createResponsiveGrid).toBeDefined();
  });

  it("should export pagination utility functions", () => {
    expect(utils.calculatePagination).toBeDefined();
    expect(utils.generatePageNumbers).toBeDefined();
    expect(utils.paginateArray).toBeDefined();
    expect(utils.filterAndPaginate).toBeDefined();
    expect(utils.createBlogFilter).toBeDefined();
    expect(utils.createPaginationStats).toBeDefined();
  });

  it("should export translation utility functions", () => {
    expect(utils.loadTranslations).toBeDefined();
    expect(utils.loadLayoutTranslations).toBeDefined();
    expect(utils.loadPageTranslations).toBeDefined();
    expect(utils.loadHeroTranslations).toBeDefined();
    expect(utils.loadBlogTranslations).toBeDefined();
    expect(utils.translationKeys).toBeDefined();
  });

  it("should export flag utility functions", () => {
    expect(utils.getFlagUrl).toBeDefined();
    expect(utils.getFlagPath).toBeDefined();
    expect(utils.flagExists).toBeDefined();
    expect(utils.getFlagUrlWithFallback).toBeDefined();
  });

  it("should export all functions with correct types", () => {
    // Test URL functions
    expect(typeof utils.getBaseUrl).toBe("function");
    expect(typeof utils.buildLocalePath).toBe("function");
    expect(typeof utils.buildBlogUrl).toBe("function");
    expect(typeof utils.buildBlogPostUrl).toBe("function");
    expect(typeof utils.buildTagUrl).toBe("function");
    expect(typeof utils.buildNavUrls).toBe("function");

    // Test style objects and functions
    expect(typeof utils.containerStyles).toBe("object");
    expect(typeof utils.textStyles).toBe("object");
    expect(typeof utils.buttonStyles).toBe("object");
    expect(typeof utils.cardStyles).toBe("object");
    expect(typeof utils.formStyles).toBe("object");
    expect(typeof utils.layoutStyles).toBe("object");
    expect(typeof utils.tagStyles).toBe("object");
    expect(typeof utils.createResponsiveGrid).toBe("function");

    // Test pagination functions
    expect(typeof utils.calculatePagination).toBe("function");
    expect(typeof utils.generatePageNumbers).toBe("function");
    expect(typeof utils.paginateArray).toBe("function");
    expect(typeof utils.filterAndPaginate).toBe("function");
    expect(typeof utils.createBlogFilter).toBe("function");
    expect(typeof utils.createPaginationStats).toBe("function");

    // Test translation functions
    expect(typeof utils.loadTranslations).toBe("function");
    expect(typeof utils.loadLayoutTranslations).toBe("function");
    expect(typeof utils.loadPageTranslations).toBe("function");
    expect(typeof utils.loadHeroTranslations).toBe("function");
    expect(typeof utils.loadBlogTranslations).toBe("function");

    // Test flag functions
    expect(typeof utils.getFlagUrl).toBe("function");
    expect(typeof utils.getFlagPath).toBe("function");
    expect(typeof utils.flagExists).toBe("function");
    expect(typeof utils.getFlagUrlWithFallback).toBe("function");
  });

  it("should export translationKeys as an object", () => {
    expect(utils.translationKeys).toBeDefined();
    expect(typeof utils.translationKeys).toBe("object");
    expect(utils.translationKeys).not.toBeNull();
  });

  it("should have correct number of exports", () => {
    const exportedFunctions = Object.keys(utils).filter(
      key => typeof utils[key as keyof typeof utils] === "function"
    );

    // We expect at least 25 functions to be exported
    expect(exportedFunctions.length).toBeGreaterThanOrEqual(25);
  });

  it("should export functions with correct names", () => {
    const expectedUrlFunctions = [
      "getBaseUrl",
      "buildLocalePath",
      "buildBlogUrl",
      "buildBlogPostUrl",
      "buildTagUrl",
      "buildNavUrls",
    ];

    const expectedStyleFunctions = [
      "containerStyles",
      "textStyles",
      "buttonStyles",
      "cardStyles",
      "formStyles",
      "layoutStyles",
      "tagStyles",
      "createResponsiveGrid",
    ];

    const expectedPaginationFunctions = [
      "calculatePagination",
      "generatePageNumbers",
      "paginateArray",
      "filterAndPaginate",
      "createBlogFilter",
      "createPaginationStats",
    ];

    const expectedTranslationFunctions = [
      "loadTranslations",
      "loadLayoutTranslations",
      "loadPageTranslations",
      "loadHeroTranslations",
      "loadBlogTranslations",
    ];

    const expectedFlagFunctions = [
      "getFlagUrl",
      "getFlagPath",
      "flagExists",
      "getFlagUrlWithFallback",
    ];

    expectedUrlFunctions.forEach(funcName => {
      expect(utils).toHaveProperty(funcName);
      expect(typeof utils[funcName as keyof typeof utils]).toBe("function");
    });

    expectedStyleFunctions.forEach(funcName => {
      expect(utils).toHaveProperty(funcName);
      if (funcName === "createResponsiveGrid") {
        expect(typeof utils[funcName as keyof typeof utils]).toBe("function");
      } else {
        expect(typeof utils[funcName as keyof typeof utils]).toBe("object");
      }
    });

    expectedPaginationFunctions.forEach(funcName => {
      expect(utils).toHaveProperty(funcName);
      expect(typeof utils[funcName as keyof typeof utils]).toBe("function");
    });

    expectedTranslationFunctions.forEach(funcName => {
      expect(utils).toHaveProperty(funcName);
      expect(typeof utils[funcName as keyof typeof utils]).toBe("function");
    });

    expectedFlagFunctions.forEach(funcName => {
      expect(utils).toHaveProperty(funcName);
      expect(typeof utils[funcName as keyof typeof utils]).toBe("function");
    });
  });

  it("should not export undefined values", () => {
    Object.keys(utils).forEach(key => {
      expect(utils[key as keyof typeof utils]).toBeDefined();
    });
  });
});
