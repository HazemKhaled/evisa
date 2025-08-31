import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const countries = sqliteTable("countries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code", { length: 3 }).notNull().unique(), // ISO 3166-1 alpha-3
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
  flag: text("flag"), // Emoji flag or URL to flag image
  continent: text("continent").notNull(),
  region: text("region"),
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

export type Country = typeof countries.$inferSelect;
export type NewCountry = typeof countries.$inferInsert;
