export * from "./countries";
export * from "./visa-types";
export * from "./visa-eligibility";
export * from "./blog-posts";

// Re-export all tables for easy import
export { countries, countriesI18n } from "./countries";
export { visaTypes, visaTypesI18n } from "./visa-types";
export { visaEligibility, visaEligibilityI18n } from "./visa-eligibility";
export { blogPosts, blogPostsI18n, blogTags, blogPostTags } from "./blog-posts";
