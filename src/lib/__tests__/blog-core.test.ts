/**
 * Blog Core Module Tests
 *
 * Comprehensive test suite for the core blog processing module.
 * Tests file system operations, MDX parsing, and blog post processing.
 */

import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import {
  getAllBlogPosts,
  getBlogPostsForLocale,
  getAllUniqueTags,
} from "../core/blog-core";
import { validateBlogPost } from "../blog-validation";

// Mock all external dependencies
jest.mock("fs");
jest.mock("path");
jest.mock("gray-matter");
jest.mock("../blog-validation");

// Type the mocked modules
const mockedFs = jest.mocked(fs);
const mockedPath = jest.mocked(path);
const mockedMatter = jest.mocked(matter);
const mockedValidateBlogPost = jest.mocked(validateBlogPost);

describe("Blog Core Module", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mocks
    mockedPath.join.mockImplementation((...args) => args.join("/"));
    jest.spyOn(process, "cwd").mockReturnValue("/test-cwd");

    // Default validation - posts are valid
    mockedValidateBlogPost.mockReturnValue({
      isValid: true,
      errors: [],
      warnings: [],
    });
  });

  describe("getAllBlogPosts", () => {
    it("should return all blog posts from all locales", () => {
      // Mock directory structure - first call gets locales
      (mockedFs.readdirSync as jest.Mock)
        .mockReturnValueOnce([
          { name: "en", isDirectory: () => true },
          { name: "es", isDirectory: () => true },
          { name: "generated", isDirectory: () => true }, // Should be filtered
        ])
        .mockReturnValueOnce(["post1.mdx", "post2.mdx"]) // en posts
        .mockReturnValueOnce(["post3.mdx"]); // es posts

      mockedFs.existsSync.mockReturnValue(true);

      const result = getAllBlogPosts();

      expect(result).toEqual([
        { locale: "en", slug: "post1" },
        { locale: "en", slug: "post2" },
        { locale: "es", slug: "post3" },
      ]);
    });

    it("should handle file system errors gracefully", () => {
      (mockedFs.readdirSync as jest.Mock).mockImplementation(() => {
        throw new Error("Permission denied");
      });

      const result = getAllBlogPosts();
      expect(result).toEqual([]);
    });

    it("should handle missing blog directories", () => {
      (mockedFs.readdirSync as jest.Mock).mockReturnValueOnce([
        { name: "en", isDirectory: () => true },
      ]);
      mockedFs.existsSync.mockReturnValue(false);

      const result = getAllBlogPosts();
      expect(result).toEqual([]);
    });
  });

  describe("getBlogPostsForLocale", () => {
    it("should return sorted blog posts for a locale", async () => {
      mockedFs.existsSync.mockReturnValue(true);
      (mockedFs.readdirSync as jest.Mock).mockReturnValue([
        "post1.mdx",
        "post2.mdx",
      ]);

      // Mock file reading
      (mockedFs.readFileSync as jest.Mock)
        .mockReturnValueOnce("post1 content")
        .mockReturnValueOnce("post2 content");

      // Mock matter parsing - post2 is newer
      mockedMatter
        .mockReturnValueOnce({
          data: {
            title: "Post 1",
            description: "Description 1",
            destinations: ["USA"],
            image: "/image1.jpg",
            tags: ["travel"],
            author: "Author 1",
            publishedAt: "2024-01-01",
          },
          content: "Content 1",
          orig: "",
          language: "",
          matter: "",
          stringify: jest.fn(),
        } as matter.GrayMatterFile<string>)
        .mockReturnValueOnce({
          data: {
            title: "Post 2",
            description: "Description 2",
            destinations: ["GBR"],
            image: "/image2.jpg",
            tags: ["visa"],
            author: "Author 2",
            publishedAt: "2024-01-02",
          },
          content: "Content 2",
          orig: "",
          language: "",
          matter: "",
          stringify: jest.fn(),
        } as matter.GrayMatterFile<string>);

      const result = await getBlogPostsForLocale("en");

      expect(result).toHaveLength(2);
      // Should be sorted newest first
      expect(result[0].slug).toBe("post2");
      expect(result[1].slug).toBe("post1");
      expect(result[0].frontmatter.publishedAt).toBe("2024-01-02");
    });

    it("should return empty array for non-existent locale", async () => {
      mockedFs.existsSync.mockReturnValue(false);

      const result = await getBlogPostsForLocale("nonexistent");
      expect(result).toEqual([]);
    });

    it("should skip invalid posts", async () => {
      mockedFs.existsSync.mockReturnValue(true);
      (mockedFs.readdirSync as jest.Mock).mockReturnValue([
        "valid.mdx",
        "invalid.mdx",
      ]);

      (mockedFs.readFileSync as jest.Mock)
        .mockReturnValueOnce("valid content")
        .mockReturnValueOnce("invalid content");

      mockedMatter
        .mockReturnValueOnce({
          data: { title: "Valid Post", publishedAt: "2024-01-01" },
          content: "Valid content",
          orig: "",
          language: "",
          matter: "",
          stringify: jest.fn(),
        } as matter.GrayMatterFile<string>)
        .mockReturnValueOnce({
          data: { title: "Invalid Post" },
          content: "Invalid content",
          orig: "",
          language: "",
          matter: "",
          stringify: jest.fn(),
        } as matter.GrayMatterFile<string>);

      // First post valid, second invalid
      mockedValidateBlogPost
        .mockReturnValueOnce({ isValid: true, errors: [], warnings: [] })
        .mockReturnValueOnce({
          isValid: false,
          errors: ["Missing field"],
          warnings: [],
        });

      const result = await getBlogPostsForLocale("en");

      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe("valid");
    });
  });

  describe("getAllUniqueTags", () => {
    it("should return unique tags from all locales", async () => {
      // Mock the entire file system structure for getAllUniqueTags
      (mockedFs.readdirSync as jest.Mock).mockReturnValueOnce([
        { name: "en", isDirectory: () => true },
        { name: "es", isDirectory: () => true },
      ]);

      mockedFs.existsSync.mockReturnValue(true);

      // Mock for first locale (en)
      (mockedFs.readdirSync as jest.Mock).mockReturnValueOnce([
        "post1.mdx",
        "post2.mdx",
      ]);

      (mockedFs.readFileSync as jest.Mock)
        .mockReturnValueOnce("post1 content")
        .mockReturnValueOnce("post2 content");

      mockedMatter
        .mockReturnValueOnce({
          data: { tags: ["Travel", "VISA"] },
          content: "Content 1",
          orig: "",
          language: "",
          matter: "",
          stringify: jest.fn(),
        } as matter.GrayMatterFile<string>)
        .mockReturnValueOnce({
          data: { tags: ["visa", "Europe"] },
          content: "Content 2",
          orig: "",
          language: "",
          matter: "",
          stringify: jest.fn(),
        } as matter.GrayMatterFile<string>);

      // Mock for second locale (es)
      (mockedFs.readdirSync as jest.Mock).mockReturnValueOnce(["post3.mdx"]);

      (mockedFs.readFileSync as jest.Mock).mockReturnValueOnce("post3 content");

      mockedMatter.mockReturnValueOnce({
        data: { tags: ["travel", "Food"] },
        content: "Content 3",
        orig: "",
        language: "",
        matter: "",
        stringify: jest.fn(),
      } as matter.GrayMatterFile<string>);

      const result = await getAllUniqueTags();

      expect(result).toEqual(["europe", "food", "travel", "visa"]);
    });

    it("should filter empty tags", async () => {
      (mockedFs.readdirSync as jest.Mock).mockReturnValueOnce([
        { name: "en", isDirectory: () => true },
      ]);

      mockedFs.existsSync.mockReturnValue(true);
      (mockedFs.readdirSync as jest.Mock).mockReturnValueOnce(["post1.mdx"]);
      (mockedFs.readFileSync as jest.Mock).mockReturnValueOnce("post content");

      mockedMatter.mockReturnValueOnce({
        data: { tags: ["valid", "", "  ", "also-valid"] },
        content: "Content",
        orig: "",
        language: "",
        matter: "",
        stringify: jest.fn(),
      } as matter.GrayMatterFile<string>);

      const result = await getAllUniqueTags();
      expect(result).toEqual(["also-valid", "valid"]);
    });

    it("should handle posts without tags", async () => {
      (mockedFs.readdirSync as jest.Mock).mockReturnValueOnce([
        { name: "en", isDirectory: () => true },
      ]);

      mockedFs.existsSync.mockReturnValue(true);
      (mockedFs.readdirSync as jest.Mock).mockReturnValueOnce([
        "post1.mdx",
        "post2.mdx",
      ]);
      (mockedFs.readFileSync as jest.Mock)
        .mockReturnValueOnce("post1 content")
        .mockReturnValueOnce("post2 content");

      mockedMatter
        .mockReturnValueOnce({
          data: {},
          content: "Content 1",
          orig: "",
          language: "",
          matter: "",
          stringify: jest.fn(),
        } as matter.GrayMatterFile<string>)
        .mockReturnValueOnce({
          data: { tags: null },
          content: "Content 2",
          orig: "",
          language: "",
          matter: "",
          stringify: jest.fn(),
        } as matter.GrayMatterFile<string>);

      const result = await getAllUniqueTags();
      expect(result).toEqual([]);
    });
  });
});
