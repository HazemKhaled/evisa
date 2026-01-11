"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import ErrorPage from "@/components/errors/error-page";
import { ERROR_TYPE } from "@/lib/types/errors";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <ErrorPage
          error={error}
          reset={reset}
          errorType={ERROR_TYPE.UNKNOWN_ERROR}
          showBrowseDestinations={true}
        />
      </body>
    </html>
  );
}
