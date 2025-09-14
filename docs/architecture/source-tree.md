# Source Tree Structure - GetTravelVisa.com

## Document Information

- **Version**: v1.0
- **Date**: September 2024
- **Author**: Architecture Team
- **Status**: Active

---

## Overview

This document provides a comprehensive overview of the source code organization for the GetTravelVisa.com multilingual visa processing platform. The structure follows Next.js 15 App Router conventions with clear separation of concerns.

## Root Directory Structure

```
├── src/                     # Source code
├── docs/                    # Documentation
├── public/                  # Static assets
├── drizzle/                 # Database migrations
├── scripts/                 # Build and utility scripts
├── .bmad-core/             # BMAD development tools
├── node_modules/           # Dependencies
└── [config files]          # Various configuration files
```

## Source Code Organization (`src/`)

### Application Router (`src/app/`)

Following Next.js 15 App Router file-system routing conventions:

```
src/app/
├── globals.css              # Global CSS styles and Tailwind imports
├── layout.tsx               # Root application layout (HTML structure)
├── page.tsx                 # Root homepage (redirects to English)
├── robots.ts                # SEO robots.txt generation
├── sitemap.ts               # Main sitemap generation
├── i18n/                    # Internationalization configuration
│   ├── client.ts            # Client-side i18next configuration
│   ├── index.ts             # Main i18n exports and utilities
│   ├── settings.ts          # Language settings and configuration
│   └── __tests__/           # i18n unit tests
└── [locale]/                # Internationalized routes
    ├── layout.tsx           # Localized layout with language context
    ├── page.tsx             # Homepage with destination search
    ├── contact/             # Contact us page
    │   └── page.tsx
    ├── blog/                # Travel blog system
    │   ├── page.tsx         # Blog listing page
    │   ├── sitemap.ts       # Blog-specific sitemap
    │   ├── [slug]/          # Individual blog posts
    │   │   └── page.tsx
    │   └── t/[tag]/         # Tag-based blog filtering
    │       └── page.tsx
    └── p/[slug]/            # Static pages (About, Terms, Privacy)
        └── page.tsx
```

**Key Routing Patterns:**

- `[locale]/` - Internationalized routes (en, ar, es, pt, ru, de, fr, it)
- Dynamic segments use `[param]` notation
- Server Components by default for optimal performance
- Each route includes proper TypeScript interfaces

### UI Components (`src/components/`)

Organized component library with clear separation:

```
src/components/
├── layout/                  # Layout-specific components
│   ├── header.tsx          # Main site navigation
│   ├── footer.tsx          # Site footer with links
│   └── index.ts            # Layout component exports
├── ui/                     # Reusable UI components
│   ├── destination-card.tsx # Country/destination display card
│   ├── related-article-card.tsx # Blog post preview card
│   └── visa-type-card.tsx  # Visa option display card
├── json-ld.tsx             # SEO structured data component
├── language-switcher.tsx   # Language selection dropdown
├── static-page-layout.tsx  # Layout for static pages
└── __tests__/              # Component unit tests
```

**Component Architecture:**

- Functional components with TypeScript interfaces
- Server Components by default
- Props interfaces defined for all components
- Consistent naming convention (kebab-case files, PascalCase components)

### Business Logic (`src/lib/`)

Service layer and utilities with clear responsibilities:

```
src/lib/
├── services/               # Data access and business logic
│   ├── country-service.ts  # Country data operations
│   ├── visa-service.ts     # Visa data operations
│   ├── blog-service-db.ts  # Database blog service (Cloudflare Workers compatible)
│   ├── blog-service.ts     # Blog service interface layer
│   └── index.ts            # Service exports
├── db/                     # Database schema and connection
│   ├── connection.ts       # Database connection management
│   └── schema/             # Drizzle ORM schema definitions
│       ├── countries.ts    # Countries table schema
│       ├── visa-types.ts   # Visa types table schema
│       ├── visa-eligibility.ts # Eligibility relationships
│       └── index.ts        # Schema exports
├── utils/                  # Utility functions
│   ├── flags.ts            # Country flag utilities
│   ├── pagination.ts       # Pagination helpers
│   ├── styles.ts           # Styling utilities (cn function)
│   ├── translations.ts     # Translation helpers
│   ├── urls.ts             # URL generation utilities
│   ├── index.ts            # Utility exports
│   └── __tests__/          # Utility unit tests
├── consts/                 # Application constants
│   ├── env.ts              # Environment variables
│   └── index.ts            # Constants exports
├── blog-manifest.ts        # Static blog post manifest
├── pages-manifest.ts       # Static pages manifest
├── blog.ts                 # Blog data processing (legacy)
├── json-ld.ts              # SEO structured data generation
├── utils.ts                # Core utility functions
├── __tests__/              # Library unit tests
└── __mocks__/              # Test mocks
```

**Service Layer Patterns:**

- Clear separation between data access and business logic
- Error handling with graceful fallbacks
- TypeScript interfaces for all data structures
- Database abstraction through service layer

### Content Management (Database-Driven)

**Blog Content Architecture:**

Blog content is now stored in database tables with full multilingual support:

- **blog_posts**: Core blog post metadata (slug, author, destinations, image, dates)
- **blog_posts_i18n**: Localized content (title, description, content) per language
- **blog_tags**: Tag definitions with multilingual support
- **blog_post_tags**: Many-to-many relationship between posts and tags

**Static Page Content:**

```
public/
└── locales/               # i18n translation files
    ├── en/                 # English translations
    ├── ar/                 # Arabic translations
    └── [other locales]/    # Other language translations
        ├── common.json
        ├── navigation.json
        └── pages.json

src/lib/services/
├── blog-service.ts         # Blog service interface layer
├── blog-service-db.ts      # Database blog operations
└── blog-service-client.ts  # Client-side blog utilities
```

**Migration from MDX to Database:**

- **Legacy**: MDX files with frontmatter metadata stored in filesystem
- **Current**: Blog content stored in SQLite database with Drizzle ORM
- **Benefits**:
  - Better performance and caching
  - Dynamic content management
  - Serverless compatibility
  - Scalable content operations
  - Real-time content updates

**Database-Driven Content Architecture:**

- Blog posts stored in database tables with full multilingual support
- Static pages use Next.js App Router with i18n translation files
- Destination-focused blog organization maintained through database relationships
- SEO-optimized content with proper metadata and structured data

### Middleware (`src/middleware.ts`)

Next.js middleware for:

- Language detection and redirection
- Route protection
- Request preprocessing
- Analytics tracking

## Database Organization (`drizzle/`)

Database migrations and schema management:

```
drizzle/
├── migrations/             # Database migration files
├── schema.ts               # Generated schema file
└── [timestamp]_*.sql       # Individual migration files
```

## Configuration Files

### Core Configuration

- `next.config.ts` - Next.js configuration with OpenNext optimization
- `tailwind.config.ts` - Tailwind CSS design system configuration
- `drizzle.config.ts` - Database ORM configuration
- `wrangler.jsonc` - Cloudflare Workers configuration

### Code Quality

- `eslint.config.mjs` - ESLint rules and configuration
- `.prettierrc.js` - Code formatting rules
- `jest.config.ts` - Testing framework setup
- `tsconfig.json` - TypeScript compiler configuration

### Development Tools

- `package.json` - Dependencies and scripts
- `.gitignore` - Git ignore patterns
- `.env.example` - Environment variables template
- `.lintstagedrc.js` - Pre-commit hook configuration

## File Naming Conventions

### Routes and Components

- **Route files**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- **Component files**: `kebab-case.tsx` (e.g., `destination-card.tsx`)
- **Component names**: `PascalCase` (e.g., `DestinationCard`)
- **Utility files**: `kebab-case.ts` (e.g., `country-service.ts`)

### Test Files

- **Unit tests**: `[filename].test.ts` or `[filename].test.tsx`
- **Integration tests**: `[feature].integration.test.ts`
- **Test directories**: `__tests__/` alongside source code

## Import/Export Patterns

### Absolute Imports

Using TypeScript path mapping for clean imports:

```typescript
import { CountryService } from "@/lib/services";
import { DestinationCard } from "@/components/ui";
import { cn } from "@/lib/utils";
```

### Index Files

Strategic use of index files for clean exports:

```typescript
// src/lib/services/index.ts
export * from "./country-service";
export * from "./visa-service";

// Usage
import { getCountryByCode, getVisaTypes } from "@/lib/services";
```

### Type-Only Imports

Using TypeScript type imports for better bundling:

```typescript
import { type NextRequest } from "next/server";
import { type Country } from "@/lib/services";
```

## Development Workflow Patterns

### Route Development

1. Create route directory in `src/app/[locale]/`
2. Add `page.tsx` with Server Component
3. Include `loading.tsx` and `error.tsx` if needed
4. Add corresponding service layer functions
5. Include unit tests for business logic

### Component Development

1. Create component in appropriate `src/components/` subdirectory
2. Define TypeScript interface for props
3. Use Server Component unless client interactivity needed
4. Add to index file for clean imports
5. Include component tests if complex logic

### Content Management

1. Add MDX files to appropriate language directories
2. Include frontmatter metadata for SEO
3. Use consistent naming across languages
4. Test content rendering in development

## Build and Deploy Structure

### Build Process

```bash
# Generated during build
├── .next/                  # Next.js build output
├── out/                    # Static export (if applicable)
└── dist/                   # OpenNext.js Cloudflare build
```

### Static Assets (`public/`)

```
public/
├── images/                 # Optimized images
├── icons/                  # SVG icons and favicon
├── flags/                  # Country flag images
└── [static files]          # Robots.txt, sitemap fallbacks
```

## Testing Organization

Tests are co-located with source code using `__tests__/` directories:

- Unit tests focus on business logic
- Integration tests for service layer
- Component tests for complex interactions
- No visual/UI testing (following project guidelines)

## Performance Considerations

### Code Splitting

- Automatic route-based splitting via Next.js
- Dynamic imports for heavy components
- Service layer functions optimized for tree-shaking

### Asset Optimization

- Next.js Image component for automatic optimization
- SVG icons loaded efficiently
- Font optimization through next/font

### Bundle Analysis

- Regular bundle size monitoring
- Lazy loading for non-critical features
- Efficient dependency management

---

## Development Guidelines

### Adding New Routes

1. Follow App Router conventions
2. Include proper TypeScript typing
3. Add loading and error states
4. Implement SEO metadata
5. Test across all supported locales

### Adding New Components

1. Start with Server Component
2. Move to Client Component only if needed
3. Define clear prop interfaces
4. Follow established naming patterns
5. Include proper documentation

### Modifying Database Schema

1. Use Drizzle Kit migrations
2. Test migration in development
3. Ensure backward compatibility
4. Update TypeScript interfaces
5. Add appropriate indexes

---

_This document should be updated when significant structural changes are made to the codebase._
