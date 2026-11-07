import * as dbConnection from "@repo/database";

import {
  type DestinationWithVisaTypes,
  getDestinationDetails,
  getDestinationsListWithMetadata,
  getDestinationWithVisaTypes,
  validateCountryCode,
} from "../country-service";

// Mock the database connection
jest.mock("@repo/database");

const mockDbConnection = dbConnection as jest.Mocked<typeof dbConnection>;

const createMockQuery = <T>(data: T) => {
  const mockQuery = Promise.resolve(data);
  Object.assign(mockQuery, {
    from: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
  });
  return mockQuery as Promise<T> & {
    from: jest.Mock;
    leftJoin: jest.Mock;
    innerJoin: jest.Mock;
    where: jest.Mock;
    limit: jest.Mock;
    orderBy: jest.Mock;
    groupBy: jest.Mock;
  };
};

describe("Country Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("validateCountryCode", () => {
    it("accepts valid ISO 3166-1 alpha-2 country codes", () => {
      expect(validateCountryCode("AO")).toBe("AO");
      expect(validateCountryCode("AE")).toBe("AE");
      expect(validateCountryCode("US")).toBe("US");
      expect(validateCountryCode(" AO ")).toBe("AO");
    });

    it("rejects alpha-3, alphanumeric, lowercase, and malformed codes", () => {
      expect(validateCountryCode("AGO")).toBeNull();
      expect(validateCountryCode("A1")).toBeNull();
      expect(validateCountryCode("ao")).toBeNull();
      expect(validateCountryCode("Ao")).toBeNull();
      expect(validateCountryCode("")).toBeNull();
      expect(validateCountryCode("   ")).toBeNull();
      expect(validateCountryCode("A")).toBeNull();
      expect(validateCountryCode("ABCD")).toBeNull();
      expect(validateCountryCode("12")).toBeNull();
    });
  });

  describe("getDestinationsListWithMetadata", () => {
    it("should return destination metadata with valid inputs", async () => {
      const mockDestinations = [
        {
          id: 1,
          code: "AE",
          name: "AE",
          localizedName: "United Arab Emirates",
          heroImage: null,
          about: "Modern destination",
          continent: "Asia",
          region: "Middle East",
        },
      ];

      const mockMainQuery = createMockQuery(mockDestinations);
      const mockSubQuery1 = createMockQuery([]);
      const mockSubQuery2 = createMockQuery([]);
      const mockVisaStatsQuery = createMockQuery([
        {
          destinationCode: "AE",
          totalVisaTypes: 1,
          avgProcessingTime: 5,
          minFee: 100,
        },
      ]);
      const mockVisaFreeQuery = createMockQuery([{ destinationCode: "AE" }]);

      const mockDb = {
        select: jest
          .fn()
          .mockReturnValueOnce(mockMainQuery)
          .mockReturnValueOnce(mockSubQuery1)
          .mockReturnValueOnce(mockSubQuery2)
          .mockReturnValueOnce(mockVisaStatsQuery)
          .mockReturnValue(mockVisaFreeQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      const result = await getDestinationsListWithMetadata("en", 10, "popular");

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        code: "AE",
        localizedName: "United Arab Emirates",
      });
    });

    it("should validate and sanitize sort criteria", async () => {
      const mockQuery = createMockQuery([]);

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
      const mockQuery = createMockQuery([]);

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
        code: "AE",
        name: "AE",
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

      const mockDestinationQuery = createMockQuery([mockDestination]);
      const mockEmptyQuery = createMockQuery([]);

      const mockDb = {
        select: jest
          .fn()
          .mockReturnValueOnce(mockDestinationQuery)
          .mockReturnValue(mockEmptyQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      const result = await getDestinationDetails("AE", "en", "AO");

      expect(result).toMatchObject({
        id: 1,
        code: "AE",
        localizedName: "United Arab Emirates",
      });
      expect(result).toHaveProperty("visaTypes");
      expect(Array.isArray(result?.visaTypes)).toBe(true);
    });

    it("should return null for invalid destination code", async () => {
      for (const invalidCode of ["INVALID", "AGO", "A1", "ao"]) {
        const result = await getDestinationDetails(invalidCode, "en");
        expect(result).toBeNull();
      }
    });

    it("should return null when destination not found in database", async () => {
      const mockQuery = createMockQuery([]);

      const mockDb = {
        select: jest.fn().mockReturnValue(mockQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      const result = await getDestinationDetails("AE", "en");

      expect(result).toBeNull();
    });
  });

  describe("getDestinationWithVisaTypes", () => {
    it("should return the same result as getDestinationDetails", async () => {
      const mockResult: DestinationWithVisaTypes = {
        code: "AE",
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

      const mockDestinationQuery = createMockQuery([mockResult]);
      const mockEmptyQuery = createMockQuery([]);

      const mockDb = {
        select: jest
          .fn()
          .mockReturnValueOnce(mockDestinationQuery)
          .mockReturnValue(mockEmptyQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      const result = await getDestinationWithVisaTypes("AE", "en");

      expect(result).toMatchObject({
        code: "AE",
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
    });

    it("should validate country code format", async () => {
      const invalidCodes = ["", "A", "AGO", "ABCD", "12", "A1", "ao"];

      for (const code of invalidCodes) {
        const result = await getDestinationDetails(code, "en");
        expect(result).toBeNull();
      }
    });

    it("should handle concurrent requests", async () => {
      const mockDestinations = [
        {
          id: 1,
          code: "AE",
          name: "AE",
          localizedName: "United Arab Emirates",
          heroImage: "/flags/AE.svg",
          about: null,
          continent: "Asia",
          region: "Middle East",
        },
      ];

      const mockQuery = createMockQuery(mockDestinations);

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
