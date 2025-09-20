import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  json,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { countries } from "./countries";

export const visaTypes = pgTable(
  "visa_types",
  {
    id: serial("id").primaryKey(),
    destinationId: integer("destination_id")
      .references(() => countries.id)
      .notNull(),
    type: text("type").notNull(), // e.g., "tourist", "business", "transit", "student"
    duration: integer("duration").notNull(), // Duration in days
    maxStay: integer("max_stay"), // Maximum stay duration in days
    processingTime: integer("processing_time").notNull(), // Processing time in days
    fee: real("fee").notNull(), // Fee in USD
    currency: text("currency").default("USD").notNull(),
    requiresInterview: boolean("requires_interview").default(false).notNull(),
    isMultiEntry: boolean("is_multi_entry").default(false).notNull(),
    requirements: json("requirements").$type<string[]>(), // JSON array of requirement strings
    documents: json("documents").$type<string[]>(), // JSON array of document type strings
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
    uniqueDestinationType: unique().on(table.destinationId, table.type),
  })
);

export const visaTypesI18n = pgTable(
  "visa_types_i18n",
  {
    id: serial("id").primaryKey(),
    visaTypeId: integer("visa_type_id")
      .references(() => visaTypes.id)
      .notNull(),
    locale: text("locale").notNull(), // e.g., "en", "ar", "es"
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at")
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`now()`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => ({
    uniqueVisaTypeLocale: unique().on(table.visaTypeId, table.locale),
  })
);

// Type definitions for JSON fields
export type VisaRequirement = string; // e.g., "Valid passport", "Passport photos"
export type DocumentType = string; // e.g., "passport_copy", "photos", "flight_booking"

export type VisaType = typeof visaTypes.$inferSelect;
export type NewVisaType = typeof visaTypes.$inferInsert;
export type VisaTypeI18n = typeof visaTypesI18n.$inferSelect;
export type NewVisaTypeI18n = typeof visaTypesI18n.$inferInsert;
