# 11. Frontend Developer Standards

## Critical Coding Rules

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

## Quick Reference

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
import { DestinationCard } from "@/components/destinations/destination-card";
import { JsonLd } from "@/components/seo/json-ld";

// Service imports
import { getDestinations } from "@/lib/services/country-service";
import { checkVisaEligibility } from "@/lib/services/visa-service";

// Utility imports
import { cn } from "@/lib/utils";
import { env } from "@/lib/consts/env";
```

---
