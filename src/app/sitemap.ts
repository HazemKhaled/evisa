import { type MetadataRoute } from "next";
import { languages } from "@/app/i18n/settings";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com";
  const staticRoutes = [
    "/",
    "/contact",
    "/about",
    "/privacy",
    "/terms",
    "/blog",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and route combination
  languages.forEach(locale => {
    staticRoutes.forEach(route => {
      const url = `${baseUrl}/${locale}${route === "/" ? "" : route}`;

      sitemapEntries.push({
        url,
        lastModified: new Date().toISOString(),
        changeFrequency: route === "/" ? "daily" : "weekly",
        priority: route === "/" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            languages.map(lang => [
              lang,
              `${baseUrl}/${lang}${route === "/" ? "" : route}`,
            ])
          ),
        },
      });
    });
  });

  return sitemapEntries;
}
