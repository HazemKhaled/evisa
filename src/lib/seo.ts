import { Metadata } from "next";
import { languagesObj, fallbackLng } from "@/app/i18n/settings";
import { getTextDirection } from "./utils";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  noIndex?: boolean;
}

export interface MultilingualSEOConfig {
  [locale: string]: SEOConfig;
}

/**
 * Generate comprehensive metadata for a page with multilingual support
 */
export async function generateMetadata(
  config: SEOConfig | MultilingualSEOConfig,
  locale: string = fallbackLng,
  pathname: string = "/"
): Promise<Metadata> {
  const isMultilingual = typeof config === "object" && !("title" in config);
  const seoConfig = isMultilingual 
    ? (config as MultilingualSEOConfig)[locale] || (config as MultilingualSEOConfig)[fallbackLng]
    : config as SEOConfig;

  if (!seoConfig) {
    throw new Error(`No SEO configuration found for locale: ${locale}`);
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com";
  const fullUrl = `${baseUrl}/${locale}${pathname === "/" ? "" : pathname}`;
  const canonicalUrl = seoConfig.canonical || fullUrl;
  const ogImage = seoConfig.ogImage || `${baseUrl}/og-image-${locale}.jpg`;
  
  const direction = getTextDirection(locale);
  const localeWithRegion = getLocaleWithRegion(locale);

  const metadata: Metadata = {
    title: {
      default: seoConfig.title,
      template: `%s | GetTravelVisa.com`,
    },
    description: seoConfig.description,
    keywords: seoConfig.keywords || [],
    authors: [{ name: "GetTravelVisa.com" }],
    creator: "GetTravelVisa.com",
    publisher: "GetTravelVisa.com",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: generateAlternateLanguages(baseUrl, pathname),
    },
    robots: {
      index: !seoConfig.noIndex,
      follow: !seoConfig.noIndex,
      googleBot: {
        index: !seoConfig.noIndex,
        follow: !seoConfig.noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: seoConfig.ogType || "website",
      locale: localeWithRegion,
      title: seoConfig.title,
      description: seoConfig.description,
      url: fullUrl,
      siteName: "GetTravelVisa.com",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seoConfig.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoConfig.title,
      description: seoConfig.description,
      images: [ogImage],
      creator: "@gettravelvisa",
      site: "@gettravelvisa",
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION_ID,
      yandex: process.env.YANDEX_VERIFICATION_ID,
      yahoo: process.env.YAHOO_VERIFICATION_ID,
    },
    category: "travel",
    classification: "Business",
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": "GetTravelVisa",
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#2563eb",
      "theme-color": "#2563eb",
      "color-scheme": "light",
      "supported-color-schemes": "light",
    },
  };

  return metadata;
}

/**
 * Generate alternate language links for hreflang
 */
function generateAlternateLanguages(baseUrl: string, pathname: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  
  languagesObj.forEach(({ code }) => {
    alternates[code] = `${baseUrl}/${code}${pathname === "/" ? "" : pathname}`;
  });

  // Add x-default for the fallback language
  alternates["x-default"] = `${baseUrl}/${fallbackLng}${pathname === "/" ? "" : pathname}`;
  
  return alternates;
}

/**
 * Get locale with region for OpenGraph
 */
function getLocaleWithRegion(locale: string): string {
  const localeMap: Record<string, string> = {
    en: "en_US",
    es: "es_ES",
    ar: "ar_SA",
    pt: "pt_PT",
    ru: "ru_RU",
    de: "de_DE",
    fr: "fr_FR",
    it: "it_IT",
  };
  
  return localeMap[locale] || "en_US";
}


/**
 * Generate sitemap data for all locales
 */
export function generateSitemapData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com";
  const staticRoutes = [
    "/",
    "/contact",
    "/about",
    "/privacy",
    "/terms",
    "/blog",
  ];
  
  const sitemapEntries: Array<{
    url: string;
    lastModified: string;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority: number;
    alternates?: Record<string, string>;
  }> = [];

  // Generate entries for each locale and route combination
  languagesObj.forEach(({ code }) => {
    staticRoutes.forEach(route => {
      const url = `${baseUrl}/${code}${route === "/" ? "" : route}`;
      const alternates: Record<string, string> = {};
      
      // Add alternate language versions
      languagesObj.forEach(({ code: altCode }) => {
        alternates[altCode] = `${baseUrl}/${altCode}${route === "/" ? "" : route}`;
      });
      
      sitemapEntries.push({
        url,
        lastModified: new Date().toISOString(),
        changeFrequency: route === "/" ? "daily" : "weekly",
        priority: route === "/" ? 1.0 : 0.8,
        alternates,
      });
    });
  });

  return sitemapEntries;
}