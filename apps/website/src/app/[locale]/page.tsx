import { Button, Skeleton } from "@repo/ui";
import type { Metadata } from "next";
import { Suspense } from "react";

import { getLocaleWithRegion } from "@/app/i18n/settings";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { DestinationCard } from "@/components/destinations/destination-card";
import { VisaTypeCard } from "@/components/destinations/visa-type-card";
import { JsonLd } from "@/components/json-ld";
import { SearchForm } from "@/components/search-form";
import { env } from "@/lib/consts";
import {
  generateOrganizationData,
  generateServiceData,
  generateServiceJsonLd,
  generateWebPageJsonLd,
} from "@/lib/json-ld";
import { getAllBlogPosts } from "@/lib/services/blog-service";
import {
  getAllCountries,
  getDestinationsListWithMetadata,
} from "@/lib/services/country-service";
import { getRandomVisaTypes } from "@/lib/services/visa-service";
import { generateAlternatesMetadata } from "@/lib/utils";

import { getTranslation } from "../i18n";

export const revalidate = 86400; // Revalidate every 24 hours

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t: tHero } = await getTranslation(locale, "hero");
  const { t: tCommon } = await getTranslation(locale, "common");

  const alternates = generateAlternatesMetadata(env.baseUrl, "", locale);

  return {
    title: tHero("headline"),
    description: tHero("subheadline"),
    alternates,
    openGraph: {
      type: "website",
      locale: getLocaleWithRegion(locale),
      title: tHero("headline"),
      description: tHero("subheadline"),
      url: alternates.canonical,
      siteName: tCommon("site.title"),
      images: [
        {
          url: `${env.baseUrl}/icon.svg`,
          width: 1200,
          height: 630,
          alt: tHero("headline"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tHero("headline"),
      description: tHero("subheadline"),
      images: [`${env.baseUrl}/icon.svg`],
    },
  };
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Parallel fetch: all translations for homepage sections
  const [{ t: tCommon }, { t: tHero }, { t: tFeatures }, { t }] =
    await Promise.all([
      getTranslation(locale, "common"),
      getTranslation(locale, "hero"),
      getTranslation(locale, "features"),
      getTranslation(locale, "pages"),
    ]);

  const baseUrl = env.baseUrl;
  const pageUrl = `${baseUrl}/${locale}`;

  // Generate JSON-LD for the home page
  const webpageJsonLd = generateWebPageJsonLd({
    name: tHero("headline"),
    description: tHero("subheadline"),
    url: pageUrl,
    isPartOf: {
      name: t("jsonld.website.name"),
      url: baseUrl,
    },
  });

  const organizationData = generateOrganizationData(t);
  const serviceData = generateServiceData(t, organizationData);
  const serviceJsonLd = generateServiceJsonLd(serviceData);

  return (
    <>
      <JsonLd id="json-ld-webpage" data={webpageJsonLd} />
      <JsonLd id="json-ld-service" data={serviceJsonLd} />
      <main
        id="main-content"
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                {tHero("headline")}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-600">
                {tHero("subheadline")}
              </p>
              <div className="mt-10">
                <Button>{tCommon("buttons.startApplication")}</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <Suspense fallback={<SearchFormSectionSkeleton />}>
          <SearchFormSection locale={locale} />
        </Suspense>

        {/* How It Works Section */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {tFeatures("howItWorks.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                {tFeatures("howItWorks.subtitle")}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                  <span className="font-bold text-white">1</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {tFeatures("howItWorks.steps.check.title")}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {tFeatures("howItWorks.steps.check.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                  <span className="font-bold text-white">2</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {tFeatures("howItWorks.steps.apply.title")}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {tFeatures("howItWorks.steps.apply.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
                  <span className="font-bold text-white">3</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {tFeatures("howItWorks.steps.documents.title")}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {tFeatures("howItWorks.steps.documents.description")}
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-600">
                  <span className="font-bold text-white">4</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {tFeatures("howItWorks.steps.approval.title")}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {tFeatures("howItWorks.steps.approval.description")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Destinations Section */}
        <Suspense fallback={<DestinationsSectionSkeleton />}>
          <DestinationsSection locale={locale} />
        </Suspense>

        {/* Random Visa Types Section */}
        <Suspense fallback={<VisaTypesSectionSkeleton />}>
          <VisaTypesSection locale={locale} />
        </Suspense>

        {/* Why Choose Us Section */}
        <div className="bg-blue-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {tFeatures("whyChooseUs.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                {tFeatures("whyChooseUs.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {tFeatures("whyChooseUs.features.speed.title")}
                </h3>
                <p className="text-gray-600">
                  {tFeatures("whyChooseUs.features.speed.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {tFeatures("whyChooseUs.features.trust.title")}
                </h3>
                <p className="text-gray-600">
                  {tFeatures("whyChooseUs.features.trust.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {tFeatures("whyChooseUs.features.global.title")}
                </h3>
                <p className="text-gray-600">
                  {tFeatures("whyChooseUs.features.global.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-600">
                  <svg
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25v19.5M21.75 12H2.25"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {tFeatures("whyChooseUs.features.support.title")}
                </h3>
                <p className="text-gray-600">
                  {tFeatures("whyChooseUs.features.support.description")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Blog Posts Section */}
        <Suspense fallback={<BlogPostsSectionSkeleton />}>
          <BlogPostsSection locale={locale} />
        </Suspense>
      </main>
    </>
  );
}

async function SearchFormSection({ locale }: { locale: string }) {
  const { t: tCommon } = await getTranslation(locale, "common");
  const { t: tHero } = await getTranslation(locale, "hero");
  let countries: Awaited<ReturnType<typeof getAllCountries>> = [];

  try {
    countries = await getAllCountries(locale);
  } catch {
    countries = [];
  }

  return (
    <SearchForm
      countries={countries}
      searchTitle={tHero("search.title")}
      passportLabel={tCommon("forms.passportCountry")}
      passportPlaceholder={tHero("search.passportPlaceholder")}
      destinationLabel={tCommon("forms.destinationCountry")}
      destinationPlaceholder={tHero("search.destinationPlaceholder")}
      checkButtonText={tHero("search.checkButton")}
      emptyText={tCommon("status.notFound")}
      searchPlaceholder={tHero("search.searchPlaceholder")}
    />
  );
}

function SearchFormSectionSkeleton() {
  return (
    <div className="bg-white/80 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="mt-4 h-11 w-40" />
      </div>
    </div>
  );
}

async function DestinationsSection({ locale }: { locale: string }) {
  const { t: tFeatures } = await getTranslation(locale, "features");
  let destinations: Awaited<
    ReturnType<typeof getDestinationsListWithMetadata>
  > = [];

  try {
    destinations = await getDestinationsListWithMetadata(locale, 8, "popular");
  } catch {
    destinations = [];
  }

  if (destinations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {tFeatures("topDestinations.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {tFeatures("topDestinations.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map(destination => (
            <DestinationCard
              key={destination.code}
              destination={destination}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DestinationsSectionSkeleton() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto h-8 w-64" />
          <Skeleton className="mx-auto mt-4 h-5 w-96" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-white p-4">
              <Skeleton className="mb-4 h-24 w-full" />
              <Skeleton className="mb-2 h-5 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function VisaTypesSection({ locale }: { locale: string }) {
  const { t: tCommon } = await getTranslation(locale, "common");
  const { t: tFeatures } = await getTranslation(locale, "features");
  let visaTypes: Awaited<ReturnType<typeof getRandomVisaTypes>> = [];

  try {
    visaTypes = await getRandomVisaTypes(locale, 6);
  } catch {
    visaTypes = [];
  }

  if (visaTypes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {tFeatures("popularVisaTypes.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {tFeatures("popularVisaTypes.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visaTypes.map(visaType => (
            <VisaTypeCard
              key={visaType.id}
              visaType={visaType}
              locale={locale}
              tCommon={tCommon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function VisaTypesSectionSkeleton() {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto h-8 w-64" />
          <Skeleton className="mx-auto mt-4 h-5 w-96" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-white p-4">
              <Skeleton className="mb-3 h-6 w-2/3" />
              <Skeleton className="mb-2 h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function BlogPostsSection({ locale }: { locale: string }) {
  const { t: tBlog } = await getTranslation(locale, "blog");
  let blogPosts: Awaited<ReturnType<typeof getAllBlogPosts>> = [];

  try {
    blogPosts = await getAllBlogPosts(locale, 6);
  } catch {
    blogPosts = [];
  }

  if (blogPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {tBlog("homepage.latestPosts.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {tBlog("homepage.latestPosts.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map(post => (
            <BlogPostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogPostsSectionSkeleton() {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto h-8 w-64" />
          <Skeleton className="mx-auto mt-4 h-5 w-96" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-white p-4">
              <Skeleton className="mb-4 aspect-video w-full rounded-md" />
              <Skeleton className="mb-2 h-5 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
