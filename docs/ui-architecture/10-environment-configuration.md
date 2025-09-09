# 10. Environment Configuration

## Required Environment Variables

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

## TypeScript Environment Configuration

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
