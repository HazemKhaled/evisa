# 3. Project Structure

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
