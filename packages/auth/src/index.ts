/**
 * Authentication Package - Client Components
 *
 * Clerk authentication utilities for client components
 * For server-side utilities, import from "@repo/auth/server"
 */

// Re-export Clerk client components and hooks
export {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export const AUTH_PACKAGE_VERSION = "1.0.0";
