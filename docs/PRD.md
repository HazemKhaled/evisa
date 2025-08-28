## Project Objectives:

- Help users travel with minimal or no visa process.

## Solution

- Centralized Document Center: Collect users' documents and list the maximum number of destinations available for their situation.
- Rapid Apply: We will do the visa process for him, or forward it to a visa service agency.
- Visa Catalog: Create destination-driven, non-boring content that helps users know everything about visas for each destination.

## Marketing

- Depend on SEO mainly to generate leads.
- AI-generated content, Schema.org, and Sitemap gonna be the main billers for better SEO.
- Personalized emails for upsell service (Flight, accommodation, trips, etc.)

## Revenue Streams

1. Affiliation & Partnerships:
   1. Travel visa agencies
   2. Accommodation & transportation services
   3. Tourism trips
2. In-house services: Observing the services that we affiliate with, to start providing the services ourselves.

## Phases

By decreasing time to market, and Lean iterations! Will ensure that I adopt and adjust rapidly.

### 0. NFRs

1. Stack:
   1. App should build with the latest version Next.js app router and follow Next.js best practices in every aspect
   2. Configure Eslint, Prettier, and Lint-Staged https\://nextjs.org/docs/app/api-reference/config/eslint
   3. Use Static in all static pages, and ISR with all dynamic pages if possible.
   4. Use TypeScript with strict types everywhere https\://nextjs.org/docs/app/api-reference/config/typescript
   5. Use the latest Tailwind CSS and make the layout modern and catchy
   6. Use Cairo font with next/font/google
   7. Use next/dynamic, React.lazy() with Suspense when it’s needed
   8. Use MDX with all static pages (ex: articles, terms and conditions ... etc)
   9. Database should be CloudFlare D1 database with Drizzle ORM
   10. Implement Sentry integration with Next.js, enable all Sentry features for everything except logs.
   11. Use latest version of all dependencies and up to date code.
   12. Use Cloudflare R2 for object storage.
   13. Build an admin area to manage everything in the application and it's login with next-auth 5
   14. User next-18next for multilingual
   15. Content should be in multiple languages
   16. All routes should have the language
2. Infrastructure
   1. Deployed on Cloudflare with OpenNext
      1. Configure all required Open-Next cache configurations to enable ISG
      2. Configure cached images on CloudFlare & Open-Next
   2. CI/CD with GitHub actions
      1. develop branch should deploy on staging-domain.tld
      2. Each GitHub release should deploy on production-domain.tld
      3. Each PullRequest should deploy on pr-PRNumber.staging-domain.tld
      4. Linting GitHub action to run tests and linting
   3. Use wrangler.jsonc instead of the .toml file
   4.
3. Analytics
   1. Integrate Next.js with GTM using @next/third-parties/google
   2. Integrate Next.js with Jitsu
4. SEO
   1. All pages should implement solid Metadata and OG images
   2. All pages should have schema.org markup for the best SEO, use JSON-LD as per Next.js docs
   3. Metadata and JSON-LD should respect user language
5. Other NFRs
   1. Multilingual, layout, and content should be multilingual, and this should be considered in the routes, sitemaps, and database structure.
   2. Sitemap should follow per Next.js best practices https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts

### 1. The catalog

#### 1.1: Destination-Based Catalog

1. Users can search by destination (country) and their passport to access the country page.
2. In the country page, list all visa options and make the unavailable options dimmed.
3. Under each visa option, show all info (fees, single/multiple entry, validity, etc), how to apply, and any requirements.
4. URL should be SEO friendly
   1. Country URL /d/{DESTINATION_COUNTRY}
   2. Visa Option /d/{DESTINATION_NAME}/v/{VISA_OPTION}
   3. Passport availability for this country /d/{DESTINATION_NAME}/p/{PASSPORT_COUNTRY}
   4. List all countries in /d/

#### 1.2: SEO & Sitemap

1. Create a sitemap index /sitemap_index.xml, include all sitemaps
2. Each destination will have its own sitemap.
   1. Route /d/{DESTINATION_COUNTRY}/sitemap.xml
   2. This should include all possible routes under this destination
3. Add another sitemap /sitemap.xml to include all standalone pages like contact us, terms & conditions … etc.
4. Add a subdomain for every country
   1. Each country should have a subdomain with the 3-letter ex: uae.production-domain.tld, usa.production-domain.tld
   2. Add canonical meta tag for /d/{DESTINATION_COUNTRY}/
   3. All links in the subdomain should open the main domain on click

### 2. Affiliation travel visas

1. If there is a visa service provider for this visa type, show the apply button to open an external URL; if not, hide the button.
2. Admin can CRUD visa Service Providers, and add the visa options provided by this provider.
   1. Each provider will have a URL that accepts some placeholders to be replaced on user click, for example https://visa-provider.com/apply?c={country}\&p={passport}
   2. Add UTM query params for the url.

### 3. Destination Articles

1. Every destination should have some articles
2. List latest articles in every destination page with a more button to open all articles as a blog
   1. Articles list page route /d/{DESTINATION_COUNTRY}/a
   2. Article details page /d/{DESTINATION_COUNTRY}/a/{ARTICLE_SLUG}
3. Add all ar

### Phase 4: In-house travel visas

TBD
