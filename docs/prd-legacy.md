## Project Objectives:

- Help users travel with minimal or no visa process.

## Solution

- Centralized Document Center: Collect users' documents and list the maximum number of destinations available for their situation.
- Rapid Apply: We will do the visa process for him, or forward it to a visa service agency.
- Visa Catalog: Create destination-driven, non-boring content that helps users know everything about visas for each destination.

## Marketing

- Depend on SEO mainly to generate leads.
- AI-generated content, Schema.org, and Sitemap are gonna be the main billers for better SEO.
- Personalized emails for upsell service (Flight, accommodation, trips, etc.)

## Revenue Streams

1. Affiliation & Partnerships:
   1. Travel visa agencies
   2. Accommodation & transportation services
   3. Tourism trips
2. In-house services: Observing the services that we affiliate with, to start providing the services ourselves.

## Phases

By decreasing time to market, and Lean iterations! Will ensure that I adopt and adjust rapidly.

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
   1. Each country should have a subdomain with the 3-letter ex: uae.gettravelvisa.com, usa.gettravelvisa.com
   2. Add canonical meta tag for /d/{DESTINATION_COUNTRY}/
   3. All links in the subdomain should open the main domain on click

### 2. Affiliation travel visas

1. If there is a visa service provider for this visa type, show the apply button to open an external URL; if not, hide the button.
2. Service Providers
   1. Each provider will have a URL that accepts some placeholders to be replaced on user click, for example https://visa-provider.com/apply?c={country}\&p={passport}
   2. Add UTM query params for the url.

### 3. Destination Articles

1. Every destination should have some articles
2. List the latest articles in every destination page with a more button to open all articles as a blog
   1. Articles list page route /d/{DESTINATION_COUNTRY}/a
   2. Article details page /d/{DESTINATION_COUNTRY}/a/{ARTICLE_SLUG}
3. Add all ar

### Phase 4: In-house travel visas

TBD
