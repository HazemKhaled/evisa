/**
 * Blog helper function tests
 *
 * Comprehensive test suite for all blog-related helper functions including
 * file system operations, content parsing, and database integration.
 */

import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import {
  getAllBlogPosts,
  getBlogPostsForLocale,
  getBlogPost,
  getAllUniqueTags,
  getPaginatedBlogPosts,
} from "../blog";
import { isDatabaseAvailableAsync } from "../db/connection";

// Mock dependencies
jest.mock("fs", () => ({
  readdirSync: jest.fn(),
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}));
jest.mock("path");
jest.mock("gray-matter");
jest.mock("../db/connection");

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedPath = path as jest.Mocked<typeof path>;
const mockedMatter = matter as jest.MockedFunction<typeof matter>;
const mockedIsDatabaseAvailableAsync =
  isDatabaseAvailableAsync as jest.MockedFunction<
    typeof isDatabaseAvailableAsync
  >;

// Create typed mock functions to avoid TypeScript issues
// Using jest.Mock for fs.readdirSync to handle its overloaded signatures flexibly
const mockedReaddirSync = mockedFs.readdirSync as jest.Mock;

// Helper function to create properly typed mock Dirent objects
function createMockDirent(name: string, isDirectory = false): fs.Dirent {
  return {
    name,
    isDirectory: () => isDirectory,
    isFile: () => !isDirectory,
    isBlockDevice: () => false,
    isCharacterDevice: () => false,
    isFIFO: () => false,
    isSocket: () => false,
    isSymbolicLink: () => false,
    path: "",
    parentPath: "",
  } as fs.Dirent;
}

describe("blog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup default path mocks
    mockedPath.join.mockImplementation((...args) => args.join("/"));
    (process as unknown as { cwd: jest.MockedFunction<() => string> }).cwd =
      jest.fn().mockReturnValue("/test-cwd");
    // Mock database as unavailable by default
    mockedIsDatabaseAvailableAsync.mockResolvedValue(false);
  });

  describe("getAllBlogPosts", () => {
    it("should return all blog posts from all locales", () => {
      // Mock file system structure - first call uses withFileTypes: true
      mockedReaddirSync
        .mockReturnValueOnce([
          createMockDirent("en", true),
          createMockDirent("es", true),
          createMockDirent("generated", true), // Should be filtered out
        ] as fs.Dirent[])
        .mockReturnValueOnce([
          "post1.mdx",
          "post2.mdx",
          "readme.txt",
        ] as string[]) // en blog files (string array)
        .mockReturnValueOnce(["post3.mdx"] as string[]); // es blog files (string array)

      mockedFs.existsSync.mockReturnValue(true);

      const result = getAllBlogPosts();

      expect(result).toEqual([
        { locale: "en", slug: "post1" },
        { locale: "en", slug: "post2" },
        { locale: "es", slug: "post3" },
      ]);
    });

    it("should handle missing blog directories gracefully", () => {
      mockedReaddirSync.mockReturnValueOnce([createMockDirent("en", true)]);
      mockedFs.existsSync.mockReturnValue(false);

      const result = getAllBlogPosts();

      expect(result).toEqual([]);
    });

    it("should handle file system errors gracefully", () => {
      mockedReaddirSync.mockImplementation(() => {
        throw new Error("File system error");
      });

      const result = getAllBlogPosts();

      expect(result).toEqual([]);
    });
  });

  describe("getBlogPostsForLocale", () => {
    it("should return blog posts for a specific locale", async () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedReaddirSync.mockReturnValue(["post1.mdx", "post2.mdx"]);

      const post1Content = `---
title: Post 1
description: Description 1
destinations: ["USA"]
image: "/image1.jpg"
tags: ["travel"]
author: Author 1
publishedAt: "2024-01-01"
---
Content 1`;

      const post2Content = `---
title: Post 2
description: Description 2
destinations: ["GBR"]
image: "/image2.jpg"
tags: ["visa"]
author: Author 2
publishedAt: "2024-01-02"
---
Content 2`;

      mockedFs.readFileSync
        .mockReturnValueOnce(post1Content)
        .mockReturnValueOnce(post2Content);

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
        } as unknown as matter.GrayMatterFile<string>)
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
        } as unknown as matter.GrayMatterFile<string>);

      const result = await getBlogPostsForLocale("en");

      expect(result).toHaveLength(2);
      expect(result[0].frontmatter.publishedAt).toBe("2024-01-02"); // Should be sorted newest first
      expect(result[1].frontmatter.publishedAt).toBe("2024-01-01");
      expect(result[0].slug).toBe("post2"); // post2 has newer date, so it's first
      expect(result[1].slug).toBe("post1"); // post1 has older date, so it's second
      expect(result[0].destinationNames).toEqual(["GBR"]); // Database unavailable, fallback to country codes
    });

    it("should return empty array for non-existent locale", async () => {
      mockedFs.existsSync.mockReturnValue(false);

      const result = await getBlogPostsForLocale("nonexistent");

      expect(result).toEqual([]);
    });

    it("should handle file system errors gracefully", async () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedReaddirSync.mockImplementation(() => {
        throw new Error("File system error");
      });

      const result = await getBlogPostsForLocale("en");

      expect(result).toEqual([]);
    });
  });

  describe("getBlogPost", () => {
    it("should return a specific blog post", async () => {
      const postContent = `---
title: Test Post
description: Test Description
destinations: ["USA", "GBR"]
image: "/test.jpg"
tags: ["travel", "visa"]
author: Test Author
publishedAt: "2024-01-01"
---
Test content`;

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue(postContent);
      mockedMatter.mockReturnValue({
        data: {
          title: "Test Post",
          description: "Test Description",
          destinations: ["USA", "GBR"],
          image: "/test.jpg",
          tags: ["travel", "visa"],
          author: "Test Author",
          publishedAt: "2024-01-01",
        },
        content: "Test content",
      } as unknown as matter.GrayMatterFile<string>);

      const result = await getBlogPost("test-post", "en");

      expect(result).toEqual({
        content: "Test content",
        slug: "test-post",
        frontmatter: {
          title: "Test Post",
          description: "Test Description",
          destinations: ["USA", "GBR"],
          image: "/test.jpg",
          tags: ["travel", "visa"],
          author: "Test Author",
          publishedAt: "2024-01-01",
        },
        destinationNames: ["USA", "GBR"], // Database unavailable, fallback to destination codes
      });
    });

    it("should throw error for non-existent blog post", async () => {
      mockedFs.existsSync.mockReturnValue(false);

      await expect(getBlogPost("nonexistent", "en")).rejects.toThrow(
        "Blog post not found: nonexistent for locale: en"
      );
    });
  });

  describe("getAllUniqueTags", () => {
    it("should return unique tags from all blog posts", async () => {
      // Mock the locale directory scan - first call in getAllUniqueTags
      mockedReaddirSync.mockReturnValueOnce([
        createMockDirent("en", true),
        createMockDirent("es", true),
      ]);

      // Mock getBlogPostsForLocale calls (2 calls - one for each locale)
      mockedFs.existsSync.mockReturnValue(true);

      // First locale (en) - getBlogPostsForLocale call
      mockedReaddirSync.mockReturnValueOnce(["post1.mdx"]);
      mockedFs.readFileSync.mockReturnValueOnce(`---
title: Post 1
tags: ["Travel", "VISA"]
destinations: ["USA"]
author: Author
publishedAt: "2024-01-01"
description: Description
image: /image.jpg
---
Content`);
      mockedMatter.mockReturnValueOnce({
        data: {
          title: "Post 1",
          tags: ["Travel", "VISA"],
          destinations: ["USA"],
          author: "Author",
          publishedAt: "2024-01-01",
          description: "Description",
          image: "/image.jpg",
        },
        content: "Content",
      } as unknown as matter.GrayMatterFile<string>);

      // Second locale (es) - getBlogPostsForLocale call
      mockedReaddirSync.mockReturnValueOnce(["post2.mdx"]);
      mockedFs.readFileSync.mockReturnValueOnce(`---
title: Post 2
tags: ["travel", "food"]
destinations: ["ESP"]
author: Author
publishedAt: "2024-01-02"
description: Description 2
image: /image2.jpg
---
Content`);
      mockedMatter.mockReturnValueOnce({
        data: {
          title: "Post 2",
          tags: ["travel", "food"],
          destinations: ["ESP"],
          author: "Author",
          publishedAt: "2024-01-02",
          description: "Description 2",
          image: "/image2.jpg",
        },
        content: "Content",
      } as unknown as matter.GrayMatterFile<string>);

      const result = await getAllUniqueTags();

      expect(result).toEqual(["food", "travel", "visa"]); // Sorted and lowercase
    });

    it("should filter out empty and whitespace tags", async () => {
      mockedReaddirSync.mockReturnValueOnce([createMockDirent("en", true)]);

      mockedFs.existsSync.mockReturnValue(true);
      // getBlogPostsForLocale call for 'en' locale
      mockedReaddirSync.mockReturnValueOnce(["post1.mdx"]);
      mockedFs.readFileSync.mockReturnValueOnce(`---
title: Post 1
tags: ["travel", "visa"]
destinations: ["USA"]
author: Author
publishedAt: "2024-01-01"
description: Description
image: /image.jpg
---
Content`);
      mockedMatter.mockReturnValueOnce({
        data: {
          title: "Post 1",
          tags: ["travel", "visa"],
          destinations: ["USA"],
          author: "Author",
          publishedAt: "2024-01-01",
          description: "Description",
          image: "/image.jpg",
        },
        content: "Content",
      } as unknown as matter.GrayMatterFile<string>);

      const result = await getAllUniqueTags();

      expect(result).toEqual(["travel", "visa"]);
    });

    it("should handle empty tags gracefully", async () => {
      mockedReaddirSync.mockReturnValueOnce([createMockDirent("en", true)]);

      mockedFs.existsSync.mockReturnValue(true);
      // getBlogPostsForLocale call for 'en' locale
      mockedReaddirSync.mockReturnValueOnce(["post1.mdx"]);
      mockedFs.readFileSync.mockReturnValueOnce(`---
title: Post 1
destinations: ["USA"]
author: Author
publishedAt: "2024-01-01"
description: Description
image: /image.jpg
---
Content`);
      mockedMatter.mockReturnValueOnce({
        data: {
          title: "Post 1",
          destinations: ["USA"],
          author: "Author",
          publishedAt: "2024-01-01",
          description: "Description",
          image: "/image.jpg",
        },
        content: "Content",
      } as unknown as matter.GrayMatterFile<string>);

      const result = await getAllUniqueTags();

      expect(result).toEqual([]);
    });
  });

  describe("getPaginatedBlogPosts", () => {
    beforeEach(() => {
      // Mock a larger set of blog posts for pagination testing
      mockedFs.existsSync.mockReturnValue(true);
      mockedReaddirSync.mockReturnValue(
        Array.from({ length: 25 }, (_, i) => `post-${i}.mdx`)
      );

      // Mock file reads and matter parsing for all 25 posts
      for (let i = 0; i < 25; i++) {
        const publishedAt = `2024-01-${String(26 - i).padStart(2, "0")}`; // Reverse chronological
        mockedFs.readFileSync.mockReturnValueOnce(`---
title: Post ${i}
description: Description ${i}
destinations: ["USA"]
image: "/image${i}.jpg"
tags: ["tag${i}"]
author: Author ${i}
publishedAt: "${publishedAt}"
---
Content ${i}`);

        mockedMatter.mockReturnValueOnce({
          data: {
            title: `Post ${i}`,
            description: `Description ${i}`,
            destinations: ["USA"],
            image: `/image${i}.jpg`,
            tags: [`tag${i}`],
            author: `Author ${i}`,
            publishedAt,
          },
          content: `Content ${i}`,
        } as unknown as matter.GrayMatterFile<string>);
      }
    });

    it("should return paginated results with correct metadata", async () => {
      const result = await getPaginatedBlogPosts("en", {
        page: 1,
        postsPerPage: 10,
      });

      expect(result.posts).toHaveLength(10);
      expect(result.pagination.totalPages).toBe(3); // 25 posts / 10 per page = 3 pages
      expect(result.pagination.currentPage).toBe(1);
      expect(result.totalPosts).toBe(25);
    });

    it("should return correct posts for page 2", async () => {
      const result = await getPaginatedBlogPosts("en", {
        page: 2,
        postsPerPage: 10,
      });

      expect(result.posts).toHaveLength(10);
      expect(result.pagination.currentPage).toBe(2);
    });

    it("should return remaining posts on last page", async () => {
      const result = await getPaginatedBlogPosts("en", {
        page: 3,
        postsPerPage: 10,
      });

      expect(result.posts).toHaveLength(5); // 25 - (2 * 10) = 5 remaining posts
      expect(result.pagination.currentPage).toBe(3);
    });

    it("should handle default parameters", async () => {
      const result = await getPaginatedBlogPosts("en");

      expect(result.posts).toHaveLength(10); // Default 10 per page
      expect(result.pagination.currentPage).toBe(1); // Default page 1
    });

    it("should handle empty blog directory", async () => {
      jest.clearAllMocks();
      mockedFs.existsSync.mockReturnValue(false);

      const result = await getPaginatedBlogPosts("en", {
        page: 1,
        postsPerPage: 10,
      });

      expect(result.posts).toEqual([]);
      expect(result.pagination.totalPages).toBe(1);
      expect(result.totalPosts).toBe(0);
    });
  });

  describe("error handling", () => {
    beforeEach(() => {
      // Clear all mocks to prevent interference from other describe blocks
      jest.clearAllMocks();
      // Setup default mocks
      mockedPath.join.mockImplementation((...args) => args.join("/"));
      (process as unknown as { cwd: jest.MockedFunction<() => string> }).cwd =
        jest.fn().mockReturnValue("/test-cwd");
      mockedIsDatabaseAvailableAsync.mockResolvedValue(false);
    });

    it("should handle malformed frontmatter gracefully in getBlogPostsForLocale", async () => {
      // Reset any previous mock implementations
      mockedReaddirSync.mockReset();
      mockedFs.readFileSync.mockReset();
      mockedMatter.mockReset();

      mockedFs.existsSync.mockReturnValue(true);
      mockedReaddirSync.mockReturnValue(["post1.mdx"]);
      mockedFs.readFileSync.mockReturnValue("malformed content");
      mockedMatter.mockImplementation(() => {
        throw new Error("Invalid frontmatter");
      });

      const result = await getBlogPostsForLocale("en");

      expect(result).toEqual([]);
    });

    it("should handle posts without required fields", async () => {
      // Reset any previous mock implementations
      mockedFs.existsSync.mockReset();
      mockedReaddirSync.mockReset();
      mockedFs.readFileSync.mockReset();
      mockedMatter.mockReset();

      mockedFs.existsSync.mockReturnValue(true);
      mockedReaddirSync.mockReturnValue(["post1.mdx"]);
      mockedFs.readFileSync.mockReturnValue(`---
title: Test
description: Test description
destinations: ["USA"]
image: /test.jpg
tags: ["test"]
author: Test Author
publishedAt: 2024-01-01
---
Content`);
      mockedMatter.mockReturnValue({
        data: {
          title: "Test",
          description: "Test description",
          destinations: ["USA"],
          image: "/test.jpg",
          tags: ["test"],
          author: "Test Author",
          publishedAt: "2024-01-01",
        },
        content: "Content",
      } as unknown as matter.GrayMatterFile<string>);

      const result = await getBlogPostsForLocale("en");

      expect(result).toHaveLength(1);
      expect(result[0].frontmatter.title).toBe("Test");
    });
  });
});
