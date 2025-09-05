import { type BlogPostData } from "./blog";
import { env } from "./consts";

/**
 * JSON-LD structured data utilities for SEO
 */

export interface Organization {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone?: string;
    contactType: string;
    email?: string;
  };
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
}

export interface WebSite {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
}

export interface WebPage {
  name: string;
  description?: string;
  url: string;
  isPartOf?: {
    name: string;
    url: string;
  };
  breadcrumb?: {
    itemListElement: {
      position: number;
      name: string;
      item: string;
    }[];
  };
  mainEntity?: Record<string, unknown>;
}

export interface Article {
  headline: string;
  description: string;
  image: string;
  author: {
    name: string;
    type: string;
  };
  publisher: {
    name: string;
    logo: {
      url: string;
      width: number;
      height: number;
    };
  };
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage: {
    type: string;
    id: string;
  };
  articleSection?: string;
  keywords?: string[];
}

export interface BreadcrumbList {
  itemListElement: {
    position: number;
    name: string;
    item: string;
  }[];
}

/**
 * Generate organization JSON-LD
 */
export function generateOrganizationJsonLd(organization: Organization) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    url: organization.url,
    ...(organization.logo && { logo: organization.logo }),
    ...(organization.description && { description: organization.description }),
    ...(organization.contactPoint && {
      contactPoint: organization.contactPoint,
    }),
    ...(organization.address && { address: organization.address }),
  };
}

/**
 * Generate website JSON-LD
 */
export function generateWebSiteJsonLd(website: WebSite) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: website.name,
    url: website.url,
    ...(website.description && { description: website.description }),
    ...(website.potentialAction && {
      potentialAction: website.potentialAction,
    }),
  };
}

/**
 * Generate webpage JSON-LD
 */
export function generateWebPageJsonLd(webpage: WebPage) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: webpage.name,
    ...(webpage.description && { description: webpage.description }),
    url: webpage.url,
    ...(webpage.isPartOf && { isPartOf: webpage.isPartOf }),
    ...(webpage.breadcrumb && { breadcrumb: webpage.breadcrumb }),
    ...(webpage.mainEntity && { mainEntity: webpage.mainEntity }),
  };
}

/**
 * Generate article JSON-LD
 */
export function generateArticleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    image: article.image,
    author: article.author,
    publisher: article.publisher,
    datePublished: article.datePublished,
    ...(article.dateModified && { dateModified: article.dateModified }),
    mainEntityOfPage: article.mainEntityOfPage,
    ...(article.articleSection && { articleSection: article.articleSection }),
    ...(article.keywords && { keywords: article.keywords }),
  };
}

/**
 * Generate breadcrumb list JSON-LD
 */
export function generateBreadcrumbListJsonLd(breadcrumb: BreadcrumbList) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.itemListElement,
  };
}

/**
 * Generate FAQ JSON-LD
 */
export function generateFAQJsonLd(
  faqs: { question: string; answer: string }[]
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
 * Generate service JSON-LD
 */
export function generateServiceJsonLd(service: {
  name: string;
  description: string;
  provider: Organization;
  areaServed?: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: generateOrganizationJsonLd(service.provider),
    ...(service.areaServed && { areaServed: service.areaServed }),
    ...(service.serviceType && { serviceType: service.serviceType }),
  };
}

/**
 * Generate blog post article JSON-LD from BlogPostData
 */
export function generateBlogPostJsonLd(
  post: BlogPostData,
  locale: string,
  baseUrl: string
): Article {
  const postUrl = `${baseUrl}/${locale}/blog/${post.slug}`;

  return {
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image,
    author: {
      name: post.frontmatter.author,
      type: "Person",
    },
    publisher: {
      name: "GetTravelVisa.com",
      logo: {
        url: `${baseUrl}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    datePublished: post.frontmatter.publishedAt,
    dateModified: post.frontmatter.lastUpdated || post.frontmatter.publishedAt,
    mainEntityOfPage: {
      type: "WebPage",
      id: postUrl,
    },
    articleSection: "Travel Blog",
    keywords: post.frontmatter.tags,
  };
}

/**
 * Generate organization data with translations
 */
export function generateOrganizationData(
  t: (key: string) => string
): Organization {
  const baseUrl = env.baseUrl;
  return {
    name: t("jsonld.organization.name"),
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: t("jsonld.organization.description"),
    contactPoint: {
      telephone: "+1-555-0123",
      contactType: t("jsonld.organization.contact_type"),
      email: "info@gettravelvisa.com",
    },
    address: {
      streetAddress: "123 Travel Street",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
  };
}

/**
 * Generate website data with translations
 */
export function generateWebSiteData(t: (key: string) => string): WebSite {
  const baseUrl = env.baseUrl;
  return {
    name: t("jsonld.website.name"),
    url: baseUrl,
    description: t("jsonld.website.description"),
    potentialAction: {
      target: `${baseUrl}/search?q={search_term_string}`,
      queryInput: "required name=search_term_string",
    },
  };
}

/**
 * Generate service data with translations
 */
export function generateServiceData(
  t: (key: string) => string,
  organization: Organization
) {
  return {
    name: t("jsonld.service.name"),
    description: t("jsonld.service.description"),
    provider: organization,
    areaServed: t("jsonld.service.area_served"),
    serviceType: t("jsonld.service.service_type"),
  };
}

/**
 * Generate blog post article JSON-LD from BlogPostData with translations
 */
export function generateBlogPostJsonLdWithTranslations(
  post: BlogPostData,
  locale: string,
  baseUrl: string,
  t: (key: string) => string
): Article {
  const postUrl = `${baseUrl}/${locale}/blog/${post.slug}`;

  return {
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image,
    author: {
      name: post.frontmatter.author,
      type: "Person",
    },
    publisher: {
      name: t("jsonld.organization.name"),
      logo: {
        url: `${env.baseUrl}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    datePublished: post.frontmatter.publishedAt,
    dateModified: post.frontmatter.lastUpdated || post.frontmatter.publishedAt,
    mainEntityOfPage: {
      type: "WebPage",
      id: postUrl,
    },
    articleSection: t("jsonld.blog.article_section"),
    keywords: post.frontmatter.tags,
  };
}

/**
 * Generate breadcrumb data with translations
 */
export function generateBreadcrumbData(
  items: Array<{ name: string; url: string }>,
  _t: (key: string) => string
): BreadcrumbList {
  return {
    itemListElement: items.map((item, index) => ({
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Default organization data for GetTravelVisa.com
 */
export const defaultOrganization: Organization = {
  name: "GetTravelVisa.com",
  url: env.baseUrl,
  logo: `${env.baseUrl}/logo.png`,
  description:
    "Your trusted visa application partner. Simplify your visa application process with our comprehensive visa checking and application services.",
  contactPoint: {
    telephone: "+1-555-0123",
    contactType: "customer service",
    email: "info@gettravelvisa.com",
  },
  address: {
    streetAddress: "123 Travel Street",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10001",
    addressCountry: "US",
  },
};

/**
 * Default website data for GetTravelVisa.com
 */
export const defaultWebSite: WebSite = {
  name: "GetTravelVisa.com",
  url: env.baseUrl,
  description:
    "Simplify your visa application process with our comprehensive visa checking and application services. Get expert guidance for travel visas worldwide.",
  potentialAction: {
    target: `${env.baseUrl}/search?q={search_term_string}`,
    queryInput: "required name=search_term_string",
  },
};
