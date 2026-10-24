import { type Metadata } from "next";
import { Suspense } from "react";

import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import {
  DestinationsCatalogClient,
  type DestinationsCatalogTranslations,
  DestinationsCatalogView,
} from "@/components/destinations/destinations-catalog-client";
import { MultipleJsonLd } from "@/components/json-ld";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
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

export const revalidate = 86400;

export function generateStaticParams(): { locale: string }[] {
  return languages.map(locale => ({ locale }));
}

interface DestinationsPageProps {
  params: Promise<{
    locale: string;
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
}: DestinationsPageProps) {
  const { locale } = await params;

  const ITEMS_PER_PAGE = 20;
  const ALL_DESTINATIONS_LIMIT = 300;

  const [{ t }, { t: tNav }, { t: tCommon }, paginatedResponse, continents] =
    await Promise.all([
      getTranslation(locale, "destinations-list"),
      getTranslation(locale, "navigation"),
      getTranslation(locale, "common"),
      getDestinationsListWithMetadataPaginated(
        locale,
        ALL_DESTINATIONS_LIMIT,
        0,
        "alphabetical"
      ),
      getDestinationContinents(locale),
    ]);

  const { destinations } = paginatedResponse;
  const firstPageDestinations = destinations.slice(0, ITEMS_PER_PAGE);

  const pageUrl = `${env.baseUrl}/${locale}/d`;

  const collectionPageJsonLd = generateCollectionPageJsonLd({
    name: t("meta.title"),
    description: t("meta.description"),
    url: pageUrl,
    items: firstPageDestinations.map(destination => ({
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

  const catalogTranslations: DestinationsCatalogTranslations = {
    heroTitle: t("hero.title"),
    heroDescription: t("hero.description"),
    searchPlaceholder: t("hero.searchPlaceholder"),
    allContinents: t("filters.allContinents"),
    searchLabel: t("filters.searchLabel"),
    continentLabel: t("filters.continentLabel"),
    resultsShowingTemplate: t("results.showing", {
      count: "__COUNT__",
      total: "__TOTAL__",
    }),
    visaTypes: t("destinationCard.visaTypes"),
    processingTime: t("destinationCard.processingTime"),
    viewDetails: t("destinationCard.viewDetails"),
    days: t("destinationCard.days"),
    notAvailable: t("destinationCard.notAvailable"),
    emptyTitle: t("empty.title"),
    emptyDescription: t("empty.description"),
    emptyClearFilters: t("empty.clearFilters"),
    paginationPrevious: tCommon("pagination.previous"),
    paginationNext: tCommon("pagination.next"),
    paginationPage: tCommon("pagination.page"),
    paginationOf: tCommon("pagination.of"),
  };

  return (
    <>
      <MultipleJsonLd data={[collectionPageJsonLd, breadcrumbJsonLd]} />

      <main id="main-content" className="min-h-screen">
        <PageBreadcrumb
          items={[
            { label: tNav("breadcrumb.home"), href: `/${locale}` },
            { label: tNav("breadcrumb.destinations"), isCurrentPage: true },
          ]}
          className="container mx-auto px-4 py-4"
        />

        <Suspense
          fallback={
            <DestinationsCatalogView
              locale={locale}
              destinations={destinations}
              continents={continents}
              itemsPerPage={ITEMS_PER_PAGE}
              translations={catalogTranslations}
            />
          }
        >
          <DestinationsCatalogClient
            locale={locale}
            destinations={destinations}
            continents={continents}
            itemsPerPage={ITEMS_PER_PAGE}
            translations={catalogTranslations}
          />
        </Suspense>
      </main>
    </>
  );
}
