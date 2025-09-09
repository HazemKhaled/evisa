# 9. Testing Requirements

## Component Test Template

```typescript
/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DestinationCard } from '../destination-card';
import { type Country } from '@/lib/types/database';

// Mock external dependencies
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/en/d/uae',
}));

// Mock data
const mockDestination: Country = {
  id: 'uae',
  code: 'AE',
  name: 'United Arab Emirates',
  localizedName: 'United Arab Emirates',
  region: 'Middle East',
  flagUrl: '/images/flags/uae.svg',
  featured: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

describe('DestinationCard', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders destination information correctly', () => {
      render(
        <DestinationCard
          destination={mockDestination}
          locale="en"
        />
      );

      expect(screen.getByText('United Arab Emirates')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /united arab emirates flag/i })).toBeInTheDocument();
      expect(screen.getByText('Middle East')).toBeInTheDocument();
    });

    it('applies featured styling when destination is featured', () => {
      render(
        <DestinationCard
          destination={{ ...mockDestination, featured: true }}
          locale="en"
        />
      );

      const card = screen.getByRole('article');
      expect(card).toHaveClass('border-blue-200', 'bg-gradient-to-br');
    });
  });

  describe('Internationalization', () => {
    it('renders correctly for RTL languages', () => {
      render(
        <DestinationCard
          destination={mockDestination}
          locale="ar"
        />
      );

      const card = screen.getByRole('article');
      expect(card).toHaveClass('text-right');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <DestinationCard
          destination={mockDestination}
          locale="en"
        />
      );

      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-label', expect.stringContaining('United Arab Emirates'));
      expect(card).toHaveAttribute('tabIndex', '0');
    });
  });
});
```

## Testing Best Practices

**Unit Testing Standards:**

- **Component Isolation**: Test components in isolation with mocked dependencies
- **User-Centric Testing**: Focus on user interactions rather than implementation details
- **Accessibility Testing**: Verify ARIA attributes, keyboard navigation, and screen reader support
- **Internationalization Testing**: Test RTL layouts, translated content, and locale-specific behavior
- **Error Boundary Testing**: Verify graceful degradation when components receive invalid props

**Integration Testing Patterns:**

- **Service Layer Testing**: Test database operations, API calls, and business logic
- **Route Integration**: Test Next.js routing with locale handling and parameter validation
- **Form Workflows**: Test complete user journeys from search to affiliate partner redirection
- **SEO Integration**: Verify meta tag generation, structured data, and sitemap functionality

---
