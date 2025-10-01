"use server";

import {
  countries,
  countriesI18n,
  getDb,
  eq,
  isNull,
  type NewCountry,
  type NewCountryI18n,
  type Country,
} from "@repo/database";
import { revalidatePath } from "next/cache";
import { handleActionError, type ActionResult } from "@/lib/errors";

interface CountryI18nData {
  locale: string;
  name: string;
  name_long?: string;
  about?: string;
}

interface CreateCountryInput {
  code: string;
  continent: string;
  region?: string;
  heroImage?: string;
  isActive?: boolean;
  i18n: CountryI18nData[];
}

interface UpdateCountryInput extends CreateCountryInput {
  originalCode: string;
}

export async function getCountries(): Promise<Country[]> {
  const db = getDb();
  const result = await db
    .select()
    .from(countries)
    .where(isNull(countries.deletedAt))
    .orderBy(countries.code);
  return result;
}

export async function getCountryWithI18n(code: string): Promise<{
  country: typeof countries.$inferSelect;
  i18n: (typeof countriesI18n.$inferSelect)[];
} | null> {
  const db = getDb();

  const [country] = await db
    .select()
    .from(countries)
    .where(eq(countries.code, code))
    .limit(1);

  if (!country) {
    return null;
  }

  const i18nData = await db
    .select()
    .from(countriesI18n)
    .where(eq(countriesI18n.countryCode, code));

  return {
    country,
    i18n: i18nData,
  };
}

export async function createCountry(
  input: CreateCountryInput
): Promise<ActionResult> {
  try {
    const db = getDb();

    const newCountry: NewCountry = {
      code: input.code.toUpperCase(),
      continent: input.continent,
      region: input.region ?? null,
      heroImage: input.heroImage ?? null,
      isActive: input.isActive ?? true,
    };

    await db.insert(countries).values(newCountry);

    if (input.i18n.length > 0) {
      const i18nRecords: NewCountryI18n[] = input.i18n.map(item => ({
        countryCode: input.code.toUpperCase(),
        locale: item.locale,
        name: item.name,
        name_long: item.name_long ?? null,
        about: item.about ?? null,
      }));

      await db.insert(countriesI18n).values(i18nRecords);
    }

    revalidatePath("/countries");
    return { success: true };
  } catch (error) {
    return handleActionError(error, "Failed to create country");
  }
}

export async function updateCountry(
  input: UpdateCountryInput
): Promise<ActionResult> {
  try {
    const db = getDb();

    await db
      .update(countries)
      .set({
        code: input.code.toUpperCase(),
        continent: input.continent,
        region: input.region ?? null,
        heroImage: input.heroImage ?? null,
        isActive: input.isActive ?? true,
        updatedAt: new Date(),
      })
      .where(eq(countries.code, input.originalCode));

    await db
      .delete(countriesI18n)
      .where(eq(countriesI18n.countryCode, input.originalCode));

    if (input.i18n.length > 0) {
      const i18nRecords: NewCountryI18n[] = input.i18n.map(item => ({
        countryCode: input.code.toUpperCase(),
        locale: item.locale,
        name: item.name,
        name_long: item.name_long ?? null,
        about: item.about ?? null,
      }));

      await db.insert(countriesI18n).values(i18nRecords);
    }

    revalidatePath("/countries");
    return { success: true };
  } catch (error) {
    return handleActionError(error, "Failed to update country");
  }
}

export async function deleteCountry(code: string): Promise<ActionResult> {
  try {
    const db = getDb();

    await db
      .update(countries)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(countries.code, code));

    revalidatePath("/countries");
    return { success: true };
  } catch (error) {
    return handleActionError(error, "Failed to delete country");
  }
}
