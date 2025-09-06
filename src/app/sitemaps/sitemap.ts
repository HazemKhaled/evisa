import type { MetadataRoute } from "next";
import { languages } from "@/app/i18n/settings";
import { env } from "@/lib/consts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.baseUrl;

  // Static pages that exist in all languages
  const staticPages = [
    "", // Home page
    "contact", // Contact page
    "p/about-us", // About us
    "p/terms-n-conditions", // Terms and conditions
    "p/privacy-policy", // Privacy policy
  ];

  const urls: MetadataRoute.Sitemap = [];

  // Generate localized URLs for each static page
  staticPages.forEach(page => {
    // Create the primary URL (English)
    const primaryUrl = page === "" ? baseUrl : `${baseUrl}/en/${page}`;

    // Generate alternates for all languages
    const alternates: Record<string, string> = {};
    languages.forEach(lang => {
      if (page === "") {
        // Home page: English at root, others with locale prefix
        alternates[lang] = lang === "en" ? baseUrl : `${baseUrl}/${lang}`;
      } else {
        // Other pages: all with locale prefix
        alternates[lang] = `${baseUrl}/${lang}/${page}`;
      }
    });

    urls.push({
      url: primaryUrl,
      // Update monthly
      lastModified: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ),
      changeFrequency: page === "" ? "daily" : "monthly",
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: alternates,
      },
    });
  });

  return urls;
}
