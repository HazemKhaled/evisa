import Link from "next/link";
import { BlogPostCard } from "./blog-post-card";
import { cn } from "@/lib/utils";
import type { BlogPostData } from "@/lib/blog";
import { getTranslation } from "@/app/i18n";

interface BlogPostListProps {
  posts: BlogPostData[];
  locale: string;
  className?: string;
  currentPage?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  buildPaginationUrl?: (page: number) => string;
  gridCols?: "1" | "2" | "3" | "4";
  showPagination?: boolean;
  emptyStateMessage?: string;
}

export async function BlogPostList({
  posts,
  locale,
  className,
  currentPage = 1,
  totalPages = 1,
  hasNextPage = false,
  hasPrevPage = false,
  buildPaginationUrl = (page: number) => `?page=${page}`,
  gridCols = "3",
  showPagination = true,
  emptyStateMessage,
}: BlogPostListProps) {
  const { t } = await getTranslation(locale, "blog");
  const gridClasses = {
    "1": "grid-cols-1",
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-2 lg:grid-cols-3",
    "4": "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  // Empty state
  if (posts.length === 0) {
    return (
      <div className={cn("py-12 text-center", className)}>
        <div className="mx-auto max-w-md">
          <div className="mb-4 text-6xl opacity-50">📝</div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            {t("content.noPostsFound")}
          </h3>
          <p className="text-gray-600">
            {emptyStateMessage || t("content.noPostsAvailable")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Blog posts grid */}
      <div className={cn("grid gap-8", gridClasses[gridCols])}>
        {posts.map(post => (
          <BlogPostCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <nav
          className="flex items-center justify-between border-t border-gray-200 pt-8"
          aria-label="Blog pagination"
        >
          {/* Previous page */}
          <div className="flex flex-1 justify-start">
            {hasPrevPage ? (
              <Link
                href={buildPaginationUrl(currentPage - 1)}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                aria-label={`Go to page ${currentPage - 1}`}
              >
                ← {t("blog:pagination.previous")}
              </Link>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400">
                ← {t("blog:pagination.previous")}
              </span>
            )}
          </div>

          {/* Page numbers */}
          <div className="hidden space-x-2 md:flex">
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              const isCurrentPage = pageNum === currentPage;

              // Show page numbers with ellipsis for large page counts
              if (totalPages <= 7) {
                // Show all pages if 7 or fewer
                return (
                  <Link
                    key={pageNum}
                    href={buildPaginationUrl(pageNum)}
                    className={cn(
                      "inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
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
              } else {
                // Show ellipsis for large page counts
                const shouldShow =
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                if (!shouldShow) {
                  if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
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
                    href={buildPaginationUrl(pageNum)}
                    className={cn(
                      "inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
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
              }
            })}
          </div>

          {/* Mobile page info */}
          <div className="flex md:hidden">
            <span className="text-sm text-gray-700">
              {t("blog:pagination.page")} {currentPage}{" "}
              {t("blog:pagination.of")} {totalPages}
            </span>
          </div>

          {/* Next page */}
          <div className="flex flex-1 justify-end">
            {hasNextPage ? (
              <Link
                href={buildPaginationUrl(currentPage + 1)}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
                aria-label={`Go to page ${currentPage + 1}`}
              >
                {t("blog:pagination.next")} →
              </Link>
            ) : (
              <span className="inline-flex cursor-not-allowed items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400">
                {t("blog:pagination.next")} →
              </span>
            )}
          </div>
        </nav>
      )}

      {/* Page info summary */}
      {showPagination && totalPages > 1 && (
        <div className="text-center text-sm text-gray-500">
          {t("blog:pagination.showing")} {posts.length}{" "}
          {posts.length === 1
            ? t("blog:pagination.post")
            : t("blog:pagination.posts")}
          {totalPages > 1 && (
            <>
              {" "}
              {t("blog:pagination.on")}{" "}
              {t("blog:pagination.page").toLowerCase()} {currentPage}{" "}
              {t("blog:pagination.of")} {totalPages}
            </>
          )}
        </div>
      )}
    </div>
  );
}
