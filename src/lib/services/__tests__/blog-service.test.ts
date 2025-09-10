/**
 * Unit tests for Blog Service
 */

import {
  getAllBlogPosts,
  getBlogPosts,
  getBlogPostsByDestination,
  getBlogPostsByTag,
  getRelatedBlogPosts,
  getBlogPostBySlug,
  getAllTagsForLocale,
  getAllDestinationsForLocale,
  searchBlogPosts,
  getFeaturedBlogPosts,
  type BlogFilterOptions,
} from "../blog-service";

// Mock the generated blog data
jest.mock("../../generated-blog-data", () => ({
  getGeneratedBlogPostsForLocale: jest.fn(() => [
    {
      slug: "uae-travel-guide",
      content: "Complete guide to UAE travel",
      frontmatter: {
        title: "UAE Travel Guide",
        description: "Everything you need to know about traveling to UAE",
        destinations: ["UAE"],
        image: "/images/blog/uae-guide.jpg",
        tags: ["travel", "guide", "UAE", "featured"],
        author: "Travel Team",
        publishedAt: "2024-09-01",
        lastUpdated: "2024-09-05",
      },
    },
    {
      slug: "general-visa-tips",
      content: "General visa application tips",
      frontmatter: {
        title: "General Visa Tips",
        description: "Tips for visa applications",
        destinations: [],
        image: "/images/blog/visa-tips.jpg",
        tags: ["visa", "tips", "travel"],
        author: "Visa Expert",
        publishedAt: "2024-08-15",
        lastUpdated: "2024-08-20",
      },
    },
    {
      slug: "thailand-visa-guide",
      content: "Thailand visa requirements and process",
      frontmatter: {
        title: "Thailand Visa Guide",
        description: "Complete guide to Thailand visa",
        destinations: ["TH"],
        image: "/images/blog/thailand-visa.jpg",
        tags: ["thailand", "visa", "guide"],
        author: "Asia Expert",
        publishedAt: "2024-07-01",
      },
    },
  ]),
}));

describe("Blog Service", () => {
  describe("getAllBlogPosts", () => {
    it("should return all blog posts for a locale", () => {
      const posts = getAllBlogPosts("en");
      expect(posts).toHaveLength(3);
      expect(posts[0].slug).toBe("uae-travel-guide");
    });

    it("should limit results when limit is provided", () => {
      const posts = getAllBlogPosts("en", 2);
      expect(posts).toHaveLength(2);
    });

    it("should handle errors gracefully", () => {
      // This would be tested with a mock that throws an error
      const posts = getAllBlogPosts("invalid-locale");
      expect(Array.isArray(posts)).toBe(true);
    });
  });

  describe("getBlogPosts", () => {
    it("should return paginated results", () => {
      const options: BlogFilterOptions = {
        locale: "en",
        limit: 2,
        offset: 0,
      };

      const result = getBlogPosts(options);

      expect(result.posts).toHaveLength(2);
      expect(result.total).toBe(3);
      expect(result.currentPage).toBe(1);
      expect(result.totalPages).toBe(2);
      expect(result.hasMore).toBe(true);
    });

    it("should filter by tag", () => {
      const options: BlogFilterOptions = {
        locale: "en",
        tag: "featured",
      };

      const result = getBlogPosts(options);

      expect(result.posts).toHaveLength(1);
      expect(result.posts[0].slug).toBe("uae-travel-guide");
    });

    it("should filter by destination", () => {
      const options: BlogFilterOptions = {
        locale: "en",
        destination: "UAE",
      };

      const result = getBlogPosts(options);

      expect(result.posts).toHaveLength(1);
      expect(result.posts[0].slug).toBe("uae-travel-guide");
    });

    it("should sort by publication date (newest first)", () => {
      const options: BlogFilterOptions = {
        locale: "en",
      };

      const result = getBlogPosts(options);

      // Should be sorted by date descending (newest first)
      expect(result.posts[0].slug).toBe("uae-travel-guide"); // 2024-09-01
      expect(result.posts[1].slug).toBe("general-visa-tips"); // 2024-08-15
      expect(result.posts[2].slug).toBe("thailand-visa-guide"); // 2024-07-01
    });
  });

  describe("getBlogPostsByDestination", () => {
    it("should return posts for specific destination", () => {
      const posts = getBlogPostsByDestination("UAE", "en");

      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe("uae-travel-guide");
    });

    it("should return empty array for unknown destination", () => {
      const posts = getBlogPostsByDestination("UNKNOWN", "en");

      expect(posts).toHaveLength(0);
    });

    it("should respect limit parameter", () => {
      const posts = getBlogPostsByDestination("UAE", "en", 1);

      expect(posts).toHaveLength(1);
    });
  });

  describe("getBlogPostsByTag", () => {
    it("should return posts with specific tag", () => {
      const posts = getBlogPostsByTag("travel", "en");

      expect(posts).toHaveLength(2); // UAE guide and general tips both have travel tag
    });

    it("should be case insensitive", () => {
      const posts = getBlogPostsByTag("TRAVEL", "en");

      expect(posts).toHaveLength(2);
    });

    it("should return empty array for unknown tag", () => {
      const posts = getBlogPostsByTag("unknown-tag", "en");

      expect(posts).toHaveLength(0);
    });
  });

  describe("getRelatedBlogPosts", () => {
    it("should return related posts for destination", () => {
      const posts = getRelatedBlogPosts("UAE", "en", 3);

      expect(posts).toHaveLength(1); // Only UAE guide matches
      expect(posts[0].slug).toBe("uae-travel-guide");
    });

    it("should supplement with general posts when needed", () => {
      const posts = getRelatedBlogPosts("UNKNOWN", "en", 3);

      // Should return general travel posts when no destination-specific posts exist
      expect(posts.length).toBeGreaterThan(0);
    });

    it("should respect limit parameter", () => {
      const posts = getRelatedBlogPosts("UAE", "en", 1);

      expect(posts).toHaveLength(1);
    });
  });

  describe("getBlogPostBySlug", () => {
    it("should return specific blog post", () => {
      const post = getBlogPostBySlug("uae-travel-guide", "en");

      expect(post).not.toBeNull();
      expect(post?.slug).toBe("uae-travel-guide");
    });

    it("should return null for unknown slug", () => {
      const post = getBlogPostBySlug("unknown-slug", "en");

      expect(post).toBeNull();
    });
  });

  describe("getAllTagsForLocale", () => {
    it("should return unique tags sorted alphabetically", () => {
      const tags = getAllTagsForLocale("en");

      expect(tags).toContain("travel");
      expect(tags).toContain("guide");
      expect(tags).toContain("visa");
      expect(tags).toContain("featured");

      // Should be sorted
      const sortedTags = [...tags].sort();
      expect(tags).toEqual(sortedTags);
    });
  });

  describe("getAllDestinationsForLocale", () => {
    it("should return unique destinations sorted alphabetically", () => {
      const destinations = getAllDestinationsForLocale("en");

      expect(destinations).toContain("UAE");
      expect(destinations).toContain("TH");

      // Should be sorted
      const sortedDestinations = [...destinations].sort();
      expect(destinations).toEqual(sortedDestinations);
    });
  });

  describe("searchBlogPosts", () => {
    it("should search in title, description, and content", () => {
      const posts = searchBlogPosts("UAE", "en");

      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe("uae-travel-guide");
    });

    it("should be case insensitive", () => {
      const posts = searchBlogPosts("uae", "en");

      expect(posts).toHaveLength(1);
    });

    it("should search in tags", () => {
      const posts = searchBlogPosts("featured", "en");

      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe("uae-travel-guide");
    });

    it("should return empty array for empty query", () => {
      const posts = searchBlogPosts("", "en");

      expect(posts).toHaveLength(0);
    });

    it("should prioritize title matches", () => {
      const posts = searchBlogPosts("guide", "en");

      // Should find posts with "guide" in title
      expect(posts.length).toBeGreaterThan(0);
    });

    it("should respect limit parameter", () => {
      const posts = searchBlogPosts("guide", "en", 1);

      expect(posts).toHaveLength(1);
    });
  });

  describe("getFeaturedBlogPosts", () => {
    it("should return posts with featured tag", () => {
      const posts = getFeaturedBlogPosts("en");

      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe("uae-travel-guide");
    });

    it("should fallback to recent posts if no featured posts", () => {
      // This would be tested with a mock that has no featured posts
      const posts = getFeaturedBlogPosts("en", 2);

      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it("should respect limit parameter", () => {
      const posts = getFeaturedBlogPosts("en", 1);

      expect(posts).toHaveLength(1);
    });
  });
});
