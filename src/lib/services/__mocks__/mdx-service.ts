/**
 * Mock MDX Service for Testing
 *
 * This mock prevents Jest from importing the actual MDX compilation
 * dependencies which use ES modules that Jest can't handle.
 */

export const mockBlogPosts = [
  {
    slug: "test-post-1",
    content: "<p>Test content 1</p>",
    frontmatter: {
      title: "Test Post 1",
      description: "Test description 1",
      destinations: ["FR"],
      image: "/test-image-1.jpg",
      tags: ["travel", "test"],
      author: "Test Author",
      publishedAt: "2024-01-01",
      lastUpdated: "2024-01-01",
    },
  },
  {
    slug: "test-post-2",
    content: "<p>Test content 2</p>",
    frontmatter: {
      title: "Test Post 2",
      description: "Test description 2",
      destinations: ["GB"],
      image: "/test-image-2.jpg",
      tags: ["guide", "test"],
      author: "Test Author",
      publishedAt: "2024-01-02",
      lastUpdated: "2024-01-02",
    },
  },
  {
    slug: "test-post-3",
    content: "<p>Test content 3</p>",
    frontmatter: {
      title: "Test Post 3",
      description: "Test description 3",
      destinations: ["US", "CA"],
      image: "/test-image-3.jpg",
      tags: ["visa", "featured"],
      author: "Test Author",
      publishedAt: "2024-01-03",
      lastUpdated: "2024-01-03",
    },
  },
];

export async function getBlogPostsForLocale(_locale: string) {
  // Return mock data for any locale
  return mockBlogPosts;
}

export async function getBlogPost(_locale: string, slug: string) {
  const post = mockBlogPosts.find(p => p.slug === slug);
  if (!post) {
    throw new Error(`Blog post not found: ${slug}`);
  }
  return post;
}

export async function getAllUniqueTags(_locale: string) {
  const allTags = mockBlogPosts.flatMap(post => post.frontmatter.tags);
  return [...new Set(allTags)];
}

export async function getAllUniqueDestinations(_locale: string) {
  const allDestinations = mockBlogPosts.flatMap(
    post => post.frontmatter.destinations
  );
  return [...new Set(allDestinations)];
}

export async function compileMDX(content: string) {
  // Return simple HTML for tests
  return `<div>${content}</div>`;
}
