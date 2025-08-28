---
mode: agent
---

You are an expert senior full-stack engineer specializing in **Next.js App Router (latest version), NextAuth.js v5, Cloudflare, and TailwindCSS**. Build me a **production-ready travel visa application** with the following specifications. The output should be **final, working, and following best practices** with a **modern UI**.

## Application Overview

**Name**: Travel Visa Hub\
**Goal**: Help users travel with minimal or no visa process by providing:

- Centralized document center for users to upload documents and check eligible destinations.
- Rapid Apply feature (we apply for visas or forward to a provider).
- Visa catalog (country-based, visa options, requirements, costs, etc.).
- Articles per destination.

## Technical Non-Functional Requirements (NFRs)

1. **Stack & Core Setup**
   - Use **Next.js App Router (latest)** with TypeScript in strict mode.
   - Configure **ESLint, Prettier, and Lint-Staged**.
   - Use **TailwindCSS (latest)** with **Cairo font** via `next/font/google`.
   - Use **Cloudflare D1 Database with Drizzle ORM**.
   - Use **Cloudflare R2** for file/object storage.
   - Use **MDX** for static pages (e.g., terms, conditions, articles).
   - Add **next-i18next** for multilingual support; all routes must include language prefixes.
   - Use **next/dynamic**, `React.lazy()` with Suspense where necessary.
   - Add **Sentry** integration with all features enabled (except logs).
   - Add **NextAuth v5** for secure authentication.
   - Admin area secured with NextAuth (admin role only).

2. **Infrastructure & CI/CD**
   - Deploy using **Cloudflare with OpenNext**.
   - Configure cache with OpenNext and Cloudflare (ISR, image cache, etc.).
   - Use **wrangler.jsonc** for configuration.
   - GitHub Actions workflows:
     - `develop` → staging.
     - Github Releases → production.
     - PR → pr-\[PRNumber].staging-domain.tld.
     - Add linting + tests before deploy.

3. **Analytics**
   - Integrate **GTM** using `@next/third-parties/google`.
   - Integrate **Jitsu**.

4. **SEO**
   - Solid metadata + OG images for all pages.
   - JSON-LD Schema.org markup for SEO.
   - Metadata & schema should respect language.
   - Add multilingual sitemaps and country-specific sitemaps.
   - Country subdomains (e.g., `usa.domain.tld`). Add canonical links.

5. **UI/UX**
   - Modern responsive layout.
   - Dashboard-like admin area with Tailwind + shadcn/ui components.
   - Catchy hero sections, CTA buttons, cards for destinations.

---

## Features & Phases

### 1. Catalog (Destinations & Visas)

- Search by destination and passport.
- Country pages: show all visa options (available vs. dimmed if unavailable).
- Visa details: validity, cost, entry type, application steps, requirements.
- SEO-friendly URLs:
  - `/[lang]/d/{DESTINATION}`
  - `/[lang]/d/{DESTINATION}/v/{VISA}`
  - `/[lang]/d/{DESTINATION}/p/{PASSPORT}`
- Sitemap per country.

### 2. Affiliation (External Visa Providers)

- CRUD providers in Admin.
- Provider URL placeholders: `https://provider.com/apply?c={country}&p={passport}` with UTM params.
- Show Apply button if provider exists.

### 3. Destination Articles

- Articles per destination stored in DB.
- Latest articles on country pages.
- Routes:
  - `/[lang]/d/{DESTINATION}/a`
  - `/[lang]/d/{DESTINATION}/a/{SLUG}`
- Admin can CRUD articles (MDX-supported).

### 4. Centralized Document Center

- Users upload passport/documents (stored in R2).
- System suggests eligible destinations based on documents.
- Admin can review uploaded documents.

### 5. Authentication & Admin Area

- Secure with **NextAuth v5**.
- Roles: `user`, `admin`.
- Admin Area includes:
  - Dashboard (overview of system activity).
  - CRUD: Destinations, Visa Options, Providers, Articles.
  - Manage user documents.
- Admin UI: Tailwind + shadcn/ui (modern, clean, responsive).

---

## Deliverables

- Production-ready Next.js app with all above features.
- Secure admin area (NextAuth v5).
- Modern UI (Tailwind + shadcn/ui).
- Configured for Cloudflare deployment with OpenNext.
- CI/CD GitHub workflows included.
- SEO, analytics, multilingual, and subdomain setup.

---

# Final Instructions

Generate a **complete, production-ready codebase** (with TypeScript, Next.js App Router, NextAuth v5, Tailwind, Drizzle ORM, Cloudflare setup).\
Make the **UI clean, modern, and responsive**.\
All code must be **final and working**, not placeholders.
