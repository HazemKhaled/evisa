import { type Metadata } from "next";
import { getTranslation } from "@/app/i18n";
import { getDestinationsListWithMetadata } from "@/lib/services/country-service";
import { DestinationsGrid } from "@/components/ui/destinations-grid";
import { JsonLd } from "@/components/json-ld";
import { generateWebPageJsonLd } from "@/lib/json-ld";
import { SearchFilterForm } from "@/components/destinations/search-filter-form";

// ISR configuration - revalidate every hour
export const revalidate = 3600;

interface DestinationsPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    search?: string;
    continent?: string;
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
  const { search, continent } = await searchParams;

  const { t } = await getTranslation(locale, "destinations-list");

  // Get destinations data with proper limit for initial load
  const destinationsData = await getDestinationsListWithMetadata(
    locale,
    50, // Initial limit
    "alphabetical"
  );

  // Filter destinations based on search and continent
  let filteredDestinations = destinationsData;

  if (search) {
    filteredDestinations = filteredDestinations.filter(
      destination =>
        destination.localizedName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        destination.code.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (continent && continent !== "all") {
    filteredDestinations = filteredDestinations.filter(
      destination =>
        destination.continent?.toLowerCase() === continent.toLowerCase()
    );
  }

  // Generate structured data
  const jsonLd = generateWebPageJsonLd({
    name: t("meta.title"),
    description: t("meta.description"),
    url: `/${locale}/d`,
  });

  // Get unique continents for filtering
  const continents = Array.from(
    new Set(destinationsData.map(d => d.continent).filter(Boolean))
  ).sort();

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
                  count: filteredDestinations.length,
                  total: destinationsData.length,
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="container mx-auto px-4 py-12">
          <DestinationsGrid
            destinations={filteredDestinations}
            locale={locale}
          />

          {/* Empty State */}
          {filteredDestinations.length === 0 && (
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
