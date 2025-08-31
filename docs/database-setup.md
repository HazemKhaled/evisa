# Database Setup Guide

This guide explains how to set up the Drizzle ORM with Cloudflare D1 database for the eVisa platform.

## Prerequisites

- Wrangler CLI installed and authenticated with Cloudflare
- Node.js and pnpm installed
- Cloudflare account with D1 access

## Local Development Setup

### 1. Environment Variables

Create or update `.env.local` with your Cloudflare credentials:

```env
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_D1_DATABASE_ID=your-database-id
CLOUDFLARE_API_TOKEN=your-api-token
```

### 2. Database Creation

The database has already been created with ID: `ed2dd914-c369-4c97-b716-3f35a63c4a00`

To create a new database:

```bash
pnpm wrangler d1 create evisa-db-local
```

### 3. Run Migrations

Apply the database schema:

```bash
pnpm wrangler d1 execute evisa-db-local --local --file=./drizzle/0000_elite_speedball.sql
```

### 4. Seed Database (Optional)

Populate with initial data:

```bash
pnpm db:seed
```

## Available Scripts

- `pnpm db:generate` - Generate new migrations from schema changes
- `pnpm db:migrate` - Apply migrations to remote database
- `pnpm db:push` - Push schema directly to database (dev only)
- `pnpm db:studio` - Open Drizzle Studio for database management
- `pnpm db:seed` - Seed database with initial data
- `pnpm db:local-create` - Create local D1 database
- `pnpm db:local-migrate` - Apply migrations to local database
- `pnpm db:local-reset` - Reset local database

## Database Schema

The eVisa platform uses three main tables:

### Countries

- Stores destination and passport-issuing countries
- Multilingual support for names and descriptions
- Soft delete capability

### Visa Types

- Different visa options for each destination
- Processing times, fees, requirements
- JSON fields for flexible requirement storage

### Visa Eligibility

- Many-to-many relationship between countries and visa types
- Eligibility status (required, visa_free, on_arrival, etc.)
- Multilingual notes and last updated tracking

## Production Deployment

1. Create production database in Cloudflare Dashboard
2. Update `wrangler.toml` with production database ID
3. Set production environment variables
4. Deploy with `pnpm deploy`

## Troubleshooting

### Authentication Issues

- Ensure you're logged into Wrangler: `pnpm wrangler auth login`
- Set correct account ID in environment variables

### Migration Issues

- Check that migration files exist in `./drizzle/` directory
- Verify database binding in `wrangler.jsonc`
- Use database ID or name consistently

### Local Development

- For local development, use `--local` flag with wrangler commands
- Database changes are persisted in `.wrangler/state/v3/d1/`
