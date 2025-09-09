# 5. State Management

## Store Structure

```plaintext
src/lib/state/
├── url-state/                             # URL-based state management
│   ├── search-params.ts                   # Search and filter state
│   ├── locale-state.ts                    # Language switching state
│   └── pagination-state.ts               # Content pagination state
├── client-state/                          # React client state
│   ├── ui-state.ts                        # Modal, dropdown, loading states
│   ├── form-state.ts                      # Form validation and submission
│   └── cache-state.ts                     # Client-side data caching
├── server-state/                          # Server-rendered state
│   ├── destination-state.ts               # Pre-fetched destination data
│   ├── visa-eligibility-state.ts          # Server-computed eligibility
│   └── blog-state.ts                      # Pre-rendered blog content
└── hooks/                                 # Custom state management hooks
    ├── use-search-state.ts                # Search form state management
    ├── use-visa-filter.ts                 # Visa filtering logic
    ├── use-affiliate-tracking.ts          # Partner link tracking
    └── index.ts                           # Hook exports
```

## State Management Template

```typescript
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { type Country, type VisaType } from "@/lib/types/database";

// URL State Management for Search and Filtering
export function useVisaSearchState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract current state from URL
  const passportCountry = searchParams.get("passport") || "";
  const destinationCountry = searchParams.get("destination") || "";
  const visaTypes = searchParams.get("types")?.split(",") || [];

  // Update URL with new search state
  const updateSearchState = useCallback(
    (updates: {
      passport?: string;
      destination?: string;
      visaTypes?: string[];
    }) => {
      const params = new URLSearchParams(searchParams);

      if (updates.passport !== undefined) {
        updates.passport
          ? params.set("passport", updates.passport)
          : params.delete("passport");
      }

      if (updates.destination !== undefined) {
        updates.destination
          ? params.set("destination", updates.destination)
          : params.delete("destination");
      }

      if (updates.visaTypes !== undefined) {
        updates.visaTypes.length > 0
          ? params.set("types", updates.visaTypes.join(","))
          : params.delete("types");
      }

      const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
      router.push(newUrl, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return {
    // Current state
    passportCountry,
    destinationCountry,
    visaTypes,
    // State updaters
    setPassportCountry: (country: string) =>
      updateSearchState({ passport: country }),
    setDestinationCountry: (country: string) =>
      updateSearchState({ destination: country }),
    setVisaTypes: (types: string[]) => updateSearchState({ visaTypes: types }),
    clearSearch: () =>
      updateSearchState({ passport: "", destination: "", visaTypes: [] }),
  };
}
```

---
