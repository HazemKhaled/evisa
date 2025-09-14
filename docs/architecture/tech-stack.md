# Tech Stack

This is the DEFINITIVE technology selection for the entire project. This table serves as the single source of truth - all development must use these exact versions.

## Technology Stack Table

| Category              | Technology                         | Version      | Purpose                                       | Rationale                                                                                      |
| --------------------- | ---------------------------------- | ------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Frontend Language     | TypeScript                         | 5.6+         | Type-safe development with strict mode        | Provides compile-time safety and better developer experience for complex visa logic            |
| Frontend Framework    | Next.js                            | 15.4.7+      | App Router with Turbopack development         | Latest version with App Router for optimal Cloudflare Workers compatibility                    |
| UI Component Library  | shadcn/ui                          | Latest       | Modern component library with MCP integration | Leverages shadcn registry for rapid development, excellent TypeScript support, customizable    |
| State Management      | React Built-in                     | 19.1.1+      | useState, useContext, server state            | Simple state needs don't require external library; server components handle most state         |
| Backend Language      | TypeScript                         | 5.6+         | Unified language across stack                 | Single language reduces complexity and enables shared types                                    |
| Backend Framework     | Next.js Server Actions             | 15.4.7+      | Type-safe server functions                    | Server Actions provide type-safe RPC-style API, optimized for Cloudflare Workers               |
| API Style             | Server Actions                     | Built-in     | Type-safe server-side functions               | Eliminates need for REST endpoints, provides automatic type safety and better DX               |
| Database              | Cloudflare D1                      | Latest       | SQLite-compatible edge database               | Edge deployment, automatic replication, integrates with Cloudflare ecosystem                   |
| ORM                   | Drizzle ORM                        | 0.44.5+      | Type-safe database operations                 | Best TypeScript integration, optimized for edge databases, excellent migration system          |
| Cache                 | Cloudflare Workers Cache + Next.js | Built-in     | Multi-layer caching strategy                  | Workers Cache for API responses, Next.js cache for static content                              |
| File Storage          | Cloudflare R2                      | Latest       | Object storage for images and assets          | S3-compatible, integrates with CDN, cost-effective for global distribution                     |
| Authentication        | NextAuth.js                        | v5 (Auth.js) | Modern authentication solution                | Latest version with improved TypeScript support, edge-compatible, excellent provider ecosystem |
| Frontend Testing      | Jest + React Testing Library       | 29+          | Component and service testing                 | Industry standard, excellent TypeScript support, focuses on user behavior                      |
| Backend Testing       | Jest + Supertest                   | 29+          | Server Actions and database testing           | Same framework as frontend, enables shared test utilities                                      |
| E2E Testing           | Playwright                         | 1.40+        | Cross-browser automated testing               | Best performance on CI, excellent debugging, supports internationalization testing             |
| Build Tool            | Next.js + OpenNext                 | 1.8.0+       | Cloudflare Workers build pipeline             | Transforms Next.js for Workers compatibility while preserving features                         |
| Bundler               | Turbopack                          | Built-in     | Fast development builds                       | Integrated with Next.js 15, significantly faster than Webpack for development                  |
| IaC Tool              | Wrangler                           | 3.x          | Cloudflare infrastructure management          | Official Cloudflare tool, manages Workers, D1, R2, and deployments                             |
| CI/CD                 | GitHub Actions                     | Latest       | Automated testing and deployment              | Free for public repos, excellent integration with Cloudflare via Wrangler                      |
| Monitoring            | Sentry                             | 8.x          | Error tracking and performance                | Industry standard, excellent Next.js integration, performance insights                         |
| Logging               | Cloudflare Analytics + Console     | Built-in     | Request logging and debugging                 | Integrated with Workers, sufficient for current needs                                          |
| CSS Framework         | Tailwind CSS                       | 4.1.13+      | Utility-first styling with RTL support        | Excellent RTL support, consistent design system, optimized for performance                     |
| Font System           | Google Fonts (Cairo)               | Latest       | Multilingual typography support               | Supports Arabic, Latin scripts with consistent rendering across languages                      |
| Internationalization  | i18next                            | 25.5.2+      | 8-language support with routing               | Mature solution, excellent Next.js integration, supports complex pluralization                 |
| Component Development | shadcn/ui MCP + Registry           | Latest       | Rapid component development and sharing       | MCP integration enables AI-assisted development, registry provides proven components           |

---
