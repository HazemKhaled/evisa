"use client";

import ErrorPage from "@/components/errors/error-page";
import { ErrorType } from "@/lib/types/errors";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorProps) {
  return (
    <ErrorPage
      error={error}
      reset={reset}
      errorType={ErrorType.UNKNOWN_ERROR}
      showBrowseDestinations={true}
    />
  );
}
