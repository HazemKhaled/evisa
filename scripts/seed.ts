/**
 * Database seeding script for GetTravelVisa.com platform with i18n structure
 * This script populates the database with initial data for countries, visa types, and eligibility
 * using the new normalized i18n table structure
 */
import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

// Load environment variables from .env.local
const projectDir = process.cwd();
loadEnvConfig(projectDir);
import {
  countries,
  countriesI18n,
  visaTypes,
  visaTypesI18n,
  visaEligibility,
  visaEligibilityI18n,
  type NewCountryI18n,
  type NewVisaType,
  type NewVisaTypeI18n,
  type NewVisaEligibility,
  type NewVisaEligibilityI18n,
} from "../src/lib/db/schema";
import * as schema from "../src/lib/db/schema";

// Import all countries data
import { allCountriesData } from "./countries-data-africa";
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

// Visa type data with translations (for UAE)
const visaTypeDataWithTranslations = [
  {
    visaType: {
      destinationCode: "ARE",
      type: "tourist",
      duration: 30,
      processingTime: 3,
      fee: 100.0,
      currency: "USD",
      requiresInterview: false,
      isMultiEntry: false,
      requirements: [
        "Valid passport",
        "Passport photos",
        "Flight itinerary",
        "Hotel booking",
      ],
      documents: [
        "passport_copy",
        "photos",
        "flight_booking",
        "hotel_reservation",
      ],
      isActive: true,
    },
    translations: [
      {
        locale: "en",
        name: "Tourist Visa",
        description: "30-day tourist visa for leisure travel",
      },
      {
        locale: "ar",
        name: "تأشيرة سياحية",
        description: "تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي",
      },
      {
        locale: "es",
        name: "Visa de Turista",
        description: "Visa de turista de 30 días para viajes de ocio",
      },
      {
        locale: "fr",
        name: "Visa de Tourisme",
        description: "Visa touristique de 30 jours pour les voyages de loisir",
      },
    ],
  },
  {
    visaType: {
      destinationCode: "ARE",
      type: "business",
      duration: 30,
      processingTime: 5,
      fee: 150.0,
      currency: "USD",
      requiresInterview: false,
      isMultiEntry: false,
      requirements: [
        "Valid passport",
        "Business invitation",
        "Company documents",
        "Flight itinerary",
      ],
      documents: [
        "passport_copy",
        "invitation_letter",
        "company_registration",
        "flight_booking",
      ],
      isActive: true,
    },
    translations: [
      {
        locale: "en",
        name: "Business Visa",
        description: "30-day business visa for commercial activities",
      },
      {
        locale: "ar",
        name: "تأشيرة عمل",
        description: "تأشيرة عمل لمدة 30 يوم للأنشطة التجارية",
      },
      {
        locale: "es",
        name: "Visa de Negocios",
        description: "Visa de negocios de 30 días para actividades comerciales",
      },
      {
        locale: "fr",
        name: "Visa d'Affaires",
        description: "Visa d'affaires de 30 jours pour activités commerciales",
      },
    ],
  },
];

// Visa eligibility data with translations
const visaEligibilityDataWithTranslations = [
  {
    eligibility: {
      destinationCode: "ARE",
      passportCode: "USA",
      visaTypeIndex: 0, // Tourist visa
      eligibilityStatus: "visa_free",
      maxStayDays: 30,
      isActive: true,
    },
    translations: [
      {
        locale: "en",
        notes: "US passport holders can enter UAE visa-free for tourism",
      },
      {
        locale: "ar",
        notes: "يمكن لحاملي الجواز الأمريكي دخول الإمارات بدون تأشيرة للسياحة",
      },
    ],
  },
  {
    eligibility: {
      destinationCode: "ARE",
      passportCode: "USA",
      visaTypeIndex: 1, // Business visa
      eligibilityStatus: "on_arrival",
      maxStayDays: 30,
      isActive: true,
    },
    translations: [
      {
        locale: "en",
        notes: "Business visa available on arrival for US passport holders",
      },
      {
        locale: "ar",
        notes: "تأشيرة العمل متاحة عند الوصول لحاملي الجواز الأمريكي",
      },
    ],
  },
  {
    eligibility: {
      destinationCode: "ARE",
      passportCode: "GBR",
      visaTypeIndex: 0, // Tourist visa
      eligibilityStatus: "visa_free",
      maxStayDays: 30,
      isActive: true,
    },
    translations: [
      {
        locale: "en",
        notes: "UK passport holders can enter UAE visa-free for tourism",
      },
      {
        locale: "ar",
        notes: "يمكن لحاملي الجواز البريطاني دخول الإمارات بدون تأشيرة للسياحة",
      },
    ],
  },
  {
    eligibility: {
      destinationCode: "ARE",
      passportCode: "GBR",
      visaTypeIndex: 1, // Business visa
      eligibilityStatus: "required",
      maxStayDays: null,
      isActive: true,
    },
    translations: [
      { locale: "en", notes: "Business visa required for UK passport holders" },
      { locale: "ar", notes: "تأشيرة العمل مطلوبة لحاملي الجواز البريطاني" },
    ],
  },
];

function createDatabase() {
  const dbPath = `${process.cwd()}/${process.env.LOCAL_DB_PATH}`;
  const client = createClient({
    url: `file:${dbPath}`,
  });
  return drizzle(client, { schema });
}

async function insertCountriesWithRobustHandling(
  db: ReturnType<typeof createDatabase>,
  clearExisting = false,
  showDetailedStats = false
) {
  if (clearExisting) {
    console.log("🧹 Clearing existing data...");
    try {
      await db.delete(countriesI18n);
      await db.delete(visaEligibilityI18n);
      await db.delete(visaTypesI18n);
      await db.delete(visaEligibility);
      await db.delete(visaTypes);
      await db.delete(countries);
      console.log("✅ Existing data cleared");
    } catch (error) {
      console.log(`⚠️ Error clearing data: ${error}`);
      console.log("ℹ️ Continuing with seeding...");
    }
  }

  console.log("📍 Inserting data...");
  console.log(`📊 Total countries to seed: ${allWorldCountries.length}`);

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
      const countryTranslations: NewCountryI18n[] =
        countryData.translations.map(t => ({
          countryId: insertedCountry.id,
          locale: t.locale,
          name: t.name,
          description: t.description,
        }));

      await db.insert(countriesI18n).values(countryTranslations);
      successCount++;

      if (successCount % 50 === 0) {
        console.log(
          `   ✅ Processed ${successCount}/${allWorldCountries.length} countries...`
        );
      }
    } catch (error) {
      errorCount++;
      console.error(`❌ Error inserting country ${countryData.code}:`, error);
    }
  }

  console.log(`✅ Countries seeding completed!`);
  console.log(`   • Successfully inserted: ${successCount} countries`);
  console.log(`   • Errors: ${errorCount} countries`);
  console.log(
    `   • Total translations: ${successCount * 8} (8 locales per country)`
  );

  if (showDetailedStats) {
    // Display summary by continent
    const continentSummary = allWorldCountries.reduce(
      (acc, country) => {
        acc[country.continent] = (acc[country.continent] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    console.log("\n📊 Summary by continent:");
    Object.entries(continentSummary).forEach(([continent, count]) => {
      console.log(`   • ${continent}: ${count} countries`);
    });

    console.log(
      "\n🎉 All countries have been successfully seeded with multilingual support!"
    );
    console.log("🌐 Supported locales: en, ar, es, fr, pt, ru, de, it");
  }

  return insertedCountries;
}

async function insertVisaTypesWithTranslations(
  db: ReturnType<typeof createDatabase>,
  insertedCountries: Record<string, number>
) {
  console.log("🛂 Inserting visa types...");
  const insertedVisaTypes: number[] = [];

  for (const { visaType, translations } of visaTypeDataWithTranslations) {
    const destinationId = insertedCountries[visaType.destinationCode];
    if (!destinationId) {
      console.warn(
        `⚠️ Destination ${visaType.destinationCode} not found, skipping visa type`
      );
      continue;
    }

    const visaTypeData: NewVisaType = {
      destinationId,
      type: visaType.type,
      duration: visaType.duration,
      processingTime: visaType.processingTime,
      fee: visaType.fee,
      currency: visaType.currency,
      requiresInterview: visaType.requiresInterview,
      isMultiEntry: visaType.isMultiEntry,
      requirements: visaType.requirements,
      documents: visaType.documents,
      isActive: visaType.isActive,
    };

    const [insertedVisaType] = await db
      .insert(visaTypes)
      .values(visaTypeData)
      .returning();
    insertedVisaTypes.push(insertedVisaType.id);

    // Insert visa type translations
    const visaTypeTranslations: NewVisaTypeI18n[] = translations.map(t => ({
      visaTypeId: insertedVisaType.id,
      locale: t.locale,
      name: t.name,
      description: t.description,
    }));

    await db.insert(visaTypesI18n).values(visaTypeTranslations);
  }

  console.log(
    `✅ Inserted ${insertedVisaTypes.length} visa types with translations`
  );
  return insertedVisaTypes;
}

async function insertVisaEligibilityWithTranslations(
  db: ReturnType<typeof createDatabase>,
  insertedCountries: Record<string, number>,
  insertedVisaTypes: number[]
) {
  console.log("📋 Inserting visa eligibility...");
  let eligibilityCount = 0;

  for (const {
    eligibility,
    translations,
  } of visaEligibilityDataWithTranslations) {
    const destinationId = insertedCountries[eligibility.destinationCode];
    const passportId = insertedCountries[eligibility.passportCode];
    const visaTypeId = insertedVisaTypes[eligibility.visaTypeIndex];

    if (!destinationId || !passportId || !visaTypeId) {
      console.warn(`⚠️ Missing IDs for eligibility rule, skipping`);
      continue;
    }

    const eligibilityData: NewVisaEligibility = {
      destinationId,
      passportId,
      visaTypeId,
      eligibilityStatus: eligibility.eligibilityStatus,
      maxStayDays: eligibility.maxStayDays,
      isActive: eligibility.isActive,
    };

    const [insertedEligibility] = await db
      .insert(visaEligibility)
      .values(eligibilityData)
      .returning();
    eligibilityCount++;

    // Insert eligibility translations
    const eligibilityTranslations: NewVisaEligibilityI18n[] = translations.map(
      t => ({
        visaEligibilityId: insertedEligibility.id,
        locale: t.locale,
        notes: t.notes,
      })
    );

    await db.insert(visaEligibilityI18n).values(eligibilityTranslations);
  }

  console.log(
    `✅ Inserted ${eligibilityCount} visa eligibility rules with translations`
  );
  return eligibilityCount;
}

async function seedCountries() {
  console.log("🌍 Starting comprehensive countries seeding...");

  try {
    const db = createDatabase();
    await insertCountriesWithRobustHandling(db, true, true);
  } catch (error) {
    console.error("❌ Error seeding countries:", error);
    throw error;
  }
}

async function seed() {
  console.log("🌱 Starting database seeding with i18n structure...");

  try {
    const db = createDatabase();

    // Insert countries using robust handler with clearing enabled
    const insertedCountries = await insertCountriesWithRobustHandling(db, true);

    // Insert visa types with translations
    const insertedVisaTypes = await insertVisaTypesWithTranslations(
      db,
      insertedCountries
    );

    // Insert visa eligibility with translations
    const eligibilityCount = await insertVisaEligibilityWithTranslations(
      db,
      insertedCountries,
      insertedVisaTypes
    );

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   • ${Object.keys(insertedCountries).length} countries`);
    console.log(`   • ${insertedVisaTypes.length} visa types`);
    console.log(`   • ${eligibilityCount} eligibility rules`);
    console.log(`   • All entries include multilingual translations`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Choose which seeding function to run based on command line arguments
const seedType = process.argv[2];

if (seedType === "countries") {
  seedCountries()
    .then(() => {
      console.log("✨ Countries seeding process finished");
      process.exit(0);
    })
    .catch(error => {
      console.error("💥 Countries seeding failed:", error);
      process.exit(1);
    });
} else {
  // Run the full seed function by default
  seed()
    .then(() => {
      console.log("✨ Seeding process finished");
      process.exit(0);
    })
    .catch(error => {
      console.error("💥 Seeding failed:", error);
      process.exit(1);
    });
}
