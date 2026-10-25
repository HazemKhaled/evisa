import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import { visaTypes } from "./visa-types";

export const affiliatePartners = pgTable(
  "affiliate_partners",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(), // e.g., "iVisa", "Veeza.ai", "Airalo"
    domain: text("domain").notNull(), // e.g., "www.visa.com", "veezaportal.com", "airalo.com"
    baseUrl: text("base_url").notNull(), // The main URL for the partner
    slug: text("slug").notNull(), // e.g., "iVisa", "veezaportal", "airalo"
    logoUrl: text("logo_url"), // Optional logo URL
    commissionRate: real("commission_rate"), // Percentage commission
    isActive: boolean("is_active").default(true).notNull(),
    isAvailable: boolean("is_available").default(true).notNull(),
    priority: integer("priority").default(0).notNull(),
    countryRestrictions: text("country_restrictions"), // ISO country codes comma-separated, or "*" for all
    createdAt: timestamp("created_at")
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`now()`)
      .$onUpdate(() => new Date())
      .notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => [unique().on(table.slug)]
);

export const visaTypeAffiliatePartners = pgTable(
  "visa_type_affiliate_partners",
  {
    id: serial("id").primaryKey(),
    visaTypeId: integer("visa_type_id")
      .references(() => visaTypes.id)
      .notNull(),
    affiliatePartnerId: integer("affiliate_partner_id")
      .references(() => affiliatePartners.id)
      .notNull(),
    isAvailable: boolean("is_available").default(true).notNull(),
    isPrimary: boolean("is_primary").default(false).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`now()`)
      .$onUpdate(() => new Date())
      .notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  table => [unique().on(table.visaTypeId, table.affiliatePartnerId)]
);

// Type definitions
export type AffiliatePartner = typeof affiliatePartners.$inferSelect;
export type NewAffiliatePartner = typeof affiliatePartners.$inferInsert;
export type VisaTypeAffiliatePartner =
  typeof visaTypeAffiliatePartners.$inferSelect;
export type NewVisaTypeAffiliatePartner =
  typeof visaTypeAffiliatePartners.$inferInsert;
