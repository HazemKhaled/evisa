-- Seed data for eVisa platform database with i18n structure

-- Insert sample countries
INSERT INTO countries (code, flag, continent, region, is_active) VALUES
('USA', '🇺🇸', 'North America', 'Northern America', 1),
('ARE', '🇦🇪', 'Asia', 'Western Asia', 1),
('GBR', '🇬🇧', 'Europe', 'Northern Europe', 1),
('DEU', '🇩🇪', 'Europe', 'Western Europe', 1),
('JPN', '🇯🇵', 'Asia', 'Eastern Asia', 1);

-- Insert country translations
INSERT INTO countries_i18n (country_id, locale, name, description) VALUES
-- USA translations
(1, 'en', 'United States', 'United States of America'),
(1, 'ar', 'الولايات المتحدة', 'الولايات المتحدة الأمريكية'),
(1, 'es', 'Estados Unidos', 'Estados Unidos de América'),
(1, 'fr', 'États-Unis', 'États-Unis d''Amérique'),

-- UAE translations  
(2, 'en', 'United Arab Emirates', 'United Arab Emirates'),
(2, 'ar', 'الإمارات العربية المتحدة', 'دولة الإمارات العربية المتحدة'),
(2, 'es', 'Emiratos Árabes Unidos', 'Emiratos Árabes Unidos'),
(2, 'fr', 'Émirats arabes unis', 'Émirats arabes unis'),

-- UK translations
(3, 'en', 'United Kingdom', 'United Kingdom of Great Britain and Northern Ireland'),
(3, 'ar', 'المملكة المتحدة', 'المملكة المتحدة لبريطانيا العظمى وأيرلندا الشمالية'),
(3, 'es', 'Reino Unido', 'Reino Unido de Gran Bretaña e Irlanda del Norte'),
(3, 'fr', 'Royaume-Uni', 'Royaume-Uni de Grande-Bretagne et d''Irlande du Nord'),

-- Germany translations
(4, 'en', 'Germany', 'Federal Republic of Germany'),
(4, 'ar', 'ألمانيا', 'جمهورية ألمانيا الاتحادية'),
(4, 'es', 'Alemania', 'República Federal de Alemania'),
(4, 'fr', 'Allemagne', 'République fédérale d''Allemagne'),

-- Japan translations
(5, 'en', 'Japan', 'Japan'),
(5, 'ar', 'اليابان', 'اليابان'),
(5, 'es', 'Japón', 'Japón'),
(5, 'fr', 'Japon', 'Japon');

-- Insert sample visa types for UAE
INSERT INTO visa_types (destination_id, type, duration, processing_time, fee, currency, is_active) VALUES
(2, 'tourist', 30, 3, 100.00, 'USD', 1),
(2, 'business', 30, 5, 150.00, 'USD', 1);

-- Insert visa type translations
INSERT INTO visa_types_i18n (visa_type_id, locale, name, description) VALUES
-- Tourist visa translations
(1, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel'),
(1, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي'),
(1, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio'),
(1, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir'),

-- Business visa translations  
(2, 'en', 'Business Visa', '30-day business visa for commercial activities'),
(2, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 30 يوم للأنشطة التجارية'),
(2, 'es', 'Visa de Negocios', 'Visa de negocios de 30 días para actividades comerciales'),
(2, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 30 jours pour activités commerciales');

-- Insert sample visa eligibility rules
INSERT INTO visa_eligibility (destination_id, passport_id, visa_type_id, eligibility_status, max_stay_days, is_active) VALUES
-- USA passport holders to UAE
(2, 1, 1, 'visa_free', 30, 1),
(2, 1, 2, 'on_arrival', 30, 1),
-- UK passport holders to UAE  
(2, 3, 1, 'visa_free', 30, 1),
(2, 3, 2, 'required', NULL, 1);

-- Insert visa eligibility translations
INSERT INTO visa_eligibility_i18n (visa_eligibility_id, locale, notes) VALUES
-- USA to UAE tourist visa
(1, 'en', 'US passport holders can enter UAE visa-free for tourism'),
(1, 'ar', 'يمكن لحاملي الجواز الأمريكي دخول الإمارات بدون تأشيرة للسياحة'),

-- USA to UAE business visa
(2, 'en', 'Business visa available on arrival for US passport holders'),
(2, 'ar', 'تأشيرة العمل متاحة عند الوصول لحاملي الجواز الأمريكي'),

-- UK to UAE tourist visa
(3, 'en', 'UK passport holders can enter UAE visa-free for tourism'),
(3, 'ar', 'يمكن لحاملي الجواز البريطاني دخول الإمارات بدون تأشيرة للسياحة'),

-- UK to UAE business visa
(4, 'en', 'Business visa required for UK passport holders'),
(4, 'ar', 'تأشيرة العمل مطلوبة لحاملي الجواز البريطاني');