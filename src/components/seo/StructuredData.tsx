"use client";

import { useTranslation } from "react-i18next";
import { 
  generateOrganizationStructuredData, 
  generateWebsiteStructuredData,
  generateBreadcrumbStructuredData,
  generateFAQStructuredData,
  generateArticleStructuredData 
} from "@/lib/seo";

interface StructuredDataProps {
  locale: string;
  type: "organization" | "website" | "breadcrumb" | "faq" | "article";
  data?: {
    // For breadcrumb
    items?: Array<{ name: string; url: string }>;
    // For FAQ
    faqs?: Array<{ question: string; answer: string }>;
    // For article
    article?: {
      title: string;
      description: string;
      author: string;
      publishedDate: string;
      modifiedDate?: string;
      image?: string;
      url: string;
    };
  };
}

export function StructuredData({ locale, type, data }: StructuredDataProps) {
  let structuredData: Record<string, unknown> = {};

  switch (type) {
    case "organization":
      structuredData = generateOrganizationStructuredData(locale);
      break;
    case "website":
      structuredData = generateWebsiteStructuredData(locale);
      break;
    case "breadcrumb":
      if (data?.items) {
        structuredData = generateBreadcrumbStructuredData(data.items, locale);
      }
      break;
    case "faq":
      if (data?.faqs) {
        structuredData = generateFAQStructuredData(data.faqs, locale);
      }
      break;
    case "article":
      if (data?.article) {
        structuredData = generateArticleStructuredData(data.article, locale);
      }
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}

interface BreadcrumbProps {
  locale: string;
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbStructuredData({ locale, items }: BreadcrumbProps) {
  return <StructuredData locale={locale} type="breadcrumb" data={{ items }} />;
}

interface FAQProps {
  locale: string;
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQStructuredData({ locale, faqs }: FAQProps) {
  return <StructuredData locale={locale} type="faq" data={{ faqs }} />;
}

interface ArticleProps {
  locale: string;
  article: {
    title: string;
    description: string;
    author: string;
    publishedDate: string;
    modifiedDate?: string;
    image?: string;
    url: string;
  };
}

export function ArticleStructuredData({ locale, article }: ArticleProps) {
  return <StructuredData locale={locale} type="article" data={{ article }} />;
}

interface OrganizationProps {
  locale: string;
}

export function OrganizationStructuredData({ locale }: OrganizationProps) {
  return <StructuredData locale={locale} type="organization" />;
}

interface WebsiteProps {
  locale: string;
}

export function WebsiteStructuredData({ locale }: WebsiteProps) {
  return <StructuredData locale={locale} type="website" />;
}