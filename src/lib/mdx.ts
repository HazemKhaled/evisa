import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";

export interface MDXPageData {
  content: string;
  frontmatter: {
    title: string;
    description: string;
    keywords?: string;
    author?: string;
    type?: string;
    lastUpdated?: string;
    [key: string]: unknown;
  };
}

/**
 * Get all available static pages for generateStaticParams
 */
export function getAllStaticPages(): { locale: string; slug: string }[] {
  const contentsDir = path.join(process.cwd(), "src", "contents");
  const staticPages: { locale: string; slug: string }[] = [];

  try {
    // Get all locale directories
    const locales = fs
      .readdirSync(contentsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name !== "generated")
      .map(dirent => dirent.name);

    // For each locale, get all MDX files in pages directory
    for (const locale of locales) {
      const pagesDir = path.join(contentsDir, locale, "pages");

      if (fs.existsSync(pagesDir)) {
        const files = fs
          .readdirSync(pagesDir)
          .filter(file => file.endsWith(".mdx"));

        for (const file of files) {
          const slug = file.replace(".mdx", "");
          staticPages.push({ locale, slug });
        }
      }
    }

    return staticPages;
  } catch {
    return [];
  }
}

/**
 * Read and parse an MDX file from the contents/[locale]/pages directory
 *
 * This function reads MDX files from the static pages directory and parses them
 * to extract both the content and frontmatter metadata. It supports both
 * locale-specific paths and fallback to the legacy structure.
 *
 * @param fileName - The name of the MDX file (without extension) to read
 * @param locale - Optional locale string to read from locale-specific directory.
 *                 If not provided, falls back to the legacy path structure
 *
 * @returns Promise<MDXPageData> - A promise that resolves to an object containing:
 *   - content: string - The parsed MDX content as a string
 *   - frontmatter: object - The extracted frontmatter metadata including:
 *     - title: string - Page title
 *     - description: string - Page description
 *     - keywords?: string - Optional keywords for SEO
 *     - author?: string - Optional author information
 *     - type?: string - Optional content type
 *     - lastUpdated?: string - Optional last update timestamp
 *     - [key: string]: unknown - Additional custom frontmatter fields
 *
 * @throws {Error} When the specified MDX file cannot be found at the expected path
 *
 * @example
 * ```typescript
 * // Get a page in English locale
 * const pageData = await getMDXPage('about-us', 'en');
 * console.log(pageData.frontmatter.title); // "About Us"
 *
 * // Get a page using legacy path (no locale)
 * const legacyPage = await getMDXPage('privacy-policy');
 * console.log(legacyPage.content); // MDX content as string
 * ```
 *
 * @example
 * ```typescript
 * try {
 *   const page = await getMDXPage('non-existent-page', 'en');
 * } catch (error) {
 *   console.error('Page not found:', error.message);
 *   // Error: MDX file not found: non-existent-page for locale: en
 * }
 * ```
 */
export async function getMDXPage(
  fileName: string,
  locale?: string
): Promise<MDXPageData> {
  // If locale is provided, use locale-specific path, otherwise fallback to old structure
  const filePath = locale
    ? path.join(process.cwd(), "src", "contents", locale, "pages", fileName)
    : path.join(process.cwd(), "src", "contents", "pages", fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `MDX file not found: ${fileName} for locale: ${locale || "default"}`
    );
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);

  return {
    content,
    frontmatter: frontmatter as MDXPageData["frontmatter"],
  };
}
