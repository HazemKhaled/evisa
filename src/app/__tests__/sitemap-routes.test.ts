import { NextRequest } from "next/server";
import { GET as getSitemapIndex } from "../sitemap_index.xml/route";
import { GET as getMainSitemap } from "../sitemap.xml/route";
import { GET as getDestinationSitemap } from "../d/[country]/sitemap.xml/route";
import { GET as getRobotsTxt } from "../robots.txt/route";
import { GET as getManifest } from "../manifest.json/route";

// Mock the sitemap library
jest.mock("@/lib/sitemap", () => ({
  generateSitemapIndex: jest.fn(),
  generateSitemapIndexXml: jest.fn(),
  generateMainSitemap: jest.fn(),
  generateSitemapXml: jest.fn(),
  generateDestinationSitemap: jest.fn(),
}));

// Mock environment variables
const originalEnv = process.env;
beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_SITE_URL: "https://gettravelvisa.com",
    NODE_ENV: "production",
  };
});

afterEach(() => {
  process.env = originalEnv;
  jest.clearAllMocks();
});

describe("Sitemap Routes", () => {
  describe("GET /sitemap_index.xml", () => {
    it("should return sitemap index XML", async () => {
      const { generateSitemapIndex, generateSitemapIndexXml } = await import(
        "@/lib/sitemap"
      );

      const mockSitemaps = [
        {
          url: "https://gettravelvisa.com/sitemap.xml",
          lastmod: "2024-01-01T00:00:00.000Z",
        },
        {
          url: "https://gettravelvisa.com/d/usa/sitemap.xml",
          lastmod: "2024-01-01T00:00:00.000Z",
        },
      ];
      const mockXml =
        '<?xml version="1.0" encoding="UTF-8"?><sitemapindex>...</sitemapindex>';

      generateSitemapIndex.mockResolvedValue(mockSitemaps);
      generateSitemapIndexXml.mockReturnValue(mockXml);

      const request = new NextRequest(
        "https://gettravelvisa.com/sitemap_index.xml"
      );
      const response = await getSitemapIndex(request);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/xml");
      expect(response.headers.get("Cache-Control")).toBe(
        "public, max-age=3600, s-maxage=3600"
      );

      const text = await response.text();
      expect(text).toBe(mockXml);
    });

    it("should handle errors gracefully", async () => {
      const { generateSitemapIndex } = await import("@/lib/sitemap");

      generateSitemapIndex.mockRejectedValue(new Error("Database error"));

      const request = new NextRequest(
        "https://gettravelvisa.com/sitemap_index.xml"
      );
      const response = await getSitemapIndex(request);

      expect(response.status).toBe(500);
      const text = await response.text();
      expect(text).toBe("Error generating sitemap index");
    });
  });

  describe("GET /sitemap.xml", () => {
    it("should return main sitemap XML", async () => {
      const { generateMainSitemap, generateSitemapXml } = await import(
        "@/lib/sitemap"
      );

      const mockUrls = [
        {
          url: "https://gettravelvisa.com",
          priority: "1.0",
          changefreq: "daily",
        },
        {
          url: "https://gettravelvisa.com/contact",
          priority: "0.8",
          changefreq: "monthly",
        },
      ];
      const mockXml =
        '<?xml version="1.0" encoding="UTF-8"?><urlset>...</urlset>';

      generateMainSitemap.mockResolvedValue(mockUrls);
      generateSitemapXml.mockReturnValue(mockXml);

      const request = new NextRequest("https://gettravelvisa.com/sitemap.xml");
      const response = await getMainSitemap(request);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/xml");
      expect(response.headers.get("Cache-Control")).toBe(
        "public, max-age=3600, s-maxage=3600"
      );

      const text = await response.text();
      expect(text).toBe(mockXml);
    });

    it("should handle errors gracefully", async () => {
      const { generateMainSitemap } = await import("@/lib/sitemap");

      generateMainSitemap.mockRejectedValue(new Error("Database error"));

      const request = new NextRequest("https://gettravelvisa.com/sitemap.xml");
      const response = await getMainSitemap(request);

      expect(response.status).toBe(500);
      const text = await response.text();
      expect(text).toBe("Error generating main sitemap");
    });
  });

  describe("GET /d/[country]/sitemap.xml", () => {
    it("should return destination sitemap XML", async () => {
      const { generateDestinationSitemap, generateSitemapXml } = await import(
        "@/lib/sitemap"
      );

      const mockUrls = [
        {
          url: "https://gettravelvisa.com/d/usa",
          priority: "1.0",
          changefreq: "daily",
        },
        {
          url: "https://gettravelvisa.com/d/usa/v/tourist-visa",
          priority: "0.8",
          changefreq: "monthly",
        },
      ];
      const mockXml =
        '<?xml version="1.0" encoding="UTF-8"?><urlset>...</urlset>';

      generateDestinationSitemap.mockResolvedValue(mockUrls);
      generateSitemapXml.mockReturnValue(mockXml);

      const request = new NextRequest(
        "https://gettravelvisa.com/d/usa/sitemap.xml"
      );
      const response = await getDestinationSitemap(request, {
        params: { country: "usa" },
      });

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/xml");
      expect(response.headers.get("Cache-Control")).toBe(
        "public, max-age=3600, s-maxage=3600"
      );

      const text = await response.text();
      expect(text).toBe(mockXml);
    });

    it("should return 404 for non-existent country", async () => {
      const { generateDestinationSitemap } = await import("@/lib/sitemap");

      generateDestinationSitemap.mockResolvedValue([]);

      const request = new NextRequest(
        "https://gettravelvisa.com/d/invalid/sitemap.xml"
      );
      const response = await getDestinationSitemap(request, {
        params: { country: "invalid" },
      });

      expect(response.status).toBe(404);
      const text = await response.text();
      expect(text).toBe("Country not found");
    });

    it("should handle errors gracefully", async () => {
      const { generateDestinationSitemap } = await import("@/lib/sitemap");

      generateDestinationSitemap.mockRejectedValue(new Error("Database error"));

      const request = new NextRequest(
        "https://gettravelvisa.com/d/usa/sitemap.xml"
      );
      const response = await getDestinationSitemap(request, {
        params: { country: "usa" },
      });

      expect(response.status).toBe(500);
      const text = await response.text();
      expect(text).toBe("Error generating destination sitemap");
    });
  });

  describe("GET /robots.txt", () => {
    it("should return robots.txt for production", async () => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "production",
        writable: true,
      });

      const request = new NextRequest("https://gettravelvisa.com/robots.txt");
      const response = await getRobotsTxt(request);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/plain");
      expect(response.headers.get("Cache-Control")).toBe(
        "public, max-age=86400, s-maxage=86400"
      );

      const text = await response.text();
      expect(text).toContain("User-agent: *");
      expect(text).toContain("Allow: /");
      expect(text).toContain(
        "Sitemap: https://gettravelvisa.com/sitemap_index.xml"
      );
      expect(text).toContain("Sitemap: https://gettravelvisa.com/sitemap.xml");
    });

    it("should return robots.txt for development", async () => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "development",
        writable: true,
      });

      const request = new NextRequest("https://gettravelvisa.com/robots.txt");
      const response = await getRobotsTxt(request);

      expect(response.status).toBe(200);

      const text = await response.text();
      expect(text).toContain("Disallow: /");
    });

    it("should handle errors gracefully", async () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const request = new NextRequest("https://gettravelvisa.com/robots.txt");
      const response = await getRobotsTxt(request);

      expect(response.status).toBe(200); // robots.txt should not fail even with errors

      consoleSpy.mockRestore();
    });
  });

  describe("GET /manifest.json", () => {
    it("should return manifest.json", async () => {
      const request = new NextRequest(
        "https://gettravelvisa.com/manifest.json"
      );
      const response = await getManifest(request);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/json");
      expect(response.headers.get("Cache-Control")).toBe(
        "public, max-age=86400, s-maxage=86400"
      );

      const json = (await response.json()) as Record<string, unknown>;
      expect(json.name).toBe("GetTravelVisa - Visa Processing Made Easy");
      expect(json.short_name).toBe("GetTravelVisa");
      expect(json.start_url).toBe("/");
      expect(json.display).toBe("standalone");
      expect(json.icons).toBeDefined();
      expect(json.icons.length).toBeGreaterThan(0);
    });

    it("should use default site URL when environment variable is not set", async () => {
      process.env.NEXT_PUBLIC_SITE_URL = undefined;

      const request = new NextRequest(
        "https://gettravelvisa.com/manifest.json"
      );
      const response = await getManifest(request);

      expect(response.status).toBe(200);

      const json = (await response.json()) as Record<string, unknown>;
      expect(json.name).toBe("GetTravelVisa - Visa Processing Made Easy");
    });

    it("should handle errors gracefully", async () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const request = new NextRequest(
        "https://gettravelvisa.com/manifest.json"
      );
      const response = await getManifest(request);

      expect(response.status).toBe(200); // manifest.json should not fail even with errors

      consoleSpy.mockRestore();
    });
  });
});
