import { getDbAsync } from "@/lib/db/connection";

export interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: string;
}

/**
 * Generate sitemap index data
 */
export async function generateSitemapIndex(): Promise<SitemapUrl[]> {
  try {
    const db = await getDbAsync();
    const activeCountries = await db.query.countries.findMany({
      where: (countries, { eq, and, isNull }) =>
        and(eq(countries.isActive, true), isNull(countries.deletedAt)),
      columns: {
        code: true,
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://gettravelvisa.com";
    const currentDate = new Date().toISOString();

    const sitemaps: SitemapUrl[] = [
      {
        url: `${baseUrl}/sitemap.xml`,
        lastmod: currentDate,
      },
    ];

    // Add destination sitemaps
    activeCountries.forEach(country => {
      sitemaps.push({
        url: `${baseUrl}/d/${country.code.toLowerCase()}/sitemap.xml`,
        lastmod: currentDate,
      });
    });

    return sitemaps;
  } catch (error) {
    // Log error in production environment
    if (process.env.NODE_ENV === "development") {
      console.error("Error generating sitemap index data:", error);
    }
    return [];
  }
}

/**
 * Generate main sitemap data for standalone pages
 */
export async function generateMainSitemap(): Promise<SitemapUrl[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://gettravelvisa.com";
  const currentDate = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: "daily",
      priority: "1.0",
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      url: `${baseUrl}/terms`,
      lastmod: currentDate,
      changefreq: "yearly",
      priority: "0.5",
    },
    {
      url: `${baseUrl}/privacy`,
      lastmod: currentDate,
      changefreq: "yearly",
      priority: "0.5",
    },
  ];
}

/**
 * Generate destination-specific sitemap data
 */
export async function generateDestinationSitemap(
  countryCode: string
): Promise<SitemapUrl[]> {
  try {
    const db = await getDbAsync();
    const countryCodeUpper = countryCode.toUpperCase();
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://gettravelvisa.com";
    const currentDate = new Date().toISOString();

    // Get country information
    const country = await db.query.countries.findFirst({
      where: (countries, { eq, and, isNull }) =>
        and(
          eq(countries.code, countryCodeUpper),
          eq(countries.isActive, true),
          isNull(countries.deletedAt)
        ),
    });

    if (!country) {
      return [];
    }

    // Get visa types for this destination
    const destinationVisaTypes = await db.query.visaTypes.findMany({
      where: (visaTypes, { eq, and, isNull }) =>
        and(
          eq(visaTypes.destinationId, country.id),
          eq(visaTypes.isActive, true),
          isNull(visaTypes.deletedAt)
        ),
      columns: {
        id: true,
        type: true,
      },
    });

    // Get passport countries that have eligibility for this destination
    const eligiblePassports = await db.query.visaEligibility.findMany({
      where: (visaEligibility, { eq, and, isNull }) =>
        and(
          eq(visaEligibility.destinationId, country.id),
          eq(visaEligibility.isActive, true),
          isNull(visaEligibility.deletedAt)
        ),
      with: {
        passportCountry: {
          columns: {
            code: true,
          },
        },
      },
    });

    // Get unique passport countries
    const uniquePassportCodes = Array.from(
      new Set(eligiblePassports.map(ep => ep.passportCountry.code))
    );

    const urls: SitemapUrl[] = [
      // Main destination page
      {
        url: `${baseUrl}/d/${countryCode.toLowerCase()}`,
        lastmod: currentDate,
        changefreq: "daily",
        priority: "1.0",
      },
      // All destinations page
      {
        url: `${baseUrl}/d`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.9",
      },
      // Articles list page
      {
        url: `${baseUrl}/d/${countryCode.toLowerCase()}/a`,
        lastmod: currentDate,
        changefreq: "weekly",
        priority: "0.8",
      },
    ];

    // Add visa type pages
    destinationVisaTypes.forEach(visaType => {
      urls.push({
        url: `${baseUrl}/d/${countryCode.toLowerCase()}/v/${visaType.type}`,
        lastmod: currentDate,
        changefreq: "monthly",
        priority: "0.8",
      });
    });

    // Add passport-specific pages
    uniquePassportCodes.forEach(passportCode => {
      urls.push({
        url: `${baseUrl}/d/${countryCode.toLowerCase()}/p/${passportCode.toLowerCase()}`,
        lastmod: currentDate,
        changefreq: "monthly",
        priority: "0.7",
      });
    });

    return urls;
  } catch (error) {
    // Log error in production environment
    if (process.env.NODE_ENV === "development") {
      console.error("Error generating destination sitemap data:", error);
    }
    return [];
  }
}

/**
 * Convert sitemap data to XML format
 */
export function generateSitemapXml(urls: SitemapUrl[]): string {
  const xmlUrls = urls
    .map(url => {
      const lastmod = url.lastmod
        ? `    <lastmod>${url.lastmod}</lastmod>`
        : "";
      const changefreq = url.changefreq
        ? `    <changefreq>${url.changefreq}</changefreq>`
        : "";
      const priority = url.priority
        ? `    <priority>${url.priority}</priority>`
        : "";

      return `  <url>
    <loc>${url.url}</loc>${lastmod ? "\n" + lastmod : ""}${changefreq ? "\n" + changefreq : ""}${priority ? "\n" + priority : ""}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

/**
 * Convert sitemap index data to XML format
 */
export function generateSitemapIndexXml(sitemaps: SitemapUrl[]): string {
  const xmlSitemaps = sitemaps
    .map(sitemap => {
      const lastmod = sitemap.lastmod
        ? `    <lastmod>${sitemap.lastmod}</lastmod>`
        : "";
      return `  <sitemap>
    <loc>${sitemap.url}</loc>${lastmod ? "\n" + lastmod : ""}
  </sitemap>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlSitemaps}
</sitemapindex>`;
}
