export interface ErrorInfo {
  message: string;
  digest?: string;
  stack?: string;
}

export interface ErrorContext {
  locale: string;
  pathname?: string;
  searchParams?: Record<string, string>;
}

export const ERROR_TYPE = {
  NOT_FOUND: "not_found",
  SERVER_ERROR: "server_error",
  CLIENT_ERROR: "client_error",
  NETWORK_ERROR: "network_error",
  VALIDATION_ERROR: "validation_error",
  UNKNOWN_ERROR: "unknown_error",
} as const;

export type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE];

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset?: () => void;
  statusCode?: number;
  errorType?: ErrorType;
}
