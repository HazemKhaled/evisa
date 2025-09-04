import { getTranslation } from "../i18n";
import { cn } from "@/lib/utils";
import { getBaseUrl } from "@/lib/utils/urls";
import { JsonLd } from "@/components/json-ld";
import {
  generateWebPageJsonLd,
  generateServiceJsonLd,
  generateOrganizationData,
  generateServiceData,
} from "@/lib/json-ld";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t: tCommon } = await getTranslation(locale, "common");
  const { t: tHero } = await getTranslation(locale, "hero");
  const { t: tFeatures } = await getTranslation(locale, "features");
  const { t } = await getTranslation(locale, "pages");

  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}`;

  // Generate JSON-LD for the home page
  const webpageJsonLd = generateWebPageJsonLd({
    name: tHero("headline"),
    description: tHero("subheadline"),
    url: pageUrl,
    isPartOf: {
      name: "GetTravelVisa.com",
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
            <div className={cn("text-center")}>
              <h1
                className={cn(
                  "text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                )}
              >
                {tHero("headline")}
              </h1>
              <p className={cn("mx-auto mt-6 max-w-3xl text-xl text-gray-600")}>
                {tHero("subheadline")}
              </p>
              <div className="mt-10">
                <button className="rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                  {tCommon("buttons.startApplication")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className={cn("mb-4 text-lg font-semibold text-gray-900")}>
              {tHero("search.title")}
            </h2>
            <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-3")}>
              <div>
                <label
                  htmlFor="passport"
                  className={cn("block text-sm font-medium text-gray-700")}
                >
                  {tCommon("forms.passportCountry")}
                </label>
                <select
                  id="passport"
                  className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                >
                  <option>{tHero("search.passportPlaceholder")}</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="destination"
                  className={cn("block text-sm font-medium text-gray-700")}
                >
                  {tCommon("forms.destinationCountry")}
                </label>
                <select
                  id="destination"
                  className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm"
                >
                  <option>{tHero("search.destinationPlaceholder")}</option>
                </select>
              </div>
              <div className={cn("flex items-end")}>
                <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                  {tHero("search.checkButton")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={cn("text-center")}>
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                )}
              >
                {tFeatures("howItWorks.title")}
              </h2>
              <p className={cn("mx-auto mt-4 max-w-2xl text-lg text-gray-600")}>
                {tFeatures("howItWorks.subtitle")}
              </p>
            </div>

            <div
              className={cn(
                "mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
              )}
            >
              <div className={cn("text-center")}>
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
