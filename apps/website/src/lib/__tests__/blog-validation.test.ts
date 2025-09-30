/**
 * Unit tests for Blog Validation utilities
 */

import {
  validateBlogPostContent,
  formatValidationResult,
  type BlogPostValidationResult,
} from "../blog-validation";

describe("Blog Validation", () => {
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
