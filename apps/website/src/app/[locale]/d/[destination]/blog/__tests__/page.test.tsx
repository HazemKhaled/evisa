import { render, screen } from "@testing-library/react";

import DestinationBlog, {
  generateMetadata,
  generateStaticParams,
} from "../page";

const mockGetBlogPostsByDestinationPaginated = jest.fn();
const mockGetDestinationsListWithMetadata = jest.fn();

jest.mock("../../../../../../lib/services/blog-service", () => ({
  getBlogPostsByDestinationPaginated: (...args: unknown[]) =>
    mockGetBlogPostsByDestinationPaginated(...args),
}));

jest.mock("../../../../../../lib/services/country-service", () => ({
  getDestinationsListWithMetadata: (...args: unknown[]) =>
    mockGetDestinationsListWithMetadata(...args),
}));

jest.mock("../../../../../i18n", () => ({
  getTranslation: jest.fn(() =>
    Promise.resolve({
      t: (key: string, params?: Record<string, string>) => {
        if (params?.destination) return `${key}:${params.destination}`;
        return key;
      },
    })
  ),
}));

jest.mock("../../../../../../components/blog/blog-post-list", () => ({
  BlogPostList: ({
    posts,
    currentPage,
    totalPages,
    buildPaginationUrl,
  }: {
    posts: { slug: string; title: string }[];
    currentPage: number;
    totalPages: number;
    buildPaginationUrl: (page: number) => string;
  }) => (
    <div
      data-testid="blog-post-list"
      data-current-page={currentPage}
      data-total-pages={totalPages}
      data-page-2-url={buildPaginationUrl(2)}
    >
      {posts.map(post => (
        <div key={post.slug}>{post.title}</div>
      ))}
    </div>
  ),
}));

jest.mock("../../../../../../components/blog/blog-search", () => ({
  BlogSearch: ({ searchPlaceholder }: { searchPlaceholder?: string }) => (
    <div data-testid="blog-search" data-placeholder={searchPlaceholder} />
  ),
}));

jest.mock("../../../../../../components/json-ld", () => ({
  MultipleJsonLd: () => <div data-testid="multiple-json-ld" />,
}));

jest.mock("../../../../../../components/ui/page-breadcrumb", () => ({
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
  });

  it("renders destination blog posts without delegating to BlogHome module", async () => {
    mockGetBlogPostsByDestinationPaginated.mockResolvedValue({
      posts: [
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
      ],
      total: 1,
      hasMore: false,
      currentPage: 1,
      totalPages: 2,
    });

    const element = await DestinationBlog({
      params: Promise.resolve({ locale: "en", destination: "US" }),
      searchParams: Promise.resolve({ page: "1" }),
    });

    render(element);

    expect(mockGetBlogPostsByDestinationPaginated).toHaveBeenCalledWith(
      "US",
      "en",
      9,
      0
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "destination.title:US"
    );
    expect(screen.getByText("US Visa Guide")).toBeInTheDocument();
    expect(screen.getByTestId("blog-post-list")).toHaveAttribute(
      "data-page-2-url",
      "/en/d/US/blog?page=2&destination=US"
    );
  });

  it("degrades to empty state without throwing when blog service rejects (e.g. DB 402)", async () => {
    mockGetBlogPostsByDestinationPaginated.mockRejectedValue(
      new Error("Neon HTTP 402 quota exceeded")
    );

    const element = await DestinationBlog({
      params: Promise.resolve({ locale: "en", destination: "US" }),
      searchParams: Promise.resolve({}),
    });

    render(element);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "destination.title:US"
    );
    expect(screen.getByText("empty_state")).toBeInTheDocument();
    expect(screen.queryByTestId("blog-post-list")).not.toBeInTheDocument();
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
