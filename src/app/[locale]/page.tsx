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

export default async function HomePage() {
  const { destinations, passportCountries } = await getCountryData();

  return (
    <>
      <Header />
      <main>
        <Hero destinations={destinations} passportCountries={passportCountries} />
        {/* Additional homepage sections will be added here */}
      </main>
    </>
  );
}
