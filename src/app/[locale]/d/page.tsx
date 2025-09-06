import { getTranslation } from "../../i18n";
import { cn } from "@/lib/utils";
import { env } from "@/lib/consts";
import { JsonLd } from "@/components/json-ld";
import { generateWebPageJsonLd } from "@/lib/json-ld";
import { getAllCountries } from "@/lib/services/country-service";
import { DestinationCard } from "@/components/ui/destination-card";
import type { CountryWithI18n } from "@/lib/services/country-service";

// Group countries by continent
function groupCountriesByContinent(countries: CountryWithI18n[]) {
  const continentGroups = countries.reduce(
    (groups, country) => {
      const continent = country.continent || "Other";
      if (!groups[continent]) {
        groups[continent] = [];
      }
      groups[continent].push(country);
      return groups;
    },
    {} as Record<string, CountryWithI18n[]>
  );

  // Sort countries within each continent alphabetically
  Object.keys(continentGroups).forEach(continent => {
    continentGroups[continent].sort((a, b) =>
      a.localizedName.localeCompare(b.localizedName)
    );
  });

  return continentGroups;
}

// Define continent order for display
const CONTINENT_ORDER = [
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Africa",
  "Oceania",
  "Other",
];

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t: tCommon } = await getTranslation(locale, "common");
  const { t } = await getTranslation(locale, "pages");

  // Fetch all countries
  const allCountries = await getAllCountries(locale);
  const continentGroups = groupCountriesByContinent(allCountries);

  const baseUrl = env.baseUrl;
  const pageUrl = `${baseUrl}/${locale}/d`;

  // Generate JSON-LD for the destinations page
  const webpageJsonLd = generateWebPageJsonLd({
    name: t("destinations.title"),
    description: t("destinations.description"),
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
            <div className={cn("text-center")}>
              <h1
                className={cn(
                  "text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                )}
              >
                {t("destinations.title")}
              </h1>
              <p className={cn("mx-auto mt-6 max-w-3xl text-xl text-gray-600")}>
                {t("destinations.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Destinations Grid by Continent */}
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {CONTINENT_ORDER.filter(
              continent => continentGroups[continent]?.length > 0
            ).map(continent => (
              <div key={continent} className="mb-16 last:mb-0">
                <div className={cn("mb-8 text-center")}>
                  <h2
                    className={cn(
                      "text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
                    )}
                  >
                    {t(
                      `continents.${continent.toLowerCase().replace(/\s+/g, "")}`,
                      continent
                    )}
                  </h2>
                  <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                </div>

                <div
                  className={cn(
                    "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  )}
                >
                  {continentGroups[continent].map(destination => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>
            ))}

            {allCountries.length === 0 && (
              <div className="py-16 text-center">
                <div className="mb-4 text-6xl text-gray-400">🌍</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {tCommon("states.noData")}
                </h3>
                <p className="text-gray-600">
                  {t("destinations.noDestinations")}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t } = await getTranslation(locale, "pages");

  return {
    title: t("destinations.title"),
    description: t("destinations.description"),
    openGraph: {
      title: t("destinations.title"),
      description: t("destinations.description"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("destinations.title"),
      description: t("destinations.description"),
    },
  };
}
