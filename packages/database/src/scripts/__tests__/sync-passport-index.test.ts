import {
  createNeonSyncStore,
  diffEligibilityRows,
  type ExistingEligibilityRecord,
  mapRequirement,
  parsePassportIndexCsv,
  PASSPORT_INDEX_CSV_URL,
  type SyncDatabaseStore,
  syncPassportIndex,
} from "../sync-passport-index";

describe("sync-passport-index", () => {
  describe("mapRequirement", () => {
    it("maps 'visa free' and 'free movement' to visa_free with null maxStayDays", () => {
      expect(mapRequirement("visa free")).toEqual({
        eligibilityStatus: "visa_free",
        maxStayDays: null,
      });
      expect(mapRequirement("  VISA FREE  ")).toEqual({
        eligibilityStatus: "visa_free",
        maxStayDays: null,
      });
      expect(mapRequirement("free movement")).toEqual({
        eligibilityStatus: "visa_free",
        maxStayDays: null,
      });
    });

    it("maps numeric stay days (7-360) to visa_free with numeric maxStayDays", () => {
      for (const days of [
        7, 10, 14, 15, 21, 28, 30, 45, 60, 90, 180, 240, 360,
      ]) {
        expect(mapRequirement(String(days))).toEqual({
          eligibilityStatus: "visa_free",
          maxStayDays: days,
        });
      }
    });

    it("maps 'visa on arrival' to on_arrival with null maxStayDays", () => {
      expect(mapRequirement("visa on arrival")).toEqual({
        eligibilityStatus: "on_arrival",
        maxStayDays: null,
      });
    });

    it("maps 'eta' and 'e-visa' to eta with null maxStayDays", () => {
      expect(mapRequirement("eta")).toEqual({
        eligibilityStatus: "eta",
        maxStayDays: null,
      });
      expect(mapRequirement("e-visa")).toEqual({
        eligibilityStatus: "eta",
        maxStayDays: null,
      });
    });

    it("maps 'visa required' to required with null maxStayDays", () => {
      expect(mapRequirement("visa required")).toEqual({
        eligibilityStatus: "required",
        maxStayDays: null,
      });
    });

    it("maps 'covid ban' and 'no admission' to not_allowed with null maxStayDays", () => {
      expect(mapRequirement("covid ban")).toEqual({
        eligibilityStatus: "not_allowed",
        maxStayDays: null,
      });
      expect(mapRequirement("no admission")).toEqual({
        eligibilityStatus: "not_allowed",
        maxStayDays: null,
      });
    });

    it("returns null for '-1' self-destination sentinel or unknown requirements", () => {
      expect(mapRequirement("-1")).toBeNull();
      expect(mapRequirement("")).toBeNull();
      expect(mapRequirement("unknown-value")).toBeNull();
      expect(mapRequirement("0")).toBeNull();
    });
  });

  describe("parsePassportIndexCsv", () => {
    it("parses valid CSV rows, normalizes ISO-2 codes, and skips self-pairs (-1)", () => {
      const csv = [
        "Passport,Destination,Requirement",
        "us,us,-1",
        "us,ae,30",
        "eg,de,visa required",
        "gb,fr,visa free",
        "in,sg,e-visa",
        "ca,au,eta",
        "us,sa,visa on arrival",
        "il,ir,no admission",
        "fr,cn,covid ban",
      ].join("\r\n");

      const parsed = parsePassportIndexCsv(csv);

      expect(parsed.totalDataRows).toBe(9);
      expect(parsed.skippedSelf).toBe(1);
      expect(parsed.skippedMalformed).toBe(0);
      expect(parsed.skippedUnknownRequirement).toBe(0);
      expect(parsed.rows).toEqual([
        {
          passportCode: "US",
          destinationCode: "AE",
          eligibilityStatus: "visa_free",
          maxStayDays: 30,
        },
        {
          passportCode: "EG",
          destinationCode: "DE",
          eligibilityStatus: "required",
          maxStayDays: null,
        },
        {
          passportCode: "GB",
          destinationCode: "FR",
          eligibilityStatus: "visa_free",
          maxStayDays: null,
        },
        {
          passportCode: "IN",
          destinationCode: "SG",
          eligibilityStatus: "eta",
          maxStayDays: null,
        },
        {
          passportCode: "CA",
          destinationCode: "AU",
          eligibilityStatus: "eta",
          maxStayDays: null,
        },
        {
          passportCode: "US",
          destinationCode: "SA",
          eligibilityStatus: "on_arrival",
          maxStayDays: null,
        },
        {
          passportCode: "IL",
          destinationCode: "IR",
          eligibilityStatus: "not_allowed",
          maxStayDays: null,
        },
        {
          passportCode: "FR",
          destinationCode: "CN",
          eligibilityStatus: "not_allowed",
          maxStayDays: null,
        },
      ]);
    });

    it("counts malformed ISO-2 codes and unknown requirement values and deduplicates pairs", () => {
      const csv = [
        "Passport,Destination,Requirement",
        "USA,AE,30",
        "US,A1,30",
        "US,AE,visa required",
        "US,AE,90",
        "US,FR,invalid_status",
      ].join("\n");

      const parsed = parsePassportIndexCsv(csv);

      expect(parsed.totalDataRows).toBe(5);
      expect(parsed.skippedMalformed).toBe(2);
      expect(parsed.skippedUnknownRequirement).toBe(1);
      expect(parsed.rows).toEqual([
        {
          passportCode: "US",
          destinationCode: "AE",
          eligibilityStatus: "visa_free",
          maxStayDays: 90,
        },
      ]);
    });

    it("throws on empty CSV or invalid header", () => {
      expect(() => parsePassportIndexCsv("")).toThrow(
        /Invalid or empty passport-index CSV/i
      );
      expect(() =>
        parsePassportIndexCsv("Origin,Target,Rule\nUS,AE,30")
      ).toThrow(/Invalid CSV header/i);
    });
  });

  describe("diffEligibilityRows", () => {
    const validCountries = new Set(["US", "AE", "DE", "EG", "FR"]);
    const visaTypeByDest = new Map<string, number>([
      ["AE", 10],
      ["DE", 20],
      ["FR", 30],
    ]);
    const syncTime = new Date("2026-11-07T03:00:00.000Z");

    it("filters out pairs not in countries table and separates inserted, updated, and unchanged rows", () => {
      const existing: ExistingEligibilityRecord[] = [
        {
          id: 1,
          destinationCode: "AE",
          passportCode: "US",
          visaTypeId: 10,
          eligibilityStatus: "visa_free",
          maxStayDays: 30,
          isActive: true,
          deletedAt: null,
        },
        {
          id: 2,
          destinationCode: "DE",
          passportCode: "EG",
          visaTypeId: 20,
          eligibilityStatus: "required",
          maxStayDays: null,
          isActive: true,
          deletedAt: null,
        },
      ];

      const parsedRows = [
        // Unchanged row
        {
          passportCode: "US",
          destinationCode: "AE",
          eligibilityStatus: "visa_free" as const,
          maxStayDays: 30,
        },
        // Updated row (status changed from required -> eta)
        {
          passportCode: "EG",
          destinationCode: "DE",
          eligibilityStatus: "eta" as const,
          maxStayDays: null,
        },
        // Newly inserted row
        {
          passportCode: "US",
          destinationCode: "FR",
          eligibilityStatus: "visa_free" as const,
          maxStayDays: 90,
        },
        // Skipped because XK is not in validCountries
        {
          passportCode: "XK",
          destinationCode: "AE",
          eligibilityStatus: "required" as const,
          maxStayDays: null,
        },
      ];

      const diff = diffEligibilityRows({
        rows: parsedRows,
        validCountryCodes: validCountries,
        visaTypeIdByDestination: visaTypeByDest,
        existingRows: existing,
        now: syncTime,
      });

      expect(diff.unchanged).toBe(1);
      expect(diff.skippedMissingCountry).toBe(1);
      expect(diff.toInsert).toEqual([
        {
          destinationCode: "FR",
          passportCode: "US",
          visaTypeId: 30,
          eligibilityStatus: "visa_free",
          maxStayDays: 90,
          lastUpdated: syncTime,
          updatedAt: syncTime,
          isActive: true,
          deletedAt: null,
        },
      ]);
      expect(diff.toUpdate).toEqual([
        {
          destinationCode: "DE",
          passportCode: "EG",
          visaTypeId: 20,
          eligibilityStatus: "eta",
          maxStayDays: null,
          lastUpdated: syncTime,
          updatedAt: syncTime,
          isActive: true,
          deletedAt: null,
        },
      ]);
    });
  });

  describe("syncPassportIndex (idempotency & end-to-end orchestration)", () => {
    it("is idempotent across repeated runs and only updates lastUpdated when eligibility changes", async () => {
      const csvRun1 = [
        "Passport,Destination,Requirement",
        "US,US,-1",
        "US,AE,30",
        "EG,AE,e-visa",
        "XX,AE,visa required",
      ].join("\n");

      const storeState: {
        countries: string[];
        visaTypes: { id: number; destinationCode: string; type: string }[];
        eligibilities: (ExistingEligibilityRecord & { lastUpdated: Date })[];
      } = {
        countries: ["US", "AE", "EG"],
        visaTypes: [{ id: 100, destinationCode: "AE", type: "tourist" }],
        eligibilities: [],
      };

      let nextVisaTypeId = 200;
      let nextEligibilityId = 1;

      const mockStore: SyncDatabaseStore = {
        getActiveCountryCodes: jest.fn(async () => storeState.countries),
        getActiveVisaTypes: jest.fn(async () => storeState.visaTypes),
        createDefaultTouristVisaTypes: jest.fn(async destinationCodes => {
          for (const code of destinationCodes) {
            storeState.visaTypes.push({
              id: nextVisaTypeId++,
              destinationCode: code,
              type: "tourist",
            });
          }
        }),
        getExistingEligibilities: jest.fn(async () => storeState.eligibilities),
        upsertEligibilities: jest.fn(async records => {
          for (const rec of records) {
            const existingIndex = storeState.eligibilities.findIndex(
              e =>
                e.destinationCode === rec.destinationCode &&
                e.passportCode === rec.passportCode &&
                e.visaTypeId === rec.visaTypeId
            );
            if (existingIndex >= 0) {
              storeState.eligibilities[existingIndex] = {
                ...storeState.eligibilities[existingIndex],
                eligibilityStatus: rec.eligibilityStatus,
                maxStayDays: rec.maxStayDays,
                lastUpdated: rec.lastUpdated,
                isActive: rec.isActive,
                deletedAt: rec.deletedAt,
              };
            } else {
              storeState.eligibilities.push({
                id: nextEligibilityId++,
                destinationCode: rec.destinationCode,
                passportCode: rec.passportCode,
                visaTypeId: rec.visaTypeId,
                eligibilityStatus: rec.eligibilityStatus,
                maxStayDays: rec.maxStayDays,
                lastUpdated: rec.lastUpdated,
                isActive: rec.isActive,
                deletedAt: rec.deletedAt,
              });
            }
          }
        }),
      };

      const t1 = new Date("2026-11-07T03:00:00.000Z");
      const mockFetch1 = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
        text: async () => csvRun1,
      });

      const summary1 = await syncPassportIndex({
        fetchFn: mockFetch1 as unknown as typeof fetch,
        store: mockStore,
        now: t1,
        logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
      });

      expect(mockFetch1).toHaveBeenCalledWith(PASSPORT_INDEX_CSV_URL);
      expect(summary1).toEqual({
        totalCsvRows: 4,
        validPairs: 2,
        inserted: 2,
        updated: 0,
        unchanged: 0,
        skippedSelf: 1,
        skippedMissingCountry: 1,
        skippedMalformed: 0,
        skippedUnknownRequirement: 0,
      });
      expect(storeState.eligibilities).toHaveLength(2);
      expect(storeState.eligibilities[0].lastUpdated).toEqual(t1);
      expect(storeState.eligibilities[1].lastUpdated).toEqual(t1);

      // Run 2 with identical CSV at later timestamp t2 -> 0 inserts, 0 updates, lastUpdated preserved
      const t2 = new Date("2026-11-14T03:00:00.000Z");
      const summary2 = await syncPassportIndex({
        fetchFn: mockFetch1 as unknown as typeof fetch,
        store: mockStore,
        now: t2,
        logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
      });

      expect(summary2.inserted).toBe(0);
      expect(summary2.updated).toBe(0);
      expect(summary2.unchanged).toBe(2);
      expect(storeState.eligibilities[0].lastUpdated).toEqual(t1);
      expect(storeState.eligibilities[1].lastUpdated).toEqual(t1);

      // Run 3 where US -> AE stay days changes from 30 to 90, while EG -> AE stays unchanged
      const csvRun3 = [
        "Passport,Destination,Requirement",
        "US,US,-1",
        "US,AE,90",
        "EG,AE,e-visa",
      ].join("\n");
      const t3 = new Date("2026-11-21T03:00:00.000Z");
      const mockFetch3 = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
        text: async () => csvRun3,
      });

      const summary3 = await syncPassportIndex({
        fetchFn: mockFetch3 as unknown as typeof fetch,
        store: mockStore,
        now: t3,
        logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
      });

      expect(summary3.inserted).toBe(0);
      expect(summary3.updated).toBe(1);
      expect(summary3.unchanged).toBe(1);

      const usAe = storeState.eligibilities.find(e => e.passportCode === "US");
      const egAe = storeState.eligibilities.find(e => e.passportCode === "EG");
      expect(usAe?.maxStayDays).toBe(90);
      expect(usAe?.lastUpdated).toEqual(t3);
      expect(egAe?.lastUpdated).toEqual(t1);
    });

    it("throws when dataset fetch returns a non-OK HTTP status", async () => {
      const failingFetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 503,
        statusText: "Service Unavailable",
        text: async () => "",
      });

      const noopStore: SyncDatabaseStore = {
        getActiveCountryCodes: jest.fn(async () => []),
        getActiveVisaTypes: jest.fn(async () => []),
        createDefaultTouristVisaTypes: jest.fn(async () => undefined),
        getExistingEligibilities: jest.fn(async () => []),
        upsertEligibilities: jest.fn(async () => undefined),
      };

      await expect(
        syncPassportIndex({
          fetchFn: failingFetch as unknown as typeof fetch,
          store: noopStore,
          logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
        })
      ).rejects.toThrow(
        /Failed to fetch passport-index dataset \(503 Service Unavailable\)/
      );
    });

    it("throws when createNeonSyncStore is called without DATABASE_URL", () => {
      const originalEnv = process.env.DATABASE_URL;
      process.env.DATABASE_URL = "";
      try {
        expect(() => createNeonSyncStore("")).toThrow(
          /DATABASE_URL is not set/
        );
      } finally {
        if (originalEnv !== undefined) {
          process.env.DATABASE_URL = originalEnv;
        }
      }
    });
  });
});
