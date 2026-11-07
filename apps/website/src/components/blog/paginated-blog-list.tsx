"use client";

import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

interface PaginatedBlogListProps {
  pages: ReactNode[];
}

/**
 * Renders the pre-rendered page of posts matching the `?page=` query param.
 *
 * The query string is read here rather than in the page's Server Component so
 * the route stays statically cacheable (reading `searchParams` in a Server
 * Component forces dynamic rendering in Next 16). Every page is rendered on the
 * server, so switching pages never triggers a data fetch.
 */
export function PaginatedBlogList({ pages }: PaginatedBlogListProps) {
  const searchParams = useSearchParams();
  const parsedPage = parseInt(searchParams.get("page") ?? "1", 10);
  const pageIndex = Number.isNaN(parsedPage)
    ? 0
    : Math.min(Math.max(parsedPage, 1), pages.length) - 1;

  return <>{pages[pageIndex] ?? pages[0] ?? null}</>;
}
