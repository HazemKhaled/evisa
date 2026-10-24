import { render, screen } from "@testing-library/react";

import DestinationBlog, {
  revalidate as destinationBlogRevalidate,
} from "../../d/[destination]/blog/page";
import BlogHome, {
  generateMetadata,
  generateStaticParams,
  revalidate,
} from "../page";
import TagPage, { revalidate as tagBlogRevalidate } from "../t/[tag]/page";

let mockSearchParams = new URLSearchParams();
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/en/blog",
  useSearchParams: () => mockSearchParams,
}));

jest.mock("@/app/i18n", () => ({
  getTranslation: jest.fn(async (_locale: string, ns: string) => ({
    t: (key: string, params?: Record<string, string | number>) => {
      if (ns === "navigation") {
        const navMap: Record<string, string> = {
          "breadcrumb.home": "Home",
          "breadcrumb.blog": "Blog",
          "breadcrumb.destinations": "Destinations",
        };
        return navMap[key] || key;
      }
      if (key === "tag.title" && params?.tag) {
        return `${params.tag} Travel Posts`;
      }
      if (key === "tag.subtitle" && params?.tag) {
        return `Posts tagged ${params.tag}`;
      }
      if (key === "destination.title" && params?.destination) {
        return `Travel to ${params.destination}`;
      }
      if (key === "destination.subtitle" && params?.destination) {
        return `Guides for ${params.destination}`;
      }
      if (key === "emptySearch" && params?.search) {
        return `No posts found for "${params.search}"`;
      }
      const blogMap: Record<string, string> = {
        title: "Travel Blog",
        subtitle: "Expert travel guides",
        keywords: "travel, visa",
        empty_state: "No blog posts available yet.",
        "search.placeholder": "Search blog posts...",
        "search.heading": "Search Results",
        "search.loading": "Searching...",
        "aria.clearSearch": "Clear search",
        "pagination.showing": "Showing",
        "pagination.post": "post",
        "pagination.posts": "posts",
        "pagination.on": "on",
        "pagination.page": "Page",
        "pagination.of": "of",
        "pagination.previous": "Previous",
        "pagination.next": "Next",
      };
      return blogMap[key] || key;
    },
  })),
}));

jest.mock("@/app/i18n/client", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockPosts = Array.from({ length: 12 }, (_, idx) => ({
  id: idx + 1,
  slug: `post-${idx + 1}`,
  title: idx === 0 ? "schengen visa guide" : `Blog Post ${idx + 1}`,
  description: `Description for post ${idx + 1}`,
  content: `Content for post ${idx + 1}`,
  author: "Editor",
  publishedAt: "2026-01-15T00:00:00.000Z",
  image: "/images/test.jpg",
  destinations: idx % 2 === 0 ? ["US"] : ["JP"],
  tags: idx < 3 ? ["visa"] : ["tips"],
  isPublished: true,
}));

jest.mock("@/lib/services/blog-service", () => ({
  getAllBlogPosts: jest.fn(async () => mockPosts),
  getBlogPostsByDestination: jest.fn(async (destination: string) =>
    mockPosts.filter(p => p.destinations.includes(destination))
  ),
  getBlogPostsByTag: jest.fn(async (tag: string) =>
    mockPosts.filter(p => p.tags.includes(tag))
  ),
}));

describe("BlogHome ISR page", () => {
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
    expect(metadata.title).toBe("Travel Blog");
    expect(metadata.alternates?.canonical).toContain("/en/blog");
  });

  it("renders page 1 posts without awaiting searchParams", async () => {
    const ui = await BlogHome({
      params: Promise.resolve({ locale: "en" }),
    });

    render(ui);

    expect(screen.getByText("Travel Blog")).toBeInTheDocument();
    expect(screen.getByText("schengen visa guide")).toBeInTheDocument();
    expect(screen.getByText("Blog Post 9")).toBeInTheDocument();
    expect(screen.queryByText("Blog Post 10")).not.toBeInTheDocument();
  });

  it("renders page 2 posts when ?page=2 is present in searchParams on the client", async () => {
    mockSearchParams = new URLSearchParams("page=2");

    const ui = await BlogHome({
      params: Promise.resolve({ locale: "en" }),
    });

    render(ui);

    expect(screen.getByText("Blog Post 10")).toBeInTheDocument();
    expect(screen.getByText("Blog Post 12")).toBeInTheDocument();
    expect(screen.queryByText("schengen visa guide")).not.toBeInTheDocument();
  });

  it("filters posts client-side when ?search=, ?tag=, or ?destination= are present", async () => {
    mockSearchParams = new URLSearchParams("search=schengen");

    const ui = await BlogHome({
      params: Promise.resolve({ locale: "en" }),
    });

    const { unmount } = render(ui);
    expect(
      screen.getByRole("heading", { level: 1, name: "Search Results" })
    ).toBeInTheDocument();
    expect(screen.getByText("schengen visa guide")).toBeInTheDocument();
    expect(screen.queryByText("Blog Post 2")).not.toBeInTheDocument();
    unmount();

    mockSearchParams = new URLSearchParams("tag=visa");
    const tagUi = await BlogHome({
      params: Promise.resolve({ locale: "en" }),
    });
    const { unmount: unmountTag } = render(tagUi);
    expect(screen.getByText("visa Travel Posts")).toBeInTheDocument();
    expect(screen.getByText("schengen visa guide")).toBeInTheDocument();
    expect(screen.getByText("Blog Post 3")).toBeInTheDocument();
    expect(screen.queryByText("Blog Post 4")).not.toBeInTheDocument();
    unmountTag();

    mockSearchParams = new URLSearchParams("destination=JP");
    const destUi = await BlogHome({
      params: Promise.resolve({ locale: "en" }),
    });
    render(destUi);
    expect(screen.getByText("Travel to JP")).toBeInTheDocument();
    expect(screen.getByText("Blog Post 2")).toBeInTheDocument();
    expect(screen.queryByText("schengen visa guide")).not.toBeInTheDocument();
  });

  it("supports destination blog route via params.destination", async () => {
    const ui = await BlogHome({
      params: Promise.resolve({ locale: "en", destination: "US" }),
    });

    render(ui);
    expect(screen.getByText("Travel to US")).toBeInTheDocument();
    expect(screen.getByText("schengen visa guide")).toBeInTheDocument();
    expect(screen.queryByText("Blog Post 2")).not.toBeInTheDocument();
  });

  it("DestinationBlog and TagPage delegate to BlogHome without awaiting searchParams", async () => {
    expect(destinationBlogRevalidate).toBe(86400);
    expect(tagBlogRevalidate).toBe(86400);

    const destUi = await DestinationBlog({
      params: Promise.resolve({ locale: "en", destination: "US" }),
    });
    const { unmount } = render(destUi);
    expect(screen.getByText("Travel to US")).toBeInTheDocument();
    expect(screen.getByText("schengen visa guide")).toBeInTheDocument();
    unmount();

    const tagUi = await TagPage({
      params: Promise.resolve({ locale: "en", tag: "visa" }),
    });
    render(tagUi);
    expect(screen.getByText("visa Travel Posts")).toBeInTheDocument();
    expect(screen.getByText("schengen visa guide")).toBeInTheDocument();
  });
});
