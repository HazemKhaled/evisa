import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";
import {
  getDb,
  getDbAsync,
  isDatabaseAvailable,
  isDatabaseAvailableAsync,
} from "../connection";

// Mock dependencies
jest.mock("@opennextjs/cloudflare");
jest.mock("drizzle-orm/d1");
jest.mock("react");

const mockGetCloudflareContext = getCloudflareContext as jest.MockedFunction<
  typeof getCloudflareContext
>;
const mockDrizzle = drizzle as jest.MockedFunction<typeof drizzle>;
const mockCache = cache as jest.MockedFunction<typeof cache>;

describe("Database Connection", () => {
  const mockD1Database = {
    exec: jest.fn(),
    prepare: jest.fn(),
    dump: jest.fn(),
    batch: jest.fn(),
  } as any;

  const mockDrizzleInstance = {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default cache behavior - return function as-is for testing
    mockCache.mockImplementation((fn: any) => fn);

    // Setup default drizzle behavior
    mockDrizzle.mockReturnValue(mockDrizzleInstance);
  });

  describe("getDb", () => {
    it("should return drizzle instance when D1 database is available", () => {
      // Arrange
      mockGetCloudflareContext.mockReturnValue({
        env: { DB: mockD1Database } as unknown as CloudflareEnv,
        cf: {},
        ctx: {} as any,
      });

      // Act
      const result = getDb();

      // Assert
      expect(mockGetCloudflareContext).toHaveBeenCalledWith();
      expect(mockDrizzle).toHaveBeenCalledWith(
        mockD1Database,
        expect.objectContaining({
          schema: expect.any(Object),
        })
      );
      expect(result).toBe(mockDrizzleInstance);
    });

    it("should throw error when D1 database is not available", () => {
      // Arrange
      mockGetCloudflareContext.mockReturnValue({
        env: {} as unknown as CloudflareEnv,
        cf: {},
        ctx: {} as any,
      });

      // Act & Assert
      expect(() => getDb()).toThrow(
        "Database not available - ensure D1 binding 'DB' is configured"
      );
      expect(mockDrizzle).not.toHaveBeenCalled();
    });

    it("should throw error when getCloudflareContext fails", () => {
      // Arrange
      mockGetCloudflareContext.mockImplementation(() => {
        throw new Error("Context not available");
      });

      // Act & Assert
      expect(() => getDb()).toThrow("Context not available");
      expect(mockDrizzle).not.toHaveBeenCalled();
    });

    it("should use React cache for optimization", () => {
      // Arrange
      mockGetCloudflareContext.mockReturnValue({
        env: { DB: mockD1Database } as unknown as CloudflareEnv,
        cf: {},
        ctx: {} as any,
      });

      // Act
      getDb();

      // Assert
      expect(mockCache).toHaveBeenCalled();
      expect(typeof mockCache.mock.calls[0][0]).toBe("function");
    });
  });

  describe("getDbAsync", () => {
    it("should return drizzle instance when D1 database is available", async () => {
      // Arrange
      mockGetCloudflareContext.mockResolvedValue({
        env: { DB: mockD1Database },
        cf: {},
        ctx: {} as any,
      } as unknown as never);

      // Act
      const result = await getDbAsync();

      // Assert
      expect(mockGetCloudflareContext).toHaveBeenCalledWith({ async: true });
      expect(mockDrizzle).toHaveBeenCalledWith(
        mockD1Database,
        expect.objectContaining({
          schema: expect.any(Object),
        })
      );
      expect(result).toBe(mockDrizzleInstance);
    });

    it("should throw error when D1 database is not available", async () => {
      // Arrange
      mockGetCloudflareContext.mockResolvedValue({
        env: {},
        cf: {},
        ctx: {} as any,
      } as unknown as never);

      // Act & Assert
      await expect(getDbAsync()).rejects.toThrow(
        "Database not available - ensure D1 binding 'DB' is configured"
      );
      expect(mockDrizzle).not.toHaveBeenCalled();
    });

    it("should throw error when getCloudflareContext fails", async () => {
      // Arrange
      mockGetCloudflareContext.mockRejectedValue(
        new Error("Context not available") as unknown as never
      );

      // Act & Assert
      await expect(getDbAsync()).rejects.toThrow("Context not available");
      expect(mockDrizzle).not.toHaveBeenCalled();
    });

    it("should use React cache for optimization", async () => {
      // Arrange
      mockGetCloudflareContext.mockResolvedValue({
        env: { DB: mockD1Database },
        cf: {},
        ctx: {} as any,
      } as unknown as never);

      // Act
      await getDbAsync();

      // Assert
      expect(mockCache).toHaveBeenCalled();
      expect(typeof mockCache.mock.calls[0][0]).toBe("function");
    });
  });

  describe("isDatabaseAvailable", () => {
    it("should return true when D1 database is available", () => {
      // Arrange
      mockGetCloudflareContext.mockReturnValue({
        env: { DB: mockD1Database } as unknown as CloudflareEnv,
        cf: {},
        ctx: {} as any,
      });

      // Act
      const result = isDatabaseAvailable();

      // Assert
      expect(result).toBe(true);
      expect(mockGetCloudflareContext).toHaveBeenCalledWith();
    });

    it("should return false when D1 database is not available", () => {
      // Arrange
      mockGetCloudflareContext.mockReturnValue({
        env: {} as unknown as CloudflareEnv,
        cf: {},
        ctx: {} as any,
      });

      // Act
      const result = isDatabaseAvailable();

      // Assert
      expect(result).toBe(false);
      expect(mockGetCloudflareContext).toHaveBeenCalledWith();
    });

    it("should return false when getCloudflareContext throws error", () => {
      // Arrange
      mockGetCloudflareContext.mockImplementation(() => {
        throw new Error("Context not available");
      });

      // Act
      const result = isDatabaseAvailable();

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("isDatabaseAvailableAsync", () => {
    it("should return true when D1 database is available", async () => {
      // Arrange
      mockGetCloudflareContext.mockResolvedValue({
        env: { DB: mockD1Database },
        cf: {},
        ctx: {} as any,
      } as unknown as never);

      // Act
      const result = await isDatabaseAvailableAsync();

      // Assert
      expect(result).toBe(true);
      expect(mockGetCloudflareContext).toHaveBeenCalledWith({ async: true });
    });

    it("should return false when D1 database is not available", async () => {
      // Arrange
      mockGetCloudflareContext.mockResolvedValue({
        env: {},
        cf: {},
        ctx: {} as any,
      } as unknown as never);

      // Act
      const result = await isDatabaseAvailableAsync();

      // Assert
      expect(result).toBe(false);
      expect(mockGetCloudflareContext).toHaveBeenCalledWith({ async: true });
    });

    it("should return false when getCloudflareContext rejects", async () => {
      // Arrange
      mockGetCloudflareContext.mockRejectedValue(
        new Error("Context not available") as unknown as never
      );

      // Act
      const result = await isDatabaseAvailableAsync();

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("Cache behavior", () => {
    it("should cache getDb function", () => {
      // Arrange
      const mockCachedFunction = jest.fn().mockReturnValue(mockDrizzleInstance);
      mockCache.mockReturnValue(mockCachedFunction);
      mockGetCloudflareContext.mockReturnValue({
        env: { DB: mockD1Database } as unknown as CloudflareEnv,
        cf: {},
        ctx: {} as any,
      });

      // Act
      const result = getDb();

      // Assert
      expect(mockCache).toHaveBeenCalled();
      expect(result).toBe(mockDrizzleInstance);
    });

    it("should cache getDbAsync function", async () => {
      // Arrange
      const mockCachedFunction = jest
        .fn()
        .mockResolvedValue(mockDrizzleInstance);
      mockCache.mockReturnValue(mockCachedFunction);
      mockGetCloudflareContext.mockResolvedValue({
        env: { DB: mockD1Database },
        cf: {},
        ctx: {} as any,
      } as unknown as never);

      // Act
      const result = await getDbAsync();

      // Assert
      expect(mockCache).toHaveBeenCalled();
      expect(result).toBe(mockDrizzleInstance);
    });
  });

  describe("Error handling", () => {
    it("should provide clear error message for missing D1 binding", () => {
      // Arrange
      mockGetCloudflareContext.mockReturnValue({
        env: { OTHER_VAR: "value" } as unknown as CloudflareEnv,
        cf: {},
        ctx: {} as any,
      });

      // Act & Assert
      expect(() => getDb()).toThrow(
        "Database not available - ensure D1 binding 'DB' is configured"
      );
    });

    it("should provide clear error message for missing D1 binding in async", async () => {
      // Arrange
      mockGetCloudflareContext.mockResolvedValue({
        env: { OTHER_VAR: "value" },
        cf: {},
        ctx: {} as any,
      } as unknown as never);

      // Act & Assert
      await expect(getDbAsync()).rejects.toThrow(
        "Database not available - ensure D1 binding 'DB' is configured"
      );
    });
  });
});
