import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  buildPaginationUrl: (page: number) => string;
  startIndex: number;
  endIndex: number;
  totalPosts: number;
  t: (key: string) => string;
  className?: string;
}

export function BlogPagination({
  currentPage,
  totalPages,
  buildPaginationUrl,
  startIndex,
  endIndex,
  totalPosts,
  t,
  className,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Pagination Controls */}
      <nav className="flex items-center justify-center space-x-2" aria-label="Pagination">
        {/* Previous Button */}
        {currentPage > 1 && (
          <Link
            href={buildPaginationUrl(currentPage - 1)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            {t('blog.pagination.previous')}
          </Link>
        )}

        {/* Page Numbers */}
        {getVisiblePages().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`dots-${index}`}
                className="px-3 py-2 text-sm text-gray-500"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={buildPaginationUrl(pageNum)}
              className={cn(
                'rounded-md border px-4 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
              )}
            >
              {pageNum}
            </Link>
          );
        })}

        {/* Next Button */}
        {currentPage < totalPages && (
          <Link
            href={buildPaginationUrl(currentPage + 1)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          >
            {t('blog.pagination.next')}
          </Link>
        )}
      </nav>

      {/* Results Summary */}
      <div className="text-center text-sm text-gray-500">
        <p>
          {t('blog.pagination.showing')} {startIndex + 1}-
          {Math.min(endIndex, totalPosts)}{' '}
          {t('blog.pagination.of')} {totalPosts}{' '}
          {t('blog.pagination.articles')}
        </p>
      </div>
    </div>
  );
}