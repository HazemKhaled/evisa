import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Check if this is production environment
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    // Allow all bots on production domain
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://gettravelvisa.com/sitemap.xml",
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
