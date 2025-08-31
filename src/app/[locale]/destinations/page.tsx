import { getTranslations, getLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { getDatabase, schema } from "@/lib/db";
import { fallbackDestinations } from "@/lib/db/fallback";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/Card";
import { eq } from "drizzle-orm";

// Make this page dynamic
export const dynamic = "force-dynamic";

async function getDestinations() {
  try {
    const db = await getDatabase();

    if (!db) {
      // Use fallback data in development
      return fallbackDestinations.filter((d) => d.isActive);
    }

    return await db
      .select()
      .from(schema.destinations)
      .where(eq(schema.destinations.isActive, true))
      .orderBy(schema.destinations.name);
  } catch (error) {
    // If database queries fail, use fallback data
    console.warn("Database query failed, using fallback data:", error);
    return fallbackDestinations.filter((d) => d.isActive);
  }
}

export default async function DestinationsPage() {
  const t = await getTranslations("Navigation");
  const locale = await getLocale();
  const destinations = await getDestinations();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{t("destinations")}</h1>
          <p className="text-xl text-gray-600 mb-12">
            Explore visa requirements for destinations around the world.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <Card
                key={destination.code}
                className="hover:shadow-lg transition-shadow p-6 cursor-pointer"
              >
                <Link
                  href={{
                    pathname: "/destinations/[country]",
                    params: { country: destination.code.toLowerCase() },
                  }}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3 rtl:ml-3 rtl:mr-0">{destination.flag}</span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {locale === "ar" && destination.nameAr
                        ? destination.nameAr
                        : destination.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {locale === "ar" && destination.descriptionAr
                      ? destination.descriptionAr
                      : destination.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {locale === "ar" && destination.capitalAr
                        ? `العاصمة: ${destination.capitalAr}`
                        : `Capital: ${destination.capital}`}
                    </span>
                    <span className="text-primary hover:text-primary-dark font-medium">
                      View Details →
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
