# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. A multilingual travel visa processing application built with modern web technologies. Always refer to this document when working on the project to maintain consistency and quality.

## Project Overview

The GetTravelVisa.com platform helps users travel with minimal visa requirements through a centralized visa processing platform. It features destination-based visa catalogs, and comprehensive SEO optimization.

**Key Features:**

- Multilingual support with RTL layout
- Destination-based visa catalog with eligibility checking
- Blog for destination content
- Modern, responsive design with accessibility features
- Admin panel for content and data management

## Monorepo Structure

This project uses a **PNPM workspace monorepo** with the following structure:

```
apps/
├── website/               # Public-facing Next.js application
│   ├── src/               # Website source code
│   ├── package.json       # Website dependencies
│   ├── next.config.ts     # Next.js configuration
│   └── wrangler.jsonc     # Cloudflare Workers config
└── admin/                 # Admin panel Next.js application
    ├── src/               # Admin source code
    │   └── app/
    │       ├── countries/    # Country management
    │       ├── visa-types/   # Visa type management
    │       ├── eligibility/  # Eligibility management
    │       └── blog-posts/   # Blog post management
    ├── package.json       # Admin dependencies
    ├── next.config.ts     # Next.js configuration
    ├── middleware.ts      # Clerk authentication
    └── wrangler.jsonc     # Cloudflare Workers config

packages/
├── database/              # Shared Drizzle schema and database logic
│   ├── src/
│   │   ├── schema/       # Database schema definitions
│   │   ├── connection.ts # Database connection
│   │   └── index.ts      # Package exports
│   └── package.json
├── ui/                    # Shared UI components (Shadcn/MagicUI)
│   ├── src/components/
│   └── package.json
├── utils/                 # Shared utilities and helpers
│   ├── src/
│   └── package.json
├── auth/                  # Shared Clerk authentication utilities
│   ├── src/
│   └── package.json
└── typescript-config/     # Shared TypeScript configurations
    ├── base.json
    ├── nextjs.json
    └── package.json
```

### Package Management

- Use **PNPM** exclusively (not npm or yarn)
- Shared packages use `workspace:*` protocol for internal dependencies
- Run commands using `pnpm --filter <package-name>` for specific packages

### Development Commands

```bash
# Development
pnpm dev                    # Start both apps
pnpm dev:website           # Start website only (port 3000)
pnpm dev:admin             # Start admin only (port 3001)

# Building
pnpm build                 # Build all apps
pnpm build:website         # Build website only
pnpm build:admin           # Build admin only

# Testing & Quality
pnpm lint                  # Lint all packages
pnpm type-check            # Type-check all packages
pnpm test                  # Run all tests

# Database (via @repo/database)
pnpm db:generate           # Generate migrations
pnpm db:migrate            # Run migrations
pnpm db:push               # Push schema changes
pnpm db:studio             # Open Drizzle Studio

# Deployment
pnpm deploy:website        # Deploy website to Cloudflare
pnpm deploy:admin          # Deploy admin to Cloudflare
```

## Technology Stack

Use latest compatible versions from all dependencies, and never use old version without confirmation.

### Core Framework

- **Next.js** with App Router and Turbopack for development, follow Next.js best practices in every aspect
- **React**
- **TypeScript** with strict mode for type safety

### Styling & UI

- **Tailwind CSS** latest version for styling with custom design tokens
- **Cairo font** Google Fonts via `next/font/google`
- Custom component library with reusable UI components

### Database & Backend

- **Drizzle ORM** with Neon PostgreSQL database
- **Drizzle Kit** for schema management and migrations
- Well-structured schema for destinations, and visa types

### Internationalization

- **i18next** for multilingual content and routing
- Full RTL support for RTL languages
- Locale-based routing with `/[locale]/` structure
- the root route `/` should be in English
- Support the following languages (English, Spanish, Arabic, Portuguese, Russian, German, French, Italian)

### Analytics & Monitoring

- **Sentry** for error tracking and performance monitoring
- **Google Tag Manager** via `@next/third-parties`
- **Jitsu** for analytics collection via `@jitsu/jitsu-react` npm

### Deployment & Infrastructure

- **Cloudflare** deployment via **OpenNext.js**
- **Wrangler** for Cloudflare Workers management
- **Neon Database** for PostgreSQL database
- **Next.js MCP** (Model Context Protocol) for AI-assisted development with Next.js-specific diagnostics

### Next.js MCP Integration

The project includes Next.js MCP server integration (available in Next.js 16+) to enable AI agents and coding assistants to:

**Available Tools:**

- **`get_errors`**: Retrieve build errors, runtime errors, and type errors from dev server in real-time
- **`get_logs`**: Access development server logs and console output
- **`get_page_metadata`**: Obtain metadata about specific pages including routes and component information
- **`get_project_metadata`**: Retrieve project structure and configuration details
- **`get_server_action_by_id`**: Debug Server Actions by looking up their metadata

**Complementary Next DevTools MCP:**

- Documentation queries from official Next.js knowledge base
- Migration and upgrade assistance with automated codemods (e.g., Pages Router → App Router)
- Cache Components configuration and setup guidance
- Browser-based testing via Playwright MCP integration

**Use Cases:**

- Real-time error diagnostics while developing
- Understanding application state during development
- Context-aware code generation following project patterns
- Debugging Server Actions and component hierarchies
- Planning and executing migrations to latest Next.js features
- Validating implementations against Next.js best practices

**When to Leverage MCP:**

- Debugging build or runtime errors
- Querying page metadata and routes
- Understanding Server Components behavior
- Getting Next.js-specific guidance and best practices
- Planning feature implementation or migrations

**Best Practices:**

- Use both MCP servers together: built-in for low-level diagnostics, next-devtools for high-level guidance
- Run dev server (`pnpm dev`) to enable live error diagnostics
- Query MCP for context before implementing complex features
- Consult official Next.js docs via next-devtools for migration guidance

### Deployment with OpenNext

- Follow OpenNext for CloudFlare to configure build and deploy the application https://opennext.js.org/cloudflare/howtos/dev-deploy
- Configure SSG https://opennext.js.org/cloudflare/caching#ssg-site
- Configure Cloudflare Image Optimization https://opennext.js.org/cloudflare/howtos/image
- Static assets for public folder https://opennext.js.org/cloudflare/howtos/assets
- Use wrangler.jsonc instead of the .toml file
- Deployments are manual using `pnpm deploy` command
- GitHub Action for tests and linting only

### Authentication

- **Clerk** for admin authentication (`@clerk/nextjs` latest)
- Admin app uses Clerk middleware for route protection
- Website has no authentication (public access)
- Shared `@repo/auth` package exports Clerk utilities

### Code Quality

- **ESLint 9** with Next.js configurations
- **Prettier** for code formatting
- **Husky** and **lint-staged** for pre-commit hooks (use `npx husky init` for setup)
- TypeScript with comprehensive type checking
- **Jest** for unit tests, don't cover UI, just cover database, API calls, Next.js actions and any non-UI code

## Database Schema

The application uses a comprehensive database schema designed for visa catalog management:

### Core Tables

- **countries**: Used as a destinations and passport issuing with multilingual names and descriptions (See countries with all countries, and translate names in all required languages)
- **visaTypes**: Different visa options for each destination
- **visaEligibility**: Many-to-many relationship defining visa eligibility between destination, passport and visa

### Key Features

- Follow Drizzle bets practices https://orm.drizzle.team/docs/overview
- Full multilingual support for strings like name, description ... etc
- Soft delete capabilities with `deleted_at` flags
- Automatic timestamps with `created_at` and `updated_a_t`
- Proper foreign key relationships and data integrity

## Design System & UI

### Navigation (Header)

- Sticky top navigation bar.
- Logo on the left, on click open home
- Main navigation links:
  - Home
  - Destinations
  - Travel Blog

### Hero Section

- Large, modern hero with background illustration/image.
- Headline + sub-headline.
- Search form: (Passport Country + Destination Country → Check Eligibility).
- Primary CTA: "Start Your Application".

### Homepage Sections

- **How it Works**: 3–4 steps (icon + text) explaining the process.
- **Top Destinations**: Grid of cards with flags/images.
- **Why Choose Us**: Feature highlights (speed, trust, global reach).
- **Latest Posts**: Blog posts previews with images and links.

### Footer

- Multi-column footer with:
  - **Company**: About, Contact Us, Terms & Conditions, Privacy Policy.
  - **Services**: Visa Checker, Document Center, Travel Blog.
  - **Contact Info**: Email, Phone, Office Address, Social Media icons.
- Copyright text.
- Language switcher.

### Contact Us Page

- Simple form with fields: Name, Email, Phone, reason (question, partnership, other), Subject, Message.
- 3 lines welcome messages for questions, and partnerships.

### About Us Page

- Mission statement.
- Team members section (avatars + bios).
- Timeline or story section.

### Terms of Service Page

- Structured sections for user agreements, acceptable use, disclaimers, and governing law.
- Easy-to-read typography and spacing.

### Privacy Policy Page

- Sections for data collection, usage, cookies, user rights, and GDPR compliance.
- Clear and transparent presentation.

### Responsive & multilingual

- Must be fully responsive (mobile-first, tablet, desktop).
- RTL support: entire layout, text alignment, and navigation flipped.
- Use `dir="rtl"` dynamically when RTL language is selected.
- No dark mode required.
- All static strings should be come from language file.
- All static SEO metadata should com from language files.

### UI/UX Style

- Modern, clean design with generous whitespace.
- Rounded corners, soft shadows.
- Tailwind color palette with primary/secondary brand colors.
- Consistent iconography (Lucide icons or Heroicons).

### RTL Implementation

- Dynamic `dir` attribute based on locale in layout
- RTL-aware CSS classes using Tailwind's directional utilities
- Proper text alignment and layout flipping for RTL languages
- Icon positioning adjustments for RTL layouts

### Styling Guidelines

- Use Tailwind utility classes for styling
- Leverage CSS custom properties for consistent theming
- Mobile-first responsive design approach
- RTL support with directional classes and layout adjustments

## Working with the Monorepo

### Import Paths

Always use workspace package imports in apps:

```typescript
// ✅ Correct - Use workspace packages
import { getCountryByCode } from "@repo/database";
import { Button } from "@repo/ui";
import { cn } from "@repo/utils";
import { useAuth } from "@repo/auth";

// ❌ Wrong - Don't use relative imports for shared code
import { getCountryByCode } from "../../../packages/database";
```

### Adding Shared Code

1. **Database schema changes**: Add to `packages/database/src/schema/`
2. **Shared UI components**: Add to `packages/ui/src/components/`
3. **Utility functions**: Add to `packages/utils/src/`
4. **Auth utilities**: Add to `packages/auth/src/`

### Running Commands

```bash
# Run commands for specific app
pnpm --filter @repo/website dev
pnpm --filter @repo/admin build

# Run commands for specific package
pnpm --filter @repo/database test

# Run commands for all apps/packages
pnpm --recursive lint
pnpm test  # Runs in all packages with test script
```

## Admin Panel

The admin panel provides CRUD interfaces for managing:

- **Countries**: Destination and passport countries with multilingual support
- **Visa Types**: Visa options with duration, fees, and requirements
- **Visa Eligibility**: Relationships between destinations, passports, and visas
- **Blog Posts**: Content management with MDX support

### Admin Authentication

- Uses Clerk for authentication
- Environment variables required:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
- See `apps/admin/.env.example` for setup

### Admin Deployment

- Manual deployment using `pnpm --filter @repo/admin deploy`
- Configure appropriate wrangler environment for staging/production
- Routes: `admin.gettravelvisa.com`

```

## Project Architecture

### Current State

- **Framework**: Next.js with App Router and Turbopack for development
- **Styling**: Tailwind CSS (latest)
- **Database**: Neon PostgreSQL with Drizzle ORM integration
- **Internationalization**: i18next
- **Deployment**: OpenNext.js for Cloudflare Workers

### Directory Structure

```

src/
├── app/ # Next.js App Router
│ ├── globals.css # Global styles and design tokens
│ ├── layout.tsx # Root layout
│ └── [locale]/ # Internationalized routes (to be implemented)
├── components/ # Reusable components
│ ├── layout/ # Layout components
│ └── ui/ # Base UI components
├── lib/ # Utility libraries
│ ├── db/ # Database configuration
│ └── utils.ts # Utility functions
└── i18n/ # Internationalization

````

### Package Management

- Use **pnpm** exclusively (not npm or yarn)

## Development Guidelines

### Code Style

- Use TypeScript with strict types; prefer interfaces over types
- Avoid enums; use maps instead
- Use functional components with TypeScript interfaces
- Function parameters should have explicit TypeScript types
- Follow Next.js App Router conventions (never use Pages Router)
- Implement proper error boundaries and loading states
- Use server components by default, client components only when needed
- Follow the established component patterns for consistency

### Naming Conventions

- Favor named exports for components
- Use JSDoc style comments for functions, interfaces, and classes

### Internationalization Best Practices

- Always use the `useTranslations` hook for text content
- Test both LTR and RTL layouts during development
- Ensure all user-facing text is translatable
- Use semantic translation keys (e.g., `Hero.headline` instead of `text1`)

### Database Best Practices

- Use Drizzle ORM queries with proper type safety
- Implement proper error handling for database operations
- Use prepared statements for better performance
- Follow the established schema patterns for new tables

### Performance Optimizations

- Use Next.js Image component for optimized images
- Implement proper caching strategies
- Use dynamic imports for code splitting when appropriate
- Optimize bundle size with proper tree shaking
- Use next/dynamic, React.lazy() with Suspense when it’s needed

### SEO Considerations

- Implement proper metadata for all pages
- Use structured data (JSON-LD) for better search visibility
- All Metadata adn JSON-LD should come from localized database content or translation files
- Ensure proper URL structures for internationalization
- Generate XML sitemap index that include each destination sitemap
- Generate sitemap per each destination including all pages related to this destination, blog, visas

## MDX

- Follow Next.js guide for MDX pages https://nextjs.org/docs/app/guides/mdx
- use remark-gfm npm remark and rehype
- Use gray-matter package to support Frontmatter with Next.js
  - Each mdx pages should include SEO required info like title, and description.
  - Each mdx blog post has extras like destination, image, passport (optional), related visas (optional), tags (optional)
- Blog pages should be in blog folder and each language should have it's own sub folder blog/ar, blog/en, blog/fr

## Testing & Quality Assurance

### Pre-commit Hooks

- ESLint checks for code quality
- Prettier formatting for consistent code style
- TypeScript compilation checks
- Automated via Husky and lint-staged

### Error Monitoring

- Sentry integration for error tracking
- Performance monitoring enabled
- Proper error boundaries in React components

## Deployment Architecture

### Cloudflare Integration

- Deploy via OpenNext.js for optimal Cloudflare compatibility
- Use Cloudflare D1 for database
- Configure proper caching strategies

### Environment Management

- Use environment-specific configurations
- Proper secret management for API keys
- Type-safe environment variables with TypeScript

## Common Issues & Solutions

### Husky Setup

For modern Husky setup, use:

```bash
npx husky init
````

### RTL Layout Issues

- Always test RTL layout changes
- Use `rtl:` prefixes for RTL-specific styles
- Be mindful of icon and button positioning in RTL mode

### TypeScript Strict Mode

- Use strict Eslint rules to prevent use any
- Use proper type definitions for all props and state
- Implement proper error handling with typed catch blocks

### Other

- Static pages & blog should be implemented in mdx
- Always use real content in both db and static pages

## Git & GitHub Workflow

### Commit Message Format

Use conventional commit format:

- Format: `<type>(<scope>): <description>`
- Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- Scope: Required, use slug for current module
- Description: imperative, present tense ("add" not "added" or "adds")

Examples:

- `fix(catalog): resolve null reference in address selection`
- `docs(auth): update README with setup instructions`

### Pull Request Format

- Format: `<type>(<scope>): <description>`
- Always include Sentry issue links in PR description when fixing bugs
- Examples:
  - `feat(catalog): implement social login providers`
  - `fix(auth): add optional chaining to prevent null reference error`

### Branch Naming

- Format: `<type>/<description>`
- Types: `feature`, `bugfix`, `chore`
- Description: kebab-case
- Examples: `feature/add-new-checkout-flow`, `bugfix/gtm-event-name-normalization`

## Business Logic & URL Structure

### Core Functionality

The platform helps users travel with minimal visa process through:

1. **Visa Catalog**: Destination-driven content showing visa requirements
2. **Document Center**: Centralized document collection and processing
3. **Affiliate Integration**: Partnerships with visa agencies and travel services

### URL Structure

- Destination pages: `/d/{DESTINATION_COUNTRY}`
- Visa options: `/d/{DESTINATION_NAME}/v/{VISA_OPTION}`
- Passport-specific info: `/d/{DESTINATION_NAME}/p/{PASSPORT_COUNTRY}`
- All destinations: `/d/`
- Articles list: `/d/{DESTINATION_COUNTRY}/a`
- Article details: `/d/{DESTINATION_COUNTRY}/a/{ARTICLE_SLUG}`

### SEO Requirements

- Generate sitemap index at `/sitemap_index.xml`
- Each destination gets own sitemap: `/uae/sitemap.xml`
- Implement subdomain structure: `{country-code}.gettravelvisa.com
- Use canonical meta tags for destination pages
- never use eslint-disabled, instead add proper rules or eslint issues
- After implementing any feature, fix tests & type-check

### Memory Notes

- Use drizzle migrations for any DDL commands
- Always respect multilingual, no hardcoded strings
