"use client";

import { ErrorBoundary } from "@/components/error-boundary";

interface AppErrorProps {
  error: Error;
  reset: () => void;
}

export default function AppError({ error, reset }: AppErrorProps) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      title="Application Error"
      description="An unexpected error occurred in the application. Please try refreshing the page."
    />
  );
}
