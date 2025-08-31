import { getTranslations, getLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { getDatabase, schema } from "@/lib/db";
import { fallbackDestinations, fallbackVisaTypes } from "@/lib/db/fallback";
import { eq, and } from "drizzle-orm";
import { Card } from "@/components/ui/Card";
import { notFound } from "next/navigation";

// Make this page dynamic
export const dynamic = "force-dynamic";

async function getDestination(countryCode: string) {
  try {
    const db = await getDatabase();

    if (!db) {
      // Use fallback data in development
      return fallbackDestinations.find((d) => d.code === countryCode.toUpperCase()) || null;
    }

    const destination = await db
      .select()
      .from(schema.destinations)
      .where(eq(schema.destinations.code, countryCode.toUpperCase()))
      .get();

    return destination;
  } catch (error) {
    // If database queries fail, use fallback data
    console.warn("Database query failed, using fallback data:", error);
    return fallbackDestinations.find((d) => d.code === countryCode.toUpperCase()) || null;
  }
}

async function getVisaTypes(destinationId: number) {
  try {
    const db = await getDatabase();

    if (!db) {
      // Use fallback data in development
      return fallbackVisaTypes.filter((v) => v.destinationId === destinationId && v.isActive);
    }

    return await db
      .select()
      .from(schema.visaTypes)
      .where(
        and(eq(schema.visaTypes.destinationId, destinationId), eq(schema.visaTypes.isActive, true))
      );
  } catch (error) {
    // If database queries fail, use fallback data
    console.warn("Database query failed, using fallback data:", error);
    return fallbackVisaTypes.filter((v) => v.destinationId === destinationId && v.isActive);
  }
}

interface DestinationPageProps {
  params: Promise<{
    country: string;
    locale: string;
  }>;
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { country } = await params;
  const t = await getTranslations("Navigation");
  const locale = await getLocale();
  const destination = await getDestination(country);

  if (!destination) {
    notFound();
  }

  const visaTypes = await getVisaTypes(destination.id);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-500">
            <span>{t("destinations")}</span>
            <span className="mx-2">/</span>
            <span>
              {locale === "ar" && destination.nameAr ? destination.nameAr : destination.name}
            </span>
          </nav>

          {/* Destination Header */}
          <header className="mb-12">
            <div className="flex items-center mb-6">
              <span className="text-6xl mr-4 rtl:ml-4 rtl:mr-0">{destination.flag}</span>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  {locale === "ar" && destination.nameAr ? destination.nameAr : destination.name}
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  {locale === "ar" && destination.capitalAr
                    ? `العاصمة: ${destination.capitalAr}`
                    : `Capital: ${destination.capital}`}
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {locale === "ar" && destination.descriptionAr
                ? destination.descriptionAr
                : destination.description}
            </p>
          </header>

          {/* Visa Types Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Visa Options</h2>

            {visaTypes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No visa types available at the moment.</p>
                <p className="text-gray-400 mt-2">Check back soon for visa options!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visaTypes.map((visa) => (
                  <Card key={visa.id} className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {locale === "ar" && visa.nameAr ? visa.nameAr : visa.name}
                    </h3>

                    <p className="text-gray-600 mb-4">
                      {locale === "ar" && visa.descriptionAr
                        ? visa.descriptionAr
                        : visa.description}
                    </p>

                    <div className="space-y-2">
                      {visa.fee && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Fee:</span>
                          <span className="font-medium">
                            {visa.fee} {visa.currency}
                          </span>
                        </div>
                      )}

                      {visa.processingTime && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Processing:</span>
                          <span className="font-medium">
                            {locale === "ar" && visa.processingTimeAr
                              ? visa.processingTimeAr
                              : visa.processingTime}
                          </span>
                        </div>
                      )}

                      {visa.validity && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Validity:</span>
                          <span className="font-medium">
                            {locale === "ar" && visa.validityAr ? visa.validityAr : visa.validity}
                          </span>
                        </div>
                      )}

                      {visa.entryType && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Entry Type:</span>
                          <span className="font-medium capitalize">{visa.entryType}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
