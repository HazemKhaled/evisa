/**
 * Tests for the generated blog data file
 * This file contains auto-generated data, so we test basic functionality
 */

import {
  GENERATED_BLOG_DATA,
  getGeneratedBlogPostsForLocale,
  getGeneratedAllUniqueTags,
  getAllBlogPosts,
} from "../generated-blog-data";

describe("Generated blog data", () => {
  describe("GENERATED_BLOG_DATA", () => {
    it("should be defined", () => {
      expect(GENERATED_BLOG_DATA).toBeDefined();
      expect(typeof GENERATED_BLOG_DATA).toBe("object");
    });

    it("should have data for supported locales", () => {
      expect(GENERATED_BLOG_DATA).toHaveProperty("en");
      expect(Array.isArray(GENERATED_BLOG_DATA.en)).toBe(true);
    });

    it("should have blog posts with required structure", () => {
      if (GENERATED_BLOG_DATA.en && GENERATED_BLOG_DATA.en.length > 0) {
        const firstPost = GENERATED_BLOG_DATA.en[0];
        expect(firstPost).toHaveProperty("content");
        expect(firstPost).toHaveProperty("slug");
        expect(firstPost).toHaveProperty("frontmatter");
        expect(firstPost).toHaveProperty("destinationNames");

        expect(typeof firstPost.content).toBe("string");
        expect(typeof firstPost.slug).toBe("string");
        expect(typeof firstPost.frontmatter).toBe("object");
        expect(Array.isArray(firstPost.destinationNames)).toBe(true);
      }
    });
  });

  describe("getGeneratedBlogPostsForLocale", () => {
    it("should return blog posts for valid locale", () => {
      const result = getGeneratedBlogPostsForLocale("en");
      expect(Array.isArray(result)).toBe(true);
    });

    it("should return empty array for invalid locale", () => {
      const result = getGeneratedBlogPostsForLocale("invalid-locale");
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);
    });

    it("should return empty array for undefined locale", () => {
      const result = getGeneratedBlogPostsForLocale(
        undefined as unknown as string
      );
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);
    });
  });

  describe("getGeneratedAllUniqueTags", () => {
    it("should return array of unique tags", () => {
      const result = getGeneratedAllUniqueTags();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should return unique tags only", () => {
      const result = getGeneratedAllUniqueTags();
      const uniqueTags = [...new Set(result)];
      expect(result).toEqual(uniqueTags);
    });
  });

  describe("getAllBlogPosts", () => {
    it("should return array of blog posts", () => {
      const result = getAllBlogPosts();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should return posts with correct structure", () => {
      const result = getAllBlogPosts();
      if (result.length > 0) {
        const firstPost = result[0];
        expect(firstPost).toHaveProperty("locale");
        expect(firstPost).toHaveProperty("slug");
        expect(typeof firstPost.locale).toBe("string");
        expect(typeof firstPost.slug).toBe("string");
      }
    });
  });

  describe("Data integrity", () => {
    it("should have consistent data structure across all posts", () => {
      const allPosts = getAllBlogPosts();

      allPosts.forEach(post => {
        expect(post).toHaveProperty("locale");
        expect(post).toHaveProperty("slug");

        expect(typeof post.locale).toBe("string");
        expect(typeof post.slug).toBe("string");
      });
    });

    it("should have unique slugs per locale", () => {
      const allPosts = getAllBlogPosts();
      const slugsByLocale = new Map<string, Set<string>>();

      allPosts.forEach(post => {
        if (!slugsByLocale.has(post.locale)) {
          slugsByLocale.set(post.locale, new Set());
        }
        slugsByLocale.get(post.locale)!.add(post.slug);
      });

      // Check that slugs are unique within each locale
      slugsByLocale.forEach((slugs, locale) => {
        expect(slugs.size).toBe(
          allPosts.filter(p => p.locale === locale).length
        );
      });
    });

    it("should have valid locale values", () => {
      const allPosts = getAllBlogPosts();
      const validLocales = [
        "en",
        "ar",
        "es",
        "fr",
        "de",
        "it",
        "pt",
        "ru",
        "zh",
        "ja",
        "ko",
      ];

      allPosts.forEach(post => {
        expect(validLocales).toContain(post.locale);
        expect(post.locale.length).toBeGreaterThan(0);
      });
    });
  });
});
