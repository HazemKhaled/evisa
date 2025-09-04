import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // Define production domain
  const productionDomain = "gettravelvisa.com";

  // Check if current domain is production
  const isProduction =
    host === productionDomain || host === `www.${productionDomain}`;

  let robotsContent: string;

  if (isProduction) {
    // Allow all bots on production domain
    robotsContent = `User-agent: *
Allow: /

Sitemap: https://${productionDomain}/sitemap.xml`;
  } else {
    // Deny all bots on non-production domains (staging, localhost, etc.)
    robotsContent = `User-agent: *
Disallow: /`;
  }

  return new NextResponse(robotsContent, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
