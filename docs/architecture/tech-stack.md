# Technology Stack - GetTravelVisa.com

## Document Information

- **Version**: v1.0
- **Date**: September 2024
- **Author**: Architecture Team
- **Status**: Active

---

## Overview

This document provides comprehensive details about the technology stack used in the GetTravelVisa.com multilingual visa processing platform. The stack is designed for modern web development with focus on performance, developer experience, and scalability.

## Frontend Framework

### Next.js 15.4.7

- **App Router**: Modern file-system based routing with React Server Components
- **Turbopack**: Next.js native bundler for development (faster than Webpack)
- **Static Generation (SSG)**: Pre-rendered pages for optimal SEO and performance
- **Server-Side Rendering (SSR)**: Dynamic content rendering when needed
- **Image Optimization**: Automatic image optimization and responsive images
- **Built-in CSS Support**: PostCSS and Sass support out of the box

**Key Features Used:**

- Server Components by default for better performance
- Client Components only when interactive features are required
- Automatic code splitting and lazy loading
- Route-based code splitting

### React 19.1.1

- **Concurrent Features**: Concurrent rendering for better user experience
- **React Server Components**: Server-rendered components for optimal performance
- **Hooks**: Modern state management and lifecycle methods
- **Strict Mode**: Development mode for catching bugs early

## UI Framework & Styling

### Tailwind CSS 4.1.13

- **Utility-First**: Utility classes for rapid UI development
- **Design Tokens**: Custom design system with consistent spacing and colors
- **Responsive Design**: Mobile-first responsive design approach
- **RTL Support**: Right-to-left language support for Arabic
- **Custom Components**: Reusable component patterns built with Tailwind

**Tailwind Configuration Features:**

```typescript
// tailwind.config.ts highlights
{
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-cairo)', 'system-ui'],
      },
      colors: {
        // Custom color palette
      }
    }
  }
}
```

### Typography

- **Cairo Font**: Google Fonts integration via `next/font/google`
- **Multi-language Support**: Font optimization for Latin and Arabic scripts
- **Font Display**: Optimized font loading with swap strategy

## Backend & Database

### Drizzle ORM 0.44.5

- **Type-Safe**: Full TypeScript integration with schema-to-type generation
- **SQL-First**: Direct SQL query building with type safety
- **Migration System**: Database schema versioning and migrations
- **Multi-Database Support**: SQLite for development, production flexibility

**Key Features:**

- Zero-runtime overhead
- Excellent IntelliSense and autocomplete
- Prepared statements for performance
- Relationship modeling

### Cloudflare D1 (SQLite)

- **Serverless Database**: Globally distributed SQLite database
- **Edge Computing**: Database at the edge for low latency
- **Cost Effective**: Pay-per-request pricing model
- **ACID Compliance**: Full transaction support

**Database Schema:**

- `countries` - Destination and passport issuing countries
- `visa_types` - Different visa options per destination
- `visa_eligibility` - Many-to-many eligibility relationships
- Internationalization tables for multilingual content

## Internationalization

### i18next 25.5.2

- **Multi-Language Support**: 8 languages (EN, ES, AR, PT, RU, DE, FR, IT)
- **Namespace Organization**: Structured translation files
- **Dynamic Language Loading**: On-demand translation loading
- **Plural Forms**: Complex plural rule support
- **Interpolation**: Variable substitution in translations

**Supporting Libraries:**

- `react-i18next` 15.7.3 - React bindings
- `i18next-browser-languagedetector` 8.2.0 - Browser language detection
- `i18next-resources-to-backend` 1.2.1 - Dynamic resource loading

**RTL Support:**

- Automatic layout direction switching
- Tailwind CSS directional utilities
- Arabic language optimization

## Content Management

### MDX Integration

- **@mdx-js/react** 3.1.1 - React MDX components
- **@next/mdx** 15.5.2 - Next.js MDX integration
- **gray-matter** 4.0.3 - Frontmatter parsing
- **remark-gfm** 4.0.1 - GitHub Flavored Markdown

**Content Features:**

- Blog system with frontmatter metadata
- Component-rich content with React integration
- Code syntax highlighting
- Table and list support

## Development Tools

### TypeScript 5.9.2

- **Strict Mode**: Maximum type safety
- **Path Mapping**: Clean import statements with aliases
- **Declaration Files**: Type definitions for all dependencies
- **JSDoc Support**: Enhanced documentation with type checking

### Code Quality Tools

#### ESLint 9.35.0

- **Next.js Configuration**: `eslint-config-next` 15.4.7
- **TypeScript Rules**: `@typescript-eslint/eslint-plugin` 8.42.0
- **React Hooks**: `eslint-plugin-react-hooks` 5.2.0
- **i18next Rules**: `eslint-plugin-i18next` 6.1.3
- **Prettier Integration**: `eslint-config-prettier` 10.1.8

#### Prettier 3.6.2

- **Tailwind Plugin**: `prettier-plugin-tailwindcss` 0.6.14
- **Consistent Formatting**: Automated code formatting
- **Editor Integration**: VSCode and other editor support

#### Husky 9.1.7 & lint-staged 16.1.6

- **Pre-commit Hooks**: Automated code quality checks
- **Staged File Processing**: Only process changed files
- **Git Hooks**: Prevent bad commits from reaching repository

## Testing Framework

### Jest 30.1.3

- **Unit Testing**: Component and function testing
- **Integration Testing**: Service layer and API testing
- **Coverage Reports**: Code coverage tracking
- **TypeScript Support**: `ts-jest` 29.4.1 configuration

#### Testing Libraries

- **@testing-library/react** 16.3.0 - React component testing
- **@testing-library/jest-dom** 6.8.0 - Custom Jest matchers
- **@testing-library/user-event** 14.6.1 - User interaction simulation
- **jest-environment-jsdom** 30.1.2 - DOM environment for tests

**Test Configuration:**

- Focus on business logic, not UI appearance
- Database service layer testing
- API route testing
- Utility function testing

## Deployment & Infrastructure

### Cloudflare Platform

- **Cloudflare Workers**: Serverless function execution
- **Cloudflare Pages**: Static site hosting with edge optimization
- **Cloudflare D1**: Distributed SQLite database
- **Cloudflare CDN**: Global content delivery network

### OpenNext.js 1.8.0

- **Cloudflare Optimization**: Next.js optimized for Cloudflare Workers
- **SSG Support**: Static site generation on Cloudflare
- **Edge Functions**: API routes as Cloudflare Workers
- **Image Optimization**: Cloudflare Image Optimization integration

### Build Tools & Deployment

#### Wrangler 4.34.0

- **Local Development**: Local Cloudflare Workers development
- **Database Management**: D1 database operations
- **Type Generation**: TypeScript types for Cloudflare environment
- **Deployment**: Production deployment automation

#### Build Scripts

```json
{
  "dev": "next dev --turbopack",
  "build": "tsx scripts/generate-blog-data.ts && next build",
  "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
  "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview"
}
```

## Analytics & Monitoring

### Error Tracking

- **Sentry**: Application error tracking and performance monitoring
- **Error Boundaries**: React error boundary components
- **Logging Strategy**: Structured logging with appropriate log levels

### Analytics

- **Google Tag Manager**: Tag management via `@next/third-parties`
- **Jitsu**: Privacy-focused analytics collection
- **Core Web Vitals**: Performance monitoring and optimization

## Development Environment

### Package Management

- **pnpm**: Fast, disk space efficient package manager
- **Lock File**: `pnpm-lock.yaml` for reproducible installs
- **Workspace Support**: Monorepo capabilities if needed

### Development Servers

- **Next.js Dev Server**: Hot reloading with Turbopack
- **Wrangler Dev**: Local Cloudflare Workers development
- **Database Studio**: Drizzle Studio for database management

## CI/CD Pipeline

### GitHub Actions

- **Automated Testing**: Run tests on every pull request
- **Code Quality**: ESLint and Prettier checks
- **Build Validation**: Ensure production builds succeed
- **Deployment**: Automated deployment to staging and production

### Branch Strategy

- `main` → `staging.gettravelvisa.com` (automatic)
- GitHub releases → `gettravelvisa.com` (automatic)
- Feature branches → Pull request validation

## Environment Configuration

### Configuration Files

- **wrangler.jsonc**: Cloudflare Workers configuration
- **next.config.ts**: Next.js configuration with OpenNext optimization
- **tailwind.config.ts**: Tailwind CSS configuration
- **drizzle.config.ts**: Database ORM configuration
- **jest.config.ts**: Testing framework configuration

### Environment Variables

- Database connection strings
- API keys and secrets
- Feature flags
- Analytics configuration

## Performance Characteristics

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Features

- Server-side rendering for dynamic content
- Static generation for marketing pages
- Image optimization and lazy loading
- Code splitting and bundle optimization
- CDN distribution via Cloudflare

## Security Features

### Built-in Security

- HTTPS enforcement
- Content Security Policy headers
- XSS protection
- CSRF protection via Next.js
- Secure environment variable handling

### Database Security

- Parameterized queries via Drizzle ORM
- Connection security
- Access control patterns
- Soft delete capabilities

---

## Version Management

This technology stack is actively maintained with regular updates:

- **Major Updates**: Planned quarterly reviews
- **Security Updates**: Applied immediately
- **Dependency Management**: Monthly dependency updates
- **Breaking Changes**: Thoroughly tested in staging environment

## Migration Considerations

### Future Scalability

- Database: Can migrate from D1 to larger SQL databases
- Hosting: Can migrate from Cloudflare to other platforms
- Framework: Next.js provides migration paths for framework updates
- UI: Tailwind CSS enables easy design system evolution

---

_This document reflects the current technology stack and should be updated when significant changes are made._
