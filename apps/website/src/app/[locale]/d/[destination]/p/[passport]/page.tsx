import { Badge, Button } from "@repo/ui";
import { cn } from "@repo/utils";
import { ExternalLink } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { HIGH_PRIORITY_PASSPORTS } from "@/app/[locale]/d/sitemap";
import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { PassportSync } from "@/components/destinations/passport-sync";
import { RequiredDocuments } from "@/components/destinations/required-documents";
import { VisaOptionsGrid } from "@/components/destinations/visa-options-grid";
import { MultipleJsonLd } from "@/components/json-ld";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { env } from "@/lib/consts";
import {
  generateBreadcrumbData,
  generateBreadcrumbListJsonLd,
  generateFAQJsonLd,
  generateGovernmentServiceJsonLd,
} from "@/lib/json-ld";
import {
  getDestinationDetails,
  getDestinationsListWithMetadata,
  validateCountryCode,
  type VisaTypeInfo,
} from "@/lib/services/country-service";
import {
  checkVisaEligibility,
  type EligibilityStatus,
  getAffiliateCtaUrl,
  getVisaRequirements,
} from "@/lib/services/visa-service";
import { generateAlternatesMetadata, getTextDirection } from "@/lib/utils";
import { getCountryFlagEmoji } from "@/lib/utils/visa-type-utils";

export const revalidate = 86400; // Revalidate every 24 hours

interface PassportDestinationPageProps {
  params: Promise<{
    locale: string;
    destination: string;
    passport: string;
  }>;
}

const STATUS_BADGE_STYLES: Record<EligibilityStatus, string> = {
  visa_free: "border-green-300 bg-green-100 text-green-800",
  on_arrival: "border-blue-300 bg-blue-100 text-blue-800",
  eta: "border-amber-300 bg-amber-100 text-amber-800",
  required: "border-orange-300 bg-orange-100 text-orange-800",
  not_allowed: "border-red-300 bg-red-100 text-red-800",
};

const DIRECT_ANSWER_KEY_MAP: Record<EligibilityStatus, string> = {
  visa_free: "passportDestinationPage.hero.directAnswerVisaFree",
  on_arrival: "passportDestinationPage.hero.directAnswerOnArrival",
  eta: "passportDestinationPage.hero.directAnswerEta",
  required: "passportDestinationPage.hero.directAnswerRequired",
  not_allowed: "passportDestinationPage.hero.directAnswerNotAllowed",
};

const STATUS_META_KEY_MAP: Record<EligibilityStatus, string> = {
  visa_free: "meta.visaFreeStatus",
  on_arrival: "meta.visaOnArrivalStatus",
  eta: "meta.etaStatus",
  required: "meta.visaRequiredStatus",
  not_allowed: "meta.notAllowedStatus",
};

function normalizeAndValidateIso2(code: string): string | null {
  if (!code || typeof code !== "string") return null;
  return validateCountryCode(code.trim().toUpperCase());
}

export async function generateStaticParams(): Promise<
  {
    locale: string;
    destination: string;
    passport: string;
  }[]
> {
  const popularDestinations = await getDestinationsListWithMetadata(
    "en",
    5,
    "popular"
  ).catch(() => []);

  const topPassports = HIGH_PRIORITY_PASSPORTS.slice(0, 5);

  return languages.flatMap(locale =>
    popularDestinations.flatMap(destination => {
      const destLower = destination.code.toLowerCase();
      return topPassports
        .map(p => p.toLowerCase())
        .filter(passLower => passLower !== destLower)
        .map(passLower => ({
          locale,
          destination: destLower,
          passport: passLower,
        }));
    })
  );
}

export async function generateMetadata({
  params,
}: PassportDestinationPageProps): Promise<Metadata> {
  const { locale, destination, passport } = await params;
  const destinationCode = normalizeAndValidateIso2(destination);
  const passportCode = normalizeAndValidateIso2(passport);

  const { t } = await getTranslation(locale, "destination-page");

  if (!destinationCode || !passportCode) {
    return {
      title: t("passportDestinationPage.meta.notFound"),
    };
  }

  const [destinationData, eligibilityInfo] = await Promise.all([
    getDestinationDetails(destinationCode, locale, passportCode),
    checkVisaEligibility(passportCode, destinationCode, locale),
  ]);

  if (!destinationData || !eligibilityInfo) {
    return {
      title: t("passportDestinationPage.meta.notFound"),
    };
  }

  const canonicalPath = `d/${destinationCode.toLowerCase()}/p/${passportCode.toLowerCase()}`;
  const alternates = generateAlternatesMetadata(
    env.baseUrl,
    canonicalPath,
    locale
  );

  const currentYear = new Date().getFullYear();
  const statusLabel = t(
    STATUS_META_KEY_MAP[eligibilityInfo.eligibilityStatus] ||
      "meta.visaRequiredStatus"
  );

  const title = t("passportDestinationPage.meta.title", {
    passport: eligibilityInfo.passportName,
    destination: destinationData.localizedName,
    year: currentYear,
    status: statusLabel,
  });

  const description = t("passportDestinationPage.meta.description", {
    passport: eligibilityInfo.passportName,
    destination: destinationData.localizedName,
    year: currentYear,
    status: statusLabel,
  });

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: "website",
      images: destinationData.heroImage
        ? [
            {
              url: destinationData.heroImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PassportDestinationPage({
  params,
}: PassportDestinationPageProps) {
  const { locale, destination, passport } = await params;

  const destinationCode = normalizeAndValidateIso2(destination);
  const passportCode = normalizeAndValidateIso2(passport);

  if (!destinationCode || !passportCode) {
    notFound();
  }

  const [
    destinationData,
    eligibilityInfo,
    visaRequirements,
    { t },
    { t: tNav },
    { t: tJsonLd },
  ] = await Promise.all([
    getDestinationDetails(destinationCode, locale, passportCode),
    checkVisaEligibility(passportCode, destinationCode, locale),
    getVisaRequirements(destinationCode, locale),
    getTranslation(locale, "destination-page"),
    getTranslation(locale, "navigation"),
    getTranslation(locale, "jsonld"),
  ]);

  if (!destinationData || !eligibilityInfo) {
    notFound();
  }

  const currentYear = new Date().getFullYear();
  const canonicalDest = destinationCode.toLowerCase();
  const canonicalPass = passportCode.toLowerCase();
  const pageUrl = `${env.baseUrl}/${locale}/d/${canonicalDest}/p/${canonicalPass}`;

  const statusLabel = t(
    STATUS_META_KEY_MAP[eligibilityInfo.eligibilityStatus] ||
      "meta.visaRequiredStatus"
  );

  const directAnswerKey =
    DIRECT_ANSWER_KEY_MAP[eligibilityInfo.eligibilityStatus] ||
    DIRECT_ANSWER_KEY_MAP.required;
  const directAnswerText = t(directAnswerKey, {
    passport: eligibilityInfo.passportName,
    destination: destinationData.localizedName,
    year: currentYear,
  });

  const matchingVisaTypes =
    eligibilityInfo.visaTypes && eligibilityInfo.visaTypes.length > 0
      ? eligibilityInfo.visaTypes
      : destinationData.visaTypes;

  const primaryVisaType: VisaTypeInfo = matchingVisaTypes[0] ?? {
    id: 0,
    type: eligibilityInfo.eligibilityStatus,
    name: statusLabel,
    duration: eligibilityInfo.maxStayDays ?? 30,
    fee: visaRequirements?.feeRange.min ?? 0,
    currency: visaRequirements?.feeRange.currency ?? "USD",
    processingTime: visaRequirements?.processingTimeRange.min ?? 0,
    requiresInterview: false,
    isMultiEntry: false,
    documents: null,
    requirements: null,
  };

  const maxStayDays =
    eligibilityInfo.maxStayDays ?? matchingVisaTypes[0]?.duration ?? undefined;

  const processingSummary =
    visaRequirements && visaRequirements.processingTimeRange.max > 0
      ? visaRequirements.processingTimeRange.min ===
        visaRequirements.processingTimeRange.max
        ? `${visaRequirements.processingTimeRange.min} ${t("visaCard.days")}`
        : `${visaRequirements.processingTimeRange.min}-${visaRequirements.processingTimeRange.max} ${t("visaCard.days")}`
      : `${primaryVisaType.processingTime} ${t("visaCard.days")}`;

  const feeSummary =
    eligibilityInfo.eligibilityStatus === "visa_free"
      ? t("visaCard.free")
      : visaRequirements && visaRequirements.feeRange.max > 0
        ? visaRequirements.feeRange.min === visaRequirements.feeRange.max
          ? `${visaRequirements.feeRange.min} ${visaRequirements.feeRange.currency}`
          : `${visaRequirements.feeRange.min}-${visaRequirements.feeRange.max} ${visaRequirements.feeRange.currency}`
        : primaryVisaType.fee === 0
          ? t("visaCard.free")
          : `${primaryVisaType.fee} ${primaryVisaType.currency}`;

  const primaryAffiliateUrl = getAffiliateCtaUrl({
    destinationCode,
    passportCode,
    eligibilityStatus: eligibilityInfo.eligibilityStatus,
    visaType: matchingVisaTypes[0]?.name,
    requiresInterview: matchingVisaTypes[0]?.requiresInterview,
    locale,
  });

  const primaryCtaLabel =
    eligibilityInfo.eligibilityStatus === "visa_free"
      ? t("passportDestinationPage.hero.tripReadyCta")
      : t("passportDestinationPage.hero.applyNowCta");

  // Structured data: BreadcrumbList, GovernmentService, FAQPage
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(
    generateBreadcrumbData([
      { name: tNav("breadcrumb.home"), url: `${env.baseUrl}/${locale}` },
      {
        name: tNav("breadcrumb.destinations"),
        url: `${env.baseUrl}/${locale}/d`,
      },
      {
        name: destinationData.localizedName,
        url: `${env.baseUrl}/${locale}/d/${canonicalDest}`,
      },
      {
        name: eligibilityInfo.passportName,
        url: pageUrl,
      },
    ])
  );

  const governmentServiceJsonLd = generateGovernmentServiceJsonLd({
    name: t("passportDestinationPage.hero.heading", {
      passport: eligibilityInfo.passportName,
      destination: destinationData.localizedName,
      year: currentYear,
    }),
    description: directAnswerText,
    url: pageUrl,
    serviceType: tJsonLd("service.name", {
      defaultValue: "Visa Application Services",
    }),
    destinationName: destinationData.localizedName,
    destinationCode,
    passportName: eligibilityInfo.passportName,
    passportCode,
    eligibilityStatus: eligibilityInfo.eligibilityStatus,
    maxStayDays,
    processingTimeRange: visaRequirements?.processingTimeRange,
    feeRange: visaRequirements?.feeRange,
    providerName: tJsonLd("organization.name", {
      defaultValue: "GetTravelVisa.com",
    }),
    providerUrl: env.baseUrl,
  });

  const faqItems = [
    {
      question: t("passportDestinationPage.faq.needVisaQuestion", {
        passport: eligibilityInfo.passportName,
        destination: destinationData.localizedName,
      }),
      answer: directAnswerText,
    },
    {
      question: t("passportDestinationPage.faq.maxStayQuestion", {
        passport: eligibilityInfo.passportName,
        destination: destinationData.localizedName,
      }),
      answer: maxStayDays
        ? t("passportDestinationPage.faq.maxStayAnswer", {
            passport: eligibilityInfo.passportName,
            destination: destinationData.localizedName,
            days: maxStayDays,
          })
        : t("passportDestinationPage.faq.maxStayFallbackAnswer", {
            passport: eligibilityInfo.passportName,
            destination: destinationData.localizedName,
          }),
    },
    {
      question: t("passportDestinationPage.faq.costQuestion", {
        passport: eligibilityInfo.passportName,
        destination: destinationData.localizedName,
      }),
      answer:
        eligibilityInfo.eligibilityStatus === "visa_free"
          ? t("passportDestinationPage.faq.costVisaFreeAnswer", {
              passport: eligibilityInfo.passportName,
              destination: destinationData.localizedName,
            })
          : t("passportDestinationPage.faq.costRangeAnswer", {
              destination: destinationData.localizedName,
              feeSummary,
            }),
    },
  ];

  const faqJsonLd = generateFAQJsonLd(faqItems);
  const direction = getTextDirection(locale);
  const requiredDocumentsNode = await RequiredDocuments({
    visaType: primaryVisaType,
    compact: false,
    locale,
    destinationCode,
    passportCode,
  });

  return (
    <>
      <PassportSync passportCode={passportCode} />
      <MultipleJsonLd
        data={[breadcrumbJsonLd, governmentServiceJsonLd, faqJsonLd]}
      />

      <main id="main-content" dir={direction} className="min-h-screen">
        {/* Breadcrumb Navigation */}
        <PageBreadcrumb
          items={[
            { label: tNav("breadcrumb.home"), href: `/${locale}` },
            { label: tNav("breadcrumb.destinations"), href: `/${locale}/d` },
            {
              label: destinationData.localizedName,
              href: `/${locale}/d/${canonicalDest}`,
            },
            { label: eligibilityInfo.passportName, isCurrentPage: true },
          ]}
          className="container mx-auto px-4 py-4"
        />

        {/* Hero Section with Direct Answer & Eligibility Summary */}
        <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 py-12 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              {/* Flags & Status Badge */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
                  aria-hidden="true"
                >
                  <span>{getCountryFlagEmoji(passportCode)}</span>
                  <span>{passportCode}</span>
                  <span className="rtl:rotate-180">→</span>
                  <span>{getCountryFlagEmoji(destinationCode)}</span>
                  <span>{destinationCode}</span>
                </span>

                <Badge
                  data-testid="passport-eligibility-badge"
                  className={cn(
                    "border px-3 py-1 text-xs font-semibold",
                    STATUS_BADGE_STYLES[eligibilityInfo.eligibilityStatus]
                  )}
                >
                  {statusLabel}
                </Badge>
              </div>

              {/* Heading */}
              <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                {t("passportDestinationPage.hero.heading", {
                  passport: eligibilityInfo.passportName,
                  destination: destinationData.localizedName,
                  year: currentYear,
                })}
              </h1>

              {/* AI-SEO Direct Answer Lead Sentence */}
              <p
                data-testid="passport-direct-answer"
                className="mb-8 text-lg leading-relaxed text-white/90 sm:text-xl"
              >
                {directAnswerText}
              </p>

              {/* Key Eligibility Metrics */}
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {maxStayDays && (
                  <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <div className="text-xs text-white/75">
                      {t("passportDestinationPage.hero.maxStayLabel")}
                    </div>
                    <div
                      data-testid="passport-max-stay"
                      className="mt-1 text-xl font-bold"
                    >
                      {t("meta.maxStayDays", { days: maxStayDays })}
                    </div>
                  </div>
                )}

                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <div className="text-xs text-white/75">
                    {t("passportDestinationPage.hero.processingTimeLabel")}
                  </div>
                  <div
                    data-testid="passport-processing-time"
                    className="mt-1 text-xl font-bold"
                  >
                    {processingSummary}
                  </div>
                </div>

                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <div className="text-xs text-white/75">
                    {t("passportDestinationPage.hero.feeSummaryLabel")}
                  </div>
                  <div
                    data-testid="passport-fee-summary"
                    className="mt-1 text-xl font-bold"
                  >
                    {feeSummary}
                  </div>
                </div>
              </div>

              {/* Primary Affiliate CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  data-testid="passport-primary-affiliate-cta"
                  href={primaryAffiliateUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                >
                  <Button size="lg" variant="default">
                    {primaryCtaLabel}
                    <ExternalLink className="ms-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </a>

                <Link
                  href={`/${locale}/d/${canonicalDest}`}
                  className="text-sm font-medium text-white/85 underline-offset-4 hover:text-white hover:underline"
                >
                  {t("passportDestinationPage.hero.viewAllDestinationVisas", {
                    destination: destinationData.localizedName,
                  })}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Matching Visa Options */}
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
            passportCode={passportCode}
          />
        </section>

        {/* Required Documents with Contextual Affiliate CTAs */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto max-w-4xl px-4">
            {requiredDocumentsNode}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-6 text-2xl font-bold">
            {t("passportDestinationPage.faq.title", {
              passport: eligibilityInfo.passportName,
              destination: destinationData.localizedName,
            })}
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-card rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-semibold">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
