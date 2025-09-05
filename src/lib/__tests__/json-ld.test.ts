import {
  generateOrganizationJsonLd,
  generateWebSiteJsonLd,
  generateWebPageJsonLd,
  generateArticleJsonLd,
  generateBreadcrumbListJsonLd,
  generateFAQJsonLd,
  generateServiceJsonLd,
  generateBlogPostJsonLd,
  defaultOrganization,
  defaultWebSite,
  type Organization,
  type WebSite,
  type WebPage,
  type Article,
  type BreadcrumbList,
} from "../json-ld";
import { type BlogPostData } from "../blog";
import { getBaseUrl } from "../utils/urls";

// Mock the i18n module
jest.mock("../../app/i18n", () => ({
  getTranslation: jest.fn().mockResolvedValue({
    t: (key: string) => {
      const translations: Record<string, string> = {
        // JSON-LD Organization keys
        "jsonld.organization.name": "GetTravelVisa.com",
        "jsonld.organization.description":
          "Your trusted visa application partner. Simplify your visa application process with our comprehensive visa checking and application services.",
        "jsonld.organization.contact_type": "customer service",

        // JSON-LD Website keys
        "jsonld.website.name": "GetTravelVisa.com",
        "jsonld.website.description":
          "Simplify your visa application process with our comprehensive visa checking and application services. Get expert guidance for travel visas worldwide.",

        // JSON-LD Service keys
        "jsonld.service.name": "Visa Application Services",
        "jsonld.service.description":
          "Comprehensive visa checking and application services for international travel",
        "jsonld.service.area_served": "Worldwide",
        "jsonld.service.service_type": "Travel Services",

        // JSON-LD Blog keys
        "jsonld.blog.title": "Travel Blog",
        "jsonld.blog.article_section": "Travel Blog",

        // Navigation keys
        "navigation.breadcrumb.home": "Home",
        "navigation.header.home": "Home",
        "navigation.header.blog": "Travel Blog",

        // Common keys
        "common.site.title": "Get Travel Visa",

        // Test-specific keys for mock scenarios
        "test.organization.name": "Test Organization",
        "test.organization.description": "Test description",
        "test.website.name": "Test Website",
        "test.website.description": "Test website description",
        "test.page.name": "Test Page",
        "test.page.description": "Test page description",
        "test.article.headline": "Test Article",
        "test.article.description": "Test article description",
        "test.article.section": "Technology",
        "test.service.name": "Test Service",
        "test.service.description": "Test service description",
        "test.faq.question1": "What is this?",
        "test.faq.answer1": "This is a test FAQ.",
        "test.faq.question2": "How does it work?",
        "test.faq.answer2": "It works by testing.",

        // Minimal test keys
        "test.minimal.organization": "Minimal Org",
        "test.minimal.website": "Minimal Website",
        "test.minimal.page": "Minimal Page",
        "test.minimal.article": "Minimal Article",
        "test.minimal.description": "Minimal article description",

        // Navigation test keys
        "test.navigation.category": "Category",
        "test.navigation.page": "Page",
      };
      return translations[key] || key;
    },
  }),
}));

// Test constants for commonly used values
const TEST_CONSTANTS = {
  urls: {
    test: "https://test.com",
    minimal: "https://minimal.com",
    testPage: "https://test.com/page",
    minimalPage: "https://minimal.com/page",
    testImage: "https://test.com/image.jpg",
    testLogo: "https://test.com/logo.png",
    testArticle: "https://test.com/article",
    testCategory: "https://test.com/category",
    testCategoryPage: "https://test.com/category/page",
    searchTarget: "https://test.com/search?q={search_term_string}",
  },
  contact: {
    email: "test@test.com",
    type: "customer service",
  },
  dates: {
    published: "2023-01-01",
    modified: "2023-01-02",
  },
  publisher: {
    logoWidth: 200,
    logoHeight: 60,
  },
  searchQuery: "required name=search_term_string",
  authorType: "Person",
  webPageType: "WebPage",
  articleType: "Article",
  keywords: {
    test: ["test", "article"],
    travel: ["travel", "test"],
    singleTravel: ["travel"],
  },
};

// Helper function to get translation values (simulating the t function)
const t = (key: string): string => {
  const translations: Record<string, string> = {
    // JSON-LD Organization keys
    "jsonld.organization.name": "GetTravelVisa.com",
    "jsonld.organization.description":
      "Your trusted visa application partner. Simplify your visa application process with our comprehensive visa checking and application services.",
    "jsonld.organization.contact_type": "customer service",

    // JSON-LD Website keys
    "jsonld.website.name": "GetTravelVisa.com",
    "jsonld.website.description":
      "Simplify your visa application process with our comprehensive visa checking and application services. Get expert guidance for travel visas worldwide.",

    // JSON-LD Service keys
    "jsonld.service.name": "Visa Application Services",
    "jsonld.service.description":
      "Comprehensive visa checking and application services for international travel",
    "jsonld.service.area_served": "Worldwide",
    "jsonld.service.service_type": "Travel Services",

    // JSON-LD Blog keys
    "jsonld.blog.title": "Travel Blog",
    "jsonld.blog.article_section": "Travel Blog",

    // Navigation keys
    "navigation.breadcrumb.home": "Home",
    "navigation.header.home": "Home",
    "navigation.header.blog": "Travel Blog",

    // Common keys
    "common.site.title": "Get Travel Visa",

    // Test-specific keys for mock scenarios
    "test.organization.name": "Test Organization",
    "test.organization.description": "Test description",
    "test.website.name": "Test Website",
    "test.website.description": "Test website description",
    "test.page.name": "Test Page",
    "test.page.description": "Test page description",
    "test.article.headline": "Test Article",
    "test.article.description": "Test article description",
    "test.article.section": "Technology",
    "test.service.name": "Test Service",
    "test.service.description": "Test service description",
    "test.faq.question1": "What is this?",
    "test.faq.answer1": "This is a test FAQ.",
    "test.faq.question2": "How does it work?",
    "test.faq.answer2": "It works by testing.",

    // Minimal test keys
    "test.minimal.organization": "Minimal Org",
    "test.minimal.website": "Minimal Website",
    "test.minimal.page": "Minimal Page",
    "test.minimal.article": "Minimal Article",
    "test.minimal.description": "Minimal article description",

    // Navigation test keys
    "test.navigation.category": "Category",
    "test.navigation.page": "Page",
  };
  return translations[key] || key;
};

describe("JSON-LD utilities", () => {
  describe("generateOrganizationJsonLd", () => {
    it("should generate organization JSON-LD with all fields", () => {
      const organization: Organization = {
        name: t("test.organization.name"),
        url: TEST_CONSTANTS.urls.test,
        logo: TEST_CONSTANTS.urls.testLogo,
        description: t("test.organization.description"),
        contactPoint: {
          contactType: TEST_CONSTANTS.contact.type,
          email: TEST_CONSTANTS.contact.email,
        },
      };

      const result = generateOrganizationJsonLd(organization);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: t("test.organization.name"),
        url: TEST_CONSTANTS.urls.test,
        logo: TEST_CONSTANTS.urls.testLogo,
        description: t("test.organization.description"),
        contactPoint: {
          contactType: TEST_CONSTANTS.contact.type,
          email: TEST_CONSTANTS.contact.email,
        },
      });
    });

    it("should generate organization JSON-LD with minimal fields", () => {
      const organization: Organization = {
        name: t("test.minimal.organization"),
        url: TEST_CONSTANTS.urls.minimal,
      };

      const result = generateOrganizationJsonLd(organization);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: t("test.minimal.organization"),
        url: TEST_CONSTANTS.urls.minimal,
      });
    });
  });

  describe("generateWebSiteJsonLd", () => {
    it("should generate website JSON-LD with all fields", () => {
      const website: WebSite = {
        name: t("test.website.name"),
        url: TEST_CONSTANTS.urls.test,
        description: t("test.website.description"),
        potentialAction: {
          target: TEST_CONSTANTS.urls.searchTarget,
          queryInput: TEST_CONSTANTS.searchQuery,
        },
      };

      const result = generateWebSiteJsonLd(website);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: t("test.website.name"),
        url: TEST_CONSTANTS.urls.test,
        description: t("test.website.description"),
        potentialAction: {
          target: TEST_CONSTANTS.urls.searchTarget,
          queryInput: TEST_CONSTANTS.searchQuery,
        },
      });
    });

    it("should generate website JSON-LD with minimal fields", () => {
      const website: WebSite = {
        name: t("test.minimal.website"),
        url: TEST_CONSTANTS.urls.minimal,
      };

      const result = generateWebSiteJsonLd(website);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: t("test.minimal.website"),
        url: TEST_CONSTANTS.urls.minimal,
      });
    });
  });

  describe("generateWebPageJsonLd", () => {
    it("should generate webpage JSON-LD with all fields", () => {
      const webpage: WebPage = {
        name: t("test.page.name"),
        description: t("test.page.description"),
        url: TEST_CONSTANTS.urls.testPage,
        isPartOf: {
          name: t("test.website.name"),
          url: TEST_CONSTANTS.urls.test,
        },
        breadcrumb: {
          itemListElement: [
            {
              position: 1,
              name: t("navigation.breadcrumb.home"),
              item: TEST_CONSTANTS.urls.test,
            },
            {
              position: 2,
              name: t("test.navigation.page"),
              item: TEST_CONSTANTS.urls.testPage,
            },
          ],
        },
        mainEntity: { "@type": TEST_CONSTANTS.articleType },
      };

      const result = generateWebPageJsonLd(webpage);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: t("test.page.name"),
        description: t("test.page.description"),
        url: TEST_CONSTANTS.urls.testPage,
        isPartOf: {
          name: t("test.website.name"),
          url: TEST_CONSTANTS.urls.test,
        },
        breadcrumb: {
          itemListElement: [
            {
              position: 1,
              name: t("navigation.breadcrumb.home"),
              item: TEST_CONSTANTS.urls.test,
            },
            {
              position: 2,
              name: t("test.navigation.page"),
              item: TEST_CONSTANTS.urls.testPage,
            },
          ],
        },
        mainEntity: { "@type": TEST_CONSTANTS.articleType },
      });
    });

    it("should generate webpage JSON-LD with minimal fields", () => {
      const webpage: WebPage = {
        name: t("test.minimal.page"),
        url: TEST_CONSTANTS.urls.minimalPage,
      };

      const result = generateWebPageJsonLd(webpage);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: t("test.minimal.page"),
        url: TEST_CONSTANTS.urls.minimalPage,
      });
    });
  });

  describe("generateArticleJsonLd", () => {
    it("should generate article JSON-LD with all fields", () => {
      const article: Article = {
        headline: t("test.article.headline"),
        description: t("test.article.description"),
        image: TEST_CONSTANTS.urls.testImage,
        author: {
          name: "Test Author",
          type: TEST_CONSTANTS.authorType,
        },
        publisher: {
          name: "Test Publisher",
          logo: {
            url: TEST_CONSTANTS.urls.testLogo,
            width: TEST_CONSTANTS.publisher.logoWidth,
            height: TEST_CONSTANTS.publisher.logoHeight,
          },
        },
        datePublished: TEST_CONSTANTS.dates.published,
        dateModified: TEST_CONSTANTS.dates.modified,
        mainEntityOfPage: {
          type: TEST_CONSTANTS.webPageType,
          id: TEST_CONSTANTS.urls.testArticle,
        },
        articleSection: t("test.article.section"),
        keywords: TEST_CONSTANTS.keywords.test,
      };

      const result = generateArticleJsonLd(article);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: t("test.article.headline"),
        description: t("test.article.description"),
        image: TEST_CONSTANTS.urls.testImage,
        author: {
          name: "Test Author",
          type: TEST_CONSTANTS.authorType,
        },
        publisher: {
          name: "Test Publisher",
          logo: {
            url: TEST_CONSTANTS.urls.testLogo,
            width: TEST_CONSTANTS.publisher.logoWidth,
            height: TEST_CONSTANTS.publisher.logoHeight,
          },
        },
        datePublished: TEST_CONSTANTS.dates.published,
        dateModified: TEST_CONSTANTS.dates.modified,
        mainEntityOfPage: {
          type: TEST_CONSTANTS.webPageType,
          id: TEST_CONSTANTS.urls.testArticle,
        },
        articleSection: t("test.article.section"),
        keywords: TEST_CONSTANTS.keywords.test,
      });
    });

    it("should generate article JSON-LD without optional fields", () => {
      const article: Article = {
        headline: t("test.minimal.article"),
        description: t("test.minimal.description"),
        image: TEST_CONSTANTS.urls.testImage,
        author: {
          name: "Test Author",
          type: TEST_CONSTANTS.authorType,
        },
        publisher: {
          name: "Test Publisher",
          logo: {
            url: TEST_CONSTANTS.urls.testLogo,
            width: TEST_CONSTANTS.publisher.logoWidth,
            height: TEST_CONSTANTS.publisher.logoHeight,
          },
        },
        datePublished: TEST_CONSTANTS.dates.published,
        mainEntityOfPage: {
          type: TEST_CONSTANTS.webPageType,
          id: TEST_CONSTANTS.urls.testArticle,
        },
      };

      const result = generateArticleJsonLd(article);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: t("test.minimal.article"),
        description: t("test.minimal.description"),
        image: TEST_CONSTANTS.urls.testImage,
        author: {
          name: "Test Author",
          type: TEST_CONSTANTS.authorType,
        },
        publisher: {
          name: "Test Publisher",
          logo: {
            url: TEST_CONSTANTS.urls.testLogo,
            width: TEST_CONSTANTS.publisher.logoWidth,
            height: TEST_CONSTANTS.publisher.logoHeight,
          },
        },
        datePublished: TEST_CONSTANTS.dates.published,
        mainEntityOfPage: {
          type: TEST_CONSTANTS.webPageType,
          id: TEST_CONSTANTS.urls.testArticle,
        },
      });
    });
  });

  describe("generateBreadcrumbListJsonLd", () => {
    it("should generate breadcrumb list JSON-LD", () => {
      const breadcrumb: BreadcrumbList = {
        itemListElement: [
          {
            position: 1,
            name: t("navigation.breadcrumb.home"),
            item: TEST_CONSTANTS.urls.test,
          },
          {
            position: 2,
            name: t("test.navigation.category"),
            item: TEST_CONSTANTS.urls.testCategory,
          },
          {
            position: 3,
            name: t("test.navigation.page"),
            item: TEST_CONSTANTS.urls.testCategoryPage,
          },
        ],
      };

      const result = generateBreadcrumbListJsonLd(breadcrumb);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            position: 1,
            name: t("navigation.breadcrumb.home"),
            item: TEST_CONSTANTS.urls.test,
          },
          {
            position: 2,
            name: t("test.navigation.category"),
            item: TEST_CONSTANTS.urls.testCategory,
          },
          {
            position: 3,
            name: t("test.navigation.page"),
            item: TEST_CONSTANTS.urls.testCategoryPage,
          },
        ],
      });
    });
  });

  describe("generateFAQJsonLd", () => {
    it("should generate FAQ JSON-LD", () => {
      const faqs = [
        {
          question: t("test.faq.question1"),
          answer: t("test.faq.answer1"),
        },
        {
          question: t("test.faq.question2"),
          answer: t("test.faq.answer2"),
        },
      ];

      const result = generateFAQJsonLd(faqs);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: t("test.faq.question1"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("test.faq.answer1"),
            },
          },
          {
            "@type": "Question",
            name: t("test.faq.question2"),
            acceptedAnswer: {
              "@type": "Answer",
              text: t("test.faq.answer2"),
            },
          },
        ],
      });
    });
  });

  describe("generateServiceJsonLd", () => {
    it("should generate service JSON-LD", () => {
      const service = {
        name: t("test.service.name"),
        description: t("test.service.description"),
        provider: defaultOrganization,
        areaServed: t("jsonld.service.area_served"),
        serviceType: t("test.service.name"),
      };

      const result = generateServiceJsonLd(service);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "Service",
        name: t("test.service.name"),
        description: t("test.service.description"),
        provider: generateOrganizationJsonLd(defaultOrganization),
        areaServed: t("jsonld.service.area_served"),
        serviceType: t("test.service.name"),
      });
    });
  });

  describe("generateBlogPostJsonLd", () => {
    it("should generate blog post JSON-LD from BlogPostData", async () => {
      const blogPost: BlogPostData = {
        content: "Test content",
        slug: "test-post",
        frontmatter: {
          title: "Test Blog Post",
          description: "Test blog post description",
          destinations: ["USA"],
          image: "https://test.com/image.jpg",
          tags: ["travel", "test"],
          author: "Test Author",
          publishedAt: "2023-01-01",
          lastUpdated: "2023-01-02",
        },
        destinationNames: ["United States"],
      };

      const result = await generateBlogPostJsonLd(
        blogPost,
        "en",
        "https://test.com"
      );

      expect(result).toEqual({
        headline: "Test Blog Post",
        description: "Test blog post description",
        image: "https://test.com/image.jpg",
        author: {
          name: "Test Author",
          type: "Person",
        },
        publisher: {
          name: t("jsonld.organization.name"),
          logo: {
            url: "https://test.com/logo.png",
            width: 200,
            height: 60,
          },
        },
        datePublished: "2023-01-01",
        dateModified: "2023-01-02",
        mainEntityOfPage: {
          type: "WebPage",
          id: "https://test.com/en/blog/test-post",
        },
        articleSection: t("jsonld.blog.title"),
        keywords: ["travel", "test"],
      });
    });

    it("should handle blog post without lastUpdated", async () => {
      const blogPost: BlogPostData = {
        content: "Test content",
        slug: "test-post",
        frontmatter: {
          title: "Test Blog Post",
          description: "Test blog post description",
          destinations: ["USA"],
          image: "https://test.com/image.jpg",
          tags: ["travel"],
          author: "Test Author",
          publishedAt: "2023-01-01",
        },
      };

      const result = await generateBlogPostJsonLd(
        blogPost,
        "en",
        "https://test.com"
      );

      expect(result.dateModified).toBe("2023-01-01");
    });
  });

  describe("default constants", () => {
    it("should have correct default organization data", () => {
      expect(defaultOrganization.name).toBe(t("jsonld.organization.name"));
      expect(defaultOrganization.url).toBe(getBaseUrl());
      expect(defaultOrganization.logo).toBe(`${getBaseUrl()}/logo.png`);
      expect(defaultOrganization.contactPoint?.email).toBe(
        "info@gettravelvisa.com"
      );
    });

    it("should have correct default website data", () => {
      expect(defaultWebSite.name).toBe(t("jsonld.website.name"));
      expect(defaultWebSite.url).toBe(getBaseUrl());
      expect(defaultWebSite.potentialAction?.target).toContain("search");
    });
  });
});
