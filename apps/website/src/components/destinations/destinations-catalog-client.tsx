"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import type { DestinationMetadata } from "@/lib/services/country-service";
import { paginateArray } from "@/lib/utils/pagination";

import { SearchFilterForm } from "./search-filter-form";

export interface DestinationsCatalogTranslations {
  heroTitle: string;
  heroDescription: string;
  searchPlaceholder: string;
  allContinents: string;
  searchLabel: string;
  continentLabel: string;
  resultsShowingTemplate: string;
  visaTypes: string;
  processingTime: string;
  viewDetails: string;
  days: string;
  notAvailable: string;
  emptyTitle: string;
  emptyDescription: string;
  emptyClearFilters: string;
  paginationPrevious: string;
  paginationNext: string;
  paginationPage: string;
  paginationOf: string;
}

export interface DestinationsCatalogProps {
  locale: string;
  destinations: DestinationMetadata[];
  continents: string[];
  itemsPerPage?: number;
  translations: DestinationsCatalogTranslations;
}

interface DestinationsCatalogViewProps extends DestinationsCatalogProps {
  searchParam?: string;
  continentParam?: string;
  pageParam?: string;
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

export function DestinationsCatalogView({
  locale,
  destinations,
  continents,
  itemsPerPage = 20,
  translations,
  searchParam,
  continentParam,
  pageParam = "1",
}: DestinationsCatalogViewProps) {
  const search = searchParam?.trim().toLowerCase();
  const continent = continentParam?.trim().toLowerCase();
  const parsedPage = parseInt(pageParam, 10);
  const requestedPage =
    Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  const filteredDestinations = destinations.filter(destination => {
    if (search) {
      const nameMatch = destination.localizedName
        .toLowerCase()
        .includes(search);
      const codeMatch = destination.code.toLowerCase().includes(search);
      if (!nameMatch && !codeMatch) {
        return false;
      }
    }

    if (continent && continent !== "all") {
      if ((destination.continent || "").toLowerCase() !== continent) {
        return false;
      }
    }

    return true;
  });

  const totalItems = filteredDestinations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = requestedPage;
  const paginatedDestinations = paginateArray(
    filteredDestinations,
    currentPage,
    itemsPerPage
  );

  const resultsText = translations.resultsShowingTemplate
    .replace("__COUNT__", String(totalItems))
    .replace("__TOTAL__", String(totalItems));

  const buildPaginationUrl = (targetPage: number): string => {
    const queryParams = new URLSearchParams();
    if (targetPage > 1) {
      queryParams.set("page", targetPage.toString());
    }
    if (searchParam?.trim()) {
      queryParams.set("search", searchParam.trim());
    }
    if (continentParam?.trim() && continentParam.trim() !== "all") {
      queryParams.set("continent", continentParam.trim());
    }
    const queryString = queryParams.toString();
    return queryString ? `/${locale}/d?${queryString}` : `/${locale}/d`;
  };

  const pages = generatePageNumbers(currentPage, totalPages);

  return (
    <>
      <section className="from-primary/5 bg-gradient-to-br via-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="from-primary mb-6 bg-gradient-to-r via-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
              {translations.heroTitle}
            </h1>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
              {translations.heroDescription}
            </p>

            <Suspense
              fallback={
                <div className="h-14 w-full rounded-lg border bg-white" />
              }
            >
              <SearchFilterForm
                locale={locale}
                continents={continents}
                translations={{
                  searchPlaceholder: translations.searchPlaceholder,
                  allContinents: translations.allContinents,
                  searchLabel: translations.searchLabel,
                  continentLabel: translations.continentLabel,
                }}
              />
            </Suspense>

            <div className="text-muted-foreground mt-4 text-sm">
              {resultsText}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedDestinations.map(destination => (
            <Link
              key={destination.code}
              href={`/${locale}/d/${destination.code}`}
              className="group block"
            >
              <div className="bg-card hover:border-primary/20 rounded-lg border p-6 transition-all duration-200 group-hover:scale-105 hover:shadow-lg">
                <div className="bg-muted mx-auto mb-4 flex h-12 w-16 items-center justify-center overflow-hidden rounded">
                  <div className="from-primary/20 to-primary/10 flex h-full w-full items-center justify-center bg-gradient-to-br">
                    <span className="text-primary text-xs font-bold uppercase">
                      {destination.code}
                    </span>
                  </div>
                </div>

                <h3 className="text-foreground group-hover:text-primary mb-2 text-center text-lg font-semibold transition-colors">
                  {destination.localizedName}
                </h3>

                <div className="mb-4 flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">
                    {translations.visaTypes}:{" "}
                    <span className="text-foreground font-medium">
                      {destination.totalVisaTypes || 0}
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    {translations.processingTime}:{" "}
                    <span className="text-foreground font-medium">
                      {destination.avgProcessingTime
                        ? `${destination.avgProcessingTime} ${translations.days}`
                        : translations.notAvailable}
                    </span>
                  </div>
                </div>

                {destination.continent && (
                  <div className="mb-4">
                    <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                      {destination.continent}
                    </span>
                  </div>
                )}

                <div className="border-t pt-4">
                  <span className="text-primary bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                    {translations.viewDetails}
                    <ChevronRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 border-t border-gray-200 pt-8">
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
                    <PaginationNext href={buildPaginationUrl(currentPage + 1)}>
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
        )}

        {totalItems === 0 && (
          <div className="py-16 text-center">
            <div className="bg-muted mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full">
              <svg
                className="text-muted-foreground h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              {translations.emptyTitle}
            </h3>
            <p className="text-muted-foreground mx-auto mb-6 max-w-md">
              {translations.emptyDescription}
            </p>
            <a
              href={`/${locale}/d`}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-lg px-6 py-3 transition-colors"
            >
              {translations.emptyClearFilters}
            </a>
          </div>
        )}
      </section>
    </>
  );
}

export function DestinationsCatalogClient(props: DestinationsCatalogProps) {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") || undefined;
  const continentParam = searchParams.get("continent") || undefined;
  const pageParam = searchParams.get("page") || "1";

  return (
    <DestinationsCatalogView
      {...props}
      searchParam={searchParam}
      continentParam={continentParam}
      pageParam={pageParam}
    />
  );
}
