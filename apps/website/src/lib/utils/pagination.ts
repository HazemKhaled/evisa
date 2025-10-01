/**
 * Essential pagination utilities for data slicing and filtering
 * Simplified to work with Shadcn pagination components
 */

/**
 * Apply pagination to an array of items
 * Pure function that returns paginated slice of data
 */
export function paginateArray<T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): T[] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
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

/**
 * Blog-specific filtering utility
 */
export interface BlogItem {
  tags?: string[];
  destinations?: string[];
}

export function createBlogFilter<T extends BlogItem>(options: {
  tag?: string;
  destination?: string;
}) {
  return (item: T): boolean => {
    const { tag, destination } = options;

    if (tag && !item.tags?.includes(tag.toLowerCase())) {
      return false;
    }

    if (
      destination &&
      !item.destinations?.some(dest => dest.includes(destination))
    ) {
      return false;
    }

    return true;
  };
}
