/**
 * Authentication Package - Server Utilities
 *
 * Clerk authentication utilities for server components and API routes
 * These should only be imported in server components or server actions
 */

import { auth } from "@clerk/nextjs/server";

// Re-export Clerk server utilities
export { auth, clerkMiddleware, currentUser } from "@clerk/nextjs/server";

/**
 * Requires authentication for admin operations
 * Returns error result if user is not authenticated
 * Can be extended in the future to check specific roles/permissions
 *
 * Usage in server actions:
 * ```
 * const authCheck = await requireAdminAuth();
 * if (!authCheck.success) {
 *   return authCheck;
 * }
 * // Proceed with admin operation
 * ```
 */
export async function requireAdminAuth(): Promise<{
  success: boolean;
  error?: string;
}> {
  const session = await auth();

  if (!session) {
    return {
      success: false,
      error: "Unauthorized: You must be logged in to perform this action",
    };
  }

  return { success: true };
}
