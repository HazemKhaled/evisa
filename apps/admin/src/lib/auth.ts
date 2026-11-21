import { requireAdminAuth } from "@repo/auth/server";

/**
 * Throws when the current request has no authenticated admin session.
 * Use at the top of read-only server actions, which return data directly
 * instead of an ActionResult.
 */
export async function assertAdminAuth(): Promise<void> {
  const authCheck = await requireAdminAuth();

  if (!authCheck.success) {
    throw new Error(authCheck.error ?? "Unauthorized");
  }
}
