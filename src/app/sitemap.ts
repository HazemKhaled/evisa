import { env } from "@/lib/consts";
import type { MetadataRoute } from "next";
import { languages } from "@/app/i18n/settings";

export default function sitemapIndex(): MetadataRoute.Sitemap {
  const baseUrl = env.baseUrl;

  return [
    {
      url: `${baseUrl}/sitemaps/sitemap.xml`,
      // Update weekly
      lastModified: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - new Date().getDay()
      ),
    },

    // map on languages
    ...languages.map(lang => {
      return {
        url: `${baseUrl}/${lang}/blog/sitemap/${lang}.xml`,
        lastModified: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - new Date().getDay()
        ),
      };
    }),
  ];
}
