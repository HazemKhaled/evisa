import { getFlagUrl, getFlagPath, getFlagUrlWithFallback } from "../flags";

describe("flags utilities", () => {
  describe("getFlagUrl", () => {
    it("should return correct URL for country code", () => {
      expect(getFlagUrl("USA")).toBe("/flags/USA.svg");
      expect(getFlagUrl("UAE")).toBe("/flags/UAE.svg");
      expect(getFlagUrl("GBR")).toBe("/flags/GBR.svg");
      expect(getFlagUrl("KSA")).toBe("/flags/KSA.svg");
    });

    it("should handle lowercase country codes", () => {
      expect(getFlagUrl("usa")).toBe("/flags/usa.svg");
      expect(getFlagUrl("uae")).toBe("/flags/uae.svg");
      expect(getFlagUrl("ksa")).toBe("/flags/ksa.svg");
    });
  });

  describe("getFlagPath", () => {
    it("should return correct path for country code", () => {
      expect(getFlagPath("USA")).toBe("public/flags/USA.svg");
      expect(getFlagPath("UAE")).toBe("public/flags/UAE.svg");
      expect(getFlagPath("GBR")).toBe("public/flags/GBR.svg");
      expect(getFlagPath("KSA")).toBe("public/flags/KSA.svg");
    });

    it("should handle lowercase country codes", () => {
      expect(getFlagPath("usa")).toBe("public/flags/usa.svg");
      expect(getFlagPath("uae")).toBe("public/flags/uae.svg");
      expect(getFlagPath("ksa")).toBe("public/flags/ksa.svg");
    });
  });

  describe("getFlagUrlWithFallback", () => {
    it("should return flag URL for any country code", () => {
      const result = getFlagUrlWithFallback("USA");
      expect(result).toBe("/flags/USA.svg");
    });

    it("should handle different country codes", () => {
      expect(getFlagUrlWithFallback("GBR")).toBe("/flags/GBR.svg");
      expect(getFlagUrlWithFallback("UAE")).toBe("/flags/UAE.svg");
      expect(getFlagUrlWithFallback("KSA")).toBe("/flags/KSA.svg");
      expect(getFlagUrlWithFallback("FRA")).toBe("/flags/FRA.svg");
      expect(getFlagUrlWithFallback("JPN")).toBe("/flags/JPN.svg");
    });

    it("should handle edge cases", () => {
      expect(getFlagUrlWithFallback("")).toBe("/flags/.svg");
      expect(getFlagUrlWithFallback("123")).toBe("/flags/123.svg");
    });
  });
});
