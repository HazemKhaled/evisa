# Tasks

## NFRs

- [x] Configure Quality gates eslint, prettier, husky and lint-staged and configure all recommended configurations
- [x] Configure tailwind
- [x] Implement the required design with required font
- [x] Configure [Drizzle ORM with Cloudflare D1](https://opennext.js.org/cloudflare/howtos/db#d1-example), and prepare the [local development environment](https://developers.cloudflare.com/d1/best-practices/local-development/)
- [x] Use i18next for multilingual, make sure language switcher working as expected, and routes updated supporting all required languages. Make sure RTL is working if the selected language is right to left.
- [ ] Integrate Sentry & error proper error boundaries
- [ ] Integrate Google Tag Manager
- [ ] Integrate Jitsu with Next.js
- [x] Configure Jest and add basic coverage

## Main pages

- [x] Create About Us, Contact Us, Privacy Policy and Terms & Conditions pages in all languages
- [x] Update the navigation links

## Travel Blog

Create the blog as required

- [x] Content should be saves as mdx files in `/src/contents/{locale}/blog/{slug}.mdx`, and use `generateStaticParams` to generate it in the build time.
- [x] Create a new page blog home page `/[locale]/blog` to list all blog posts in a nice grid with the featured image, title, description, destination and tags, make pagination, and add the link in the navigation bar.
- [x] Clicking on the blog post card should open Blog post page.
- [x] Blog post page should have nice UI.
- [x] Show blog post tags in blog post page. On click open `/[locale]/blog?tag={tag}` and list all posts under this tag (using query params instead of separate route).
- [ ] Show blog post destination in blog post page as a nice looking card, with call to action to apply a visa.
- [x] In the blog post page, show random 3 other articles as a related article.
- [ ] Create real blog posts for different destinations (Japan, Canada, Europe, UK, USA, UAE, KSA, France, Turkiye), at least every destination should have 4 posts, and every language should have 15 post

## SEO

- [ ] Create all required sitemaps
- [ ] Create robots.txt, deny all traffic except on production domain
- [ ] Enhance SEO metadata or add it if not exists for all pages
- [ ] Add JSON-LD in all pages, consider each page should have it in it's own language

## Visa Catalog

TBD
