"use server";

import { requireAdminAuth } from "@repo/auth/server";
import {
  and,
  count,
  eq,
  getDb,
  inArray,
  isNull,
  like,
  type NewVisaEligibility,
  type NewVisaEligibilityI18n,
  or,
  type VisaEligibility,
  visaEligibility,
  visaEligibilityI18n,
} from "@repo/database";
import { type PaginatedResult } from "@repo/utils";
import { revalidatePath } from "next/cache";

import { type ActionResult, handleActionError } from "@/lib/errors";

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

interface GetEligibilityPaginatedInput {
  page?: number;
  pageSize?: number;
  search?: string;
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

export async function getEligibilityPaginated(
  input: GetEligibilityPaginatedInput = {}
): Promise<PaginatedResult<VisaEligibility>> {
  const { page = 1, pageSize = 10, search = "" } = input;
  const db = getDb();
  const offset = (page - 1) * pageSize;

  const whereConditions = search
    ? and(
        isNull(visaEligibility.deletedAt),
        or(
          like(visaEligibility.destinationCode, `%${search.toUpperCase()}%`),
          like(visaEligibility.passportCode, `%${search.toUpperCase()}%`),
          like(visaEligibility.eligibilityStatus, `%${search}%`)
        )
      )
    : isNull(visaEligibility.deletedAt);

  const [{ count: totalCount }] = await db
    .select({ count: count() })
    .from(visaEligibility)
    .where(whereConditions);

  const result = await db
    .select()
    .from(visaEligibility)
    .where(whereConditions)
    .orderBy(visaEligibility.destinationCode, visaEligibility.passportCode)
    .limit(pageSize)
    .offset(offset);

  return {
    data: result,
    total: Number(totalCount),
    page,
    pageSize,
    totalPages: Math.ceil(Number(totalCount) / pageSize),
  };
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
): Promise<ActionResult> {
  const authCheck = await requireAdminAuth();
  if (!authCheck.success) {
    return authCheck;
  }

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
    return handleActionError(error, "Failed to create eligibility rule");
  }
}

export async function bulkCreateEligibility(
  input: BulkCreateInput
): Promise<ActionResult & { created?: number }> {
  const authCheck = await requireAdminAuth();
  if (!authCheck.success) {
    return { ...authCheck, created: 0 };
  }

  const db = getDb();

  try {
    const records: NewVisaEligibility[] = input.passportCodes.map(
      passportCode => ({
        destinationCode: input.destinationCode.toUpperCase(),
        passportCode: passportCode.toUpperCase(),
        visaTypeId: input.visaTypeId,
        eligibilityStatus: input.eligibilityStatus,
        maxStayDays: input.maxStayDays ?? null,
        isActive: input.isActive ?? true,
      })
    );

    await db.insert(visaEligibility).values(records);

    revalidatePath("/eligibility");
    return { success: true, created: records.length };
  } catch (error) {
    const result = handleActionError(
      error,
      "Failed to create eligibility records"
    );
    return { ...result, created: 0 };
  }
}

export async function updateEligibility(
  input: UpdateEligibilityInput
): Promise<ActionResult> {
  const authCheck = await requireAdminAuth();
  if (!authCheck.success) {
    return authCheck;
  }

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
    return handleActionError(error, "Failed to update eligibility rule");
  }
}

export async function deleteEligibility(id: number): Promise<ActionResult> {
  const authCheck = await requireAdminAuth();
  if (!authCheck.success) {
    return authCheck;
  }

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
    return handleActionError(error, "Failed to delete eligibility rule");
  }
}

export async function bulkDeleteEligibility(
  ids: number[]
): Promise<ActionResult> {
  const authCheck = await requireAdminAuth();
  if (!authCheck.success) {
    return authCheck;
  }

  const db = getDb();

  try {
    await db
      .update(visaEligibility)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(inArray(visaEligibility.id, ids));

    revalidatePath("/eligibility");
    return { success: true };
  } catch (error) {
    return handleActionError(error, "Failed to delete eligibility records");
  }
}
