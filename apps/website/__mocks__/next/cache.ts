/**
 * Mock for next/cache
 * This provides mock implementations of Next.js caching functions for testing
 */

export const unstable_cache = jest.fn((fn: unknown) => fn);
export const revalidateTag = jest.fn();
export const revalidatePath = jest.fn();
