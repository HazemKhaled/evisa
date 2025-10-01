/**
 * Shared Blog Types
 *
 * This file contains shared type definitions for the blog system
 * to prevent circular dependencies between core and service modules.
 */

export interface BlogPostData {
  // Core identifiers
  id?: number; // Database ID (optional for compatibility)
  slug: string;

  // Content
  title: string;
  description: string;
  content: string; // Database content (HTML/markdown)

  // Metadata
  author: string;
  publishedAt: string;
  lastUpdated?: string;
  image: string;

  // Relationships
  destinations: string[]; // Array of country codes
  passports?: string[]; // Array of passport country codes
  tags: string[];
  related_visas?: string[];

  // Status
  isPublished?: boolean;
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
