"use server";

import {
  and,
  count,
  eq,
  getDb,
  isNull,
  like,
  type NewVisaType,
  type NewVisaTypeI18n,
  or,
  type VisaType,
  visaTypes,
  visaTypesI18n,
} from "@repo/database";
import { revalidatePath } from "next/cache";

interface VisaTypeI18nData {
  locale: string;
  name: string;
  description?: string;
}

interface CreateVisaTypeInput {
  destinationCode: string;
  type: string;
  duration: number;
  maxStay?: number;
  processingTime: number;
  fee: number;
  currency?: string;
  requiresInterview?: boolean;
  isMultiEntry?: boolean;
  requirements?: string[];
  documents?: string[];
  isActive?: boolean;
  i18n: VisaTypeI18nData[];
}

interface UpdateVisaTypeInput extends CreateVisaTypeInput {
  id: number;
}

export async function getVisaTypes(): Promise<VisaType[]> {
  const db = getDb();
  const result = await db
    .select()
    .from(visaTypes)
    .where(isNull(visaTypes.deletedAt))
    .orderBy(visaTypes.destinationCode, visaTypes.type);
  return result;
}

interface GetVisaTypesPaginatedInput {
  page?: number;
  pageSize?: number;
  search?: string;
}

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getVisaTypesPaginated(
  input: GetVisaTypesPaginatedInput = {}
): Promise<PaginatedResult<VisaType>> {
  const { page = 1, pageSize = 10, search = "" } = input;
  const db = getDb();
  const offset = (page - 1) * pageSize;

  // Build query with search
  const whereConditions = search
    ? and(
        isNull(visaTypes.deletedAt),
        or(
          like(visaTypes.destinationCode, `%${search.toUpperCase()}%`),
          like(visaTypes.type, `%${search}%`),
          like(visaTypes.currency, `%${search.toUpperCase()}%`)
        )
      )
    : isNull(visaTypes.deletedAt);

  // Get total count
  const [{ count: totalCount }] = await db
    .select({ count: count() })
    .from(visaTypes)
    .where(whereConditions);

  // Get paginated data
  const result = await db
    .select()
    .from(visaTypes)
    .where(whereConditions)
    .orderBy(visaTypes.destinationCode, visaTypes.type)
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

export async function getVisaTypeWithI18n(id: number): Promise<{
  visaType: typeof visaTypes.$inferSelect;
  i18n: (typeof visaTypesI18n.$inferSelect)[];
} | null> {
  const db = getDb();

  const [visaType] = await db
    .select()
    .from(visaTypes)
    .where(eq(visaTypes.id, id))
    .limit(1);

  if (!visaType) {
    return null;
  }

  const i18nData = await db
    .select()
    .from(visaTypesI18n)
    .where(eq(visaTypesI18n.visaTypeId, id));

  return {
    visaType,
    i18n: i18nData,
  };
}

export async function createVisaType(
  input: CreateVisaTypeInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = getDb();

    const newVisaType: NewVisaType = {
      destinationCode: input.destinationCode.toUpperCase(),
      type: input.type,
      duration: input.duration,
      maxStay: input.maxStay ?? null,
      processingTime: input.processingTime,
      fee: input.fee,
      currency: input.currency ?? "USD",
      requiresInterview: input.requiresInterview ?? false,
      isMultiEntry: input.isMultiEntry ?? false,
      requirements: input.requirements ?? null,
      documents: input.documents ?? null,
      isActive: input.isActive ?? true,
    };

    const [created] = await db
      .insert(visaTypes)
      .values(newVisaType)
      .returning({ id: visaTypes.id });

    if (!created) {
      throw new Error("Failed to create visa type");
    }

    if (input.i18n.length > 0) {
      const i18nRecords: NewVisaTypeI18n[] = input.i18n.map(item => ({
        visaTypeId: created.id,
        locale: item.locale,
        name: item.name,
        description: item.description ?? null,
      }));

      await db.insert(visaTypesI18n).values(i18nRecords);
    }

    revalidatePath("/visa-types");
    return { success: true };
  } catch (error) {
    console.error("Failed to create visa type:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create visa type",
    };
  }
}

export async function updateVisaType(
  input: UpdateVisaTypeInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = getDb();

    await db
      .update(visaTypes)
      .set({
        destinationCode: input.destinationCode.toUpperCase(),
        type: input.type,
        duration: input.duration,
        maxStay: input.maxStay ?? null,
        processingTime: input.processingTime,
        fee: input.fee,
        currency: input.currency ?? "USD",
        requiresInterview: input.requiresInterview ?? false,
        isMultiEntry: input.isMultiEntry ?? false,
        requirements: input.requirements ?? null,
        documents: input.documents ?? null,
        isActive: input.isActive ?? true,
        updatedAt: new Date(),
      })
      .where(eq(visaTypes.id, input.id));

    await db
      .delete(visaTypesI18n)
      .where(eq(visaTypesI18n.visaTypeId, input.id));

    if (input.i18n.length > 0) {
      const i18nRecords: NewVisaTypeI18n[] = input.i18n.map(item => ({
        visaTypeId: input.id,
        locale: item.locale,
        name: item.name,
        description: item.description ?? null,
      }));

      await db.insert(visaTypesI18n).values(i18nRecords);
    }

    revalidatePath("/visa-types");
    return { success: true };
  } catch (error) {
    console.error("Failed to update visa type:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update visa type",
    };
  }
}

export async function deleteVisaType(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = getDb();

    await db
      .update(visaTypes)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(visaTypes.id, id));

    revalidatePath("/visa-types");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete visa type:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete visa type",
    };
  }
}
