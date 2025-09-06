import { env } from "@/lib/consts";
import { languages } from "@/app/i18n/settings";
import { NextResponse } from "next/server";

// This route serves the sitemap index
export async function GET() {
  const baseUrl = env.baseUrl;
  const urlArray = [
    `${baseUrl}/sitemap.xml`,

    // map on languages
    ...languages.map(lang => {
      return `${baseUrl}/${lang}/blog/sitemap.xml`;
    }),
  ];

  const lastMod = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - new Date().getDay()
  ).toISOString();

  const sitemapsXml = urlArray
    .map(
      url => `
    <sitemap>
      <loc>${url}</loc>
      <lastmod>${lastMod}</lastmod>
    </sitemap>
  `
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapsXml}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
