import { NextRequest } from "next/server";
import { generateDestinationSitemap, generateSitemapXml } from "@/lib/sitemap";

/**
 * Generate destination-specific sitemap
 * Route: /d/[country]/sitemap.xml
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ country: string }> }
) {
  try {
    const { country: countryCode } = await params;
    const urls = await generateDestinationSitemap(countryCode);

    if (urls.length === 0) {
      return new Response("Country not found", { status: 404 });
    }

    const sitemapXml = generateSitemapXml(urls);

    return new Response(sitemapXml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    // Log error in development environment
    if (process.env.NODE_ENV === "development") {
      console.error("Error generating destination sitemap:", error);
    }
    return new Response("Error generating destination sitemap", {
      status: 500,
    });
  }
}
