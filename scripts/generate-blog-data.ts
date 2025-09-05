#!/usr/bin/env tsx
import * as fs from "fs";
import * as path from "path";
import {
  getAllBlogPosts,
  getAllUniqueTags,
  getBlogPostsForLocale,
  type BlogPostData,
} from "../src/lib/blog";
import { languages } from "../src/app/i18n/settings";

/**
 * Generate static blog data for runtime use
 * This script converts dynamic blog data to static data for better performance
 * and to avoid file system access during runtime in production.
 */
async function generateBlogData(): Promise<void> {
  console.log("🔄 Generating static blog data...");

  const blogData: Record<string, BlogPostData[]> = {};

  // Generate blog data for each language using the shared utilities
  for (const locale of languages) {
    const posts = await getBlogPostsForLocale(locale);
    blogData[locale] = posts;
    console.log(
      `✅ Generated ${posts.length} blog posts for locale: ${locale}`
    );
  }

  // Get all unique tags using the shared utility
  const allTags = await getAllUniqueTags();

  // Get all blog posts for generateStaticParams using the shared utility
  const allBlogPosts = getAllBlogPosts();

  // Generate the TypeScript file
  const outputPath = path.join(
    process.cwd(),
    "src",
    "lib",
    "generated-blog-data.ts"
  );

  const tsContent = `// Auto-generated file - Do not edit manually
// Generated at: ${new Date().toISOString()}

import { type BlogPostData } from "./blog";

// Pre-generated blog data for each locale
export const GENERATED_BLOG_DATA: Record<string, BlogPostData[]> = ${JSON.stringify(blogData, null, 2)};

// This function will be used to get blog posts without file system access
export function getGeneratedBlogPostsForLocale(locale: string): BlogPostData[] {
  return GENERATED_BLOG_DATA[locale] || [];
}

// Export all unique tags for static generation
export const GENERATED_ALL_TAGS: string[] = ${JSON.stringify(allTags, null, 2)};

// Export all blog posts for generateStaticParams
export const GENERATED_ALL_BLOG_POSTS: { locale: string; slug: string }[] = ${JSON.stringify(allBlogPosts, null, 2)};

// Function to get all unique tags without file system access
export function getGeneratedAllUniqueTags(): string[] {
  return GENERATED_ALL_TAGS;
}

// Function to get all blog posts without file system access
export function getAllBlogPosts(): { locale: string; slug: string }[] {
  return GENERATED_ALL_BLOG_POSTS;
}
`;

  fs.writeFileSync(outputPath, tsContent, "utf8");
  console.log(`📝 Generated blog data file: ${outputPath}`);
  console.log(`📊 Total tags: ${allTags.length}`);
  console.log(
    `📊 Total posts across all locales: ${Object.values(blogData).reduce(
      (sum, posts) => sum + posts.length,
      0
    )}`
  );
  console.log("✅ Blog data generation complete!");
}

// Run the script
if (
  require.main === module ||
  import.meta.url === `file://${process.argv[1]}`
) {
  generateBlogData().catch(console.error);
}

export default generateBlogData;
