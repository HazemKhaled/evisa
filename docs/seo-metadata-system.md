# SEO Metadata System

This comprehensive SEO system provides multilingual support for all metadata, structured data, and search engine optimization features.

## Features

### ✅ Complete SEO Coverage

- **Meta Tags**: Title, description, keywords, author, robots
- **Open Graph**: Complete OG tags for social media sharing
- **Twitter Cards**: Optimized Twitter card metadata
- **Structured Data**: JSON-LD for rich snippets
- **Multilingual Support**: Full i18n support for all 8 languages
- **Sitemap**: Dynamic XML sitemap generation
- **Robots.txt**: Comprehensive robots.txt with AI bot blocking
- **Manifest**: PWA manifest with multilingual considerations

### ✅ Multilingual Support

- **8 Languages**: English, Spanish, Arabic, Portuguese, Russian, German, French, Italian
- **RTL Support**: Proper text direction for Arabic
- **Locale-specific URLs**: Each language has its own URL structure
- **Hreflang**: Proper alternate language links
- **Localized Content**: All metadata translated per locale

### ✅ Search Engine Optimization

- **Rich Snippets**: Organization, Website, Article, FAQ, Breadcrumb structured data
- **Performance**: Optimized for Core Web Vitals
- **Accessibility**: Proper semantic markup
- **Mobile-first**: Responsive design considerations
- **Security**: AI bot blocking, verification tags

## Usage

### Basic Page Metadata

```typescript
import { generatePageMetadata } from "@/lib/pageSEO";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return generatePageMetadata({
    locale: params.locale,
    pathname: "/about",
    title: "About Us",
    description: "Learn about our visa processing services",
    keywords: ["about", "visa services", "company"],
  });
}
```

### Blog Post Metadata

```typescript
import { generateBlogPostMetadata } from "@/lib/pageSEO";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return generateBlogPostMetadata({
    locale: params.locale,
    pathname: "/blog/visa-tips",
    title: "10 Essential Visa Tips",
    description: "Expert tips for successful visa applications",
    author: "GetTravelVisa.com",
    publishedDate: "2024-01-15",
    tags: ["visa tips", "travel", "guide"],
  });
}
```

### Destination Page Metadata

```typescript
import { generateDestinationMetadata } from "@/lib/pageSEO";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return generateDestinationMetadata({
    locale: params.locale,
    pathname: "/destinations/japan",
    destinationName: "Japan",
    destinationCountry: "JP",
    visaRequirements: "Tourist visa required for most nationalities",
    processingTime: "5-7 business days",
    cost: "$25",
  });
}
```

### Client-side SEO Component

```tsx
import { SEOHead } from "@/components/seo/SEOHead";

export default function MyPage({ locale }: { locale: string }) {
  return (
    <>
      <SEOHead
        locale={locale}
        title="Custom Page Title"
        description="Custom page description"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
        faqs={[
          {
            question: "How long does visa processing take?",
            answer: "Processing time varies by destination and visa type.",
          },
        ]}
      />
      {/* Your page content */}
    </>
  );
}
```

### Structured Data Components

```tsx
import {
  OrganizationStructuredData,
  BreadcrumbStructuredData,
  FAQStructuredData,
} from "@/components/seo/StructuredData";

export default function MyPage({ locale }: { locale: string }) {
  return (
    <>
      <OrganizationStructuredData locale={locale} />
      <BreadcrumbStructuredData
        locale={locale}
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />
      <FAQStructuredData
        locale={locale}
        faqs={[
          {
            question: "What documents do I need?",
            answer: "You need a valid passport and completed application form.",
          },
        ]}
      />
    </>
  );
}
```

## File Structure

```
src/
├── lib/
│   ├── seo.ts                 # Core SEO utilities
│   ├── pageSEO.ts            # Page-specific SEO functions
│   └── seo/
│       └── README.md         # This documentation
├── components/
│   └── seo/
│       ├── SEOHead.tsx       # Client-side SEO component
│       └── StructuredData.tsx # Structured data components
├── hooks/
│   └── useSEO.ts            # SEO hook for client components
└── app/
    ├── sitemap.ts           # Dynamic sitemap generation
    ├── robots.ts            # Robots.txt generation
    └── manifest.ts          # PWA manifest
```

## Best Practices

### 1. Title Optimization

- Keep titles under 60 characters
- Include primary keyword
- Make titles unique per page
- Use locale-specific titles

### 2. Description Optimization

- Keep descriptions under 160 characters
- Include call-to-action
- Use locale-specific descriptions
- Make descriptions compelling

### 3. Keywords Strategy

- Use 5-10 relevant keywords
- Include long-tail keywords
- Avoid keyword stuffing
- Use locale-specific keywords

### 4. Structured Data

- Always include Organization and Website data
- Add Breadcrumb data for navigation
- Use FAQ data for common questions
- Include Article data for blog posts

### 5. Image Optimization

- Use locale-specific OG images
- Optimize image sizes (1200x630 for OG)
- Include alt text
- Use WebP format when possible

## Testing

### Google Rich Results Test

Test your structured data: https://search.google.com/test/rich-results

### Facebook Sharing Debugger

Test OG tags: https://developers.facebook.com/tools/debug/

### Twitter Card Validator

Test Twitter cards: https://cards-dev.twitter.com/validator

### Google Search Console

Monitor your SEO performance and fix any issues.

## Performance Considerations

- All SEO metadata is generated at build time
- Structured data is optimized for performance
- Images are properly sized and optimized
- Metadata is cached for better performance

## Maintenance

- Update translations when adding new content
- Monitor search console for errors
- Test new pages with SEO tools
- Keep structured data up to date
- Review and update meta descriptions regularly
