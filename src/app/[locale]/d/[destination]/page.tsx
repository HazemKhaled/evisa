import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslation } from "@/app/i18n";
import {
  getDestinationDetails,
  getDestinationsListWithMetadata,
} from "@/lib/services/country-service";
import { getVisaRequirements } from "@/lib/services/visa-service";
import { DestinationHero } from "@/components/destinations/destination-hero";
import { VisaOptionsGrid } from "@/components/destinations/visa-options-grid";
import { JsonLd } from "@/components/json-ld";
import { generateDestinationJsonLd } from "@/lib/json-ld";
import { languages } from "@/app/i18n/settings";
import { generateAlternatesMetadata } from "@/lib/utils";
import { env } from "@/lib/consts";

export const revalidate = 86400; // Revalidate every 24 hours

interface DestinationPageProps {
  params: Promise<{
    locale: string;
    destination: string;
  }>;
}

// Pre-build popular destinations at build time
export async function generateStaticParams(): Promise<
  DestinationPageProps["params"][]
> {
  // Get top 20 popular destinations for SSG
  const popularDestinations = await getDestinationsListWithMetadata(
    "en",
    20,
    "popular"
  );

  // Generate params for each popular destination in each locale
  return languages.flatMap(locale =>
    popularDestinations.map(destination =>
      Promise.resolve({
        locale,
        destination: destination.code,
      })
    )
  );
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { locale, destination } = await params;

  const destinationData = await getDestinationDetails(destination, locale);

  if (!destinationData) {
    return {
      title: "Destination Not Found",
    };
  }

  const { t } = await getTranslation(locale, "destination-page", {
    keyPrefix: "meta",
  });

  const alternates = generateAlternatesMetadata(
    env.baseUrl,
    `d/${destination}`,
    locale
  );

  return {
    title: t("title", { destination: destinationData.localizedName }),
    description: t("description", {
      destination: destinationData.localizedName,
      visaCount: destinationData.totalVisaTypes,
    }),
    alternates,
    openGraph: {
      title: t("ogTitle", { destination: destinationData.localizedName }),
      description: t("ogDescription", {
        destination: destinationData.localizedName,
        visaCount: destinationData.totalVisaTypes,
      }),
      url: alternates.canonical,
      images: destinationData.heroImage
        ? [
            {
              url: destinationData.heroImage,
              width: 1200,
              height: 630,
              alt: destinationData.localizedName,
            },
          ]
        : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle", { destination: destinationData.localizedName }),
      description: t("twitterDescription", {
        destination: destinationData.localizedName,
      }),
    },
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { locale, destination } = await params;

  // Fetch destination data
  const destinationData = await getDestinationDetails(destination, locale);

  if (!destinationData) {
    notFound();
  }

  // Fetch visa requirements
  const visaRequirements = await getVisaRequirements(destination, locale);

  // Generate structured data
  const jsonLd = generateDestinationJsonLd(destinationData, locale);

  const { t } = await getTranslation(locale, "destination-page");
  const { t: tNav } = await getTranslation(locale, "navigation");

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav
          className="container mx-auto px-4 py-4"
          aria-label={t("aria.breadcrumb")}
        >
          <ol className="text-muted-foreground flex items-center space-x-2 text-sm rtl:space-x-reverse">
            <li>
              <a href={`/${locale}`} className="hover:text-primary">
                {tNav("breadcrumb.home")}
              </a>
            </li>
            <li className="flex items-center">
              <span className="mx-2 ltr:rotate-0 rtl:rotate-180">→</span>
              <a href={`/${locale}/d`} className="hover:text-primary">
                {tNav("breadcrumb.destinations")}
              </a>
            </li>
            <li className="flex items-center">
              <span className="mx-2 ltr:rotate-0 rtl:rotate-180">→</span>
              <span className="text-foreground font-medium">
                {destinationData.localizedName}
              </span>
            </li>
          </ol>
        </nav>

        {/* Destination Hero Section */}
        <DestinationHero destination={destinationData} locale={locale} />

        {/* Visa Options Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold">
              {t("visaOptions.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("visaOptions.description", {
                destination: destinationData.localizedName,
              })}
            </p>
          </div>

          <VisaOptionsGrid
            destination={destinationData}
            visaRequirements={visaRequirements}
            locale={locale}
          />
        </section>

        {/* Visa-Free Entry Information */}
        {(destinationData.hasVisaFreeEntry ||
          destinationData.hasVisaOnArrival) && (
          <section className="bg-muted/50 py-12">
            <div className="container mx-auto px-4">
              <h2 className="mb-6 text-3xl font-bold">{t("visaFree.title")}</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {destinationData.hasVisaFreeEntry && (
                  <div className="bg-card rounded-lg border p-6">
                    <h3 className="mb-3 text-xl font-semibold text-green-600">
                      {t("visaFree.visaFreeTitle")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("visaFree.visaFreeDescription", {
                        destination: destinationData.localizedName,
                      })}
                    </p>
                  </div>
                )}
                {destinationData.hasVisaOnArrival && (
                  <div className="bg-card rounded-lg border p-6">
                    <h3 className="mb-3 text-xl font-semibold text-blue-600">
                      {t("visaFree.visaOnArrivalTitle")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("visaFree.visaOnArrivalDescription", {
                        destination: destinationData.localizedName,
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Related Blog Posts Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="mb-4 text-3xl font-bold">
              {t("relatedContent.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("relatedContent.description", {
                destination: destinationData.localizedName,
              })}
            </p>
          </div>

          <div className="py-8 text-center">
            <a
              href={`/${locale}/d/${destination}/blog`}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-lg px-6 py-3 transition-colors"
            >
              {t("relatedContent.viewBlog")}
              <span className="ml-2 ltr:rotate-0 rtl:rotate-180">→</span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
