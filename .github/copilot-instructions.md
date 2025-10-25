# GetTravelVisa Project - Development Guidelines

You are an expert in TypeScript, Node.js, Next.js App Router, React, and Tailwind CSS.
You specialize in building scalable, multilingual web applications with modern frameworks and best practices.

## Core Technologies

This project is a **PNPM workspace monorepo** built with:

- **Next.js** with App Router (never Pages Router) and MCP server for AI-assisted development
- **TypeScript** with strict mode
- **Tailwind CSS** for styling
- **Drizzle ORM** with Neon PostgreSQL
- **i18next** for multilingual support with RTL layouts
- **Clerk** for authentication (admin panel only)
- **Cloudflare** deployment via OpenNext.js

## Project Structure

```
apps/
├── website/        # Public-facing application
└── admin/          # Admin panel (Clerk authenticated)

packages/
├── database/       # Shared Drizzle schema
├── ui/            # Shared Shadcn/MagicUI components
├── utils/         # Shared utilities
├── auth/          # Shared Clerk utilities
└── typescript-config/
```

## Key Principles

- **Next.js App Router Only**: Never suggest Pages Router
- **Follow Monorepo Patterns**: Use workspace package imports (`@repo/*`)
- **Strict TypeScript**: Prefer interfaces over types, no `any` without justification
- **Full Implementation**: Leave NO TODO comments or placeholders
- **Testing**: Jest for non-UI code (database, API, Next.js actions)
- **Multilingual First**: All user-facing strings from i18n files, RTL support required
- **Performance**: Use dynamic imports, image optimization, proper caching
- **Security**: Use Next.js server components by default, client components only when needed

## Development Commands

```bash
# Installation & Setup
pnpm install                # Install all dependencies
pnpm db:push               # Push schema changes to database
pnpm db:generate           # Generate migrations

# Development
pnpm dev                   # Start both apps (port 3000/3001)
pnpm dev:website          # Website only (port 3000)
pnpm dev:admin            # Admin only (port 3001)

# Quality & Testing
pnpm lint                 # ESLint all packages
pnpm type-check          # TypeScript check all packages
pnpm test                # Jest tests all packages
pnpm build               # Build all apps

# Deployment
pnpm deploy:website      # Deploy website to Cloudflare
pnpm deploy:admin        # Deploy admin to Cloudflare
```

## Workspace Package Imports

Always use workspace imports for shared code:

```typescript
// ✅ Correct
import { getCountryByCode } from "@repo/database";
import { Button } from "@repo/ui";
import { cn } from "@repo/utils";
import { useAuth } from "@repo/auth";

// ❌ Wrong - Never use relative imports for shared code
import { getCountryByCode } from "../../../packages/database";
```

## Code Style & Naming

- **Files**: Lowercase with dashes (`auth-wizard.tsx`, `user-profile.ts`)
- **Components**: Named exports, PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Comments**: JSDoc style for functions, interfaces, classes
- **Naming**: Descriptive, no single-letter variables except loops

## TypeScript Usage

```typescript
// Prefer interfaces
interface UserProps {
  id: string;
  name: string;
}

// Avoid enums - use maps
const STATUS_MAP = {
  active: "Active",
  inactive: "Inactive",
} as const;

// Use explicit types on function parameters
function getUserData(userId: string): Promise<User> {
  // implementation
}

// No 'any' - use proper types
function processData(data: Record<string, unknown>): void {
  // implementation
}
```

## Next.js App Router Standards

- Use **server components by default**, client components only when needed
- Use **dynamic imports** with Suspense for non-critical components
- Implement **proper error boundaries** and **loading states**
- Follow **file conventions**: `page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`
- Use **next/image** for optimized images
- Implement **proper metadata** for all pages (from i18n files)

```typescript
// app/[locale]/page.tsx - Server component by default
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("HomePage");
  return { title: t("title"), description: t("description") };
}

export default async function HomePage() {
  // Server component logic
  return <div>{/* content */}</div>;
}
```

## Multilingual Implementation

- Use **i18next** with locale-based routing (`/[locale]/`)
- All user-facing text from **translation files** (never hardcoded)
- Support **RTL layouts** with dynamic `dir` attribute
- Use `useTranslations()` hook in client components
- Use `getTranslations()` in server components
- Supported languages: English, Spanish, Arabic, Portuguese, Russian, German, French, Italian

```typescript
// Client component
"use client";
import { useTranslations } from "next-intl";

export function Navigation() {
  const t = useTranslations("Navigation");
  return <nav>{t("home")}</nav>;
}

// Server component
import { getTranslations } from "next-intl/server";

export async function Header() {
  const t = await getTranslations("Header");
  return <header>{t("title")}</header>;
}
```

## Database & Schema

- Use **Drizzle ORM** with PostgreSQL (Neon)
- Place schema definitions in `packages/database/src/schema/`
- Follow **Drizzle best practices**
- Implement **proper migrations** via Drizzle Kit
- Use **type-safe queries** with Drizzle

```typescript
// packages/database/src/schema/countries.ts
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 2 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

## Testing Standards

- **Jest** for unit testing
- Test **database logic**, **API handlers**, **Next.js server actions**
- Don't test UI components (use Playwright for E2E)
- Achieve **comprehensive coverage** of business logic
- Never skip tests or use `skip()` to hide failures

```typescript
// ✅ Test business logic
describe("countryService", () => {
  it("should fetch countries by region", async () => {
    const countries = await getCountriesByRegion("MENA");
    expect(countries).toHaveLength(5);
  });
});

// ❌ Don't test UI components
// Use Playwright for E2E testing instead
```

## Git & Commit Messages

Use conventional commit format:

- Format: `<type>(<scope>): <description>`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`
- Scope: Use slug format (`auth`, `catalog`, `admin`)
- Description: Imperative, present tense ("add" not "added")

Examples:

- `feat(catalog): add visa eligibility checker`
- `fix(auth): resolve null reference in Clerk webhook`
- `docs(readme): update deployment instructions`

## Performance & Optimization

- Use **Next.js Image** component with proper sizing
- Implement **proper caching** strategies
- Use **dynamic imports** for code splitting
- Optimize **bundle size** with tree shaking
- Profile with **Chrome DevTools** and **Lighthouse**

## SEO & Metadata

- Implement **structured data** (JSON-LD) from i18n files
- Generate **XML sitemaps** with proper localization
- Use **canonical tags** for multilingual pages
- Implement **OpenGraph** metadata for social sharing
- All metadata sourced from **database content** or **translation files**

## Security Standards

- Use **server components** by default
- Implement **Clerk authentication** for admin routes
- Never hardcode **secrets or API keys**
- Use **environment variables** properly
- Validate **user input** on server
- Use **type-safe database queries**

## Error Handling & Monitoring

- Implement **error boundaries** in React components
- Use **proper error logging** for debugging
- Provide **meaningful error messages** to users
- Follow **Next.js error handling patterns**
- Use **proper HTTP status codes**

## Next.js MCP Integration

Next.js MCP (Model Context Protocol) server provides AI-assisted development capabilities with direct access to your running application. Leverage this for optimal development experience.

### Available MCP Tools

| Tool                      | Purpose                               | Use When                              |
| ------------------------- | ------------------------------------- | ------------------------------------- |
| `get_errors`              | Real-time build/runtime/type errors   | Build fails, runtime errors occur     |
| `get_logs`                | Dev server logs and console output    | Debugging unexpected behavior         |
| `get_page_metadata`       | Page routes, metadata, component info | Understanding page structure          |
| `get_project_metadata`    | Project structure and config          | Navigating monorepo                   |
| `get_server_action_by_id` | Server Action debugging               | Implementing or fixing Server Actions |

### Development Workflows

**Error Debugging Flow:**

```
Error occurs → Query get_errors → Identify root cause → Implement fix → Verify with logs
```

**Component Implementation Flow:**

```
Start new component → Query get_page_metadata → Understand structure → Generate implementation → Test
```

**Migration Planning Flow:**

```
Plan feature/migration → Query get_project_metadata → Review current patterns → Use next-devtools docs → Execute
```

### When to Use Next.js MCP

- **Real-time Error Diagnostics**: Build errors, runtime errors, or type errors occurring
- **Page/Route Navigation**: Understanding existing page structure, routes, and components
- **Server Actions**: Inspecting or debugging Server Actions implementation
- **Best Practices Guidance**: Consulting Next.js patterns specific to your project
- **Feature Planning**: Understanding existing architecture before implementation
- **Migration Support**: Planning Pages Router → App Router or other framework upgrades

### Complementary Tools

**next-devtools MCP** (external):

- Official Next.js documentation queries
- Automated migration codemods
- Cache Components configuration
- Browser automation via Playwright

**Integration**: Use built-in MCP for diagnostics, next-devtools for guidance and documentation.

### Best Practices

1. **Start dev server first**: Run `pnpm dev` to enable live MCP diagnostics
2. **Query before implementing**: Check `get_project_metadata` for existing patterns
3. **Use for context validation**: Verify component/route structure before coding
4. **Reference official docs**: Use next-devtools for authoritative Next.js guidance
5. **Combine with code review**: Use MCP diagnostics alongside manual code inspection

### Example Scenarios

**Scenario: Implementing new page with Server Actions**

1. Query `get_page_metadata` for existing page patterns
2. Query `get_project_metadata` to understand routing structure
3. Reference next-devtools docs for Server Actions best practices
4. Implement following discovered patterns
5. Use `get_logs` to validate implementation

**Scenario: Debugging persistent errors**

1. Query `get_errors` for detailed error information
2. Query `get_logs` for supporting diagnostic info
3. Check `get_server_action_by_id` if related to Server Actions
4. Fix identified issues
5. Verify with `get_errors` query

## When in Doubt

- Check `CLAUDE.md` in project root for authoritative guidelines
- Review existing code patterns before implementing new features
- Test locally before pushing changes
- Run `pnpm lint` and `pnpm type-check` before commits
