# Post-MVP Enhancements

## Future Enhancement: Affiliate Partner Integration System

**Post-MVP Enhancement**: Integrate affiliate partner system for revenue generation

As a **business stakeholder**,
I want **affiliate partner integration with tracking capabilities**,
so that **the platform generates revenue through visa application referrals**.

**Future Acceptance Criteria:**

1. "Apply Now" buttons display when affiliate partners are available for visa type
2. Partner URL generation with dynamic placeholders (country, passport, visa type)
3. UTM parameter injection for affiliate tracking and commission attribution
4. Partner management system in database with URL templates and tracking codes
5. Graceful handling of partner API failures with user-friendly messaging

**Future Integration Requirements:**

- Integrate with existing visa information display without disrupting user experience
- Partner links open in new tabs maintaining current research session
- Analytics tracking integrates with existing Google Tag Manager setup
- Revenue attribution and commission tracking system
- Admin interface for partner management and URL template configuration

## Future Enhancement: Country Subdomain System

**Post-MVP Enhancement**: Implement country-specific subdomains for advanced SEO

As a **SEO-focused stakeholder**,
I want **country-specific subdomains with proper canonical implementation**,
so that **the platform maximizes search visibility in country-specific markets**.

**Future Acceptance Criteria:**

1. Country subdomains (uae.gettravelvisa.com) redirect to main domain destination pages
2. Canonical meta tags prevent duplicate content penalties
3. Subdomain links maintain navigation to main domain experience
4. Server-side redirects with proper HTTP status codes (301/302)
5. Analytics tracking preserves user journey across subdomain transitions

**Future Integration Requirements:**

- Main domain functionality unaffected by subdomain implementation
- Existing internationalization works correctly with subdomain redirects
- Search engine crawling optimized without impacting current rankings

**Implementation Notes:**

These features have been moved to post-MVP to focus on core content and catalog functionality. The subdomain system and affiliate integration will build upon the solid foundation established by the MVP stories above.

---
