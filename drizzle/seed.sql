-- Seed data for eVisa platform database

-- Insert sample countries
INSERT INTO countries (code, name_en, name_ar, name_es, name_fr, description_en, flag, continent, region, is_active) VALUES
('USA', 'United States', 'الولايات المتحدة', 'Estados Unidos', 'États-Unis', 'United States of America', '🇺🇸', 'North America', 'Northern America', 1),
('ARE', 'United Arab Emirates', 'الإمارات العربية المتحدة', 'Emiratos Árabes Unidos', 'Émirats arabes unis', 'United Arab Emirates', '🇦🇪', 'Asia', 'Western Asia', 1),
('GBR', 'United Kingdom', 'المملكة المتحدة', 'Reino Unido', 'Royaume-Uni', 'United Kingdom of Great Britain and Northern Ireland', '🇬🇧', 'Europe', 'Northern Europe', 1),
('DEU', 'Germany', 'ألمانيا', 'Alemania', 'Allemagne', 'Federal Republic of Germany', '🇩🇪', 'Europe', 'Western Europe', 1),
('JPN', 'Japan', 'اليابان', 'Japón', 'Japon', 'Japan', '🇯🇵', 'Asia', 'Eastern Asia', 1);

-- Insert sample visa types for UAE
INSERT INTO visa_types (destination_id, type, name_en, name_ar, name_es, name_fr, description_en, duration, processing_time, fee, currency, is_active) VALUES
(2, 'tourist', 'Tourist Visa', 'تأشيرة سياحية', 'Visa de Turista', 'Visa de Tourisme', '30-day tourist visa for leisure travel', 30, 3, 100.00, 'USD', 1),
(2, 'business', 'Business Visa', 'تأشيرة عمل', 'Visa de Negocios', 'Visa d''Affaires', '30-day business visa for commercial activities', 30, 5, 150.00, 'USD', 1);

-- Insert sample visa eligibility rules
-- USA passport holders to UAE
INSERT INTO visa_eligibility (destination_id, passport_id, visa_type_id, eligibility_status, max_stay_days, notes_en, notes_ar, is_active) VALUES
(2, 1, 1, 'visa_free', 30, 'US passport holders can enter UAE visa-free for tourism', 'يمكن لحاملي الجواز الأمريكي دخول الإمارات بدون تأشيرة للسياحة', 1),
(2, 1, 2, 'on_arrival', 30, 'Business visa available on arrival for US passport holders', 'تأشيرة العمل متاحة عند الوصول لحاملي الجواز الأمريكي', 1);

-- UK passport holders to UAE  
INSERT INTO visa_eligibility (destination_id, passport_id, visa_type_id, eligibility_status, max_stay_days, notes_en, notes_ar, is_active) VALUES
(2, 3, 1, 'visa_free', 30, 'UK passport holders can enter UAE visa-free for tourism', 'يمكن لحاملي الجواز البريطاني دخول الإمارات بدون تأشيرة للسياحة', 1),
(2, 3, 2, 'required', NULL, 'Business visa required for UK passport holders', 'تأشيرة العمل مطلوبة لحاملي الجواز البريطاني', 1);