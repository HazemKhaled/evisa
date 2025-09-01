import { getFlagUrl, getFlagPath, getFlagUrlWithFallback } from "../flags";

describe("flags utilities", () => {
  describe("getFlagUrl", () => {
    it("should return correct URL for country code", () => {
      expect(getFlagUrl("USA")).toBe("/flags/usa.svg");
      expect(getFlagUrl("ARE")).toBe("/flags/are.svg");
      expect(getFlagUrl("GBR")).toBe("/flags/gbr.svg");
    });

    it("should handle lowercase country codes", () => {
      expect(getFlagUrl("usa")).toBe("/flags/usa.svg");
      expect(getFlagUrl("are")).toBe("/flags/are.svg");
    });

    it("should handle mixed case country codes", () => {
      expect(getFlagUrl("UsA")).toBe("/flags/usa.svg");
      expect(getFlagUrl("ArE")).toBe("/flags/are.svg");
    });
  });

  describe("getFlagPath", () => {
    it("should return correct path for country code", () => {
      expect(getFlagPath("USA")).toBe("public/flags/usa.svg");
      expect(getFlagPath("ARE")).toBe("public/flags/are.svg");
      expect(getFlagPath("GBR")).toBe("public/flags/gbr.svg");
    });

    it("should handle lowercase country codes", () => {
      expect(getFlagPath("usa")).toBe("public/flags/usa.svg");
      expect(getFlagPath("are")).toBe("public/flags/are.svg");
    });

    it("should handle mixed case country codes", () => {
      expect(getFlagPath("UsA")).toBe("public/flags/usa.svg");
      expect(getFlagPath("ArE")).toBe("public/flags/are.svg");
    });
  });

  describe("getFlagUrlWithFallback", () => {
    it("should return flag URL for any country code", () => {
      const result = getFlagUrlWithFallback("USA");
      expect(result).toBe("/flags/usa.svg");
    });

    it("should handle different country codes", () => {
      expect(getFlagUrlWithFallback("GBR")).toBe("/flags/gbr.svg");
      expect(getFlagUrlWithFallback("FRA")).toBe("/flags/fra.svg");
      expect(getFlagUrlWithFallback("JPN")).toBe("/flags/jpn.svg");
    });

    it("should handle edge cases", () => {
      expect(getFlagUrlWithFallback("")).toBe("/flags/.svg");
      expect(getFlagUrlWithFallback("123")).toBe("/flags/123.svg");
    });
  });
});
