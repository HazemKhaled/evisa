# GetTravelVisa.com Frontend Architecture Document

## Document Information

- **Version**: v2.0
- **Date**: September 2024
- **Author**: System Architect Team
- **Status**: Active Development

---

## 1. Template and Framework Selection

### Current Frontend Foundation Analysis

**Existing Next.js 15 Implementation Discovered:**

- **Framework**: Next.js 15.4.7 with App Router (modern routing system)
- **Build Tool**: Turbopack for development (Next.js native)
- **Styling**: Tailwind CSS 4.1.13 with custom design tokens
- **Internationalization**: i18next 25.5.2 with 8-language support
- **Content**: MDX support with gray-matter for blog system
- **UI Components**: Custom component library with DestinationCard, VisaTypeCard, etc.
- **Database Integration**: Drizzle ORM with service layer patterns

**Pre-existing Directory Structure Found:**

```
src/
├── app/                     # Next.js App Router
│   ├── [locale]/           # Internationalized routes
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # UI component library
│   ├── layout/            # Header, Footer components
│   └── ui/                # Reusable UI components
├── lib/                   # Business logic and utilities
│   ├── db/                # Database schema and services
│   ├── services/          # Business service layer
│   └── utils/             # Utility functions
└── i18n/                  # Internationalization setup
```

**Key Architectural Decisions Already Made:**

- Next.js App Router over Pages Router (server-first approach)
- Server Components by default with selective Client Components
- RTL support for Arabic language with `dir` attribute switching
- Cairo font from Google Fonts for typography
- Tailwind CSS utility-first styling approach
- Service layer pattern for database operations

### Framework Selection Decision

**Decision**: Continue with existing Next.js 15 App Router foundation - no starter template needed

**Rationale**: Your codebase demonstrates mature Next.js patterns with proper internationalization, component architecture, and service layer implementation. The foundation is solid and aligns with modern React/Next.js best practices.

**Change Log**:
| Date | Version | Description | Author |
|------|---------|-------------|---------|
| Sept 2024 | v1.0 | Initial frontend architecture analysis | System Architect |

---

## 2. Frontend Tech Stack

### Technology Stack Table

| Category              | Technology                   | Version            | Purpose                              | Rationale                                                                                     |
| --------------------- | ---------------------------- | ------------------ | ------------------------------------ | --------------------------------------------------------------------------------------------- |
| **Framework**         | Next.js                      | 15.4.7             | React meta-framework with App Router | Server-side rendering for SEO, excellent i18n support, optimal for content-heavy visa catalog |
| **UI Library**        | React                        | 19.1.1             | Component-based UI library           | Latest stable React with concurrent features, server components support                       |
| **State Management**  | React Built-in + URL State   | Native             | Component and URL-based state        | Minimal state needs for content-focused app, URL state for filtering/search                   |
| **Routing**           | Next.js App Router           | Native             | File-system based routing            | Perfect for `/d/{country}` structure, automatic SEO optimization                              |
| **Build Tool**        | Turbopack                    | Native             | Development bundler                  | Ultra-fast development builds, Next.js integrated                                             |
| **Styling**           | Tailwind CSS                 | 4.1.13             | Utility-first CSS framework          | Rapid development, excellent RTL support, consistent design system                            |
| **Testing**           | Jest + React Testing Library | 30.1.3 + 16.3.0    | Unit and integration testing         | Standard React testing stack, existing setup                                                  |
| **Component Library** | Custom + Headless UI         | Custom             | Reusable UI components               | Tailored to visa platform needs, accessibility-first                                          |
| **Form Handling**     | React Hook Form              | 7.x (recommended)  | Form state and validation            | Lightweight, excellent TypeScript support, minimal re-renders                                 |
| **Animation**         | Framer Motion                | 11.x (recommended) | UI animations and transitions        | React-first animations, great for destination card interactions                               |
| **Dev Tools**         | TypeScript + ESLint          | 5.9.2 + 9.35.0     | Type safety and code quality         | Strict mode enabled, existing configuration                                                   |

---

## 3. Project Structure

```plaintext
src/
├── app/                                    # Next.js App Router
│   ├── [locale]/                          # Internationalized routes
│   │   ├── d/                             # Destination catalog routes
│   │   │   ├── page.tsx                   # All destinations listing
│   │   │   ├── [country]/                 # Individual destination pages
│   │   │   │   ├── page.tsx               # Destination overview
│   │   │   │   ├── blog/                  # Destination-specific blog
│   │   │   │   │   └── page.tsx           # Blog listing for destination
│   │   │   │   ├── v/                     # Visa-specific pages
│   │   │   │   │   └── [visa]/page.tsx    # Visa detail pages
│   │   │   │   ├── p/                     # Passport-specific pages
│   │   │   │   │   └── [passport]/page.tsx # Passport eligibility
│   │   │   │   └── sitemap.xml/route.ts   # Country sitemap generation
│   │   │   └── loading.tsx                # Destination loading UI
│   │   ├── blog/                          # Global blog routes
│   │   │   ├── page.tsx                   # All blog posts
│   │   │   ├── [slug]/page.tsx            # Individual blog posts
│   │   │   ├── t/                         # Tag-based filtering
│   │   │   │   └── [tag]/page.tsx         # Tag listing pages
│   │   │   └── sitemap.ts                 # Blog sitemap
│   │   ├── contact/                       # Contact page
│   │   │   └── page.tsx
│   │   ├── layout.tsx                     # Locale-specific layout
│   │   └── page.tsx                       # Localized homepage
│   ├── api/                               # API routes
│   │   ├── countries/                     # Country data endpoints
│   │   │   └── route.ts
│   │   ├── visa-eligibility/              # Visa eligibility API
│   │   │   └── route.ts
│   │   ├── affiliate/                     # Partner affiliate URLs
│   │   │   └── [provider]/route.ts
│   │   └── sitemap-index/                 # Dynamic sitemap index
│   │       └── route.ts
│   ├── globals.css                        # Global styles and design tokens
│   ├── layout.tsx                         # Root layout
│   ├── page.tsx                           # Homepage redirect to /en
│   ├── robots.ts                          # Robots.txt generation
│   ├── sitemap.ts                         # Main sitemap
│   └── sitemap-index.xml/                 # Sitemap index route
│       └── route.ts
├── components/                            # UI component library
│   ├── forms/                            # Form components
│   │   ├── search-form.tsx               # Homepage visa search
│   │   ├── contact-form.tsx              # Contact page form
│   │   └── newsletter-signup.tsx         # Email subscription
│   ├── layout/                           # Layout components
│   │   ├── header.tsx                    # Main navigation
│   │   ├── footer.tsx                    # Site footer
│   │   ├── breadcrumbs.tsx               # Navigation breadcrumbs
│   │   └── index.ts                      # Layout exports
│   ├── ui/                               # Reusable UI components
│   │   ├── destination-card.tsx          # Country destination cards
│   │   ├── visa-type-card.tsx            # Visa option cards
│   │   ├── related-article-card.tsx      # Blog post cards
│   │   ├── affiliate-button.tsx          # "Apply Now" partner buttons
│   │   ├── eligibility-badge.tsx         # Visa availability indicators
│   │   ├── country-selector.tsx          # Passport country dropdown
│   │   ├── loading-skeleton.tsx          # Content loading states
│   │   └── index.ts                      # UI component exports
│   ├── seo/                              # SEO-specific components
│   │   ├── json-ld.tsx                   # Structured data wrapper
│   │   ├── meta-tags.tsx                 # Dynamic meta tags
│   │   └── canonical-link.tsx            # Canonical URL handling
│   ├── blog/                             # Blog-specific components
│   │   ├── blog-post-content.tsx         # MDX content renderer
│   │   ├── blog-navigation.tsx           # Previous/next navigation
│   │   ├── tag-list.tsx                  # Blog tag display
│   │   └── related-posts.tsx             # Related articles
│   ├── language-switcher.tsx             # Multi-language selector
│   ├── mdx-content.tsx                   # MDX content wrapper
│   └── static-page-layout.tsx            # Static page wrapper
├── lib/                                  # Business logic and utilities
│   ├── db/                               # Database layer
│   │   ├── connection.ts                 # Drizzle connection setup
│   │   ├── schema/                       # Database schema definitions
│   │   │   ├── countries.ts              # Countries and translations
│   │   │   ├── visa-types.ts             # Visa types and i18n
│   │   │   ├── visa-eligibility.ts       # Eligibility relationships
│   │   │   ├── affiliate-partners.ts     # Partner configuration
│   │   │   └── index.ts                  # Schema exports
│   │   └── migrations/                   # Database migrations
│   ├── services/                         # Business service layer
│   │   ├── country-service.ts            # Country data operations
│   │   ├── visa-service.ts               # Visa eligibility logic
│   │   ├── affiliate-service.ts          # Partner URL generation
│   │   ├── blog-service.ts               # Blog content management
│   │   ├── seo-service.ts                # SEO data generation
│   │   └── index.ts                      # Service exports
│   ├── utils/                            # Utility functions
│   │   ├── flags.ts                      # Country flag utilities
│   │   ├── urls.ts                       # URL generation helpers
│   │   ├── translations.ts               # i18n helper functions
│   │   ├── pagination.ts                 # Content pagination
│   │   ├── styles.ts                     # Tailwind utility helpers
│   │   └── index.ts                      # Utility exports
│   ├── consts/                           # Application constants
│   │   ├── env.ts                        # Environment variables
│   │   ├── countries.ts                  # Static country data
│   │   └── index.ts                      # Constants exports
│   ├── hooks/                            # Custom React hooks
│   │   ├── use-country-search.ts         # Country search logic
│   │   ├── use-visa-eligibility.ts       # Eligibility checking
│   │   ├── use-locale.ts                 # Internationalization
│   │   └── index.ts                      # Hook exports
│   ├── types/                            # TypeScript type definitions
│   │   ├── database.ts                   # Database entity types
│   │   ├── api.ts                        # API request/response types
│   │   ├── blog.ts                       # Blog content types
│   │   ├── affiliate.ts                  # Partner integration types
│   │   └── index.ts                      # Type exports
│   ├── blog.ts                           # Blog content utilities
│   ├── json-ld.ts                        # Structured data generators
│   ├── mdx.ts                            # MDX processing utilities
│   └── utils.ts                          # General utility functions
├── i18n/                                 # Internationalization
│   ├── locales/                          # Translation files
│   │   ├── en/                           # English translations
│   │   │   ├── common.json               # Common UI text
│   │   │   ├── pages.json                # Page-specific content
│   │   │   ├── hero.json                 # Homepage content
│   │   │   ├── features.json             # Feature descriptions
│   │   │   └── destinations.json         # Destination metadata
│   │   ├── ar/                           # Arabic translations
│   │   ├── es/                           # Spanish translations
│   │   ├── pt/                           # Portuguese translations
│   │   ├── ru/                           # Russian translations
│   │   ├── de/                           # German translations
│   │   ├── fr/                           # French translations
│   │   └── it/                           # Italian translations
│   ├── settings.ts                       # i18next configuration
│   ├── client.ts                         # Client-side i18n
│   └── index.ts                          # Server-side i18n
├── content/                              # Static content
│   └── blog/                             # Blog posts by language
│       ├── en/                           # English blog posts
│       │   └── *.mdx                     # Individual blog posts
│       ├── ar/                           # Arabic blog posts
│       ├── es/                           # Spanish blog posts
│       └── [other-languages]/
├── public/                               # Static assets
│   ├── images/                           # Image assets
│   │   ├── flags/                        # Country flag images
│   │   ├── destinations/                 # Destination photos
│   │   └── blog/                         # Blog post images
│   ├── icons/                            # Icon assets
│   └── favicon.ico                       # Site favicon
└── middleware.ts                         # Next.js middleware for i18n
```

---

## 4. Component Standards

### Component Template

````typescript
"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface ExampleComponentProps {
  /** Primary content or data for the component */
  children?: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Component variant for different visual styles */
  variant?: "default" | "featured" | "minimal";
  /** Loading state indicator */
  loading?: boolean;
  /** Locale for internationalization */
  locale: string;
  /** Click handler for interactive components */
  onClick?: () => void;
}

/**
 * ExampleComponent provides a reusable UI element following GetTravelVisa design patterns.
 *
 * @example
 * ```tsx
 * <ExampleComponent
 *   variant="featured"
 *   locale="en"
 *   className="mb-4"
 * >
 *   Content here
 * </ExampleComponent>
 * ```
 */
export function ExampleComponent({
  children,
  className,
  variant = "default",
  loading = false,
  locale,
  onClick,
}: ExampleComponentProps) {
  const { t } = useTranslation("common", { lng: locale });

  const baseStyles = "relative rounded-lg shadow-sm transition-colors duration-200";
  const variantStyles = {
    default: "bg-white border border-gray-200 hover:border-gray-300",
    featured: "bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200",
    minimal: "bg-transparent border-0",
  };

  if (loading) {
    return (
      <div className={cn(baseStyles, variantStyles.default, "animate-pulse", className)}>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
}

// Default export for dynamic imports
export default ExampleComponent;
````

### Naming Conventions

**File and Component Naming:**

- **Components**: PascalCase for component names (`DestinationCard`, `VisaTypeCard`)
- **Files**: kebab-case for file names (`destination-card.tsx`, `visa-eligibility-badge.tsx`)
- **Directories**: kebab-case for folder names (`ui/`, `affiliate-partners/`)
- **API Routes**: kebab-case following REST conventions (`visa-eligibility/`, `countries/`)

**TypeScript Interface Naming:**

- **Props Interfaces**: `ComponentNameProps` (e.g., `DestinationCardProps`)
- **Data Interfaces**: Domain-based naming (e.g., `Country`, `VisaType`, `AffiliatePartner`)
- **Service Interfaces**: Service-based naming (e.g., `CountryService`, `VisaEligibilityService`)
- **API Types**: HTTP method + endpoint (e.g., `GetCountriesResponse`, `PostVisaEligibilityRequest`)

---

## 5. State Management

### Store Structure

```plaintext
src/lib/state/
├── url-state/                             # URL-based state management
│   ├── search-params.ts                   # Search and filter state
│   ├── locale-state.ts                    # Language switching state
│   └── pagination-state.ts               # Content pagination state
├── client-state/                          # React client state
│   ├── ui-state.ts                        # Modal, dropdown, loading states
│   ├── form-state.ts                      # Form validation and submission
│   └── cache-state.ts                     # Client-side data caching
├── server-state/                          # Server-rendered state
│   ├── destination-state.ts               # Pre-fetched destination data
│   ├── visa-eligibility-state.ts          # Server-computed eligibility
│   └── blog-state.ts                      # Pre-rendered blog content
└── hooks/                                 # Custom state management hooks
    ├── use-search-state.ts                # Search form state management
    ├── use-visa-filter.ts                 # Visa filtering logic
    ├── use-affiliate-tracking.ts          # Partner link tracking
    └── index.ts                           # Hook exports
```

### State Management Template

```typescript
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { type Country, type VisaType } from "@/lib/types/database";

// URL State Management for Search and Filtering
export function useVisaSearchState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract current state from URL
  const passportCountry = searchParams.get("passport") || "";
  const destinationCountry = searchParams.get("destination") || "";
  const visaTypes = searchParams.get("types")?.split(",") || [];

  // Update URL with new search state
  const updateSearchState = useCallback(
    (updates: {
      passport?: string;
      destination?: string;
      visaTypes?: string[];
    }) => {
      const params = new URLSearchParams(searchParams);

      if (updates.passport !== undefined) {
        updates.passport
          ? params.set("passport", updates.passport)
          : params.delete("passport");
      }

      if (updates.destination !== undefined) {
        updates.destination
          ? params.set("destination", updates.destination)
          : params.delete("destination");
      }

      if (updates.visaTypes !== undefined) {
        updates.visaTypes.length > 0
          ? params.set("types", updates.visaTypes.join(","))
          : params.delete("types");
      }

      const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return {
    // Current state
    passportCountry,
    destinationCountry,
    visaTypes,
    // State updaters
    setPassportCountry: (country: string) =>
      updateSearchState({ passport: country }),
    setDestinationCountry: (country: string) =>
      updateSearchState({ destination: country }),
    setVisaTypes: (types: string[]) => updateSearchState({ visaTypes: types }),
    clearSearch: () =>
      updateSearchState({ passport: "", destination: "", visaTypes: [] }),
  };
}
```

---

## 6. API Integration

### Service Template

```typescript
import {
  type Country,
  type VisaType,
  type VisaEligibility,
} from "@/lib/types/database";
import { db } from "@/lib/db/connection";
import { countries, visaTypes, visaEligibility } from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";

/**
 * VisaEligibilityService handles all visa eligibility checking and related operations
 */
export class VisaEligibilityService {
  /**
   * Check visa eligibility for a specific passport-destination combination
   * @param passportCountry - ISO country code of passport issuing country
   * @param destinationCountry - ISO country code of destination country
   * @param locale - Language locale for translated content
   * @returns Array of available visa types with details
   */
  static async checkEligibility(
    passportCountry: string,
    destinationCountry: string,
    locale: string = "en"
  ): Promise<VisaType[]> {
    try {
      // Input validation
      if (!passportCountry || !destinationCountry) {
        throw new VisaEligibilityError(
          "Missing required parameters: passportCountry and destinationCountry"
        );
      }

      if (passportCountry === destinationCountry) {
        return []; // No visa required for domestic travel
      }

      // Query visa eligibility with translations
      const eligibleVisas = await db
        .select({
          visaType: visaTypes,
          eligibility: visaEligibility,
        })
        .from(visaEligibility)
        .innerJoin(visaTypes, eq(visaTypes.id, visaEligibility.visaTypeId))
        .where(
          and(
            eq(visaEligibility.passportCountryCode, passportCountry),
            eq(visaEligibility.destinationCountryCode, destinationCountry),
            eq(visaEligibility.available, true)
          )
        );

      // Transform and localize results
      const localizedVisas = await Promise.all(
        eligibleVisas.map(async ({ visaType, eligibility }) => ({
          ...visaType,
          // Get localized name and description
          localizedName: await this.getLocalizedVisaName(visaType.id, locale),
          localizedDescription: await this.getLocalizedVisaDescription(
            visaType.id,
            locale
          ),
          // Include eligibility-specific details
          processingTime: eligibility.processingTimeMin,
          processingTimeMax: eligibility.processingTimeMax,
          fees: eligibility.fees,
          validity: eligibility.validityPeriod,
          multipleEntry: eligibility.multipleEntry,
          requirements: eligibility.requirements,
        }))
      );

      return localizedVisas;
    } catch (error) {
      console.error(
        "[VisaEligibilityService] Error checking eligibility:",
        error
      );
      throw new VisaEligibilityError(
        `Failed to check visa eligibility for ${passportCountry} -> ${destinationCountry}`,
        { cause: error }
      );
    }
  }
}
```

### API Client Configuration

```typescript
/**
 * API client configuration with error handling and interceptors
 */

// Custom fetch wrapper with error handling and logging
export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Make HTTP request with error handling and retries
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData
        );
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType?.includes("application/json")) {
        return await response.json();
      }

      return (await response.text()) as unknown as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      console.error("[ApiClient] Request failed:", { url, error });
      throw new ApiError("Network request failed", 500, {
        originalError: error,
      });
    }
  }

  // HTTP method helpers
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const searchParams = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request<T>(`${endpoint}${searchParams}`);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}
```

---

## 7. Routing

### Route Configuration

```typescript
/**
 * Next.js 15 App Router configuration with internationalized routing
 */

// middleware.ts - Internationalization routing middleware
import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "ar", "es", "pt", "ru", "de", "fr", "it"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  // Check for locale in pathname
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return pathname.split("/")[1];
  }

  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const headers = { "accept-language": acceptLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle country subdomain redirects (uae.gettravelvisa.com -> /en/d/uae)
  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  if (subdomain && subdomain !== "www" && subdomain !== "gettravelvisa") {
    const locale = getLocale(request);
    const destinationUrl = new URL(`/${locale}/d/${subdomain}`, request.url);

    // Set canonical redirect headers
    const response = NextResponse.redirect(destinationUrl, 301);
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return response;
  }

  // Handle root path redirect to default locale
  if (pathname === "/") {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.next();
}
```

---

## 8. Styling Guidelines

### Styling Approach

**Utility-First Methodology with Tailwind CSS:**

- **Component-Scoped Styling**: Use Tailwind utilities within components, avoid global CSS except for design tokens
- **Design System Integration**: Leverage Tailwind's custom design tokens for consistent brand colors, spacing, and typography
- **RTL-First Approach**: Design components to work seamlessly in both LTR and RTL layouts
- **Performance Optimization**: Purge unused CSS classes, optimize for minimal bundle size
- **Responsive Design**: Mobile-first approach with systematic breakpoint usage

### Global Theme Variables

```css
/* globals.css - Design system variables and base styles */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS Custom Properties for Design System */
:root {
  /* Brand Colors */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;

  /* Typography Scale */
  --font-family-primary:
    "Cairo", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem; /* 36px */
  --font-size-5xl: 3rem; /* 48px */
  --font-size-6xl: 3.75rem; /* 60px */

  /* Animation Durations */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
}

/* RTL-specific adjustments */
[dir="rtl"] {
  font-family: "Cairo", "Arabic UI Display", "Arabic UI Text", sans-serif;
}

/* Component layer for reusable patterns */
@layer components {
  /* Button variants */
  .btn-primary {
    @apply inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none;
  }

  /* Card variants */
  .card-base {
    @apply relative rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg;
  }

  /* Form components */
  .form-input {
    @apply block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm;
  }
}
```

---

## 9. Testing Requirements

### Component Test Template

```typescript
/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DestinationCard } from '../destination-card';
import { type Country } from '@/lib/types/database';

// Mock external dependencies
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/en/d/uae',
}));

// Mock data
const mockDestination: Country = {
  id: 'uae',
  code: 'AE',
  name: 'United Arab Emirates',
  localizedName: 'United Arab Emirates',
  region: 'Middle East',
  flagUrl: '/images/flags/uae.svg',
  featured: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

describe('DestinationCard', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders destination information correctly', () => {
      render(
        <DestinationCard
          destination={mockDestination}
          locale="en"
        />
      );

      expect(screen.getByText('United Arab Emirates')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /united arab emirates flag/i })).toBeInTheDocument();
      expect(screen.getByText('Middle East')).toBeInTheDocument();
    });

    it('applies featured styling when destination is featured', () => {
      render(
        <DestinationCard
          destination={{ ...mockDestination, featured: true }}
          locale="en"
        />
      );

      const card = screen.getByRole('article');
      expect(card).toHaveClass('border-blue-200', 'bg-gradient-to-br');
    });
  });

  describe('Internationalization', () => {
    it('renders correctly for RTL languages', () => {
      render(
        <DestinationCard
          destination={mockDestination}
          locale="ar"
        />
      );

      const card = screen.getByRole('article');
      expect(card).toHaveClass('text-right');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <DestinationCard
          destination={mockDestination}
          locale="en"
        />
      );

      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-label', expect.stringContaining('United Arab Emirates'));
      expect(card).toHaveAttribute('tabIndex', '0');
    });
  });
});
```

### Testing Best Practices

**Unit Testing Standards:**

- **Component Isolation**: Test components in isolation with mocked dependencies
- **User-Centric Testing**: Focus on user interactions rather than implementation details
- **Accessibility Testing**: Verify ARIA attributes, keyboard navigation, and screen reader support
- **Internationalization Testing**: Test RTL layouts, translated content, and locale-specific behavior
- **Error Boundary Testing**: Verify graceful degradation when components receive invalid props

**Integration Testing Patterns:**

- **Service Layer Testing**: Test database operations, API calls, and business logic
- **Route Integration**: Test Next.js routing with locale handling and parameter validation
- **Form Workflows**: Test complete user journeys from search to affiliate partner redirection
- **SEO Integration**: Verify meta tag generation, structured data, and sitemap functionality

---

## 10. Environment Configuration

### Required Environment Variables

```bash
# .env.local - Development environment
# Database Configuration
DATABASE_URL="file:./dev.db"
DATABASE_TOKEN="" # Leave empty for local development

# Application URLs
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"

# Internationalization
NEXT_PUBLIC_DEFAULT_LOCALE="en"
NEXT_PUBLIC_SUPPORTED_LOCALES="en,ar,es,pt,ru,de,fr,it"

# Analytics & Monitoring
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
SENTRY_DSN="your-sentry-dsn"

# Affiliate Partner Configuration
AFFILIATE_ENCRYPTION_KEY="your-32-char-encryption-key-here"
AFFILIATE_API_TIMEOUT="10000"

# Feature Flags
NEXT_PUBLIC_ENABLE_AFFILIATE_PARTNERS="true"
NEXT_PUBLIC_ENABLE_BLOG="true"
NEXT_PUBLIC_ENABLE_SEARCH="true"
NEXT_PUBLIC_ENABLE_ANALYTICS="true"
```

### TypeScript Environment Configuration

```typescript
// lib/consts/env.ts - Type-safe environment variables
import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1),
  DATABASE_TOKEN: z.string().optional(),

  // Application
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),

  // Internationalization
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string().min(2),
  NEXT_PUBLIC_SUPPORTED_LOCALES: z.string().min(1),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_AFFILIATE_PARTNERS: z
    .string()
    .transform(val => val === "true"),
  NEXT_PUBLIC_ENABLE_BLOG: z.string().transform(val => val === "true"),
  NEXT_PUBLIC_ENABLE_SEARCH: z.string().transform(val => val === "true"),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.string().transform(val => val === "true"),

  NODE_ENV: z.enum(["development", "staging", "production"]),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error("❌ Invalid environment variables:");
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        console.error(`  ${err.path.join(".")}: ${err.message}`);
      });
    }
    process.exit(1);
  }
}

// Export validated environment variables
export const env = validateEnv();
```

---

## 11. Frontend Developer Standards

### Critical Coding Rules

**Framework-Specific Rules (Next.js 15 + App Router):**

1. **Server Components First**: Always use Server Components by default. Only add `"use client"` when you need:
   - Event handlers (onClick, onChange, etc.)
   - Browser APIs (localStorage, geolocation, etc.)
   - React hooks (useState, useEffect, etc.)
   - Third-party libraries that require client-side JavaScript

2. **Async Server Components**: Server Components can be async functions. Use this for data fetching:

   ```typescript
   // ✅ Correct
   export default async function DestinationPage() {
     const destinations = await getDestinations();
     return <DestinationList destinations={destinations} />;
   }

   // ❌ Wrong - don't use useEffect in Server Components
   export default function DestinationPage() {
     const [destinations, setDestinations] = useState([]);
     useEffect(() => { /* ... */ }, []); // This will error!
   }
   ```

3. **TypeScript Safety Rules**: Never use `any` - use proper types or `unknown`:

   ```typescript
   // ✅ Correct
   interface DestinationProps {
     destination: Country;
     locale: string;
   }

   // ❌ Wrong
   function DestinationCard(props: any) {}
   ```

4. **Service Layer Usage**: Always use service layer, never direct database access in components:

   ```typescript
   // ✅ Correct
   const destinations = await CountryService.getDestinations(locale);

   // ❌ Wrong - direct database access
   const destinations = await db.select().from(countries);
   ```

### Quick Reference

**Common Commands:**

```bash
# Development
pnpm dev                    # Start development server with Turbopack
pnpm build                 # Build for production
pnpm lint                  # Run ESLint
pnpm type-check           # Run TypeScript check

# Database
pnpm db:generate           # Generate Drizzle migrations
pnpm db:migrate            # Apply migrations
pnpm db:studio             # Open Drizzle Studio

# Testing
pnpm test                  # Run unit tests
pnpm test:e2e             # Run E2E tests

# Deployment
pnpm deploy:staging       # Deploy to staging
pnpm deploy:production    # Deploy to production
```

**Key Import Patterns:**

```typescript
// Framework imports
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

// Component imports
import { DestinationCard } from "@/components/ui/destination-card";
import { JsonLd } from "@/components/seo/json-ld";

// Service imports
import { getDestinations } from "@/lib/services/country-service";
import { checkVisaEligibility } from "@/lib/services/visa-service";

// Utility imports
import { cn } from "@/lib/utils";
import { env } from "@/lib/consts/env";
```

---

## Implementation Notes

This frontend architecture document provides comprehensive guidance for implementing GetTravelVisa.com's destination catalog enhancement. The architecture leverages Next.js 15 App Router capabilities while maintaining performance, accessibility, and SEO optimization for international users.

**Key Success Factors:**

- Server Components for optimal SEO and performance
- Comprehensive internationalization with RTL support
- Type-safe development with TypeScript strict mode
- Component-driven architecture with reusable patterns
- Performance-first approach with static generation and caching

**Post-Implementation Benefits:**

- Consistent development patterns across all features
- Optimal Core Web Vitals for global users
- Comprehensive testing coverage for quality assurance
- Maintainable codebase with clear architectural boundaries

---

_This Frontend Architecture Document is designed for implementation by AI agents and development teams familiar with Next.js 15, TypeScript, and modern React patterns. All specifications align with the existing codebase and established development practices._
