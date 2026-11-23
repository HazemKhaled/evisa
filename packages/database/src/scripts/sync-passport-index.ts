import { isNull, sql } from "drizzle-orm";

import { getDb } from "../connection";
import { countries, visaEligibility, visaTypes } from "../schema";

export const PASSPORT_INDEX_CSV_URL =
  "https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso2.csv";

export const ELIGIBILITY_STATUSES = {
  VISA_FREE: "visa_free",
  ON_ARRIVAL: "on_arrival",
  ETA: "eta",
  REQUIRED: "required",
  NOT_ALLOWED: "not_allowed",
} as const;

type EligibilityStatusValue =
  (typeof ELIGIBILITY_STATUSES)[keyof typeof ELIGIBILITY_STATUSES];

export interface MappedRequirement {
  eligibilityStatus: EligibilityStatusValue;
  maxStayDays: number | null;
}

export interface ParsedEligibilityRow {
  passportCode: string;
  destinationCode: string;
  eligibilityStatus: EligibilityStatusValue;
  maxStayDays: number | null;
}

export interface ParsePassportIndexResult {
  rows: ParsedEligibilityRow[];
  totalDataRows: number;
  skippedSelf: number;
  skippedMalformed: number;
  skippedUnknownRequirement: number;
}

export interface ExistingEligibilityRecord {
  id: number;
  destinationCode: string;
  passportCode: string;
  visaTypeId: number;
  eligibilityStatus: string;
  maxStayDays: number | null;
  isActive: boolean;
  deletedAt: Date | null;
}

export interface EligibilityUpsertRecord {
  destinationCode: string;
  passportCode: string;
  visaTypeId: number;
  eligibilityStatus: EligibilityStatusValue;
  maxStayDays: number | null;
  lastUpdated: Date;
  updatedAt: Date;
  isActive: boolean;
  deletedAt: Date | null;
}

export interface DiffEligibilityParams {
  rows: readonly ParsedEligibilityRow[];
  validCountryCodes: ReadonlySet<string>;
  visaTypeIdByDestination: ReadonlyMap<string, number>;
  existingRows: readonly ExistingEligibilityRecord[];
  now?: Date;
}

export interface DiffEligibilityResult {
  toInsert: EligibilityUpsertRecord[];
  toUpdate: EligibilityUpsertRecord[];
  unchanged: number;
  skippedMissingCountry: number;
}

export interface VisaTypeRecord {
  id: number;
  destinationCode: string;
  type: string;
}

export interface SyncDatabaseStore {
  getActiveCountryCodes: () => Promise<string[]>;
  getActiveVisaTypes: () => Promise<VisaTypeRecord[]>;
  createDefaultTouristVisaTypes: (destinationCodes: string[]) => Promise<void>;
  getExistingEligibilities: () => Promise<ExistingEligibilityRecord[]>;
  upsertEligibilities: (
    records: EligibilityUpsertRecord[],
    batchSize: number
  ) => Promise<void>;
}

export interface SyncLogger {
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

export interface SyncPassportIndexOptions {
  csvUrl?: string;
  fetchFn?: typeof fetch;
  databaseUrl?: string;
  store?: SyncDatabaseStore;
  now?: Date;
  batchSize?: number;
  logger?: SyncLogger;
}

export interface SyncPassportIndexSummary {
  totalCsvRows: number;
  validPairs: number;
  inserted: number;
  updated: number;
  unchanged: number;
  skippedSelf: number;
  skippedMissingCountry: number;
  skippedMalformed: number;
  skippedUnknownRequirement: number;
}

const ISO2_REGEX = /^[A-Z]{2}$/;
const POSITIVE_INTEGER_REGEX = /^\d+$/;

/**
 * Map a raw Requirement string from `passport-index-tidy-iso2.csv` to
 * `visa_eligibility` schema fields (`eligibilityStatus` and `maxStayDays`).
 * Returns `null` for `-1` (where passport === destination) or unrecognized values.
 */
export function mapRequirement(
  rawRequirement: string
): MappedRequirement | null {
  const normalized = rawRequirement.trim().toLowerCase();

  if (!normalized || normalized === "-1") {
    return null;
  }

  if (POSITIVE_INTEGER_REGEX.test(normalized)) {
    const stayDays = Number.parseInt(normalized, 10);
    if (stayDays > 0) {
      return {
        eligibilityStatus: ELIGIBILITY_STATUSES.VISA_FREE,
        maxStayDays: stayDays,
      };
    }
    return null;
  }

  switch (normalized) {
    case "visa free":
    case "free movement":
      return {
        eligibilityStatus: ELIGIBILITY_STATUSES.VISA_FREE,
        maxStayDays: null,
      };
    case "visa on arrival":
      return {
        eligibilityStatus: ELIGIBILITY_STATUSES.ON_ARRIVAL,
        maxStayDays: null,
      };
    case "eta":
    case "e-visa":
      return {
        eligibilityStatus: ELIGIBILITY_STATUSES.ETA,
        maxStayDays: null,
      };
    case "visa required":
      return {
        eligibilityStatus: ELIGIBILITY_STATUSES.REQUIRED,
        maxStayDays: null,
      };
    case "covid ban":
    case "no admission":
    case "not allowed":
      return {
        eligibilityStatus: ELIGIBILITY_STATUSES.NOT_ALLOWED,
        maxStayDays: null,
      };
    default:
      return null;
  }
}

/**
 * Parse `passport-index-tidy-iso2.csv` content into normalized eligibility rows.
 */
export function parsePassportIndexCsv(
  csvContent: string
): ParsePassportIndexResult {
  const lines = csvContent
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length === 0) {
    throw new Error("Invalid or empty passport-index CSV payload");
  }

  const header = lines[0].toLowerCase();
  if (header !== "passport,destination,requirement") {
    throw new Error(
      `Invalid CSV header: expected "Passport,Destination,Requirement", received "${lines[0]}"`
    );
  }

  const dedupedRows = new Map<string, ParsedEligibilityRow>();
  let totalDataRows = 0;
  let skippedSelf = 0;
  let skippedMalformed = 0;
  let skippedUnknownRequirement = 0;

  for (let i = 1; i < lines.length; i++) {
    totalDataRows++;
    const parts = lines[i].split(",");
    if (parts.length < 3) {
      skippedMalformed++;
      continue;
    }

    const passportCode = parts[0].trim().toUpperCase();
    const destinationCode = parts[1].trim().toUpperCase();
    const rawRequirement = parts.slice(2).join(",").trim();

    if (!ISO2_REGEX.test(passportCode) || !ISO2_REGEX.test(destinationCode)) {
      skippedMalformed++;
      continue;
    }

    if (passportCode === destinationCode || rawRequirement === "-1") {
      skippedSelf++;
      continue;
    }

    const mapped = mapRequirement(rawRequirement);
    if (!mapped) {
      skippedUnknownRequirement++;
      continue;
    }

    const pairKey = `${destinationCode}:${passportCode}`;
    dedupedRows.set(pairKey, {
      passportCode,
      destinationCode,
      eligibilityStatus: mapped.eligibilityStatus,
      maxStayDays: mapped.maxStayDays,
    });
  }

  return {
    rows: Array.from(dedupedRows.values()),
    totalDataRows,
    skippedSelf,
    skippedMalformed,
    skippedUnknownRequirement,
  };
}

/**
 * Filter parsed CSV rows against existing `countries` codes and diff against
 * current `visa_eligibility` rows so `lastUpdated` only changes when eligibility
 * data actually changes or on newly inserted rows.
 */
export function diffEligibilityRows({
  rows,
  validCountryCodes,
  visaTypeIdByDestination,
  existingRows,
  now = new Date(),
}: DiffEligibilityParams): DiffEligibilityResult {
  const existingByKey = new Map<string, ExistingEligibilityRecord>();
  for (const record of existingRows) {
    const key = `${record.destinationCode}:${record.passportCode}:${record.visaTypeId}`;
    existingByKey.set(key, record);
  }

  const toInsert: EligibilityUpsertRecord[] = [];
  const toUpdate: EligibilityUpsertRecord[] = [];
  let unchanged = 0;
  let skippedMissingCountry = 0;

  for (const row of rows) {
    if (
      !validCountryCodes.has(row.passportCode) ||
      !validCountryCodes.has(row.destinationCode)
    ) {
      skippedMissingCountry++;
      continue;
    }

    const visaTypeId = visaTypeIdByDestination.get(row.destinationCode);
    if (!visaTypeId) {
      skippedMissingCountry++;
      continue;
    }

    const key = `${row.destinationCode}:${row.passportCode}:${visaTypeId}`;
    const existing = existingByKey.get(key);

    if (!existing) {
      toInsert.push({
        destinationCode: row.destinationCode,
        passportCode: row.passportCode,
        visaTypeId,
        eligibilityStatus: row.eligibilityStatus,
        maxStayDays: row.maxStayDays,
        lastUpdated: now,
        updatedAt: now,
        isActive: true,
        deletedAt: null,
      });
      continue;
    }

    const existingMaxStay = existing.maxStayDays ?? null;
    const hasChanged =
      existing.eligibilityStatus !== row.eligibilityStatus ||
      existingMaxStay !== row.maxStayDays ||
      !existing.isActive ||
      existing.deletedAt !== null;

    if (hasChanged) {
      toUpdate.push({
        destinationCode: row.destinationCode,
        passportCode: row.passportCode,
        visaTypeId,
        eligibilityStatus: row.eligibilityStatus,
        maxStayDays: row.maxStayDays,
        lastUpdated: now,
        updatedAt: now,
        isActive: true,
        deletedAt: null,
      });
    } else {
      unchanged++;
    }
  }

  return {
    toInsert,
    toUpdate,
    unchanged,
    skippedMissingCountry,
  };
}

/**
 * Create a Neon Drizzle-backed store for `syncPassportIndex`.
 */
export function createNeonSyncStore(databaseUrl?: string): SyncDatabaseStore {
  const resolvedUrl = databaseUrl ?? process.env.DATABASE_URL;
  if (!resolvedUrl) {
    throw new Error(
      "DATABASE_URL is not set. Please configure your Neon database connection."
    );
  }

  // Delegate to the shared singleton connection (reads DATABASE_URL internally)
  // so this script uses the same pooled client and real schema as the rest
  // of the codebase instead of opening a bespoke connection.
  const db = getDb();

  return {
    async getActiveCountryCodes(): Promise<string[]> {
      const rows = await db
        .select({ code: countries.code })
        .from(countries)
        .where(isNull(countries.deletedAt));
      return rows.map(r => r.code.trim().toUpperCase());
    },

    async getActiveVisaTypes(): Promise<VisaTypeRecord[]> {
      return db
        .select({
          id: visaTypes.id,
          destinationCode: visaTypes.destinationCode,
          type: visaTypes.type,
        })
        .from(visaTypes)
        .where(isNull(visaTypes.deletedAt));
    },

    async createDefaultTouristVisaTypes(
      destinationCodes: string[]
    ): Promise<void> {
      if (destinationCodes.length === 0) {
        return;
      }

      const values = destinationCodes.map(destinationCode => ({
        destinationCode,
        type: "tourist",
        duration: 90,
        maxStay: 90,
        processingTime: 5,
        fee: 0,
        currency: "USD",
        requiresInterview: false,
        isMultiEntry: false,
        isActive: true,
      }));

      await db
        .insert(visaTypes)
        .values(values)
        .onConflictDoNothing({
          target: [visaTypes.destinationCode, visaTypes.type],
        });
    },

    async getExistingEligibilities(): Promise<ExistingEligibilityRecord[]> {
      return db
        .select({
          id: visaEligibility.id,
          destinationCode: visaEligibility.destinationCode,
          passportCode: visaEligibility.passportCode,
          visaTypeId: visaEligibility.visaTypeId,
          eligibilityStatus: visaEligibility.eligibilityStatus,
          maxStayDays: visaEligibility.maxStayDays,
          isActive: visaEligibility.isActive,
          deletedAt: visaEligibility.deletedAt,
        })
        .from(visaEligibility);
    },

    async upsertEligibilities(
      records: EligibilityUpsertRecord[],
      batchSize: number
    ): Promise<void> {
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        await db
          .insert(visaEligibility)
          .values(batch)
          .onConflictDoUpdate({
            target: [
              visaEligibility.destinationCode,
              visaEligibility.passportCode,
              visaEligibility.visaTypeId,
            ],
            set: {
              eligibilityStatus: sql`excluded.eligibility_status`,
              maxStayDays: sql`excluded.max_stay_days`,
              lastUpdated: sql`excluded.last_updated`,
              updatedAt: sql`excluded.updated_at`,
              isActive: true,
              deletedAt: null,
            },
          });
      }
    },
  };
}

function buildDestinationVisaTypeMap(
  visaTypes: readonly VisaTypeRecord[]
): Map<string, number> {
  const map = new Map<string, number>();
  for (const vt of visaTypes) {
    const dest = vt.destinationCode.trim().toUpperCase();
    if (!map.has(dest) || vt.type.toLowerCase() === "tourist") {
      map.set(dest, vt.id);
    }
  }
  return map;
}

/**
 * Fetch `passport-index-tidy-iso2.csv`, diff against existing `visa_eligibility`
 * rows for countries present in `countries`, and idempotently upsert changes.
 */
export async function syncPassportIndex(
  options: SyncPassportIndexOptions = {}
): Promise<SyncPassportIndexSummary> {
  const {
    csvUrl = PASSPORT_INDEX_CSV_URL,
    fetchFn = globalThis.fetch,
    databaseUrl,
    store = createNeonSyncStore(databaseUrl),
    now = new Date(),
    batchSize = 500,
    logger = console,
  } = options;

  logger.info(`Fetching passport index dataset from ${csvUrl}...`);
  const response = await fetchFn(csvUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch passport-index dataset (${response.status} ${response.statusText})`
    );
  }

  const csvText = await response.text();
  const parsed = parsePassportIndexCsv(csvText);

  const countryCodes = await store.getActiveCountryCodes();
  const validCountryCodes = new Set(countryCodes);

  let visaTypes = await store.getActiveVisaTypes();
  let visaTypeIdByDestination = buildDestinationVisaTypeMap(visaTypes);

  const missingVisaTypeDestinations = countryCodes.filter(
    code => !visaTypeIdByDestination.has(code)
  );
  if (missingVisaTypeDestinations.length > 0) {
    await store.createDefaultTouristVisaTypes(missingVisaTypeDestinations);
    visaTypes = await store.getActiveVisaTypes();
    visaTypeIdByDestination = buildDestinationVisaTypeMap(visaTypes);
  }

  const existingRows = await store.getExistingEligibilities();

  const diff = diffEligibilityRows({
    rows: parsed.rows,
    validCountryCodes,
    visaTypeIdByDestination,
    existingRows,
    now,
  });

  const changedRecords = [...diff.toInsert, ...diff.toUpdate];
  if (changedRecords.length > 0) {
    await store.upsertEligibilities(changedRecords, batchSize);
  }

  const summary: SyncPassportIndexSummary = {
    totalCsvRows: parsed.totalDataRows,
    validPairs: diff.toInsert.length + diff.toUpdate.length + diff.unchanged,
    inserted: diff.toInsert.length,
    updated: diff.toUpdate.length,
    unchanged: diff.unchanged,
    skippedSelf: parsed.skippedSelf,
    skippedMissingCountry: diff.skippedMissingCountry,
    skippedMalformed: parsed.skippedMalformed,
    skippedUnknownRequirement: parsed.skippedUnknownRequirement,
  };

  logger.info(
    `Passport index sync complete: inserted=${summary.inserted}, updated=${summary.updated}, unchanged=${summary.unchanged}, skippedSelf=${summary.skippedSelf}, skippedMissingCountry=${summary.skippedMissingCountry}`
  );

  return summary;
}

function isDirectExecution(): boolean {
  const entryScript = process.argv[1];
  if (!entryScript) {
    return false;
  }
  return (
    entryScript.endsWith("sync-passport-index.ts") ||
    entryScript.endsWith("sync-passport-index.js")
  );
}

if (isDirectExecution()) {
  syncPassportIndex()
    .then(summary => {
      console.info("Sync summary:", JSON.stringify(summary, null, 2));
    })
    .catch((error: unknown) => {
      console.error("Failed to sync passport index dataset:", error);
      process.exitCode = 1;
    });
}
