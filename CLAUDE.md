# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. A multilingual travel visa processing application built with modern web technologies. Always refer to this document when working on the project to maintain consistency and quality.

## Project Overview

The eVisa platform helps users travel with minimal visa requirements through a centralized visa processing platform. It features destination-based visa catalogs, and comprehensive SEO optimization.

**Key Features:**

- Multilingual support with RTL layout
- Destination-based visa catalog with eligibility checking
- Blog for destination content
- Modern, responsive design with accessibility features

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

- **Drizzle ORM** with Cloudflare D1 SQLite database
- **Drizzle Kit** for schema management and migrations
- Well-structured schema for destinations, and visa types

### Internationalization

- **next-i18next** for multilingual content and routing
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
- **Cloudflare D1** for database

### CI/CD with OpenNext & Github Actions

- Follow OpenNext for CloudFlare to configure build and deploy the application https://opennext.js.org/cloudflare/howtos/dev-deploy
- Configure SSG https://opennext.js.org/cloudflare/caching#ssg-site
- Configure Cloudflare Image Optimization https://opennext.js.org/cloudflare/howtos/image
- Static assets for public folder https://opennext.js.org/cloudflare/howtos/assets
- `main` branch should deploy on staging-domain.tld
- Each GitHub release should deploy on production-domain.tld
- Each Pull Request should deploy on pr-PRNumber.staging-domain.tld
- Another GitHub Action to run tests and linting
- Use wrangler.jsonc instead of the .toml file

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
pnpm deploy             # Build and deploy to Cloudflare via OpenNext
pnpm preview            # Preview deployment locally
pnpm cf-typegen         # Generate Cloudflare types
```

## Project Architecture

### Current State
- **Framework**: Next.js with App Router and Turbopack for development
- **Styling**: Tailwind CSS (latest) 
- **Database**: Schema designed but Drizzle ORM not yet fully implemented
- **Internationalization**: next-i18next
- **Deployment**: OpenNext.js for Cloudflare Workers

### Directory Structure
```
src/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and design tokens
│   ├── layout.tsx               # Root layout
│   └── [locale]/                # Internationalized routes (to be implemented)
├── components/                   # Reusable components
│   ├── layout/                  # Layout components
│   └── ui/                      # Base UI components
├── lib/                         # Utility libraries
│   ├── db/                      # Database configuration
│   └── utils.ts                 # Utility functions
└── i18n/                        # Internationalization
```

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
```

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
- Each destination gets own sitemap: `/d/{DESTINATION_COUNTRY}/sitemap.xml`
- Implement subdomain structure: `{country-code}.production-domain.tld`
- Use canonical meta tags for destination pages
