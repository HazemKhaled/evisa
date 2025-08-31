import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  real,
  unique,
} from "drizzle-orm/sqlite-core";
import { countries } from "./countries";

export const visaTypes = sqliteTable("visa_types", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  destinationId: integer("destination_id")
    .references(() => countries.id)
    .notNull(),
  type: text("type").notNull(), // e.g., "tourist", "business", "transit", "student"
  duration: integer("duration").notNull(), // Duration in days
  maxStay: integer("max_stay"), // Maximum stay duration in days
  processingTime: integer("processing_time").notNull(), // Processing time in days
  fee: real("fee").notNull(), // Fee in USD
  currency: text("currency").default("USD").notNull(),
  requiresInterview: integer("requires_interview", { mode: "boolean" })
    .default(false)
    .notNull(),
  isMultiEntry: integer("is_multi_entry", { mode: "boolean" })
    .default(false)
    .notNull(),
  requirements: text("requirements", { mode: "json" }).$type<string[]>(), // JSON array of requirement strings
  documents: text("documents", { mode: "json" }).$type<string[]>(), // JSON array of document type strings
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

export const visaTypesI18n = sqliteTable(
  "visa_types_i18n",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    visaTypeId: integer("visa_type_id")
      .references(() => visaTypes.id)
      .notNull(),
    locale: text("locale", { length: 5 }).notNull(), // e.g., "en", "ar", "es"
    name: text("name").notNull(),
    description: text("description"),
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
      uniqueVisaTypeLocale: unique().on(table.visaTypeId, table.locale),
    };
  }
);

// Type definitions for JSON fields
export type VisaRequirement = string; // e.g., "Valid passport", "Passport photos"
export type DocumentType = string; // e.g., "passport_copy", "photos", "flight_booking"

export type VisaType = typeof visaTypes.$inferSelect;
export type NewVisaType = typeof visaTypes.$inferInsert;
export type VisaTypeI18n = typeof visaTypesI18n.$inferSelect;
export type NewVisaTypeI18n = typeof visaTypesI18n.$inferInsert;
