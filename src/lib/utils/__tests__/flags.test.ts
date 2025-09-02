import { getFlagUrl, getFlagPath, getFlagUrlWithFallback } from "../flags";

describe("flags utilities", () => {
  describe("getFlagUrl", () => {
    it("should return correct URL for country code", () => {
      expect(getFlagUrl("USA")).toBe("/flags/usa.svg");
      expect(getFlagUrl("UAE")).toBe("/flags/uae.svg");
      expect(getFlagUrl("GBR")).toBe("/flags/gbr.svg");
      expect(getFlagUrl("KSA")).toBe("/flags/ksa.svg");
    });

    it("should handle lowercase country codes", () => {
      expect(getFlagUrl("usa")).toBe("/flags/usa.svg");
      expect(getFlagUrl("uae")).toBe("/flags/uae.svg");
      expect(getFlagUrl("ksa")).toBe("/flags/ksa.svg");
    });

    it("should handle mixed case country codes", () => {
      expect(getFlagUrl("UsA")).toBe("/flags/usa.svg");
      expect(getFlagUrl("UaE")).toBe("/flags/uae.svg");
      expect(getFlagUrl("KsA")).toBe("/flags/ksa.svg");
    });
  });

  describe("getFlagPath", () => {
    it("should return correct path for country code", () => {
      expect(getFlagPath("USA")).toBe("public/flags/usa.svg");
      expect(getFlagPath("UAE")).toBe("public/flags/uae.svg");
      expect(getFlagPath("GBR")).toBe("public/flags/gbr.svg");
      expect(getFlagPath("KSA")).toBe("public/flags/ksa.svg");
    });

    it("should handle lowercase country codes", () => {
      expect(getFlagPath("usa")).toBe("public/flags/usa.svg");
      expect(getFlagPath("uae")).toBe("public/flags/uae.svg");
      expect(getFlagPath("ksa")).toBe("public/flags/ksa.svg");
    });

    it("should handle mixed case country codes", () => {
      expect(getFlagPath("UsA")).toBe("public/flags/usa.svg");
      expect(getFlagPath("UaE")).toBe("public/flags/uae.svg");
      expect(getFlagPath("KsA")).toBe("public/flags/ksa.svg");
    });
  });

  describe("getFlagUrlWithFallback", () => {
    it("should return flag URL for any country code", () => {
      const result = getFlagUrlWithFallback("USA");
      expect(result).toBe("/flags/usa.svg");
    });

    it("should handle different country codes", () => {
      expect(getFlagUrlWithFallback("GBR")).toBe("/flags/gbr.svg");
      expect(getFlagUrlWithFallback("UAE")).toBe("/flags/uae.svg");
      expect(getFlagUrlWithFallback("KSA")).toBe("/flags/ksa.svg");
      expect(getFlagUrlWithFallback("FRA")).toBe("/flags/fra.svg");
      expect(getFlagUrlWithFallback("JPN")).toBe("/flags/jpn.svg");
    });

    it("should handle edge cases", () => {
      expect(getFlagUrlWithFallback("")).toBe("/flags/.svg");
      expect(getFlagUrlWithFallback("123")).toBe("/flags/123.svg");
    });
  });
});
