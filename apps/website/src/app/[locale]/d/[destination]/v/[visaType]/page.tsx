import { Button } from "@repo/ui";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { JsonLd } from "@/components/json-ld";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { env } from "@/lib/consts";
import { generateDestinationJsonLd } from "@/lib/json-ld";
import {
  getDestinationDetails,
  getDestinationsListWithMetadata,
} from "@/lib/services/country-service";
import { getVisaTypesByDestination } from "@/lib/services/visa-service";
import { generateAlternatesMetadata } from "@/lib/utils";
import { getCountryFlagEmoji } from "@/lib/utils/visa-type-utils";

export const revalidate = 86400; // Revalidate every 24 hours

function toVisaSlug(visaType: string): string {
  return visaType.toLowerCase().replace(/\s+/g, "-");
}

interface VisaDetailPageProps {
  params: Promise<VisaDetailParams>;
}

interface VisaDetailParams {
  locale: string;
  destination: string;
  visaType: string;
}

// Pre-build popular destination visas at build time
export async function generateStaticParams(): Promise<VisaDetailParams[]> {
  const popularDestinations = await getDestinationsListWithMetadata(
    "en",
    20,
    "popular"
  );

  const destinationVisaPairs = await Promise.all(
    popularDestinations.map(async destination => ({
      destinationCode: destination.code,
      visas: await getVisaTypesByDestination(destination.code, "en"),
    }))
  );

  return destinationVisaPairs.flatMap(({ destinationCode, visas }) =>
    visas.flatMap(visa =>
      languages.map(locale => ({
        locale,
        destination: destinationCode,
        visaType: toVisaSlug(visa.type),
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: VisaDetailPageProps): Promise<Metadata> {
  const { locale, destination, visaType } = await params;
  const visaTypeSlug = toVisaSlug(visaType);

  const [destinationData, { t: tDestination }] = await Promise.all([
    getDestinationDetails(destination, locale),
    getTranslation(locale, "destination-page"),
  ]);
  if (!destinationData) {
    return { title: tDestination("visaDetailPage.meta.notFound") };
  }

  const visas = await getVisaTypesByDestination(destination, locale);
  const visa = visas.find(v => toVisaSlug(v.type) === visaTypeSlug);

  if (!visa) {
    return { title: tDestination("visaDetailPage.meta.notFound") };
  }

  const canonicalVisaSlug = toVisaSlug(visa.type);

  const alternates = generateAlternatesMetadata(
    env.baseUrl,
    `d/${destination}/v/${canonicalVisaSlug}`,
    locale
  );

  const title = tDestination("visaDetailPage.meta.title", {
    visaName: visa.name,
    destinationName: destinationData.localizedName,
  });
  const description = tDestination("visaDetailPage.meta.description", {
    visaName: visa.name,
    destinationName: destinationData.localizedName,
    processingTime: visa.processingTime,
    fee: visa.fee,
    currency: visa.currency,
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
      images: [
        {
          url: destinationData.heroImage ?? `${env.baseUrl}/icon.svg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: destinationData.heroImage
        ? [destinationData.heroImage]
        : [`${env.baseUrl}/icon.svg`],
    },
  };
}

export default async function VisaDetailPage({ params }: VisaDetailPageProps) {
  const { locale, destination, visaType } = await params;
  const visaTypeSlug = toVisaSlug(visaType);

  const [destinationData, { t: tCommon }, { t: tDestination }, { t: tJsonLd }] =
    await Promise.all([
      getDestinationDetails(destination, locale),
      getTranslation(locale, "common"),
      getTranslation(locale, "destination-page"),
      getTranslation(locale, "jsonld"),
    ]);

  if (!destinationData) {
    notFound();
  }

  const visas = await getVisaTypesByDestination(destination, locale);
  const visa = visas.find(v => toVisaSlug(v.type) === visaTypeSlug);

  if (!visa) {
    notFound();
  }

  const canonicalVisaSlug = toVisaSlug(visa.type);

  const breadcrumbs = [
    { label: tCommon("navigation.home"), href: `/${locale}` },
    { label: tCommon("navigation.destinations"), href: `/${locale}/d` },
    {
      label: destinationData.localizedName,
      href: `/${locale}/d/${destination}`,
    },
    {
      label: visa.name,
      href: `/${locale}/d/${destination}/v/${canonicalVisaSlug}`,
    },
  ];

  return (
    <>
      <JsonLd
        data={generateDestinationJsonLd(
          destinationData,
          locale,
          tJsonLd("destination.travelTo", { defaultValue: "Travel to" })
        )}
      />
      <main id="main-content" className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <PageBreadcrumb items={breadcrumbs} />
          </div>
        </div>

        {/* Visa Detail Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                {visa.type}
              </span>
            </div>
            <h1 className="mb-4 flex items-center gap-3 text-4xl font-bold text-gray-900">
              <span className="text-5xl" aria-hidden="true">
                {getCountryFlagEmoji(destination)}
              </span>
              {tDestination("visaDetailPage.title", {
                visaName: visa.name,
                destinationName: destinationData.localizedName,
              })}
            </h1>
            <p className="text-lg text-gray-600">
              {visa.description ||
                tDestination("visaDetailPage.defaultDescription", {
                  visaName: visa.name,
                  destinationName: destinationData.localizedName,
                })}
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Key Information */}
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="text-sm font-medium text-gray-600">
                {tCommon("labels.fee")}
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {visa.fee} {visa.currency}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="text-sm font-medium text-gray-600">
                {tCommon("labels.processingTime")}
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {visa.processingTime}{" "}
                {visa.processingTime === 1
                  ? tCommon("labels.day")
                  : tCommon("labels.days")}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="text-sm font-medium text-gray-600">
                {tCommon("labels.duration")}
              </p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {visa.duration}{" "}
                {visa.duration === 1
                  ? tCommon("labels.day")
                  : tCommon("labels.days")}
              </p>
            </div>
            {visa.maxStay && (
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <p className="text-sm font-medium text-gray-600">
                  {tCommon("labels.maxStay")}
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {visa.maxStay}{" "}
                  {visa.maxStay === 1
                    ? tCommon("labels.day")
                    : tCommon("labels.days")}
                </p>
              </div>
            )}
          </div>

          {/* Visa Features */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              {tDestination("visaDetailPage.sections.visaFeatures")}
            </h2>
            <div className="space-y-3">
              {visa.isMultiEntry && (
                <div className="flex items-center rounded-lg border border-green-200 bg-green-50 p-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    ✓ {tCommon("labels.multiEntry")}
                  </span>
                </div>
              )}
              {visa.requiresInterview && (
                <div className="flex items-center rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                    ⚠ {tCommon("labels.interviewRequired")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Requirements */}
          {visa.requirements && visa.requirements.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                {tDestination("visaDetailPage.sections.requirements")}
              </h2>
              <ul className="space-y-3">
                {visa.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start rounded-lg border border-gray-200 bg-white p-4"
                  >
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-sm font-semibold text-blue-600">
                        ✓
                      </span>
                    </span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Documents */}
          {visa.documents && visa.documents.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                {tDestination("visaDetailPage.sections.requiredDocuments")}
              </h2>
              <ul className="space-y-3">
                {visa.documents.map((doc, idx) => (
                  <li
                    key={idx}
                    className="flex items-start rounded-lg border border-gray-200 bg-white p-4"
                  >
                    <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-sm font-semibold text-blue-600">
                        📄
                      </span>
                    </span>
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-lg bg-blue-50 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              {tDestination("visaDetailPage.cta.readyToApply")}
            </h2>
            <p className="mb-6 text-gray-600">
              {tDestination("visaDetailPage.cta.startApplicationGuidance")}
            </p>
            <Button size="lg">{tCommon("buttons.startApplication")}</Button>
          </div>
        </div>
      </main>
    </>
  );
}
