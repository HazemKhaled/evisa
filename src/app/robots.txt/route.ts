import { NextRequest } from "next/server";

/**
 * Generate robots.txt file for SEO
 * Route: /robots.txt
 */
export async function GET(_request: NextRequest) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://gettravelvisa.com";
    const isProduction = process.env.NODE_ENV === "production";

    // Generate robots.txt content
    const robotsTxt = `User-agent: *
${isProduction ? "Allow: /" : "Disallow: /"}

# Sitemaps
Sitemap: ${baseUrl}/sitemap_index.xml
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for better server performance
Crawl-delay: 1

# Block access to admin and API routes
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /dashboard/

# Allow access to public assets
Allow: /images/
Allow: /icons/
Allow: /favicon.ico
Allow: /manifest.json

# Block access to development files
Disallow: /.env*
Disallow: /package.json
Disallow: /tsconfig.json
Disallow: /next.config.*
Disallow: /tailwind.config.*
Disallow: /drizzle.config.*
Disallow: /wrangler.jsonc
Disallow: /open-next.config.*`;

    return new Response(robotsTxt, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=86400, s-maxage=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    // Log error in development environment
    if (process.env.NODE_ENV === "development") {
      console.error("Error generating robots.txt:", error);
    }
    return new Response("Error generating robots.txt", { status: 500 });
  }
}
