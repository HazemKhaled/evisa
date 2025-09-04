import { MetadataRoute } from "next";
import { generateSitemapData } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries = generateSitemapData();
  
  return sitemapEntries.map(entry => ({
    url: entry.url,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: entry.alternates ? {
      languages: entry.alternates,
    } : undefined,
  }));
}