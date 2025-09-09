# 8. Styling Guidelines

## Styling Approach

**Utility-First Methodology with Tailwind CSS:**

- **Component-Scoped Styling**: Use Tailwind utilities within components, avoid global CSS except for design tokens
- **Design System Integration**: Leverage Tailwind's custom design tokens for consistent brand colors, spacing, and typography
- **RTL-First Approach**: Design components to work seamlessly in both LTR and RTL layouts
- **Performance Optimization**: Purge unused CSS classes, optimize for minimal bundle size
- **Responsive Design**: Mobile-first approach with systematic breakpoint usage

## Global Theme Variables

```css
/* globals.css - Design system variables and base styles */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS Custom Properties for Design System */
:root {
  /* Brand Colors */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;

  /* Typography Scale */
  --font-family-primary:
    "Cairo", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem; /* 36px */
  --font-size-5xl: 3rem; /* 48px */
  --font-size-6xl: 3.75rem; /* 60px */

  /* Animation Durations */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
}

/* RTL-specific adjustments */
[dir="rtl"] {
  font-family: "Cairo", "Arabic UI Display", "Arabic UI Text", sans-serif;
}

/* Component layer for reusable patterns */
@layer components {
  /* Button variants */
  .btn-primary {
    @apply inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none;
  }

  /* Card variants */
  .card-base {
    @apply relative rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg;
  }

  /* Form components */
  .form-input {
    @apply block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm;
  }
}
```

---
