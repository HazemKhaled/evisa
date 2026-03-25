import { type Metadata } from "next";

import { getTranslation } from "@/app/i18n";
import { DestinationsGrid } from "@/components/destinations/destinations-grid";
import { SearchFilterForm } from "@/components/destinations/search-filter-form";
import { MultipleJsonLd } from "@/components/json-ld";
import { EnhancedPagination, PageBreadcrumb } from "@/components/ui";
import { env } from "@/lib/consts";
import {
  generateBreadcrumbData,
  generateBreadcrumbListJsonLd,
  generateCollectionPageJsonLd,
} from "@/lib/json-ld";
import {
  getDestinationContinents,
  getDestinationsListWithMetadataPaginated,
} from "@/lib/services/country-service";
import { generateAlternatesMetadata } from "@/lib/utils";

export const revalidate = 86400; // Revalidate every day

interface DestinationsPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    search?: string;
    continent?: string;
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: DestinationsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "destinations-list", {
    keyPrefix: "meta",
  });

  const alternates = generateAlternatesMetadata(env.baseUrl, "d", locale);

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      url: alternates.canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
    },
    alternates,
  };
}

export default async function DestinationsPage({
  params,
  searchParams,
}: DestinationsPageProps) {
  const { locale } = await params;
  const { search, continent, page } = await searchParams;

  // Pagination constants
  const ITEMS_PER_PAGE = 20;
  const currentPage = parseInt(page || "1", 10);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Parallel fetch: translations, paginated destinations, and continents
  const [{ t }, { t: tNav }, paginatedResponse, continents] = await Promise.all(
    [
      getTranslation(locale, "destinations-list"),
      getTranslation(locale, "navigation"),
      getDestinationsListWithMetadataPaginated(
        locale,
        ITEMS_PER_PAGE,
        offset,
        "alphabetical",
        search,
        continent
      ),
      getDestinationContinents(locale),
    ]
  );

  const {
    destinations: paginatedDestinations,
    total: totalItems,
    totalPages,
  } = paginatedResponse;

  const pageUrl = `${env.baseUrl}/${locale}/d`;

  const collectionPageJsonLd = generateCollectionPageJsonLd({
    name: t("meta.title"),
    description: t("meta.description"),
    url: pageUrl,
    items: paginatedDestinations.map(destination => ({
      name: destination.localizedName,
      url: `${env.baseUrl}/${locale}/d/${destination.code}`,
      image: destination.heroImage ?? undefined,
      description: destination.about ?? undefined,
    })),
  });

  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(
    generateBreadcrumbData([
      { name: tNav("breadcrumb.home"), url: `${env.baseUrl}/${locale}` },
      { name: tNav("breadcrumb.destinations"), url: pageUrl },
    ])
  );

  return (
    <>
      <MultipleJsonLd data={[collectionPageJsonLd, breadcrumbJsonLd]} />

      <main id="main-content" className="min-h-screen">
        {/* Breadcrumb Navigation */}
        <PageBreadcrumb
          items={[
            { label: tNav("breadcrumb.home"), href: `/${locale}` },
            { label: tNav("breadcrumb.destinations"), isCurrentPage: true },
          ]}
          className="container mx-auto px-4 py-4"
        />

        {/* Hero Section */}
        <section className="from-primary/5 bg-gradient-to-br via-blue-50 to-purple-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="from-primary mb-6 bg-gradient-to-r via-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
                {t("hero.description")}
              </p>

              {/* Search and Filter Bar */}
              <SearchFilterForm
                locale={locale}
                continents={continents}
                translations={{
                  searchPlaceholder: t("hero.searchPlaceholder"),
                  allContinents: t("filters.allContinents"),
                  searchLabel: t("filters.searchLabel"),
                  continentLabel: t("filters.continentLabel"),
                }}
              />

              {/* Results Count */}
              <div className="text-muted-foreground mt-4 text-sm">
                {t("results.showing", {
                  count: totalItems,
                  total: totalItems,
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="container mx-auto px-4 py-12">
          <DestinationsGrid
            destinations={paginatedDestinations}
            locale={locale}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <EnhancedPagination
                currentPage={currentPage}
                totalPages={totalPages}
                locale={locale}
              />
            </div>
          )}

          {/* Empty State */}
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
              <h3 className="mb-2 text-xl font-semibold">{t("empty.title")}</h3>
              <p className="text-muted-foreground mx-auto mb-6 max-w-md">
                {t("empty.description")}
              </p>
              <a
                href={`/${locale}/d`}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-lg px-6 py-3 transition-colors"
              >
                {t("empty.clearFilters")}
              </a>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
