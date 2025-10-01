-- Migration: Convert countries table to use code as primary key
-- This migration is complex and requires careful ordering of operations

-- Step 1: Add the new foreign key columns
ALTER TABLE "visa_types" ADD COLUMN "destination_code" text;
ALTER TABLE "visa_eligibility" ADD COLUMN "destination_code" text;
ALTER TABLE "visa_eligibility" ADD COLUMN "passport_code" text;
ALTER TABLE "countries_i18n" ADD COLUMN "country_code" text;

-- Step 2: Populate the new columns with data from existing relationships
UPDATE "visa_types"
SET "destination_code" = (SELECT "code" FROM "countries" WHERE "countries"."id" = "visa_types"."destination_id");

UPDATE "visa_eligibility"
SET "destination_code" = (SELECT "code" FROM "countries" WHERE "countries"."id" = "visa_eligibility"."destination_id");

UPDATE "visa_eligibility"
SET "passport_code" = (SELECT "code" FROM "countries" WHERE "countries"."id" = "visa_eligibility"."passport_id");

UPDATE "countries_i18n"
SET "country_code" = (SELECT "code" FROM "countries" WHERE "countries"."id" = "countries_i18n"."country_id");

-- Step 3: Make new columns NOT NULL after they're populated
ALTER TABLE "visa_types" ALTER COLUMN "destination_code" SET NOT NULL;
ALTER TABLE "visa_eligibility" ALTER COLUMN "destination_code" SET NOT NULL;
ALTER TABLE "visa_eligibility" ALTER COLUMN "passport_code" SET NOT NULL;
ALTER TABLE "countries_i18n" ALTER COLUMN "country_code" SET NOT NULL;

-- Step 4: Drop existing foreign key constraints and indexes
ALTER TABLE "visa_types" DROP CONSTRAINT IF EXISTS "visa_types_destination_id_countries_id_fk";
ALTER TABLE "visa_eligibility" DROP CONSTRAINT IF EXISTS "visa_eligibility_destination_id_countries_id_fk";
ALTER TABLE "visa_eligibility" DROP CONSTRAINT IF EXISTS "visa_eligibility_passport_id_countries_id_fk";
ALTER TABLE "countries_i18n" DROP CONSTRAINT IF EXISTS "countries_i18n_country_id_countries_id_fk";

-- Step 5: Drop the unique constraints that reference the old columns
ALTER TABLE "visa_types" DROP CONSTRAINT IF EXISTS "visa_types_destination_id_type_unique";
ALTER TABLE "visa_eligibility" DROP CONSTRAINT IF EXISTS "visa_eligibility_destination_id_passport_id_visa_type_id_unique";
ALTER TABLE "countries_i18n" DROP CONSTRAINT IF EXISTS "countries_i18n_country_id_locale_unique";

-- Step 6: Drop the old foreign key columns
ALTER TABLE "visa_types" DROP COLUMN "destination_id";
ALTER TABLE "visa_eligibility" DROP COLUMN "destination_id";
ALTER TABLE "visa_eligibility" DROP COLUMN "passport_id";
ALTER TABLE "countries_i18n" DROP COLUMN "country_id";

-- Step 7: Drop the old primary key and unique constraint on countries
ALTER TABLE "countries" DROP CONSTRAINT IF EXISTS "countries_pkey";
ALTER TABLE "countries" DROP CONSTRAINT IF EXISTS "countries_code_unique";

-- Step 8: Drop the old id column from countries
ALTER TABLE "countries" DROP COLUMN "id";

-- Step 9: Add the new primary key constraint on code
ALTER TABLE "countries" ADD CONSTRAINT "countries_pkey" PRIMARY KEY ("code");

-- Step 10: Add new foreign key constraints
ALTER TABLE "visa_types" ADD CONSTRAINT "visa_types_destination_code_countries_code_fk" FOREIGN KEY ("destination_code") REFERENCES "countries"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "visa_eligibility" ADD CONSTRAINT "visa_eligibility_destination_code_countries_code_fk" FOREIGN KEY ("destination_code") REFERENCES "countries"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "visa_eligibility" ADD CONSTRAINT "visa_eligibility_passport_code_countries_code_fk" FOREIGN KEY ("passport_code") REFERENCES "countries"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "countries_i18n" ADD CONSTRAINT "countries_i18n_country_code_countries_code_fk" FOREIGN KEY ("country_code") REFERENCES "countries"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Step 11: Recreate unique constraints with new column names
ALTER TABLE "visa_types" ADD CONSTRAINT "visa_types_destination_code_type_unique" UNIQUE("destination_code","type");
ALTER TABLE "visa_eligibility" ADD CONSTRAINT "visa_eligibility_destination_code_passport_code_visa_type_id_unique" UNIQUE("destination_code","passport_code","visa_type_id");
ALTER TABLE "countries_i18n" ADD CONSTRAINT "countries_i18n_country_code_locale_unique" UNIQUE("country_code","locale");