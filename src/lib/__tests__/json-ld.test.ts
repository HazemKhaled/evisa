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
import { BlogPostData } from "../blog";
import { getBaseUrl } from "../utils/urls";

describe("JSON-LD utilities", () => {
  describe("generateOrganizationJsonLd", () => {
    it("should generate organization JSON-LD with all fields", () => {
      const organization: Organization = {
        name: "Test Organization",
        url: "https://test.com",
        logo: "https://test.com/logo.png",
        description: "Test description",
        contactPoint: {
          telephone: "+1-555-0123",
          contactType: "customer service",
          email: "test@test.com",
        },
        address: {
          streetAddress: "123 Test St",
          addressLocality: "Test City",
          addressRegion: "TS",
          postalCode: "12345",
          addressCountry: "US",
        },
      };

      const result = generateOrganizationJsonLd(organization);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Test Organization",
        url: "https://test.com",
        logo: "https://test.com/logo.png",
        description: "Test description",
        contactPoint: {
          telephone: "+1-555-0123",
          contactType: "customer service",
          email: "test@test.com",
        },
        address: {
          streetAddress: "123 Test St",
          addressLocality: "Test City",
          addressRegion: "TS",
          postalCode: "12345",
          addressCountry: "US",
        },
      });
    });

    it("should generate organization JSON-LD with minimal fields", () => {
      const organization: Organization = {
        name: "Minimal Org",
        url: "https://minimal.com",
      };

      const result = generateOrganizationJsonLd(organization);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Minimal Org",
        url: "https://minimal.com",
      });
    });
  });

  describe("generateWebSiteJsonLd", () => {
    it("should generate website JSON-LD with all fields", () => {
      const website: WebSite = {
        name: "Test Website",
        url: "https://test.com",
        description: "Test website description",
        potentialAction: {
          target: "https://test.com/search?q={search_term_string}",
          queryInput: "required name=search_term_string",
        },
      };

      const result = generateWebSiteJsonLd(website);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Test Website",
        url: "https://test.com",
        description: "Test website description",
        potentialAction: {
          target: "https://test.com/search?q={search_term_string}",
          queryInput: "required name=search_term_string",
        },
      });
    });

    it("should generate website JSON-LD with minimal fields", () => {
      const website: WebSite = {
        name: "Minimal Website",
        url: "https://minimal.com",
      };

      const result = generateWebSiteJsonLd(website);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Minimal Website",
        url: "https://minimal.com",
      });
    });
  });

  describe("generateWebPageJsonLd", () => {
    it("should generate webpage JSON-LD with all fields", () => {
      const webpage: WebPage = {
        name: "Test Page",
        description: "Test page description",
        url: "https://test.com/page",
        isPartOf: {
          name: "Test Website",
          url: "https://test.com",
        },
        breadcrumb: {
          itemListElement: [
            {
              position: 1,
              name: "Home",
              item: "https://test.com",
            },
            {
              position: 2,
              name: "Page",
              item: "https://test.com/page",
            },
          ],
        },
        mainEntity: { "@type": "Article" },
      };

      const result = generateWebPageJsonLd(webpage);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Test Page",
        description: "Test page description",
        url: "https://test.com/page",
        isPartOf: {
          name: "Test Website",
          url: "https://test.com",
        },
        breadcrumb: {
          itemListElement: [
            {
              position: 1,
              name: "Home",
              item: "https://test.com",
            },
            {
              position: 2,
              name: "Page",
              item: "https://test.com/page",
            },
          ],
        },
        mainEntity: { "@type": "Article" },
      });
    });

    it("should generate webpage JSON-LD with minimal fields", () => {
      const webpage: WebPage = {
        name: "Minimal Page",
        url: "https://minimal.com/page",
      };

      const result = generateWebPageJsonLd(webpage);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Minimal Page",
        url: "https://minimal.com/page",
      });
    });
  });

  describe("generateArticleJsonLd", () => {
    it("should generate article JSON-LD with all fields", () => {
      const article: Article = {
        headline: "Test Article",
        description: "Test article description",
        image: "https://test.com/image.jpg",
        author: {
          name: "Test Author",
          type: "Person",
        },
        publisher: {
          name: "Test Publisher",
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
          id: "https://test.com/article",
        },
        articleSection: "Technology",
        keywords: ["test", "article"],
      };

      const result = generateArticleJsonLd(article);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Test Article",
        description: "Test article description",
        image: "https://test.com/image.jpg",
        author: {
          name: "Test Author",
          type: "Person",
        },
        publisher: {
          name: "Test Publisher",
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
          id: "https://test.com/article",
        },
        articleSection: "Technology",
        keywords: ["test", "article"],
      });
    });

    it("should generate article JSON-LD without optional fields", () => {
      const article: Article = {
        headline: "Minimal Article",
        description: "Minimal article description",
        image: "https://test.com/image.jpg",
        author: {
          name: "Test Author",
          type: "Person",
        },
        publisher: {
          name: "Test Publisher",
          logo: {
            url: "https://test.com/logo.png",
            width: 200,
            height: 60,
          },
        },
        datePublished: "2023-01-01",
        mainEntityOfPage: {
          type: "WebPage",
          id: "https://test.com/article",
        },
      };

      const result = generateArticleJsonLd(article);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Minimal Article",
        description: "Minimal article description",
        image: "https://test.com/image.jpg",
        author: {
          name: "Test Author",
          type: "Person",
        },
        publisher: {
          name: "Test Publisher",
          logo: {
            url: "https://test.com/logo.png",
            width: 200,
            height: 60,
          },
        },
        datePublished: "2023-01-01",
        mainEntityOfPage: {
          type: "WebPage",
          id: "https://test.com/article",
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
            name: "Home",
            item: "https://test.com",
          },
          {
            position: 2,
            name: "Category",
            item: "https://test.com/category",
          },
          {
            position: 3,
            name: "Page",
            item: "https://test.com/category/page",
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
            name: "Home",
            item: "https://test.com",
          },
          {
            position: 2,
            name: "Category",
            item: "https://test.com/category",
          },
          {
            position: 3,
            name: "Page",
            item: "https://test.com/category/page",
          },
        ],
      });
    });
  });

  describe("generateFAQJsonLd", () => {
    it("should generate FAQ JSON-LD", () => {
      const faqs = [
        {
          question: "What is this?",
          answer: "This is a test FAQ.",
        },
        {
          question: "How does it work?",
          answer: "It works by testing.",
        },
      ];

      const result = generateFAQJsonLd(faqs);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is this?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This is a test FAQ.",
            },
          },
          {
            "@type": "Question",
            name: "How does it work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It works by testing.",
            },
          },
        ],
      });
    });
  });

  describe("generateServiceJsonLd", () => {
    it("should generate service JSON-LD", () => {
      const service = {
        name: "Test Service",
        description: "Test service description",
        provider: defaultOrganization,
        areaServed: "Worldwide",
        serviceType: "Test Service",
      };

      const result = generateServiceJsonLd(service);

      expect(result).toEqual({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Test Service",
        description: "Test service description",
        provider: generateOrganizationJsonLd(defaultOrganization),
        areaServed: "Worldwide",
        serviceType: "Test Service",
      });
    });
  });

  describe("generateBlogPostJsonLd", () => {
    it("should generate blog post JSON-LD from BlogPostData", () => {
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

      const result = generateBlogPostJsonLd(blogPost, "en", "https://test.com");

      expect(result).toEqual({
        headline: "Test Blog Post",
        description: "Test blog post description",
        image: "https://test.com/image.jpg",
        author: {
          name: "Test Author",
          type: "Person",
        },
        publisher: {
          name: "GetTravelVisa.com",
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
        articleSection: "Travel Blog",
        keywords: ["travel", "test"],
      });
    });

    it("should handle blog post without lastUpdated", () => {
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

      const result = generateBlogPostJsonLd(blogPost, "en", "https://test.com");

      expect(result.dateModified).toBe("2023-01-01");
    });
  });

  describe("default constants", () => {
    it("should have correct default organization data", () => {
      expect(defaultOrganization.name).toBe("GetTravelVisa.com");
      expect(defaultOrganization.url).toBe(getBaseUrl());
      expect(defaultOrganization.logo).toBe(`${getBaseUrl()}/logo.png`);
      expect(defaultOrganization.contactPoint?.email).toBe(
        "info@gettravelvisa.com"
      );
    });

    it("should have correct default website data", () => {
      expect(defaultWebSite.name).toBe("GetTravelVisa.com");
      expect(defaultWebSite.url).toBe(getBaseUrl());
      expect(defaultWebSite.potentialAction?.target).toContain("search");
    });
  });
});
