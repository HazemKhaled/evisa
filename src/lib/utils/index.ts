/**
 * Centralized exports for all utility modules
 * Provides a single entry point for importing utilities
 */

// Specialized utilities
export * from "./flags";
export * from "./urls";
export * from "./styles";
export * from "./pagination";
export * from "./translations";

// Re-export commonly used utilities with better names
export {
  getBaseUrl,
  buildLocalePath,
  buildBlogUrl,
  buildBlogPostUrl,
  buildTagUrl,
  buildNavUrls,
} from "./urls";

export {
  containerStyles,
  textStyles,
  buttonStyles,
  cardStyles,
  formStyles,
  layoutStyles,
  tagStyles,
  createResponsiveGrid,
} from "./styles";

export {
  calculatePagination,
  generatePageNumbers,
  paginateArray,
  filterAndPaginate,
  createBlogFilter,
  createPaginationStats,
} from "./pagination";

export {
  loadTranslations,
  loadLayoutTranslations,
  loadPageTranslations,
  loadHeroTranslations,
  loadBlogTranslations,
  translationKeys,
} from "./translations";
