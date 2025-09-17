-- Insert blog post tags associations with conflict resolution
INSERT INTO blog_post_tags (post_id, tag_id, created_at) VALUES
-- Canada Business Visa Guide
((SELECT id FROM blog_posts WHERE slug = 'canada-business-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'business-visa'), now()),
((SELECT id FROM blog_posts WHERE slug = 'canada-business-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'immigration'), now()),
((SELECT id FROM blog_posts WHERE slug = 'canada-business-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'professional-travel'), now()),

-- Canada Visitor Visa Guide
((SELECT id FROM blog_posts WHERE slug = 'canada-visitor-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'visitor-visa'), now()),
((SELECT id FROM blog_posts WHERE slug = 'canada-visitor-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'tourism'), now()),
((SELECT id FROM blog_posts WHERE slug = 'canada-visitor-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'travel'), now()),
((SELECT id FROM blog_posts WHERE slug = 'canada-visitor-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'travel-planning'), now()),

-- UAE Dubai Attractions Guide
((SELECT id FROM blog_posts WHERE slug = 'uae-dubai-attractions-guide'), (SELECT id FROM blog_tags WHERE slug = 'tourism'), now()),
((SELECT id FROM blog_posts WHERE slug = 'uae-dubai-attractions-guide'), (SELECT id FROM blog_tags WHERE slug = 'travel'), now()),
((SELECT id FROM blog_posts WHERE slug = 'uae-dubai-attractions-guide'), (SELECT id FROM blog_tags WHERE slug = 'modern-cities'), now()),
((SELECT id FROM blog_posts WHERE slug = 'uae-dubai-attractions-guide'), (SELECT id FROM blog_tags WHERE slug = 'desert-adventures'), now()),

-- Japan Business Visa Guide
((SELECT id FROM blog_posts WHERE slug = 'japan-business-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'business-visa'), now()),
((SELECT id FROM blog_posts WHERE slug = 'japan-business-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'immigration'), now()),
((SELECT id FROM blog_posts WHERE slug = 'japan-business-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'professional-travel'), now()),

-- Japan Tourist Visa Guide
((SELECT id FROM blog_posts WHERE slug = 'japan-tourist-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'visitor-visa'), now()),
((SELECT id FROM blog_posts WHERE slug = 'japan-tourist-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'tourism'), now()),
((SELECT id FROM blog_posts WHERE slug = 'japan-tourist-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'travel'), now()),
((SELECT id FROM blog_posts WHERE slug = 'japan-tourist-visa-guide'), (SELECT id FROM blog_tags WHERE slug = 'cultural-heritage'), now()),

-- Schengen Visa Requirements
((SELECT id FROM blog_posts WHERE slug = 'schengen-visa-requirements'), (SELECT id FROM blog_tags WHERE slug = 'schengen-visa'), now()),
((SELECT id FROM blog_posts WHERE slug = 'schengen-visa-requirements'), (SELECT id FROM blog_tags WHERE slug = 'visa-application'), now()),
((SELECT id FROM blog_posts WHERE slug = 'schengen-visa-requirements'), (SELECT id FROM blog_tags WHERE slug = 'visa-requirements'), now()),
((SELECT id FROM blog_posts WHERE slug = 'schengen-visa-requirements'), (SELECT id FROM blog_tags WHERE slug = 'travel'), now()),

-- UK Visa Application Tips
((SELECT id FROM blog_posts WHERE slug = 'uk-visa-application-tips'), (SELECT id FROM blog_tags WHERE slug = 'visa-application'), now()),
((SELECT id FROM blog_posts WHERE slug = 'uk-visa-application-tips'), (SELECT id FROM blog_tags WHERE slug = 'visa-requirements'), now()),
((SELECT id FROM blog_posts WHERE slug = 'uk-visa-application-tips'), (SELECT id FROM blog_tags WHERE slug = 'travel-tips'), now()),

-- USA Tourist Visa B-2 Guide
((SELECT id FROM blog_posts WHERE slug = 'usa-tourist-visa-b2-guide'), (SELECT id FROM blog_tags WHERE slug = 'visitor-visa'), now()),
((SELECT id FROM blog_posts WHERE slug = 'usa-tourist-visa-b2-guide'), (SELECT id FROM blog_tags WHERE slug = 'visa-application'), now()),
((SELECT id FROM blog_posts WHERE slug = 'usa-tourist-visa-b2-guide'), (SELECT id FROM blog_tags WHERE slug = 'tourism'), now()),

-- Europe Culinary Food Guide
((SELECT id FROM blog_posts WHERE slug = 'europe-culinary-food-guide'), (SELECT id FROM blog_tags WHERE slug = 'food-culture'), now()),
((SELECT id FROM blog_posts WHERE slug = 'europe-culinary-food-guide'), (SELECT id FROM blog_tags WHERE slug = 'travel'), now()),
((SELECT id FROM blog_posts WHERE slug = 'europe-culinary-food-guide'), (SELECT id FROM blog_tags WHERE slug = 'cultural-heritage'), now()),

-- Saudi Arabia Modern Cities Guide
((SELECT id FROM blog_posts WHERE slug = 'saudi-arabia-modern-cities-guide'), (SELECT id FROM blog_tags WHERE slug = 'modern-cities'), now()),
((SELECT id FROM blog_posts WHERE slug = 'saudi-arabia-modern-cities-guide'), (SELECT id FROM blog_tags WHERE slug = 'tourism'), now()),
((SELECT id FROM blog_posts WHERE slug = 'saudi-arabia-modern-cities-guide'), (SELECT id FROM blog_tags WHERE slug = 'travel'), now())
ON CONFLICT (post_id, tag_id) DO NOTHING;