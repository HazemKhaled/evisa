import { MetadataRoute } from "next";
import { languagesObj } from "@/app/i18n/settings";

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com";
  
  return {
    name: "GetTravelVisa.com - Visa Application Platform",
    short_name: "GetTravelVisa",
    description: "Comprehensive visa processing and travel services platform",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["travel", "business", "productivity"],
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-desktop.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "GetTravelVisa.com Desktop View",
      },
      {
        src: "/screenshot-mobile.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "GetTravelVisa.com Mobile View",
      },
    ],
    related_applications: [
      {
        platform: "webapp",
        url: baseUrl,
      },
    ],
    prefer_related_applications: false,
    edge_side_panel: {
      preferred_width: 400,
    },
    launch_handler: {
      client_mode: "navigate-existing",
    },
    handle_links: "preferred",
    // Note: i18n support for manifest would require separate manifest files per locale
    // This is a limitation of the Web App Manifest specification
    // For full i18n support, you would need to serve different manifests per locale
  };
}