# Database Setup Guide

This guide explains how to set up Drizzle ORM with Cloudflare D1 database for the eVisa platform, including both local development and production environments.

## Prerequisites

- Node.js 18+ and pnpm installed
- Wrangler CLI installed and authenticated with Cloudflare
- Cloudflare account with D1 access
- `@libsql/client` package installed (for local Drizzle Studio)

## Quick Start

### Complete Local Setup (Recommended)

```bash
# One command to set up everything locally
pnpm db:local:setup
```

This command will:

1. Reset the local database
2. Apply all migrations
3. Seed with sample data

## Environment Configuration

### Required Variables

Create or update `.env.local`:

```env
# Cloudflare Configuration
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

The project uses intelligent configuration in `drizzle.config.ts` that automatically switches between local and production:

```typescript
// Local development when LOCAL_DB_PATH is set
LOCAL_DB_PATH
  ? {
      dialect: "sqlite",
      dbCredentials: { url: LOCAL_DB_PATH },
    }
  : {
      // Production with Cloudflare D1 HTTP API
      dialect: "sqlite",
      driver: "d1-http",
      dbCredentials: { databaseId, token, accountId },
    };
```

## Local Development Commands

### Database Management

```bash
# Complete setup (recommended for first time)
pnpm db:local:setup         # Reset → Migrate → Seed

# Individual operations
pnpm db:local:migrate       # Apply migrations to local DB
pnpm db:local:seed          # Populate with sample data
pnpm db:local:reset         # Clear all data and tables

# Database exploration
pnpm db:local:studio        # Open Drizzle Studio GUI (port 4984)
pnpm db:local:query "SQL"   # Execute custom SQL queries

# Database creation (rarely needed)
pnpm db:local:create        # Create new local D1 database
```

### Development Workflow

1. **First Setup**: `pnpm db:local:setup`
2. **Schema Changes**: Modify files in `src/lib/db/schema/`
3. **Generate Migration**: `pnpm db:generate`
4. **Apply Locally**: `pnpm db:local:migrate`
5. **Test with Studio**: `pnpm db:local:studio`

## Production Commands

```bash
# Schema and migrations
pnpm db:generate            # Generate migrations from schema changes
pnpm db:migrate             # Apply migrations to production
pnpm db:push               # Push schema directly (dev only)

# Database management
pnpm db:studio             # Open Drizzle Studio for production (port 4983)
pnpm db:seed               # Seed production with data

# Code quality
pnpm lint                  # ESLint checks
pnpm type-check           # TypeScript validation
pnpm format               # Prettier formatting
```

## Drizzle Studio Access

### Local Database

- **URL**: https://local.drizzle.studio?port=4984
- **Command**: `pnpm db:local:studio`
- **Connection**: Direct SQLite file access via `@libsql/client`
- **Location**: `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite`

### Production Database

- **URL**: https://local.drizzle.studio (default port 4983)
- **Command**: `pnpm db:studio`
- **Connection**: Cloudflare D1 HTTP API
- **Authentication**: Uses environment variables from `.env.local`

### Studio Features

- Visual database schema explorer
- Query builder and SQL console
- Data viewing and editing
- Real-time updates
- Export capabilities

## Database Schema

The eVisa platform uses a comprehensive i18n database architecture:

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

The seed script populates:

- 5 countries with full translations
- 9 visa types across multiple destinations
- 12 visa eligibility rules
- Complete i18n translations for all content

## Migration Management

### File Structure

```
drizzle/                    # Drizzle Kit generated files
├── 0000_*.sql             # Schema migrations (sequential)
├── seed.sql               # Sample data population
└── meta/                  # Migration metadata

migrations/                 # Wrangler migration files (copied from drizzle/)
scripts/
├── seed.ts                # TypeScript seed script
└── reset.sql              # Database reset script
```

### Migration Workflow

1. **Modify Schema**: Edit files in `src/lib/db/schema/`
2. **Generate**: `pnpm db:generate` creates new migration
3. **Review**: Check generated SQL in `drizzle/` directory
4. **Apply Locally**: `pnpm db:local:migrate`
5. **Test**: Use `pnpm db:local:studio` to verify changes
6. **Deploy**: `pnpm db:migrate` for production

## Production Deployment

### Database Setup

1. **Create Production Database**:

   ```bash
   pnpm wrangler d1 create evisa-db-prod
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

- Ensure `.env.local` has correct credentials
- Check that database ID matches in both environment and `wrangler.jsonc`
- Verify migrations exist in both `drizzle/` and `migrations/` directories

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
rm -rf .wrangler/state/v3/d1  # Delete local database
pnpm db:local:setup           # Recreate and populate
```

**Production Reset (Careful!):**

```bash
pnpm wrangler d1 execute evisa-db-prod --remote --file=./scripts/reset.sql
pnpm db:migrate              # Reapply schema
pnpm db:seed                 # Repopulate data
```

### Performance Tips

- Use `db:local:studio` for development - faster than production
- Run `pnpm db:local:query` for quick SQL tests
- Keep local database fresh with regular `pnpm db:local:setup`

## Development Best Practices

1. **Schema Changes**: Always generate migrations, never edit directly
2. **Testing**: Use local setup for development and testing
3. **Data Integrity**: Test migrations thoroughly before production
4. **Backup**: Export production data before major changes
5. **Environment Separation**: Use different databases for dev/staging/production

## Monitoring and Maintenance

### Health Checks

```bash
# Verify database connectivity
pnpm db:local:query "SELECT COUNT(*) FROM countries"

# Check schema version
pnpm db:local:query "SELECT name FROM sqlite_master WHERE type='table'"

# Validate data integrity
pnpm db:local:studio  # Visual inspection
```

### Regular Maintenance

- Monitor database size in Cloudflare Dashboard
- Review query performance with Drizzle Studio
- Keep dependencies updated (`drizzle-orm`, `drizzle-kit`)
- Regular backup of production data

This setup provides a robust, scalable database architecture with excellent developer experience for both local development and production deployment.
