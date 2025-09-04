import {
  generateSitemapIndex,
  generateMainSitemap,
  generateDestinationSitemap,
  generateSitemapXml,
  generateSitemapIndexXml,
  type SitemapUrl,
} from '../sitemap';

// Mock the database connection
jest.mock('@/lib/db/connection', () => ({
  getDbAsync: jest.fn(),
}));

// Mock environment variables
const originalEnv = process.env;
beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_SITE_URL: 'https://gettravelvisa.com',
  };
});

afterEach(() => {
  process.env = originalEnv;
});

describe('Sitemap Generation', () => {
  describe('generateSitemapIndex', () => {
    it('should generate sitemap index with main sitemap and destination sitemaps', async () => {
      const { getDbAsync } = require('@/lib/db/connection');
      
      // Mock database with active countries
      const mockDb = {
        query: {
          countries: {
            findMany: jest.fn().mockResolvedValue([
              { code: 'USA' },
              { code: 'UAE' },
              { code: 'GBR' },
            ]),
          },
        },
      };
      getDbAsync.mockResolvedValue(mockDb);

      const result = await generateSitemapIndex();

      expect(result).toHaveLength(4); // 1 main sitemap + 3 destination sitemaps
      expect(result[0].url).toBe('https://gettravelvisa.com/sitemap.xml');
      expect(result[1].url).toBe('https://gettravelvisa.com/d/usa/sitemap.xml');
      expect(result[2].url).toBe('https://gettravelvisa.com/d/uae/sitemap.xml');
      expect(result[3].url).toBe('https://gettravelvisa.com/d/gbr/sitemap.xml');
    });

    it('should handle database errors gracefully', async () => {
      const { getDbAsync } = require('@/lib/db/connection');
      
      getDbAsync.mockRejectedValue(new Error('Database error'));

      const result = await generateSitemapIndex();

      expect(result).toEqual([]);
    });
  });

  describe('generateMainSitemap', () => {
    it('should generate main sitemap with static pages', async () => {
      const result = await generateMainSitemap();

      expect(result).toHaveLength(5);
      expect(result[0].url).toBe('https://gettravelvisa.com');
      expect(result[0].priority).toBe('1.0');
      expect(result[0].changefreq).toBe('daily');
      
      expect(result[1].url).toBe('https://gettravelvisa.com/contact');
      expect(result[1].priority).toBe('0.8');
      expect(result[1].changefreq).toBe('monthly');
    });

    it('should use default site URL when environment variable is not set', async () => {
      process.env.NEXT_PUBLIC_SITE_URL = undefined;

      const result = await generateMainSitemap();

      expect(result[0].url).toBe('https://gettravelvisa.com');
    });
  });

  describe('generateDestinationSitemap', () => {
    it('should generate destination sitemap with all related pages', async () => {
      const { getDbAsync } = require('@/lib/db/connection');
      
      // Mock database with all required data
      const mockDb = {
        query: {
          countries: {
            findFirst: jest.fn().mockResolvedValue({
              id: 1,
              code: 'USA',
            }),
          },
          visaTypes: {
            findMany: jest.fn().mockResolvedValue([
              { id: 1, slug: 'tourist-visa' },
              { id: 2, slug: 'business-visa' },
            ]),
          },
          visaEligibility: {
            findMany: jest.fn().mockResolvedValue([
              {
                passportCountry: { code: 'GBR' },
              },
              {
                passportCountry: { code: 'DEU' },
              },
            ]),
          },
        },
      };
      getDbAsync.mockResolvedValue(mockDb);

      const result = await generateDestinationSitemap('usa');

      expect(result.length).toBeGreaterThan(0);
      
      // Check main destination page
      const mainPage = result.find(url => url.url.includes('/d/usa') && !url.url.includes('/v/') && !url.url.includes('/p/'));
      expect(mainPage).toBeDefined();
      expect(mainPage?.priority).toBe('1.0');

      // Check visa type pages
      const visaPages = result.filter(url => url.url.includes('/v/'));
      expect(visaPages).toHaveLength(2);

      // Check passport pages
      const passportPages = result.filter(url => url.url.includes('/p/'));
      expect(passportPages).toHaveLength(2);
    });

    it('should return empty array for non-existent country', async () => {
      const { getDbAsync } = require('@/lib/db/connection');
      
      const mockDb = {
        query: {
          countries: {
            findFirst: jest.fn().mockResolvedValue(null),
          },
        },
      };
      getDbAsync.mockResolvedValue(mockDb);

      const result = await generateDestinationSitemap('invalid');

      expect(result).toEqual([]);
    });

    it('should handle database errors gracefully', async () => {
      const { getDbAsync } = require('@/lib/db/connection');
      
      getDbAsync.mockRejectedValue(new Error('Database error'));

      const result = await generateDestinationSitemap('usa');

      expect(result).toEqual([]);
    });
  });

  describe('generateSitemapXml', () => {
    it('should generate valid XML for sitemap', () => {
      const urls: SitemapUrl[] = [
        {
          url: 'https://gettravelvisa.com',
          lastmod: '2024-01-01T00:00:00.000Z',
          changefreq: 'daily',
          priority: '1.0',
        },
        {
          url: 'https://gettravelvisa.com/contact',
          lastmod: '2024-01-01T00:00:00.000Z',
          changefreq: 'monthly',
          priority: '0.8',
        },
      ];

      const xml = generateSitemapXml(urls);

      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(xml).toContain('<loc>https://gettravelvisa.com</loc>');
      expect(xml).toContain('<lastmod>2024-01-01T00:00:00.000Z</lastmod>');
      expect(xml).toContain('<changefreq>daily</changefreq>');
      expect(xml).toContain('<priority>1.0</priority>');
      expect(xml).toContain('</urlset>');
    });

    it('should handle URLs without optional fields', () => {
      const urls: SitemapUrl[] = [
        {
          url: 'https://gettravelvisa.com',
        },
      ];

      const xml = generateSitemapXml(urls);

      expect(xml).toContain('<loc>https://gettravelvisa.com</loc>');
      expect(xml).not.toContain('<lastmod>');
      expect(xml).not.toContain('<changefreq>');
      expect(xml).not.toContain('<priority>');
    });
  });

  describe('generateSitemapIndexXml', () => {
    it('should generate valid XML for sitemap index', () => {
      const sitemaps: SitemapUrl[] = [
        {
          url: 'https://gettravelvisa.com/sitemap.xml',
          lastmod: '2024-01-01T00:00:00.000Z',
        },
        {
          url: 'https://gettravelvisa.com/d/usa/sitemap.xml',
          lastmod: '2024-01-01T00:00:00.000Z',
        },
      ];

      const xml = generateSitemapIndexXml(sitemaps);

      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(xml).toContain('<loc>https://gettravelvisa.com/sitemap.xml</loc>');
      expect(xml).toContain('<loc>https://gettravelvisa.com/d/usa/sitemap.xml</loc>');
      expect(xml).toContain('<lastmod>2024-01-01T00:00:00.000Z</lastmod>');
      expect(xml).toContain('</sitemapindex>');
    });

    it('should handle sitemaps without lastmod', () => {
      const sitemaps: SitemapUrl[] = [
        {
          url: 'https://gettravelvisa.com/sitemap.xml',
        },
      ];

      const xml = generateSitemapIndexXml(sitemaps);

      expect(xml).toContain('<loc>https://gettravelvisa.com/sitemap.xml</loc>');
      expect(xml).not.toContain('<lastmod>');
    });
  });
});