import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Countries/Destinations table
export const destinations = sqliteTable("destinations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull().unique(), // ISO country code (e.g., "UAE", "USA")
  name: text("name").notNull(),
  nameAr: text("name_ar"),
  flag: text("flag"), // URL to flag image
  region: text("region"),
  capital: text("capital"),
  capitalAr: text("capital_ar"),
  description: text("description"),
  descriptionAr: text("description_ar"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

// Visa types table
export const visaTypes = sqliteTable("visa_types", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  destinationId: integer("destination_id")
    .references(() => destinations.id)
    .notNull(),
  name: text("name").notNull(),
  nameAr: text("name_ar"),
  slug: text("slug").notNull(),
  description: text("description"),
  descriptionAr: text("description_ar"),
  fee: real("fee"),
  currency: text("currency").default("USD"),
  processingTime: text("processing_time"), // e.g., "3-5 business days"
  processingTimeAr: text("processing_time_ar"),
  validity: text("validity"), // e.g., "30 days"
  validityAr: text("validity_ar"),
  entryType: text("entry_type"), // "single", "multiple"
  requirements: text("requirements"), // JSON string
  requirementsAr: text("requirements_ar"), // JSON string
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

// Passport countries table
export const passportCountries = sqliteTable("passport_countries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull().unique(), // ISO country code
  name: text("name").notNull(),
  nameAr: text("name_ar"),
  flag: text("flag"), // URL to flag image
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

// Visa eligibility table (many-to-many between visa types and passport countries)
export const visaEligibility = sqliteTable("visa_eligibility", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  visaTypeId: integer("visa_type_id")
    .references(() => visaTypes.id)
    .notNull(),
  passportCountryId: integer("passport_country_id")
    .references(() => passportCountries.id)
    .notNull(),
  isEligible: integer("is_eligible", { mode: "boolean" }).default(false),
  specialRequirements: text("special_requirements"), // JSON string
  specialRequirementsAr: text("special_requirements_ar"), // JSON string
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

// Visa service providers table
export const visaServiceProviders = sqliteTable("visa_service_providers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  website: text("website"),
  applyUrlTemplate: text("apply_url_template").notNull(), // URL with placeholders
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

// Visa service provider mappings (which provider handles which visa types)
export const visaProviderMappings = sqliteTable("visa_provider_mappings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  visaTypeId: integer("visa_type_id")
    .references(() => visaTypes.id)
    .notNull(),
  providerId: integer("provider_id")
    .references(() => visaServiceProviders.id)
    .notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

// Articles table for destination-based content
export const articles = sqliteTable("articles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  destinationId: integer("destination_id")
    .references(() => destinations.id)
    .notNull(),
  title: text("title").notNull(),
  titleAr: text("title_ar"),
  slug: text("slug").notNull(),
  content: text("content").notNull(),
  contentAr: text("content_ar"),
  excerpt: text("excerpt"),
  excerptAr: text("excerpt_ar"),
  featuredImage: text("featured_image"), // URL to image
  author: text("author"),
  isPublished: integer("is_published", { mode: "boolean" }).default(false),
  publishedAt: text("published_at"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

// Types for TypeScript
export type Destination = typeof destinations.$inferSelect;
export type NewDestination = typeof destinations.$inferInsert;

export type VisaType = typeof visaTypes.$inferSelect;
export type NewVisaType = typeof visaTypes.$inferInsert;

export type PassportCountry = typeof passportCountries.$inferSelect;
export type NewPassportCountry = typeof passportCountries.$inferInsert;

export type VisaEligibility = typeof visaEligibility.$inferSelect;
export type NewVisaEligibility = typeof visaEligibility.$inferInsert;

export type VisaServiceProvider = typeof visaServiceProviders.$inferSelect;
export type NewVisaServiceProvider = typeof visaServiceProviders.$inferInsert;

export type VisaProviderMapping = typeof visaProviderMappings.$inferSelect;
export type NewVisaProviderMapping = typeof visaProviderMappings.$inferInsert;

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
