import { env } from "./consts";
import { type BlogPostData } from "./services/blog-service";
import { type DestinationWithVisaTypes } from "./services/country-service";

/**
 * JSON-LD structured data utilities for SEO
 */

/**
 * Get canonical blog URL based on filter state
 * Returns the primary/preferred URL for filtered blog pages
 */
export function getCanonicalBlogUrl(
  baseUrl: string,
  locale: string,
  options?: {
    search?: string;
    tag?: string;
    destination?: string;
  }
): string {
  if (options?.search) {
    return `${baseUrl}/${locale}/blog?search=${encodeURIComponent(options.search)}`;
  }
  if (options?.tag) {
    return `${baseUrl}/${locale}/blog/t/${encodeURIComponent(options.tag)}`;
  }
  if (options?.destination) {
    return `${baseUrl}/${locale}/d/${encodeURIComponent(options.destination)}/blog`;
  }
  return `${baseUrl}/${locale}/blog`;
}

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
    "@type": "SearchAction";
    target:
      | string
      | {
          "@type": "EntryPoint";
          urlTemplate: string;
        };
    "query-input": string;
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
  image:
    | string
    | {
        url: string;
        width?: number;
        height?: number;
      };
  author: {
    name: string;
    type?: string;
    "@type"?: string;
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
    "@type": string;
    "@id": string;
  };
  articleSection?: string;
  keywords?: string;
}

export interface BreadcrumbList {
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}

export interface CollectionPageItem {
  name: string;
  url: string;
  image?: string;
  description?: string;
}

export interface BlogSchemaPost {
  headline: string;
  url: string;
  image?: string;
  datePublished?: string;
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
  const imageObject =
    typeof article.image === "string"
      ? { "@type": "ImageObject", url: article.image }
      : {
          "@type": "ImageObject",
          url: article.image.url,
          ...(article.image.width && { width: article.image.width }),
          ...(article.image.height && { height: article.image.height }),
        };

  const authorType = article.author["@type"] ?? article.author.type;
  const normalizedAuthor = {
    ...article.author,
    "@type": authorType || "Person",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    ...(article.image ? { image: imageObject } : {}),
    author: normalizedAuthor,
    publisher: {
      "@type": "Organization",
      name: article.publisher.name,
      logo: {
        "@type": "ImageObject",
        url: article.publisher.logo.url,
        width: article.publisher.logo.width,
        height: article.publisher.logo.height,
      },
    },
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
 * Generate collection page JSON-LD with ItemList
 */
export function generateCollectionPageJsonLd(page: {
  name: string;
  description?: string;
  url: string;
  items: CollectionPageItem[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.name,
    ...(page.description && { description: page.description }),
    url: page.url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: page.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
        ...(item.image && { image: item.image }),
        ...(item.description && { description: item.description }),
      })),
    },
  };
}

/**
 * Generate Blog JSON-LD for blog listing pages
 */
export function generateBlogJsonLd(blog: {
  name: string;
  description?: string;
  url: string;
  posts: BlogSchemaPost[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: blog.name,
    ...(blog.description && { description: blog.description }),
    url: blog.url,
    blogPost: blog.posts.map(post => ({
      "@type": "BlogPosting",
      headline: post.headline,
      url: post.url,
      ...(post.image && { image: post.image }),
      ...(post.datePublished && { datePublished: post.datePublished }),
    })),
  };
}

/**
 * Generate visa service JSON-LD for visa details pages
 */
export function generateVisaServiceJsonLd(service: {
  name: string;
  description: string;
  url: string;
  destinationName: string;
  destinationCode: string;
  providerName: string;
  providerUrl: string;
  fee: number;
  currency: string;
  processingDays: number;
  durationDays: number;
  image?: string;
  localizedServiceType?: string;
  localizedDestinationName?: string;
  localizedOfferDescription?: string;
  localizedProcessingTime?: string;
  localizedVisaTypeLabel?: string;
  localizedFeeLabel?: string;
  localizedDurationLabel?: string;
  localizedProcessingLabel?: string;
}) {
  const serviceType = service.localizedServiceType || service.name;
  const destinationName =
    service.localizedDestinationName || service.destinationName;
  const offerDescription =
    service.localizedOfferDescription ||
    `Valid for ${service.durationDays} days`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    ...(service.image && { image: service.image }),
    serviceType,
    provider: {
      "@type": "Organization",
      name: service.providerName,
      url: service.providerUrl,
    },
    areaServed: {
      "@type": "Country",
      name: destinationName,
      identifier: service.destinationCode,
    },
    offers: {
      "@type": "Offer",
      price: service.fee.toString(),
      priceCurrency: service.currency,
      availability: "https://schema.org/InStock",
      description: offerDescription,
    },
    processingTime:
      service.localizedProcessingTime || `P${service.processingDays}D`,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: service.localizedVisaTypeLabel || "Visa Type",
        value: service.name,
      },
      {
        "@type": "PropertyValue",
        name: service.localizedFeeLabel || "Fee",
        value: `${service.fee} ${service.currency}`,
      },
      {
        "@type": "PropertyValue",
        name: service.localizedDurationLabel || "Duration",
        value: `${service.durationDays}`,
      },
      {
        "@type": "PropertyValue",
        name: service.localizedProcessingLabel || "Processing Time",
        value: `${service.processingDays}`,
      },
    ],
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
      contactType: t("jsonld.organization.contact_type"),
      email: "info@gettravelvisa.com",
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
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
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
 * Generate blog post article JSON-LD from BlogPostData
 */
export function generateBlogPostJsonLd(
  post: BlogPostData,
  locale: string,
  baseUrl: string,
  t: (key: string) => string
): Article {
  const postUrl = `${baseUrl}/${locale}/blog/${post.slug}`;

  return {
    headline: post.title,
    description: post.description,
    image: {
      url: post.image,
      width: 1200,
      height: 630,
    },
    author: {
      name: post.author,
      "@type": "Person",
    },
    publisher: {
      name: t("jsonld.organization.name"),
      logo: {
        url: `${baseUrl}/logo.png`,
        width: 200,
        height: 60,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.lastUpdated || post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    articleSection: t("jsonld.blog.article_section"),
    keywords: Array.isArray(post.tags) ? post.tags.join(", ") : "",
  };
}

/**
 * Generate breadcrumb data with translations
 */
export function generateBreadcrumbData(
  items: { name: string; url: string }[]
): BreadcrumbList {
  return {
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Destination JSON-LD interface
 */
export interface DestinationPlace {
  name: string;
  description?: string;
  geo: {
    latitude?: number;
    longitude?: number;
  };
  address: {
    addressCountry: string;
    addressRegion?: string;
  };
  url: string;
  image?: string;
  containsPlace?: {
    name: string;
    description: string;
    priceRange?: string;
    processingTime?: string;
  }[];
}

/**
 * Generate destination place JSON-LD with visa information
 */
export function generateDestinationJsonLd(
  destination: DestinationWithVisaTypes,
  locale: string,
  travelToLabel = "Travel to",
  labels?: {
    travelDescriptionTemplate?: string;
    touristTypeAudience?: string;
    additionalPropertyTotalVisaTypes?: string;
    additionalPropertyVisaFreeEntry?: string;
    additionalPropertyVisaOnArrival?: string;
    visaDescriptionTemplate?: string;
    visaServiceType?: string;
    visaOfferDescriptionTemplate?: string;
  }
): Record<string, unknown> {
  const baseUrl = env.baseUrl;
  const destinationUrl = `${baseUrl}/${locale}/d/${destination.code}`;

  const touristDestination = {
    "@id": `${destinationUrl}#tourist-destination`,
    "@type": "TouristDestination",
    name: destination.localizedName,
    description: destination.about,
    url: destinationUrl,
    ...(destination.heroImage && { image: destination.heroImage }),
    ...(destination.continent && {
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: destination.continent,
      },
    }),
    touristType: {
      "@type": "Audience",
      audienceType: labels?.touristTypeAudience || "Tourists",
    },
    mainEntity: {
      "@type": "TravelAction",
      name: `${travelToLabel} ${destination.localizedName}`,
      description:
        labels?.travelDescriptionTemplate?.replace(
          "{destination}",
          destination.localizedName
        ) ||
        `Visa requirements and travel information for ${destination.localizedName}`,
      ...(destination.hasVisaFreeEntry && {
        additionalType: "https://schema.org/VisaFreeTravel",
      }),
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: labels?.additionalPropertyTotalVisaTypes || "Total Visa Types",
        value: destination.totalVisaTypes.toString(),
      },
      {
        "@type": "PropertyValue",
        name: labels?.additionalPropertyVisaFreeEntry || "Visa Free Entry",
        value: destination.hasVisaFreeEntry.toString(),
      },
      {
        "@type": "PropertyValue",
        name: labels?.additionalPropertyVisaOnArrival || "Visa on Arrival",
        value: destination.hasVisaOnArrival.toString(),
      },
    ],
    ...(destination.visaTypes.length > 0 && {
      offers: destination.visaTypes.map(visa => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: visa.name,
          description:
            labels?.visaDescriptionTemplate
              ?.replace("{type}", visa.type)
              .replace("{destination}", destination.localizedName) ||
            `${visa.type} visa for ${destination.localizedName}`,
          serviceType: labels?.visaServiceType || "Visa Application Service",
          processingTime: `P${visa.processingTime}D`,
        },
        price: visa.fee.toString(),
        priceCurrency: visa.currency,
        availability: "https://schema.org/InStock",
        description:
          labels?.visaOfferDescriptionTemplate?.replace(
            "{days}",
            visa.duration.toString()
          ) || `Valid for ${visa.duration} days`,
      })),
    }),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${destinationUrl}#country`,
        "@type": "Country",
        name: destination.localizedName,
        url: destinationUrl,
        identifier: destination.code,
        address: {
          "@type": "PostalAddress",
          addressCountry: destination.code,
          ...(destination.region && {
            addressRegion: destination.region,
          }),
        },
      },
      touristDestination,
    ],
  };
}
