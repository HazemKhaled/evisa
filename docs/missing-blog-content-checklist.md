# Missing Blog Content Checklist

## Purpose

This document is the execution checklist for all materially missing blog content after reconciling the content strategy with the live Neon `development` dataset.

Use this as the source of truth for:

- what content is still missing
- how each post must be written
- how each post must be localized into all supported languages
- how each post must be inserted into Neon via MCP

## Source References

Use these as the authoritative references while drafting and publishing:

- Strategy and article ideas: [docs/content-strategy-2025–2026.md](/Users/hazem.n/Repos/tmp/evisa/docs/content-strategy-2025%E2%80%932026.md)
- Blog schema: [packages/database/src/schema/blog-posts.ts](/Users/hazem.n/Repos/tmp/evisa/packages/database/src/schema/blog-posts.ts)
- Admin validation and required fields: [apps/admin/src/app/blog-posts/blog-post-dialog.tsx](/Users/hazem.n/Repos/tmp/evisa/apps/admin/src/app/blog-posts/blog-post-dialog.tsx)
- Blog JSON-LD generation: [apps/website/src/lib/json-ld.ts](/Users/hazem.n/Repos/tmp/evisa/apps/website/src/lib/json-ld.ts)
- Existing seed shape for reference: [packages/database/data-seeds/0008_blog_posts.sql](/Users/hazem.n/Repos/tmp/evisa/packages/database/data-seeds/0008_blog_posts.sql)

## Live DB Baseline

Verified in Neon project `aged-bush-31271179`, database `gtv`, branch `development` (`br-snowy-butterfly-adh5es19`):

- 34 total `blog_posts`
- 33 published posts
- 264 `blog_posts_i18n` rows
- 8 locales present
- Production branch is empty for blog content

Current published content already covers a subset of:

- USA destination content
- UK destination content
- UAE destination content
- Saudi Arabia destination content
- Japan destination content
- Canada destination content
- Europe multi-country travel guides
- General visa guides for UK, USA B-2, Schengen, Japan, and Canada

This means the backlog below focuses on net-new content or content that is still missing in strategy terms.

## Supported Languages

Every publishable post must ship in all supported locales:

- `en`
- `ar`
- `es`
- `pt`
- `ru`
- `de`
- `fr`
- `it`

## Definition Of Done For Every Post

A post is only complete when all of the following are true:

- The exact search intent is clear and narrower than a broad travel topic.
- Sentence one answers the core question directly.
- The post has one canonical slug in `blog_posts`.
- The post has localized `title`, `description`, `content`, and `metaKeywords` in all 8 locales.
- The post includes at least one authoritative official source link where relevant.
- The post links to at least 2 relevant internal pages when they exist.
- The post has destination codes and passport codes when applicable.
- The post has a valid image URL.
- The post is tagged consistently.
- The post is inserted into the Neon `development` branch first.
- The inserted row is verified in the DB after insertion.
- Localization is complete and fact-consistent across all languages.

## Writing Standard: Perfect Post Requirements

### Core quality bar

Every post must be:

- searchable, shareable, or both
- fact-specific, not generic
- strongly aligned to the traveler’s actual decision question
- useful without requiring the user to read other pages first
- written with authority, not hedged filler

### Opening rule

The first paragraph must contain the direct answer.

Examples:

- Good: `Saudi passport holders can travel to Japan visa-free for up to 90 days for short tourism visits, but business, study, and work trips require different documentation.`
- Bad: `Japan is one of the most fascinating destinations in the world for international travelers.`

### Content structure

Use this post structure unless the topic requires a stronger alternative:

1. Direct answer or thesis in the opening paragraph
2. Why this matters now
3. Eligibility, requirements, or decision criteria
4. Step-by-step process or planning guidance
5. Costs, timing, and common mistakes
6. Best practices or traveler-specific considerations
7. Internal links to relevant destination or visa pages
8. Official source links
9. FAQ section
10. Short conclusion with next action

### Markdown rules

- Store the body in Markdown.
- Do not include frontmatter inside `content`.
- The DB `title` field is the page title; do not repeat a redundant H1 unless there is a strong reason.
- Use descriptive H2 and H3 headings.
- Use tables sparingly and only when they add comparison value.
- Use bullets for checklists, requirements, and steps.
- Keep paragraphs short and scannable.

### SEO rules

For each locale:

- `title` must be specific and intent-aligned.
- `description` must be a compelling meta description, not a truncated intro.
- `metaKeywords` should be locale-specific comma-separated keywords, not copied from English.
- The slug must remain language-agnostic and stable across locales.
- Use the exact country, passport, and visa entities consistently across all locales.

### AI-SEO rules

Every post must:

- answer the question in sentence one
- avoid vague intros
- maintain entity consistency across all languages
- include official-source links for visa and rule-heavy content
- include a compact FAQ block for extraction value
- use confident, audited language that an AI system can cite directly

### Internal linking rules

Every new post should link where relevant to:

- destination pages under the destination route structure
- existing visa guides already in the blog
- related pillar articles once they exist

### Official-source rules

Visa and entry-rule posts must cite official sources when available, for example:

- `mofa.go.jp`
- `canada.ca`
- `gov.uk`
- `travel.state.gov`
- `ec.europa.eu`
- destination tourism boards or immigration sites

## Localization Standard: Perfect In All Languages

Localization is not literal translation. Each locale must read as native editorial content while preserving the same facts.

### Non-negotiables

- Facts must match across all locales.
- Country names, passport names, and visa types must remain entity-consistent.
- Dates, durations, fees, and rule conditions must not drift by locale.
- Arabic must read naturally in RTL and not feel machine-translated.
- Do not transliterate unnecessarily if the local language has a standard term.
- Keep search intent localized. Do not force English phrasing into non-English markets.

### Locale-specific guidance

- `en`: baseline source draft
- `ar`: prioritize Gulf traveler phrasing and natural RTL readability
- `es`: use neutral international Spanish unless a market-specific reason exists
- `pt`: use neutral Portuguese consistently
- `ru`: avoid awkward calques from English travel copy
- `de`: preserve specificity and legal clarity in visa content
- `fr`: prioritize clarity and idiomatic phrasing over literal translation
- `it`: keep headline and subheads concise and natural

### Localization checklist per locale

- Title rewritten natively for search intent
- Description rewritten natively for CTR
- Body rewritten natively, not literally translated
- Meta keywords localized
- Official sources preserved
- Internal links updated to the correct locale routes where applicable
- FAQ localized, not copied

## DB Field Requirements

Every post insert must populate these required fields.

### `blog_posts`

Required:

- `slug`
- `author`
- `published_at`
- `is_published`

Recommended whenever relevant:

- `destinations` as comma-separated country codes
- `passports` as comma-separated country or passport-market codes
- `image`

### `blog_posts_i18n`

Required for every locale:

- `post_id`
- `locale`
- `title`
- `description`
- `content`

Recommended:

- `meta_keywords`

### `blog_tags` and `blog_post_tags`

Use tags to represent:

- pillar
- destination
- traveler type
- visa type
- format or angle

## Tagging Rules

Apply a minimum of 4 to 8 high-quality tags per post.

Suggested tag pattern:

- 1 pillar tag
- 1 destination tag where applicable
- 1 traveler or audience tag where applicable
- 1 visa or planning tag where applicable
- 1 angle tag such as `comparison`, `cost-guide`, `halal-travel`, `digital-nomad`, `family-travel`

## Missing Content Checklist

### Phase 1: Highest ROI Missing Content

### Pillar 1: Visa Intelligence

These are still missing in strategy terms even where a general guide exists.

- [x] **Saudi passport to Japan no-visa guide** - [Published](https://www.gettravelvisa.com/en/blog/saudi-passport-japan-no-visa-guide) (2025-03-17)
  - Full title: `Your Saudi Passport and Japan: The Complete No-Visa Entry Guide`
  - Primary intent: Saudi passport holders checking Japan entry rules
  - Reuse from existing: Japan tourist visa guide
  - New requirement: make it passport-specific and decision-first
  - Tags: `visa-intelligence`, `japan`, `saudi-passport`, `visa-free-travel`
  - Destinations: `JPN`
  - Passports: `tourist,visa-free`
  - Locales: 8 (en, ar, es, pt, ru, de, fr, it) ✓
  - Tags: 4 attached ✓
  - Content verified ✓

- [x] Indian passport in Europe guide - [Published](https://www.gettravelvisa.com/en/blog/indian-passport-europe-guide) (2025-03-20)
  - Full title: `Indian Passport in Europe: Which Countries Need a Visa in 2025`
  - Suggested tags: `visa-intelligence`, `europe`, `indian-passport`, `schengen`
  - Destinations: `DE,FR,IT,ES,GB` ✓
  - Passports: `IN` ✓
  - Locales: 8 (en, ar, es, pt, ru, de, fr, it) ✓
  - Tags: 4 attached ✓
  - Content verified ✓

- [x] UAE residents UK visa guide - [Published](https://www.gettravelvisa.com/en/blog/uae-residents-uk-visa-guide) (2025-03-19)
  - Full title: `UAE Residents Getting a UK Visa: The Complete Guide for Expats`
  - Reuse from existing: UK visa application guide
  - New requirement: center UAE-based expats
  - Suggested tags: `visa-intelligence`, `uk`, `uae-residents`, `visitor-visa`
  - Destinations: `GB` ✓
  - Passports: `AE` ✓
  - Locales: 8 (en, ar, es, pt, ru, de, fr, it) ✓
  - Tags: 4 attached ✓
  - Content verified ✓

- [x] Egyptian passport global visa guide - [Published](https://www.gettravelvisa.com/en/blog/egyptian-passport-global-visa-guide) (2025-03-26)
  - Full title: `The Egyptian Passport Visa Guide: 40+ Countries, Zero Confusion`
  - Tags: `visa-intelligence`, `egyptian-passport`, `visa-free-travel`, `travel-planning` ✓
  - Passports: `EG` ✓
  - Locales: 8 (en, ar, es, pt, ru, de, fr, it) ✓
  - Tags: 4 attached ✓
  - Content verified ✓

- [x] Pakistan passport travel guide - [Published](https://www.gettravelvisa.com/en/blog/pakistan-passport-travel-guide) (2025-03-27)
  - Full title: `Pakistan Passport Travel: Every Country You Can Visit Right Now`
  - Tags: `visa-intelligence`, `pakistani-passport`, `visa-free-travel`, `travel-planning` ✓
  - Passports: `PK` ✓
  - Locales: 8 (en, ar, es, pt, ru, de, fr, it) ✓
  - Tags: 4 attached ✓
  - Content verified ✓

- [x] Saudi Arabia e-visa eligible countries guide - [Published](https://www.gettravelvisa.com/en/blog/saudi-arabia-evisa-eligible-countries-guide) (2025-03-28)
  - Full title: `Saudi Arabia e-Visa: Which Countries Can Get In Instantly`
  - Tags: `visa-intelligence`, `saudi-arabia`, `e-visa`, `entry-rules` ✓
  - Destinations: `SA` ✓
  - Locales: 8 (en, ar, es, pt, ru, de, fr, it) ✓
  - Tags: 4 attached ✓
  - Content verified ✓

- [x] Japan visa for Indians guide - [Published](https://www.gettravelvisa.com/en/blog/japan-visa-for-indians-guide) (2025-03-29)
  - Full title: `Japan Visa for Indians: New Rules, Processing Time & What Officers Check`
  - Tags: `visa-intelligence`, `japan`, `indian-passport`, `visa-application` ✓
  - Destinations: `JP` ✓
  - Passports: `IN` ✓
  - Locales: 8 (en, ar, es, pt, ru, de, fr, it) ✓
  - Tags: 4 attached ✓
  - Content verified ✓

- [x] US visa from UAE guide - [Published](https://www.gettravelvisa.com/en/blog/us-visa-from-uae-guide) (2025-03-30)
  - Full title: `US Visa from UAE: How Gulf Expats Get the B-2`
  - Tags: `visa-intelligence`, `usa`, `uae-residents`, `b2-visa` ✓
  - Destinations: `US` ✓
  - Passports: `AE` ✓
  - Locales: 8 (en, ar, es, pt, ru, de, fr, it) ✓
  - Tags: 4 attached ✓
  - Content verified ✓

- [x] Schengen visa for Saudis guide - [Published](https://www.gettravelvisa.com/en/blog/schengen-visa-saudis-guide) (2025-03-21)
  - Full title: `Schengen Visa for Saudis: The Exact Documents That Get You Approved`
  - Reuse from existing: Schengen visa guide
  - New requirement: Saudi-specific documentation and framing
  - Suggested tags: `visa-intelligence`, `schengen`, `saudi-passport`, `schengen-saudi`
  - Destinations: `DE,FR,IT,ES` ✓
  - Passports: `SA` ✓
  - Locales: 8 (en, ar, es, pt, ru, de, fr, it) ✓
  - Tags: 4 attached ✓
  - Content verified ✓

- [ ] Japan visa for Indians guide
  - Working title: `Japan Visa for Indians: New Rules, Processing Time & What Officers Check`
  - Reuse from existing: Japan tourist visa guide
  - New requirement: India-specific eligibility and process framing
  - Suggested tags: `visa-intelligence`, `japan`, `indian-passport`, `visa-application`
  - Destinations: `JP`
  - Passports: `IN`

- [ ] US visa from UAE guide
  - Working title: `US Visa from UAE: How Gulf Expats Get the B-2`
  - Reuse from existing: USA B-2 guide
  - New requirement: UAE departure context and expat framing
  - Suggested tags: `visa-intelligence`, `usa`, `uae-residents`, `b2-visa`
  - Destinations: `US`
  - Passports: `AE`

- [ ] ESTA vs Gulf citizens article
  - Working title: `The ESTA Trap: Why Gulf Citizens Can't Use It And What They Need Instead`
  - Reuse from existing: USA B-2 guide
  - Suggested tags: `visa-intelligence`, `usa`, `esta`, `gulf-travelers`
  - Destinations: `US`

### Pillar 2: High-Gap Destination Deep Dives

- [ ] Thailand guide for Gulf travelers
- [x] **Turkey and Istanbul guide for Arab travelers** - [Published](https://www.gettravelvisa.com/en/blog/turkey-istanbul-arab-travelers-guide) (2025-03-23)
  - Locales: 8 ✓ | Tags: 3 ✓ | Destinations: TR ✓
- [ ] Bali family and halal-friendly guide
- [ ] South Korea guide for Arab travelers
- [ ] Maldives budget guide for Gulf travelers
- [ ] Morocco guide for Arab travelers
- [ ] Greece budget guide
- [ ] Singapore short-break guide
- [ ] Jordan 5-day travel guide
- [ ] Egypt first-timer guide for non-Egyptians

For each destination guide:

- include best neighborhoods or anchor cities
- include cultural fit notes for Gulf travelers when relevant
- include budget range
- include best time to visit
- include transport basics
- include food and accommodation pointers
- include visa context only where it directly affects planning

### Pillar 3: Traveler Type

- [x] **Halal food in Japan guide** - [Published](https://www.gettravelvisa.com/en/blog/halal-food-japan-guide) (2025-03-22)
  - Locales: 8 ✓ | Tags: 4 ✓ | Destinations: JPN ✓
- [ ] Halal travel in Europe guide
- [ ] Japan with kids guide
- [ ] Gulf family holiday blueprint
- [ ] Solo female travel in Japan guide
- [ ] Saudi women traveling solo guide
- [ ] Digital nomad visas 2025 guide
- [ ] Remote work from Bali guide
- [ ] Luxury travel in Japan guide
- [ ] How Gulf millionaires actually travel

### Pillar 4: Travel Intelligence

- [ ] Dubai vs Abu Dhabi comparison
- [x] **Japan vs South Korea comparison** - [Published](https://www.gettravelvisa.com/en/blog/japan-vs-south-korea-comparison-guide) (2025-03-24)
  - Locales: 8 ✓ | Tags: 3 ✓ | Destinations: JPN,KR ✓
- [ ] Schengen vs UK visa comparison
- [ ] Japan two-week cost guide
- [ ] Europe on 50 dollars a day guide
- [ ] Real cost of a family trip to the USA
- [ ] Best month to visit every Middle East country
- [ ] ESTA vs B-2 comparison
- [ ] Overstaying a visa guide
- [ ] Cheapest time to fly from Dubai to Japan, London, and New York

### Pillar 5: Trending and Thought Leadership

Treat these as missing unless a current live post already satisfies the exact angle.

- [x] **Saudi Arabia is open now guide** - [Published](https://www.gettravelvisa.com/en/blog/saudi-arabia-open-now-2025-guide) (2025-03-25)
  - Existing related post: Saudi Vision 2030 tourism guide
  - Action: New 2025-specific guide for current travelers
  - Locales: 8 ✓ | Tags: 3 ✓ | Destinations: SA ✓

- [ ] Japan 50 million tourists article
- [ ] Death of the tourist visa article
- [ ] AI planned my Europe trip article
- [ ] Countries about to become huge in 2026 article
- [ ] Why Arabs travel differently article
- [ ] NEOM, Qiddiya, Red Sea explainer
  - Existing related post: Saudi Vision 2030 tourism guide
  - Action: likely a sharper derivative or expansion post

- [ ] Rise of the Gulf traveler article
- [ ] Passport score shifts article
- [ ] Visa interview insider guide

## Phase 2: Programmatic Template Families

Do not start these until Phase 1 is stable.

- [ ] `[Passport] to [Destination]: Visa Required?`
- [ ] `[Destination] for [Nationality] Travelers`
- [ ] `[Destination] Visa Cost for [Nationality]`
- [ ] `Best Time to Visit [Destination] from [City]`
- [ ] `[Duration] in [Destination]: The Itinerary`

Before generating these at scale:

- define a template system
- define legal and factual QA rules
- define field-level source provenance
- define programmatic internal linking rules

## Recommended Execution Order

1. Passport-led visa intelligence posts
2. High-gap destinations
3. Halal and traveler-type cluster
4. Comparison and cost content
5. Thought leadership and trend pieces
6. Programmatic templates

## Per-Post Working Template

Use this checklist every time a writer starts a post.

- [ ] Confirm exact search query and audience
- [ ] Confirm pillar and tags
- [ ] Confirm destination codes and passport codes
- [ ] Draft English source version
- [ ] Add direct answer in first paragraph
- [ ] Add official links
- [ ] Add internal links
- [ ] Add FAQ section
- [ ] Draft localized versions for all 8 locales
- [ ] Localize `metaKeywords`
- [ ] Final QA for factual consistency
- [ ] Insert into Neon `development`
- [ ] Verify inserted row and localizations
- [ ] Mark ready for production promotion

## Neon MCP Insertion Workflow

Always insert new blog content into the `development` branch first.

### Neon targets

- Project ID: `aged-bush-31271179`
- Database: `gtv`
- Development branch: `br-snowy-butterfly-adh5es19`
- Production branch: `br-rough-wind-adjnoc4r`

### Insert order

1. Ensure required tags exist in `blog_tags`
2. Insert one row into `blog_posts`
3. Capture returned `id`
4. Insert 8 rows into `blog_posts_i18n`
5. Insert rows into `blog_post_tags`
6. Verify by querying slug and locale count

### Required insert payload shape

`blog_posts`

- `slug`
- `author`
- `destinations`
- `passports`
- `image`
- `published_at`
- `is_published`

`blog_posts_i18n`

- `post_id`
- `locale`
- `title`
- `description`
- `content`
- `meta_keywords`

### MCP execution pattern

Preferred tool sequence:

1. `mcp_neon_run_sql` to check whether the slug already exists
2. `mcp_neon_run_sql` to upsert any missing tags
3. `mcp_neon_run_sql_transaction` to insert `blog_posts`, `blog_posts_i18n`, and `blog_post_tags`
4. `mcp_neon_run_sql` to verify

### Pre-insert verification query

Use a query equivalent to:

- count rows in `blog_posts` where `slug = ?`
- count rows in `blog_posts_i18n` for the candidate slug via join
- select existing tags that will be attached

### Post-insert verification query

Verify all of the following:

- the slug exists once in `blog_posts`
- there are 8 localized rows in `blog_posts_i18n`
- `is_published` is correct
- `published_at` is correct
- tags are attached

### SQL shape guidance

Use a transaction that:

- inserts the base post and returns `id`
- inserts one localized row for each locale
- resolves tag IDs by slug and inserts into `blog_post_tags`

If tags do not exist yet, insert them first with conflict-safe behavior.

## Publish Safety Rules

- Never insert directly into production first.
- Never publish a post with fewer than 8 localized rows unless it is explicitly a draft.
- Never reuse a slug for a materially different topic.
- Never mark `is_published = true` before QA is complete.
- Never insert visa-rule content without official-source validation.

## Recommended DB Verification Checklist After Each Insert

- [ ] Slug exists once
- [ ] 8 i18n rows exist
- [ ] English title matches source brief
- [ ] Arabic localization exists and is not empty
- [ ] Meta descriptions exist in all locales
- [ ] Tag links exist
- [ ] Destination codes are correct
- [ ] Passport codes are correct
- [ ] Published date is intentional
- [ ] Draft vs published status is intentional

## Content QA Checklist Before Insert

- [ ] The article answers a real search intent
- [ ] The first paragraph contains the direct answer
- [ ] The angle is not already fully covered by an existing post
- [ ] There are no unsupported factual claims
- [ ] Official sources are linked where required
- [ ] The post adds unique value beyond generic travel advice
- [ ] The title is strong in every locale
- [ ] The description is not generic in every locale
- [ ] The FAQ is useful and non-repetitive
- [ ] The article includes at least one clear next step for the reader

## Existing Posts To Reuse, Not Duplicate

Use these as source material or internal-link targets, not as duplication candidates:

- UK visa application guide
- USA Tourist Visa B-2 guide
- Schengen visa guide
- Japan tourist visa guide
- Japan business visa guide
- Canada visitor visa guide
- Canada business visa guide
- Saudi Arabia Vision 2030 tourism guide

## Immediate Sprint Recommendation

### Batch 1 (Sprint 1) - COMPLETED ✓

First 8 posts (published 2025-03-17 through 2025-03-25):

- [x] **Saudi passport to Japan no-visa guide** - [Published](https://www.gettravelvisa.com/en/blog/saudi-passport-japan-no-visa-guide) (2025-03-17)
- [x] **UAE residents UK visa guide** - [Published](https://www.gettravelvisa.com/en/blog/uae-residents-uk-visa-guide) (2025-03-19)
- [x] **Indian passport in Europe guide** - [Published](https://www.gettravelvisa.com/en/blog/indian-passport-europe-guide) (2025-03-20)
- [x] **Schengen visa for Saudis guide** - [Published](https://www.gettravelvisa.com/en/blog/schengen-visa-saudis-guide) (2025-03-21)
- [x] **Halal food in Japan guide** - [Published](https://www.gettravelvisa.com/en/blog/halal-food-japan-guide) (2025-03-22)
- [x] **Turkey and Istanbul guide for Arab travelers** - [Published](https://www.gettravelvisa.com/en/blog/turkey-istanbul-arab-travelers-guide) (2025-03-23)
- [x] **Japan vs South Korea comparison** - [Published](https://www.gettravelvisa.com/en/blog/japan-vs-south-korea-comparison-guide) (2025-03-24)
- [x] **Saudi Arabia is open now guide** - [Published](https://www.gettravelvisa.com/en/blog/saudi-arabia-open-now-2025-guide) (2025-03-25)

### Batch 2 (Sprint 2) - COMPLETED ✓

Next 5 posts (published 2025-03-26 through 2025-03-30):

- [x] **Egyptian passport global visa guide** - [Published](https://www.gettravelvisa.com/en/blog/egyptian-passport-global-visa-guide) (2025-03-26)
- [x] **Pakistan passport travel guide** - [Published](https://www.gettravelvisa.com/en/blog/pakistan-passport-travel-guide) (2025-03-27)
- [x] **Saudi Arabia e-visa eligible countries guide** - [Published](https://www.gettravelvisa.com/en/blog/saudi-arabia-evisa-eligible-countries-guide) (2025-03-28)
- [x] **Japan visa for Indians guide** - [Published](https://www.gettravelvisa.com/en/blog/japan-visa-for-indians-guide) (2025-03-29)
- [x] **US visa from UAE guide** - [Published](https://www.gettravelvisa.com/en/blog/us-visa-from-uae-guide) (2025-03-30)

## Notes

- The live `development` branch also contains one unpublished `test` slug and one partial Spanish-only localized slug `visa-usa-turista`. Do not model new content on either of those rows.
- The current backlog should be treated as a net-new strategy backlog on top of the existing 33 published posts, not as a full greenfield blog population effort.
