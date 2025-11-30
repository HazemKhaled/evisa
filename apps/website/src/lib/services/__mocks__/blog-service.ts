/**
 * Mock implementation for blog-service-db
 */

import type {
  BlogFilterOptions,
  BlogPostData,
  PaginatedBlogResponse,
} from "../../types/blog";

const mockBlogPosts: BlogPostData[] = [
  {
    id: 1,
    slug: "test-post-1",
    title: "Test Post 1",
    description: "A test post description",
    content: "# Test Post 1\n\nThis is test content.",
    author: "Test Author",
    publishedAt: "2023-01-01",
    image: "/images/blog/test-post-1.jpg",
    destinations: ["FR"],
    passports: ["US"],
    tags: ["travel", "guide"],
    isPublished: true,
  },
  {
    id: 2,
    slug: "test-post-2",
    title: "Test Post 2",
    description: "Another test post description",
    content: "# Test Post 2\n\nThis is another test content.",
    author: "Test Author 2",
    publishedAt: "2023-01-02",
    image: "/images/blog/test-post-2.jpg",
    destinations: ["GB"],
    passports: ["CA"],
    tags: ["visa", "guide"],
    isPublished: true,
  },
  {
    id: 3,
    slug: "test-post-3",
    title: "Test Post 3",
    description: "A featured test post description",
    content: "# Test Post 3\n\nThis is featured test content.",
    author: "Test Author 3",
    publishedAt: "2023-01-03",
    image: "/images/blog/test-post-3.jpg",
    destinations: ["US", "CA"],
    passports: ["GB"],
    tags: ["featured", "test"],
    isPublished: true,
  },
];

export const getAllBlogPostSlugs = jest.fn(async () => [
  { locale: "en", slug: "test-post-1" },
  { locale: "en", slug: "test-post-2" },
  { locale: "en", slug: "test-post-3" },
]);

export const getAllBlogPosts = jest.fn(
  async (_locale: string, limit?: number) => {
    const posts = mockBlogPosts;
    return limit ? posts.slice(0, limit) : posts;
  }
);

export const getBlogPosts = jest.fn(
  async (options: BlogFilterOptions): Promise<PaginatedBlogResponse> => {
    const { limit = 10, offset = 0 } = options;
    const posts = mockBlogPosts.slice(offset, offset + limit);
    const total = mockBlogPosts.length;
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    return {
      posts,
      total,
      hasMore: offset + limit < total,
      currentPage,
      totalPages,
    };
  }
);

export const getBlogPostsByDestination = jest.fn(
  async (destination: string, _locale: string, limit?: number) => {
    const filtered = mockBlogPosts.filter(post =>
      post.destinations?.includes(destination)
    );
    return limit ? filtered.slice(0, limit) : filtered;
  }
);

export const getBlogPostsByTag = jest.fn(
  async (tag: string, _locale: string, limit?: number) => {
    const filtered = mockBlogPosts.filter(post => post.tags?.includes(tag));
    return limit ? filtered.slice(0, limit) : filtered;
  }
);

export const getRelatedBlogPosts = jest.fn(
  async (destination: string, _locale: string, limit = 3) => {
    return getBlogPostsByDestination(destination, _locale, limit);
  }
);

export const getBlogPostBySlug = jest.fn(
  async (slug: string, _locale: string) => {
    return mockBlogPosts.find(post => post.slug === slug) || null;
  }
);

export const getAllTagsForLocale = jest.fn(async (_locale: string) => {
  const allTags = mockBlogPosts.flatMap(post => post.tags || []);
  return [...new Set(allTags)];
});

export const getAllDestinationsForLocale = jest.fn(async (_locale: string) => {
  const allDestinations = mockBlogPosts.flatMap(
    post => post.destinations || []
  );
  return [...new Set(allDestinations)];
});

export const searchBlogPosts = jest.fn(
  async (query: string, _locale: string, limit?: number) => {
    const lowerQuery = query.toLowerCase();
    const filtered = mockBlogPosts.filter(
      post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description?.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery)
    );
    return limit ? filtered.slice(0, limit) : filtered;
  }
);

export const getFeaturedBlogPosts = jest.fn(
  async (_locale: string, limit = 5) => {
    const featured = mockBlogPosts.filter(post =>
      post.tags?.includes("featured")
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
