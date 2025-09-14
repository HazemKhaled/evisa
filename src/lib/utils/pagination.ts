/**
 * Pagination utilities for consistent, testable pagination logic across the application
 * Provides pure functions that can be easily tested and reused
 */

export interface PaginationConfig {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface PaginationResult {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageNumbers: number[];
}

export interface PaginationUrlBuilder {
  buildUrl: (page: number) => string;
}

/**
 * Calculate pagination metadata from configuration
 * Pure function that can be easily tested
 */
export function calculatePagination(
  config: PaginationConfig
): PaginationResult {
  const { currentPage, totalItems, itemsPerPage } = config;

  // Validate inputs
  const validCurrentPage = Math.max(1, currentPage);
  const validItemsPerPage = Math.max(1, itemsPerPage);

  const totalPages = Math.max(1, Math.ceil(totalItems / validItemsPerPage));
  const safePage = Math.min(validCurrentPage, totalPages);

  const startIndex = (safePage - 1) * validItemsPerPage;
  const endIndex = Math.min(startIndex + validItemsPerPage, totalItems);

  const hasNextPage = safePage < totalPages;
  const hasPreviousPage = safePage > 1;

  // Generate page numbers for pagination display (max 5 pages)
  const pageNumbers = generatePageNumbers(safePage, totalPages, 5);

  return {
    currentPage: safePage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,
    pageNumbers,
  };
}

/**
 * Generate page numbers for pagination display
 * Pure function for generating page number arrays
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxPages: number = 5
): number[] {
  if (totalPages <= maxPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxPages / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + maxPages - 1);

  // Adjust start if we're near the end
  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Apply pagination to an array of items
 * Pure function that returns paginated slice of data
 */
export function paginateArray<T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): T[] {
  const pagination = calculatePagination({
    currentPage,
    totalItems: items.length,
    itemsPerPage,
  });

  return items.slice(pagination.startIndex, pagination.endIndex);
}

/**
 * Filter items based on criteria and return pagination info
 * Combines filtering and pagination logic for complex scenarios
 */
export function filterAndPaginate<T>(
  items: T[],
  filterFn: (item: T) => boolean,
  currentPage: number,
  itemsPerPage: number
): {
  items: T[];
  pagination: PaginationResult;
  totalFilteredItems: number;
} {
  const filteredItems = items.filter(filterFn);
  const totalFilteredItems = filteredItems.length;

  const pagination = calculatePagination({
    currentPage,
    totalItems: totalFilteredItems,
    itemsPerPage,
  });

  const paginatedItems = filteredItems.slice(
    pagination.startIndex,
    pagination.endIndex
  );

  return {
    items: paginatedItems,
    pagination,
    totalFilteredItems,
  };
}

/**
 * Blog-specific pagination with filtering support
 * Encapsulates common blog pagination patterns
 */
export interface BlogPaginationOptions {
  currentPage: number;
  itemsPerPage: number;
  tag?: string;
  destination?: string;
}

export interface BlogItem {
  tags?: string[];
  destinations?: string[];
}

export function createBlogFilter<T extends BlogItem>(
  options: Pick<BlogPaginationOptions, "tag" | "destination">
) {
  return (item: T): boolean => {
    const { tag, destination } = options;

    // Filter by tag if specified
    if (tag && !item.tags?.includes(tag.toLowerCase())) {
      return false;
    }

    // Filter by destination if specified
    if (
      destination &&
      !item.destinations?.some(dest =>
        dest.toLowerCase().includes(destination.toLowerCase())
      )
    ) {
      return false;
    }

    return true;
  };
}

/**
 * Create pagination statistics text
 * Helper for displaying pagination information to users
 */
export function createPaginationStats(
  pagination: PaginationResult,
  itemName: string = "items"
): string {
  const { startIndex, endIndex, totalItems } = pagination;

  if (totalItems === 0) {
    return `No ${itemName} found`;
  }

  if (totalItems === 1) {
    return `1 ${itemName.replace(/s$/, "")}`;
  }

  return `${startIndex + 1}-${endIndex} of ${totalItems} ${itemName}`;
}

/**
 * Validate pagination parameters from URL/query
 * Ensures safe pagination parameters
 */
export function validatePaginationParams(params: {
  page?: string | number;
  limit?: string | number;
}): {
  page: number;
  limit: number;
} {
  const parsedPage = parseInt(String(params.page || 1), 10);
  const page = Math.max(1, isNaN(parsedPage) ? 1 : parsedPage);

  const parsedLimit = parseInt(String(params.limit || 10), 10);
  const limit = Math.max(
    1,
    Math.min(100, isNaN(parsedLimit) ? 10 : parsedLimit)
  );

  return { page, limit };
}
