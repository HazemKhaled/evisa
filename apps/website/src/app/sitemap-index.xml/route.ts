import { languages } from "@/app/i18n/settings";
import { env } from "@/lib/consts";

export const revalidate = 86400; // Revalidate every day

export function GET() {
  const base = env.baseUrl;

  const sitemaps: string[] = [
    // Static pages sitemap
    `${base}/sitemap.xml`,
    // Per-locale blog sitemaps
    ...languages.map(lang => `${base}/${lang}/blog/sitemap.xml`),
    // Per-locale destination sitemaps
    ...languages.map(lang => `${base}/${lang}/d/sitemap.xml`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(url => `  <sitemap>\n    <loc>${url}</loc>\n  </sitemap>`).join("\n")}
</sitemapindex>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
