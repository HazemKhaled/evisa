import type { MetadataRoute } from "next";

import { languages } from "@/app/i18n/settings";
import { env } from "@/lib/consts";
import { getDestinationsListWithMetadata } from "@/lib/services/country-service";

export const revalidate = 86400; // Revalidate every day

export async function generateSitemaps() {
  return languages.map(locale => ({ id: locale }));
}

export default async function sitemap({
  id: locale,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const base = env.baseUrl;
  const destinations = await getDestinationsListWithMetadata(locale, 1000);
  const urls: MetadataRoute.Sitemap = [];

  // Destinations list page
  const listAlternates: Record<string, string> = {};
  languages.forEach(lang => {
    listAlternates[lang] = `${base}/${lang}/d`;
  });
  urls.push({
    url: `${base}/${locale}/d`,
    changeFrequency: "daily",
    priority: 0.8,
    alternates: { languages: listAlternates },
  });

  // Each destination: detail page + blog index
  destinations.forEach(dest => {
    const detailAlternates: Record<string, string> = {};
    const blogAlternates: Record<string, string> = {};
    languages.forEach(lang => {
      detailAlternates[lang] = `${base}/${lang}/d/${dest.code}`;
      blogAlternates[lang] = `${base}/${lang}/d/${dest.code}/blog`;
    });

    urls.push({
      url: `${base}/${locale}/d/${dest.code}`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: detailAlternates },
    });

    urls.push({
      url: `${base}/${locale}/d/${dest.code}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: blogAlternates },
    });
  });

  return urls;
}
