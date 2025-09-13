# Testing Strategy

## Testing Pyramid

```
                    E2E Tests (Playwright)
                   /                    \
           Integration Tests (Jest + Supertest)
          /                              \
   Frontend Unit Tests         Backend Unit Tests
  (Jest + RTL)                    (Jest + Database)
```

**Test Distribution:**

- **Unit Tests (70%)**: Fast, isolated tests for business logic and components
- **Integration Tests (20%)**: Database operations, Server Actions, and API endpoints
- **E2E Tests (10%)**: Critical user journeys and multilingual functionality

## Test Organization

### Frontend Tests

```typescript
// Frontend test structure
src/
├── components/
│   ├── __tests__/
│   │   ├── destination-card.test.tsx
│   │   ├── visa-type-card.test.tsx
│   │   ├── search-filter-form.test.tsx
│   │   └── language-switcher.test.tsx
│   └── ui/
│       └── __tests__/
│           ├── button.test.tsx
│           ├── card.test.tsx
│           └── select.test.tsx
├── lib/
│   ├── __tests__/
│   │   ├── utils.test.ts
│   │   ├── blog-core.test.ts
│   │   └── json-ld.test.ts
│   └── utils/
│       └── __tests__/
│           ├── flags.test.ts
│           ├── pagination.test.ts
│           └── urls.test.ts
```

### Backend Tests

```typescript
// Backend test structure
src/
├── lib/
│   ├── services/
│   │   └── __tests__/
│   │       ├── country-service.test.ts
│   │       ├── visa-service.test.ts
│   │       └── blog-service.test.ts
│   ├── actions/
│   │   └── __tests__/
│   │       ├── destination-actions.test.ts
│   │       ├── contact-actions.test.ts
│   │       └── newsletter-actions.test.ts
│   └── db/
│       └── __tests__/
│           ├── connection.test.ts
│           └── migrations.test.ts
```

### E2E Tests

```typescript
// E2E test structure
tests/
├── e2e/
│   ├── homepage.spec.ts
│   ├── destination-search.spec.ts
│   ├── visa-eligibility.spec.ts
│   ├── blog-navigation.spec.ts
│   ├── multilingual.spec.ts
│   └── performance.spec.ts
├── fixtures/
│   ├── countries.json
│   ├── visa-types.json
│   └── blog-posts.json
└── utils/
    ├── test-helpers.ts
    └── database-setup.ts
```

## Test Examples

### Frontend Component Test

```typescript
// components/__tests__/destination-card.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { DestinationCard } from '../destination-card';
import type { Country } from '@/lib/types';

const mockDestination: Country & {
  visaCount: number;
  avgProcessingTime: number;
  minFee: number;
} = {
  id: 'ae',
  code: 'AE',
  name: 'United Arab Emirates',
  heroImage: '/images/uae.jpg',
  flagImage: '/images/flags/ae.svg',
  continent: 'Asia',
  region: 'Western Asia',
  capital: 'Abu Dhabi',
  currency: 'AED',
  languages: ['Arabic', 'English'],
  isActive: true,
  isPopular: true,
  visaCount: 5,
  avgProcessingTime: 3,
  minFee: 100,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null
};

// Mock Next.js components
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

jest.mock('next/link', () => {
  return function MockLink({ href, children }: any) {
    return <a href={href}>{children}</a>;
  };
});

describe('DestinationCard', () => {
  it('renders destination information correctly', () => {
    render(
      <DestinationCard
        country={mockDestination}
        locale="en"
      />
    );

    expect(screen.getByText('United Arab Emirates')).toBeInTheDocument();
    expect(screen.getByText('5 visas')).toBeInTheDocument();
    expect(screen.getByText('3d')).toBeInTheDocument();
    expect(screen.getByText('From $100')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/en/d/AE');
  });

  it('handles RTL layout correctly', () => {
    const { container } = render(
      <DestinationCard
        country={mockDestination}
        locale="ar"
        className="test-rtl"
      />
    );

    const card = container.querySelector('.test-rtl');
    expect(card).toHaveClass('rtl:text-right');
  });

  it('shows popular badge for popular destinations', () => {
    render(
      <DestinationCard
        country={mockDestination}
        locale="en"
      />
    );

    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('handles missing optional data gracefully', () => {
    const destinationWithoutData = {
      ...mockDestination,
      visaCount: 0,
      avgProcessingTime: 0,
      minFee: 0
    };

    render(
      <DestinationCard
        country={destinationWithoutData}
        locale="en"
      />
    );

    expect(screen.getByText('0 visas')).toBeInTheDocument();
    expect(screen.getByText('0d')).toBeInTheDocument();
    expect(screen.getByText('From $0')).toBeInTheDocument();
  });
});
```

### Backend API Test

```typescript
// lib/services/__tests__/country-service.test.ts
import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { CountryService } from "../country-service";
import { db } from "@/lib/db/connection";
import { countries, countriesI18n, visaTypes } from "@/lib/db/schema";

// Test database setup
beforeEach(async () => {
  // Setup test data
  await db.insert(countries).values([
    {
      id: "ae",
      code: "AE",
      name: "United Arab Emirates",
      continent: "Asia",
      region: "Western Asia",
      capital: "Abu Dhabi",
      currency: "AED",
      languages: ["Arabic", "English"],
      heroImage: "/images/uae.jpg",
      flagImage: "/images/flags/ae.svg",
      isActive: true,
      isPopular: true,
    },
    {
      id: "us",
      code: "US",
      name: "United States",
      continent: "North America",
      region: "Northern America",
      capital: "Washington D.C.",
      currency: "USD",
      languages: ["English"],
      heroImage: "/images/usa.jpg",
      flagImage: "/images/flags/us.svg",
      isActive: true,
      isPopular: true,
    },
  ]);

  await db.insert(countriesI18n).values([
    {
      id: "ae-en",
      countryId: "ae",
      locale: "en",
      name: "United Arab Emirates",
      about: "A modern destination in the Middle East",
    },
    {
      id: "ae-ar",
      countryId: "ae",
      locale: "ar",
      name: "الإمارات العربية المتحدة",
      about: "وجهة حديثة في الشرق الأوسط",
    },
  ]);

  await db.insert(visaTypes).values([
    {
      id: "ae-tourist",
      destinationId: "ae",
      name: "Tourist Visa",
      description: "30-day tourist visa",
      processingTime: 3,
      fee: 100,
      currency: "USD",
      validity: 30,
      stayDuration: 30,
      entryType: "single",
      category: "tourism",
      requirements: ["Passport", "Photo"],
      isActive: true,
      isPopular: true,
    },
  ]);
});

afterEach(async () => {
  // Clean up test data
  await db.delete(visaTypes);
  await db.delete(countriesI18n);
  await db.delete(countries);
});

describe("CountryService", () => {
  const countryService = new CountryService();

  describe("getPopularDestinations", () => {
    it("should return popular destinations with aggregated data", async () => {
      const destinations = await countryService.getPopularDestinations("en");

      expect(destinations).toHaveLength(2);
      expect(destinations[0]).toMatchObject({
        code: "AE",
        name: "United Arab Emirates",
        visaCount: 1,
        avgProcessingTime: 3,
        minFee: 100,
      });
    });

    it("should handle localized content correctly", async () => {
      const destinations = await countryService.getPopularDestinations("ar");

      const uaeDestination = destinations.find(d => d.code === "AE");
      expect(uaeDestination?.name).toBe("الإمارات العربية المتحدة");
      expect(uaeDestination?.about).toBe("وجهة حديثة في الشرق الأوسط");
    });

    it("should complete within performance limits", async () => {
      const startTime = performance.now();

      await countryService.getPopularDestinations("en");

      const executionTime = performance.now() - startTime;
      expect(executionTime).toBeLessThan(30); // Story 1.8 requirement
    });

    it("should fallback to English when translation missing", async () => {
      const destinations = await countryService.getPopularDestinations("fr");

      const usDestination = destinations.find(d => d.code === "US");
      expect(usDestination?.name).toBe("United States"); // English fallback
    });
  });
});
```

### E2E Test

```typescript
// tests/e2e/destination-search.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Destination Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should search for destinations and display results", async ({
    page,
  }) => {
    // Search for UAE
    await page.fill("[data-testid=destination-search]", "United Arab");
    await page.waitForLoadState("networkidle");

    // Verify search results
    const results = page.locator("[data-testid=destination-card]");
    await expect(results).toHaveCount(1);
    await expect(results.first()).toContainText("United Arab Emirates");
  });

  test("should filter by passport country", async ({ page }) => {
    // Select passport country
    await page.selectOption("[data-testid=passport-select]", "US");

    // Navigate to destinations page
    await page.click("[data-testid=view-all-destinations]");

    // Verify visa-free options are highlighted
    const visaFreeDestinations = page.locator("[data-testid=visa-free-badge]");
    await expect(visaFreeDestinations.first()).toBeVisible();
  });

  test("should work correctly in RTL languages", async ({ page }) => {
    // Switch to Arabic
    await page.click("[data-testid=language-switcher]");
    await page.click("[data-testid=language-ar]");

    // Verify RTL layout
    const body = page.locator("body");
    await expect(body).toHaveAttribute("dir", "rtl");

    // Verify Arabic content is displayed
    await expect(page.locator("h1")).toContainText("احصل على تأشيرة السفر");
  });

  test("should maintain performance standards", async ({ page }) => {
    // Start performance monitoring
    const startTime = Date.now();

    // Navigate to destination page
    await page.click("[data-testid=destination-card]");
    await page.waitForLoadState("networkidle");

    // Check page load time
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // 3 second target

    // Check Core Web Vitals
    const lcp = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ["largest-contentful-paint"] });
      });
    });

    expect(lcp).toBeLessThan(2500); // LCP target
  });

  test("should handle error states gracefully", async ({ page }) => {
    // Mock API failure
    await page.route("**/api/**", route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: "Internal server error" }),
      });
    });

    // Navigate to destinations
    await page.goto("/d");

    // Verify error message is displayed
    await expect(page.locator("[data-testid=error-message]")).toContainText(
      "Unable to load destinations"
    );

    // Verify retry button works
    await page.click("[data-testid=retry-button]");
  });
});

test.describe("Mobile Experience", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("should work correctly on mobile devices", async ({ page }) => {
    await page.goto("/");

    // Test mobile navigation
    await page.click("[data-testid=mobile-menu-toggle]");
    await expect(page.locator("[data-testid=mobile-menu]")).toBeVisible();

    // Test mobile search
    await page.fill("[data-testid=mobile-search]", "UAE");
    await expect(page.locator("[data-testid=search-results]")).toBeVisible();
  });
});
```

## Accessibility Testing Strategy

**WCAG 2.1 AA Compliance Framework:**

```typescript
// jest.config.js - Accessibility test setup
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/tests/setup/accessibility.ts"],
  testEnvironment: "jsdom",
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

// tests/setup/accessibility.ts
import "jest-axe/extend-expect";
import { configureAxe } from "jest-axe";

const axe = configureAxe({
  rules: {
    // WCAG 2.1 AA rules
    "color-contrast": { enabled: true },
    "keyboard-navigation": { enabled: true },
    "focus-management": { enabled: true },
    "aria-labels": { enabled: true },
    "heading-structure": { enabled: true },
  },
});

global.axe = axe;
```

**Component-Level Accessibility Tests:**

```typescript
// components/__tests__/accessibility/destination-card.a11y.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DestinationCard } from '../destination-card';

expect.extend(toHaveNoViolations);

describe('DestinationCard Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <DestinationCard
        country={mockDestination}
        locale="en"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support keyboard navigation', async () => {
    render(
      <DestinationCard
        country={mockDestination}
        locale="en"
      />
    );

    const card = screen.getByRole('link');
    card.focus();

    expect(card).toHaveFocus();
    expect(card).toHaveAttribute('aria-label', 'View visa information for United Arab Emirates');
  });

  it('should provide proper ARIA labels for screen readers', () => {
    render(
      <DestinationCard
        country={mockDestination}
        locale="en"
      />
    );

    expect(screen.getByRole('img', { name: 'United Arab Emirates flag' })).toBeInTheDocument();
    expect(screen.getByLabelText('5 visa types available')).toBeInTheDocument();
    expect(screen.getByLabelText('Average processing time: 3 days')).toBeInTheDocument();
  });

  it('should work correctly with RTL screen readers', async () => {
    const { container } = render(
      <DestinationCard
        country={mockDestination}
        locale="ar"
      />
    );

    expect(container.firstChild).toHaveAttribute('dir', 'rtl');

    const results = await axe(container, {
      rules: { 'aria-text': { enabled: true } }
    });
    expect(results).toHaveNoViolations();
  });
});
```

**E2E Accessibility Testing with Playwright:**

```typescript
// tests/e2e/accessibility.spec.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Compliance", () => {
  test("homepage should be WCAG 2.1 AA compliant", async ({ page }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("destination pages should support keyboard navigation", async ({
    page,
  }) => {
    await page.goto("/d/ae");

    // Test tab navigation through all interactive elements
    const interactiveElements = await page
      .locator("button, a, input, select")
      .all();

    for (let i = 0; i < interactiveElements.length; i++) {
      await page.keyboard.press("Tab");
      const focusedElement = await page.evaluate(
        () => document.activeElement?.tagName
      );
      expect(["BUTTON", "A", "INPUT", "SELECT"]).toContain(focusedElement);
    }
  });

  test("forms should provide clear error messages for screen readers", async ({
    page,
  }) => {
    await page.goto("/contact");

    // Submit empty form
    await page.click("[data-testid=submit-button]");

    // Check for ARIA live regions with error messages
    const errorRegion = page.locator('[aria-live="polite"]');
    await expect(errorRegion).toContainText(
      "Please fill out all required fields"
    );

    // Verify field-level error associations
    const emailField = page.locator("#email");
    const emailError = page.locator("#email-error");

    await expect(emailField).toHaveAttribute("aria-describedby", "email-error");
    await expect(emailError).toHaveAttribute("role", "alert");
  });

  test("should support screen reader announcements for dynamic content", async ({
    page,
  }) => {
    await page.goto("/");

    // Trigger search that loads dynamic content
    await page.fill("[data-testid=destination-search]", "UAE");

    // Wait for search results and announcements
    await page.waitForSelector('[aria-live="polite"]');

    const announcement = page.locator('[aria-live="polite"]');
    await expect(announcement).toContainText("1 destination found");
  });

  test("should provide proper color contrast ratios", async ({ page }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(["color-contrast"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should work with screen reader simulation", async ({ page }) => {
    // Enable screen reader mode simulation
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "userAgent", {
        value: navigator.userAgent + " NVDA/2023.1",
      });
    });

    await page.goto("/d/ae");

    // Test landmark navigation
    const landmarks = await page
      .locator('[role="main"], [role="navigation"], [role="complementary"]')
      .all();
    expect(landmarks.length).toBeGreaterThan(0);

    // Test heading structure
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all();
    expect(headings.length).toBeGreaterThan(0);

    // Verify logical heading hierarchy
    const firstHeading = await page.locator("h1").first();
    expect(firstHeading).toBeVisible();
  });
});
```

**CI/CD Accessibility Integration:**

```yaml
# .github/workflows/accessibility.yml
name: Accessibility Testing

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  accessibility-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js and pnpm
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - uses: pnpm/action-setup@v2
        with:
          version: "9"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run accessibility unit tests
        run: pnpm test:a11y

      - name: Build application
        run: pnpm build

      - name: Start test server
        run: pnpm start &

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Install Playwright
        run: pnpm exec playwright install --with-deps

      - name: Run accessibility E2E tests
        run: pnpm test:a11y-e2e

      - name: Upload accessibility reports
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: accessibility-reports
          path: |
            accessibility-report/
            playwright-report/
```

**Manual Accessibility Testing Checklist:**

```markdown
# Manual Accessibility Testing Procedures

## Keyboard Navigation Testing

- [ ] All interactive elements are reachable via Tab key
- [ ] Tab order follows logical visual flow
- [ ] Focus indicators are clearly visible
- [ ] Enter/Space keys activate buttons and links
- [ ] Escape key closes modals and dropdowns
- [ ] Arrow keys navigate within component groups

## Screen Reader Testing (NVDA/JAWS/VoiceOver)

- [ ] All content is announced correctly
- [ ] Headings create logical document structure
- [ ] Form labels are properly associated
- [ ] Error messages are announced immediately
- [ ] Dynamic content changes are announced
- [ ] Page titles are descriptive and unique

## Visual Accessibility Testing

- [ ] Text meets 4.5:1 contrast ratio (normal text)
- [ ] Large text meets 3:1 contrast ratio
- [ ] UI components meet 3:1 contrast ratio
- [ ] Content is readable at 200% zoom
- [ ] No information conveyed by color alone
- [ ] Focus indicators meet 3:1 contrast ratio

## RTL Accessibility Testing

- [ ] Reading order follows RTL direction
- [ ] Interactive elements positioned correctly
- [ ] Icons and graphics oriented properly
- [ ] Keyboard navigation follows RTL flow
- [ ] Screen reader announcements respect language direction
```

---
