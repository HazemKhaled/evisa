import {
  paginateArray,
  createBlogFilter,
  validatePaginationParams,
} from "../pagination";

describe("Pagination utilities", () => {
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
        limit: 10,
      });
      expect(validatePaginationParams({ limit: 200 })).toEqual({
        page: 1,
        limit: 100,
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
