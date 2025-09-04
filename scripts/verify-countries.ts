/**
 * Verification script to check the seeded countries data
 */
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { sql, count } from "drizzle-orm";
import { countries, countriesI18n } from "../src/lib/db/schema";
import * as schema from "../src/lib/db/schema";

async function verifyCountries() {
  console.log("🔍 Verifying countries data...");

  try {
    // Create LibSQL client for local SQLite file
    const dbPath = `${process.cwd()}/local-db.sqlite`;
    const client = createClient({
      url: `file:${dbPath}`,
    });
    const db = drizzle(client, { schema });

    // Count total countries
    const totalCountries = await db.select({ count: count() }).from(countries);
    console.log(`📊 Total countries: ${totalCountries[0].count}`);

    // Count total translations
    const totalTranslations = await db.select({ count: count() }).from(countriesI18n);
    console.log(`🌐 Total translations: ${totalTranslations[0].count}`);

    // Count by continent using raw SQL
    const continentResults = await client.execute(`
      SELECT continent, COUNT(*) as count 
      FROM countries 
      GROUP BY continent 
      ORDER BY count DESC
    `);
    
    console.log("\n📊 Countries by continent:");
    continentResults.rows.forEach((row: any) => {
      console.log(`   • ${row.continent}: ${row.count} countries`);
    });

    // Show sample countries with translations using raw SQL
    const sampleCountries = await client.execute(`
      SELECT c.code, c.continent, c.region, ci.locale, ci.name
      FROM countries c
      LEFT JOIN countries_i18n ci ON c.id = ci.country_id
      ORDER BY c.code, ci.locale
      LIMIT 20
    `);

    console.log("\n🌍 Sample countries with translations:");
    const groupedSamples = sampleCountries.rows.reduce((acc: any, row: any) => {
      if (!acc[row.code]) {
        acc[row.code] = { code: row.code, continent: row.continent, region: row.region, translations: [] };
      }
      if (row.name && row.locale) {
        acc[row.code].translations.push(`${row.locale}: ${row.name}`);
      }
      return acc;
    }, {});

    Object.values(groupedSamples).slice(0, 5).forEach((country: any) => {
      console.log(`   • ${country.code} (${country.continent}/${country.region}): ${country.translations.join(' | ')}`);
    });

    // Check for specific countries using raw SQL
    const specificCountries = await client.execute(`
      SELECT c.code, ci.name, ci.locale
      FROM countries c
      JOIN countries_i18n ci ON c.id = ci.country_id
      WHERE c.code IN ('USA', 'ARE', 'GBR', 'DEU', 'JPN')
      ORDER BY c.code, ci.locale
    `);

    console.log("\n🎯 Specific countries verification:");
    let currentCode = '';
    specificCountries.rows.forEach((row: any) => {
      if (row.code !== currentCode) {
        console.log(`   ${row.code}:`);
        currentCode = row.code;
      }
      console.log(`     ${row.locale}: ${row.name}`);
    });

    console.log("\n✅ Countries data verification completed!");

  } catch (error) {
    console.error("❌ Error verifying countries data:", error);
    throw error;
  }
}

// Run the verification function
verifyCountries()
  .then(() => {
    console.log("✨ Verification process finished");
    process.exit(0);
  })
  .catch(error => {
    console.error("💥 Verification failed:", error);
    process.exit(1);
  });