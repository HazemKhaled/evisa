import { cn } from "@/lib/utils";
import { getTranslation } from "@/app/i18n";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

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
    <div className={cn("border-t border-gray-200 pt-8", className)}>
      <Pagination>
        <PaginationContent className="w-full justify-between">
          {/* Previous button */}
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious
                href={buildUrl(currentPage - 1)}
                className="ltr:flex-row rtl:flex-row-reverse"
              >
                {t("pagination.previous")}
              </PaginationPrevious>
            ) : (
              <PaginationPrevious
                className="pointer-events-none opacity-50 ltr:flex-row rtl:flex-row-reverse"
                tabIndex={-1}
              >
                {t("pagination.previous")}
              </PaginationPrevious>
            )}
          </PaginationItem>

          {/* Page numbers - desktop only */}
          <div className="hidden md:flex">
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                const isCurrentPage = pageNum === currentPage;

                if (!shouldShowPage(pageNum)) {
                  if (shouldShowEllipsis(pageNum)) {
                    return (
                      <PaginationItem key={`ellipsis-${pageNum}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={buildUrl(pageNum)}
                      isActive={isCurrentPage}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            </PaginationContent>
          </div>

          {/* Mobile page info */}
          <div className="flex md:hidden">
            <span className="text-muted-foreground text-sm">
              {t("pagination.page")} {currentPage} {t("pagination.of")}{" "}
              {totalPages}
            </span>
          </div>

          {/* Next button */}
          <PaginationItem>
            {currentPage < totalPages ? (
              <PaginationNext
                href={buildUrl(currentPage + 1)}
                className="ltr:flex-row rtl:flex-row-reverse"
              >
                {t("pagination.next")}
              </PaginationNext>
            ) : (
              <PaginationNext
                className="pointer-events-none opacity-50 ltr:flex-row rtl:flex-row-reverse"
                tabIndex={-1}
              >
                {t("pagination.next")}
              </PaginationNext>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
