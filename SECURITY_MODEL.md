# Threat model — HazemKhaled/evisa (GetTravelVisa.com)

## System overview
PNPM monorepo with two Next.js 16 apps deployed to Cloudflare Workers via OpenNext, sharing one Neon PostgreSQL database (Drizzle ORM, `packages/database/src/connection.ts`, `DATABASE_URL`).

## Components
| Name | Code | Notes |
|---|---|---|
| **Website** | `apps/website/src/app/**` (pages, `[locale]`, sitemaps, `middleware.ts`) | Public, unauthenticated; `gettravelvisa.com` (worker `gtv`). Renders catalog + blog (markdown, JSON-LD). |
| **Public API** | `apps/website/src/app/api/**`, `.well-known/**`, `apps/website/src/lib/services/**` | `/api/search`, `/api/eligibility`, `/api/mcp` (JSON-RPC tools), `/api/markdown-negotiation` (same-origin fetch, forwards cookies), `/api/health`. Read-only. |
| **Admin** | `apps/admin/src/**` (server actions in `src/actions/*`, pages, `middleware.ts`) | `admin.gettravelvisa.com` (worker `gtv-admin`); CRUD for countries, visa types, eligibility, blog posts; invalidates public cache (`lib/public-site-cache.ts`). |
| **Auth** | `packages/auth/**`, `apps/admin/src/middleware.ts` | Clerk. `clerkMiddleware()` with no route protection; `requireAdminAuth()` checks only that a userId exists (no role). Read actions (`get*`) do not call it. |
| **Database** | `packages/database/**`, `apps/website/migrations` | Drizzle schema, seeds, migrations; Neon over HTTP. |
| **Infrastructure** | `apps/*/wrangler.jsonc`, `apps/*/open-next.config.ts`, `.github/workflows/**` | Workers, shared D1 tag cache `gtv-opennext-cache`, R2 incremental cache, preview URLs enabled with separate preview D1/R2. CI only runs checks; deploys are manual. |

## Trust boundaries & entry points
- Internet → Website / Public API: anyone, no auth.
- Internet → Admin: Clerk sign-in. **User: sign-up is disabled; only the owner and invited team members have accounts.** Server actions are reachable by POST to the admin worker by anyone, so each action must enforce auth itself.
- Admin worker → shared D1 tag cache → Website cache (cross-worker invalidation).
- Workers → Neon (credential in worker env), Sentry, GTM, Jitsu (client-side).

## Assets (user: all matter equally)
- Admin access and Clerk/DB credentials (`CLERK_SECRET_KEY`, `DATABASE_URL`).
- Integrity of visa/eligibility data — wrong information harms travelers.
- Site availability and SEO (metadata, sitemaps, JSON-LD, cache correctness).
- Blog content integrity (stored content rendered on the public site).

## Attacker profiles
- **Anonymous internet user** (primary): hits public pages and APIs, and can POST directly to admin server actions/endpoints without a session.
- **Admin users**: per user, only the owner and invited team (sign-up disabled) — trusted; findings that need an outside attacker to hold an admin Clerk account are lower risk.
- Supply chain / CI: third-party GitHub Actions and npm deps (Dependabot configured).

## Existing controls
- Clerk session on admin write actions (`requireAdminAuth`).
- Same-origin check on `/api/markdown-negotiation`.
- JSON-LD rendered via `JSON.stringify` (check `</script>` escaping).
- Separate preview D1/R2 bindings to keep previews off production cache.
- `global_fetch_strictly_public` compatibility flag on both workers.

## Out of scope / accepted risk (user)
- DoS and missing rate limiting on public read APIs.
- Disclosure of public catalog data (countries, visa types, eligibility, published blog posts) — it is public anyway.

## Known weaknesses
- Admin read server actions (`get*` in `apps/admin/src/actions/*`) skip `requireAdminAuth()` and the admin middleware protects no routes, so anonymous users can read drafts, unpublished posts and soft-deleted/inactive rows.

## Open questions
- Is sign-up also disabled for Clerk preview/dev instances used by preview URLs?
