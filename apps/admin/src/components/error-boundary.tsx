"use client";

import { Button } from "@repo/ui";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
  title?: string;
  description?: string;
}

export function ErrorBoundary({
  error,
  reset,
  title = "Something went wrong",
  description,
}: ErrorBoundaryProps) {
  const defaultDescription =
    error.message || "An unexpected error occurred. Please try again.";

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center">
      <div className="mb-4 text-5xl" aria-hidden="true">
        ⚠️
      </div>
      <h2 className="mb-2 text-xl font-semibold text-red-800">{title}</h2>
      <p className="mb-6 max-w-md text-sm text-red-600">
        {description || defaultDescription}
      </p>
      <Button onClick={reset} variant="destructive">
        Try again
      </Button>
    </div>
  );
}
