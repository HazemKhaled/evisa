"use client";

import Head from "next/head";
import { useTranslation } from "react-i18next";
import { 
  OrganizationStructuredData, 
  WebsiteStructuredData,
  BreadcrumbStructuredData,
  FAQStructuredData,
  ArticleStructuredData 
} from "./StructuredData";

interface SEOHeadProps {
  locale: string;
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  noIndex?: boolean;
  structuredData?: {
    type: "organization" | "website" | "breadcrumb" | "faq" | "article";
    data?: any;
  }[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  article?: {
    title: string;
    description: string;
    author: string;
    publishedDate: string;
    modifiedDate?: string;
    image?: string;
    url: string;
  };
}

export function SEOHead({
  locale,
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  noIndex = false,
  structuredData = [],
  breadcrumbs,
  faqs,
  article,
}: SEOHeadProps) {
  const { t } = useTranslation("common");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gettravelvisa.com";
  
  // Use translations as fallback
  const pageTitle = title || t("site.title");
  const pageDescription = description || t("site.description");
  const pageKeywords = keywords || t("site.keywords");
  const pageOgImage = ogImage || `${baseUrl}/og-image-${locale}.jpg`;
  const pageCanonical = canonical || `${baseUrl}/${locale}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="GetTravelVisa.com" />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      <meta name="googlebot" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageCanonical} />
      
      {/* Language and Direction */}
      <meta httpEquiv="content-language" content={locale} />
      <meta name="language" content={locale} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:site_name" content="GetTravelVisa.com" />
      <meta property="og:image" content={pageOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageOgImage} />
      <meta name="twitter:image:alt" content={pageTitle} />
      <meta name="twitter:site" content="@gettravelvisa" />
      <meta name="twitter:creator" content="@gettravelvisa" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="GetTravelVisa" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Verification Tags */}
      {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
      )}
      {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
        <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
      )}
      {process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && (
        <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_VERIFICATION} />
      )}
      
      {/* Structured Data */}
      <OrganizationStructuredData locale={locale} />
      <WebsiteStructuredData locale={locale} />
      
      {breadcrumbs && <BreadcrumbStructuredData locale={locale} items={breadcrumbs} />}
      {faqs && <FAQStructuredData locale={locale} faqs={faqs} />}
      {article && <ArticleStructuredData locale={locale} article={article} />}
      
      {/* Custom Structured Data */}
      {structuredData.map((data, index) => {
        switch (data.type) {
          case "organization":
            return <OrganizationStructuredData key={index} locale={locale} />;
          case "website":
            return <WebsiteStructuredData key={index} locale={locale} />;
          case "breadcrumb":
            return <BreadcrumbStructuredData key={index} locale={locale} items={data.data?.items || []} />;
          case "faq":
            return <FAQStructuredData key={index} locale={locale} faqs={data.data?.faqs || []} />;
          case "article":
            return <ArticleStructuredData key={index} locale={locale} article={data.data?.article} />;
          default:
            return null;
        }
      })}
    </Head>
  );
}