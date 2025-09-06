import { getTranslation } from "../../../i18n";
import { cn } from "@/lib/utils";
import { env } from "@/lib/consts";
import { JsonLd } from "@/components/json-ld";
import { generateWebPageJsonLd } from "@/lib/json-ld";
import { getCountryByCode } from "@/lib/services/country-service";
import { getVisaTypesByDestination } from "@/lib/services/visa-service";
import { getBlogPostsForLocale } from "@/lib/blog";
import { VisaTypeCard } from "@/components/ui/visa-type-card";
import { RelatedArticleCard } from "@/components/ui/related-article-card";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ locale: string; countryCode: string }>;
}) {
  const { locale, countryCode } = await params;
  const { t: tCommon } = await getTranslation(locale, "common");
  const { t } = await getTranslation(locale, "pages");

  // Fetch destination data
  const destination = await getCountryByCode(countryCode.toUpperCase(), locale);

  if (!destination) {
    notFound();
  }

  // Fetch visas and articles for this destination
  const [visaTypes, allBlogPosts] = await Promise.all([
    getVisaTypesByDestination(countryCode.toUpperCase(), locale),
    getBlogPostsForLocale(locale),
  ]);

  // Filter blog posts related to this destination
  const relatedPosts = allBlogPosts
    .filter(post =>
      post.frontmatter.destinations?.some(
        dest => dest.toLowerCase() === countryCode.toLowerCase()
      )
    )
    .slice(0, 6);

  const baseUrl = env.baseUrl;
  const pageUrl = `${baseUrl}/${locale}/d/${countryCode.toLowerCase()}`;

  // Generate JSON-LD for the destination page
  const webpageJsonLd = generateWebPageJsonLd({
    name: `${destination.localizedName} - ${t("destinations.title")}`,
    description:
      destination.about ||
      `Explore visa requirements for ${destination.localizedName}. Find visa options, requirements, and travel information.`,
    url: pageUrl,
    isPartOf: {
      name: t("jsonld.website.name"),
      url: baseUrl,
    },
  });

  return (
    <>
      <JsonLd data={webpageJsonLd} />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
            {/* Hero Image */}
            {destination.heroImage && (
              <div className="mb-8 overflow-hidden rounded-xl">
                <div className="relative h-64 sm:h-80 lg:h-96">
                  <Image
                    src={destination.heroImage}
                    alt={`${destination.localizedName} landscape`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute right-4 bottom-4 left-4">
                    <h1
                      className={cn(
                        "text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
                      )}
                    >
                      {destination.localizedName}
                    </h1>
                    <p className="text-sm font-medium tracking-wide text-white/80 uppercase">
                      {destination.code} •{" "}
                      {t(`continents.${destination.continent}`)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Hero Content without Image */}
            {!destination.heroImage && (
              <div className={cn("text-center")}>
                <h1
                  className={cn(
                    "text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                  )}
                >
                  {destination.localizedName}
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  {destination.code} •{" "}
                  {t(`continents.${destination.continent}`)}
                </p>
              </div>
            )}

            {/* About Section */}
            {destination.about && (
              <div className="mt-8">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-xl leading-relaxed text-gray-700">
                    {destination.about}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Visa Options Section */}
        {visaTypes.length > 0 && (
          <div className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className={cn("mb-12 text-center")}>
                <h2
                  className={cn(
                    "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                  )}
                >
                  {t(
                    "destination.visaOptions",
                    `Visa Options for ${destination.localizedName}`
                  )}
                </h2>
                <p
                  className={cn("mx-auto mt-4 max-w-2xl text-lg text-gray-600")}
                >
                  {t(
                    "destination.visaOptionsDesc",
                    "Choose from available visa types and requirements for your travel to this destination."
                  )}
                </p>
              </div>

              <div
                className={cn(
                  "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                )}
              >
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
        )}

        {/* No Visa Options Message */}
        {visaTypes.length === 0 && (
          <div className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="mb-4 text-6xl text-gray-400">📋</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {t("destination.noVisaOptions", "No visa options available")}
                </h3>
                <p className="text-gray-600">
                  {t(
                    "destination.noVisaOptionsDesc",
                    "Visa information for this destination is not available yet. Please check back later."
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className={cn("mb-12 text-center")}>
                <h2
                  className={cn(
                    "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                  )}
                >
                  {t(
                    "destination.relatedArticles",
                    `Articles about ${destination.localizedName}`
                  )}
                </h2>
                <p
                  className={cn("mx-auto mt-4 max-w-2xl text-lg text-gray-600")}
                >
                  {t(
                    "destination.relatedArticlesDesc",
                    "Travel guides, tips, and insights for your journey to this destination."
                  )}
                </p>
              </div>

              <div
                className={cn(
                  "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                )}
              >
                {relatedPosts.map(post => (
                  <RelatedArticleCard
                    key={post.slug}
                    post={post}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-blue-600 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight text-white sm:text-4xl"
                )}
              >
                {t("destination.readyToApply", "Ready to apply for your visa?")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-blue-100">
                {t(
                  "destination.readyToApplyDesc",
                  "Start your visa application process today and get closer to your travel goals."
                )}
              </p>
              <div className="mt-8">
                <button className="rounded-md bg-white px-8 py-3 text-base font-medium text-blue-600 shadow hover:bg-gray-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 focus:outline-none">
                  {tCommon("buttons.startApplication")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; countryCode: string }>;
}) {
  const { locale, countryCode } = await params;
  const { t } = await getTranslation(locale, "pages");

  const destination = await getCountryByCode(countryCode.toUpperCase(), locale);

  if (!destination) {
    return {
      title: t("errors.page_not_found"),
      description: t("errors.page_not_found_description"),
    };
  }

  const title = `${destination.localizedName} - ${t("destinations.title")}`;
  const description =
    destination.about ||
    `Explore visa requirements for ${destination.localizedName}. Find visa options, requirements, and travel information.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: destination.heroImage ? [destination.heroImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: destination.heroImage ? [destination.heroImage] : [],
    },
  };
}
