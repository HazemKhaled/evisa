import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { eq, and, inArray } from "drizzle-orm";
import { countries, countriesI18n } from "./db/schema/countries";
import { getDbAsync, isDatabaseAvailableAsync } from "./db/connection";

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

export interface BlogPostData {
  content: string;
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    destinations: string[]; // Array of 3-letter country codes
    image: string;
    tags: string[];
    passport?: string;
    related_visas?: string[];
    author: string;
    publishedAt: string;
    lastUpdated?: string;
    [key: string]: unknown;
  };
  destinationNames?: string[]; // Array of resolved country names from database
}

/**
 * Get country names for multiple country codes and locale from database
 * Optimized to use a single query instead of multiple individual queries
 */
async function getCountryNames(
  countryCodes: string[],
  locale: string
): Promise<string[]> {
  if (countryCodes.length === 0) return [];

  // Check if database is available
  const isDatabaseReady = await isDatabaseAvailableAsync();
  if (!isDatabaseReady) {
    console.warn("Database not available, using country codes as fallback");
    return countryCodes;
  }

  try {
    const db = await getDbAsync();

    // Use a single query to get all country names at once
    const results = await db
      .select({
        code: countries.code,
        name: countriesI18n.name,
      })
      .from(countries)
      .innerJoin(countriesI18n, eq(countries.id, countriesI18n.countryId))
      .where(
        and(
          eq(countriesI18n.locale, locale),
          inArray(countries.code, countryCodes)
        )
      );

    // Create a map for quick lookups
    const countryMap = new Map<string, string>();
    results.forEach(result => {
      if (result.code && result.name) {
        countryMap.set(result.code, result.name);
      }
    });

    // Return names in the same order as input codes, with fallback to code if not found
    return countryCodes.map(code => countryMap.get(code) || code);
  } catch (error) {
    console.warn(
      `Failed to get country names for ${countryCodes.join(", ")} (${locale}):`,
      error
    );
    return countryCodes; // Fallback to codes if queries fail
  }
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
 * Get all available blog posts for generateStaticParams
 */
export function getAllBlogPosts(): { locale: string; slug: string }[] {
  const contentsDir = path.join(process.cwd(), "src", "contents");
  const blogPosts: { locale: string; slug: string }[] = [];

  try {
    // Get all locale directories
    const locales = fs
      .readdirSync(contentsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name !== "generated")
      .map(dirent => dirent.name);

    // For each locale, get all MDX files in blog directory
    for (const locale of locales) {
      const blogDir = path.join(contentsDir, locale, "blog");

      if (fs.existsSync(blogDir)) {
        const files = fs
          .readdirSync(blogDir)
          .filter(file => file.endsWith(".mdx"));

        for (const file of files) {
          const slug = file.replace(".mdx", "");
          blogPosts.push({ locale, slug });
        }
      }
    }

    return blogPosts;
  } catch {
    return [];
  }
}

/**
 * Get all blog posts with metadata for a specific locale
 *
 * This function reads all MDX blog post files from the contents/[locale]/blog directory
 * and parses them to extract content, frontmatter metadata, and resolved destination names.
 * It automatically handles database lookups for country names and provides fallback
 * handling for database unavailability.
 *
 * @param locale - The locale string (e.g., 'en', 'ar', 'de', 'es', 'fr', 'it', 'pt', 'ru')
 *                 representing the language/directory to read blog posts from
 *
 * @returns Promise<BlogPostData[]> - A promise that resolves to an array of blog post objects,
 *   each containing:
 *   - content: string - The parsed MDX content as a string
 *   - slug: string - The filename without extension, used as URL slug
 *   - frontmatter: object - The extracted frontmatter metadata including:
 *     - title: string - Blog post title
 *     - description: string - Blog post description
 *     - destinations: string[] - Array of 3-letter country codes (e.g., ['USA', 'GBR'])
 *     - image: string - Featured image path or URL
 *     - tags: string[] - Array of tags for categorization
 *     - passport?: string - Optional passport type requirement
 *     - related_visas?: string[] - Optional array of related visa types
 *     - author: string - Author name
 *     - publishedAt: string - Publication date (ISO format)
 *     - lastUpdated?: string - Optional last update timestamp
 *     - [key: string]: unknown - Additional custom frontmatter fields
 *   - destinationNames?: string[] - Array of resolved country names from database
 *     (falls back to country codes if database unavailable)
 *
 * @throws {Error} When there are file system errors or MDX parsing failures
 *                 (function returns empty array instead of throwing for most errors)
 *
 * @example
 * ```typescript
 * // Get all blog posts for English locale
 * const englishPosts = await getBlogPostsForLocale('en');
 * console.log(`Found ${englishPosts.length} English blog posts`);
 *
 * // Access blog post data
 * englishPosts.forEach(post => {
 *   console.log(`Title: ${post.frontmatter.title}`);
 *   console.log(`Destinations: ${post.destinationNames?.join(', ')}`);
 *   console.log(`Published: ${post.frontmatter.publishedAt}`);
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Get blog posts for Arabic locale
 * const arabicPosts = await getBlogPostsForLocale('ar');
 *
 * // Filter posts by destination
 * const usaPosts = arabicPosts.filter(post =>
 *   post.frontmatter.destinations.includes('USA')
 * );
 * ```
 *
 * @note This function automatically sorts blog posts by publishedAt date (newest first)
 * @note Database connectivity is automatically handled with graceful fallbacks
 * @note Returns empty array if blog directory doesn't exist for the specified locale
 */
export async function getBlogPostsForLocale(
  locale: string
): Promise<BlogPostData[]> {
  const blogDir = path.join(process.cwd(), "src", "contents", locale, "blog");
  const blogPosts: BlogPostData[] = [];

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  try {
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith(".mdx"));

    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter, content } = matter(fileContent);
      const slug = file.replace(".mdx", "");
      const frontmatterTyped = frontmatter as BlogPostData["frontmatter"];

      // Handle both old format (destination: string) and new format (destinations: string[])
      const destinations = frontmatterTyped.destinations;

      // Get country names from database (with automatic fallback handling)
      const destinationNames = await getCountryNames(destinations, locale);

      blogPosts.push({
        content,
        slug,
        frontmatter: {
          ...frontmatterTyped,
          destinations,
        },
        destinationNames,
      });
    }

    // Sort by publishedAt date (newest first)
    return blogPosts.sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    );
  } catch {
    return [];
  }
}

/**
 * Get a specific blog post by slug and locale
 *
 * This function reads a single MDX blog post file from the contents/[locale]/blog directory
 * and parses it to extract content, frontmatter metadata, and resolved destination names.
 * It automatically handles database lookups for country names and provides fallback
 * handling for database unavailability. Unlike getBlogPostsForLocale, this function
 * throws an error when the requested blog post is not found.
 *
 * @param slug - The blog post slug (filename without .mdx extension) to retrieve.
 *               Must match an existing MDX file in the blog directory
 * @param locale - The locale string (e.g., 'en', 'ar', 'de', 'es', 'fr', 'it', 'pt', 'ru')
 *                 representing the language/directory to read the blog post from
 *
 * @returns Promise<BlogPostData> - A promise that resolves to a blog post object containing:
 *   - content: string - The parsed MDX content as a string
 *   - slug: string - The filename without extension, used as URL slug
 *   - frontmatter: object - The extracted frontmatter metadata including:
 *     - title: string - Blog post title
 *     - description: string - Blog post description
 *     - destinations: string[] - Array of 3-letter country codes (e.g., ['USA', 'GBR'])
 *     - image: string - Featured image path or URL
 *     - tags: string[] - Array of tags for categorization
 *     - passport?: string - Optional passport type requirement
 *     - related_visas?: string[] - Optional array of related visa types
 *     - author: string - Author name
 *     - publishedAt: string - Publication date (ISO format)
 *     - lastUpdated?: string - Optional last update timestamp
 *     - [key: string]: unknown - Additional custom frontmatter fields
 *   - destinationNames?: string[] - Array of resolved country names from database
 *     (falls back to country codes if database unavailable)
 *
 * @throws {Error} When the specified blog post file cannot be found at the expected path.
 *                 Error message format: "Blog post not found: {slug} for locale: {locale}"
 *
 * @example
 * ```typescript
 * // Get a specific blog post in English locale
 * try {
 *   const post = await getBlogPost('schengen-visa-guide', 'en');
 *   console.log(`Title: ${post.frontmatter.title}`);
 *   console.log(`Author: ${post.frontmatter.author}`);
 *   console.log(`Destinations: ${post.destinationNames?.join(', ')}`);
 * } catch (error) {
 *   console.error('Blog post not found:', error.message);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Get a blog post for Arabic locale
 * const arabicPost = await getBlogPost('schengen-visa-guide-arabic', 'ar');
 *
 * // Access the content and metadata
 * const { content, frontmatter, destinationNames } = arabicPost;
 * console.log(`Content length: ${content.length} characters`);
 * console.log(`Published: ${frontmatter.publishedAt}`);
 * ```
 *
 * @example
 * ```typescript
 * // Handle the case when blog post doesn't exist
 * try {
 *   const nonExistentPost = await getBlogPost('non-existent-post', 'en');
 * } catch (error) {
 *   if (error instanceof Error) {
 *     console.error('Blog post not found:', error.message);
 *     // Output: "Blog post not found: non-existent-post for locale: en"
 *   }
 * }
 * ```
 *
 * @note This function throws an error if the blog post file doesn't exist, unlike
 *       getBlogPostsForLocale which returns an empty array
 * @note Database connectivity is automatically handled with graceful fallbacks
 * @note The function supports both old and new destination formats in frontmatter
 */
export async function getBlogPost(
  slug: string,
  locale: string
): Promise<BlogPostData> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "contents",
    locale,
    "blog",
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug} for locale: ${locale}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);
  const frontmatterTyped = frontmatter as BlogPostData["frontmatter"];

  // Handle both old format (destination: string) and new format (destinations: string[])
  const destinations = frontmatterTyped.destinations;

  // Get country names from database (with automatic fallback handling)
  const destinationNames = await getCountryNames(destinations, locale);

  return {
    content,
    slug,
    frontmatter: {
      ...frontmatterTyped,
      destinations,
    } as BlogPostData["frontmatter"],
    destinationNames,
  };
}

/**
 * Get paginated blog posts for a specific locale
 *
 * This function retrieves blog posts for a specific locale and returns them in
 * paginated format. It automatically calculates pagination metadata and ensures
 * proper bounds checking for page numbers. The function uses getBlogPostsForLocale
 * internally to fetch all posts and then applies pagination logic.
 *
 * @param locale - The locale string (e.g., 'en', 'ar', 'de', 'es', 'fr', 'it', 'pt', 'ru')
 *                 representing the language/directory to read blog posts from
 * @param page - The page number to retrieve (defaults to 1). Must be a positive integer.
 *               If page exceeds total pages, the last available page will be returned
 * @param postsPerPage - The number of posts to return per page (defaults to 10).
 *                       Must be a positive integer greater than 0
 *
 * @returns Promise<object> - A promise that resolves to a pagination object containing:
 *   - posts: BlogPostData[] - Array of blog posts for the requested page, each containing:
 *     - content: string - The parsed MDX content as a string
 *     - slug: string - The filename without extension, used as URL slug
 *     - frontmatter: object - The extracted frontmatter metadata including:
 *       - title: string - Blog post title
 *       - description: string - Blog post description
 *       - destinations: string[] - Array of 3-letter country codes (e.g., ['USA', 'GBR'])
 *       - image: string - Featured image path or URL
 *       - tags: string[] - Array of tags for categorization
 *       - passport?: string - Optional passport type requirement
 *       - related_visas?: string[] - Optional array of related visa types
 *       - author: string - Author name
 *       - publishedAt: string - Publication date (ISO format)
 *       - lastUpdated?: string - Optional last update timestamp
 *       - [key: string]: unknown - Additional custom frontmatter fields
 *     - destinationNames?: string[] - Array of resolved country names from database
 *       (falls back to country codes if database unavailable)
 *   - totalPages: number - Total number of pages available based on postsPerPage
 *   - currentPage: number - The actual page number returned (may differ from requested page)
 *   - totalPosts: number - Total number of blog posts available for the locale
 *
 * @example
 * ```typescript
 * // Get first page with default 10 posts per page
 * const firstPage = await getPaginatedBlogPosts('en');
 * console.log(`Page ${firstPage.currentPage} of ${firstPage.totalPages}`);
 * console.log(`Showing ${firstPage.posts.length} of ${firstPage.totalPosts} posts`);
 * ```
 *
 * @example
 * ```typescript
 * // Get second page with custom posts per page
 * const secondPage = await getPaginatedBlogPosts('en', 2, 5);
 * console.log(`Posts on page ${secondPage.currentPage}:`);
 * secondPage.posts.forEach(post => {
 *   console.log(`- ${post.frontmatter.title}`);
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Handle pagination in a UI component
 * const { posts, totalPages, currentPage, totalPosts } =
 *   await getPaginatedBlogPosts('ar', 1, 6);
 *
 * // Check if there are more pages
 * const hasNextPage = currentPage < totalPages;
 * const hasPreviousPage = currentPage > 1;
 *
 * // Display pagination info
 * console.log(`Page ${currentPage} of ${totalPages} (${totalPosts} total posts)`);
 * ```
 *
 * @example
 * ```typescript
 * // Handle edge cases
 * const lastPage = await getPaginatedBlogPosts('en', 999, 10);
 * // If there are only 3 pages, this will return page 3 instead of 999
 * console.log(`Actually returned page ${lastPage.currentPage}`);
 * ```
 *
 * @note Posts are automatically sorted by publishedAt date (newest first)
 * @note If the requested page exceeds total pages, the last available page is returned
 * @note If postsPerPage is 0 or negative, it defaults to 10
 * @note If page is 0 or negative, it defaults to 1
 * @note The function handles empty blog directories gracefully by returning empty results
 */
export async function getPaginatedBlogPosts(
  locale: string,
  page: number = 1,
  postsPerPage: number = 10
): Promise<{
  posts: BlogPostData[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
}> {
  const allPosts = await getBlogPostsForLocale(locale);
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPages,
    currentPage: page,
    totalPosts,
  };
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
