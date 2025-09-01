# GetTravelVisa.com Platform

A multilingual travel visa processing application built with modern web technologies. The platform helps users travel with minimal visa requirements through a centralized visa processing platform featuring destination-based visa catalogs and comprehensive SEO optimization.

## 🌟 Key Features

- **Multilingual Support**: Full RTL support with locale-based routing (`/[locale]/`)
- **Destination-based Visa Catalog**: Comprehensive visa eligibility checking
- **i18n Architecture**: Separate translation tables for scalable multilingual content
- **Modern Stack**: Next.js, TypeScript, Drizzle ORM, Cloudflare D1
- **Responsive Design**: Mobile-first with accessibility features

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended package manager)
- Cloudflare account for deployment

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd gettravelvisa

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your Cloudflare credentials
```

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗄️ Database Management

This project uses **Drizzle ORM** with **Cloudflare D1** (SQLite) for both local development and production.

### Local Database Setup

#### Quick Setup (Recommended)

```bash
# Complete setup: reset → migrate → seed
pnpm db:local:setup
```

#### Individual Commands

```bash
# Database migrations
pnpm db:local:migrate        # Apply migrations to local database
pnpm db:local:reset          # Reset/clear local database

# Database seeding
pnpm db:local:seed           # Populate with sample data

# Database exploration
pnpm db:local:studio         # Open Drizzle Studio GUI
pnpm db:local:query "SQL"    # Run custom SQL queries
```

### Production Database

```bash
# Generate migrations from schema changes
pnpm db:generate

# Apply migrations to production
pnpm db:migrate

# Open production database GUI
pnpm db:studio

# Seed production database
pnpm db:seed
```

### 🎯 Drizzle Studio Access

**Local Database:**

- **URL**: https://local.drizzle.studio?port=4984
- **Command**: `pnpm db:local:studio`
- **Database**: Local SQLite file via Wrangler

**Production Database:**

- **URL**: https://local.drizzle.studio (default port)
- **Command**: `pnpm db:studio`
- **Database**: Cloudflare D1 via HTTP API

### How Database Configuration Works

The project uses a smart configuration in `drizzle.config.ts`:

```typescript
// Automatically switches based on LOCAL_DB_PATH environment variable
LOCAL_DB_PATH ?
  // Local: Uses SQLite file directly
  { dialect: "sqlite", dbCredentials: { url: LOCAL_DB_PATH } } :
  // Production: Uses Cloudflare D1 HTTP API
  { dialect: "sqlite", driver: "d1-http", dbCredentials: { ... } }
```

**Local Development:**

- Uses local SQLite file in `.wrangler/state/v3/d1/`
- Connects via `@libsql/client` for Drizzle Studio
- No internet connection required

**Production:**

- Connects to Cloudflare D1 via HTTP API
- Uses Cloudflare credentials from `.env.local`
- Full remote database access

### Database Schema

The application uses a comprehensive i18n database schema:

**Core Tables:**

- `countries` - Destination and passport issuing countries
- `countries_i18n` - Multilingual country names/descriptions
- `visa_types` - Different visa options per destination
- `visa_types_i18n` - Multilingual visa type information
- `visa_eligibility` - Visa requirements matrix
- `visa_eligibility_i18n` - Multilingual eligibility notes

**Key Features:**

- Full multilingual support (EN, AR, ES, PT, RU, DE, FR, IT)
- Soft delete capabilities with `deleted_at` flags
- Automatic timestamps (`created_at`, `updated_at`)
- Proper foreign key relationships

## 🛠️ Technology Stack

### Core Framework

- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript strict mode
- **Tailwind CSS** for styling with Cairo font

### Database & Backend

- **Drizzle ORM** with Cloudflare D1 SQLite
- **Drizzle Kit** for migrations and studio
- Well-structured i18n schema design

### Internationalization

- **next-i18next** for multilingual routing
- Full RTL support for Arabic
- Locale-based routing (`/[locale]/`)

### Deployment & Infrastructure

- **Cloudflare Workers** via OpenNext.js
- **Wrangler** for local development
- **GitHub Actions** for CI/CD

## 📝 Available Scripts

### Development

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server

### Code Quality

- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format with Prettier
- `pnpm type-check` - TypeScript compilation check

### Database (Local)

- `pnpm db:local:setup` - Complete database setup
- `pnpm db:local:migrate` - Apply migrations
- `pnpm db:local:seed` - Seed with sample data
- `pnpm db:local:studio` - Open GUI (port 4984)
- `pnpm db:local:query "SQL"` - Run custom queries
- `pnpm db:local:reset` - Reset database

### Database (Production)

- `pnpm db:generate` - Generate migrations
- `pnpm db:migrate` - Apply to production
- `pnpm db:studio` - Open GUI (port 4983)
- `pnpm db:seed` - Seed production data

### Deployment

- `pnpm deploy` - Deploy to Cloudflare
- `pnpm preview` - Preview deployment locally

## 🌍 Internationalization

### Supported Languages

- English (en) - Default
- Arabic (ar) - RTL support
- Spanish (es)
- Portuguese (pt)
- Russian (ru)
- German (de)
- French (fr)
- Italian (it)

### URL Structure

- Root: `/` (English)
- Localized: `/[locale]/page`
- Example: `/ar/destinations`, `/es/contact`

## 🚀 Deployment

The application deploys to Cloudflare Workers using OpenNext.js:

```bash
# Build and deploy
pnpm deploy

# Preview locally
pnpm preview
```

### Environment Configuration

Required environment variables in `.env.local`:

```bash
# Cloudflare Configuration
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_D1_DATABASE_ID=your-database-id
CLOUDFLARE_API_TOKEN=your-api-token

# Next.js Configuration
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3001

# Optional: External Services
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## 📚 Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── [locale]/           # Internationalized routes
├── components/             # Reusable components
│   ├── layout/            # Layout components
│   └── ui/                # Base UI components
├── lib/                   # Utility libraries
│   ├── db/                # Database schema & config
│   └── utils.ts           # Utility functions
├── i18n/                  # Internationalization
└── scripts/               # Database scripts

drizzle/                   # Generated migrations
migrations/                # Wrangler migration files
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Run linting: `pnpm lint:fix`
5. Commit with conventional format: `feat(scope): description`
6. Push and create a Pull Request

## 📄 License

This project is private and proprietary.
