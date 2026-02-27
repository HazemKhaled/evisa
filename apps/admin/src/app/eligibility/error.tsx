"use client";

import { ErrorBoundary } from "@/components/error-boundary";

interface EligibilityErrorProps {
  error: Error;
  reset: () => void;
}

export default function EligibilityError({
  error,
  reset,
}: EligibilityErrorProps) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      title="Failed to load eligibility rules"
    />
  );
}
