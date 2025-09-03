import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { filterAndPaginate, createBlogFilter } from "./utils/pagination";

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
 * Helper function to read blog posts from a specific directory
 */
function getBlogPostsFromDirectory(blogDir: string): BlogPostData[] {
  const blogPosts: BlogPostData[] = [];

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

      // Temporarily disable country names lookup
      const destinationNames = destinations || [];

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
 * Get all unique tags from blog posts across all locales
 *
 * This function scans through all blog posts in all locales to extract and return
 * a comprehensive list of unique tags. This is useful for generating static routes
 * for tag-based filtering pages and for creating tag clouds or navigation.
 *
 * @returns Promise<string[]> - A promise that resolves to an array of unique tag strings,
 *   sorted alphabetically (case-insensitive). Tags are normalized to lowercase for
 *   consistency and deduplication.
 *
 * @example
 * ```typescript
 * // Get all unique tags for generating static routes
 * const allTags = await getAllUniqueTags();
 * console.log(`Found ${allTags.length} unique tags: ${allTags.join(', ')}`);
 *
 * // Use in generateStaticParams
 * export function generateStaticParams() {
 *   const tags = getAllUniqueTags();
 *   return tags.map(tag => ({ tag }));
 * }
 * ```
 *
 * @note Tags are normalized to lowercase and deduplicated
 * @note Returns empty array if no blog posts are found or if there are file system errors
 * @note The function reads from all locale directories automatically
 */
export async function getAllUniqueTags(): Promise<string[]> {
  const contentsDir = path.join(process.cwd(), "src", "contents");
  const allTags = new Set<string>();

  try {
    // Get all locale directories
    const locales = fs
      .readdirSync(contentsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name !== "generated")
      .map(dirent => dirent.name);

    // For each locale, get all blog posts and extract tags
    for (const locale of locales) {
      const blogPosts = await getBlogPostsForLocale(locale);

      for (const post of blogPosts) {
        if (post.frontmatter.tags) {
          post.frontmatter.tags.forEach(tag => {
            if (tag && tag.trim()) {
              allTags.add(tag.toLowerCase().trim());
            }
          });
        }
      }
    }

    // Convert to array and sort alphabetically
    return Array.from(allTags).sort();
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
  const projectRoot = process.cwd();
  const blogDir = path.join(projectRoot, "src", "contents", locale, "blog");

  if (!fs.existsSync(blogDir)) {
    // Try alternative paths for preview environment
    const altPaths = [
      path.join(projectRoot, "..", "src", "contents", locale, "blog"),
      path.join(projectRoot, "..", "..", "src", "contents", locale, "blog"),
      path.join(
        projectRoot,
        "..",
        "..",
        "..",
        "src",
        "contents",
        locale,
        "blog"
      ),
    ];

    for (const altPath of altPaths) {
      if (fs.existsSync(altPath)) {
        return getBlogPostsFromDirectory(altPath);
      }
    }

    return [];
  }

  return getBlogPostsFromDirectory(blogDir);
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
  // Use a more robust path resolution that works in both build and preview
  const projectRoot = process.cwd();
  const filePath = path.join(
    projectRoot,
    "src",
    "contents",
    locale,
    "blog",
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    // Try alternative paths for preview environment
    const altPaths = [
      path.join(
        projectRoot,
        "..",
        "src",
        "contents",
        locale,
        "blog",
        `${slug}.mdx`
      ),
      path.join(
        projectRoot,
        "..",
        "..",
        "src",
        "contents",
        locale,
        "blog",
        `${slug}.mdx`
      ),
      path.join(
        projectRoot,
        "..",
        "..",
        "..",
        "src",
        "contents",
        locale,
        "blog",
        `${slug}.mdx`
      ),
    ];

    for (const altPath of altPaths) {
      if (fs.existsSync(altPath)) {
        const fileContent = fs.readFileSync(altPath, "utf8");
        const { data: frontmatter, content } = matter(fileContent);
        const frontmatterTyped = frontmatter as BlogPostData["frontmatter"];

        // Handle both old format (destination: string) and new format (destinations: string[])
        const destinations = frontmatterTyped.destinations;

        // Temporarily disable country names lookup
        const destinationNames = destinations || [];

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
    }

    throw new Error(`Blog post not found: ${slug} for locale: ${locale}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);
  const frontmatterTyped = frontmatter as BlogPostData["frontmatter"];

  // Handle both old format (destination: string) and new format (destinations: string[])
  const destinations = frontmatterTyped.destinations;

  // Temporarily disable country names lookup
  const destinationNames = destinations || [];

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
 * Get paginated blog posts with filtering support
 * Uses the new pagination utilities for better testability
 */
export async function getPaginatedBlogPosts(
  locale: string,
  options: {
    page?: number;
    postsPerPage?: number;
    tag?: string;
    destination?: string;
  } = {}
): Promise<{
  posts: BlogPostData[];
  pagination: ReturnType<typeof filterAndPaginate>["pagination"];
  totalPosts: number;
}> {
  const { page = 1, postsPerPage = 10, tag, destination } = options;
  const allPosts = await getBlogPostsForLocale(locale);

  const filter = createBlogFilter({ tag, destination });
  const result = filterAndPaginate(allPosts, filter, page, postsPerPage);

  return {
    posts: result.items,
    pagination: result.pagination,
    totalPosts: result.totalFilteredItems,
  };
}
