/**
 * Authentication Package
 *
 * Clerk authentication utilities for the admin system
 */

// Re-export Clerk components and utilities
export {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";

// Re-export server utilities
export { auth, currentUser, clerkMiddleware } from "@clerk/nextjs/server";

export const AUTH_PACKAGE_VERSION = "1.0.0";
