/**
 * Mock implementation for blog-service-db
 */

import type {
  BlogPostData,
  BlogFilterOptions,
  PaginatedBlogResponse,
} from "../../types/blog";

const mockBlogPosts: BlogPostData[] = [
  {
    slug: "test-post-1",
    frontmatter: {
      title: "Test Post 1",
      description: "A test post description",
      tags: ["travel", "guide"],
      destinations: ["FR"],
      passports: ["US"],
      publishedAt: "2023-01-01",
      author: "Test Author",
    },
    content: "# Test Post 1\n\nThis is test content.",
    readingTime: { text: "1 min read", minutes: 1, time: 60000, words: 10 },
  },
  {
    slug: "test-post-2",
    frontmatter: {
      title: "Test Post 2",
      description: "Another test post description",
      tags: ["visa", "guide"],
      destinations: ["GB"],
      passports: ["CA"],
      publishedAt: "2023-01-02",
      author: "Test Author 2",
    },
    content: "# Test Post 2\n\nThis is another test content.",
    readingTime: { text: "2 min read", minutes: 2, time: 120000, words: 20 },
  },
  {
    slug: "test-post-3",
    frontmatter: {
      title: "Test Post 3",
      description: "A featured test post description",
      tags: ["featured", "test"],
      destinations: ["US", "CA"],
      passports: ["GB"],
      publishedAt: "2023-01-03",
      author: "Test Author 3",
    },
    content: "# Test Post 3\n\nThis is featured test content.",
    readingTime: { text: "3 min read", minutes: 3, time: 180000, words: 30 },
  },
];

export const getAllBlogPostSlugs = jest.fn(async () => [
  { locale: "en", slug: "test-post-1" },
  { locale: "en", slug: "test-post-2" },
  { locale: "en", slug: "test-post-3" },
]);

export const getAllBlogPosts = jest.fn(
  async (locale: string, limit?: number) => {
    const posts = mockBlogPosts;
    return limit ? posts.slice(0, limit) : posts;
  }
);

export const getBlogPosts = jest.fn(
  async (options: BlogFilterOptions): Promise<PaginatedBlogResponse> => {
    const { limit = 10, offset = 0 } = options;
    const posts = mockBlogPosts.slice(offset, offset + limit);

    return {
      posts,
      total: mockBlogPosts.length,
      hasMore: offset + limit < mockBlogPosts.length,
    };
  }
);

export const getBlogPostsByDestination = jest.fn(
  async (destination: string, locale: string, limit?: number) => {
    const filtered = mockBlogPosts.filter(post =>
      post.frontmatter.destinations?.includes(destination)
    );
    return limit ? filtered.slice(0, limit) : filtered;
  }
);

export const getBlogPostsByTag = jest.fn(
  async (tag: string, locale: string, limit?: number) => {
    const filtered = mockBlogPosts.filter(post =>
      post.frontmatter.tags?.includes(tag)
    );
    return limit ? filtered.slice(0, limit) : filtered;
  }
);

export const getRelatedBlogPosts = jest.fn(
  async (destination: string, locale: string, limit: number = 3) => {
    return getBlogPostsByDestination(destination, locale, limit);
  }
);

export const getBlogPostBySlug = jest.fn(
  async (slug: string, _locale: string) => {
    return mockBlogPosts.find(post => post.slug === slug) || null;
  }
);

export const getAllTagsForLocale = jest.fn(async (_locale: string) => {
  const allTags = mockBlogPosts.flatMap(post => post.frontmatter.tags || []);
  return [...new Set(allTags)];
});

export const getAllDestinationsForLocale = jest.fn(async (_locale: string) => {
  const allDestinations = mockBlogPosts.flatMap(
    post => post.frontmatter.destinations || []
  );
  return [...new Set(allDestinations)];
});

export const searchBlogPosts = jest.fn(
  async (query: string, _locale: string, limit?: number) => {
    const lowerQuery = query.toLowerCase();
    const filtered = mockBlogPosts.filter(
      post =>
        post.frontmatter.title.toLowerCase().includes(lowerQuery) ||
        post.frontmatter.description?.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery)
    );
    return limit ? filtered.slice(0, limit) : filtered;
  }
);

export const getFeaturedBlogPosts = jest.fn(
  async (locale: string, limit: number = 5) => {
    const featured = mockBlogPosts.filter(post =>
      post.frontmatter.tags?.includes("featured")
    );
    return featured.slice(0, limit);
  }
);

export const getBlogPost = jest.fn(async (slug: string, _locale: string) => {
  return getBlogPostBySlug(slug, _locale);
});

export const getBlogPostsForLocale = jest.fn(async (_locale: string) => {
  return mockBlogPosts;
});

export const getAllUniqueTagsAcrossLocales = jest.fn(async () => {
  return getAllTagsForLocale("en");
});

export const getBlogDataForLocale = jest.fn(async (locale: string) => {
  return getBlogPostsForLocale(locale);
});
