import { getTranslation } from "../i18n";
import { env } from "@/lib/consts";
import { JsonLd } from "@/components/json-ld";
import {
  generateWebPageJsonLd,
  generateServiceJsonLd,
  generateOrganizationData,
  generateServiceData,
} from "@/lib/json-ld";
import {
  getDestinationsListWithMetadata,
  getAllCountries,
} from "@/lib/services/country-service";
import { getRandomVisaTypes } from "@/lib/services/visa-service";
import { getAllBlogPosts } from "@/lib/services/blog-service";
import { DestinationCard } from "@/components/destinations/destination-card";
import { VisaTypeCard } from "@/components/destinations/visa-type-card";
import { SearchForm } from "@/components/search-form";
import { Button } from "@repo/ui";
import { BlogPostCard } from "@/components/blog/blog-post-card";

export const revalidate = 86400; // Revalidate every 24 hours

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t: tCommon } = await getTranslation(locale, "common");
  const { t: tHero } = await getTranslation(locale, "hero");
  const { t: tFeatures } = await getTranslation(locale, "features");
  const { t: tBlog } = await getTranslation(locale, "blog");
  const { t } = await getTranslation(locale, "pages");

  // Fetch data for homepage sections with graceful degradation
  const [
    destinationsResult,
    visaTypesResult,
    blogPostsResult,
    countriesResult,
  ] = await Promise.allSettled([
    getDestinationsListWithMetadata(locale, 8, "popular"),
    getRandomVisaTypes(locale, 6),
    getAllBlogPosts(locale, 6),
    getAllCountries(locale),
  ]);

  // Extract results with fallbacks for failed requests
  const destinations =
    destinationsResult.status === "fulfilled" ? destinationsResult.value : [];
  const visaTypes =
    visaTypesResult.status === "fulfilled" ? visaTypesResult.value : [];
  const blogPosts =
    blogPostsResult.status === "fulfilled" ? blogPostsResult.value : [];
  const countries =
    countriesResult.status === "fulfilled" ? countriesResult.value : [];

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
      <JsonLd data={webpageJsonLd} />
      <JsonLd data={serviceJsonLd} />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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

        {/* Random Visa Types Section */}
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
        {blogPosts.length > 0 && (
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
        )}
      </main>
    </>
  );
}
