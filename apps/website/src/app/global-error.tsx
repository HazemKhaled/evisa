"use client";

import * as Sentry from "@sentry/nextjs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { languages } from "@/app/i18n/settings";
import ErrorPage from "@/components/errors/error-page";
import { ERROR_TYPE } from "@/lib/types/errors";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const pathname = usePathname();

  const localeSegment = pathname?.split("/").filter(Boolean)[0];
  const htmlLang =
    localeSegment &&
    languages.includes(localeSegment as (typeof languages)[number])
      ? localeSegment
      : "en";

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang={htmlLang}>
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
