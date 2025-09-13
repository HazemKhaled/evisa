import type { ErrorInfo, ErrorContext } from "../types/errors";
import { ErrorType } from "../types/errors";

/**
 * Classify error based on the error object and context
 */
export function classifyError(error: Error, statusCode?: number): ErrorType {
  // Check status code first
  if (statusCode === 404) return ErrorType.NOT_FOUND;
  if (statusCode && statusCode >= 500) return ErrorType.SERVER_ERROR;
  if (statusCode && statusCode >= 400) return ErrorType.CLIENT_ERROR;

  // Check error message patterns
  const message = error.message.toLowerCase();

  if (message.includes("not found") || message.includes("404")) {
    return ErrorType.NOT_FOUND;
  }

  if (message.includes("network") || message.includes("fetch")) {
    return ErrorType.NETWORK_ERROR;
  }

  if (message.includes("validation") || message.includes("invalid")) {
    return ErrorType.VALIDATION_ERROR;
  }

  if (message.includes("server") || message.includes("internal")) {
    return ErrorType.SERVER_ERROR;
  }

  return ErrorType.UNKNOWN_ERROR;
}

/**
 * Extract error information from error object
 */
export function extractErrorInfo(
  error: Error & { digest?: string }
): ErrorInfo {
  return {
    message: error.message,
    digest: error.digest,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  };
}

/**
 * Log error to console (in development) or external service (in production)
 */
export function logError(error: Error, context?: ErrorContext): void {
  const errorInfo = extractErrorInfo(error);
  const errorType = classifyError(error);

  const logData = {
    ...errorInfo,
    type: errorType,
    context,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === "development") {
    console.error("[Error Handler]", logData);
  } else {
    // In production, you would send this to your monitoring service
    // Example: Sentry, LogRocket, etc.

    console.error("[Error Handler]", JSON.stringify(logData));
  }
}

/**
 * Get appropriate status code for error type
 */
export function getStatusCodeForErrorType(errorType: ErrorType): number {
  switch (errorType) {
    case ErrorType.NOT_FOUND:
      return 404;
    case ErrorType.CLIENT_ERROR:
    case ErrorType.VALIDATION_ERROR:
      return 400;
    case ErrorType.SERVER_ERROR:
      return 500;
    case ErrorType.NETWORK_ERROR:
      return 503;
    case ErrorType.UNKNOWN_ERROR:
    default:
      return 500;
  }
}

/**
 * Get translation key prefix for error type
 */
export function getTranslationKeyForErrorType(errorType: ErrorType): string {
  switch (errorType) {
    case ErrorType.NOT_FOUND:
      return "errors.notFound";
    case ErrorType.SERVER_ERROR:
      return "errors.serverError";
    case ErrorType.CLIENT_ERROR:
      return "errors.clientError";
    case ErrorType.NETWORK_ERROR:
      return "errors.networkError";
    case ErrorType.VALIDATION_ERROR:
      return "errors.validationError";
    case ErrorType.UNKNOWN_ERROR:
    default:
      return "errors.generic";
  }
}
