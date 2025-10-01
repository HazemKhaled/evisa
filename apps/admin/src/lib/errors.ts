/**
 * Error handling utilities for admin server actions
 *
 * Provides consistent error handling and response formatting
 * across all admin CRUD operations.
 */

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Standardized error handler for server actions
 * @param error - The caught error object
 * @param fallbackMessage - Default error message if error doesn't have a message
 * @returns Formatted ActionResult with error details
 */
export function handleActionError(
  error: unknown,
  fallbackMessage: string
): ActionResult {
  console.error(fallbackMessage, error);

  if (error instanceof Error) {
    // Handle known database constraint errors
    if (error.message.includes("duplicate key")) {
      return {
        success: false,
        error: "A record with these values already exists",
      };
    }

    if (error.message.includes("foreign key constraint")) {
      return {
        success: false,
        error: "Cannot perform this operation due to existing relationships",
      };
    }

    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: false,
    error: fallbackMessage,
  };
}

/**
 * Type guard to check if a result is an error
 */
export function isActionError<T>(
  result: ActionResult<T>
): result is ActionResult<T> & { success: false; error: string } {
  return !result.success && result.error !== undefined;
}
