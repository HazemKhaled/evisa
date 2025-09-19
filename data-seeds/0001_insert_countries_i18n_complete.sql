-- Insert comprehensive countries i18n data with conflict resolution
-- Total translations: 1536 (192 countries × 8 languages)
-- Supports all required languages: English, Spanish, Arabic, Portuguese, Russian, German, French, Italian

INSERT INTO countries_i18n (country_id, locale, name, name_long, about, created_at, updated_at) 
SELECT * FROM (VALUES
