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

export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(), // ISO 3166-1 alpha-3
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
    countryId: integer("country_id")
      .references(() => countries.id)
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
