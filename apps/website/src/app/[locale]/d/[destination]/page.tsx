import { ChevronRight } from "lucide-react";
import { type Metadata } from "next";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { DestinationCard } from "@/components/destinations/destination-card";
import { DestinationHero } from "@/components/destinations/destination-hero";
import { PassportSync } from "@/components/destinations/passport-sync";
import { VisaOptionsGrid } from "@/components/destinations/visa-options-grid";
import { MultipleJsonLd } from "@/components/json-ld";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { env } from "@/lib/consts";
import {
  generateBreadcrumbData,
  generateBreadcrumbListJsonLd,
  generateDestinationJsonLd,
  generateFAQJsonLd,
} from "@/lib/json-ld";
import { getBlogPostsByDestination } from "@/lib/services/blog-service";
import {
  getDestinationDetails,
  getDestinationsListWithMetadata,
} from "@/lib/services/country-service";
import {
  checkVisaEligibility,
  getVisaRequirements,
  type VisaEligibilityInfo,
} from "@/lib/services/visa-service";
import { generateAlternatesMetadata } from "@/lib/utils";

/**
 * Read passport code from URL query params or sticky cookie.
 * Precedence: URL ?passport= param > gtv_passport cookie > undefined.
 * Result is validated as a 2-letter ISO country code.
 */
async function resolvePassportCode(): Promise<string | undefined> {
  const headerStore = await headers();
  const cookieStore = await cookies();

  // Reconstruct the request URL from headers (no browser DOM in Server Component)
  const proto = headerStore.get("x-forwarded-proto") || "https";
  const host = headerStore.get("host") || "";
  const path =
    headerStore.get("x-forwarded-uri") || headerStore.get("url") || "";
  const url = proto && host ? `${proto}://${host}${path}` : path;

  // 1. Try URL query param first
  const urlParam = url.split("passport=")[1]?.split("&")[0]?.trim();
  if (urlParam && /^[A-Z]{2}$/.test(urlParam)) {
    // Set sticky cookie for subsequent visits
    try {
      cookieStore.set("gtv_passport", urlParam);
    } catch {
      // Non-fatal if cookie can't be set
    }
    return urlParam;
  }

  // 2. Fall back to sticky cookie
  const cookieValue = cookieStore.get("gtv_passport")?.value;
  if (cookieValue && /^[A-Z]{2}$/.test(cookieValue)) {
    return cookieValue;
  }

  return undefined;
}

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

  // Read passport code from URL param or sticky cookie
  const passportCode = await resolvePassportCode();

  // Fetch destination data (passportCode accepted as optional arg)
  const destinationData = await getDestinationDetails(
    destination,
    locale,
    passportCode
  );

  const { t } = await getTranslation(locale, "destination-page", {
    keyPrefix: "meta",
  });

  if (!destinationData) {
    return {
      title: t("notFound"),
    };
  }

  const alternates = generateAlternatesMetadata(
    env.baseUrl,
    `d/${destination}`,
    locale
  );

  let passportTitle = t("title", {
    destination: destinationData.localizedName,
  });
  let passportDescription = t("description", {
    destination: destinationData.localizedName,
    visaCount: destinationData.totalVisaTypes,
  });

  // If a passport code was resolved, fetch eligibility info for metadata
  let eligibilityInfo: VisaEligibilityInfo | null = null;

  if (passportCode) {
    try {
      eligibilityInfo = await checkVisaEligibility(
        passportCode,
        destination,
        locale
      );
    } catch (error) {
      console.error(
        `Failed to fetch eligibility for passport ${passportCode}:`,
        error
      );
    }
  }

  // Generate passport-specific metadata if eligibility info is available
  if (eligibilityInfo) {
    const statusLabels = await getPassportStatusLabels(
      locale,
      eligibilityInfo.eligibilityStatus,
      eligibilityInfo.maxStayDays
    );
    passportTitle = t("passportTitle", {
      destination: destinationData.localizedName,
      passportName: eligibilityInfo.passportName,
      status: statusLabels.status,
    });
    passportDescription = t("passportDescription", {
      destination: destinationData.localizedName,
      passportName: eligibilityInfo.passportName,
      status: statusLabels.status,
      maxStay: statusLabels.maxStay,
    });
  }

  return {
    title: passportTitle,
    description: passportDescription,
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

/**
 * Get human-readable labels for an eligibility status and max stay days.
 */
async function getPassportStatusLabels(
  locale: string,
  status: string,
  maxStayDays: number | undefined
): Promise<{ status: string; maxStay: string }> {
  const { t } = await getTranslation(locale, "destination-page", {
    keyPrefix: "meta",
  });

  const statusLabels: Record<string, string> = {
    visa_free: await t("visaFreeStatus"),
    on_arrival: await t("visaOnArrivalStatus"),
    eta: await t("etaStatus"),
    required: await t("visaRequiredStatus"),
    not_allowed: await t("notAllowedStatus"),
  };

  const statusKey = status as keyof typeof statusLabels;
  const label = statusLabels[statusKey] || status;

  const maxStay = maxStayDays
    ? await t("maxStayDays", { days: maxStayDays })
    : "";

  return { status: label, maxStay };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { locale, destination } = await params;

  // Parallel fetch: destination data, visa requirements, and translations
  const [
    destinationData,
    visaRequirements,
    { t },
    { t: tNav },
    { t: tJsonLd },
    relatedBlogPosts,
  ] = await Promise.all([
    getDestinationDetails(destination, locale),
    getVisaRequirements(destination, locale),
    getTranslation(locale, "destination-page"),
    getTranslation(locale, "navigation"),
    getTranslation(locale, "jsonld"),
    getBlogPostsByDestination(destination, locale, 3).catch(() => []),
  ]);

  if (!destinationData) {
    notFound();
  }

  // Resolve passport code for hero badge (separate from cookie logic above since metadata runs first)
  const passportCode = await resolvePassportCode();

  // Fetch eligibility info for hero badge
  let eligibilityInfo: VisaEligibilityInfo | null = null;

  if (passportCode) {
    try {
      eligibilityInfo = await checkVisaEligibility(
        passportCode,
        destination,
        locale
      );
    } catch (error) {
      console.error(
        `Failed to fetch eligibility for passport ${passportCode}:`,
        error
      );
    }
  }

  // Fetch related destinations in the same continent
  let relatedDestinations: Awaited<
    ReturnType<typeof getDestinationsListWithMetadata>
  > = [];
  if (destinationData.continent) {
    const allDestinations = await getDestinationsListWithMetadata(
      locale,
      25,
      "popular",
      destinationData.continent
    );
    relatedDestinations = allDestinations.filter(d => d.code !== destination);
  }

  // Generate structured data
  const jsonLd = generateDestinationJsonLd(
    destinationData,
    locale,
    tJsonLd("destination.travelTo", { defaultValue: "Travel to" }),
    {
      travelDescriptionTemplate: tJsonLd("destination.travelDescription"),
      visaDescriptionTemplate: tJsonLd("destination.visaDescription"),
      visaOfferDescriptionTemplate: tJsonLd("destination.visaOfferDescription"),
      additionalPropertyProcessingTime: tJsonLd("destination.processingTime"),
    }
  );

  // Breadcrumb items for JSON-LD
  const breadcrumbData = generateBreadcrumbData([
    { name: tNav("breadcrumb.home"), url: `${env.baseUrl}/${locale}` },
    {
      name: tNav("breadcrumb.destinations"),
      url: `${env.baseUrl}/${locale}/d`,
    },
    {
      name: destinationData.localizedName,
      url: `${env.baseUrl}/${locale}/d/${destination}`,
    },
  ]);
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

  // Generate FAQ from visa eligibility data
  const faqItems =
    visaRequirements && visaRequirements.visaTypes
      ? visaRequirements.visaTypes.slice(0, 5).map(visa => ({
          question: t("faq.question", {
            destination: destinationData.localizedName,
          }),
          answer: t("faq.answer", {
            visaType: visa.type,
            destination: destinationData.localizedName,
          }),
        }))
      : [];
  const faqJsonLd = faqItems.length > 0 ? generateFAQJsonLd(faqItems) : null;

  const jsonLdBlocks = [jsonLd, breadcrumbJsonLd, faqJsonLd].filter(
    (item): item is Record<string, unknown> => Boolean(item)
  );

  return (
    <>
      <PassportSync />

      <MultipleJsonLd data={jsonLdBlocks} />

      <main id="main-content" className="min-h-screen">
        {/* Breadcrumb Navigation */}
        <PageBreadcrumb
          items={[
            { label: tNav("breadcrumb.home"), href: `/${locale}` },
            { label: tNav("breadcrumb.destinations"), href: `/${locale}/d` },
            { label: destinationData.localizedName, isCurrentPage: true },
          ]}
          className="container mx-auto px-4 py-4"
        />

        {/* Destination Hero Section */}
        <DestinationHero
          destination={destinationData}
          locale={locale}
          passportCode={passportCode}
          eligibilityInfo={eligibilityInfo ?? null}
        />

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
        {relatedBlogPosts && relatedBlogPosts.length > 0 && (
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

            <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBlogPosts.map(post => (
                <BlogPostCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>

            <div className="py-8 text-center">
              <Link
                href={`/${locale}/d/${destination}/blog`}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-lg px-6 py-3 transition-colors"
              >
                {t("relatedContent.viewBlog")}
                <ChevronRight className="ms-2 h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </section>
        )}

        {/* Related Destinations Section */}
        {relatedDestinations && relatedDestinations.length > 0 && (
          <section className="bg-muted/50 py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="mb-4 text-3xl font-bold">
                  {t("relatedDestinations.title", {
                    continent: destinationData.continent,
                  })}
                </h2>
                <p className="text-muted-foreground">
                  {t("relatedDestinations.description", {
                    continent: destinationData.continent,
                  })}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {relatedDestinations.map(dest => (
                  <DestinationCard
                    key={dest.code}
                    destination={dest}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
