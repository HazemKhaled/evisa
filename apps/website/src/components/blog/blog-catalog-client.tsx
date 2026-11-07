"use client";

import {
  BlurFade,
  Card,
  CardContent,
  MagicCard,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui";
import { cn } from "@repo/utils";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { getCanonicalBlogUrl } from "@/lib/json-ld";
import {
  type BlogPostData,
  filterBlogPostsByDestinationClient,
  filterBlogPostsByTagClient,
  searchBlogPostsClient,
} from "@/lib/services/blog-service-client";
import { paginateArray } from "@/lib/utils/pagination";

import {
  BlogCardBadges,
  BlogCardDescription,
  BlogCardImage,
  BlogCardMeta,
  BlogCardTitle,
} from "./blog-card-components";
import { BlogSearch } from "./blog-search";

export interface BlogCatalogTranslations {
  title: string;
  subtitle: string;
  searchHeading: string;
  searchPlaceholder: string;
  emptyState: string;
  emptySearchTemplate: string;
  tagTitleTemplate: string;
  tagSubtitleTemplate: string;
  destinationTitleTemplate: string;
  destinationSubtitleTemplate: string;
  breadcrumbHome: string;
  breadcrumbBlog: string;
  breadcrumbDestinations: string;
  paginationShowing: string;
  paginationPost: string;
  paginationPosts: string;
  paginationOn: string;
  paginationPage: string;
  paginationOf: string;
  paginationPrevious: string;
  paginationNext: string;
}

export interface BlogCatalogProps {
  locale: string;
  posts: BlogPostData[];
  baseUrl: string;
  routeDestination?: string;
  routeTag?: string;
  postsPerPage?: number;
  translations: BlogCatalogTranslations;
}

interface BlogCatalogViewProps extends BlogCatalogProps {
  pageParam?: string;
  tagParam?: string;
  destinationParam?: string;
  searchParam?: string;
}

function decodedOrOriginalTag(tag: string): string {
  try {
    return decodeURIComponent(tag);
  } catch {
    return tag;
  }
}

function generatePageNumbers(
  current: number,
  total: number
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("ellipsis");
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
}

function buildBlogBreadcrumbs(
  search: string | undefined,
  destination: string | undefined,
  tag: string | undefined,
  locale: string,
  baseUrl: string,
  canonicalBlogUrl: string,
  translations: BlogCatalogTranslations
): { decodedLabel: string; url: string }[] {
  if (search) {
    return [
      {
        decodedLabel: translations.breadcrumbHome,
        url: `${baseUrl}/${locale}`,
      },
      {
        decodedLabel: translations.breadcrumbBlog,
        url: `${baseUrl}/${locale}/blog`,
      },
      { decodedLabel: translations.searchHeading, url: canonicalBlogUrl },
    ];
  }

  if (destination) {
    return [
      {
        decodedLabel: translations.breadcrumbHome,
        url: `${baseUrl}/${locale}`,
      },
      {
        decodedLabel: translations.breadcrumbDestinations,
        url: `${baseUrl}/${locale}/d`,
      },
      {
        decodedLabel: destination,
        url: `${baseUrl}/${locale}/d/${encodeURIComponent(destination)}`,
      },
      { decodedLabel: translations.breadcrumbBlog, url: canonicalBlogUrl },
    ];
  }

  if (tag) {
    return [
      {
        decodedLabel: translations.breadcrumbHome,
        url: `${baseUrl}/${locale}`,
      },
      {
        decodedLabel: translations.breadcrumbBlog,
        url: `${baseUrl}/${locale}/blog`,
      },
      { decodedLabel: decodedOrOriginalTag(tag), url: canonicalBlogUrl },
    ];
  }

  return [
    { decodedLabel: translations.breadcrumbHome, url: `${baseUrl}/${locale}` },
    { decodedLabel: translations.breadcrumbBlog, url: canonicalBlogUrl },
  ];
}

export function BlogCatalogView({
  locale,
  posts,
  baseUrl,
  routeDestination,
  routeTag,
  postsPerPage = 9,
  translations,
  pageParam = "1",
  tagParam,
  destinationParam,
  searchParam,
}: BlogCatalogViewProps) {
  const search = searchParam?.trim() ? searchParam.trim() : undefined;
  const tag = tagParam || routeTag;
  const destination = destinationParam || routeDestination;

  const parsedPage = parseInt(pageParam, 10);
  const requestedPage =
    search || Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  let filteredPosts = posts;
  if (search) {
    filteredPosts = searchBlogPostsClient(filteredPosts, search, postsPerPage);
  } else {
    if (tag) {
      filteredPosts = filterBlogPostsByTagClient(filteredPosts, tag);
    }
    if (destination) {
      filteredPosts = filterBlogPostsByDestinationClient(
        filteredPosts,
        destination
      );
    }
  }

  const totalPages = search
    ? 1
    : Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const currentPage = search ? 1 : requestedPage;
  const visiblePosts = search
    ? filteredPosts
    : paginateArray(filteredPosts, currentPage, postsPerPage);

  let pageTitle = translations.title;
  let pageSubtitle = translations.subtitle;

  if (search) {
    pageTitle = translations.searchHeading;
  } else if (tag) {
    const decodedTag = decodedOrOriginalTag(tag);
    pageTitle = translations.tagTitleTemplate.replace("__TAG__", decodedTag);
    pageSubtitle = translations.tagSubtitleTemplate.replace(
      "__TAG__",
      decodedTag
    );
  } else if (destination) {
    pageTitle = translations.destinationTitleTemplate.replace(
      "__DESTINATION__",
      destination
    );
    pageSubtitle = translations.destinationSubtitleTemplate.replace(
      "__DESTINATION__",
      destination
    );
  }

  const emptyStateMessage = search
    ? translations.emptySearchTemplate.replace("__SEARCH__", search)
    : translations.emptyState;

  const canonicalBlogUrl = getCanonicalBlogUrl(baseUrl, locale, {
    search,
    tag,
    destination,
  });

  const breadcrumbModel = buildBlogBreadcrumbs(
    search,
    destination,
    tag,
    locale,
    baseUrl,
    canonicalBlogUrl,
    translations
  );

  const breadcrumbItems = breadcrumbModel.map((item, index) => ({
    label: item.decodedLabel,
    href: index === breadcrumbModel.length - 1 ? undefined : item.url,
    isCurrentPage: index === breadcrumbModel.length - 1,
  }));

  const buildPaginationUrl = (targetPage: number): string => {
    const queryParams = new URLSearchParams();
    queryParams.set("page", targetPage.toString());

    if (tag && !routeTag) {
      queryParams.set("tag", tag);
    }
    if (destination && !routeDestination) {
      queryParams.set("destination", destination);
    }
    if (search) {
      queryParams.set("search", search);
    }

    const queryString = queryParams.toString();
    const query = queryString ? `?${queryString}` : "";

    if (tag) {
      return `/${locale}/blog/t/${encodeURIComponent(tag)}${query}`;
    }
    if (destination) {
      return `/${locale}/d/${encodeURIComponent(destination)}/blog${query}`;
    }
    return `/${locale}/blog${query}`;
  };

  const pages = generatePageNumbers(currentPage, totalPages);

  return (
    <div className="mx-auto max-w-7xl">
      <PageBreadcrumb items={breadcrumbItems} className="mb-8" />

      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
          {pageTitle}
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-gray-600">
          {pageSubtitle}
        </p>
      </div>

      <div className="mb-12">
        <Suspense
          fallback={<div className="h-14 w-full rounded-lg border bg-white" />}
        >
          <BlogSearch
            locale={locale}
            searchValue={search}
            searchPlaceholder={translations.searchPlaceholder}
          />
        </Suspense>
      </div>

      {visiblePosts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-gray-600">{emptyStateMessage}</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map(post => (
              <BlurFade key={post.slug} delay={0.25} inView>
                <MagicCard className="cursor-pointer transition-all duration-300 hover:scale-[1.01]">
                  <Card className={cn("overflow-hidden border-0 shadow-none")}>
                    <article
                      aria-labelledby={`post-title-${post.slug}`}
                      aria-describedby={`post-description-${post.slug}`}
                    >
                      <BlogCardImage
                        post={post}
                        locale={locale}
                        imageAspectRatio="video"
                      />

                      <CardContent className="p-4">
                        <BlogCardBadges
                          post={post}
                          locale={locale}
                          showDestinations
                          showTags
                        />

                        <BlogCardTitle post={post} locale={locale} />

                        <BlogCardDescription post={post} />

                        <BlogCardMeta post={post} locale={locale} />
                      </CardContent>
                    </article>
                  </Card>
                </MagicCard>
              </BlurFade>
            ))}
          </div>

          {!search && totalPages > 1 && (
            <>
              <div className="border-t border-gray-200 pt-8">
                <Pagination>
                  <PaginationContent className="w-full justify-between">
                    <PaginationItem>
                      {currentPage > 1 ? (
                        <PaginationPrevious
                          href={buildPaginationUrl(currentPage - 1)}
                        >
                          {translations.paginationPrevious}
                        </PaginationPrevious>
                      ) : (
                        <span className="pointer-events-none opacity-50">
                          <PaginationPrevious tabIndex={-1}>
                            {translations.paginationPrevious}
                          </PaginationPrevious>
                        </span>
                      )}
                    </PaginationItem>

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
                                href={buildPaginationUrl(page)}
                                isActive={page === currentPage}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        )}
                      </PaginationContent>
                    </div>

                    <div className="flex md:hidden">
                      <span className="text-muted-foreground text-sm">
                        {translations.paginationPage} {currentPage}{" "}
                        {translations.paginationOf} {totalPages}
                      </span>
                    </div>

                    <PaginationItem>
                      {currentPage < totalPages ? (
                        <PaginationNext
                          href={buildPaginationUrl(currentPage + 1)}
                        >
                          {translations.paginationNext}
                        </PaginationNext>
                      ) : (
                        <span className="pointer-events-none opacity-50">
                          <PaginationNext tabIndex={-1}>
                            {translations.paginationNext}
                          </PaginationNext>
                        </span>
                      )}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>

              <div className="text-center text-sm text-gray-500">
                {translations.paginationShowing} {visiblePosts.length}{" "}
                {visiblePosts.length === 1
                  ? translations.paginationPost
                  : translations.paginationPosts}{" "}
                {translations.paginationOn}{" "}
                {translations.paginationPage.toLowerCase()} {currentPage}{" "}
                {translations.paginationOf} {totalPages}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function BlogCatalogClient(props: BlogCatalogProps) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || "1";
  const tagParam = searchParams.get("tag") || undefined;
  const destinationParam = searchParams.get("destination") || undefined;
  const searchParam = searchParams.get("search") || undefined;

  return (
    <BlogCatalogView
      {...props}
      pageParam={pageParam}
      tagParam={tagParam}
      destinationParam={destinationParam}
      searchParam={searchParam}
    />
  );
}
