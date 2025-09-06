import type { MetadataRoute } from "next";
import { languages } from "@/app/i18n/settings";
import { GENERATED_BLOG_DATA } from "@/lib/generated-blog-data";
import { env } from "@/lib/consts";

export async function generateSitemaps() {
  // Generate sitemap entries for each supported locale for blog posts and tags
  return languages.map(locale => {
    return {
      id: locale,
    };
  });
}

export default function sitemap({
  id: locale,
}: {
  id: string;
}): MetadataRoute.Sitemap {
  const baseUrl = env.baseUrl;

  // Get blog data for this locale
  const blogPosts = GENERATED_BLOG_DATA[locale] || [];

  const urls: MetadataRoute.Sitemap = [];

  // Add blog index page
  const blogIndexAlternates: Record<string, string> = {};
  languages.forEach(lang => {
    blogIndexAlternates[lang] = `${baseUrl}/${lang}/blog`;
  });

  urls.push({
    url: `${baseUrl}/${locale}/blog`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
    alternates: {
      languages: blogIndexAlternates,
    },
  });

  // Add individual blog posts
  blogPosts.forEach(post => {
    const postAlternates: Record<string, string> = {};

    // Generate alternates by checking if post exists in other locales
    languages.forEach(lang => {
      const langPosts = GENERATED_BLOG_DATA[lang] || [];
      const equivalentPost = langPosts.find(p =>
        // Try to find equivalent post by matching some criteria
        // For now, we'll assume each post is only available in its original language
        lang === locale ? p.slug === post.slug : false
      );

      if (equivalentPost || lang === locale) {
        postAlternates[lang] = `${baseUrl}/${lang}/blog/${post.slug}`;
      }
    });

    // Only add alternates if we have the current locale
    if (postAlternates[locale]) {
      urls.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(
          post.frontmatter.lastUpdated || post.frontmatter.publishedAt
        ),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: postAlternates,
        },
      });
    }
  });

  // Add tag pages
  const allTags = new Set<string>();
  blogPosts.forEach(post => {
    post.frontmatter.tags?.forEach(tag => allTags.add(tag));
  });

  Array.from(allTags).forEach(tag => {
    const tagAlternates: Record<string, string> = {};

    // Check if tag exists in other locales
    languages.forEach(lang => {
      const langPosts = GENERATED_BLOG_DATA[lang] || [];
      const tagExists = langPosts.some(post =>
        post.frontmatter.tags?.includes(tag)
      );

      if (tagExists || lang === locale) {
        tagAlternates[lang] = `${baseUrl}/${lang}/blog/t/${tag}`;
      }
    });

    urls.push({
      url: `${baseUrl}/${locale}/blog/t/${tag}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      alternates: {
        languages: tagAlternates,
      },
    });
  });

  return urls;
}
