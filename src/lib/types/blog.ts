/**
 * Shared Blog Types
 *
 * This file contains shared type definitions for the blog system
 * to prevent circular dependencies between core and service modules.
 */

export interface BlogPostData {
  content: string;
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    destinations: string[]; // Array of 3-letter country codes
    image: string;
    tags: string[];
    passport?: string;
    related_visas?: string[];
    author: string;
    publishedAt: string;
    lastUpdated?: string;
    [key: string]: unknown;
  };
  destinationNames?: string[]; // Legacy field - kept for compatibility
}

export interface BlogFilterOptions {
  locale: string;
  limit?: number;
  offset?: number;
  tag?: string;
  destination?: string;
  author?: string;
}

export interface PaginatedBlogResponse {
  posts: BlogPostData[];
  total: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}
