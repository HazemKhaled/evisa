import { NextRequest } from "next/server";

/**
 * Generate manifest.json for PWA support
 * Route: /manifest.json
 */
export async function GET(_request: NextRequest) {
  try {
    const manifest = {
      name: "GetTravelVisa - Visa Processing Made Easy",
      short_name: "GetTravelVisa",
      description:
        "Centralized visa processing platform helping users travel with minimal visa requirements",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#3b82f6",
      orientation: "portrait-primary",
      scope: "/",
      lang: "en",
      categories: ["travel", "business", "productivity"],
      icons: [
        {
          src: "/icons/icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icons/icon-128x128.png",
          sizes: "128x128",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icons/icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icons/icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable any",
        },
      ],
      screenshots: [
        {
          src: "/screenshots/desktop-home.png",
          sizes: "1280x720",
          type: "image/png",
          form_factor: "wide",
          label: "GetTravelVisa Homepage",
        },
        {
          src: "/screenshots/mobile-home.png",
          sizes: "375x667",
          type: "image/png",
          form_factor: "narrow",
          label: "GetTravelVisa Mobile Homepage",
        },
      ],
      shortcuts: [
        {
          name: "Check Visa Requirements",
          short_name: "Visa Check",
          description: "Check visa requirements for your destination",
          url: "/d",
          icons: [
            {
              src: "/icons/shortcut-visa.png",
              sizes: "96x96",
            },
          ],
        },
        {
          name: "Travel Blog",
          short_name: "Blog",
          description: "Read travel guides and visa information",
          url: "/blog",
          icons: [
            {
              src: "/icons/shortcut-blog.png",
              sizes: "96x96",
            },
          ],
        },
      ],
    };

    return new Response(JSON.stringify(manifest, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=86400, s-maxage=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    // Log error in development environment
    if (process.env.NODE_ENV === "development") {
      console.error("Error generating manifest.json:", error);
    }
    return new Response("Error generating manifest.json", { status: 500 });
  }
}
