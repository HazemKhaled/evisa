import {
  getDestinationsListWithMetadata,
  getDestinationDetails,
  getDestinationWithVisaTypes,
  type DestinationWithVisaTypes,
} from "../country-service";
import * as dbConnection from "../../db/connection";

// Mock the database connection
jest.mock("../../db/connection");

const mockDbConnection = dbConnection as jest.Mocked<typeof dbConnection>;

describe("Country Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDbConnection.isDatabaseAvailable.mockReturnValue(true);
  });

  describe("getDestinationsListWithMetadata", () => {
    it("should return destination metadata with valid inputs", async () => {
      const mockDestinations = [
        {
          id: 1,
          code: "UAE",
          name: "UAE",
          localizedName: "United Arab Emirates",
          heroImage: null,
          about: "Modern destination",
          continent: "Asia",
          region: "Middle East",
        },
      ];

      // Create a query that resolves to the destinations array
      const mockQuery = Promise.resolve(mockDestinations);
      Object.assign(mockQuery, {
        from: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      });

      // Mock visa statistics queries
      const mockVisaStatsQuery = Promise.resolve([
        { count: 1, avgProcessingTime: 5, minFee: 100 },
      ]);
      Object.assign(mockVisaStatsQuery, {
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
      });

      const mockVisaFreeQuery = Promise.resolve([{ count: 1 }]);
      Object.assign(mockVisaFreeQuery, {
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
      });

      const mockDb = {
        select: jest
          .fn()
          .mockReturnValueOnce(mockQuery) // Main destinations query
          .mockReturnValueOnce(mockVisaStatsQuery) // Visa statistics query
          .mockReturnValue(mockVisaFreeQuery), // Visa-free count query
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      const result = await getDestinationsListWithMetadata("en", 10, "popular");

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 1,
        code: "UAE",
        localizedName: "United Arab Emirates",
      });
    });

    it("should return empty result when database is unavailable", async () => {
      mockDbConnection.isDatabaseAvailable.mockReturnValue(false);

      const result = await getDestinationsListWithMetadata("en", 10, "popular");

      expect(result).toEqual([]);
      expect(mockDbConnection.getDb).not.toHaveBeenCalled();
    });

    it("should handle invalid locale gracefully", async () => {
      const result = await getDestinationsListWithMetadata(
        "invalid-locale",
        10,
        "popular"
      );

      expect(result).toEqual([]);
      expect(mockDbConnection.isDatabaseAvailable).not.toHaveBeenCalled();
    });

    it("should validate and sanitize sort criteria", async () => {
      const mockQuery = {
        from: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockResolvedValue([]),
      };

      const mockDb = {
        select: jest.fn().mockReturnValue(mockQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      await getDestinationsListWithMetadata("en", 10, "alphabetical");

      // Should accept valid sort criteria
      expect(mockDbConnection.getDb).toHaveBeenCalled();
    });

    it("should limit results to maximum 100", async () => {
      const mockQuery = {
        from: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([]),
      };

      const mockDb = {
        select: jest.fn().mockReturnValue(mockQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      await getDestinationsListWithMetadata("en", 1000, "popular");

      // Should be limited to 100
      expect(mockQuery.limit).toHaveBeenCalledWith(100);
    });

    it("should handle database errors gracefully", async () => {
      mockDbConnection.getDb.mockImplementation(() => {
        throw new Error("Database error");
      });

      const result = await getDestinationsListWithMetadata("en", 10, "popular");

      expect(result).toEqual([]);
    });
  });

  describe("getDestinationDetails", () => {
    it("should return destination details with valid inputs", async () => {
      const mockDestination = {
        id: 1,
        code: "UAE",
        name: "UAE",
        localizedName: "United Arab Emirates",
        heroImage: null,
        about: "Modern destination",
        continent: "Asia",
        region: "Middle East",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      // Create proper query chain mocks that match the actual service calls
      const mockDestinationQuery = Promise.resolve([mockDestination]);
      Object.assign(mockDestinationQuery, {
        from: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      });

      const mockDb = {
        select: jest.fn().mockReturnValue(mockDestinationQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      const result = await getDestinationDetails("UAE", "en");

      expect(result).toMatchObject({
        id: 1,
        code: "UAE",
        localizedName: "United Arab Emirates",
      });
      expect(result).toHaveProperty("visaTypes");
      expect(Array.isArray(result?.visaTypes)).toBe(true);
    });

    it("should return null for invalid destination code", async () => {
      const result = await getDestinationDetails("INVALID", "en");

      expect(result).toBeNull();
      expect(mockDbConnection.isDatabaseAvailable).not.toHaveBeenCalled();
    });

    it("should return null for invalid locale", async () => {
      const result = await getDestinationDetails("UAE", "invalid-locale");

      expect(result).toBeNull();
      expect(mockDbConnection.isDatabaseAvailable).not.toHaveBeenCalled();
    });

    it("should return null when destination not found in database", async () => {
      const mockQuery = {
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue([]), // No results
      };

      const mockDb = {
        select: jest.fn().mockReturnValue(mockQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      const result = await getDestinationDetails("UAE", "en");

      expect(result).toBeNull();
    });

    it("should handle database unavailability", async () => {
      mockDbConnection.isDatabaseAvailable.mockReturnValue(false);

      const result = await getDestinationDetails("UAE", "en");

      expect(result).toBeNull();
      expect(mockDbConnection.getDb).not.toHaveBeenCalled();
    });
  });

  describe("getDestinationWithVisaTypes", () => {
    it("should return the same result as getDestinationDetails", async () => {
      const mockResult: DestinationWithVisaTypes = {
        id: 1,
        code: "UAE",
        name: "United Arab Emirates",
        localizedName: "United Arab Emirates",
        heroImage: null,
        about: null,
        continent: "Asia",
        region: "Middle East",
        visaTypes: [],
        totalVisaTypes: 0,
        hasVisaFreeEntry: false,
        hasVisaOnArrival: false,
      };

      // Create proper query chain mock
      const mockQuery = Promise.resolve([mockResult]);
      Object.assign(mockQuery, {
        from: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      });

      const mockDb = {
        select: jest.fn().mockReturnValue(mockQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      const result = await getDestinationWithVisaTypes("UAE", "en");

      expect(result).toMatchObject({
        id: 1,
        code: "UAE",
      });
      expect(result).toHaveProperty("totalVisaTypes");
      expect(typeof result?.totalVisaTypes).toBe("number");
    });
  });

  describe("Edge cases and error handling", () => {
    it("should handle SQL injection attempts", async () => {
      const maliciousInput = "'; DROP TABLE countries; --";

      const result = await getDestinationDetails(maliciousInput, "en");

      expect(result).toBeNull();
      expect(mockDbConnection.isDatabaseAvailable).not.toHaveBeenCalled();
    });

    it("should validate country code format", async () => {
      const invalidCodes = ["", "A", "ABCD", "12", "A1"];

      for (const code of invalidCodes) {
        const result = await getDestinationDetails(code, "en");
        expect(result).toBeNull();
      }
    });

    it("should validate locale format", async () => {
      const invalidLocales = ["", "a", "abc", "en-US-extra", "123"];

      for (const locale of invalidLocales) {
        const result = await getDestinationsListWithMetadata(
          locale,
          10,
          "popular"
        );
        expect(result).toEqual([]);
      }
    });

    it("should handle concurrent requests", async () => {
      const mockDestinations = [
        {
          id: 1,
          countryCode: "UAE",
          nameEn: "United Arab Emirates",
          nameAr: "الإمارات العربية المتحدة",
          nameNative: "United Arab Emirates",
          flagSvgPath: "/flags/uae.svg",
          isActive: true,
          continent: "Asia",
          region: "Middle East",
          totalVisaTypes: 1,
          hasVisaFree: true,
          hasEVisa: true,
          hasVisaOnArrival: false,
        },
      ];

      const mockQuery = {
        from: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockResolvedValue(mockDestinations),
      };

      const mockDb = {
        select: jest.fn().mockReturnValue(mockQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      const promises = Array(10)
        .fill(null)
        .map(() => getDestinationsListWithMetadata("en", 5, "popular"));

      const results = await Promise.all(promises);

      expect(results).toHaveLength(10);
      results.forEach(result => {
        expect(Array.isArray(result)).toBe(true);
      });
    });
  });
});
