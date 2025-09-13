-- Visa data seeding migration for 10 popular destinations
-- This migration seeds the database with visa types and eligibility data for popular tourist destinations

-- Countries mapping (based on 0001_seed-countries.sql order):
-- 1=USA, 2=CAN, 3=GBR, 4=AUS, 5=ARE
-- JPN appears around line 112, position ~102 = ID 107
-- DEU appears around line 156, position ~151 = ID 151  
-- FRA appears around line 155, position ~150 = ID 150
-- ITA appears around line 161, position ~156 = ID 156
-- ESP appears around line 181, position ~176 = ID 176
-- SAU appears around line 130, position ~125 = ID 125
-- THA appears around line 136, position ~131 = ID 131
-- SGP appears around line 131, position ~126 = ID 126
-- IND appears around line 107, position ~102 = ID 102
-- CHN appears around line 104, position ~99 = ID 99

-- Insert visa types for Japan (JPN - ID 107)
INSERT INTO `visa_types` (`destination_id`, `type`, `duration`, `processing_time`, `fee`, `currency`, `requires_interview`, `is_multi_entry`, `requirements`, `documents`, `is_active`, `created_at`, `updated_at`) VALUES
(107, 'tourist', 90, 10, 0.0, 'JPY', 0, 0, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement"]', 1, unixepoch(), unixepoch()),
(107, 'business', 90, 15, 0.0, 'JPY', 0, 0, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', 1, unixepoch(), unixepoch());

-- Insert visa types for Germany (DEU - ID 151)
INSERT INTO `visa_types` (`destination_id`, `type`, `duration`, `processing_time`, `fee`, `currency`, `requires_interview`, `is_multi_entry`, `requirements`, `documents`, `is_active`, `created_at`, `updated_at`) VALUES
(151, 'tourist', 90, 15, 80.0, 'EUR', 0, 1, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', 1, unixepoch(), unixepoch()),
(151, 'business', 90, 20, 80.0, 'EUR', 0, 1, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', 1, unixepoch(), unixepoch());

-- Insert visa types for France (FRA - ID 150)
INSERT INTO `visa_types` (`destination_id`, `type`, `duration`, `processing_time`, `fee`, `currency`, `requires_interview`, `is_multi_entry`, `requirements`, `documents`, `is_active`, `created_at`, `updated_at`) VALUES
(150, 'tourist', 90, 15, 80.0, 'EUR', 0, 1, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', 1, unixepoch(), unixepoch()),
(150, 'business', 90, 20, 80.0, 'EUR', 0, 1, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', 1, unixepoch(), unixepoch());

-- Insert visa types for Italy (ITA - ID 156)
INSERT INTO `visa_types` (`destination_id`, `type`, `duration`, `processing_time`, `fee`, `currency`, `requires_interview`, `is_multi_entry`, `requirements`, `documents`, `is_active`, `created_at`, `updated_at`) VALUES
(156, 'tourist', 90, 15, 80.0, 'EUR', 0, 1, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', 1, unixepoch(), unixepoch()),
(156, 'business', 90, 20, 80.0, 'EUR', 0, 1, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', 1, unixepoch(), unixepoch());

-- Insert visa types for Spain (ESP - ID 176)
INSERT INTO `visa_types` (`destination_id`, `type`, `duration`, `processing_time`, `fee`, `currency`, `requires_interview`, `is_multi_entry`, `requirements`, `documents`, `is_active`, `created_at`, `updated_at`) VALUES
(176, 'tourist', 90, 15, 80.0, 'EUR', 0, 1, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', 1, unixepoch(), unixepoch()),
(176, 'business', 90, 20, 80.0, 'EUR', 0, 1, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', 1, unixepoch(), unixepoch());

-- Insert visa types for Saudi Arabia (SAU - ID 125)
INSERT INTO `visa_types` (`destination_id`, `type`, `duration`, `processing_time`, `fee`, `currency`, `requires_interview`, `is_multi_entry`, `requirements`, `documents`, `is_active`, `created_at`, `updated_at`) VALUES
(125, 'tourist', 30, 5, 150.0, 'SAR', 0, 1, '["Valid passport", "Passport photos", "Flight itineary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', 1, unixepoch(), unixepoch()),
(125, 'business', 90, 10, 300.0, 'SAR', 0, 1, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', 1, unixepoch(), unixepoch());

-- Insert visa types for Thailand (THA - ID 131)
INSERT INTO `visa_types` (`destination_id`, `type`, `duration`, `processing_time`, `fee`, `currency`, `requires_interview`, `is_multi_entry`, `requirements`, `documents`, `is_active`, `created_at`, `updated_at`) VALUES
(131, 'tourist', 60, 7, 40.0, 'USD', 0, 0, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', 1, unixepoch(), unixepoch()),
(131, 'business', 90, 15, 80.0, 'USD', 0, 0, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', 1, unixepoch(), unixepoch());

-- Insert visa types for Singapore (SGP - ID 126)
INSERT INTO `visa_types` (`destination_id`, `type`, `duration`, `processing_time`, `fee`, `currency`, `requires_interview`, `is_multi_entry`, `requirements`, `documents`, `is_active`, `created_at`, `updated_at`) VALUES
(126, 'tourist', 30, 3, 30.0, 'SGD', 0, 0, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement"]', 1, unixepoch(), unixepoch()),
(126, 'business', 30, 5, 30.0, 'SGD', 0, 0, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', 1, unixepoch(), unixepoch());

-- Insert visa types for India (IND - ID 102)
INSERT INTO `visa_types` (`destination_id`, `type`, `duration`, `processing_time`, `fee`, `currency`, `requires_interview`, `is_multi_entry`, `requirements`, `documents`, `is_active`, `created_at`, `updated_at`) VALUES
(102, 'tourist', 90, 10, 50.0, 'USD', 0, 0, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement"]', 1, unixepoch(), unixepoch()),
(102, 'business', 180, 15, 100.0, 'USD', 0, 1, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', 1, unixepoch(), unixepoch());

-- Insert visa types for China (CHN - ID 99)
INSERT INTO `visa_types` (`destination_id`, `type`, `duration`, `processing_time`, `fee`, `currency`, `requires_interview`, `is_multi_entry`, `requirements`, `documents`, `is_active`, `created_at`, `updated_at`) VALUES
(99, 'tourist', 30, 10, 140.0, 'USD', 0, 0, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof", "Travel insurance"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement", "insurance"]', 1, unixepoch(), unixepoch()),
(99, 'business', 90, 15, 140.0, 'USD', 0, 1, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary", "Travel insurance"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking", "insurance"]', 1, unixepoch(), unixepoch());

-- Insert visa types translations
-- Note: visa_type_id should start from 3 since we already have 2 from the previous migration
INSERT INTO `visa_types_i18n` (`visa_type_id`, `locale`, `name`, `description`, `created_at`, `updated_at`) VALUES
-- Japan Tourist visa translations (visa_type_id 3)
(3, 'en', 'Tourist Visa', '90-day tourist visa for leisure travel to Japan', unixepoch(), unixepoch()),
(3, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 90 يوم للسفر الترفيهي إلى اليابان', unixepoch(), unixepoch()),
(3, 'es', 'Visa de Turista', 'Visa de turista de 90 días para viajes de ocio a Japón', unixepoch(), unixepoch()),
(3, 'fr', 'Visa de Tourisme', 'Visa touristique de 90 jours pour les voyages de loisir au Japon', unixepoch(), unixepoch()),
(3, 'pt', 'Visto de Turismo', 'Visto de turismo de 90 dias para viagens de lazer ao Japão', unixepoch(), unixepoch()),
(3, 'ru', 'Туристическая виза', '90-дневная туристическая виза для отдыха в Японии', unixepoch(), unixepoch()),
(3, 'de', 'Touristenvisum', '90-tägiges Touristenvisum für Freizeitreisen nach Japan', unixepoch(), unixepoch()),
(3, 'it', 'Visto Turistico', 'Visto turistico di 90 giorni per viaggi di piacere in Giappone', unixepoch(), unixepoch()),

-- Japan Business visa translations (visa_type_id 4)
(4, 'en', 'Business Visa', '90-day business visa for commercial activities in Japan', unixepoch(), unixepoch()),
(4, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في اليابان', unixepoch(), unixepoch()),
(4, 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en Japón', unixepoch(), unixepoch()),
(4, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales au Japon', unixepoch(), unixepoch()),
(4, 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais no Japão', unixepoch(), unixepoch()),
(4, 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Японии', unixepoch(), unixepoch()),
(4, 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Japan', unixepoch(), unixepoch()),
(4, 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Giappone', unixepoch(), unixepoch()),

-- Germany Tourist visa translations (visa_type_id 5)
(5, 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to Germany', unixepoch(), unixepoch()),
(5, 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى ألمانيا', unixepoch(), unixepoch()),
(5, 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a Alemania', unixepoch(), unixepoch()),
(5, 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en Allemagne', unixepoch(), unixepoch()),
(5, 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à Alemanha', unixepoch(), unixepoch()),
(5, 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха в Германии', unixepoch(), unixepoch()),
(5, 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Deutschland', unixepoch(), unixepoch()),
(5, 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Germania', unixepoch(), unixepoch()),

-- Germany Business visa translations (visa_type_id 6)
(6, 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in Germany', unixepoch(), unixepoch()),
(6, 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في ألمانيا', unixepoch(), unixepoch()),
(6, 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en Alemania', unixepoch(), unixepoch()),
(6, 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en Allemagne', unixepoch(), unixepoch()),
(6, 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na Alemanha', unixepoch(), unixepoch()),
(6, 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности в Германии', unixepoch(), unixepoch()),
(6, 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Deutschland', unixepoch(), unixepoch()),
(6, 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Germania', unixepoch(), unixepoch()),

-- France Tourist visa translations (visa_type_id 7)
(7, 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to France', unixepoch(), unixepoch()),
(7, 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى فرنسا', unixepoch(), unixepoch()),
(7, 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a Francia', unixepoch(), unixepoch()),
(7, 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en France', unixepoch(), unixepoch()),
(7, 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à França', unixepoch(), unixepoch()),
(7, 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха во Франции', unixepoch(), unixepoch()),
(7, 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Frankreich', unixepoch(), unixepoch()),
(7, 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Francia', unixepoch(), unixepoch()),

-- France Business visa translations (visa_type_id 8)
(8, 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in France', unixepoch(), unixepoch()),
(8, 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في فرنسا', unixepoch(), unixepoch()),
(8, 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en Francia', unixepoch(), unixepoch()),
(8, 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en France', unixepoch(), unixepoch()),
(8, 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na França', unixepoch(), unixepoch()),
(8, 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности во Франции', unixepoch(), unixepoch()),
(8, 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Frankreich', unixepoch(), unixepoch()),
(8, 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Francia', unixepoch(), unixepoch()),

-- Italy Tourist visa translations (visa_type_id 9)
(9, 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to Italy', unixepoch(), unixepoch()),
(9, 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى إيطاليا', unixepoch(), unixepoch()),
(9, 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a Italia', unixepoch(), unixepoch()),
(9, 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en Italie', unixepoch(), unixepoch()),
(9, 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à Itália', unixepoch(), unixepoch()),
(9, 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха в Италии', unixepoch(), unixepoch()),
(9, 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Italien', unixepoch(), unixepoch()),
(9, 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Italia', unixepoch(), unixepoch()),

-- Italy Business visa translations (visa_type_id 10)
(10, 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in Italy', unixepoch(), unixepoch()),
(10, 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في إيطاليا', unixepoch(), unixepoch()),
(10, 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en Italia', unixepoch(), unixepoch()),
(10, 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en Italie', unixepoch(), unixepoch()),
(10, 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na Itália', unixepoch(), unixepoch()),
(10, 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности в Италии', unixepoch(), unixepoch()),
(10, 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Italien', unixepoch(), unixepoch()),
(10, 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Italia', unixepoch(), unixepoch()),

-- Spain Tourist visa translations (visa_type_id 11)
(11, 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to Spain', unixepoch(), unixepoch()),
(11, 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى إسبانيا', unixepoch(), unixepoch()),
(11, 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a España', unixepoch(), unixepoch()),
(11, 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en Espagne', unixepoch(), unixepoch()),
(11, 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à Espanha', unixepoch(), unixepoch()),
(11, 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха в Испании', unixepoch(), unixepoch()),
(11, 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Spanien', unixepoch(), unixepoch()),
(11, 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Spagna', unixepoch(), unixepoch()),

-- Spain Business visa translations (visa_type_id 12)
(12, 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in Spain', unixepoch(), unixepoch()),
(12, 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في إسبانيا', unixepoch(), unixepoch()),
(12, 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en España', unixepoch(), unixepoch()),
(12, 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en Espagne', unixepoch(), unixepoch()),
(12, 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na Espanha', unixepoch(), unixepoch()),
(12, 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности в Испании', unixepoch(), unixepoch()),
(12, 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Spanien', unixepoch(), unixepoch()),
(12, 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Spagna', unixepoch(), unixepoch()),

-- Saudi Arabia Tourist visa translations (visa_type_id 13)
(13, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel to Saudi Arabia', unixepoch(), unixepoch()),
(13, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي إلى المملكة العربية السعودية', unixepoch(), unixepoch()),
(13, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio a Arabia Saudí', unixepoch(), unixepoch()),
(13, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir en Arabie Saoudite', unixepoch(), unixepoch()),
(13, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer à Arábia Saudita', unixepoch(), unixepoch()),
(13, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха в Саудовской Аравии', unixepoch(), unixepoch()),
(13, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen nach Saudi-Arabien', unixepoch(), unixepoch()),
(13, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere in Arabia Saudita', unixepoch(), unixepoch()),

-- Saudi Arabia Business visa translations (visa_type_id 14)
(14, 'en', 'Business Visa', '90-day business visa for commercial activities in Saudi Arabia', unixepoch(), unixepoch()),
(14, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في المملكة العربية السعودية', unixepoch(), unixepoch()),
(14, 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en Arabia Saudí', unixepoch(), unixepoch()),
(14, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales en Arabie Saoudite', unixepoch(), unixepoch()),
(14, 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais na Arábia Saudita', unixepoch(), unixepoch()),
(14, 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Саудовской Аравии', unixepoch(), unixepoch()),
(14, 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Saudi-Arabien', unixepoch(), unixepoch()),
(14, 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Arabia Saudita', unixepoch(), unixepoch()),

-- Thailand Tourist visa translations (visa_type_id 15)
(15, 'en', 'Tourist Visa', '60-day tourist visa for leisure travel to Thailand', unixepoch(), unixepoch()),
(15, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 60 يوم للسفر الترفيهي إلى تايلاند', unixepoch(), unixepoch()),
(15, 'es', 'Visa de Turista', 'Visa de turista de 60 días para viajes de ocio a Tailandia', unixepoch(), unixepoch()),
(15, 'fr', 'Visa de Tourisme', 'Visa touristique de 60 jours pour les voyages de loisir en Thaïlande', unixepoch(), unixepoch()),
(15, 'pt', 'Visto de Turismo', 'Visto de turismo de 60 dias para viagens de lazer à Tailândia', unixepoch(), unixepoch()),
(15, 'ru', 'Туристическая виза', '60-дневная туристическая виза для отдыха в Таиланде', unixepoch(), unixepoch()),
(15, 'de', 'Touristenvisum', '60-tägiges Touristenvisum für Freizeitreisen nach Thailand', unixepoch(), unixepoch()),
(15, 'it', 'Visto Turistico', 'Visto turistico di 60 giorni per viaggi di piacere in Tailandia', unixepoch(), unixepoch()),

-- Thailand Business visa translations (visa_type_id 16)
(16, 'en', 'Business Visa', '90-day business visa for commercial activities in Thailand', unixepoch(), unixepoch()),
(16, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في تايلاند', unixepoch(), unixepoch()),
(16, 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en Tailandia', unixepoch(), unixepoch()),
(16, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales en Thaïlande', unixepoch(), unixepoch()),
(16, 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais na Tailândia', unixepoch(), unixepoch()),
(16, 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Таиланде', unixepoch(), unixepoch()),
(16, 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Thailand', unixepoch(), unixepoch()),
(16, 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Tailandia', unixepoch(), unixepoch()),

-- Singapore Tourist visa translations (visa_type_id 17)
(17, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel to Singapore', unixepoch(), unixepoch()),
(17, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي إلى سنغافورة', unixepoch(), unixepoch()),
(17, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio a Singapur', unixepoch(), unixepoch()),
(17, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir à Singapour', unixepoch(), unixepoch()),
(17, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer a Singapura', unixepoch(), unixepoch()),
(17, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха в Сингапуре', unixepoch(), unixepoch()),
(17, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen nach Singapur', unixepoch(), unixepoch()),
(17, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere a Singapore', unixepoch(), unixepoch()),

-- Singapore Business visa translations (visa_type_id 18)
(18, 'en', 'Business Visa', '30-day business visa for commercial activities in Singapore', unixepoch(), unixepoch()),
(18, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 30 يوم للأنشطة التجارية في سنغافورة', unixepoch(), unixepoch()),
(18, 'es', 'Visa de Negocios', 'Visa de negocios de 30 días para actividades comerciales en Singapur', unixepoch(), unixepoch()),
(18, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 30 jours pour activités commerciales à Singapour', unixepoch(), unixepoch()),
(18, 'pt', 'Visto de Negócios', 'Visto de negócios de 30 dias para atividades comerciais em Singapura', unixepoch(), unixepoch()),
(18, 'ru', 'Деловая виза', '30-дневная деловая виза для коммерческой деятельности в Сингапуре', unixepoch(), unixepoch()),
(18, 'de', 'Geschäftsvisum', '30-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Singapur', unixepoch(), unixepoch()),
(18, 'it', 'Visto d''Affari', 'Visto d''affari di 30 giorni per attività commerciali a Singapore', unixepoch(), unixepoch()),

-- India Tourist visa translations (visa_type_id 19)
(19, 'en', 'Tourist Visa', '90-day e-tourist visa for leisure travel to India', unixepoch(), unixepoch()),
(19, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية إلكترونية لمدة 90 يوم للسفر الترفيهي إلى الهند', unixepoch(), unixepoch()),
(19, 'es', 'Visa de Turista', 'E-visa de turista de 90 días para viajes de ocio a India', unixepoch(), unixepoch()),
(19, 'fr', 'Visa de Tourisme', 'E-visa touristique de 90 jours pour les voyages de loisir en Inde', unixepoch(), unixepoch()),
(19, 'pt', 'Visto de Turismo', 'E-visto de turismo de 90 dias para viagens de lazer à Índia', unixepoch(), unixepoch()),
(19, 'ru', 'Туристическая виза', '90-дневная электронная туристическая виза для отдыха в Индии', unixepoch(), unixepoch()),
(19, 'de', 'Touristenvisum', '90-tägiges E-Touristenvisum für Freizeitreisen nach Indien', unixepoch(), unixepoch()),
(19, 'it', 'Visto Turistico', 'E-visto turistico di 90 giorni per viaggi di piacere in India', unixepoch(), unixepoch()),

-- India Business visa translations (visa_type_id 20)
(20, 'en', 'Business Visa', '180-day e-business visa for commercial activities in India', unixepoch(), unixepoch()),
(20, 'ar', 'تأشيرة عمل', 'تأشيرة عمل إلكترونية لمدة 180 يوم للأنشطة التجارية في الهند', unixepoch(), unixepoch()),
(20, 'es', 'Visa de Negocios', 'E-visa de negocios de 180 días para actividades comerciales en India', unixepoch(), unixepoch()),
(20, 'fr', 'Visa d''Affaires', 'E-visa d''affaires de 180 jours pour activités commerciales en Inde', unixepoch(), unixepoch()),
(20, 'pt', 'Visto de Negócios', 'E-visto de negócios de 180 dias para atividades comerciais na Índia', unixepoch(), unixepoch()),
(20, 'ru', 'Деловая виза', '180-дневная электронная деловая виза для коммерческой деятельности в Индии', unixepoch(), unixepoch()),
(20, 'de', 'Geschäftsvisum', '180-tägiges E-Geschäftsvisum für kommerzielle Aktivitäten in Indien', unixepoch(), unixepoch()),
(20, 'it', 'Visto d''Affari', 'E-visto d''affari di 180 giorni per attività commerciali in India', unixepoch(), unixepoch()),

-- China Tourist visa translations (visa_type_id 21)
(21, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel to China', unixepoch(), unixepoch()),
(21, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي إلى الصين', unixepoch(), unixepoch()),
(21, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio a China', unixepoch(), unixepoch()),
(21, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir en Chine', unixepoch(), unixepoch()),
(21, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer à China', unixepoch(), unixepoch()),
(21, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха в Китае', unixepoch(), unixepoch()),
(21, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen nach China', unixepoch(), unixepoch()),
(21, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere in Cina', unixepoch(), unixepoch()),

-- China Business visa translations (visa_type_id 22)
(22, 'en', 'Business Visa', '90-day business visa for commercial activities in China', unixepoch(), unixepoch()),
(22, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في الصين', unixepoch(), unixepoch()),
(22, 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en China', unixepoch(), unixepoch()),
(22, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales en Chine', unixepoch(), unixepoch()),
(22, 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais na China', unixepoch(), unixepoch()),
(22, 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Китае', unixepoch(), unixepoch()),
(22, 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in China', unixepoch(), unixepoch()),
(22, 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Cina', unixepoch(), unixepoch());

-- Insert visa eligibility rules for these destinations
-- Note: visa_eligibility_id should start from 5 since we already have 4 from the previous migration
INSERT INTO `visa_eligibility` (`destination_id`, `passport_id`, `visa_type_id`, `eligibility_status`, `max_stay_days`, `last_updated`, `is_active`, `created_at`, `updated_at`) VALUES
-- Japan eligibility rules
(107, 1, 3, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Japan Tourist
(107, 1, 4, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Japan Business  
(107, 3, 3, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Japan Tourist
(107, 3, 4, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Japan Business

-- Germany eligibility rules (Schengen)
(151, 1, 5, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Germany Tourist
(151, 1, 6, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Germany Business
(151, 3, 5, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Germany Tourist (post-Brexit)
(151, 3, 6, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Germany Business

-- France eligibility rules (Schengen)
(150, 1, 7, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> France Tourist
(150, 1, 8, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> France Business
(150, 3, 7, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> France Tourist
(150, 3, 8, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> France Business

-- Italy eligibility rules (Schengen)
(156, 1, 9, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Italy Tourist
(156, 1, 10, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Italy Business
(156, 3, 9, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Italy Tourist
(156, 3, 10, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Italy Business

-- Spain eligibility rules (Schengen)
(176, 1, 11, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Spain Tourist
(176, 1, 12, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Spain Business
(176, 3, 11, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Spain Tourist
(176, 3, 12, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Spain Business

-- Saudi Arabia eligibility rules
(125, 1, 13, 'on_arrival', 30, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Saudi Arabia Tourist
(125, 1, 14, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Saudi Arabia Business
(125, 3, 13, 'on_arrival', 30, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Saudi Arabia Tourist
(125, 3, 14, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Saudi Arabia Business

-- Thailand eligibility rules
(131, 1, 15, 'visa_free', 30, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Thailand Tourist
(131, 1, 16, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Thailand Business
(131, 3, 15, 'visa_free', 30, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Thailand Tourist
(131, 3, 16, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Thailand Business

-- Singapore eligibility rules
(126, 1, 17, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Singapore Tourist
(126, 1, 18, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> Singapore Business
(126, 3, 17, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Singapore Tourist
(126, 3, 18, 'visa_free', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> Singapore Business

-- India eligibility rules
(102, 1, 19, 'eta', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> India Tourist (e-Visa)
(102, 1, 20, 'eta', 180, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> India Business (e-Visa)
(102, 3, 19, 'eta', 90, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> India Tourist (e-Visa)
(102, 3, 20, 'eta', 180, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> India Business (e-Visa)

-- China eligibility rules
(99, 1, 21, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> China Tourist
(99, 1, 22, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> China Business
(99, 3, 21, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> China Tourist
(99, 3, 22, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()); -- UK -> China Business

-- Insert sample visa eligibility translations
INSERT INTO `visa_eligibility_i18n` (`visa_eligibility_id`, `locale`, `notes`, `created_at`, `updated_at`) VALUES
-- USA -> Japan Tourist visa-free (eligibility_id 5)
(5, 'en', 'US passport holders can enter Japan visa-free for tourism up to 90 days', unixepoch(), unixepoch()),
(5, 'ar', 'يمكن لحاملي الجواز الأمريكي دخول اليابان بدون تأشيرة للسياحة لمدة تصل إلى 90 يوم', unixepoch(), unixepoch()),
(5, 'es', 'Los titulares de pasaporte estadounidense pueden entrar a Japón sin visa para turismo hasta 90 días', unixepoch(), unixepoch()),
(5, 'fr', 'Les détenteurs de passeport américain peuvent entrer au Japon sans visa pour le tourisme jusqu''à 90 jours', unixepoch(), unixepoch()),
(5, 'pt', 'Portadores de passaporte americano podem entrar no Japão sem visto para turismo até 90 dias', unixepoch(), unixepoch()),
(5, 'ru', 'Владельцы американского паспорта могут въезжать в Японию без визы для туризма до 90 дней', unixepoch(), unixepoch()),
(5, 'de', 'US-Passinhaber können ohne Visum zu touristischen Zwecken bis zu 90 Tage in Japan einreisen', unixepoch(), unixepoch()),
(5, 'it', 'I titolari di passaporto americano possono entrare in Giappone senza visto per turismo fino a 90 giorni', unixepoch(), unixepoch()),

-- UK -> Germany Tourist visa-free (eligibility_id 11)
(11, 'en', 'UK passport holders can enter Germany visa-free for tourism up to 90 days', unixepoch(), unixepoch()),
(11, 'ar', 'يمكن لحاملي الجواز البريطاني دخول ألمانيا بدون تأشيرة للسياحة لمدة تصل إلى 90 يوم', unixepoch(), unixepoch()),
(11, 'es', 'Los titulares de pasaporte británico pueden entrar a Alemania sin visa para turismo hasta 90 días', unixepoch(), unixepoch()),
(11, 'fr', 'Les détenteurs de passeport britannique peuvent entrer en Allemagne sans visa pour le tourisme jusqu''à 90 jours', unixepoch(), unixepoch()),
(11, 'pt', 'Portadores de passaporte britânico podem entrar na Alemanha sem visto para turismo até 90 dias', unixepoch(), unixepoch()),
(11, 'ru', 'Владельцы британского паспорта могут въезжать в Германию без визы для туризма до 90 дней', unixepoch(), unixepoch()),
(11, 'de', 'UK-Passinhaber können ohne Visum zu touristischen Zwecken bis zu 90 Tage in Deutschland einreisen', unixepoch(), unixepoch()),
(11, 'it', 'I titolari di passaporto britannico possono entrare in Germania senza visto per turismo fino a 90 giorni', unixepoch(), unixepoch()),

-- USA -> Saudi Arabia Tourist on-arrival (eligibility_id 21)
(21, 'en', 'Tourist visa available on arrival for US passport holders', unixepoch(), unixepoch()),
(21, 'ar', 'تأشيرة سياحية متاحة عند الوصول لحاملي الجواز الأمريكي', unixepoch(), unixepoch()),
(21, 'es', 'Visa de turista disponible a la llegada para titulares de pasaporte estadounidense', unixepoch(), unixepoch()),
(21, 'fr', 'Visa touristique disponible à l''arrivée pour les détenteurs de passeport américain', unixepoch(), unixepoch()),
(21, 'pt', 'Visto de turismo disponível na chegada para portadores de passaporte americano', unixepoch(), unixepoch()),
(21, 'ru', 'Туристическая виза доступна по прибытии для владельцев американского паспорта', unixepoch(), unixepoch()),
(21, 'de', 'Touristenvisum bei Ankunft für US-Passinhaber verfügbar', unixepoch(), unixepoch()),
(21, 'it', 'Visto turistico disponibile all''arrivo per titolari di passaporto americano', unixepoch(), unixepoch()),

-- USA -> India Tourist e-Visa (eligibility_id 29)
(29, 'en', 'e-Tourist visa required for US passport holders, apply online', unixepoch(), unixepoch()),
(29, 'ar', 'تأشيرة سياحية إلكترونية مطلوبة لحاملي الجواز الأمريكي، تقدم عبر الإنترنت', unixepoch(), unixepoch()),
(29, 'es', 'E-visa de turista requerida para titulares de pasaporte estadounidense, solicitar en línea', unixepoch(), unixepoch()),
(29, 'fr', 'E-visa touristique requis pour les détenteurs de passeport américain, demander en ligne', unixepoch(), unixepoch()),
(29, 'pt', 'E-visto de turismo necessário para portadores de passaporte americano, solicitar online', unixepoch(), unixepoch()),
(29, 'ru', 'Электронная туристическая виза требуется для владельцев американского паспорта, подавать онлайн', unixepoch(), unixepoch()),
(29, 'de', 'E-Touristenvisum für US-Passinhaber erforderlich, online beantragen', unixepoch(), unixepoch()),
(29, 'it', 'E-visto turistico richiesto per titolari di passaporto americano, richiedere online', unixepoch(), unixepoch());