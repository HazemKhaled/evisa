import { NextRequest } from 'next/server';
import { generateMainSitemap, generateSitemapXml } from '@/lib/sitemap';

/**
 * Generate main sitemap for standalone pages
 * Route: /sitemap.xml
 */
export async function GET(_request: NextRequest) {
  try {
    const urls = await generateMainSitemap();
    const sitemapXml = generateSitemapXml(urls);

    return new Response(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating main sitemap:', error);
    return new Response('Error generating main sitemap', { status: 500 });
  }
}