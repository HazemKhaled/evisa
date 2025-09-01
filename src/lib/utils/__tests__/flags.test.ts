import {
  getFlagUrl,
  getFlagPath,
  flagExists,
  getFlagUrlWithFallback,
} from "../flags";

// Mock fetch for testing
global.fetch = jest.fn();

// Mock the flagExists function to control its behavior in tests
jest.mock("../flags", () => {
  const originalModule = jest.requireActual("../flags");
  return {
    ...originalModule,
    flagExists: jest.fn(),
  };
});

// Get the mocked flagExists function
const mockedFlagExists = jest.mocked(flagExists);

describe("flags utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
      expect(getFlagUrl("ArE")).toBe("/flags/usa.svg");
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

  describe("flagExists", () => {
    it("should return true when flag exists", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      const result = await flagExists("USA");

      expect(result).toBe(true);
      expect(fetch).toHaveBeenCalledWith("/flags/usa.svg", { method: "HEAD" });
    });

    it("should return false when flag does not exist", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const result = await flagExists("XXX");

      expect(result).toBe(false);
      expect(fetch).toHaveBeenCalledWith("/flags/xxx.svg", { method: "HEAD" });
    });

    it("should return false when fetch throws an error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      const result = await flagExists("USA");

      expect(result).toBe(false);
      expect(fetch).toHaveBeenCalledWith("/flags/usa.svg", { method: "HEAD" });
    });

    it("should handle different country codes", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      const result = await flagExists("ARE");

      expect(result).toBe(true);
      expect(fetch).toHaveBeenCalledWith("/flags/are.svg", { method: "HEAD" });
    });
  });

  describe("getFlagUrlWithFallback", () => {
    it("should return flag URL when flag exists", async () => {
      mockedFlagExists.mockResolvedValueOnce(true);

      const result = await getFlagUrlWithFallback("USA");

      expect(result).toBe("/flags/usa.svg");
      expect(mockedFlagExists).toHaveBeenCalledWith("USA");
    });

    it("should return fallback URL when flag does not exist", async () => {
      mockedFlagExists.mockResolvedValueOnce(false);

      const result = await getFlagUrlWithFallback("XXX");

      expect(result).toBe("/flags/default.svg");
      expect(mockedFlagExists).toHaveBeenCalledWith("XXX");
    });

    it("should use custom fallback when provided and flag does not exist", async () => {
      mockedFlagExists.mockResolvedValueOnce(false);
      const customFallback = "/custom-flag.svg";

      const result = await getFlagUrlWithFallback("XXX", customFallback);

      expect(result).toBe(customFallback);
      expect(mockedFlagExists).toHaveBeenCalledWith("XXX");
    });

    it("should use custom fallback when provided but flag exists", async () => {
      mockedFlagExists.mockResolvedValueOnce(true);
      const customFallback = "/custom-flag.svg";

      const result = await getFlagUrlWithFallback("USA", customFallback);

      expect(result).toBe("/flags/usa.svg");
      expect(mockedFlagExists).toHaveBeenCalledWith("USA");
    });

    it("should handle various country codes with proper fallback logic", async () => {
      // Test existing flag
      mockedFlagExists.mockResolvedValueOnce(true);
      const result1 = await getFlagUrlWithFallback("GBR");
      expect(result1).toBe("/flags/gbr.svg");

      // Test non-existing flag
      mockedFlagExists.mockResolvedValueOnce(false);
      const result2 = await getFlagUrlWithFallback("FRA");
      expect(result2).toBe("/flags/default.svg");
    });
  });
});
