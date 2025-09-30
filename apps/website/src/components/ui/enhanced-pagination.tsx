import { cn } from "@repo/utils";
import { getTranslation } from "@/app/i18n";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui";

// Simple page range generator following Shadcn patterns
function generatePageNumbers(
  current: number,
  total: number
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];

  // Always show first page
  pages.push(1);

  if (current > 3) {
    pages.push("ellipsis");
  }

  // Show pages around current
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("ellipsis");
  }

  // Always show last page (if different from first)
  if (total > 1) {
    pages.push(total);
  }

  return pages;
}

interface EnhancedPaginationProps {
  currentPage: number;
  totalPages: number;
  locale: string;
  buildPaginationUrl?: (page: number) => string;
  className?: string;
}

/**
 * Enhanced pagination component following Shadcn UI patterns.
 * Provides consistent, accessible pagination with multilingual support.
 * Supports both blog-style and destinations-style URL patterns.
 * Uses inline logic instead of external utilities for better maintainability.
 */
export async function EnhancedPagination({
  currentPage,
  totalPages,
  locale,
  buildPaginationUrl,
  className,
}: EnhancedPaginationProps) {
  const { t } = await getTranslation(locale, "common");

  // Default URL builder for destinations-style pagination
  const buildUrl =
    buildPaginationUrl ||
    ((page: number) =>
      page > 1 ? `/${locale}/d?page=${page}` : `/${locale}/d`);

  if (totalPages <= 1) return null;

  const pages = generatePageNumbers(currentPage, totalPages);

  return (
    <div className={cn("border-t border-gray-200 pt-8", className)}>
      <Pagination>
        <PaginationContent className="w-full justify-between">
          {/* Previous button */}
          <PaginationItem>
            {currentPage > 1 ? (
              <PaginationPrevious href={buildUrl(currentPage - 1)}>
                {t("pagination.previous")}
              </PaginationPrevious>
            ) : (
              <span className="pointer-events-none opacity-50">
                <PaginationPrevious tabIndex={-1}>
                  {t("pagination.previous")}
                </PaginationPrevious>
              </span>
            )}
          </PaginationItem>

          {/* Page numbers - desktop only */}
          <div className="hidden md:flex">
            <PaginationContent>
              {pages.map((page, index) =>
                page === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={buildUrl(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
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
              <PaginationNext href={buildUrl(currentPage + 1)}>
                {t("pagination.next")}
              </PaginationNext>
            ) : (
              <span className="pointer-events-none opacity-50">
                <PaginationNext tabIndex={-1}>
                  {t("pagination.next")}
                </PaginationNext>
              </span>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
