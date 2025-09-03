#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Read languages from the settings file directly
function getLanguages() {
  try {
    const settingsPath = path.join(
      process.cwd(),
      "src",
      "app",
      "i18n",
      "settings.ts"
    );
    const settingsContent = fs.readFileSync(settingsPath, "utf8");

    // Extract the languagesObj array from the TypeScript file
    const languagesMatch = settingsContent.match(
      /export const languagesObj = \[([\s\S]*?)\];/
    );
    if (languagesMatch) {
      const languagesArray = languagesMatch[1];
      // Extract code values using regex
      const codeMatches = languagesArray.match(/code: "([^"]+)"/g);
      if (codeMatches) {
        return codeMatches.map(match => match.match(/code: "([^"]+)"/)[1]);
      }
    }

    // Fallback to hardcoded languages if parsing fails
    console.warn("Could not parse languages from settings.ts, using fallback");
    return ["ar", "de", "en", "es", "fr", "it", "pt", "ru"];
  } catch (error) {
    console.warn("Error reading settings file:", error.message);
    return ["ar", "de", "en", "es", "fr", "it", "pt", "ru"];
  }
}

const languages = getLanguages();

// Generate static blog data for runtime use
async function generateBlogData() {
  console.log("🔄 Generating static blog data...");

  const contentsDir = path.join(process.cwd(), "src", "contents");
  const blogData = {};
  const allTags = new Set();

  for (const locale of languages) {
    const blogDir = path.join(contentsDir, locale, "blog");
    const posts = [];

    if (fs.existsSync(blogDir)) {
      const files = fs
        .readdirSync(blogDir)
        .filter(file => file.endsWith(".mdx"));

      for (const file of files) {
        try {
          const filePath = path.join(blogDir, file);
          const fileContent = fs.readFileSync(filePath, "utf8");
          const { data: frontmatter, content } = matter(fileContent);
          const slug = file.replace(".mdx", "");

          // Handle both old format (destination: string) and new format (destinations: string[])
          const destinations = frontmatter.destinations || [];

          // Add tags to the global set
          if (frontmatter.tags) {
            frontmatter.tags.forEach(tag => {
              if (tag && tag.trim()) {
                allTags.add(tag.toLowerCase().trim());
              }
            });
          }

          posts.push({
            content,
            slug,
            frontmatter: {
              ...frontmatter,
              destinations,
            },
            destinationNames: destinations, // Simple fallback for now
          });
        } catch (error) {
          console.error(`Error processing ${file}:`, error.message);
        }
      }

      // Sort by publishedAt date (newest first)
      posts.sort(
        (a, b) =>
          new Date(b.frontmatter.publishedAt).getTime() -
          new Date(a.frontmatter.publishedAt).getTime()
      );
    }

    blogData[locale] = posts;
    console.log(
      `✅ Generated ${posts.length} blog posts for locale: ${locale}`
    );
  }

  // Convert tags set to sorted array
  const sortedTags = Array.from(allTags).sort();

  // Create a flat list of all blog posts with locale info for generateStaticParams
  const allBlogPosts = [];
  for (const [locale, posts] of Object.entries(blogData)) {
    for (const post of posts) {
      allBlogPosts.push({ locale, slug: post.slug });
    }
  }

  // Generate the TypeScript file
  const outputPath = path.join(
    process.cwd(),
    "src",
    "lib",
    "generated-blog-data.ts"
  );
  const tsContent = `// Auto-generated file - Do not edit manually
// Generated at: ${new Date().toISOString()}

import { BlogPostData } from "./blog";

// Pre-generated blog data for each locale
export const GENERATED_BLOG_DATA: Record<string, BlogPostData[]> = ${JSON.stringify(blogData, null, 2)};

// This function will be used to get blog posts without file system access
export function getGeneratedBlogPostsForLocale(locale: string): BlogPostData[] {
  return GENERATED_BLOG_DATA[locale] || [];
}

// Export all unique tags for static generation
export const GENERATED_ALL_TAGS: string[] = ${JSON.stringify(sortedTags, null, 2)};

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
  console.log(`📊 Total tags: ${sortedTags.length}`);
  console.log(
    `📊 Total posts across all locales: ${Object.values(blogData).reduce((sum, posts) => sum + posts.length, 0)}`
  );
  console.log("✅ Blog data generation complete!");
}

// Run the script
if (require.main === module) {
  generateBlogData().catch(console.error);
}

module.exports = generateBlogData;
