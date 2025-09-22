"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import type { ErrorPageProps } from "@/lib/types/errors";
import { ErrorType } from "@/lib/types/errors";
import { classifyError, logError } from "@/lib/errors/utils";
import ErrorActions from "./error-actions";
import { useTranslation } from "@/app/i18n/client";

interface ErrorPageComponentProps extends ErrorPageProps {
  showBrowseDestinations?: boolean;
}

export default function ErrorPage({
  error,
  reset,
  statusCode,
  errorType,
  showBrowseDestinations = false,
}: ErrorPageComponentProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const { t } = useTranslation("common", locale);

  // Log the error
  useEffect(() => {
    logError(error, {
      locale,
      pathname: window.location.pathname,
    });
  }, [error, locale]);

  // Determine error type
  const detectedErrorType = errorType || classifyError(error, statusCode);

  // Get translations
  const errorKey =
    detectedErrorType === ErrorType.NOT_FOUND
      ? "notFound"
      : detectedErrorType === ErrorType.SERVER_ERROR
        ? "serverError"
        : detectedErrorType === ErrorType.NETWORK_ERROR
          ? "networkError"
          : "generic";

  return (
    <div
      className={`flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8`}
    >
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {/* Error Icon */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            {/* Error Title */}
            <h1 className="mt-4 text-lg font-medium text-gray-900">
              {t(`errors.${errorKey}.title`)}
            </h1>

            {/* Error Description */}
            <p className="mt-2 text-sm text-gray-600">
              {t(`errors.${errorKey}.description`)}
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                  {t(`errors.${errorKey}.errorDetails`)}
                </summary>
                <div className="mt-2 rounded bg-gray-100 p-3 text-xs">
                  <p>
                    <span className="font-semibold">
                      {t(`errors.${errorKey}.messageLabel`)}
                    </span>{" "}
                    {error.message}
                  </p>
                  {error.digest && (
                    <p>
                      <span className="font-semibold">
                        {t(`errors.${errorKey}.digest`)}:
                      </span>{" "}
                      {error.digest}
                    </p>
                  )}
                  {error.stack && (
                    <pre className="mt-2 whitespace-pre-wrap">
                      {error.stack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <ErrorActions
              locale={locale}
              reset={reset}
              showBrowseDestinations={showBrowseDestinations}
            />

            {/* Help Text */}
            <p className="mt-6 text-xs text-gray-500">
              {t(`errors.${errorKey}.helpText`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
