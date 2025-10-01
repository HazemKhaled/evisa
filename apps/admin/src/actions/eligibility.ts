"use server";

import {
  visaEligibility,
  visaEligibilityI18n,
  getDb,
  eq,
  isNull,
  type NewVisaEligibility,
  type NewVisaEligibilityI18n,
  type VisaEligibility,
} from "@repo/database";
import { revalidatePath } from "next/cache";

interface EligibilityI18nData {
  locale: string;
  notes?: string;
}

interface CreateEligibilityInput {
  destinationCode: string;
  passportCode: string;
  visaTypeId: number;
  eligibilityStatus: string;
  maxStayDays?: number;
  isActive?: boolean;
  i18n: EligibilityI18nData[];
}

interface UpdateEligibilityInput extends CreateEligibilityInput {
  id: number;
}

interface BulkCreateInput {
  destinationCode: string;
  passportCodes: string[];
  visaTypeId: number;
  eligibilityStatus: string;
  maxStayDays?: number;
  isActive?: boolean;
}

export async function getEligibilityRules(): Promise<VisaEligibility[]> {
  const db = getDb();
  const result = await db
    .select()
    .from(visaEligibility)
    .where(isNull(visaEligibility.deletedAt))
    .orderBy(visaEligibility.destinationCode, visaEligibility.passportCode);

  return result;
}

export async function getEligibilityWithI18n(id: number): Promise<{
  eligibility: typeof visaEligibility.$inferSelect;
  i18n: (typeof visaEligibilityI18n.$inferSelect)[];
} | null> {
  const db = getDb();

  const [eligibilityRule] = await db
    .select()
    .from(visaEligibility)
    .where(eq(visaEligibility.id, id))
    .limit(1);

  if (!eligibilityRule) {
    return null;
  }

  const i18nData = await db
    .select()
    .from(visaEligibilityI18n)
    .where(eq(visaEligibilityI18n.visaEligibilityId, id));

  return {
    eligibility: eligibilityRule,
    i18n: i18nData,
  };
}

export async function createEligibility(
  input: CreateEligibilityInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = getDb();

    const newEligibility: NewVisaEligibility = {
      destinationCode: input.destinationCode.toUpperCase(),
      passportCode: input.passportCode.toUpperCase(),
      visaTypeId: input.visaTypeId,
      eligibilityStatus: input.eligibilityStatus,
      maxStayDays: input.maxStayDays ?? null,
      isActive: input.isActive ?? true,
    };

    const [created] = await db
      .insert(visaEligibility)
      .values(newEligibility)
      .returning({ id: visaEligibility.id });

    if (!created) {
      throw new Error("Failed to create eligibility rule");
    }

    if (input.i18n.length > 0) {
      const i18nRecords: NewVisaEligibilityI18n[] = input.i18n.map(item => ({
        visaEligibilityId: created.id,
        locale: item.locale,
        notes: item.notes ?? null,
      }));

      await db.insert(visaEligibilityI18n).values(i18nRecords);
    }

    revalidatePath("/eligibility");
    return { success: true };
  } catch (error) {
    console.error("Failed to create eligibility:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create eligibility rule",
    };
  }
}

export async function bulkCreateEligibility(
  input: BulkCreateInput
): Promise<{ success: boolean; created: number; errors: string[] }> {
  const db = getDb();
  let created = 0;
  const errors: string[] = [];

  try {
    for (const passportCode of input.passportCodes) {
      try {
        const newEligibility: NewVisaEligibility = {
          destinationCode: input.destinationCode.toUpperCase(),
          passportCode: passportCode.toUpperCase(),
          visaTypeId: input.visaTypeId,
          eligibilityStatus: input.eligibilityStatus,
          maxStayDays: input.maxStayDays ?? null,
          isActive: input.isActive ?? true,
        };

        await db.insert(visaEligibility).values(newEligibility);
        created++;
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Failed to create rule";
        errors.push(`${passportCode}: ${errorMsg}`);
      }
    }

    revalidatePath("/eligibility");
    return { success: created > 0, created, errors };
  } catch (error) {
    console.error("Bulk create failed:", error);
    return {
      success: false,
      created,
      errors: [
        error instanceof Error ? error.message : "Bulk operation failed",
      ],
    };
  }
}

export async function updateEligibility(
  input: UpdateEligibilityInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = getDb();

    await db
      .update(visaEligibility)
      .set({
        destinationCode: input.destinationCode.toUpperCase(),
        passportCode: input.passportCode.toUpperCase(),
        visaTypeId: input.visaTypeId,
        eligibilityStatus: input.eligibilityStatus,
        maxStayDays: input.maxStayDays ?? null,
        isActive: input.isActive ?? true,
        lastUpdated: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(visaEligibility.id, input.id));

    await db
      .delete(visaEligibilityI18n)
      .where(eq(visaEligibilityI18n.visaEligibilityId, input.id));

    if (input.i18n.length > 0) {
      const i18nRecords: NewVisaEligibilityI18n[] = input.i18n.map(item => ({
        visaEligibilityId: input.id,
        locale: item.locale,
        notes: item.notes ?? null,
      }));

      await db.insert(visaEligibilityI18n).values(i18nRecords);
    }

    revalidatePath("/eligibility");
    return { success: true };
  } catch (error) {
    console.error("Failed to update eligibility:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update eligibility rule",
    };
  }
}

export async function deleteEligibility(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = getDb();

    await db
      .update(visaEligibility)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(visaEligibility.id, id));

    revalidatePath("/eligibility");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete eligibility:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete eligibility rule",
    };
  }
}

export async function bulkDeleteEligibility(
  ids: number[]
): Promise<{ success: boolean; deleted: number; errors: string[] }> {
  const db = getDb();
  let deleted = 0;
  const errors: string[] = [];

  try {
    for (const id of ids) {
      try {
        await db
          .update(visaEligibility)
          .set({
            deletedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(visaEligibility.id, id));
        deleted++;
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error.message : "Failed to delete";
        errors.push(`ID ${id}: ${errorMsg}`);
      }
    }

    revalidatePath("/eligibility");
    return { success: deleted > 0, deleted, errors };
  } catch (error) {
    console.error("Bulk delete failed:", error);
    return {
      success: false,
      deleted,
      errors: [
        error instanceof Error ? error.message : "Bulk operation failed",
      ],
    };
  }
}
