/**
 * Unit tests for Blog Service
 */

import {
  type BlogFilterOptions,
  getAllBlogPosts,
  getAllDestinationsForLocale,
  getAllTagsForLocale,
  getBlogPostBySlug,
  getBlogPosts,
  getBlogPostsByDestination,
  getBlogPostsByTag,
  getFeaturedBlogPosts,
  getRelatedBlogPosts,
  searchBlogPosts,
} from "../blog-service";

// Mock the blog service for testing
jest.mock("../blog-service");

describe("Blog Service", () => {
  describe("getAllBlogPosts", () => {
    it("should return all blog posts for a locale", async () => {
      const posts = await getAllBlogPosts("en");
      expect(posts).toHaveLength(3);
      expect(posts[0].slug).toBe("test-post-1");
    });

    it("should limit results when limit is provided", async () => {
      const posts = await getAllBlogPosts("en", 2);
      expect(posts).toHaveLength(2);
    });
  });

  describe("getBlogPosts", () => {
    it("should return blog posts with default options", async () => {
      const response = await getBlogPosts({ locale: "en" });
      expect(response.posts).toHaveLength(3);
      expect(response.total).toBe(3);
      expect(response.hasMore).toBe(false);
    });

    it("should filter by locale", async () => {
      const response = await getBlogPosts({ locale: "es" });
      expect(response.posts).toHaveLength(3); // Mock returns same data for all locales
    });

    it("should apply limit option", async () => {
      const options: BlogFilterOptions = { locale: "en", limit: 2 };
      const response = await getBlogPosts(options);
      expect(response.posts).toHaveLength(2);
      expect(response.hasMore).toBe(true);
    });

    it("should apply offset option", async () => {
      const options: BlogFilterOptions = { locale: "en", offset: 1 };
      const response = await getBlogPosts(options);
      expect(response.posts).toHaveLength(2);
      expect(response.posts[0].slug).toBe("test-post-2");
    });
  });

  describe("getBlogPostsByDestination", () => {
    it("should return posts for a specific destination", async () => {
      const posts = await getBlogPostsByDestination("FR", "en");
      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe("test-post-1");
      expect(posts[0].destinations).toContain("FR");
    });

    it("should return posts for multi-destination countries", async () => {
      const posts = await getBlogPostsByDestination("US", "en");
      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe("test-post-3");
    });

    it("should return empty array for unknown destination", async () => {
      const posts = await getBlogPostsByDestination("ZZ", "en");
      expect(posts).toHaveLength(0);
    });
  });

  describe("getBlogPostsByTag", () => {
    it("should return posts with specific tag", async () => {
      const posts = await getBlogPostsByTag("travel", "en");
      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe("test-post-1");
    });

    it("should return posts with featured tag", async () => {
      const posts = await getBlogPostsByTag("featured", "en");
      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe("test-post-3");
    });

    it("should return empty array for unknown tag", async () => {
      const posts = await getBlogPostsByTag("unknown", "en");
      expect(posts).toHaveLength(0);
    });
  });

  describe("getBlogPostBySlug", () => {
    it("should return specific blog post by slug", async () => {
      const post = await getBlogPostBySlug("test-post-1", "en");
      expect(post).toBeDefined();
      expect(post?.slug).toBe("test-post-1");
      expect(post?.title).toBe("Test Post 1");
    });

    it("should return null for non-existent slug", async () => {
      const post = await getBlogPostBySlug("non-existent", "en");
      expect(post).toBeNull();
    });
  });

  describe("getRelatedBlogPosts", () => {
    it("should return related posts based on destination", async () => {
      const related = await getRelatedBlogPosts("FR", "en");
      // Should find posts for destination FR
      expect(related.length).toBeGreaterThan(0);
      expect(related[0].destinations).toContain("FR");
    });

    it("should limit related posts to specified count", async () => {
      const related = await getRelatedBlogPosts("FR", "en", 1);
      expect(related).toHaveLength(1);
    });
  });

  describe("getAllTagsForLocale", () => {
    it("should return all unique tags", async () => {
      const tags = await getAllTagsForLocale("en");
      expect(tags).toContain("travel");
      expect(tags).toContain("guide");
      expect(tags).toContain("visa");
      expect(tags).toContain("featured");
      expect(tags).toContain("test");
    });

    it("should return unique tags only", async () => {
      const tags = await getAllTagsForLocale("en");
      const uniqueTags = [...new Set(tags)];
      expect(tags).toEqual(uniqueTags);
    });
  });

  describe("getAllDestinationsForLocale", () => {
    it("should return all unique destinations", async () => {
      const destinations = await getAllDestinationsForLocale("en");
      expect(destinations).toContain("FR");
      expect(destinations).toContain("GB");
      expect(destinations).toContain("US");
      expect(destinations).toContain("CA");
    });

    it("should return unique destinations only", async () => {
      const destinations = await getAllDestinationsForLocale("en");
      const uniqueDestinations = [...new Set(destinations)];
      expect(destinations).toEqual(uniqueDestinations);
    });
  });

  describe("searchBlogPosts", () => {
    it("should find posts by title", async () => {
      const results = await searchBlogPosts("Test Post 1", "en");
      expect(results).toHaveLength(1);
      expect(results[0].slug).toBe("test-post-1");
    });

    it("should find posts by content", async () => {
      const results = await searchBlogPosts("description", "en");
      expect(results.length).toBeGreaterThan(0);
    });

    it("should be case insensitive", async () => {
      const results = await searchBlogPosts("test post", "en");
      expect(results.length).toBeGreaterThan(0);
    });

    it("should return empty array for no matches", async () => {
      const results = await searchBlogPosts("nonexistent", "en");
      expect(results).toHaveLength(0);
    });

    it("should limit search results", async () => {
      const results = await searchBlogPosts("Test", "en", 1);
      expect(results).toHaveLength(1);
    });
  });

  describe("getFeaturedBlogPosts", () => {
    it("should return posts with featured tag", async () => {
      const featured = await getFeaturedBlogPosts("en");
      expect(featured).toHaveLength(1);
      expect(featured[0].slug).toBe("test-post-3");
      expect(featured[0].tags).toContain("featured");
    });

    it("should limit featured posts", async () => {
      const featured = await getFeaturedBlogPosts("en", 1);
      expect(featured).toHaveLength(1);
    });
  });
});
