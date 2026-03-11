import type { MetadataRoute } from "next";

import { languages } from "@/app/i18n/settings";
import { env } from "@/lib/consts";
import { getBlogDataForLocale } from "@/lib/services/blog-service";

export const revalidate = 86400; // Revalidate every day

export async function generateSitemaps() {
  // Generate sitemap entries for each supported locale for blog posts and tags
  return languages.map(locale => {
    return {
      id: locale,
    };
  });
}

export default async function sitemap({
  id: locale,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.baseUrl;

  // Get blog data for this locale using async service
  const blogPosts = await getBlogDataForLocale(locale);

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

  // Get blog data for all locales for cross-reference
  const allLocaleBlogData = await Promise.all(
    languages.map(async lang => ({
      locale: lang,
      posts: await getBlogDataForLocale(lang),
    }))
  );

  // Add individual blog posts
  blogPosts.forEach(post => {
    const postAlternates: Record<string, string> = {};

    // Generate alternates by finding posts with matching slugs across locales
    allLocaleBlogData.forEach(({ locale: lang, posts: langPosts }) => {
      const equivalentPost = langPosts.find(p => p.slug === post.slug);
      if (equivalentPost) {
        postAlternates[lang] = `${baseUrl}/${lang}/blog/${equivalentPost.slug}`;
      }
    });

    // Only add alternates if we have the current locale
    if (postAlternates[locale]) {
      urls.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.lastUpdated || post.publishedAt),
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
    post.tags?.forEach(tag => allTags.add(tag));
  });

  Array.from(allTags).forEach(tag => {
    const tagAlternates: Record<string, string> = {};

    // Check if tag exists in other locales
    allLocaleBlogData.forEach(({ locale: lang, posts: langPosts }) => {
      const tagExists = langPosts.some(post => post.tags?.includes(tag));

      if (tagExists || lang === locale) {
        tagAlternates[lang] =
          `${baseUrl}/${lang}/blog/t/${encodeURIComponent(tag)}`;
      }
    });

    urls.push({
      url: `${baseUrl}/${locale}/blog/t/${encodeURIComponent(tag)}`,
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
