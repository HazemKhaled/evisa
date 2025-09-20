import { type Metadata } from "next";
import { getTranslation } from "@/app/i18n";
import {
  getDestinationsListWithMetadataPaginated,
  getDestinationContinents,
} from "@/lib/services/country-service";
import { DestinationsGrid } from "@/components/ui/destinations-grid";
import { JsonLd } from "@/components/json-ld";
import { generateWebPageJsonLd } from "@/lib/json-ld";
import { SearchFilterForm } from "@/components/destinations/search-filter-form";
import { EnhancedPagination } from "@/components/ui/enhanced-pagination";

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

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
    },
    alternates: {
      canonical: `/${locale}/d`,
      languages: {
        en: `/en/d`,
        ar: `/ar/d`,
        es: `/es/d`,
        pt: `/pt/d`,
        ru: `/ru/d`,
        de: `/de/d`,
        fr: `/fr/d`,
        it: `/it/d`,
      },
    },
  };
}

export default async function DestinationsPage({
  params,
  searchParams,
}: DestinationsPageProps) {
  const { locale } = await params;
  const { search, continent, page } = await searchParams;

  const { t } = await getTranslation(locale, "destinations-list");

  // Pagination constants
  const ITEMS_PER_PAGE = 20;
  const currentPage = parseInt(page || "1", 10);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Get paginated destinations with server-side filtering
  const paginatedResponse = await getDestinationsListWithMetadataPaginated(
    locale,
    ITEMS_PER_PAGE,
    offset,
    "alphabetical",
    search,
    continent
  );

  const {
    destinations: paginatedDestinations,
    total: totalItems,
    totalPages,
  } = paginatedResponse;

  // Get continents for filter options (lightweight query)
  const continents = await getDestinationContinents(locale);

  // Generate structured data
  const jsonLd = generateWebPageJsonLd({
    name: t("meta.title"),
    description: t("meta.description"),
    url: `/${locale}/d`,
  });

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav className="container mx-auto px-4 py-4" aria-label="breadcrumb">
          <ol className="text-muted-foreground flex items-center space-x-2 text-sm rtl:space-x-reverse">
            <li>
              <a href={`/${locale}`} className="hover:text-primary">
                {t("breadcrumb.home")}
              </a>
            </li>
            <li className="flex items-center">
              <span className="mx-2 ltr:rotate-0 rtl:rotate-180">→</span>
              <span className="text-foreground font-medium">
                {t("breadcrumb.destinations")}
              </span>
            </li>
          </ol>
        </nav>

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
