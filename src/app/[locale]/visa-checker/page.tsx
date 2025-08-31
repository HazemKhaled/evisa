import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { getDatabase, schema } from "@/lib/db";
import { fallbackDestinations, fallbackPassportCountries } from "@/lib/db/fallback";
import { eq } from "drizzle-orm";

// Make this page dynamic
export const dynamic = "force-dynamic";

async function getCountryData() {
  try {
    const db = await getDatabase();

    if (!db) {
      // Use fallback data in development
      return {
        destinations: fallbackDestinations.map((d) => ({
          code: d.code,
          name: d.name,
          nameAr: d.nameAr,
          flag: d.flag,
        })),
        passportCountries: fallbackPassportCountries.map((p) => ({
          code: p.code,
          name: p.name,
          nameAr: p.nameAr,
          flag: p.flag,
        })),
      };
    }

    const [destinations, passportCountries] = await Promise.all([
      db
        .select({
          code: schema.destinations.code,
          name: schema.destinations.name,
          nameAr: schema.destinations.nameAr,
          flag: schema.destinations.flag,
        })
        .from(schema.destinations)
        .where(eq(schema.destinations.isActive, true))
        .orderBy(schema.destinations.name),

      db
        .select({
          code: schema.passportCountries.code,
          name: schema.passportCountries.name,
          nameAr: schema.passportCountries.nameAr,
          flag: schema.passportCountries.flag,
        })
        .from(schema.passportCountries)
        .where(eq(schema.passportCountries.isActive, true))
        .orderBy(schema.passportCountries.name),
    ]);

    return { destinations, passportCountries };
  } catch (error) {
    // If database queries fail, use fallback data
    console.warn("Database query failed, using fallback data:", error);
    return {
      destinations: fallbackDestinations.map((d) => ({
        code: d.code,
        name: d.name,
        nameAr: d.nameAr,
        flag: d.flag,
      })),
      passportCountries: fallbackPassportCountries.map((p) => ({
        code: p.code,
        name: p.name,
        nameAr: p.nameAr,
        flag: p.flag,
      })),
    };
  }
}

export default async function VisaCheckerPage() {
  const { destinations, passportCountries } = await getCountryData();

  return (
    <>
      <Header />
      <main>
        <Hero destinations={destinations} passportCountries={passportCountries} />
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Our Visa Checker Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Countries</h3>
                <p className="text-gray-600">
                  Choose your passport country and destination to get started.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Check Requirements</h3>
                <p className="text-gray-600">
                  Get instant results about visa requirements and eligibility.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Application</h3>
                <p className="text-gray-600">
                  Connect with trusted service providers to process your visa.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
