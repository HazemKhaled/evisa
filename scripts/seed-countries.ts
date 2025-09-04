/**
 * Comprehensive countries seeding script for GetTravelVisa.com platform
 * This script populates the database with all world countries and their translations
 */
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import {
  countries,
  countriesI18n,
  type NewCountryI18n,
} from "../src/lib/db/schema";
import * as schema from "../src/lib/db/schema";

// Import all countries data
import { allCountriesData } from "./countries-data";
import { asianCountriesData } from "./countries-data-asia";
import { europeanCountriesData } from "./countries-data-europe";
import { americasCountriesData } from "./countries-data-americas";
import { oceaniaCountriesData } from "./countries-data-oceania";

// Combine all countries data
const allWorldCountries = [
  ...allCountriesData, // Africa
  ...asianCountriesData, // Asia
  ...europeanCountriesData, // Europe
  ...americasCountriesData, // North & South America
  ...oceaniaCountriesData, // Oceania
];

async function seedCountries() {
  console.log("🌍 Starting comprehensive countries seeding...");
  console.log(`📊 Total countries to seed: ${allWorldCountries.length}`);

  try {
    // Create LibSQL client for seed script using local SQLite file
    const dbPath = `${process.cwd()}/local-db.sqlite`;
    const client = createClient({
      url: `file:${dbPath}`,
    });
    const db = drizzle(client, { schema });

    // Clear existing countries data (optional - comment out if you want to keep existing data)
    console.log("🧹 Clearing existing countries data...");
    await db.delete(countriesI18n);
    await db.delete(countries);
    console.log("✅ Existing countries data cleared");

    // Insert countries
    console.log("📍 Inserting countries...");
    const insertedCountries: Record<string, number> = {};
    let successCount = 0;
    let errorCount = 0;

    for (const countryData of allWorldCountries) {
      try {
        const [insertedCountry] = await db
          .insert(countries)
          .values({
            code: countryData.code,
            continent: countryData.continent,
            region: countryData.region,
            isActive: countryData.isActive,
          })
          .returning();
        
        insertedCountries[countryData.code] = insertedCountry.id;

        // Insert country translations
        const countryTranslations: NewCountryI18n[] = countryData.translations.map(t => ({
          countryId: insertedCountry.id,
          locale: t.locale,
          name: t.name,
          description: t.description,
        }));

        await db.insert(countriesI18n).values(countryTranslations);
        successCount++;
        
        if (successCount % 50 === 0) {
          console.log(`   ✅ Processed ${successCount}/${allWorldCountries.length} countries...`);
        }
      } catch (error) {
        errorCount++;
        console.error(`❌ Error inserting country ${countryData.code}:`, error);
      }
    }

    console.log(`✅ Countries seeding completed!`);
    console.log(`   • Successfully inserted: ${successCount} countries`);
    console.log(`   • Errors: ${errorCount} countries`);
    console.log(`   • Total translations: ${successCount * 4} (4 locales per country)`);

    // Display summary by continent
    const continentSummary = allWorldCountries.reduce((acc, country) => {
      acc[country.continent] = (acc[country.continent] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log("\n📊 Summary by continent:");
    Object.entries(continentSummary).forEach(([continent, count]) => {
      console.log(`   • ${continent}: ${count} countries`);
    });

    console.log("\n🎉 All countries have been successfully seeded with multilingual support!");
    console.log("🌐 Supported locales: en, ar, es, fr");

  } catch (error) {
    console.error("❌ Error seeding countries:", error);
    throw error;
  }
}

// Run the seed function
seedCountries()
  .then(() => {
    console.log("✨ Countries seeding process finished");
    process.exit(0);
  })
  .catch(error => {
    console.error("💥 Countries seeding failed:", error);
    process.exit(1);
  });