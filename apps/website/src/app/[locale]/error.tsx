"use client";

import ErrorPage from "@/components/errors/error-page";
import { ERROR_TYPE } from "@/lib/types/errors";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorProps) {
  return (
    <ErrorPage
      error={error}
      reset={reset}
      errorType={ERROR_TYPE.UNKNOWN_ERROR}
      showBrowseDestinations={true}
    />
  );
}
