# 4. Component Standards

## Component Template

````typescript
"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface ExampleComponentProps {
  /** Primary content or data for the component */
  children?: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Component variant for different visual styles */
  variant?: "default" | "featured" | "minimal";
  /** Loading state indicator */
  loading?: boolean;
  /** Locale for internationalization */
  locale: string;
  /** Click handler for interactive components */
  onClick?: () => void;
}

/**
 * ExampleComponent provides a reusable UI element following GetTravelVisa design patterns.
 *
 * @example
 * ```tsx
 * <ExampleComponent
 *   variant="featured"
 *   locale="en"
 *   className="mb-4"
 * >
 *   Content here
 * </ExampleComponent>
 * ```
 */
export function ExampleComponent({
  children,
  className,
  variant = "default",
  loading = false,
  locale,
  onClick,
}: ExampleComponentProps) {
  const { t } = useTranslation("common", { lng: locale });

  const baseStyles = "relative rounded-lg shadow-sm transition-colors duration-200";
  const variantStyles = {
    default: "bg-white border border-gray-200 hover:border-gray-300",
    featured: "bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200",
    minimal: "bg-transparent border-0",
  };

  if (loading) {
    return (
      <div className={cn(baseStyles, variantStyles.default, "animate-pulse", className)}>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
}

// Default export for dynamic imports
export default ExampleComponent;
````

## Naming Conventions

**File and Component Naming:**

- **Components**: PascalCase for component names (`DestinationCard`, `VisaTypeCard`)
- **Files**: kebab-case for file names (`destination-card.tsx`, `visa-eligibility-badge.tsx`)
- **Directories**: kebab-case for folder names (`ui/`, `affiliate-partners/`)
- **API Routes**: kebab-case following REST conventions (`visa-eligibility/`, `countries/`)

**TypeScript Interface Naming:**

- **Props Interfaces**: `ComponentNameProps` (e.g., `DestinationCardProps`)
- **Data Interfaces**: Domain-based naming (e.g., `Country`, `VisaType`, `AffiliatePartner`)
- **Service Interfaces**: Service-based naming (e.g., `CountryService`, `VisaEligibilityService`)
- **API Types**: HTTP method + endpoint (e.g., `GetCountriesResponse`, `PostVisaEligibilityRequest`)

---
