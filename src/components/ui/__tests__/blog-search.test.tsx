import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BlogSearch } from "@/components/ui/blog-search";
import type { BlogPostData } from "@/lib/blog";

// Mock the blog service
import { searchBlogPosts } from "../../../lib/services/blog-service";

jest.mock("../../../lib/services/blog-service", () => ({
  searchBlogPosts: jest.fn(),
}));

const mockSearchBlogPosts = searchBlogPosts as jest.MockedFunction<
  typeof searchBlogPosts
>;

const mockTranslations = {
  searchPlaceholder: "Search blog posts...",
  searchResults: "Search Results",
  noResults: "No Results Found",
  searching: "Searching",
  clear: "Clear",
  readMore: "Read More",
  updated: "Updated",
  result: "result",
  results: "results",
  noPostsFoundFor: 'No posts found for "{query}"',
};

const mockPosts: BlogPostData[] = [
  {
    slug: "test-post-1",
    content: "Test content 1",
    frontmatter: {
      title: "Test Post 1",
      description: "Test description 1",
      destinations: ["FR"],
      image: "/test-image-1.jpg",
      tags: ["travel"],
      author: "Test Author",
      publishedAt: "2024-01-01",
      lastUpdated: "2024-01-01",
    },
    destinationNames: ["France"],
  },
  {
    slug: "test-post-2",
    content: "Test content 2",
    frontmatter: {
      title: "Test Post 2",
      description: "Test description 2",
      destinations: ["GB"],
      image: "/test-image-2.jpg",
      tags: ["guide"],
      author: "Test Author",
      publishedAt: "2024-01-02",
      lastUpdated: "2024-01-02",
    },
    destinationNames: ["United Kingdom"],
  },
];

describe("BlogSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search input with placeholder", () => {
    render(
      <BlogSearch
        locale="en"
        allPosts={mockPosts}
        translations={mockTranslations}
      />
    );

    expect(
      screen.getByPlaceholderText("Search blog posts...")
    ).toBeInTheDocument();
  });

  it("shows searching state when typing", async () => {
    mockSearchBlogPosts.mockReturnValue(mockPosts);

    render(
      <BlogSearch
        locale="en"
        allPosts={mockPosts}
        translations={mockTranslations}
      />
    );

    const input = screen.getByPlaceholderText("Search blog posts...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });

  it("displays search results when query returns posts", async () => {
    mockSearchBlogPosts.mockReturnValue([mockPosts[0]]);

    render(
      <BlogSearch
        locale="en"
        allPosts={mockPosts}
        translations={mockTranslations}
      />
    );

    const input = screen.getByPlaceholderText("Search blog posts...");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText("Search Results")).toBeInTheDocument();
      expect(screen.getByText("1 result")).toBeInTheDocument();
    });
  });

  it("displays no results message when query returns no posts", async () => {
    mockSearchBlogPosts.mockReturnValue([]);

    render(
      <BlogSearch
        locale="en"
        allPosts={mockPosts}
        translations={mockTranslations}
      />
    );

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
    mockSearchBlogPosts.mockReturnValue([mockPosts[0]]);

    render(
      <BlogSearch
        locale="en"
        allPosts={mockPosts}
        translations={mockTranslations}
      />
    );

    const input = screen.getByPlaceholderText("Search blog posts...");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText("Search Results")).toBeInTheDocument();
    });

    const clearButton = screen.getByLabelText("Clear");
    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
    expect(screen.queryByText("Search Results")).not.toBeInTheDocument();
  });

  it("shows correct plural/singular form for results count", async () => {
    mockSearchBlogPosts.mockReturnValue(mockPosts);

    render(
      <BlogSearch
        locale="en"
        allPosts={mockPosts}
        translations={mockTranslations}
      />
    );

    const input = screen.getByPlaceholderText("Search blog posts...");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText("2 results")).toBeInTheDocument();
    });
  });

  it("handles search errors gracefully", async () => {
    mockSearchBlogPosts.mockImplementation(() => {
      throw new Error("Search failed");
    });

    render(
      <BlogSearch
        locale="en"
        allPosts={mockPosts}
        translations={mockTranslations}
      />
    );

    const input = screen.getByPlaceholderText("Search blog posts...");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText("No Results Found")).toBeInTheDocument();
    });
  });

  it("debounces search queries", async () => {
    jest.useFakeTimers();
    mockSearchBlogPosts.mockReturnValue([]);

    render(
      <BlogSearch
        locale="en"
        allPosts={mockPosts}
        translations={mockTranslations}
      />
    );

    const input = screen.getByPlaceholderText("Search blog posts...");

    // Type multiple characters quickly
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });

    // Only one search should be called after debounce
    expect(mockSearchBlogPosts).not.toHaveBeenCalled();

    // Fast-forward time
    jest.advanceTimersByTime(300);

    expect(mockSearchBlogPosts).toHaveBeenCalledTimes(1);
    expect(mockSearchBlogPosts).toHaveBeenCalledWith("test", "en", 12);

    jest.useRealTimers();
  });
});
