/**
 * Database seeding script for eVisa platform
 * This script populates the database with initial data for countries, visa types, and eligibility
 */
/* eslint-disable no-console */
import { createDrizzleLocal } from "../src/lib/db";
import {
  countries,
  visaTypes,
  visaEligibility,
  type NewCountry,
  type NewVisaType,
  type NewVisaEligibility,
} from "../src/lib/db/schema";

async function seed() {
  console.log("🌱 Starting database seeding...");

  try {
    const db = createDrizzleLocal();

    // Sample countries data
    const countryData: NewCountry[] = [
      {
        code: "USA",
        nameEn: "United States",
        nameAr: "الولايات المتحدة",
        nameEs: "Estados Unidos",
        nameFr: "États-Unis",
        descriptionEn: "United States of America",
        flag: "🇺🇸",
        continent: "North America",
        region: "Northern America",
        isActive: true,
      },
      {
        code: "ARE",
        nameEn: "United Arab Emirates",
        nameAr: "الإمارات العربية المتحدة",
        nameEs: "Emiratos Árabes Unidos",
        nameFr: "Émirats arabes unis",
        descriptionEn: "United Arab Emirates",
        flag: "🇦🇪",
        continent: "Asia",
        region: "Western Asia",
        isActive: true,
      },
      {
        code: "GBR",
        nameEn: "United Kingdom",
        nameAr: "المملكة المتحدة",
        nameEs: "Reino Unido",
        nameFr: "Royaume-Uni",
        descriptionEn: "United Kingdom of Great Britain and Northern Ireland",
        flag: "🇬🇧",
        continent: "Europe",
        region: "Northern Europe",
        isActive: true,
      },
      {
        code: "EGY",
        nameEn: "Egypt",
        nameAr: "مصر",
        nameEs: "Egipto",
        nameFr: "Égypte",
        descriptionEn: "Arab Republic of Egypt",
        flag: "🇪🇬",
        continent: "Africa",
        region: "Northern Africa",
        isActive: true,
      },
      {
        code: "JPN",
        nameEn: "Japan",
        nameAr: "اليابان",
        nameEs: "Japón",
        nameFr: "Japon",
        descriptionEn: "Japan",
        flag: "🇯🇵",
        continent: "Asia",
        region: "Eastern Asia",
        isActive: true,
      },
    ];

    console.log("📍 Inserting countries...");
    const insertedCountries = await db
      .insert(countries)
      .values(countryData)
      .returning();
    console.log(`✅ Inserted ${insertedCountries.length} countries`);

    // Sample visa types for UAE
    const uaeCountry = insertedCountries.find(c => c.code === "ARE");
    if (uaeCountry) {
      const visaTypeData: NewVisaType[] = [
        {
          destinationId: uaeCountry.id,
          type: "tourist",
          nameEn: "Tourist Visa",
          nameAr: "تأشيرة سياحية",
          nameEs: "Visa de Turista",
          descriptionEn: "Single entry tourist visa for UAE",
          duration: 30,
          maxStay: 30,
          processingTime: 3,
          fee: 100,
          currency: "USD",
          requiresInterview: false,
          isMultiEntry: false,
          requirements: JSON.stringify([
            "Valid passport",
            "Passport photos",
            "Flight itinerary",
            "Hotel booking",
          ]),
          documents: JSON.stringify([
            "passport_copy",
            "photos",
            "flight_booking",
            "hotel_reservation",
          ]),
          isActive: true,
        },
        {
          destinationId: uaeCountry.id,
          type: "business",
          nameEn: "Business Visa",
          nameAr: "تأشيرة عمل",
          nameEs: "Visa de Negocios",
          descriptionEn: "Business visa for UAE",
          duration: 90,
          maxStay: 90,
          processingTime: 5,
          fee: 200,
          currency: "USD",
          requiresInterview: false,
          isMultiEntry: true,
          requirements: JSON.stringify([
            "Valid passport",
            "Business invitation letter",
            "Company registration",
            "Bank statements",
          ]),
          documents: JSON.stringify([
            "passport_copy",
            "invitation_letter",
            "company_docs",
            "bank_statements",
          ]),
          isActive: true,
        },
      ];

      console.log("📋 Inserting visa types...");
      const insertedVisaTypes = await db
        .insert(visaTypes)
        .values(visaTypeData)
        .returning();
      console.log(`✅ Inserted ${insertedVisaTypes.length} visa types`);

      // Sample eligibility rules
      const eligibilityData: NewVisaEligibility[] = [];

      // Create eligibility rules for each passport-destination combination
      for (const passportCountry of insertedCountries) {
        for (const visaType of insertedVisaTypes) {
          let eligibilityStatus = "required";
          let maxStayDays = null;

          // Some sample rules
          if (
            passportCountry.code === "GBR" ||
            passportCountry.code === "USA"
          ) {
            eligibilityStatus = "visa_free";
            maxStayDays = 90;
          } else if (passportCountry.code === "JPN") {
            eligibilityStatus = "visa_free";
            maxStayDays = 90;
          } else if (passportCountry.code === "EGY") {
            eligibilityStatus = "on_arrival";
            maxStayDays = 30;
          }

          eligibilityData.push({
            destinationId: uaeCountry.id,
            passportId: passportCountry.id,
            visaTypeId: visaType.id,
            eligibilityStatus,
            maxStayDays,
            notesEn: `${eligibilityStatus} for ${passportCountry.nameEn} passport holders`,
            isActive: true,
          });
        }
      }

      console.log("🎫 Inserting visa eligibility rules...");
      const insertedEligibility = await db
        .insert(visaEligibility)
        .values(eligibilityData)
        .returning();
      console.log(
        `✅ Inserted ${insertedEligibility.length} eligibility rules`
      );
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed script
seed();
