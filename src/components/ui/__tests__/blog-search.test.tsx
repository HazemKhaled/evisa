import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BlogSearch } from "../blog-search";
import type { BlogPostData } from "../../../lib/services/blog-service";

// Mock the blog service client
import { searchBlogPostsClient } from "../../../lib/services/blog-service-client";

jest.mock("../../../lib/services/blog-service-client", () => ({
  searchBlogPostsClient: jest.fn(),
}));

// Mock the client-side translation hook
jest.mock("../../../app/i18n/client", () => ({
  useTranslation: jest.fn(() => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "search.placeholder": "Search blog posts...",
        "search.loading": "Searching...",
        "search.results": "results",
        "search.result": "result",
        "search.heading": "Search Results",
        "search.noResults": "No Results Found",
        "aria.clearSearch": "Clear search",
      };
      return translations[key] || key;
    },
  })),
}));

const mockSearchBlogPostsClient = searchBlogPostsClient as jest.MockedFunction<
  typeof searchBlogPostsClient
>;

const mockPosts: BlogPostData[] = [
  {
    slug: "test-post-1",
    title: "Test Post 1",
    description: "Test description 1",
    content: "Test content 1",
    author: "Test Author",
    publishedAt: "2024-01-01",
    lastUpdated: "2024-01-01",
    image: "/test-image-1.jpg",
    destinations: ["FR"],
    tags: ["travel"],
    isPublished: true,
  },
  {
    slug: "test-post-2",
    title: "Test Post 2",
    description: "Test description 2",
    content: "Test content 2",
    author: "Test Author",
    publishedAt: "2024-01-02",
    lastUpdated: "2024-01-02",
    image: "/test-image-2.jpg",
    destinations: ["GB"],
    tags: ["guide"],
    isPublished: true,
  },
];

describe("BlogSearch", () => {
  beforeEach(() => {
    mockSearchBlogPostsClient.mockClear();
  });

  it("renders search input with placeholder", () => {
    render(<BlogSearch locale="en" allPosts={mockPosts} />);

    expect(
      screen.getByPlaceholderText("Search blog posts...")
    ).toBeInTheDocument();
  });

  it("shows searching state when typing", async () => {
    mockSearchBlogPostsClient.mockReturnValue(mockPosts);

    render(<BlogSearch locale="en" allPosts={mockPosts} />);

    const input = screen.getByPlaceholderText("Search blog posts...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });

  it("displays search results when query returns posts", async () => {
    mockSearchBlogPostsClient.mockReturnValue([mockPosts[0]]);

    render(<BlogSearch locale="en" allPosts={mockPosts} />);

    const input = screen.getByPlaceholderText("Search blog posts...");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText("Search Results")).toBeInTheDocument();
      expect(screen.getByText("1 result")).toBeInTheDocument();
    });
  });

  it("displays no results message when query returns no posts", async () => {
    mockSearchBlogPostsClient.mockReturnValue([]);

    render(<BlogSearch locale="en" allPosts={mockPosts} />);

    const input = screen.getByPlaceholderText("Search blog posts...");
    fireEvent.change(input, { target: { value: "nonexistent" } });

    await waitFor(() => {
      expect(screen.getByText("No Results Found")).toBeInTheDocument();
      expect(
        screen.getByText('No posts found for "nonexistent"')
      ).toBeInTheDocument();
    });
  });

  it("clears search when clear button is clicked", async () => {
    mockSearchBlogPostsClient.mockReturnValue([mockPosts[0]]);

    render(<BlogSearch locale="en" allPosts={mockPosts} />);

    const input = screen.getByPlaceholderText("Search blog posts...");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText("Search Results")).toBeInTheDocument();
    });

    const clearButton = screen.getByLabelText("Clear search");
    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
    expect(screen.queryByText("Search Results")).not.toBeInTheDocument();
  });

  it("shows correct plural/singular form for results count", async () => {
    mockSearchBlogPostsClient.mockReturnValue(mockPosts);

    render(<BlogSearch locale="en" allPosts={mockPosts} />);

    const input = screen.getByPlaceholderText("Search blog posts...");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText("2 results")).toBeInTheDocument();
    });
  });

  it("handles search errors gracefully", async () => {
    mockSearchBlogPostsClient.mockImplementation(() => {
      throw new Error("Search failed");
    });

    render(<BlogSearch locale="en" allPosts={mockPosts} />);

    const input = screen.getByPlaceholderText("Search blog posts...");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText("No Results Found")).toBeInTheDocument();
    });
  });

  it("debounces search queries", async () => {
    jest.useFakeTimers();
    mockSearchBlogPostsClient.mockReturnValue([]);

    render(<BlogSearch locale="en" allPosts={mockPosts} />);

    const input = screen.getByPlaceholderText("Search blog posts...");

    // Type multiple characters quickly
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });

    // Only one search should be called after debounce
    expect(mockSearchBlogPostsClient).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockSearchBlogPostsClient).toHaveBeenCalledTimes(1);
    expect(mockSearchBlogPostsClient).toHaveBeenCalledWith(
      mockPosts,
      "test",
      12
    );

    jest.useRealTimers();
  });
});
