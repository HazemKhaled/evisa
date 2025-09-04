import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata, SEOConfig } from "./seo";
import { getTranslation } from "@/app/i18n";

interface PageSEOConfig {
  locale: string;
  pathname: string;
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
  customTranslations?: {
    titleKey?: string;
    descriptionKey?: string;
    keywordsKey?: string;
  };
}

/**
 * Generate page-specific SEO metadata with multilingual support
 */
export async function generatePageMetadata({
  locale,
  pathname,
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  noIndex = false,
  structuredData,
  customTranslations = {},
}: PageSEOConfig): Promise<Metadata> {
  const { t } = await getTranslation(locale, "common");

  // Use custom translations if provided, otherwise fall back to defaults
  const pageTitle = title || t(customTranslations.titleKey || "site.title");
  const pageDescription = description || t(customTranslations.descriptionKey || "site.description");
  const pageKeywords = keywords || t(customTranslations.keywordsKey || "site.keywords").split(", ");

  const seoConfig: SEOConfig = {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    ogImage,
    ogType,
    noIndex,
    structuredData,
  };

  return generateSEOMetadata(seoConfig, locale, pathname);
}

/**
 * Generate SEO metadata for blog posts
 */
export async function generateBlogPostMetadata({
  locale,
  pathname,
  title,
  description,
  author = "GetTravelVisa.com",
  publishedDate,
  modifiedDate,
  image,
  tags = [],
}: {
  locale: string;
  pathname: string;
  title: string;
  description: string;
  author?: string;
  publishedDate: string;
  modifiedDate?: string;
  image?: string;
  tags?: string[];
}): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com";
  const fullUrl = `${baseUrl}/${locale}${pathname}`;
  const ogImage = image || `${baseUrl}/og-image-${locale}.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "GetTravelVisa.com",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    image: ogImage,
    url: fullUrl,
    inLanguage: locale,
    keywords: tags.join(", "),
    isPartOf: {
      "@type": "WebSite",
      name: "GetTravelVisa.com",
      url: baseUrl,
    },
  };

  return generatePageMetadata({
    locale,
    pathname,
    title,
    description,
    keywords: tags,
    ogImage,
    ogType: "article",
    structuredData,
  });
}

/**
 * Generate SEO metadata for destination pages
 */
export async function generateDestinationMetadata({
  locale,
  pathname,
  destinationName,
  destinationCountry,
  visaRequirements,
  processingTime,
  cost,
  image,
}: {
  locale: string;
  pathname: string;
  destinationName: string;
  destinationCountry: string;
  visaRequirements: string;
  processingTime: string;
  cost: string;
  image?: string;
}): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com";
  const fullUrl = `${baseUrl}/${locale}${pathname}`;
  const ogImage = image || `${baseUrl}/destinations/${destinationName.toLowerCase().replace(/\s+/g, "-")}-${locale}.jpg`;

  const title = `Visa Requirements for ${destinationName} - GetTravelVisa.com`;
  const description = `Complete guide to visa requirements for ${destinationName}. Processing time: ${processingTime}, Cost: ${cost}. ${visaRequirements}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    name: `Visa Requirements for ${destinationName}`,
    description,
    url: fullUrl,
    image: ogImage,
    author: {
      "@type": "Organization",
      name: "GetTravelVisa.com",
    },
    publisher: {
      "@type": "Organization",
      name: "GetTravelVisa.com",
    },
    about: {
      "@type": "Place",
      name: destinationName,
      address: {
        "@type": "PostalAddress",
        addressCountry: destinationCountry,
      },
    },
    offers: {
      "@type": "Offer",
      price: cost,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    inLanguage: locale,
  };

  return generatePageMetadata({
    locale,
    pathname,
    title,
    description,
    keywords: [
      `${destinationName} visa`,
      `${destinationName} visa requirements`,
      `visa for ${destinationName}`,
      `${destinationCountry} visa`,
      "travel visa",
      "visa application",
    ],
    ogImage,
    structuredData,
  });
}

/**
 * Generate SEO metadata for contact pages
 */
export async function generateContactMetadata({
  locale,
  pathname,
}: {
  locale: string;
  pathname: string;
}): Promise<Metadata> {
  const { t } = await getTranslation(locale, "common");

  const title = `Contact Us - GetTravelVisa.com`;
  const description = `Get in touch with our visa experts. We're here to help with your visa application process and answer any questions you may have.`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact GetTravelVisa.com",
    description,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com"}/${locale}${pathname}`,
    mainEntity: {
      "@type": "Organization",
      name: "GetTravelVisa.com",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-800-VISA-HELP",
        contactType: "customer service",
        availableLanguage: ["en", "es", "ar", "pt", "ru", "de", "fr", "it"],
        areaServed: "Worldwide",
      },
    },
  };

  return generatePageMetadata({
    locale,
    pathname,
    title,
    description,
    keywords: [
      "contact us",
      "visa help",
      "customer service",
      "visa support",
      "get help",
      "visa questions",
    ],
    structuredData,
  });
}