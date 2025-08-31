import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { countries } from "./countries";

export const visaTypes = sqliteTable("visa_types", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  destinationId: integer("destination_id")
    .references(() => countries.id)
    .notNull(),
  type: text("type").notNull(), // e.g., "tourist", "business", "transit", "student"
  nameEn: text("name_en").notNull(),
  nameAr: text("name_ar"),
  nameEs: text("name_es"),
  namePt: text("name_pt"),
  nameRu: text("name_ru"),
  nameDe: text("name_de"),
  nameFr: text("name_fr"),
  nameIt: text("name_it"),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  descriptionEs: text("description_es"),
  descriptionPt: text("description_pt"),
  descriptionRu: text("description_ru"),
  descriptionDe: text("description_de"),
  descriptionFr: text("description_fr"),
  descriptionIt: text("description_it"),
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
  requirements: text("requirements", { mode: "json" }), // JSON array of requirements
  documents: text("documents", { mode: "json" }), // JSON array of required documents
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

export type VisaType = typeof visaTypes.$inferSelect;
export type NewVisaType = typeof visaTypes.$inferInsert;
