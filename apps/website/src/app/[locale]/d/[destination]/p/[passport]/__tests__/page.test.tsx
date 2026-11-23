import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import * as React from "react";

import { languages } from "@/app/i18n/settings";
import { RequiredDocuments } from "@/components/destinations/required-documents";

import PassportDestinationPage, {
  generateMetadata,
  generateStaticParams,
} from "../page";

jest.mock(
  "../../../../../../../components/destinations/visa-options-grid",
  () => ({
    VisaOptionsGrid: ({
      destination,
      passportCode,
    }: {
      destination: { code: string };
      passportCode?: string;
    }) => (
      <div
        data-testid="visa-options-grid"
        data-destination={destination.code}
        data-passport={passportCode}
      />
    ),
  })
);

const mockGetDestinationDetails = jest.fn();
const mockGetDestinationsListWithMetadata = jest.fn();
const mockCheckVisaEligibility = jest.fn();
const mockGetVisaRequirements = jest.fn();

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

jest.mock("next/script", () => ({
  __esModule: true,
  default: ({
    id,
    type,
    dangerouslySetInnerHTML,
  }: {
    id: string;
    type: string;
    dangerouslySetInnerHTML: { __html: string };
  }) => (
    <script
      id={id}
      type={type}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  ),
}));

jest.mock("../../../../../../../lib/services/country-service", () => ({
  getDestinationDetails: (...args: unknown[]) =>
    mockGetDestinationDetails(...args),
  getDestinationsListWithMetadata: (...args: unknown[]) =>
    mockGetDestinationsListWithMetadata(...args),
  validateCountryCode: (code: string) =>
    /^[A-Z]{2}$/.test(code?.trim()) ? code.trim() : null,
}));

jest.mock("../../../../../../../lib/services/visa-service", () => {
  const actual = jest.requireActual(
    "../../../../../../../lib/services/visa-service"
  );
  return {
    ...actual,
    checkVisaEligibility: (...args: unknown[]) =>
      mockCheckVisaEligibility(...args),
    getVisaRequirements: (...args: unknown[]) =>
      mockGetVisaRequirements(...args),
    getAffiliatePartnersForVisaType: jest.fn().mockResolvedValue({
      primaryPartner: {
        id: 1,
        name: "iVisa",
        domain: "ivisa.com",
        baseUrl: "https://www.ivisa.com",
        slug: "iVisa",
        logoUrl: null,
        commissionRate: 25,
        priority: 1,
        isActive: true,
        isAvailable: true,
        countryRestrictions: null,
      },
      fallbackPartners: [],
    }),
  };
});

jest.mock("../../../../../../i18n", () => ({
  getTranslation: jest.fn(
    async (locale: string, _ns?: string, options?: { keyPrefix?: string }) => ({
      t: (key: string, vars?: Record<string, unknown>) => {
        const prefix = options?.keyPrefix ? `${options.keyPrefix}.` : "";
        const fullKey = `${prefix}${key}`;
        if (vars?.passport && vars?.destination) {
          return `[${locale}] ${fullKey}: ${String(vars.passport)} -> ${String(vars.destination)} (${String(vars.year ?? "")})`;
        }
        if (vars?.days !== undefined) {
          return `${String(vars.days)} days`;
        }
        return `[${locale}] ${fullKey}`;
      },
    })
  ),
}));

const sampleDestination = {
  code: "AE",
  name: "AE",
  localizedName: "United Arab Emirates",
  heroImage: null,
  about: "Discover the UAE",
  continent: "Asia",
  region: "Middle East",
  totalVisaTypes: 1,
  hasVisaFreeEntry: true,
  hasVisaOnArrival: true,
  visaTypes: [
    {
      id: 101,
      type: "Tourist e-Visa",
      name: "30-Day Tourist e-Visa",
      duration: 60,
      fee: 85,
      currency: "USD",
      processingTime: 3,
      requiresInterview: false,
      isMultiEntry: false,
      documents: ["passport", "photo"],
      requirements: ["Valid passport"],
    },
  ],
};

const sampleEligibility = {
  destinationCode: "AE",
  destinationName: "United Arab Emirates",
  passportCode: "EG",
  passportName: "Egypt",
  eligibilityStatus: "required" as const,
  maxStayDays: 30,
  visaTypes: [
    {
      id: 101,
      destinationCode: "AE",
      destinationName: "United Arab Emirates",
      type: "Tourist e-Visa",
      name: "30-Day Tourist e-Visa",
      description: "Standard tourist visa",
      duration: 60,
      maxStay: 30,
      fee: 85,
      currency: "USD",
      processingTime: 3,
      requiresInterview: false,
      isMultiEntry: false,
      documents: ["passport", "photo"],
      requirements: ["Valid passport"],
      eligibilityStatus: "required" as const,
      maxStayDays: 30,
    },
  ],
};

const sampleRequirements = {
  destinationCode: "AE",
  destinationName: "United Arab Emirates",
  visaTypes: sampleEligibility.visaTypes,
  visaFreeCountries: ["US", "GB"],
  visaOnArrivalCountries: ["CA"],
  etaCountries: [],
  notAllowedCountries: [],
  generalRequirements: [],
  processingTimeRange: { min: 2, max: 5 },
  feeRange: { min: 85, max: 150, currency: "USD" },
};

describe("/[locale]/d/[destination]/p/[passport] page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetDestinationDetails.mockResolvedValue(sampleDestination);
    mockCheckVisaEligibility.mockResolvedValue(sampleEligibility);
    mockGetVisaRequirements.mockResolvedValue(sampleRequirements);
    mockGetDestinationsListWithMetadata.mockResolvedValue([
      { code: "AE" },
      { code: "TR" },
    ]);
  });

  describe("Country code validation (AC 2)", () => {
    it("calls notFound() when destination or passport code is invalid", async () => {
      await expect(
        PassportDestinationPage({
          params: Promise.resolve({
            locale: "en",
            destination: "invalid",
            passport: "eg",
          }),
        })
      ).rejects.toThrow("NEXT_NOT_FOUND");
      expect(notFound).toHaveBeenCalled();

      jest.clearAllMocks();

      await expect(
        PassportDestinationPage({
          params: Promise.resolve({
            locale: "en",
            destination: "ae",
            passport: "123",
          }),
        })
      ).rejects.toThrow("NEXT_NOT_FOUND");
      expect(notFound).toHaveBeenCalled();
    });

    it("calls notFound() when destination or passport is not found in database", async () => {
      mockCheckVisaEligibility.mockResolvedValueOnce(null);

      await expect(
        PassportDestinationPage({
          params: Promise.resolve({
            locale: "en",
            destination: "ae",
            passport: "zz",
          }),
        })
      ).rejects.toThrow("NEXT_NOT_FOUND");
      expect(notFound).toHaveBeenCalled();
    });
  });

  describe("Metadata & canonical/hreflang generation (AC 3)", () => {
    it("normalizes uppercase params to lowercase canonical URL and emits alternates for all 8 locales", async () => {
      const metadata = await generateMetadata({
        params: Promise.resolve({
          locale: "en",
          destination: "AE",
          passport: "EG",
        }),
      });

      expect(metadata.alternates?.canonical).toBe(
        "https://gettravelvisa.com/en/d/ae/p/eg"
      );
      const altLanguages = metadata.alternates?.languages as Record<
        string,
        string
      >;
      for (const lang of languages) {
        expect(altLanguages[lang]).toBe(
          `https://gettravelvisa.com/${lang}/d/ae/p/eg`
        );
      }
    });
  });

  describe("Page rendering, JSON-LD, Affiliate CTAs, and 8-locale/RTL support (AC 1, 3)", () => {
    it.each(languages)(
      "renders localized direct-answer summary, stay duration, affiliate CTAs, and JSON-LD in locale '%s'",
      async locale => {
        const element = await PassportDestinationPage({
          params: Promise.resolve({
            locale,
            destination: "ae",
            passport: "eg",
          }),
        });

        const { container, unmount } = render(element);

        // RTL check for Arabic
        const main = container.querySelector("main");
        expect(main).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");

        // Direct answer sentence rendered in hero
        expect(screen.getByTestId("passport-direct-answer")).toHaveTextContent(
          `${locale}`
        );

        // Stay duration rendered
        expect(screen.getByTestId("passport-max-stay")).toHaveTextContent(
          "30 days"
        );

        // Primary affiliate CTA pre-populated with destination_code=AE & passport_code=EG
        const primaryCta = screen.getByTestId("passport-primary-affiliate-cta");
        expect(primaryCta).toHaveAttribute(
          "href",
          expect.stringContaining("destination_code=AE")
        );
        expect(primaryCta).toHaveAttribute(
          "href",
          expect.stringContaining("passport_code=EG")
        );

        // VisaOptionsGrid receives destination and passportCode
        const visaGrid = screen.getByTestId("visa-options-grid");
        expect(visaGrid).toHaveAttribute("data-destination", "AE");
        expect(visaGrid).toHaveAttribute("data-passport", "EG");

        // JSON-LD schemas: BreadcrumbList, GovernmentService, FAQPage
        const script = document.querySelector('script[id="json-ld-graph"]');
        expect(script).toBeInTheDocument();
        const parsed = JSON.parse(script?.textContent || "{}") as {
          "@graph"?: { "@type"?: string }[];
        };
        const types = (parsed["@graph"] ?? []).map(s => s["@type"]);
        expect(types).toContain("BreadcrumbList");
        expect(types).toContain("GovernmentService");
        expect(types).toContain("FAQPage");

        unmount();
      }
    );

    it("wires RequiredDocuments affiliate links with destination_code and passport_code", async () => {
      const element = await RequiredDocuments({
        visaType: sampleDestination.visaTypes[0],
        compact: false,
        locale: "en",
        destinationCode: "AE",
        passportCode: "EG",
      });
      render(element);

      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(link).toHaveAttribute(
          "href",
          expect.stringContaining("destination_code=AE")
        );
        expect(link).toHaveAttribute(
          "href",
          expect.stringContaining("passport_code=EG")
        );
      }
    });
  });

  describe("generateStaticParams", () => {
    it("returns plain { locale, destination, passport } param objects with lowercase codes", async () => {
      const params = await generateStaticParams();
      expect(params.length).toBeGreaterThan(0);
      for (const entry of params) {
        expect(entry).toEqual({
          locale: expect.any(String),
          destination: expect.stringMatching(/^[a-z]{2}$/),
          passport: expect.stringMatching(/^[a-z]{2}$/),
        });
      }
    });
  });
});
