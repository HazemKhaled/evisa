import Link from "next/link";
import { cn } from "@/lib/utils";
import { getTranslation } from "@/app/i18n";

interface EnhancedPaginationProps {
  currentPage: number;
  totalPages: number;
  locale: string;
  buildPaginationUrl?: (page: number) => string;
  className?: string;
}

/**
 * Enhanced pagination component that provides a consistent, accessible pagination experience
 * across the application. Supports both blog-style and destinations-style URL patterns.
 */
export async function EnhancedPagination({
  currentPage,
  totalPages,
  locale,
  buildPaginationUrl,
  className,
}: EnhancedPaginationProps) {
  const { t } = await getTranslation(locale, "common");
  // Default URL builder for destinations-style pagination (server-safe)
  const defaultBuildPaginationUrl = (page: number): string => {
    // For server-side rendering, we'll just build basic pagination URLs
    // The actual search params will be preserved by the server
    if (page > 1) {
      return `/${locale}/d?page=${page}`;
    }
    return `/${locale}/d`;
  };

  const buildUrl = buildPaginationUrl || defaultBuildPaginationUrl;

  if (totalPages <= 1) return null;

  // Helper to determine if a page should be shown
  const shouldShowPage = (pageNum: number): boolean => {
    if (totalPages <= 7) return true;

    return (
      pageNum === 1 ||
      pageNum === totalPages ||
      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
    );
  };

  // Helper to determine if ellipsis should be shown
  const shouldShowEllipsis = (pageNum: number): boolean => {
    return (
      totalPages > 7 &&
      (pageNum === currentPage - 2 || pageNum === currentPage + 2)
    );
  };

  return (
    <nav
      className={cn(
        "flex items-center justify-between border-t border-gray-200 pt-8",
        className
      )}
      aria-label={t("aria.pagination")}
    >
      {/* Previous page */}
      <div className="flex flex-1 justify-start">
        {currentPage > 1 ? (
          <Link
            href={buildUrl(currentPage - 1)}
            className="inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            aria-label={`Go to page ${currentPage - 1}`}
          >
            <svg
              className="h-4 w-4 ltr:mr-2 rtl:ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t("pagination.previous")}
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400">
            <svg
              className="h-4 w-4 ltr:mr-2 rtl:ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t("pagination.previous")}
          </span>
        )}
      </div>

      {/* Page numbers */}
      <div className="hidden space-x-2 md:flex rtl:space-x-reverse">
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          const isCurrentPage = pageNum === currentPage;

          if (!shouldShowPage(pageNum)) {
            if (shouldShowEllipsis(pageNum)) {
              return (
                <span
                  key={`ellipsis-${pageNum}`}
                  className="inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500"
                  aria-hidden="true"
                >
                  …
                </span>
              );
            }
            return null;
          }

          return (
            <Link
              key={pageNum}
              href={buildUrl(pageNum)}
              className={cn(
                "inline-flex cursor-pointer items-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none",
                isCurrentPage
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
              aria-label={
                isCurrentPage
                  ? `Current page, page ${pageNum}`
                  : `Go to page ${pageNum}`
              }
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Mobile page info */}
      <div className="flex md:hidden">
        <span className="text-sm text-gray-700">
          {t("pagination.page")} {currentPage} {t("pagination.of")} {totalPages}
        </span>
      </div>

      {/* Next page */}
      <div className="flex flex-1 justify-end">
        {currentPage < totalPages ? (
          <Link
            href={buildUrl(currentPage + 1)}
            className="inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            aria-label={`Go to page ${currentPage + 1}`}
          >
            {t("pagination.next")}
            <svg
              className="h-4 w-4 ltr:ml-2 rtl:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400">
            {t("pagination.next")}
            <svg
              className="h-4 w-4 ltr:ml-2 rtl:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        )}
      </div>
    </nav>
  );
}
