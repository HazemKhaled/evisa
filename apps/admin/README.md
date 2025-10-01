# GetTravelVisa Admin Panel

Admin panel for managing visa catalog content and data for GetTravelVisa.com.

## Setup

### 1. Install Dependencies

From the project root:

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cd apps/admin
cp .env.example .env.local
```

Edit `.env.local` and add your Clerk keys from [Clerk Dashboard](https://dashboard.clerk.com/last-active?path=api-keys):

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
DATABASE_URL=postgresql://...
```

### 3. Run Development Server

```bash
# From project root
pnpm dev:admin

# Or from apps/admin directory
pnpm dev
```

The admin panel will be available at [http://localhost:3001](http://localhost:3001)

## Features

### Authentication

- Powered by [Clerk](https://clerk.com/)
- Sign in/sign up with email
- Route protection via middleware
- User profile management

### Management Interfaces

- **Countries** - Manage destination and passport countries
- **Visa Types** - Configure visa options and requirements
- **Eligibility** - Define visa eligibility rules
- **Blog Posts** - Create and manage blog content

## Project Structure

```
apps/admin/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with ClerkProvider
│   │   ├── page.tsx            # Dashboard
│   │   ├── countries/          # Country management
│   │   ├── visa-types/         # Visa type management
│   │   ├── eligibility/        # Eligibility management
│   │   └── blog-posts/         # Blog post management
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── middleware.ts           # Clerk authentication
├── .env.example                # Environment variables template
├── .env.local                  # Local environment (git-ignored)
├── components.json             # Shadcn UI configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── wrangler.jsonc              # Cloudflare Workers config
```

## Development

### Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler
pnpm test         # Run tests
```

### Adding Shadcn Components

```bash
# From apps/admin directory
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add table
pnpm dlx shadcn@latest add dialog
```

### Using Shared Packages

The admin app uses workspace packages:

```typescript
import { getCountryByCode } from "@repo/database";
import { Button } from "@repo/ui";
import { cn } from "@repo/utils";
import { useAuth } from "@repo/auth";
```

## Deployment

### Manual Deployment

Deploy to production using the following commands:

```bash
# Build and deploy to Cloudflare
pnpm deploy

# Build and preview locally
pnpm preview
```

**Production URL**: https://admin.gettravelvisa.com

## Environment Variables

| Variable                            | Description                  | Required |
| ----------------------------------- | ---------------------------- | -------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key        | Yes      |
| `CLERK_SECRET_KEY`                  | Clerk secret key             | Yes      |
| `DATABASE_URL`                      | PostgreSQL connection string | Yes      |

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk
- **Database**: Neon PostgreSQL (via `@repo/database`)
- **UI**: Shadcn UI + Tailwind CSS
- **Deployment**: Cloudflare Workers (via OpenNext.js)
- **Language**: TypeScript

## Links

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [OpenNext.js for Cloudflare](https://opennext.js.org/cloudflare)

## Support

For issues or questions, please refer to the main project documentation in the repository root.
