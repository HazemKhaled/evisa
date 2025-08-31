import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { countries } from "./countries";
import { visaTypes } from "./visa-types";

export const visaEligibility = sqliteTable("visa_eligibility", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  destinationId: integer("destination_id")
    .references(() => countries.id)
    .notNull(),
  passportId: integer("passport_id")
    .references(() => countries.id)
    .notNull(),
  visaTypeId: integer("visa_type_id")
    .references(() => visaTypes.id)
    .notNull(),
  eligibilityStatus: text("eligibility_status").notNull(), // "required", "visa_free", "on_arrival", "eta", "not_allowed"
  maxStayDays: integer("max_stay_days"), // For visa-free or visa-on-arrival
  lastUpdated: integer("last_updated", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const visaEligibilityI18n = sqliteTable(
  "visa_eligibility_i18n",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    visaEligibilityId: integer("visa_eligibility_id")
      .references(() => visaEligibility.id)
      .notNull(),
    locale: text("locale", { length: 5 }).notNull(), // e.g., "en", "ar", "es"
    notes: text("notes"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => {
    return {
      uniqueEligibilityLocale: unique().on(
        table.visaEligibilityId,
        table.locale
      ),
    };
  }
);

export type VisaEligibility = typeof visaEligibility.$inferSelect;
export type NewVisaEligibility = typeof visaEligibility.$inferInsert;
export type VisaEligibilityI18n = typeof visaEligibilityI18n.$inferSelect;
export type NewVisaEligibilityI18n = typeof visaEligibilityI18n.$inferInsert;
