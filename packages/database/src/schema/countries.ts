import { sql } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const countries = pgTable("countries", {
  code: text("code").primaryKey(), // ISO 3166-1 alpha-2
  continent: text("continent").notNull(), // e.g., "Africa", "Asia", "Europe"
  region: text("region"), // e.g., "Western Europe", "Southeast Asia"
  heroImage: text("hero_image"), // Unsplash or other hero image URL
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`now()`)
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const countriesI18n = pgTable(
  "countries_i18n",
  {
    id: serial("id").primaryKey(),
    countryCode: text("country_code")
      .references(() => countries.code)
      .notNull(),
    locale: text("locale").notNull(), // e.g., "en", "ar", "es"
    name: text("name").notNull(),
    name_long: text("name_long"), // Official/formal country name
    about: text("about"), // 2-line catchy description
    createdAt: timestamp("created_at")
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`now()`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => [unique().on(table.countryCode, table.locale)]
);

export type Country = typeof countries.$inferSelect;
export type NewCountry = typeof countries.$inferInsert;
export type CountryI18n = typeof countriesI18n.$inferSelect;
export type NewCountryI18n = typeof countriesI18n.$inferInsert;
