import { render, screen } from "@testing-library/react";

import DestinationBlog, {
  generateMetadata,
  generateStaticParams,
  revalidate,
} from "../page";

const mockGetBlogPostsByDestination = jest.fn();
const mockGetDestinationsListWithMetadata = jest.fn();

let mockSearchParams = new URLSearchParams();
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/en/d/US/blog",
  useSearchParams: () => mockSearchParams,
}));

jest.mock("@/lib/services/blog-service", () => ({
  getBlogPostsByDestination: (...args: unknown[]) =>
    mockGetBlogPostsByDestination(...args),
  getAllBlogPosts: jest.fn(async () => []),
  getBlogPostsByTag: jest.fn(async () => []),
}));

jest.mock("@/lib/services/country-service", () => ({
  getDestinationsListWithMetadata: (...args: unknown[]) =>
    mockGetDestinationsListWithMetadata(...args),
}));

jest.mock("@/app/i18n", () => ({
  getTranslation: jest.fn(() =>
    Promise.resolve({
      t: (key: string, params?: Record<string, string>) => {
        if (params?.destination) return `${key}:${params.destination}`;
        return key;
      },
    })
  ),
}));

jest.mock("@/app/i18n/client", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/components/json-ld", () => ({
  MultipleJsonLd: () => <div data-testid="multiple-json-ld" />,
}));

jest.mock("@/components/ui/page-breadcrumb", () => ({
  PageBreadcrumb: ({
    items,
  }: {
    items: { label: string; href?: string }[];
  }) => (
    <nav data-testid="page-breadcrumb">
      {items.map((item, i) => (
        <span key={i}>{item.label}</span>
      ))}
    </nav>
  ),
}));

describe("DestinationBlog page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  it("exports daily revalidate TTL", () => {
    expect(revalidate).toBe(86400);
  });

  it("renders destination blog posts via BlogCatalogServer without awaiting searchParams", async () => {
    mockGetBlogPostsByDestination.mockResolvedValue([
      {
        slug: "us-visa-guide",
        title: "US Visa Guide",
        description: "Everything about US visas",
        content: "Content",
        author: "Author",
        publishedAt: "2026-01-01T00:00:00.000Z",
        image: "/img.jpg",
        destinations: ["US"],
        tags: ["visa"],
        related_visas: [],
        isPublished: true,
      },
    ]);

    const element = await DestinationBlog({
      params: Promise.resolve({ locale: "en", destination: "US" }),
    });

    render(element);

    expect(mockGetBlogPostsByDestination).toHaveBeenCalledWith("US", "en");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "destination.title:US"
    );
    expect(screen.getByText("US Visa Guide")).toBeInTheDocument();
  });

  it("renders the page requested by ?page= on the client without a dynamic server render", async () => {
    mockSearchParams = new URLSearchParams("page=2");
    mockGetBlogPostsByDestination.mockResolvedValue(
      Array.from({ length: 10 }, (_, index) => ({
        slug: `post-${index + 1}`,
        title: `Post ${index + 1}`,
        description: "Description",
        content: "Content",
        author: "Author",
        publishedAt: "2026-01-01T00:00:00.000Z",
        image: "/img.jpg",
        destinations: ["US"],
        tags: ["visa"],
        related_visas: [],
        isPublished: true,
      }))
    );

    const element = await DestinationBlog({
      params: Promise.resolve({ locale: "en", destination: "US" }),
    });

    render(element);

    expect(screen.getByText("Post 10")).toBeInTheDocument();
    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
  });

  it("degrades to empty state without throwing when blog service rejects (e.g. DB 402)", async () => {
    mockGetBlogPostsByDestination.mockRejectedValue(
      new Error("Neon HTTP 402 quota exceeded")
    );

    const element = await DestinationBlog({
      params: Promise.resolve({ locale: "en", destination: "US" }),
    });

    render(element);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "destination.title:US"
    );
    expect(screen.getByText("empty_state")).toBeInTheDocument();
  });

  it("degrades generateStaticParams to empty list when country service rejects", async () => {
    mockGetDestinationsListWithMetadata.mockRejectedValue(
      new Error("DB unavailable")
    );

    await expect(generateStaticParams()).resolves.toEqual([]);
  });

  it("generates metadata for destination blog route", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: "en", destination: "US" }),
    });

    expect(metadata.title).toBe("title - US");
    expect(metadata.description).toBe("subtitle for US");
  });
});
