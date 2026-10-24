import { render, screen } from "@testing-library/react";

import DestinationsPage, {
  generateMetadata,
  generateStaticParams,
  revalidate,
} from "../page";

let mockSearchParams = new URLSearchParams();
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/en/d",
  useSearchParams: () => mockSearchParams,
}));

jest.mock("@/app/i18n", () => ({
  getTranslation: jest.fn(async (_locale: string, ns: string) => ({
    t: (key: string, params?: Record<string, string | number>) => {
      if (ns === "navigation") {
        const navMap: Record<string, string> = {
          "breadcrumb.home": "Home",
          "breadcrumb.destinations": "Destinations",
        };
        return navMap[key] || key;
      }
      if (ns === "common") {
        const commonMap: Record<string, string> = {
          "pagination.previous": "Previous",
          "pagination.next": "Next",
          "pagination.page": "Page",
          "pagination.of": "of",
        };
        return commonMap[key] || key;
      }
      if (key === "results.showing" && params) {
        return `Showing ${params.count} of ${params.total} destinations`;
      }
      const destMap: Record<string, string> = {
        title: "All Travel Destinations",
        description: "Explore visa requirements",
        ogTitle: "Global Visa Requirements",
        ogDescription: "Find visa info",
        twitterTitle: "Visa Guide",
        twitterDescription: "Discover visa requirements",
        "meta.title": "All Travel Destinations",
        "meta.description": "Explore visa requirements",
        "hero.title": "Explore Global Destinations",
        "hero.description": "Discover visa requirements worldwide.",
        "hero.searchPlaceholder": "Search destinations...",
        "filters.allContinents": "All Continents",
        "filters.searchLabel": "Search destinations",
        "filters.continentLabel": "Filter by continent",
        "destinationCard.visaTypes": "Visa Types",
        "destinationCard.processingTime": "Processing",
        "destinationCard.viewDetails": "View Details",
        "destinationCard.days": "days",
        "destinationCard.notAvailable": "N/A",
        "empty.title": "No Destinations Found",
        "empty.description": "Try adjusting your filters.",
        "empty.clearFilters": "Clear All Filters",
      };
      return destMap[key] || key;
    },
  })),
}));

const mockDestinations = Array.from({ length: 25 }, (_, idx) => ({
  code: idx === 0 ? "JP" : `C${String(idx).padStart(2, "0")}`,
  name: idx === 0 ? "Japan" : `Country ${idx + 1}`,
  localizedName: idx === 0 ? "Japan" : `Country ${idx + 1}`,
  heroImage: null,
  about: `About Country ${idx + 1}`,
  continent: idx < 5 ? "Asia" : "Europe",
  region: "Region",
  totalVisaTypes: 3,
  avgProcessingTime: 5,
  minVisaFee: 50,
  hasVisaFreeOptions: true,
}));

jest.mock("@/lib/services/country-service", () => ({
  getDestinationContinents: jest.fn(async () => ["Asia", "Europe"]),
  getDestinationsListWithMetadataPaginated: jest.fn(async () => ({
    destinations: mockDestinations,
    total: mockDestinations.length,
    hasMore: false,
    currentPage: 1,
    totalPages: 2,
  })),
}));

describe("DestinationsPage ISR page", () => {
  beforeEach(() => {
    mockSearchParams = new URLSearchParams();
    mockPush.mockClear();
  });

  it("exports daily revalidate TTL and static locale params", () => {
    expect(revalidate).toBe(86400);
    const params = generateStaticParams();
    expect(params).toEqual(
      expect.arrayContaining([{ locale: "en" }, { locale: "ar" }])
    );
  });

  it("generates metadata without reading searchParams", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en" }),
    });
    expect(metadata.title).toBe("All Travel Destinations");
  });

  it("renders page 1 destinations without awaiting searchParams", async () => {
    const ui = await DestinationsPage({
      params: Promise.resolve({ locale: "en" }),
    });

    render(ui);

    expect(screen.getByText("Explore Global Destinations")).toBeInTheDocument();
    expect(screen.getByText("Japan")).toBeInTheDocument();
    expect(screen.getByText("Country 20")).toBeInTheDocument();
    expect(screen.queryByText("Country 21")).not.toBeInTheDocument();
  });

  it("renders page 2 destinations when ?page=2 is in searchParams", async () => {
    mockSearchParams = new URLSearchParams("page=2");

    const ui = await DestinationsPage({
      params: Promise.resolve({ locale: "en" }),
    });

    render(ui);

    expect(screen.getByText("Country 21")).toBeInTheDocument();
    expect(screen.getByText("Country 25")).toBeInTheDocument();
    expect(screen.queryByText("Japan")).not.toBeInTheDocument();
  });

  it("filters destinations client-side when ?search= or ?continent= are present", async () => {
    mockSearchParams = new URLSearchParams("search=japan");

    const ui = await DestinationsPage({
      params: Promise.resolve({ locale: "en" }),
    });

    const { unmount } = render(ui);
    expect(screen.getByText("Japan")).toBeInTheDocument();
    expect(screen.queryByText("Country 2")).not.toBeInTheDocument();
    unmount();

    mockSearchParams = new URLSearchParams("continent=asia");
    const continentUi = await DestinationsPage({
      params: Promise.resolve({ locale: "en" }),
    });
    render(continentUi);
    expect(screen.getByText("Japan")).toBeInTheDocument();
    expect(screen.getByText("Country 5")).toBeInTheDocument();
    expect(screen.queryByText("Country 6")).not.toBeInTheDocument();
  });
});
