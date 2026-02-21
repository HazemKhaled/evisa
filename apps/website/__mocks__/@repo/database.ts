/**
 * Mock for @repo/database
 * This prevents the actual database module from loading in tests,
 * avoiding issues with Next.js server APIs and database initialization
 */

export const getDb = jest.fn();
export const eq = jest.fn((col: unknown, val: unknown) => ({
  condition: "eq",
  col,
  val,
}));
export const isNull = jest.fn((col: unknown) => ({ condition: "isNull", col }));
export const isNotNull = jest.fn((col: unknown) => ({
  condition: "isNotNull",
  col,
}));
export const like = jest.fn((col: unknown, val: unknown) => ({
  condition: "like",
  col,
  val,
}));
export const and = jest.fn((...args: readonly unknown[]) => ({
  condition: "and",
  args,
}));
export const or = jest.fn((...args: readonly unknown[]) => ({
  condition: "or",
  args,
}));
export const inArray = jest.fn((col: unknown, vals: readonly unknown[]) => ({
  condition: "inArray",
  col,
  vals,
}));
export const count = jest.fn(() => ({ count: 0 }));
export const avg = jest.fn((col: unknown) => ({ condition: "avg", col }));
export const min = jest.fn((col: unknown) => ({ condition: "min", col }));
export const max = jest.fn((col: unknown) => ({ condition: "max", col }));
export const desc = jest.fn((col: unknown) => ({ order: "desc", col }));
export const sql = jest.fn(
  (_strings: TemplateStringsArray, ..._values: readonly unknown[]) => ({
    sql: true,
  })
);

// Export table references as mocks
export const countries = { code: "code", name: "name" };
export const countriesI18n = {
  countryCode: "countryCode",
  locale: "locale",
  name: "name",
};
export const visaTypes = {
  destinationCode: "destinationCode",
  id: "id",
  isActive: "isActive",
};
export const visaEligibility = {
  destinationCode: "destinationCode",
  eligibilityStatus: "status",
};
export const blogPosts = { id: "id", slug: "slug" };
export const blogPostsI18n = { postId: "postId", locale: "locale" };
export const blogPostTags = { postId: "postId", tagId: "tagId" };
export const blogTags = { id: "id", slug: "slug" };
