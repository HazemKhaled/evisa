/**
 * Blog Service Client API
 *
 * Client-safe wrapper functions for blog operations.
 * These functions are intended to be called from Server Components
 * and passed as props to Client Components.
 */

import type { BlogPostData } from "../types/blog";

// Re-export types for client-side usage
export type {
  BlogPostData,
  BlogFilterOptions,
  PaginatedBlogResponse,
} from "../types/blog";

/**
 * Client-side search function that operates on pre-fetched blog posts
 * This replaces the server-side searchBlogPosts function for client components
 */
export function searchBlogPostsClient(
  posts: BlogPostData[],
  query: string,
  limit?: number
): BlogPostData[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  let filteredPosts = posts.filter((post: BlogPostData) => {
    const title = post.frontmatter.title?.toLowerCase() || "";
    const description = post.frontmatter.description?.toLowerCase() || "";
    const content = post.content?.toLowerCase() || "";
    const tags = (post.frontmatter.tags || []).join(" ").toLowerCase();

    return (
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      content.includes(searchTerm) ||
      tags.includes(searchTerm)
    );
  });

  // Sort by relevance (title matches first, then description, then content)
  filteredPosts.sort((a: BlogPostData, b: BlogPostData) => {
    const aTitle = a.frontmatter.title?.toLowerCase() || "";
    const bTitle = b.frontmatter.title?.toLowerCase() || "";
    const aDesc = a.frontmatter.description?.toLowerCase() || "";
    const bDesc = b.frontmatter.description?.toLowerCase() || "";

    // Prioritize exact title matches
    if (aTitle.includes(searchTerm) && !bTitle.includes(searchTerm)) return -1;
    if (!aTitle.includes(searchTerm) && bTitle.includes(searchTerm)) return 1;

    // Then prioritize description matches
    if (aDesc.includes(searchTerm) && !bDesc.includes(searchTerm)) return -1;
    if (!aDesc.includes(searchTerm) && bDesc.includes(searchTerm)) return 1;

    // Finally sort by publication date
    const dateA = new Date(a.frontmatter.publishedAt);
    const dateB = new Date(b.frontmatter.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  if (limit) {
    filteredPosts = filteredPosts.slice(0, limit);
  }

  return filteredPosts;
}

/**
 * Client-side filter by tag
 */
export function filterBlogPostsByTagClient(
  posts: BlogPostData[],
  tag: string,
  limit?: number
): BlogPostData[] {
  let filtered = posts.filter((post: BlogPostData) =>
    post.frontmatter.tags?.some((postTag: string) =>
      postTag.toLowerCase().includes(tag.toLowerCase())
    )
  );

  // Sort by publication date (newest first)
  filtered.sort((a: BlogPostData, b: BlogPostData) => {
    const dateA = new Date(a.frontmatter.publishedAt);
    const dateB = new Date(b.frontmatter.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return filtered;
}

/**
 * Client-side filter by destination
 */
export function filterBlogPostsByDestinationClient(
  posts: BlogPostData[],
  destination: string,
  limit?: number
): BlogPostData[] {
  let filtered = posts.filter((post: BlogPostData) =>
    post.frontmatter.destinations?.some(
      (dest: string) => dest.toLowerCase() === destination.toLowerCase()
    )
  );

  // Sort by publication date (newest first)
  filtered.sort((a: BlogPostData, b: BlogPostData) => {
    const dateA = new Date(a.frontmatter.publishedAt);
    const dateB = new Date(b.frontmatter.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return filtered;
}
