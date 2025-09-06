# Database Setup Guide

This guide explains how to set up Drizzle ORM with Cloudflare D1 database for the GetTravelVisa.com platform, including both local development and production environments.

## Prerequisites

- Node.js 18+ and pnpm installed
- Wrangler CLI installed and authenticated with Cloudflare
- Cloudflare account with D1 access
- `@libsql/client` package installed (for local Drizzle Studio)

## Quick Start

### Local Development Setup (Recommended)

**Prerequisites:**

- Wrangler CLI installed and authenticated
- Cloudflare D1 database created
- Environment variables configured in `.env.local`

```bash
# Start local development with Wrangler
pnpm wrangler:dev

# In a separate terminal, generate and apply migrations
pnpm db:generate
pnpm db:local:apply
```

This sequence will:

1. Start local D1 database via Wrangler
2. Generate migrations from schema changes
3. Apply all migrations to the local D1 database
4. Ready for local development with D1 parity

## Environment Configuration

### Required Variables

Create or update `.env.local`:

```env
# Cloudflare Configuration (Required for both local and production)
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_D1_DATABASE_ID=your-database-id
CLOUDFLARE_API_TOKEN=your-api-token

# Next.js Configuration
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3001

# Optional Services
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NODE_ENV=development
```

### Smart Configuration

The project uses intelligent configuration in `drizzle.config.ts` that automatically switches between local D1 and production D1:

```typescript
// Automatic environment validation and switching
shouldUseLocalD1
  ? {
      dialect: "sqlite",
      driver: "d1-http",
      dbCredentials: {
        ...validateLocalD1Env(), // Only requires database ID for local
        accountId: undefined, // Wrangler handles auth locally
        token: undefined,
      },
    }
  : {
      // Production with Cloudflare D1 HTTP API
      dialect: "sqlite",
      driver: "d1-http",
      dbCredentials: validateCloudflareEnv(), // Full credentials required
    };
```

## Local Development Commands

### Database Management

```bash
# Start local development environment
pnpm wrangler:dev           # Start local D1 server (run in background)

# Schema and migrations
pnpm db:generate            # Generate migrations from schema changes
pnpm db:local:apply         # Apply migrations to local D1
pnpm db:push                # Push schema directly (dev only)

# Database exploration
pnpm db:studio              # Open Drizzle Studio GUI
pnpm db:local:list          # List local migrations
```

### Development Workflow

1. **First Setup**:
   ```bash
   pnpm wrangler:dev       # Start local D1 (background terminal)
   pnpm db:local:apply     # Apply existing migrations to local D1
   ```
2. **Schema Changes**: Modify files in `src/lib/db/schema/`
3. **Generate Migration**: `pnpm db:generate`
4. **Apply Migration**: `pnpm db:local:apply`
5. **Test with Studio**: `pnpm db:studio`

## Production Commands

```bash
# Schema and migrations
pnpm db:generate            # Generate migrations from schema changes
pnpm db:prod:apply          # Apply migrations to production D1
pnpm db:push               # Push schema directly (dev only)

# Database management
pnpm db:studio             # Open Drizzle Studio for production
pnpm db:prod:list          # List production migrations

# Code quality
pnpm lint                  # ESLint checks
pnpm type-check           # TypeScript validation
pnpm format               # Prettier formatting
```

## Drizzle Studio Access

### Database Studio

- **Command**: `pnpm db:studio`
- **Connection**: Automatically detects local D1 or production D1 based on environment
- **Local Mode**: Local D1 via Wrangler (requires `pnpm wrangler:dev` running)
- **Production Mode**: Cloudflare D1 HTTP API
- **Authentication**: Uses environment variables from `.env.local`

### Studio Features

- Visual database schema explorer
- Query builder and SQL console
- Data viewing and editing
- Real-time updates
- Export capabilities

## Database Schema

The GetTravelVisa.com platform uses a comprehensive i18n database architecture:

### Core Tables

**Main Tables:**

- `countries` - Destination and passport-issuing countries
- `visa_types` - Different visa options per destination
- `visa_eligibility` - Many-to-many visa requirements matrix

**Internationalization Tables:**

- `countries_i18n` - Multilingual country names/descriptions
- `visa_types_i18n` - Multilingual visa type information
- `visa_eligibility_i18n` - Multilingual eligibility notes

### Schema Features

- **Multilingual Support**: 8 languages (EN, AR, ES, PT, RU, DE, FR, IT)
- **Soft Deletes**: `deleted_at` timestamps for data retention
- **Audit Trail**: Automatic `created_at` and `updated_at` timestamps
- **Data Integrity**: Proper foreign key relationships
- **Flexible Structure**: JSON fields for complex requirements

### Sample Data Included

The seed migration populates:

- 192 countries with full translations across 8 locales
- 2 visa types for UAE destination
- 4 visa eligibility rules
- Complete i18n translations for all content

## Migration Management

### File Structure

```
drizzle/                    # Drizzle Kit generated files
├── 0000_*.sql             # Schema migrations (sequential)
├── 0002_seed_initial_data.sql  # Data seeding migration
├── seed-migration.ts      # TypeScript seed migration script
└── meta/                  # Migration metadata
```

### Migration Workflow

1. **Modify Schema**: Edit files in `src/lib/db/schema/`
2. **Generate**: `pnpm db:generate` creates new migration
3. **Review**: Check generated SQL in `drizzle/` directory
4. **Apply Locally**: `pnpm db:local:apply`
5. **Test**: Use `pnpm db:studio` to verify changes (with wrangler:dev running)
6. **Deploy**: `pnpm db:prod:apply` for production

## Production Deployment

### Database Setup

1. **Create Production Database**:

   ```bash
   pnpm wrangler d1 create gtv-db-prod
   ```

2. **Update Configuration**:
   - Add production database ID to `wrangler.jsonc`
   - Set production environment variables

3. **Deploy Schema**:
   ```bash
   pnpm db:migrate
   ```

### Environment Variables

Set in Cloudflare Dashboard or via Wrangler:

```bash
# Set production variables
pnpm wrangler secret put CLOUDFLARE_API_TOKEN
pnpm wrangler secret put NEXTAUTH_SECRET
```

## Troubleshooting

### Common Issues

**Migration Errors:**

- **Missing Environment Variables**: The config now validates required variables and shows descriptive error messages
- **Incorrect Credentials**: Ensure `.env.local` has correct Cloudflare credentials
- **Database ID Mismatch**: Check that database ID matches in both environment and `wrangler.jsonc`
- **Missing Migration Files**: Verify migrations exist in both `drizzle/` and `migrations/` directories

**Studio Connection Issues:**

- Local: Ensure database exists with `pnpm db:local:migrate`
- Production: Verify API token has D1 permissions
- Port conflicts: Local uses 4984, production uses 4983

**Permission Errors:**

- Run `pnpm wrangler auth login` to authenticate
- Ensure API token has D1:Edit permissions
- Check account ID matches your Cloudflare account

### Reset and Recovery

**Complete Local Reset:**

```bash
# Manually delete local database file if needed
rm local-db.sqlite
pnpm db:migrate              # Recreate tables
pnpm db:seed                 # Populate with data
```

**Production Reset (Careful!):**

```bash
pnpm db:migrate              # Reapply schema
pnpm db:seed                 # Repopulate data
```

### Performance Tips

- Use local development environment for faster iteration
- Run `pnpm db:studio` to visually explore database structure
- Keep database up-to-date with regular `pnpm db:migrate` and `pnpm db:seed`

## Development Best Practices

1. **Schema Changes**: Always generate migrations, never edit directly
2. **Testing**: Use local setup for development and testing
3. **Data Integrity**: Test migrations thoroughly before production
4. **Backup**: Export production data before major changes
5. **Environment Separation**: Use different databases for dev/staging/production

## Monitoring and Maintenance

### Health Checks

```bash
# Verify database connectivity and data
pnpm db:studio  # Visual inspection and queries

# Check schema with SQL queries in Studio
# Example queries to run in Studio:
# SELECT COUNT(*) FROM countries
# SELECT name FROM sqlite_master WHERE type='table'
```

### Regular Maintenance

- Monitor database size in Cloudflare Dashboard
- Review query performance with Drizzle Studio
- Keep dependencies updated (`drizzle-orm`, `drizzle-kit`)
- Regular backup of production data

This setup provides a robust, scalable database architecture with excellent developer experience for both local development and production deployment.

---

# Countries Database Seeding

This section provides comprehensive guidance for seeding the database with all world countries and their multilingual translations.

## Overview

The countries seeding system provides:

- **190+ countries** from all continents
- **1,536+ translations** across 8 locales (en, ar, es, fr, pt, ru, de, it)
- **ISO 3166-1 alpha-3** country codes
- **Continent and region** classification
- **Multilingual support** for internationalization

## Countries Files Structure

```
drizzle/
├── seed-migration.ts              # Main seeding migration script
└── 0002_seed_initial_data.sql    # Data seeding migration placeholder
```

## Countries Database Schema

### Countries Table

- `id`: Primary key (auto-increment)
- `code`: ISO 3166-1 alpha-3 country code (e.g., "USA", "ARE")
- `continent`: Continent name (e.g., "North America", "Asia")
- `region`: Sub-region (e.g., "Northern America", "Western Asia")
- `isActive`: Boolean flag for active countries
- `createdAt`, `updatedAt`, `deletedAt`: Timestamps

### Countries I18n Table

- `id`: Primary key (auto-increment)
- `countryId`: Foreign key to countries table
- `locale`: Language code (en, ar, es, fr, pt, ru, de, it)
- `name`: Country name in the specified locale
- `description`: Full country name/description in the specified locale
- `createdAt`, `updatedAt`: Timestamps

## Countries Seeding Usage

### 1. Setup Database

```bash
pnpm db:migrate
```

Applies all migrations to create the required database tables.

Populates the database with all 192 countries and their translations in 8 languages.

## Countries Data Statistics

### Countries by Continent

- **Africa**: 54 countries
- **Europe**: 45 countries
- **Asia**: 44 countries
- **North America**: 23 countries
- **Oceania**: 14 countries
- **South America**: 12 countries

### Supported Locales

- `en`: English
- `ar`: Arabic (العربية)
- `es`: Spanish (Español)
- `fr`: French (Français)
- `pt`: Portuguese (Português)
- `ru`: Russian (Русский)
- `de`: German (Deutsch)
- `it`: Italian (Italiano)

## Countries Sample Data

### Country Example: United Arab Emirates (ARE)

```json
{
  "code": "ARE",
  "continent": "Asia",
  "region": "Western Asia",
  "translations": [
    {
      "locale": "en",
      "name": "United Arab Emirates",
      "description": "United Arab Emirates"
    },
    {
      "locale": "ar",
      "name": "الإمارات العربية المتحدة",
      "description": "دولة الإمارات العربية المتحدة"
    },
    {
      "locale": "es",
      "name": "Emiratos Árabes Unidos",
      "description": "Emiratos Árabes Unidos"
    },
    {
      "locale": "fr",
      "name": "Émirats arabes unis",
      "description": "Émirats arabes unis"
    },
    {
      "locale": "pt",
      "name": "Emirados Árabes Unidos",
      "description": "Emirados Árabes Unidos"
    },
    {
      "locale": "ru",
      "name": "Объединенные Арабские Эмираты",
      "description": "Объединенные Арабские Эмираты"
    },
    {
      "locale": "de",
      "name": "Vereinigte Arabische Emirate",
      "description": "Vereinigte Arabische Emirate"
    },
    {
      "locale": "it",
      "name": "Emirati Arabi Uniti",
      "description": "Emirati Arabi Uniti"
    }
  ]
}
```

## Countries Integration with Application

The seeded countries data integrates with the GetTravelVisa.com platform for:

1. **Visa Destination Selection**: Users can select from all world countries
2. **Passport Country Selection**: Users can select their passport country
3. **Multilingual Support**: Country names display in user's preferred language
4. **Visa Eligibility Rules**: Countries are used as destinations and passport countries
5. **Search and Filtering**: Countries can be filtered by continent/region

## Countries Maintenance

### Adding New Countries

1. Add country data to the seed-migration.ts file
2. Include all 8 locale translations
3. Run seed migration to update database

### Adding New Locales

1. Update the seed-migration.ts file with new locale
2. Update database schema if needed
3. Re-run seed migration

### Updating Country Information

1. Modify country data in seed-migration.ts file
2. Re-run seed migration (clears and re-inserts all data)

## Countries Error Handling

The seed migration includes comprehensive error handling:

- Individual country insertion errors don't stop the process
- Detailed logging of success/failure counts
- Verification script to ensure data integrity

## Countries Performance

- **Seeding Time**: ~3-5 seconds for all 190+ countries with 8 languages
- **Database Size**: ~1MB for countries + translations
- **Memory Usage**: Minimal, processes countries in batches

## Countries Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure database is set up: `pnpm db:migrate`
   - Check file permissions on local database file

2. **Translation Missing**
   - Verify all countries have 8 locale translations
   - Check for typos in locale codes (en, ar, es, fr, pt, ru, de, it)

3. **Duplicate Country Codes**
   - Ensure each country has unique ISO 3166-1 alpha-3 code
   - Check for case sensitivity issues

## Countries Future Enhancements

- [x] Support for 8 languages (en, ar, es, fr, pt, ru, de, it) - **COMPLETED**
- [ ] Add additional locales (zh, ja, ko, hi, etc.)
- [ ] Include country flags/emoji data
- [ ] Add country calling codes
- [ ] Include currency information
- [ ] Add timezone data
- [ ] Include country population data
