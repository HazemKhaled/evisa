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
