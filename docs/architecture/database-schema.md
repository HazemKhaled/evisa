# Database Schema

## Overview

The eVisa application uses **PostgreSQL** via **Neon Database** with **Drizzle ORM** for type-safe database operations. The schema is designed to support visa eligibility checking, multilingual content, and comprehensive destination information.

## Schema Design Principles

- **Multilingual Support**: All user-facing content has corresponding i18n tables
- **Soft Deletion**: Uses `deletedAt` timestamps instead of hard deletes
- **Type Safety**: Full TypeScript integration via Drizzle ORM
- **Performance Optimized**: Proper indexing for common query patterns
- **Audit Trail**: Automatic `createdAt` and `updatedAt` timestamps

## Core Tables

### Countries

**Table**: `countries`
**Purpose**: Stores both destination countries and passport-issuing countries

```sql
CREATE TABLE `countries` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `code` text(3) NOT NULL UNIQUE,
  `continent` text NOT NULL,
  `region` text,
  `hero_image` text,
  `is_active` integer DEFAULT true NOT NULL,
  `created_at` integer DEFAULT (unixepoch()) NOT NULL,
  `updated_at` integer DEFAULT (unixepoch()) NOT NULL,
  `deleted_at` integer
);
```

**TypeScript Interface**:

```typescript
interface Country {
  id: number;
  code: string; // ISO 3166-1 alpha-3 (e.g., 'USA', 'ARE', 'FRA')
  continent: string; // e.g., "Africa", "Asia", "Europe"
  region: string; // e.g., "Western Europe", "Southeast Asia"
  heroImage: string; // Unsplash or other hero image URL
  isActive: boolean; // Whether country is available for processing
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
```

### Countries I18N

**Table**: `countries_i18n`
**Purpose**: Localized content for countries

```sql
CREATE TABLE `countries_i18n` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `country_id` integer NOT NULL,
  `locale` text(2) NOT NULL,
  `name` text NOT NULL,
  `name_long` text,
  `about` text,
  `created_at` integer DEFAULT (unixepoch()) NOT NULL,
  `updated_at` integer DEFAULT (unixepoch()) NOT NULL,
  FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`)
);

CREATE UNIQUE INDEX `countries_i18n_country_id_locale_unique`
ON `countries_i18n` (`country_id`,`locale`);
```

**TypeScript Interface**:

```typescript
interface CountryI18n {
  id: number;
  countryId: number;
  locale: string; // e.g., "en", "ar", "es"
  name: string; // Localized country name
  nameLong: string; // Official/formal country name
  about: string; // 2-line catchy description
  createdAt: Date;
  updatedAt: Date;
}
```

### Visa Types

**Table**: `visa_types`
**Purpose**: Different visa options available for each destination

```sql
CREATE TABLE `visa_types` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `destination_id` integer NOT NULL,
  `type` text NOT NULL,
  `duration` integer NOT NULL,
  `max_stay` integer,
  `processing_time` integer NOT NULL,
  `fee` real NOT NULL,
  `currency` text DEFAULT 'USD' NOT NULL,
  `requires_interview` integer DEFAULT false NOT NULL,
  `is_multi_entry` integer DEFAULT false NOT NULL,
  `requirements` text,
  `documents` text,
  `is_active` integer DEFAULT true NOT NULL,
  `created_at` integer DEFAULT (unixepoch()) NOT NULL,
  `updated_at` integer DEFAULT (unixepoch()) NOT NULL,
  `deleted_at` integer,
  FOREIGN KEY (`destination_id`) REFERENCES `countries`(`id`)
);
```

**TypeScript Interface**:

```typescript
interface VisaType {
  id: number;
  destinationId: number;
  type: string; // e.g., "tourist", "business", "transit", "student"
  duration: number; // Duration in days
  maxStay: number; // Maximum stay duration in days
  processingTime: number; // Processing time in days
  fee: number; // Fee in USD
  currency: string; // Fee currency
  requiresInterview: boolean;
  isMultiEntry: boolean;
  requirements: string[]; // JSON array of requirement strings
  documents: string[]; // JSON array of document type strings
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
```

### Visa Types I18N

**Table**: `visa_types_i18n`
**Purpose**: Localized names and descriptions for visa types

```sql
CREATE TABLE `visa_types_i18n` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `visa_type_id` integer NOT NULL,
  `locale` text(5) NOT NULL,
  `name` text NOT NULL,
  `description` text,
  `created_at` integer DEFAULT (unixepoch()) NOT NULL,
  `updated_at` integer DEFAULT (unixepoch()) NOT NULL,
  FOREIGN KEY (`visa_type_id`) REFERENCES `visa_types`(`id`)
);

CREATE UNIQUE INDEX `visa_types_i18n_visa_type_id_locale_unique`
ON `visa_types_i18n` (`visa_type_id`,`locale`);
```

### Visa Eligibility

**Table**: `visa_eligibility`
**Purpose**: Many-to-many relationships defining visa requirements between passport and destination countries

```sql
CREATE TABLE `visa_eligibility` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `destination_id` integer NOT NULL,
  `passport_id` integer NOT NULL,
  `visa_type_id` integer NOT NULL,
  `eligibility_status` text NOT NULL,
  `max_stay_days` integer,
  `last_updated` integer DEFAULT (unixepoch()) NOT NULL,
  `is_active` integer DEFAULT true NOT NULL,
  `created_at` integer DEFAULT (unixepoch()) NOT NULL,
  `updated_at` integer DEFAULT (unixepoch()) NOT NULL,
  `deleted_at` integer,
  FOREIGN KEY (`destination_id`) REFERENCES `countries`(`id`),
  FOREIGN KEY (`passport_id`) REFERENCES `countries`(`id`),
  FOREIGN KEY (`visa_type_id`) REFERENCES `visa_types`(`id`)
);

CREATE UNIQUE INDEX `visa_eligibility_destination_id_passport_id_visa_type_id_unique`
ON `visa_eligibility` (`destination_id`,`passport_id`,`visa_type_id`);
```

**TypeScript Interface**:

```typescript
interface VisaEligibility {
  id: number;
  destinationId: number; // Where you want to go
  passportId: number; // What passport you hold
  visaTypeId: number; // Which visa type applies
  eligibilityStatus:
    | "required"
    | "visa_free"
    | "on_arrival"
    | "eta"
    | "not_allowed";
  maxStayDays: number | null; // For visa-free or visa-on-arrival
  lastUpdated: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
```

### Visa Eligibility I18N

**Table**: `visa_eligibility_i18n`
**Purpose**: Localized notes for eligibility rules

```sql
CREATE TABLE `visa_eligibility_i18n` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `visa_eligibility_id` integer NOT NULL,
  `locale` text(5) NOT NULL,
  `notes` text,
  `created_at` integer DEFAULT (unixepoch()) NOT NULL,
  `updated_at` integer DEFAULT (unixepoch()) NOT NULL,
  FOREIGN KEY (`visa_eligibility_id`) REFERENCES `visa_eligibility`(`id`)
);

CREATE UNIQUE INDEX `visa_eligibility_i18n_visa_eligibility_id_locale_unique`
ON `visa_eligibility_i18n` (`visa_eligibility_id`,`locale`);
```

## Entity Relationships

```
countries (1) ──────────────── (many) countries_i18n
    │                                      │
    │ destination_id                       │ locale-based content
    │                                      │
    ├── (many) visa_types (1) ────────── (many) visa_types_i18n
    │                │                            │
    │                └── (many) visa_eligibility │
    │                                │            │
    └── passport_id ─────────────────┘            │
                                                  │
                               visa_eligibility (1) ──── (many) visa_eligibility_i18n
```

## Key Indexes

### Performance-Critical Indexes

```sql
-- Country lookups
CREATE UNIQUE INDEX `countries_code_unique` ON `countries` (`code`);
CREATE INDEX `idx_countries_active_lookup` ON `countries`(`is_active`, `deleted_at`)
WHERE `is_active` = true;

-- Visa type queries
CREATE INDEX `idx_visa_types_destination_active` ON `visa_types`(`destination_id`, `is_active`, `deleted_at`);
CREATE INDEX `idx_visa_types_processing_time` ON `visa_types`(`destination_id`, `processing_time`)
WHERE `is_active` = true;
CREATE INDEX `idx_visa_types_fee_sort` ON `visa_types`(`destination_id`, `fee`)
WHERE `is_active` = true AND `fee` IS NOT NULL;

-- Eligibility lookups
CREATE INDEX `idx_visa_eligibility_destination_status` ON `visa_eligibility`(`destination_id`, `eligibility_status`, `is_active`);
CREATE INDEX `idx_visa_eligibility_passport_lookup` ON `visa_eligibility`(`passport_id`, `destination_id`);

-- I18N queries
CREATE INDEX `idx_countries_i18n_alphabetical` ON `countries_i18n`(`locale`, `name`, `country_id`);
```

## Database Configuration

### Connection Settings

**File**: `src/lib/db/connection.ts`

```typescript
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Neon database connection
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
```

### Schema Files

**Schema Location**: `src/lib/db/schema/`

- `index.ts` - Main exports
- `countries.ts` - Countries and countries_i18n tables
- `visa-types.ts` - Visa types and visa_types_i18n tables
- `visa-eligibility.ts` - Visa eligibility and visa_eligibility_i18n tables

## Migration Management

### Migration Files

**Location**: `drizzle/`

- `0000_sleepy_northstar.sql` - Initial schema creation
- `0001_seed-countries.sql` - Country data seeding
- `0002_seed-visa.sql` - Visa data seeding

### Drizzle Configuration

**File**: `drizzle.config.ts`

```typescript
export default {
  schema: "./src/lib/db/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  driver: "neon-http",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

## Common Query Patterns

### Get Country with Localized Content

```typescript
const country = await db
  .select({
    id: countries.id,
    code: countries.code,
    continent: countries.continent,
    name: countriesI18n.name,
    about: countriesI18n.about,
  })
  .from(countries)
  .leftJoin(countriesI18n, eq(countries.id, countriesI18n.countryId))
  .where(
    and(
      eq(countries.code, "USA"),
      eq(countriesI18n.locale, "en"),
      eq(countries.isActive, true),
      isNull(countries.deletedAt)
    )
  )
  .limit(1);
```

### Get Visa Requirements

```typescript
const eligibility = await db
  .select({
    destinationName: countriesI18n.name,
    eligibilityStatus: visaEligibility.eligibilityStatus,
    visaType: visaTypesI18n.name,
    processingTime: visaTypes.processingTime,
    fee: visaTypes.fee,
  })
  .from(visaEligibility)
  .innerJoin(countries, eq(visaEligibility.destinationId, countries.id))
  .innerJoin(countriesI18n, eq(countries.id, countriesI18n.countryId))
  .innerJoin(visaTypes, eq(visaEligibility.visaTypeId, visaTypes.id))
  .innerJoin(visaTypesI18n, eq(visaTypes.id, visaTypesI18n.visaTypeId))
  .where(
    and(
      eq(visaEligibility.passportId, passportCountryId),
      eq(visaEligibility.destinationId, destinationCountryId),
      eq(countriesI18n.locale, "en"),
      eq(visaTypesI18n.locale, "en"),
      eq(visaEligibility.isActive, true)
    )
  );
```

## Performance Considerations

### Query Optimization

1. **Use Indexes**: All foreign keys and common query fields are indexed
2. **Limit Results**: Always use `.limit()` for large datasets
3. **Select Specific Fields**: Avoid `SELECT *` for better performance
4. **Proper JOINs**: Use appropriate JOIN types (INNER/LEFT) based on requirements

### Caching Strategy

1. **Application Level**: Use Next.js `unstable_cache` for API routes
2. **Worker Level**: Cloudflare Workers Cache API for expensive queries
3. **Database Level**: Prepared statements and connection pooling

## Data Integrity

### Constraints

- **Foreign Key Constraints**: Ensure referential integrity
- **Unique Constraints**: Prevent duplicate records (country-locale, eligibility rules)
- **Not Null Constraints**: Required fields cannot be empty
- **Check Constraints**: Validate enum values and business rules

### Soft Deletion

All tables use `deletedAt` timestamp for soft deletion:

- Allows data recovery
- Maintains referential integrity
- Enables audit trails
- Supports regulatory compliance

## Security Considerations

### Data Access

- **Parameterized Queries**: Drizzle ORM prevents SQL injection
- **Type Safety**: TypeScript interfaces prevent data type errors
- **Input Validation**: All user inputs validated before database queries
- **Access Control**: Service layer controls data access patterns

### Sensitive Data

- No personally identifiable information stored
- Country codes and visa information are public data
- Database access restricted to application layer only

## Future Considerations

### Scalability

- **Read Replicas**: Consider for high-traffic scenarios
- **Partitioning**: By country or region if data grows significantly
- **Archiving**: Old visa rules and historical data management

### Additional Features

- **Audit Logging**: Track all data changes with user context
- **Version Control**: Historical visa requirement changes
- **Analytics**: Query performance and usage tracking
- **Real-time Updates**: Webhook integration for visa policy changes

---

**Last Updated**: September 2025
**Schema Version**: v2.0
**Drizzle Version**: 0.44.5+
**Database**: Neon Database (PostgreSQL)
