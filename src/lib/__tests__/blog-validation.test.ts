/**
 * Unit tests for Blog Validation utilities
 */

import {
  validateBlogPostFrontmatter,
  validateBlogPostContent,
  validateBlogPost,
  formatValidationResult,
  type BlogPostValidationResult,
} from "../blog-validation";

describe("Blog Validation", () => {
  describe("validateBlogPostFrontmatter", () => {
    it("should validate complete valid frontmatter", () => {
      const frontmatter = {
        title: "Complete Travel Guide to Dubai",
        description:
          "A comprehensive guide covering everything you need to know about Dubai travel",
        destinations: ["UAE"],
        image: "/images/blog/dubai-guide.jpg",
        tags: ["travel", "dubai", "uae", "guide"],
        author: "Travel Expert",
        publishedAt: "2024-09-01",
        lastUpdated: "2024-09-10",
        related_visas: ["tourist", "business"],
      };

      const result = validateBlogPostFrontmatter(
        frontmatter,
        "dubai-travel-guide"
      );

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should flag missing required fields", () => {
      const frontmatter = {
        description: "A travel guide",
        // Missing: title, image, tags, author, publishedAt
      };

      const result = validateBlogPostFrontmatter(
        frontmatter,
        "incomplete-guide"
      );

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Missing required field: title");
      expect(result.errors).toContain("Missing required field: image");
      expect(result.errors).toContain("Missing required field: tags");
      expect(result.errors).toContain("Missing required field: author");
      expect(result.errors).toContain("Missing required field: publishedAt");
    });

    it("should flag incorrect data types", () => {
      const frontmatter = {
        title: 123, // Should be string
        description: "Valid description",
        image: "/valid/image.jpg",
        tags: "not-an-array", // Should be array
        author: "Valid Author",
        publishedAt: "2024-09-01",
        destinations: "UAE", // Should be array
      };

      const result = validateBlogPostFrontmatter(frontmatter, "type-errors");

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Field 'title' must be a string");
      expect(result.errors).toContain("Field 'tags' must be an array");
      expect(result.errors).toContain("Field 'destinations' must be an array");
    });

    it("should validate date fields properly", () => {
      const frontmatter = {
        title: "Valid Title",
        description: "Valid description",
        image: "/valid/image.jpg",
        tags: ["valid"],
        author: "Valid Author",
        publishedAt: "invalid-date",
        lastUpdated: "2024-13-45", // Invalid date
      };

      const result = validateBlogPostFrontmatter(frontmatter, "date-errors");

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Field 'publishedAt' must be a valid date (received: invalid-date)"
      );
      expect(result.errors).toContain(
        "Field 'lastUpdated' must be a valid date (received: 2024-13-45)"
      );
    });

    it("should provide warnings for content length issues", () => {
      const frontmatter = {
        title: "Short", // Too short
        description:
          "This description is way too long for SEO purposes and should probably be shortened to fit within the recommended character limits for better search engine optimization performance and user experience across all devices", // Too long (over 200 chars)
        image: "/valid/image.jpg",
        tags: ["valid"],
        author: "Valid Author",
        publishedAt: "2024-09-01",
      };

      const result = validateBlogPostFrontmatter(
        frontmatter,
        "content-warnings"
      );

      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain(
        "Title is very short (5 characters) - consider making it more descriptive"
      );
      expect(
        result.warnings.some(w => w.includes("Description is very long"))
      ).toBe(true);
    });

    it("should validate empty arrays", () => {
      const frontmatter = {
        title: "Valid Title",
        description: "Valid description",
        image: "/valid/image.jpg",
        tags: [], // Empty array
        author: "Valid Author",
        publishedAt: "2024-09-01",
        destinations: [],
      };

      const result = validateBlogPostFrontmatter(frontmatter, "empty-arrays");

      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain(
        "Field 'tags' is empty - consider adding relevant tags for better discoverability"
      );
    });

    it("should validate destination country codes", () => {
      const frontmatter = {
        title: "Valid Title",
        description: "Valid description",
        image: "/valid/image.jpg",
        tags: ["travel"],
        author: "Valid Author",
        publishedAt: "2024-09-01",
        destinations: ["USA", "INVALID_LONG_CODE", "UK"], // Mixed valid and questionable codes
      };

      const result = validateBlogPostFrontmatter(
        frontmatter,
        "destination-codes"
      );

      expect(result.isValid).toBe(true);
      expect(result.warnings.some(w => w.includes("INVALID_LONG_CODE"))).toBe(
        true
      );
    });
  });

  describe("validateBlogPostContent", () => {
    it("should validate non-empty content", () => {
      const content = `
# Complete Travel Guide

This is a comprehensive travel guide with plenty of content to provide value to readers.

## Section 1
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 2
More detailed information about the destination.
      `.trim();

      const result = validateBlogPostContent(content, "travel-guide");

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should flag empty or very short content", () => {
      const emptyResult = validateBlogPostContent("", "empty-post");
      const shortResult = validateBlogPostContent(
        "Short content.",
        "short-post"
      );

      expect(emptyResult.isValid).toBe(false);
      expect(emptyResult.errors).toContain("Blog post content cannot be empty");

      expect(shortResult.isValid).toBe(true);
      expect(
        shortResult.warnings.some(w => w.includes("Content is very short"))
      ).toBe(true);
    });

    it("should check for malformed links", () => {
      const content = `
# Travel Guide

Check out this [link with spaces](http://example.com/page with spaces) for more info.
And here's a [valid link](http://example.com/valid-page).
      `.trim();

      const result = validateBlogPostContent(content, "link-errors");

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes("has spaces in URL"))).toBe(
        true
      );
    });

    it("should warn about multiple H1 headings", () => {
      const content = `
# First H1 Heading

Some content here.

# Second H1 Heading

More content here.
      `.trim();

      const result = validateBlogPostContent(content, "multiple-h1");

      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain(
        "Multiple H1 headings found - consider using H2-H6 for subsections"
      );
    });
  });

  describe("validateBlogPost", () => {
    it("should combine frontmatter and content validation", () => {
      const frontmatter = {
        title: "Complete Travel Guide",
        description: "A comprehensive guide",
        image: "/valid/image.jpg",
        tags: ["travel"],
        author: "Travel Expert",
        publishedAt: "2024-09-01",
      };

      const content = `
# Travel Guide

This is a comprehensive travel guide with good content.
      `.trim();

      const result = validateBlogPost(frontmatter, content, "travel-guide");

      expect(result.isValid).toBe(true);
    });

    it("should flag errors from both frontmatter and content", () => {
      const frontmatter = {
        // Missing required fields
        description: "A guide",
      };

      const content = ""; // Empty content

      const result = validateBlogPost(frontmatter, content, "invalid-post");

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
      expect(
        result.errors.some(e => e.includes("Missing required field"))
      ).toBe(true);
      expect(result.errors).toContain("Blog post content cannot be empty");
    });
  });

  describe("formatValidationResult", () => {
    it("should format validation results properly", () => {
      const result: BlogPostValidationResult = {
        isValid: false,
        errors: ["Missing required field: title", "Invalid date format"],
        warnings: ["Title is too short", "Consider adding more tags"],
      };

      const formatted = formatValidationResult(result, "test-post");

      expect(formatted).toContain("--- Blog Post Validation: test-post ---");
      expect(formatted).toContain("❌ Invalid (2 errors)");
      expect(formatted).toContain("1. Missing required field: title");
      expect(formatted).toContain("2. Invalid date format");
      expect(formatted).toContain("1. Title is too short");
      expect(formatted).toContain("2. Consider adding more tags");
    });

    it("should format valid results properly", () => {
      const result: BlogPostValidationResult = {
        isValid: true,
        errors: [],
        warnings: ["Minor suggestion"],
      };

      const formatted = formatValidationResult(result, "valid-post");

      expect(formatted).toContain("--- Blog Post Validation: valid-post ---");
      expect(formatted).toContain("✅ Valid");
      expect(formatted).not.toContain("Errors:");
      expect(formatted).toContain("1. Minor suggestion");
    });
  });
});
