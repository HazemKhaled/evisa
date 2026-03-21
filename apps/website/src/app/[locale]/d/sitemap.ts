import type { MetadataRoute } from "next";

import { languages } from "@/app/i18n/settings";
import { env } from "@/lib/consts";
import { getDestinationsForSitemap } from "@/lib/services/country-service";
import { getVisaTypesByDestination } from "@/lib/services/visa-service";

export const revalidate = 86400; // Revalidate every day

export async function generateSitemaps() {
  return languages.map(locale => ({ id: locale }));
}

export default async function sitemap({
  id: localePromise,
}: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const locale = await localePromise;
  const base = env.baseUrl;
  const destinationCodes = await getDestinationsForSitemap();
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

  // Each destination: detail page + blog index + visa types
  for (const code of destinationCodes) {
    const detailAlternates: Record<string, string> = {};
    const blogAlternates: Record<string, string> = {};
    languages.forEach(lang => {
      detailAlternates[lang] = `${base}/${lang}/d/${code}`;
      blogAlternates[lang] = `${base}/${lang}/d/${code}/blog`;
    });

    urls.push({
      url: `${base}/${locale}/d/${code}`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: detailAlternates },
    });

    urls.push({
      url: `${base}/${locale}/d/${code}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: blogAlternates },
    });

    // Fetch visa types for this destination and add them to sitemap
    try {
      const visas = await getVisaTypesByDestination(code, "en");
      for (const visa of visas) {
        const visaSlug = visa.type.toLowerCase().replace(/\s+/g, "-");
        const visaAlternates: Record<string, string> = {};
        languages.forEach(lang => {
          visaAlternates[lang] = `${base}/${lang}/d/${code}/v/${visaSlug}`;
        });

        urls.push({
          url: `${base}/${locale}/d/${code}/v/${visaSlug}`,
          changeFrequency: "monthly",
          priority: 0.8,
          alternates: { languages: visaAlternates },
        });
      }
    } catch (error) {
      // Log error but continue sitemap generation for other destinations
      console.error(`Failed to fetch visas for destination ${code}:`, error);
    }
  }

  return urls;
}
