import { NextRequest } from 'next/server';
import { generateSitemapIndex, generateSitemapIndexXml } from '@/lib/sitemap';

/**
 * Generate sitemap index that includes all sitemaps
 * Route: /sitemap_index.xml
 */
export async function GET(_request: NextRequest) {
  try {
    const sitemaps = await generateSitemapIndex();
    const sitemapIndexXml = generateSitemapIndexXml(sitemaps);

    return new Response(sitemapIndexXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap index:', error);
    return new Response('Error generating sitemap index', { status: 500 });
  }
}