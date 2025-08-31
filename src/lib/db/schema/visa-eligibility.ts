import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
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
  notesEn: text("notes_en"),
  notesAr: text("notes_ar"),
  notesEs: text("notes_es"),
  notesPt: text("notes_pt"),
  notesRu: text("notes_ru"),
  notesDe: text("notes_de"),
  notesFr: text("notes_fr"),
  notesIt: text("notes_it"),
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

export type VisaEligibility = typeof visaEligibility.$inferSelect;
export type NewVisaEligibility = typeof visaEligibility.$inferInsert;
