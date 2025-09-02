-- Seed data for GetTravelVisa.com platform database with i18n structure

-- Insert sample countries
INSERT INTO countries (code, continent, region, is_active) VALUES
('USA', 'North America', 'Northern America', 1),
('CAN', 'North America', 'Northern America', 1),
('UAE', 'Asia', 'Western Asia', 1),
('GBR', 'Europe', 'Northern Europe', 1),
('DEU', 'Europe', 'Western Europe', 1),
('JPN', 'Asia', 'Eastern Asia', 1),
('KSA', 'Asia', 'Western Asia', 1);

-- Insert country translations
INSERT INTO countries_i18n (country_id, locale, name, description) VALUES
-- USA translations
(1, 'en', 'United States', 'United States of America'),
(1, 'ar', 'الولايات المتحدة', 'الولايات المتحدة الأمريكية'),
(1, 'es', 'Estados Unidos', 'Estados Unidos de América'),
(1, 'fr', 'États-Unis', 'États-Unis d''Amérique'),

-- Canada translations
(2, 'en', 'Canada', 'Canada'),
(2, 'ar', 'كندا', 'كندا'),
(2, 'es', 'Canadá', 'Canadá'),
(2, 'fr', 'Canada', 'Canada'),

-- UAE translations  
(3, 'en', 'United Arab Emirates', 'United Arab Emirates'),
(3, 'ar', 'الإمارات العربية المتحدة', 'دولة الإمارات العربية المتحدة'),
(3, 'es', 'Emiratos Árabes Unidos', 'Emiratos Árabes Unidos'),
(3, 'fr', 'Émirats Arabes Unis', 'Émirats Arabes Unis'),

-- UK translations
(4, 'en', 'United Kingdom', 'United Kingdom of Great Britain and Northern Ireland'),
(4, 'ar', 'المملكة المتحدة', 'المملكة المتحدة لبريطانيا العظمى وأيرلندا الشمالية'),
(4, 'es', 'Reino Unido', 'Reino Unido de Gran Bretaña e Irlanda del Norte'),
(4, 'fr', 'Royaume-Uni', 'Royaume-Uni de Grande-Bretagne et d''Irlande du Nord'),

-- Germany translations
(5, 'en', 'Germany', 'Federal Republic of Germany'),
(5, 'ar', 'ألمانيا', 'جمهورية ألمانيا الاتحادية'),
(5, 'es', 'Alemania', 'República Federal de Alemania'),
(5, 'fr', 'Allemagne', 'République fédérale d''Allemagne'),

-- Japan translations
(6, 'en', 'Japan', 'Japan'),
(6, 'ar', 'اليابان', 'اليابان'),
(6, 'es', 'Japón', 'Japón'),
(6, 'fr', 'Japon', 'Japon'),

-- Saudi Arabia translations
(7, 'en', 'Saudi Arabia', 'Kingdom of Saudi Arabia'),
(7, 'ar', 'المملكة العربية السعودية', 'مملكة المملكة العربية السعودية'),
(7, 'es', 'Arabia Saudita', 'Reino de Arabia Saudita'),
(7, 'fr', 'Arabie Saoudite', 'Royaume d''Arabie Saoudite');

-- Insert sample visa types
INSERT INTO visa_types (destination_id, type, duration, processing_time, fee, currency, is_active) VALUES
-- USA visa types
(1, 'tourist', 90, 14, 185.00, 'USD', 1),
(1, 'business', 90, 14, 185.00, 'USD', 1),

-- Canada visa types
(2, 'tourist', 180, 14, 100.00, 'CAD', 1),
(2, 'business', 180, 14, 100.00, 'CAD', 1),

-- UAE visa types
(3, 'tourist', 30, 3, 100.00, 'USD', 1),
(3, 'business', 14, 5, 150.00, 'USD', 1),
(3, 'transit', 4, 2, 50.00, 'USD', 1),

-- UK visa types
(4, 'tourist', 180, 15, 100.00, 'GBP', 1),
(4, 'business', 180, 15, 100.00, 'GBP', 1),

-- Germany visa types
(5, 'tourist', 90, 10, 80.00, 'EUR', 1),
(5, 'business', 90, 10, 80.00, 'EUR', 1),

-- Saudi Arabia visa types
(7, 'tourist', 30, 3, 150.00, 'SAR', 1),
(7, 'business', 14, 5, 200.00, 'SAR', 1),
(7, 'transit', 4, 2, 70.00, 'SAR', 1);

-- Insert visa type translations
INSERT INTO visa_types_i18n (visa_type_id, locale, name, description) VALUES
-- USA Tourist Visa
(1, 'en', 'B-2 Tourist Visa', '90-day tourist visa for leisure travel to USA'),
(1, 'ar', 'تأشيرة B-2 سياحية', 'تأشيرة سياحية لمدة 90 يوم للسفر الترفيهي إلى أمريكا'),
(1, 'es', 'Visa B-2 Turística', 'Visa turística de 90 días para viajes de ocio a EE.UU.'),

-- USA Business Visa
(2, 'en', 'B-1 Business Visa', '90-day business visa for commercial activities in USA'),
(2, 'ar', 'تأشيرة B-1 عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في أمريكا'),
(2, 'es', 'Visa B-1 de Negocios', 'Visa de negocios de 90 días para actividades comerciales en EE.UU.'),

-- Canada Tourist Visa
(3, 'en', 'Visitor Visa', '6-month visitor visa for tourism to Canada'),
(3, 'ar', 'تأشيرة زائر', 'تأشيرة زائر لمدة 6 أشهر للسياحة في كندا'),
(3, 'es', 'Visa de Visitante', 'Visa de visitante de 6 meses para turismo en Canadá'),

-- Canada Business Visa
(4, 'en', 'Business Visitor Visa', '6-month business visitor visa for Canada'),
(4, 'ar', 'تأشيرة زائر عمل', 'تأشيرة زائر عمل لمدة 6 أشهر لكندا'),
(4, 'es', 'Visa de Visitante de Negocios', 'Visa de visitante de negocios de 6 meses para Canadá'),

-- UAE Tourist Visa
(5, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel'),
(5, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي'),
(5, 'es', 'Visa Turística', 'Visa turística de 30 días para viajes de ocio'),

-- UAE Business Visa
(6, 'en', 'Business Visa', '14-day business visa for commercial activities'),
(6, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 14 يوم للأنشطة التجارية'),
(6, 'es', 'Visa de Negocios', 'Visa de negocios de 14 días para actividades comerciales'),

-- UAE Transit Visa
(7, 'en', 'Transit Visa', '4-day transit visa for airport connections'),
(7, 'ar', 'تأشيرة ترانزيت', 'تأشيرة ترانزيت لمدة 4 أيام لربط الرحلات'),
(7, 'es', 'Visa de Tránsito', 'Visa de tránsito de 4 días para conexiones aeroportuarias'),

-- UK Tourist Visa
(8, 'en', 'Standard Visitor Visa', '6-month visitor visa for tourism'),
(8, 'ar', 'تأشيرة زائر قياسية', 'تأشيرة زائر لمدة 6 أشهر للسياحة'),
(8, 'es', 'Visa de Visitante Estándar', 'Visa de visitante de 6 meses para turismo'),

-- UK Business Visa  
(9, 'en', 'Business Visitor Visa', '6-month visitor visa for business'),
(9, 'ar', 'تأشيرة زائر عمل', 'تأشيرة زائر لمدة 6 أشهر للعمل'),
(9, 'es', 'Visa de Visitante de Negocios', 'Visa de visitante de 6 meses para negocios'),

-- Germany Tourist Visa
(10, 'en', 'Schengen Tourist Visa', '90-day Schengen visa for tourism'),
(10, 'ar', 'تأشيرة شنغن سياحية', 'تأشيرة شنغن لمدة 90 يوم للسياحة'),
(10, 'es', 'Visa Turística Schengen', 'Visa Schengen de 90 días para turismo'),

-- Germany Business Visa
(11, 'en', 'Schengen Business Visa', '90-day Schengen visa for business'),
(11, 'ar', 'تأشيرة شنغن عمل', 'تأشيرة شنغن لمدة 90 يوم للعمل'),
(11, 'es', 'Visa de Negocios Schengen', 'Visa Schengen de 90 días para negocios'),

-- Saudi Arabia Tourist Visa
(12, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel to Saudi Arabia'),
(12, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي إلى المملكة العربية السعودية'),
(12, 'es', 'Visa Turística', 'Visa turística de 30 días para viajes de ocio a Arabia Saudita'),

-- Saudi Arabia Business Visa
(13, 'en', 'Business Visa', '14-day business visa for commercial activities in Saudi Arabia'),
(13, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 14 يوم للأنشطة التجارية في المملكة العربية السعودية'),
(13, 'es', 'Visa de Negocios', 'Visa de negocios de 14 días para actividades comerciales en Arabia Saudita');

-- Insert sample visa eligibility rules
INSERT INTO visa_eligibility (destination_id, passport_id, visa_type_id, eligibility_status, max_stay_days) VALUES
-- USA passport holders
(3, 1, 5, 'visa_required', 30),    -- USA -> UAE Tourist
(3, 1, 6, 'visa_required', 14),    -- USA -> UAE Business  
(4, 1, 8, 'visa_required', 180),   -- USA -> UK Tourist
(5, 1, 10, 'visa_required', 90),   -- USA -> Germany Tourist

-- Canada passport holders  
(1, 2, 1, 'visa_required', 90),    -- Canada -> USA Tourist
(3, 2, 5, 'visa_required', 30),    -- Canada -> UAE Tourist
(4, 2, 8, 'visa_required', 180),   -- Canada -> UK Tourist
(5, 2, 10, 'visa_required', 90),   -- Canada -> Germany Tourist

-- UAE passport holders  
(1, 3, 1, 'visa_required', 90),    -- UAE -> USA Tourist
(2, 3, 3, 'visa_required', 180),   -- UAE -> Canada Tourist
(4, 3, 8, 'visa_required', 180),   -- UAE -> UK Tourist
(5, 3, 10, 'visa_free', 90),      -- UAE -> Germany (visa-free)

-- UK passport holders
(1, 4, 1, 'visa_required', 90),    -- UK -> USA Tourist
(2, 4, 3, 'visa_required', 180),   -- UK -> Canada Tourist
(3, 4, 5, 'visa_free', 30),       -- UK -> UAE Tourist (visa-free)
(5, 4, 10, 'visa_free', 90),      -- UK -> Germany (EU rights)

-- German passport holders
(1, 5, 1, 'visa_required', 90),    -- Germany -> USA Tourist
(2, 5, 3, 'visa_required', 180),   -- Germany -> Canada Tourist
(3, 5, 5, 'visa_free', 30),       -- Germany -> UAE Tourist
(4, 5, 8, 'visa_free', 180);      -- Germany -> UK Tourist

-- Saudi Arabia passport holders
(1, 7, 12, 'visa_required', 30),    -- Saudi Arabia -> UAE Tourist
(2, 7, 13, 'visa_required', 14),    -- Saudi Arabia -> UAE Business  
(3, 7, 12, 'visa_required', 30),    -- Saudi Arabia -> UK Tourist
(4, 7, 13, 'visa_required', 14),    -- Saudi Arabia -> Germany Tourist

-- Insert visa eligibility translations
INSERT INTO visa_eligibility_i18n (visa_eligibility_id, locale, notes) VALUES
(1, 'en', 'Tourist visa required. Apply online or at UAE consulate.'),
(1, 'ar', 'تأشيرة سياحية مطلوبة. قدم طلب عبر الإنترنت أو في القنصلية الإماراتية.'),
(1, 'es', 'Se requiere visa turística. Solicite en línea o en el consulado de UAE.'),

(2, 'en', 'Business visa required for commercial activities.'),
(2, 'ar', 'تأشيرة عمل مطلوبة للأنشطة التجارية.'),
(2, 'es', 'Se requiere visa de negocios para actividades comerciales.'),

(11, 'en', 'Visa-free entry for UK passport holders for up to 30 days.'),
(11, 'ar', 'دخول بدون تأشيرة لحاملي الجواز البريطاني لمدة تصل إلى 30 يوم.'),
(11, 'es', 'Entrada sin visa para portadores de pasaporte británico hasta 30 días.');