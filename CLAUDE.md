# eVisa

A comprehensive Next.js application for electronic visa processing that helps users travel with minimal visa requirements through a centralized document center, rapid visa application services, and destination-driven content.

## Project Objectives

- Help users travel with minimal or no visa process
- Centralized Document Center: Collect documents and list available destinations
- Rapid Apply: Handle visa processes or forward to visa service agencies
- Visa Catalog: Create destination-driven, engaging content about visa requirements

## Development Commands

```bash
# Start development server with Turbopack
pnpm dev

# Build the application
pnpm build

# Run linting
pnpm lint

# Deploy to Cloudflare
pnpm deploy

# Preview deployment
pnpm preview

# Generate Cloudflare types
pnpm cf-typegen
```

## Tech Stack & Architecture

### Core Technologies
- **Framework**: Next.js 15.4.6 with App Router (never use Pages Router)
- **React**: Version 19.1.0
- **TypeScript**: Strict mode enabled throughout
- **Styling**: Tailwind CSS v4 with mobile-first responsive design
- **Font**: Cairo font via `next/font/google`
- **Package Manager**: pnpm (never use npm)

### Database & Storage
- **Database**: Cloudflare D1 with Drizzle ORM
- **Object Storage**: Cloudflare R2
- **Deployment**: Cloudflare via OpenNext.js with ISG cache configuration

### Features & Integrations
- **Internationalization**: next-i18next for multilingual support
- **Authentication**: NextAuth 5 for admin area
- **Analytics**: GTM via @next/third-parties/google + Jitsu
- **Error Tracking**: Sentry integration (all features except logs)
- **Content**: MDX for all static pages
- **Performance**: Dynamic loading, lazy loading, Suspense boundaries

## Code Standards

### TypeScript
- Use interfaces over types
- Avoid enums, use maps instead
- Functional components with explicit interfaces
- No 'any[]' types - define proper interfaces
- Function parameters must have explicit types
- Don't export types/functions unless shared across components

### Naming Conventions
- Directories: lowercase with dashes (e.g., `components/auth-wizard`)
- Components: PascalCase with named exports
- Files: kebab-case for directories, PascalCase for components

### Performance & Best Practices
- Use 'use client' over React Server Components when needed
- Wrap client components in Suspense with fallbacks
- Optimize images: WebP format, size data, lazy loading
- Use Static for static pages, ISR for dynamic pages
- Implement proper metadata and JSON-LD on all pages

### Git Conventions
- **Commits**: `<type>(<scope>): <description>` (e.g., `feat(catalog): implement social login`)
- **Branches**: `<type>/<description>` (e.g., `feature/add-checkout-flow`, `bugfix/gtm-event-fix`)
- **PR Titles**: Same as commit format with Sentry links for bugs

## Project Structure

### Key Directories
- `/src/app/` - Next.js app router pages and layouts
- `/src/components/` - Reusable React components with UI subfolder
- `/src/lib/` - Utility libraries (auth, db configurations)
- `/src/types/` - TypeScript type definitions
- `/src/i18n/` - Internationalization messages
- `/src/content/legal/` - Legal content (terms, privacy, etc.)
- `/docs/` - Project documentation including PRD

### Route Structure (Multilingual)
- `/[locale]/` - All routes include language parameter
- `/d/{DESTINATION_COUNTRY}` - Country-specific visa information
- `/d/{DESTINATION_COUNTRY}/v/{VISA_OPTION}` - Specific visa options
- `/d/{DESTINATION_COUNTRY}/p/{PASSPORT_COUNTRY}` - Passport-specific info
- `/d/{DESTINATION_COUNTRY}/a/{ARTICLE_SLUG}` - Destination articles
- Admin area with NextAuth 5 authentication

## Business Logic

### Phase 1: Visa Catalog
- Destination-based catalog with search by country and passport
- Visa options with fees, validity, requirements, and application info
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

## SEO & Marketing
- Schema.org markup (JSON-LD) on all pages respecting user language
- Comprehensive sitemap strategy with destination-specific sitemaps
- Metadata and OG images for all pages
- Primary focus on SEO for lead generation
- Personalized email campaigns for upselling

## Development Guidelines
- Always implement complete functionality (no TODOs or placeholders)
- Focus on readability over performance
- Use latest versions of all dependencies
- Implement proper error boundaries and loading states
- Follow Next.js best practices for metadata, manifest, sitemap, robots.txt
- All content and UI must support multiple languages