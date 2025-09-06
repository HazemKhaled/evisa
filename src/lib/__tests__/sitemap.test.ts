import type { MetadataRoute } from "next";

// Mock the environment variable
const mockBaseUrl = "https://test-gettravelvisa.com";
process.env.NEXT_PUBLIC_BASE_URL = mockBaseUrl;

// Mock Next.js server components
global.Request = class Request {
  constructor(
    public url: string,
    public init?: RequestInit
  ) {}
} as unknown as typeof Request;

global.Response = class Response {
  constructor(
    public body: string,
    public init?: ResponseInit
  ) {}
  text() {
    return Promise.resolve(this.body);
  }
  headers = new Map<string, string>();
  get(name: string) {
    return this.headers.get(name);
  }
} as unknown as typeof Response;

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: class NextResponse {
    constructor(
      public body: string,
      public init?: ResponseInit
    ) {
      this.headers = new Map<string, string>();
      if (init?.headers) {
        Object.entries(init.headers).forEach(([key, value]) => {
          this.headers.set(key, value as string);
        });
      }
    }
    text() {
      return Promise.resolve(this.body);
    }
    headers = new Map<string, string>();
    get(name: string) {
      return this.headers.get(name);
    }
  },
}));

// Mock the i18n settings
jest.mock("../../app/i18n/settings", () => ({
  languages: ["en", "es", "ar", "pt", "ru", "de", "fr", "it"],
}));

// Mock the generated blog data
jest.mock("../generated-blog-data", () => ({
  GENERATED_BLOG_DATA: {
    en: [
      {
        slug: "test-post-1",
        frontmatter: {
          title: "Test Post 1",
          publishedAt: "2024-01-01",
          lastUpdated: "2024-01-02",
          tags: ["travel", "visa"],
        },
      },
      {
        slug: "test-post-2",
        frontmatter: {
          title: "Test Post 2",
          publishedAt: "2024-01-03",
          tags: ["tourism"],
        },
      },
    ],
    es: [
      {
        slug: "test-post-es-1",
        frontmatter: {
          title: "Post de Prueba 1",
          publishedAt: "2024-01-01",
          tags: ["viaje", "visa"],
        },
      },
    ],
    ar: [],
    pt: [],
    ru: [],
    de: [],
    fr: [],
    it: [],
  },
}));

describe("Sitemap Functions", () => {
  describe("Main Sitemap", () => {
    let sitemap: () => MetadataRoute.Sitemap;

    beforeEach(async () => {
      // Dynamic import to ensure mocks are applied
      const sitemapModule = await import("../../app/sitemap");
      sitemap = sitemapModule.default;
    });

    it("should generate sitemap with correct structure", () => {
      const result = sitemap();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      // Check that each entry has required fields
      result.forEach(entry => {
        expect(entry).toHaveProperty("url");
        expect(entry).toHaveProperty("lastModified");
        expect(entry).toHaveProperty("alternates");
        expect(entry.alternates).toHaveProperty("languages");
      });
    });

    it("should include home page with correct alternates", () => {
      const result = sitemap();
      const homePage = result.find(entry => entry.url === mockBaseUrl);

      expect(homePage).toBeDefined();
      expect(homePage?.alternates?.languages).toHaveProperty("en", mockBaseUrl);
      expect(homePage?.alternates?.languages).toHaveProperty(
        "es",
        `${mockBaseUrl}/es`
      );
      expect(homePage?.alternates?.languages).toHaveProperty(
        "ar",
        `${mockBaseUrl}/ar`
      );
    });

    it("should include static pages with localized URLs", () => {
      const result = sitemap();
      const contactPage = result.find(
        entry => entry.url === `${mockBaseUrl}/en/contact`
      );

      expect(contactPage).toBeDefined();
      expect(contactPage?.alternates?.languages).toHaveProperty(
        "en",
        `${mockBaseUrl}/en/contact`
      );
      expect(contactPage?.alternates?.languages).toHaveProperty(
        "es",
        `${mockBaseUrl}/es/contact`
      );
    });

    it("should have correct priorities", () => {
      const result = sitemap();
      const homePage = result.find(entry => entry.url === mockBaseUrl);
      const otherPage = result.find(
        entry => entry.url === `${mockBaseUrl}/en/contact`
      );

      expect(homePage?.priority).toBe(1);
      expect(otherPage?.priority).toBe(0.8);
    });

    it("should have correct change frequencies", () => {
      const result = sitemap();
      const homePage = result.find(entry => entry.url === mockBaseUrl);
      const otherPage = result.find(
        entry => entry.url === `${mockBaseUrl}/en/contact`
      );

      expect(homePage?.changeFrequency).toBe("daily");
      expect(otherPage?.changeFrequency).toBe("monthly");
    });
  });

  describe("Blog Sitemap", () => {
    let blogSitemap: ({ id }: { id: string }) => MetadataRoute.Sitemap;
    let generateSitemaps: () => Promise<{ id: string }[]>;

    beforeEach(async () => {
      // Dynamic import to ensure mocks are applied
      const blogSitemapModule = await import("../../app/[locale]/blog/sitemap");
      blogSitemap = blogSitemapModule.default;
      generateSitemaps = blogSitemapModule.generateSitemaps;
    });

    it("should generate sitemaps for all locales", async () => {
      const sitemaps = await generateSitemaps();

      expect(Array.isArray(sitemaps)).toBe(true);
      expect(sitemaps.length).toBe(8); // All languages

      sitemaps.forEach(sitemap => {
        expect(sitemap).toHaveProperty("id");
        expect(typeof sitemap.id).toBe("string");
      });
    });

    it("should generate blog sitemap for English locale", () => {
      const result = blogSitemap({ id: "en" });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      // Should include blog index
      const blogIndex = result.find(
        entry => entry.url === `${mockBaseUrl}/en/blog`
      );
      expect(blogIndex).toBeDefined();
    });

    it("should include blog posts with correct URLs", () => {
      const result = blogSitemap({ id: "en" });

      const blogPost = result.find(
        entry => entry.url === `${mockBaseUrl}/en/blog/test-post-1`
      );
      expect(blogPost).toBeDefined();
      expect(blogPost?.priority).toBe(0.6);
      expect(blogPost?.changeFrequency).toBe("monthly");
    });

    it("should include tag pages", () => {
      const result = blogSitemap({ id: "en" });

      const travelTag = result.find(
        entry => entry.url === `${mockBaseUrl}/en/blog/t/travel`
      );
      const visaTag = result.find(
        entry => entry.url === `${mockBaseUrl}/en/blog/t/visa`
      );

      expect(travelTag).toBeDefined();
      expect(visaTag).toBeDefined();
      expect(travelTag?.priority).toBe(0.5);
      expect(travelTag?.changeFrequency).toBe("weekly");
    });

    it("should handle empty locale data gracefully", () => {
      const result = blogSitemap({ id: "ar" });

      expect(Array.isArray(result)).toBe(true);
      // Should at least include blog index even if no posts
      expect(result.length).toBeGreaterThanOrEqual(1);

      const blogIndex = result.find(
        entry => entry.url === `${mockBaseUrl}/ar/blog`
      );
      expect(blogIndex).toBeDefined();
    });

    it("should use lastUpdated date when available", () => {
      const result = blogSitemap({ id: "en" });

      const blogPost = result.find(
        entry => entry.url === `${mockBaseUrl}/en/blog/test-post-1`
      );
      expect(blogPost).toBeDefined();
      expect(blogPost?.lastModified).toEqual(new Date("2024-01-02"));
    });

    it("should fall back to publishedAt date when lastUpdated is not available", () => {
      const result = blogSitemap({ id: "en" });

      const blogPost = result.find(
        entry => entry.url === `${mockBaseUrl}/en/blog/test-post-2`
      );
      expect(blogPost).toBeDefined();
      expect(blogPost?.lastModified).toEqual(new Date("2024-01-03"));
    });

    it("should generate correct alternates for blog index", () => {
      const result = blogSitemap({ id: "en" });

      const blogIndex = result.find(
        entry => entry.url === `${mockBaseUrl}/en/blog`
      );
      expect(blogIndex?.alternates?.languages).toHaveProperty(
        "en",
        `${mockBaseUrl}/en/blog`
      );
      expect(blogIndex?.alternates?.languages).toHaveProperty(
        "es",
        `${mockBaseUrl}/es/blog`
      );
      expect(blogIndex?.alternates?.languages).toHaveProperty(
        "ar",
        `${mockBaseUrl}/ar/blog`
      );
    });
  });

  describe("Sitemap Index", () => {
    let sitemapIndexHandler: () => Promise<Response>;

    beforeEach(async () => {
      // Dynamic import to ensure mocks are applied
      const sitemapIndexModule = await import(
        "../../app/sitemap-index.xml/route"
      );
      sitemapIndexHandler = sitemapIndexModule.GET;
    });

    it("should generate sitemap index XML with correct structure", async () => {
      const response = await sitemapIndexHandler();
      const xml = await response.text();

      expect(response.headers.get("Content-Type")).toBe("application/xml");
      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml).toContain(
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
      );
      expect(xml).toContain("</sitemapindex>");
    });

    it("should include main sitemap in XML", async () => {
      const response = await sitemapIndexHandler();
      const xml = await response.text();

      expect(xml).toContain(`<loc>${mockBaseUrl}/sitemap.xml</loc>`);
    });

    it("should include blog sitemaps for all locales in XML", async () => {
      const response = await sitemapIndexHandler();
      const xml = await response.text();

      const languages = ["en", "es", "ar", "pt", "ru", "de", "fr", "it"];
      languages.forEach(locale => {
        expect(xml).toContain(
          `<loc>${mockBaseUrl}/${locale}/blog/sitemap.xml</loc>`
        );
      });
    });

    it("should include lastmod dates in XML", async () => {
      const response = await sitemapIndexHandler();
      const xml = await response.text();

      expect(xml).toContain("<lastmod>");
      // Should have lastmod for each sitemap entry
      const lastmodCount = (xml.match(/<lastmod>/g) || []).length;
      expect(lastmodCount).toBeGreaterThan(0);
    });
  });

  describe("URL Generation", () => {
    it("should handle missing environment variable gracefully", async () => {
      const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;
      delete process.env.NEXT_PUBLIC_BASE_URL;

      // Clear module cache for consts
      jest.resetModules();

      // Re-import module to pick up environment change
      const { default: sitemap } = await import("../../app/sitemap");
      const result = sitemap();
      expect(result[0].url).toMatch(/^https:\/\/gettravelvisa\.com/);

      // Restore environment
      process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
    });

    it("should generate valid URLs", () => {
      const urlPattern = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;

      return import("../../app/sitemap").then(module => {
        const result = module.default();

        result.forEach((entry: MetadataRoute.Sitemap[0]) => {
          expect(entry.url).toMatch(urlPattern);

          // Check alternates URLs
          if (entry.alternates?.languages) {
            Object.values(entry.alternates.languages).forEach(url => {
              if (url) {
                expect(url).toMatch(urlPattern);
              }
            });
          }
        });
      });
    });
  });
});
