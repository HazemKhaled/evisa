import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslation } from "@/app/i18n";
import {
  getDestinationDetails,
  getDestinationsListWithMetadata,
} from "@/lib/services/country-service";
import { getVisaRequirements } from "@/lib/services/visa-service";
import { DestinationHero } from "@/components/ui/destination-hero";
import { VisaOptionsGrid } from "@/components/ui/visa-options-grid";
import { JsonLd } from "@/components/json-ld";
import { generateDestinationJsonLd } from "@/lib/json-ld";

// ISR configuration - revalidate every hour
export const revalidate = 3600;

interface DestinationPageProps {
  params: Promise<{
    locale: string;
    destination: string;
  }>;
}

// Pre-build popular destinations at build time
export async function generateStaticParams() {
  // Get top 20 popular destinations for SSG
  const popularDestinations = await getDestinationsListWithMetadata(
    "en",
    20,
    "popular"
  );
  return popularDestinations.map(destination => ({
    destination: destination.code.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { locale, destination } = await params;

  const destinationData = await getDestinationDetails(
    destination.toUpperCase(),
    locale
  );

  if (!destinationData) {
    return {
      title: "Destination Not Found",
    };
  }

  const { t } = await getTranslation(locale, "destination-page", {
    keyPrefix: "meta",
  });

  return {
    title: t("title", { destination: destinationData.localizedName }),
    description: t("description", {
      destination: destinationData.localizedName,
      visaCount: destinationData.totalVisaTypes,
    }),
    openGraph: {
      title: t("ogTitle", { destination: destinationData.localizedName }),
      description: t("ogDescription", {
        destination: destinationData.localizedName,
        visaCount: destinationData.totalVisaTypes,
      }),
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
    alternates: {
      canonical: `/${locale}/d/${destination}`,
      languages: {
        en: `/en/d/${destination}`,
        ar: `/ar/d/${destination}`,
        es: `/es/d/${destination}`,
        pt: `/pt/d/${destination}`,
        ru: `/ru/d/${destination}`,
        de: `/de/d/${destination}`,
        fr: `/fr/d/${destination}`,
        it: `/it/d/${destination}`,
      },
    },
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { locale, destination } = await params;

  // Fetch destination data
  const destinationData = await getDestinationDetails(
    destination.toUpperCase(),
    locale
  );

  if (!destinationData) {
    notFound();
  }

  // Fetch visa requirements
  const visaRequirements = await getVisaRequirements(
    destination.toUpperCase(),
    locale
  );

  // Generate structured data
  const jsonLd = generateDestinationJsonLd(destinationData, locale);

  const { t } = await getTranslation(locale, "destination-page");

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
              <a href={`/${locale}/d`} className="hover:text-primary">
                {t("breadcrumb.destinations")}
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
