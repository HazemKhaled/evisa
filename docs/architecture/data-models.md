# Data Models

## Country

**Purpose:** Represents both destination countries and passport-issuing countries, supporting multilingual content and comprehensive metadata for visa processing.

**Key Attributes:**

- `id`: string (primary key) - Unique identifier
- `code`: string - ISO country code (e.g., 'US', 'AE', 'FR')
- `name`: string - English country name
- `continent`: string - Geographic continent
- `region`: string - Geographic region/subregion
- `capital`: string - Capital city
- `currency`: string - Primary currency code
- `languages`: string[] - Spoken languages
- `heroImage`: string - Main country image URL
- `flagImage`: string - Country flag image URL
- `isActive`: boolean - Whether country is available for visa processing
- `isPopular`: boolean - Featured in popular destinations
- `deletedAt`: Date | null - Soft delete timestamp

**TypeScript Interface:**

```typescript
interface Country {
  id: string;
  code: string;
  name: string;
  continent: string;
  region: string;
  capital: string;
  currency: string;
  languages: string[];
  heroImage: string;
  flagImage: string;
  isActive: boolean;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface CountryI18n {
  id: string;
  countryId: string;
  locale: string;
  name: string;
  about: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**

- One-to-many with CountryI18n (localized content)
- One-to-many with VisaType (destination country)
- One-to-many with VisaEligibility (both passport and destination)

## VisaType

**Purpose:** Defines available visa options for each destination country with detailed application requirements and processing information.

**Key Attributes:**

- `id`: string (primary key) - Unique identifier
- `destinationId`: string - Reference to destination country
- `name`: string - Visa type name (e.g., 'Tourist Visa', 'Business Visa')
- `description`: string - Detailed visa description
- `processingTime`: number - Processing time in days
- `fee`: number - Application fee amount
- `currency`: string - Fee currency
- `validity`: number - Visa validity in days
- `stayDuration`: number - Maximum stay duration in days
- `entryType`: enum - 'single' | 'multiple' | 'transit'
- `category`: string - Visa category classification
- `requirements`: string[] - Required documents and conditions
- `isActive`: boolean - Whether visa type is available
- `isPopular`: boolean - Featured visa option

**TypeScript Interface:**

```typescript
interface VisaType {
  id: string;
  destinationId: string;
  name: string;
  description: string;
  processingTime: number;
  fee: number;
  currency: string;
  validity: number;
  stayDuration: number;
  entryType: "single" | "multiple" | "transit";
  category: string;
  requirements: string[];
  isActive: boolean;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface VisaTypeI18n {
  id: string;
  visaTypeId: string;
  locale: string;
  name: string;
  description: string;
  requirements: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**

- Many-to-one with Country (destination)
- One-to-many with VisaEligibility
- One-to-many with VisaTypeI18n (localized content)

## VisaEligibility

**Purpose:** Defines many-to-many relationships between passport countries, destination countries, and visa types, enabling complex eligibility calculations.

**Key Attributes:**

- `id`: string (primary key) - Unique identifier
- `passportCountryId`: string - Passport issuing country
- `destinationId`: string - Destination country
- `visaTypeId`: string - Specific visa type
- `eligibilityStatus`: enum - 'visa_free' | 'visa_on_arrival' | 'visa_required' | 'not_allowed'
- `maxStayDays`: number | null - Maximum stay without visa (for visa-free)
- `notes`: string | null - Additional eligibility notes
- `isActive`: boolean - Whether eligibility rule is active

**TypeScript Interface:**

```typescript
interface VisaEligibility {
  id: string;
  passportCountryId: string;
  destinationId: string;
  visaTypeId: string;
  eligibilityStatus:
    | "visa_free"
    | "visa_on_arrival"
    | "visa_required"
    | "not_allowed";
  maxStayDays: number | null;
  notes: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
```

**Relationships:**

- Many-to-one with Country (passport country)
- Many-to-one with Country (destination country)
- Many-to-one with VisaType

## Blog Schema

**Purpose:** Database-driven blog system with multilingual support, SEO optimization, and proper content management.

### blog_posts

**Core blog post metadata and settings:**

- `id`: integer (primary key, auto increment)
- `slug`: string - URL-friendly identifier (unique per locale)
- `author`: string - Post author name
- `destinations`: string | null - Comma-separated country codes (e.g., "USA,CAN,FRA")
- `passports`: string | null - Comma-separated passport country codes
- `image`: string | null - Featured image URL
- `publishedAt`: timestamp - Publication date
- `isPublished`: boolean - Publication status (default: true)
- `createdAt`: timestamp - Record creation time
- `updatedAt`: timestamp - Last modification time
- `deletedAt`: timestamp | null - Soft delete timestamp

### blog_posts_i18n

**Localized content for each blog post:**

- `id`: integer (primary key, auto increment)
- `postId`: integer - Foreign key to blog_posts.id
- `locale`: string(2) - Language code (e.g., "en", "ar", "es")
- `title`: string - Localized post title
- `description`: string - Localized meta description
- `content`: text - Full post content (markdown/HTML)
- `metaKeywords`: string | null - SEO keywords for this locale
- `createdAt`: timestamp - Record creation time
- `updatedAt`: timestamp - Last modification time

**Constraints:** Unique(postId, locale) - one translation per language per post

### blog_tags

**Tag definitions for content categorization:**

- `id`: integer (primary key, auto increment)
- `name`: string - Human-readable tag name
- `slug`: string - URL-friendly tag identifier (unique)
- `createdAt`: timestamp - Record creation time
- `updatedAt`: timestamp - Last modification time

### blog_post_tags

**Many-to-many relationship between posts and tags:**

- `id`: integer (primary key, auto increment)
- `postId`: integer - Foreign key to blog_posts.id
- `tagId`: integer - Foreign key to blog_tags.id
- `createdAt`: timestamp - Relationship creation time

**Constraints:** Unique(postId, tagId) - prevent duplicate tag assignments

**Drizzle Schema:**

```typescript
interface BlogPostRecord {
  id: number;
  slug: string;
  author: string;
  destinations: string | null;
  passports: string | null;
  image: string | null;
  publishedAt: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface BlogPostI18nRecord {
  id: number;
  postId: number;
  locale: string;
  title: string;
  description: string;
  content: string;
  metaKeywords: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**

- blog_posts 1:many blog_posts_i18n
- blog_posts many:many blog_tags (via blog_post_tags)
- Country references via destinations/passports comma-separated fields

---
