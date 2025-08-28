# eVisa Platform - Claude Development Guide

This document provides comprehensive guidance for working on the eVisa platform, a multilingual travel visa processing application built with modern web technologies.

## Project Overview

The eVisa platform helps users travel with minimal visa requirements through a centralized visa processing platform. It features destination-based visa catalogs, affiliate partnerships with visa service providers, and comprehensive SEO optimization.

**Key Features:**

- Multilingual support (English/Arabic) with RTL layout
- Destination-based visa catalog with eligibility checking
- Affiliate integration with visa service providers
- Article system for destination content
- Modern, responsive design with accessibility features

## Technology Stack

### Core Framework

- **Next.js 15.4.6** with App Router and Turbopack for development
- **React 19.1.0** for UI components
- **TypeScript 5** with strict mode for type safety

### Styling & UI

- **Tailwind CSS v4** for styling with custom design tokens
- **Cairo font** via `next/font/google` for Arabic support
- **Lucide React 0.542.0** for consistent iconography
- Custom component library with reusable UI components

### Database & Backend

- **Drizzle ORM 0.44.5** with Cloudflare D1 SQLite database
- **Drizzle Kit 0.31.4** for schema management and migrations
- Well-structured schema for destinations, visa types, and articles

### Internationalization

- **next-intl 4.3.5** for multilingual content and routing
- Full RTL support for RTL languages
- Locale-based routing with `/[locale]/` structure

### Analytics & Monitoring

- **Sentry 10.7.0** for error tracking and performance monitoring
- **Google Tag Manager** via `@next/third-parties`
- **Jitsu 3.1.5** for analytics collection

### Deployment & Infrastructure

- **Cloudflare** deployment via **OpenNext.js**
- **Wrangler 4.33.0** for Cloudflare Workers management
- **Cloudflare R2** for object storage (configured but not yet implemented)

### Code Quality

- **ESLint 9** with Next.js and Prettier configurations
- **Prettier 3.6.2** for code formatting
- **Husky 9.1.7** and **lint-staged 16.1.5** for pre-commit hooks
- TypeScript strict mode with comprehensive type checking

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and design tokens
│   ├── layout.tsx               # Root layout
│   └── [locale]/                # Internationalized routes
│       ├── layout.tsx           # Locale-specific layout
│       └── page.tsx             # Homepage
├── components/                   # Reusable components
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Navigation header with language switcher
│   │   └── Hero.tsx             # Hero section with visa checker form
│   └── ui/                      # Base UI components
│       ├── Button.tsx           # Button component with variants
│       ├── Card.tsx             # Card component
│       └── LanguageSwitcher.tsx # Language toggle component
├── lib/                         # Utility libraries
│   ├── analytics.tsx            # GTM and Jitsu providers
│   ├── db/                      # Database configuration
│   │   ├── index.ts             # Database connection
│   │   └── schema.ts            # Drizzle schema definitions
│   └── utils.ts                 # Utility functions
├── i18n/                        # Internationalization
│   ├── routing.ts               # Routing configuration
│   └── request.ts               # Request handling for i18n
├── local/                      # Translation files
├── middleware.ts                # Next.js middleware for i18n
└── instrumentation.ts           # Sentry instrumentation
```

## Database Schema

The application uses a comprehensive database schema designed for visa catalog management:

### Core Tables

- **destinations**: Countries/destinations with multilingual names and descriptions
- **visaTypes**: Different visa options for each destination
- **passportCountries**: Countries that issue passports
- **visaEligibility**: Many-to-many relationship defining visa eligibility
- **visaServiceProviders**: External visa service providers for affiliate integration
- **visaProviderMappings**: Which providers handle which visa types
- **articles**: Destination-based content articles

### Key Features

- Full multilingual support with separate table languages
- Soft delete capabilities with `isActive` flags
- Automatic timestamps with `createdAt` and `updatedAt`
- Proper foreign key relationships and data integrity

## Component Library & Design System

### Design Tokens (globals.css)

```css
:root {
  --primary: #0066cc; /* Primary brand blue */
  --secondary: #00b386; /* Secondary brand green */
  --primary-dark: #004d99; /* Darker primary for hover states */
  --primary-light: #3399ff; /* Lighter primary for backgrounds */
}
```

### Component Architecture

- **Button**: Comprehensive button component with variants (primary, secondary, outline, ghost) and loading states
- **Card**: Flexible card component with consistent styling
- **Header**: Sticky navigation with responsive mobile menu and language switcher
- **Hero**: Main hero section with visa checker form
- **LanguageSwitcher**: Dropdown component for language selection with RTL support

### Styling Guidelines

- Use Tailwind utility classes for styling
- Leverage CSS custom properties for consistent theming
- Mobile-first responsive design approach
- RTL support with directional classes and layout adjustments

## Internationalization & RTL Support

### Language Configuration

```typescript
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/about": {
      en: "/about",
      ar: "/حول",
    },
  },
});
```

### RTL Implementation

- Dynamic `dir` attribute based on locale in layout
- RTL-aware CSS classes using Tailwind's directional utilities
- Proper text alignment and layout flipping for Arabic
- Icon positioning adjustments for RTL layouts

### Translation Structure

```json
{
  "Hero": {
    "headline": "Travel the World with Confidence",
    "subheadline": "Check visa requirements instantly"
  },
  "Navigation": {
    "home": "Home",
    "destinations": "Destinations"
  }
}
```

## Development Commands

### Development

```bash
pnpm dev                 # Start development server with Turbopack
pnpm build              # Build for production
pnpm start              # Start production server
```

### Code Quality

```bash
pnpm lint               # Run ESLint
pnpm lint:fix           # Fix ESLint issues
pnpm format             # Format code with Prettier
pnpm format:check       # Check formatting
```

### Database Management

```bash
pnpm db:generate        # Generate migrations
pnpm db:migrate         # Run migrations
pnpm db:studio          # Open Drizzle Studio
```

### Deployment

```bash
pnpm deploy             # Build and deploy to Cloudflare
pnpm preview            # Preview deployment locally
pnpm cf-typegen         # Generate Cloudflare types
```

## Development Guidelines

### Code Style

- Use TypeScript with strict mode enabled
- Follow Next.js App Router conventions
- Implement proper error boundaries and loading states
- Use server components by default, client components only when needed
- Follow the established component patterns for consistency

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

### SEO Considerations

- Implement proper metadata for all pages
- Use structured data (JSON-LD) for better search visibility
- Ensure proper URL structures for internationalization
- Generate dynamic sitemaps for destinations and articles

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
- Leverage Cloudflare R2 for object storage (when implemented)
- Configure proper caching strategies

### Environment Management

- Use environment-specific configurations
- Proper secret management for API keys
- Type-safe environment variables with TypeScript

## Common Issues & Solutions

### Sentry Dependencies

If you encounter Sentry-related import warnings, ensure these packages are installed:

```bash
pnpm add import-in-the-middle require-in-the-middle
```

### Husky Setup

For modern Husky setup, use:

```bash
npx husky init
```

### RTL Layout Issues

- Always test Arabic layout changes
- Use `rtl:` prefixes for RTL-specific styles
- Be mindful of icon and button positioning in RTL mode

### TypeScript Strict Mode

- Enable strict mode in tsconfig.json for better type safety
- Use proper type definitions for all props and state
- Implement proper error handling with typed catch blocks

## Business Logic & Development Phases

### Phase 1: Visa Catalog (Current)

- Destination-based catalog with search by country and passport
- Visa options display with fees, validity, requirements
- SEO-friendly URLs and comprehensive sitemap structure
- Subdomain strategy (e.g., uae.domain.tld, usa.domain.tld)

### Phase 2: Affiliate Integration

- Integration with visa service providers
- Dynamic URLs with placeholders and UTM tracking
- Admin CRUD for visa service providers

### Phase 3: Content Strategy

- Destination articles for each country
- Blog-style article listings and detail pages
- AI-generated content for SEO optimization

### Phase 4: In-house Services

- Direct visa processing capabilities
- Payment integration
- Document management system

This guide provides a comprehensive overview of the eVisa platform architecture and development practices. Always refer to this document when working on the project to maintain consistency and quality.
