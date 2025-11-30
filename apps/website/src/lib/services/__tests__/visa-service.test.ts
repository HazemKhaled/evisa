import * as dbConnection from "@repo/database";

import { checkVisaEligibility, getRandomVisaTypes } from "../visa-service";

// Mock the database connection
jest.mock("@repo/database");

const mockDbConnection = dbConnection as jest.Mocked<typeof dbConnection>;

// Helper function to create mock queries following country service pattern
const createMockQuery = (data: unknown) => {
  const mockQuery = Promise.resolve(data);
  Object.assign(mockQuery, {
    from: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
  });
  return mockQuery;
};

describe("Visa Service", () => {
  describe("checkVisaEligibility", () => {
    it("should return visa eligibility info for valid passport-destination combination", async () => {
      const mockDestination = {
        id: 1,
        code: "UAE",
        name: "United Arab Emirates",
      };

      const mockPassport = {
        id: 2,
        code: "USA",
        name: "United States",
      };

      const mockEligibilityResults = [
        {
          eligibilityStatus: "visa_free",
          maxStayDays: 30,
          notes: "Visa-free for tourism",
          visaTypeId: null,
        },
      ];

      // Create separate mock queries for each database call following country service pattern
      const mockDestinationQuery = createMockQuery([mockDestination]);
      const mockPassportQuery = createMockQuery([mockPassport]);
      const mockEligibilityQuery = createMockQuery(mockEligibilityResults);

      // Mock database instance with select method returning different queries in sequence
      const mockDb = {
        select: jest
          .fn()
          .mockReturnValueOnce(mockDestinationQuery)
          .mockReturnValueOnce(mockPassportQuery)
          .mockReturnValueOnce(mockEligibilityQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      const result = await checkVisaEligibility("USA", "UAE", "en");

      expect(result).toEqual({
        eligibilityStatus: "visa_free",
        maxStayDays: 30,
        notes: "Visa-free for tourism",
        passportCode: "USA",
        destinationCode: "UAE",
        destinationName: "United Arab Emirates",
        passportName: "United States",
        visaTypes: [],
      });
    });

    it("should return null for invalid country codes", async () => {
      // Mock empty queries for invalid country codes
      const mockEmptyQuery = createMockQuery([]);

      const mockDb = {
        select: jest.fn().mockReturnValue(mockEmptyQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      const result = await checkVisaEligibility("INVALID", "UAE", "en");
      expect(result).toBeNull();
    });
  });

  describe("getRandomVisaTypes", () => {
    it("should maintain backward compatibility with getRandomVisaTypes", async () => {
      const mockVisaTypes = [
        {
          id: 1,
          destinationId: 1,
          type: "tourist",
          duration: 30,
          maxStay: 30,
          processingTime: 5,
          fee: 100,
          currency: "USD",
          requiresInterview: false,
          isMultiEntry: false,
          requirements: null,
          documents: null,
          name: "Tourist Visa",
          description: null,
          destinationCode: "UAE",
          destinationName: "United Arab Emirates",
        },
      ];

      // Create mock query for visa types following country service pattern
      const mockVisaTypesQuery = createMockQuery(mockVisaTypes);

      // Mock database instance
      const mockDb = {
        select: jest.fn().mockReturnValueOnce(mockVisaTypesQuery),
      };

      mockDbConnection.getDb.mockReturnValue(
        mockDb as unknown as ReturnType<typeof mockDbConnection.getDb>
      );

      const result = await getRandomVisaTypes("en", 6);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        type: "tourist",
        name: "Tourist Visa",
        destinationCode: "UAE",
      });
    });
  });
});
