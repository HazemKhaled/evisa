# Coding Standards - GetTravelVisa.com

## Document Information

- **Version**: v1.0
- **Date**: September 2024
- **Author**: Architecture Team
- **Status**: Active

---

## Overview

This document defines coding standards for the GetTravelVisa.com multilingual visa processing platform. These standards ensure consistency, maintainability, and quality across the codebase.

## Language Standards

### TypeScript

- **Strict Mode**: Always use TypeScript strict mode
- **Type Safety**: Prefer interfaces over types for object definitions
- **No `any`**: Avoid `any` type; use specific types or `unknown`
- **Type Imports**: Use inline type imports with `import type` syntax
- **Function Parameters**: All function parameters must have explicit TypeScript types

```typescript
// ✅ Good
interface UserPreferences {
  locale: string;
  theme: "light" | "dark";
}

import { type NextRequest } from "next/server";

function processUserData(
  user: User,
  preferences: UserPreferences
): ProcessedUser {
  // Implementation
}

// ❌ Bad
function processUserData(user: any, preferences: any): any {
  // Implementation
}
```

### JavaScript/ES6+

- **Const First**: Use `const` by default, `let` when reassignment needed
- **No `var`**: Never use `var` declarations
- **Arrow Functions**: Prefer arrow functions for callbacks and short functions
- **Template Literals**: Use template literals over string concatenation
- **Destructuring**: Use object/array destructuring when appropriate

## React Standards

### Component Architecture

- **Functional Components**: Use functional components with TypeScript interfaces
- **Server Components**: Use Server Components by default, Client Components only when needed
- **Component Props**: Define explicit interfaces for all component props
- **JSDoc Comments**: Document complex components and functions

```typescript
// ✅ Good Server Component
interface DestinationCardProps {
  destination: Country;
  locale: string;
  className?: string;
}

/**
 * Displays destination information with visa options
 */
export function DestinationCard({ destination, locale, className }: DestinationCardProps) {
  return (
    <div className={cn("destination-card", className)}>
      {/* Component implementation */}
    </div>
  );
}

// ✅ Good Client Component (when needed)
'use client';

interface SearchFormProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

export function SearchForm({ onSearch, placeholder }: SearchFormProps) {
  // Client-side functionality
}
```

### Hooks and State

- **Built-in Hooks**: Prefer React built-in hooks over custom solutions
- **Custom Hooks**: Extract reusable logic into custom hooks
- **State Management**: Use React state for component-level state
- **Server State**: Use appropriate patterns for server state management

## Next.js Standards

### App Router Conventions

- **Server First**: Default to Server Components, use Client Components sparingly
- **File Naming**: Use lowercase with hyphens for route segments
- **Loading States**: Implement proper loading.tsx and error.tsx files
- **Metadata**: Use generateMetadata for dynamic metadata

```typescript
// ✅ File structure
app/
├── [locale]/
│   ├── d/
│   │   ├── [destination]/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   └── page.tsx
│   └── layout.tsx
```

### Route Handlers

- **Explicit Methods**: Export specific HTTP method functions
- **Error Handling**: Implement comprehensive error handling
- **Type Safety**: Use typed request/response patterns

```typescript
// ✅ API Route Handler
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Implementation
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
```

## Database Standards (Drizzle ORM)

### Schema Definitions

- **Explicit Types**: Always specify column types explicitly
- **Relationships**: Use proper foreign key relationships
- **Timestamps**: Include createdAt and updatedAt for all entities
- **Soft Deletes**: Use deletedAt for soft delete capabilities

```typescript
// ✅ Good Schema Definition
export const countries = sqliteTable("countries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull().unique(),
  heroImage: text("hero_image"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdateFn(
    () => new Date()
  ),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});
```

### Service Layer

- **Separation of Concerns**: Keep database queries in service layer
- **Error Handling**: Implement proper error handling with fallbacks
- **Type Safety**: Return properly typed interfaces from services

## Styling Standards (Tailwind CSS)

### Class Organization

- **Utility First**: Use Tailwind utilities, avoid custom CSS when possible
- **Conditional Classes**: Use `cn()` utility for conditional classes
- **Component Variants**: Use consistent patterns for component variants
- **Responsive Design**: Mobile-first responsive design approach

```typescript
// ✅ Good Tailwind Usage
import { cn } from '@/lib/utils';

interface CardProps {
  variant?: 'default' | 'featured';
  className?: string;
}

function Card({ variant = 'default', className }: CardProps) {
  return (
    <div
      className={cn(
        // Base styles
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        // Variants
        {
          'border-2 border-primary': variant === 'featured',
          'hover:shadow-md transition-shadow': variant === 'default',
        },
        // Custom className override
        className
      )}
    >
      {/* Content */}
    </div>
  );
}
```

### RTL Support

- **Direction Awareness**: Use Tailwind directional utilities
- **Layout Mirroring**: Ensure proper layout for RTL languages
- **Text Alignment**: Use appropriate text alignment for locale

```typescript
// ✅ RTL-aware styling
<div className="flex items-center gap-4 ltr:flex-row rtl:flex-row-reverse">
  <Icon className="ltr:mr-2 rtl:ml-2" />
  <span className="text-start">Content</span>
</div>
```

## Internationalization Standards

### Translation Keys

- **Hierarchical Structure**: Use nested keys for organization
- **Semantic Naming**: Use meaningful, semantic key names
- **Consistent Patterns**: Follow consistent naming patterns
- **No Literal Strings**: All user-facing text must use translations

```typescript
// ✅ Good Translation Usage
import { useTranslations } from '@/app/i18n/client.ts';
import { Button } from "@/components/ui"

function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section>
      <h1>{t('headline')}</h1>
      <p>{t('description')}</p>
      <Button>{t('cta')}</Button>
    </section>
  );
}

// ✅ Translation file structure
{
  "Hero": {
    "headline": "Find Your Visa Requirements",
    "description": "Discover visa requirements for any destination",
    "cta": "Start Your Search"
  }
}
```

## Testing Standards

### Unit Testing

- **Jest Configuration**: Use established Jest configuration
- **Test Structure**: Follow Arrange-Act-Assert pattern
- **Coverage Focus**: Test business logic, not UI components
- **Mock Strategies**: Mock external dependencies appropriately

```typescript
// ✅ Good Test Structure
import { getCountryByCode } from "@/lib/services/country-service";

describe("getCountryByCode", () => {
  it("should return country data for valid code", async () => {
    // Arrange
    const countryCode = "AE";
    const locale = "en";

    // Act
    const result = await getCountryByCode(countryCode, locale);

    // Assert
    expect(result).toBeDefined();
    expect(result?.code).toBe(countryCode);
  });
});
```

## Error Handling Standards

### Application Errors

- **Graceful Degradation**: Implement fallbacks for all external dependencies
- **Error Boundaries**: Use React Error Boundaries for UI error handling
- **Logging**: Use consistent logging patterns with appropriate levels
- **User Feedback**: Provide meaningful error messages to users

```typescript
// ✅ Good Error Handling
export async function getVisaTypes(destination: string, locale: string) {
  try {
    // Database operation
    return results;
  } catch (error) {
    console.error(`Failed to get visa types for ${destination}:`, error);
    // Return graceful fallback
    return [];
  }
}
```

## Performance Standards

### Next.js Optimization

- **Image Optimization**: Use Next.js Image component
- **Bundle Analysis**: Monitor and optimize bundle size
- **Caching Strategies**: Implement appropriate caching
- **Core Web Vitals**: Maintain good performance metrics

### Database Performance

- **Query Optimization**: Use efficient database queries
- **Indexing Strategy**: Implement proper database indexing
- **Connection Management**: Handle database connections properly

## Security Standards

### Data Handling

- **Input Validation**: Validate all user inputs
- **SQL Injection Prevention**: Use parameterized queries
- **Environment Variables**: Secure handling of sensitive configuration
- **HTTPS Only**: All production traffic must use HTTPS

### Authentication & Authorization

- **Secure Sessions**: Implement secure session management
- **Role-Based Access**: Implement proper authorization patterns
- **API Security**: Secure all API endpoints appropriately

---

## Development Commands

### Quality Assurance

```bash
# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Type checking
pnpm type-check

# Run tests
pnpm test
```

### Database Operations

```bash
# Generate migrations
pnpm db:generate

# Run migrations
pnpm db:migrate

# Open database studio
pnpm db:studio
```

---

## Enforcement

These standards are enforced through:

- **ESLint Configuration**: Automated linting rules
- **Prettier Configuration**: Code formatting rules
- **TypeScript Compiler**: Type checking and validation
- **Pre-commit Hooks**: Husky and lint-staged validation
- **Code Review Process**: Manual review for adherence to standards

---

_This document should be updated as the project evolves and new patterns emerge._
