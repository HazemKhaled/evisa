import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

export const countries = sqliteTable("countries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code", { length: 3 }).notNull().unique(), // ISO 3166-1 alpha-3
  continent: text("continent").notNull(), // Continent code (e.g., "asia", "europe", "northamerica")
  region: text("region"), // e.g., "Western Europe", "Southeast Asia"
  heroImage: text("hero_image"), // Unsplash or other hero image URL
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

export const countriesI18n = sqliteTable(
  "countries_i18n",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    countryId: integer("country_id")
      .references(() => countries.id)
      .notNull(),
    locale: text("locale", { length: 5 }).notNull(), // e.g., "en", "ar", "es", "en-US", "ar-SA"
    name: text("name").notNull(),
    name_long: text("name_long"), // Official/formal country name
    about: text("about"), // 2-line catchy description
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
      uniqueCountryLocale: unique().on(table.countryId, table.locale),
    };
  }
);

export type Country = typeof countries.$inferSelect;
export type NewCountry = typeof countries.$inferInsert;
export type CountryI18n = typeof countriesI18n.$inferSelect;
export type NewCountryI18n = typeof countriesI18n.$inferInsert;
