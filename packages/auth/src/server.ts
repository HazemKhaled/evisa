/**
 * Authentication Package - Server Utilities
 *
 * Clerk authentication utilities for server components and API routes
 * These should only be imported in server components or server actions
 */

// Re-export Clerk server utilities
export { auth, currentUser, clerkMiddleware } from "@clerk/nextjs/server";
