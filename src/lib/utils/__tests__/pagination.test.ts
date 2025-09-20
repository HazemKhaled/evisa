import {
  calculatePagination,
  generatePageNumbers,
  paginateArray,
  filterAndPaginate,
  createBlogFilter,
  createPaginationStats,
  validatePaginationParams,
} from "../pagination";

describe("Pagination utilities", () => {
  describe("calculatePagination", () => {
    it("calculates pagination for first page", () => {
      const result = calculatePagination({
        currentPage: 1,
        totalItems: 50,
        itemsPerPage: 10,
      });

      expect(result).toEqual({
        currentPage: 1,
        totalPages: 5,
        totalItems: 50,
        startIndex: 0,
        endIndex: 10,
        hasNextPage: true,
        hasPreviousPage: false,
        pageNumbers: [1, 2, 3, 4, 5],
      });
    });

    it("calculates pagination for middle page", () => {
      const result = calculatePagination({
        currentPage: 3,
        totalItems: 50,
        itemsPerPage: 10,
      });

      expect(result.currentPage).toBe(3);
      expect(result.startIndex).toBe(20);
      expect(result.endIndex).toBe(30);
      expect(result.hasNextPage).toBe(true);
      expect(result.hasPreviousPage).toBe(true);
    });

    it("calculates pagination for last page", () => {
      const result = calculatePagination({
        currentPage: 5,
        totalItems: 50,
        itemsPerPage: 10,
      });

      expect(result.hasNextPage).toBe(false);
      expect(result.hasPreviousPage).toBe(true);
    });

    it("handles invalid current page (too low)", () => {
      const result = calculatePagination({
        currentPage: 0,
        totalItems: 50,
        itemsPerPage: 10,
      });

      expect(result.currentPage).toBe(1);
    });

    it("handles invalid current page (too high)", () => {
      const result = calculatePagination({
        currentPage: 10,
        totalItems: 50,
        itemsPerPage: 10,
      });

      expect(result.currentPage).toBe(5); // Should be clamped to last page
    });

    it("handles invalid items per page", () => {
      const result = calculatePagination({
        currentPage: 1,
        totalItems: 50,
        itemsPerPage: 0,
      });

      expect(result.totalPages).toBe(50); // itemsPerPage should default to 1
    });

    it("handles empty items", () => {
      const result = calculatePagination({
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 10,
      });

      expect(result.totalPages).toBe(1);
      expect(result.startIndex).toBe(0);
      expect(result.endIndex).toBe(0);
      expect(result.hasNextPage).toBe(false);
    });
  });

  describe("generatePageNumbers", () => {
    it("generates all page numbers when total pages <= max pages", () => {
      expect(generatePageNumbers(1, 3, 5)).toEqual([1, 2, 3]);
      expect(generatePageNumbers(2, 4, 5)).toEqual([1, 2, 3, 4]);
    });

    it("generates page numbers for current page at start", () => {
      expect(generatePageNumbers(1, 10, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(generatePageNumbers(2, 10, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it("generates page numbers for current page in middle", () => {
      expect(generatePageNumbers(5, 10, 5)).toEqual([3, 4, 5, 6, 7]);
      expect(generatePageNumbers(6, 10, 5)).toEqual([4, 5, 6, 7, 8]);
    });

    it("generates page numbers for current page near end", () => {
      expect(generatePageNumbers(9, 10, 5)).toEqual([6, 7, 8, 9, 10]);
      expect(generatePageNumbers(10, 10, 5)).toEqual([6, 7, 8, 9, 10]);
    });

    it("handles single page", () => {
      expect(generatePageNumbers(1, 1, 5)).toEqual([1]);
    });
  });

  describe("paginateArray", () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    it("paginates array for first page", () => {
      expect(paginateArray(items, 1, 3)).toEqual([1, 2, 3]);
    });

    it("paginates array for middle page", () => {
      expect(paginateArray(items, 2, 3)).toEqual([4, 5, 6]);
    });

    it("paginates array for last page", () => {
      expect(paginateArray(items, 4, 3)).toEqual([10]);
    });

    it("handles empty array", () => {
      expect(paginateArray([], 1, 3)).toEqual([]);
    });

    it("handles invalid page", () => {
      expect(paginateArray(items, 0, 3)).toEqual([1, 2, 3]);
      expect(paginateArray(items, 10, 3)).toEqual([10]);
    });
  });

  describe("filterAndPaginate", () => {
    const items = [
      { value: 1, category: "A" },
      { value: 2, category: "B" },
      { value: 3, category: "A" },
      { value: 4, category: "B" },
      { value: 5, category: "A" },
    ];

    it("filters and paginates items", () => {
      const filterFn = (item: (typeof items)[0]) => item.category === "A";
      const result = filterAndPaginate(items, filterFn, 1, 2);

      expect(result.items).toEqual([
        { value: 1, category: "A" },
        { value: 3, category: "A" },
      ]);
      expect(result.totalFilteredItems).toBe(3);
      expect(result.pagination.currentPage).toBe(1);
      expect(result.pagination.totalPages).toBe(2);
    });

    it("handles no matches", () => {
      const filterFn = (item: (typeof items)[0]) => item.category === "C";
      const result = filterAndPaginate(items, filterFn, 1, 2);

      expect(result.items).toEqual([]);
      expect(result.totalFilteredItems).toBe(0);
    });
  });

  describe("createBlogFilter", () => {
    const blogItems = [
      {
        tags: ["travel", "visa"],
        destinations: ["USA", "UK"],
      },
      {
        tags: ["business", "visa"],
        destinations: ["Canada", "France"],
      },
      {
        tags: ["tourism"],
        destinations: ["USA", "Spain"],
      },
    ];

    it("filters by tag", () => {
      const filter = createBlogFilter({ tag: "travel" });
      const filtered = blogItems.filter(filter);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].tags).toContain("travel");
    });

    it("filters by destination", () => {
      const filter = createBlogFilter({ destination: "USA" });
      const filtered = blogItems.filter(filter);

      expect(filtered).toHaveLength(2);
      expect(
        filtered.every(item =>
          item.destinations?.some(dest => dest.toLowerCase().includes("usa"))
        )
      ).toBe(true);
    });

    it("filters by both tag and destination", () => {
      const filter = createBlogFilter({ tag: "visa", destination: "USA" });
      const filtered = blogItems.filter(filter);

      expect(filtered).toHaveLength(1);
      expect(filtered[0].tags).toContain("visa");
      expect(filtered[0].destinations).toContain("USA");
    });

    it("returns all items when no filters", () => {
      const filter = createBlogFilter({});
      const filtered = blogItems.filter(filter);

      expect(filtered).toHaveLength(3);
    });

    it("handles missing tags/destinations", () => {
      const itemsWithMissing = [
        {},
        { tags: ["travel"] },
        { destinations: ["USA"] },
      ];

      const filter = createBlogFilter({ tag: "travel" });
      const filtered = itemsWithMissing.filter(filter);

      expect(filtered).toHaveLength(1);
    });
  });

  describe("createPaginationStats", () => {
    it("creates stats for items with results", () => {
      const pagination = {
        currentPage: 2,
        totalPages: 5,
        totalItems: 47,
        startIndex: 10,
        endIndex: 20,
        hasNextPage: true,
        hasPreviousPage: true,
        pageNumbers: [1, 2, 3, 4, 5],
      };

      expect(createPaginationStats(pagination, "posts")).toBe(
        "11-20 of 47 posts"
      );
    });

    it("creates stats for single item", () => {
      const pagination = {
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
        startIndex: 0,
        endIndex: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        pageNumbers: [1],
      };

      expect(createPaginationStats(pagination, "posts")).toBe("1 post");
    });

    it("creates stats for no items", () => {
      const pagination = {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        startIndex: 0,
        endIndex: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        pageNumbers: [1],
      };

      expect(createPaginationStats(pagination, "posts")).toBe("No posts found");
    });

    it("uses default item name", () => {
      const pagination = {
        currentPage: 1,
        totalPages: 1,
        totalItems: 5,
        startIndex: 0,
        endIndex: 5,
        hasNextPage: false,
        hasPreviousPage: false,
        pageNumbers: [1],
      };

      expect(createPaginationStats(pagination)).toBe("1-5 of 5 items");
    });
  });

  describe("validatePaginationParams", () => {
    it("validates normal parameters", () => {
      expect(validatePaginationParams({ page: 2, limit: 15 })).toEqual({
        page: 2,
        limit: 15,
      });
    });

    it("defaults missing parameters", () => {
      expect(validatePaginationParams({})).toEqual({
        page: 1,
        limit: 10,
      });
    });

    it("clamps invalid page to minimum", () => {
      expect(validatePaginationParams({ page: 0 })).toEqual({
        page: 1,
        limit: 10,
      });
      expect(validatePaginationParams({ page: -5 })).toEqual({
        page: 1,
        limit: 10,
      });
    });

    it("clamps invalid limit to range", () => {
      expect(validatePaginationParams({ limit: 0 })).toEqual({
        page: 1,
        limit: 10, // 0 is falsy, so defaults to 10
      });
      expect(validatePaginationParams({ limit: 200 })).toEqual({
        page: 1,
        limit: 100, // 200 gets clamped to 100 (maximum)
      });
    });

    it("handles string parameters", () => {
      expect(validatePaginationParams({ page: "3", limit: "25" })).toEqual({
        page: 3,
        limit: 25,
      });
    });

    it("handles invalid string parameters", () => {
      expect(
        validatePaginationParams({ page: "invalid", limit: "bad" })
      ).toEqual({
        page: 1,
        limit: 10,
      });
    });
  });
});
