"use client";

import { ErrorBoundary } from "@/components/error-boundary";

interface VisaTypesErrorProps {
  error: Error;
  reset: () => void;
}

export default function VisaTypesError({ error, reset }: VisaTypesErrorProps) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      title="Failed to load visa types"
    />
  );
}
