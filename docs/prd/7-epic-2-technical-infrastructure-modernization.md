# 7. Epic 2: Technical Infrastructure & Architecture Modernization

**Epic Goal**: Modernize GetTravelVisa.com's technical foundation through UI component architecture upgrades, scalable monorepo structure, and comprehensive admin management capabilities to support future growth and operational efficiency.

**Integration Requirements**:

- Maintain all existing Epic 1 functionality (destination catalog, blog system, SEO)
- Preserve performance standards and deployment workflows
- Ensure backward compatibility with existing data and services
- Maintain internationalization and RTL support across all new systems

## Story 2.1: Shadcn + MagicUI UI Architecture Migration

As a **development team**,
I want **to migrate from vanilla Tailwind CSS to a modern component-driven architecture using Shadcn/UI and MagicUI**,
so that **we achieve rapid delivery, enhanced productivity, and create impressive, responsive, modern UX with pre-built animated components**.

**Acceptance Criteria:**

1. Foundation setup complete with Shadcn/UI and MagicUI registry configuration
2. Existing globals.css design tokens integrate seamlessly with Shadcn's CSS variables
3. Complete component mapping documentation from current to Shadcn/MagicUI equivalents
4. Core Shadcn components installed and functional (card, button, badge, avatar, etc.)
5. MagicUI animated components integrated (animated-grid-pattern, fade-text, blur-in, slide-in)
6. Advanced features functional (loading states, error boundaries, accessibility, RTL)
7. Design system constraints preserved (brand colors, Cairo font, UI patterns)
8. Performance standards met (60fps animations, 150-300ms micro-interactions)
9. Technical requirements maintained (TypeScript strict, WCAG 2.1 AA, SEO, i18next)
10. File scope compliance (only modify designated UI component files)

**Integration Verification:**

- IV1: All Epic 1 pages (destinations, blog, visa details) render correctly with new components
- IV2: Homepage maintains existing functionality with enhanced animations
- IV3: Mobile and RTL layouts function identically to previous implementation
- IV4: Performance metrics remain within acceptable thresholds (LCP < 2.5s)

## Story 2.2: Database Schema Migration Foundation

As a **system administrator**,
I want **the database schema to support dual country code formats during migration**,
so that **the application can transition safely from alpha-3 to alpha-2 codes without data loss or service interruption**.

**Acceptance Criteria:**

1. Countries table includes both alpha-3 (existing) and alpha-2 (new) columns with proper constraints
2. All foreign key relationships maintain referential integrity during dual-format period
3. Migration scripts are idempotent and include comprehensive validation checks
4. Rollback procedures are tested and documented for immediate recovery capability
5. Database performance remains within acceptable limits (<10% degradation) during migration

**Integration Verification:**

- IV1: All existing database queries continue to function without modification
- IV2: Service layer handles both country code formats transparently
- IV3: URL structures remain consistent during migration period
- IV4: Data seeding and testing utilities work with dual-format schema

## Story 2.3: Monorepo Architecture with Admin Management System

As a **platform administrator and development team**,
I want **a scalable monorepo structure with a dedicated admin application for content and data management**,
so that **the platform can support multiple applications, share code efficiently, and enable non-technical staff to manage visa catalog content**.

**Acceptance Criteria:**

1. PNPM workspace monorepo structure established with apps/website and apps/admin
2. Shared packages created (database, ui, utils, auth, typescript-config) with proper dependency management
3. Admin application implements Clerk authentication with secure access control
4. Admin UI provides CRUD operations for all database entities (countries, visa types, eligibility, blog posts)
5. Both applications build and deploy independently with existing CI/CD workflows
6. All import paths updated to use workspace package references
7. Documentation updated to reflect monorepo structure and development workflows
8. TypeScript configurations optimized for workspace compilation
9. Testing infrastructure works across all workspace packages
10. Shared authentication foundation prepared for future website integration

**Integration Verification:**

- IV1: Website application maintains 100% existing functionality after monorepo migration
- IV2: Deployment workflows (staging/production) function identically to pre-migration
- IV3: Database connection and ORM operations work consistently across both applications
- IV4: Shared UI components render identically in both website and admin contexts
- IV5: Development experience (hot reload, type checking) remains optimal
- IV6: Build times remain acceptable (<5 minutes for full monorepo build)

---

**Epic 2 Success Metrics:**

1. **Development Velocity**: Story completion time reduced by 30% through component reuse
2. **Code Quality**: TypeScript strict mode compliance across all packages (0 `any` types)
3. **Admin Efficiency**: Content updates completed in <5 minutes vs. previous manual process
4. **Architecture Scalability**: Shared packages enable 3rd application addition within 1 sprint
5. **Performance**: All existing performance benchmarks maintained or improved

**Epic 2 Dependencies:**

- **Prerequisite**: Epic 1 completion (destination catalog system fully operational)
- **Concurrent Work**: Epic 2 stories can proceed in parallel with minimal interdependencies
- **Post-Epic**: Enables future admin role management, audit logging, and multi-tenant features

**Epic 2 Risks & Mitigations:**

| Risk                                               | Impact | Mitigation                                                    |
| -------------------------------------------------- | ------ | ------------------------------------------------------------- |
| Monorepo migration breaks existing deployment      | High   | Feature branch testing, gradual migration, rollback plan      |
| Admin auth integration delays website auth         | Medium | Design shared auth package with clear separation              |
| Build complexity increases CI/CD time              | Medium | Implement incremental builds, optimize workspace dependencies |
| Component library migration introduces regressions | High   | Comprehensive visual regression testing, gradual rollout      |
