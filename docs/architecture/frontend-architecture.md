# Frontend Architecture

## Component Architecture

### Component Organization

```
src/
├── components/
│   ├── ui/                          # shadcn/ui components (migrating to)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── select.tsx
│   │   ├── input.tsx
│   │   └── navigation-menu.tsx
│   ├── layout/                      # Layout-specific components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── language-switcher.tsx
│   ├── destinations/                # Domain-specific components
│   │   ├── destination-card.tsx
│   │   ├── visa-type-card.tsx
│   │   ├── search-filter-form.tsx
│   │   └── destinations-grid.tsx
│   ├── blog/                        # Blog-related components
│   │   ├── blog-post-card.tsx
│   │   ├── blog-post-list.tsx
│   │   └── related-articles.tsx
│   ├── forms/                       # Form components
│   │   ├── contact-form.tsx
│   │   ├── newsletter-form.tsx
│   │   └── search-form.tsx
│   └── common/                      # Reusable components
│       ├── loading-spinner.tsx
│       ├── error-boundary.tsx
│       └── seo-meta.tsx
```

### Component Template (shadcn/ui Pattern)

```typescript
// components/destinations/destination-card.tsx
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui"
import { MapPin, Clock, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Country } from "@/lib/types"

interface DestinationCardProps {
  country: Country & {
    visaCount: number;
    avgProcessingTime: number;
    minFee: number;
  };
  locale: string;
  passportCountry?: string;
  className?: string;
}

export function DestinationCard({
  country,
  locale,
  passportCountry,
  className
}: DestinationCardProps) {
  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-lg",
      "rtl:text-right ltr:text-left", // RTL support
      className
    )}>
      <div className="relative h-48 overflow-hidden">
        <Image
          src={country.heroImage}
          alt={country.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {country.isPopular && (
          <Badge className="absolute top-2 ltr:right-2 rtl:left-2">
            Popular
          </Badge>
        )}
      </div>

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image
            src={country.flagImage}
            alt={`${country.name} flag`}
            width={24}
            height={16}
            className="rounded-sm"
          />
          {country.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{country.visaCount} visas</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{country.avgProcessingTime}d</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>From ${country.minFee}</span>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link href={`/${locale}/d/${country.code}`}>
            View Requirements
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
```

## State Management Architecture

### State Structure

```typescript
// lib/types/state.ts
interface AppState {
  // User preferences (stored in cookies/localStorage)
  userPreferences: {
    passportCountry?: string;
    preferredLanguage: string;
    currency: string;
    recentSearches: string[];
  };

  // Search state (URL-based, no global state needed)
  searchFilters: {
    query?: string;
    passport?: string;
    destination?: string;
    continent?: string;
    visaType?: string;
  };

  // UI state (component-local)
  ui: {
    sidebarOpen: boolean;
    searchModalOpen: boolean;
    languageDropdownOpen: boolean;
  };
}

// State management patterns
interface StateManagementPatterns {
  // Server state - handled by Next.js SSG/ISR/SSR
  serverState: "Next.js data fetching";

  // Client state - React built-in hooks
  clientState: "useState + useContext for shared state";

  // URL state - Next.js router
  urlState: "useSearchParams + useRouter";

  // Persistent state - cookies and localStorage
  persistentState: "js-cookie + localStorage utilities";
}
```

### State Management Patterns

- **Server State via SSG/ISR**: All destination and visa data fetched at build/request time
- **Component State via useState**: Local UI interactions and form state
- **Shared State via useContext**: User preferences and global UI state
- **URL State via Next.js Router**: Search filters and pagination state
- **Persistent State via Cookies**: Language preferences and user settings

## Routing Architecture

### Route Organization

```
app/
├── [locale]/                        # Internationalized routes
│   ├── page.tsx                     # Homepage
│   ├── layout.tsx                   # Locale-specific layout
│   ├── loading.tsx                  # Global loading UI
│   ├── error.tsx                    # Error boundary
│   ├── not-found.tsx               # 404 page
│   ├── contact/
│   │   └── page.tsx                 # Contact form
│   ├── blog/
│   │   ├── page.tsx                 # Blog listing
│   │   ├── [slug]/
│   │   │   └── page.tsx             # Individual blog post
│   │   ├── t/
│   │   │   └── [tag]/
│   │   │       └── page.tsx         # Tag-filtered posts
│   │   └── sitemap.ts               # Blog sitemap
│   ├── d/                           # Destinations
│   │   ├── page.tsx                 # All destinations
│   │   ├── [destination]/
│   │   │   ├── page.tsx             # Destination details
│   │   │   ├── blog/
│   │   │   │   └── page.tsx         # Destination blog posts
│   │   │   ├── v/
│   │   │   │   └── [visa]/
│   │   │   │       └── page.tsx     # Visa details
│   │   │   └── p/
│   │   │       └── [passport]/
│   │   │           └── page.tsx     # Passport-specific eligibility
│   │   └── sitemap.ts               # Destinations sitemap
│   └── p/                           # Static pages
│       ├── [slug]/
│       │   └── page.tsx             # Terms, Privacy, About, etc.
├── api/                             # API routes (minimal usage)
│   └── revalidate/
│       └── route.ts                 # ISR revalidation webhook
├── globals.css                      # Global styles
├── layout.tsx                       # Root layout
├── loading.tsx                      # Root loading
├── not-found.tsx                   # Root 404
└── sitemap.ts                      # Main sitemap
```

### Protected Route Pattern

```typescript
// lib/auth/route-protection.tsx
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  fallbackUrl?: string;
}

export async function ProtectedRoute({
  children,
  requireAdmin = false,
  fallbackUrl = "/login"
}: ProtectedRouteProps) {
  const session = await auth()

  if (!session) {
    redirect(fallbackUrl)
  }

  if (requireAdmin && !session.user.isAdmin) {
    redirect("/unauthorized")
  }

  return <>{children}</>
}

// Usage in admin pages
export default async function AdminPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminDashboard />
    </ProtectedRoute>
  )
}
```

## Frontend Services Layer

### API Client Setup

```typescript
// lib/api/client.ts
import { unstable_cache } from "next/cache";

// Cached data fetching for static/ISR pages
export const apiClient = {
  destinations: {
    getPopular: unstable_cache(
      async (locale: string) => {
        return await countryService.getPopularDestinations(locale);
      },
      ["popular-destinations"],
      { revalidate: 3600, tags: ["destinations"] }
    ),

    getAll: unstable_cache(
      async (params: GetDestinationsParams) => {
        return await countryService.getAllDestinations(params);
      },
      ["all-destinations"],
      { revalidate: 1800, tags: ["destinations"] }
    ),

    getDetails: unstable_cache(
      async (code: string, locale: string) => {
        return await countryService.getDestinationDetails(code, locale);
      },
      ["destination-details"],
      { revalidate: 3600, tags: ["destination"] }
    ),
  },

  visas: {
    checkEligibility: async (params: EligibilityParams) => {
      // Dynamic eligibility checking (SSR)
      return await visaService.checkEligibility(params);
    },
  },

  blog: {
    getPosts: unstable_cache(
      async (params: GetBlogPostsParams) => {
        return await blogService.getBlogPosts(params);
      },
      ["blog-posts"],
      { revalidate: 1800, tags: ["blog"] }
    ),
  },
};
```

### Service Example

```typescript
// lib/hooks/use-search.ts
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "./use-debounce";

interface UseSearchProps {
  locale: string;
  onResults?: (results: SearchResult[]) => void;
}

export function useSearch({ locale, onResults }: UseSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const debouncedQuery = useDebounce(query, 300);

  // Update URL when query changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    } else {
      params.delete("q");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, router, searchParams]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    // Search implementation using Server Actions
    searchDestinations({ query: debouncedQuery, locale })
      .then(searchResults => {
        setResults(searchResults);
        onResults?.(searchResults);
      })
      .catch(error => {
        console.error("Search failed:", error);
        setResults([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedQuery, locale, onResults]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    hasQuery: Boolean(debouncedQuery),
  };
}
```

---
