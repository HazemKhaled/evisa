import * as fs from "fs";
import * as path from "path";
import { getAllStaticPages, getMDXPage } from "../mdx";

// Mock fs module
jest.mock("fs");
const mockedFs = fs as jest.Mocked<typeof fs>;

// Mock path module
jest.mock("path");
const mockedPath = path as jest.Mocked<typeof path>;

describe("MDX utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllStaticPages", () => {
    it("should return empty array when contents directory does not exist", () => {
      mockedFs.readdirSync.mockImplementation(() => {
        throw new Error("Directory not found");
      });

      const result = getAllStaticPages();
      expect(result).toEqual([]);
    });

    it("should return static pages for all locales", () => {
      const mockDirents = [
        { isDirectory: () => true, name: "en" },
        { isDirectory: () => true, name: "ar" },
        { isDirectory: () => false, name: "file.txt" },
        { isDirectory: () => true, name: "generated" }, // Should be filtered out
      ];

      mockedFs.readdirSync
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValueOnce(mockDirents as any)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValueOnce(["about.mdx", "contact.mdx"] as any)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .mockReturnValueOnce(["about.mdx", "privacy.mdx"] as any);

      mockedFs.existsSync.mockReturnValue(true);
      mockedPath.join.mockImplementation((...args) => args.join("/"));

      const result = getAllStaticPages();

      expect(result).toEqual([
        { locale: "en", slug: "about" },
        { locale: "en", slug: "contact" },
        { locale: "ar", slug: "about" },
        { locale: "ar", slug: "privacy" },
      ]);
    });

    it("should skip directories that don't have pages subdirectory", () => {
      const mockDirents = [
        { isDirectory: () => true, name: "en" },
        { isDirectory: () => true, name: "ar" },
      ];

      mockedFs.readdirSync.mockReturnValueOnce(mockDirents as any);
      mockedFs.existsSync
        .mockReturnValueOnce(true) // en/pages exists
        .mockReturnValueOnce(false); // ar/pages doesn't exist

      mockedFs.readdirSync.mockReturnValueOnce(["about.mdx"]);
      mockedPath.join.mockImplementation((...args) => args.join("/"));

      const result = getAllStaticPages();

      expect(result).toEqual([{ locale: "en", slug: "about" }]);
    });

    it("should filter out non-MDX files", () => {
      const mockDirents = [{ isDirectory: () => true, name: "en" }];

      mockedFs.readdirSync
        .mockReturnValueOnce(mockDirents as any)
        .mockReturnValueOnce([
          "about.mdx",
          "contact.txt",
          "privacy.mdx",
          "readme.md",
        ]);

      mockedFs.existsSync.mockReturnValue(true);
      mockedPath.join.mockImplementation((...args) => args.join("/"));

      const result = getAllStaticPages();

      expect(result).toEqual([
        { locale: "en", slug: "about" },
        { locale: "en", slug: "privacy" },
      ]);
    });
  });

  describe("getMDXPage", () => {
    const mockFrontmatter = {
      title: "Test Page",
      description: "Test description",
      keywords: "test, keywords",
      author: "Test Author",
      type: "page",
      lastUpdated: "2024-01-01",
    };

    beforeEach(() => {
      mockedPath.join.mockImplementation((...args) => args.join("/"));
    });

    it("should read MDX file with locale", async () => {
      const mockFileContent = `---
title: Test Page
description: Test description
keywords: test, keywords
author: Test Author
type: page
lastUpdated: 2024-01-01
---

# Test Content

This is test content.`;

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue(mockFileContent);

      const result = await getMDXPage("about", "en");

      expect(result.content).toBe("\n# Test Content\n\nThis is test content.");
      expect(result.frontmatter).toEqual({
        ...mockFrontmatter,
        lastUpdated: new Date("2024-01-01"),
      });

      expect(mockedPath.join).toHaveBeenCalledWith(
        expect.any(String),
        "src",
        "contents",
        "en",
        "pages",
        "about"
      );
    });

    it("should read MDX file without locale (legacy path)", async () => {
      const mockFileContent = `---
title: Test Page
description: Test description
---

# Test Content

This is test content.`;

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue(mockFileContent);

      const result = await getMDXPage("about");

      expect(result.content).toBe("\n# Test Content\n\nThis is test content.");
      expect(result.frontmatter).toEqual({
        title: "Test Page",
        description: "Test description",
      });

      expect(mockedPath.join).toHaveBeenCalledWith(
        expect.any(String),
        "src",
        "contents",
        "pages",
        "about"
      );
    });

    it("should throw error when file does not exist", async () => {
      mockedFs.existsSync.mockReturnValue(false);

      await expect(getMDXPage("nonexistent", "en")).rejects.toThrow(
        "MDX file not found: nonexistent for locale: en"
      );
    });

    it("should throw error when file does not exist (no locale)", async () => {
      mockedFs.existsSync.mockReturnValue(false);

      await expect(getMDXPage("nonexistent")).rejects.toThrow(
        "MDX file not found: nonexistent for locale: default"
      );
    });

    it("should handle empty frontmatter", async () => {
      const mockFileContent = `---
---

# Test Content

This is test content.`;

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue(mockFileContent);

      const result = await getMDXPage("about", "en");

      expect(result.content).toBe("\n# Test Content\n\nThis is test content.");
      expect(result.frontmatter).toEqual({});
    });

    it("should handle frontmatter with additional custom fields", async () => {
      const mockFileContent = `---
title: Test Page
description: Test description
customField: custom value
anotherField: 123
---

# Test Content

This is test content.`;

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue(mockFileContent);

      const result = await getMDXPage("about", "en");

      expect(result.frontmatter).toEqual({
        title: "Test Page",
        description: "Test description",
        customField: "custom value",
        anotherField: 123,
      });
    });
  });
});
