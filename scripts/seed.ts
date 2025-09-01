/**
 * Database seeding script for GetTravelVisa.com platform with i18n structure
 * This script populates the database with initial data for countries, visa types, and eligibility
 * using the new normalized i18n table structure
 */
/* eslint-disable no-console */
import { createDrizzleLocal } from "../src/lib/db";
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

// Country data with translations
const countryDataWithTranslations = [
  {
    country: {
      code: "USA",
      continent: "North America",
      region: "Northern America",
      isActive: true,
    },
    translations: [
      {
        locale: "en",
        name: "United States",
        description: "United States of America",
      },
      {
        locale: "ar",
        name: "الولايات المتحدة",
        description: "الولايات المتحدة الأمريكية",
      },
      {
        locale: "es",
        name: "Estados Unidos",
        description: "Estados Unidos de América",
      },
      {
        locale: "fr",
        name: "États-Unis",
        description: "États-Unis d'Amérique",
      },
    ],
  },
  {
    country: {
      code: "ARE",
      continent: "Asia",
      region: "Western Asia",
      isActive: true,
    },
    translations: [
      {
        locale: "en",
        name: "United Arab Emirates",
        description: "United Arab Emirates",
      },
      {
        locale: "ar",
        name: "الإمارات العربية المتحدة",
        description: "دولة الإمارات العربية المتحدة",
      },
      {
        locale: "es",
        name: "Emiratos Árabes Unidos",
        description: "Emiratos Árabes Unidos",
      },
      {
        locale: "fr",
        name: "Émirats arabes unis",
        description: "Émirats arabes unis",
      },
    ],
  },
  {
    country: {
      code: "GBR",
      continent: "Europe",
      region: "Northern Europe",
      isActive: true,
    },
    translations: [
      {
        locale: "en",
        name: "United Kingdom",
        description: "United Kingdom of Great Britain and Northern Ireland",
      },
      {
        locale: "ar",
        name: "المملكة المتحدة",
        description: "المملكة المتحدة لبريطانيا العظمى وأيرلندا الشمالية",
      },
      {
        locale: "es",
        name: "Reino Unido",
        description: "Reino Unido de Gran Bretaña e Irlanda del Norte",
      },
      {
        locale: "fr",
        name: "Royaume-Uni",
        description: "Royaume-Uni de Grande-Bretagne et d'Irlande du Nord",
      },
    ],
  },
  {
    country: {
      code: "DEU",
      continent: "Europe",
      region: "Western Europe",
      isActive: true,
    },
    translations: [
      {
        locale: "en",
        name: "Germany",
        description: "Federal Republic of Germany",
      },
      {
        locale: "ar",
        name: "ألمانيا",
        description: "جمهورية ألمانيا الاتحادية",
      },
      {
        locale: "es",
        name: "Alemania",
        description: "República Federal de Alemania",
      },
      {
        locale: "fr",
        name: "Allemagne",
        description: "République fédérale d'Allemagne",
      },
    ],
  },
  {
    country: {
      code: "JPN",
      continent: "Asia",
      region: "Eastern Asia",
      isActive: true,
    },
    translations: [
      { locale: "en", name: "Japan", description: "Japan" },
      { locale: "ar", name: "اليابان", description: "اليابان" },
      { locale: "es", name: "Japón", description: "Japón" },
      { locale: "fr", name: "Japon", description: "Japon" },
    ],
  },
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

async function seed() {
  console.log("🌱 Starting database seeding with i18n structure...");

  try {
    const db = createDrizzleLocal();

    // Insert countries
    console.log("📍 Inserting countries...");
    const insertedCountries: Record<string, number> = {};

    for (const { country, translations } of countryDataWithTranslations) {
      const [insertedCountry] = await db
        .insert(countries)
        .values(country)
        .returning();
      insertedCountries[country.code] = insertedCountry.id;

      // Insert country translations
      const countryTranslations: NewCountryI18n[] = translations.map(t => ({
        countryId: insertedCountry.id,
        locale: t.locale,
        name: t.name,
        description: t.description,
      }));

      await db.insert(countriesI18n).values(countryTranslations);
    }

    console.log(
      `✅ Inserted ${Object.keys(insertedCountries).length} countries with translations`
    );

    // Insert visa types
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

    // Insert visa eligibility
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
      const eligibilityTranslations: NewVisaEligibilityI18n[] =
        translations.map(t => ({
          visaEligibilityId: insertedEligibility.id,
          locale: t.locale,
          notes: t.notes,
        }));

      await db.insert(visaEligibilityI18n).values(eligibilityTranslations);
    }

    console.log(
      `✅ Inserted ${eligibilityCount} visa eligibility rules with translations`
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

// Run the seed function
seed()
  .then(() => {
    console.log("✨ Seeding process finished");
    process.exit(0);
  })
  .catch(error => {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  });
