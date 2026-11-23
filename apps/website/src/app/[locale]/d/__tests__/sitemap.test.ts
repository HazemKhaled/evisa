import { languages } from "@/app/i18n/settings";

import sitemap, { HIGH_PRIORITY_PASSPORTS } from "../sitemap";

const mockGetDestinationsForSitemap = jest.fn();
const mockGetVisaTypesByDestination = jest.fn();

jest.mock("../../../../lib/services/country-service", () => ({
  getDestinationsForSitemap: (...args: unknown[]) =>
    mockGetDestinationsForSitemap(...args),
}));

jest.mock("../../../../lib/services/visa-service", () => ({
  getVisaTypesByDestination: (...args: unknown[]) =>
    mockGetVisaTypesByDestination(...args),
}));

describe("Destination per-locale sitemap", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("includes high-priority passport-destination URLs at /[locale]/d/[destination]/p/[passport] with localized alternates", async () => {
    mockGetDestinationsForSitemap.mockResolvedValue(["AE", "US"]);
    mockGetVisaTypesByDestination.mockResolvedValue([]);

    const entries = await sitemap({ id: Promise.resolve("en") });

    expect(HIGH_PRIORITY_PASSPORTS.length).toBeGreaterThan(0);

    const usToAe = entries.find(e => e.url.endsWith("/en/d/ae/p/us"));
    expect(usToAe).toBeDefined();
    expect(usToAe?.alternates?.languages).toBeDefined();
    for (const lang of languages) {
      expect(
        (usToAe?.alternates?.languages as Record<string, string>)?.[lang]
      ).toContain(`/${lang}/d/ae/p/us`);
    }

    // Should not generate self-pair (ae -> ae or us -> us)
    const selfPair = entries.find(e => e.url.endsWith("/en/d/ae/p/ae"));
    expect(selfPair).toBeUndefined();
  });
});
