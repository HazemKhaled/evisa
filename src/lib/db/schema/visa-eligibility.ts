import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { countries } from "./countries";
import { visaTypes } from "./visa-types";

export const visaEligibility = pgTable(
  "visa_eligibility",
  {
    id: serial("id").primaryKey(),
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
    lastUpdated: timestamp("last_updated")
      .default(sql`now()`)
      .notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`now()`)
      .$onUpdate(() => new Date())
      .notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => ({
    // Ensure unique eligibility rule for each destination-passport-visa combination
    uniqueEligibilityRule: unique().on(
      table.destinationId,
      table.passportId,
      table.visaTypeId
    ),
  })
);

export const visaEligibilityI18n = pgTable(
  "visa_eligibility_i18n",
  {
    id: serial("id").primaryKey(),
    visaEligibilityId: integer("visa_eligibility_id")
      .references(() => visaEligibility.id)
      .notNull(),
    locale: text("locale").notNull(), // e.g., "en", "ar", "es"
    notes: text("notes"),
    createdAt: timestamp("created_at")
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`now()`)
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
