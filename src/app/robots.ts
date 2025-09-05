import { type MetadataRoute } from "next";
import { isProduction, env } from "@/lib/consts";

export default function robots(): MetadataRoute.Robots {
  if (isProduction) {
    // Allow all bots on production domain
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: `${env.baseUrl}/sitemap.xml`,
    };
  } else {
    // Deny all bots on non-production domains (staging, localhost, etc.)
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }
}
