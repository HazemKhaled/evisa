import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";

interface ErrorActionsProps {
  locale: string;
  reset?: () => void;
  showBrowseDestinations?: boolean;
}

export default function ErrorActions({
  locale,
  reset,
  showBrowseDestinations = false,
}: ErrorActionsProps) {
  const { t } = useTranslation("error", locale);

  return (
    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
      {reset && (
        <button
          onClick={reset}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          {t("error.tryAgain")}
        </button>
      )}

      <Link
        href={`/${locale}`}
        className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
      >
        {t("error.goHome")}
      </Link>

      {showBrowseDestinations && t("error.browseDestinations") && (
        <Link
          href={`/${locale}/d`}
          className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
        >
          {t("error.browseDestinations")}
        </Link>
      )}
    </div>
  );
}
