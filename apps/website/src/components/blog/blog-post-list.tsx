import { BlogPostCard } from "./blog-post-card";
import { cn } from "@repo/utils";
import type { BlogPostData } from "@/lib/services/blog-service";
import { getTranslation } from "@/app/i18n";
import { EnhancedPagination } from "@/components/ui";

interface BlogPostListProps {
  posts: BlogPostData[];
  locale: string;
  className?: string;
  currentPage?: number;
  totalPages?: number;
  buildPaginationUrl?: (page: number) => string;
  gridCols?: "1" | "2" | "3" | "4";
  showPagination?: boolean;
}

export async function BlogPostList({
  posts,
  locale,
  className,
  currentPage = 1,
  totalPages = 1,
  buildPaginationUrl = (page: number) => `?page=${page}`,
  gridCols = "3",
  showPagination = true,
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
          <p className="text-gray-600">{t("content.noPostsAvailable")}</p>
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
        <EnhancedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          locale={locale}
          buildPaginationUrl={buildPaginationUrl}
        />
      )}

      {/* Page info summary */}
      {showPagination && totalPages > 1 && (
        <div className="text-center text-sm text-gray-500">
          {t("pagination.showing")} {posts.length}{" "}
          {posts.length === 1 ? t("pagination.post") : t("pagination.posts")}
          {totalPages > 1 && (
            <>
              {" "}
              {t("pagination.on")} {t("pagination.page").toLowerCase()}{" "}
              {currentPage} {t("pagination.of")} {totalPages}
            </>
          )}
        </div>
      )}
    </div>
  );
}
