/**
 * Core Blog Processing Module
 *
 * This module handles MDX file processing, validation, and filesystem operations
 * for blog posts. It's used primarily at build time to generate static data.
 *
 * For runtime blog operations, use @/lib/services/blog-service.ts instead.
 */

import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { filterAndPaginate, createBlogFilter } from "../utils/pagination";
import { validateBlogPost } from "../blog-validation";
import { type BlogPostData } from "../types/blog";

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
      const validationResult = validateBlogPost(frontmatter, content, slug);
      if (!validationResult.isValid) {
        continue;
      }

      blogPosts.push({
        content,
        slug,
        frontmatter: frontmatter as BlogPostData["frontmatter"],
        destinationNames: [],
      });
    }

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
 * @returns Promise<string[]> Sorted array of unique tags (normalized to lowercase)
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
 * @param locale - The locale string (e.g., 'en', 'ar', 'de')
 * @returns Promise<BlogPostData[]> Sorted array of blog post data (newest first)
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
 * @param slug - The blog post slug (filename without .mdx extension)
 * @param locale - The locale string (e.g., 'en', 'ar', 'de')
 * @returns Promise<BlogPostData> - Blog post data
 * @throws {Error} When the specified blog post file cannot be found
 */
export async function getBlogPost(
  slug: string,
  locale: string
): Promise<BlogPostData> {
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
        return {
          content,
          slug,
          frontmatter: frontmatter as BlogPostData["frontmatter"],
          destinationNames: [],
        };
      }
    }

    throw new Error(`Blog post not found: ${slug} for locale: ${locale}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);
  return {
    content,
    slug,
    frontmatter: frontmatter as BlogPostData["frontmatter"],
    destinationNames: [],
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
