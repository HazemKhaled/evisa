"use client";

import { ErrorBoundary } from "@/components/error-boundary";

interface CountriesErrorProps {
  error: Error;
  reset: () => void;
}

export default function CountriesError({ error, reset }: CountriesErrorProps) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      title="Failed to load countries"
    />
  );
}
