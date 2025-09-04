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
  structuredData?: Record<string, unknown>;
}

export interface MultilingualSEOConfig {
  [locale: string]: SEOConfig;
}

/**
 * Generate comprehensive metadata for a page with multilingual support
 */
export function generateMetadata(
  config: SEOConfig | MultilingualSEOConfig,
  locale: string = fallbackLng,
  pathname: string = "/"
): Metadata {
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

  // Add structured data if provided
  if (seoConfig.structuredData) {
    metadata.other = {
      ...metadata.other,
      "application/ld+json": JSON.stringify(seoConfig.structuredData),
    };
  }

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
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationStructuredData(locale: string = fallbackLng) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GetTravelVisa.com",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: locale === "ar" 
      ? "منصة شاملة لمعالجة التأشيرات وخدمات السفر"
      : "Comprehensive visa processing and travel services platform",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-VISA-HELP",
      contactType: "customer service",
      availableLanguage: languagesObj.map(lang => lang.code),
    },
    sameAs: [
      "https://www.facebook.com/gettravelvisa",
      "https://www.twitter.com/gettravelvisa",
      "https://www.linkedin.com/company/gettravelvisa",
      "https://www.instagram.com/gettravelvisa",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressLocality: "New York",
      addressRegion: "NY",
    },
  };
}

/**
 * Generate JSON-LD structured data for website
 */
export function generateWebsiteStructuredData(locale: string = fallbackLng) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GetTravelVisa.com",
    url: baseUrl,
    description: locale === "ar" 
      ? "منصة شاملة لمعالجة التأشيرات وخدمات السفر"
      : "Comprehensive visa processing and travel services platform",
    inLanguage: languagesObj.map(lang => lang.code),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>,
  locale: string = fallbackLng
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate JSON-LD structured data for FAQ
 */
export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>,
  locale: string = fallbackLng
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD structured data for article/blog post
 */
export function generateArticleStructuredData(
  article: {
    title: string;
    description: string;
    author: string;
    publishedDate: string;
    modifiedDate?: string;
    image?: string;
    url: string;
  },
  locale: string = fallbackLng
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com";
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "GetTravelVisa.com",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    image: article.image || `${baseUrl}/og-image-${locale}.jpg`,
    url: article.url.startsWith("http") ? article.url : `${baseUrl}${article.url}`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "GetTravelVisa.com",
      url: baseUrl,
    },
  };
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