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

INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
('JPN', 'tourist', 90, 10, 0.0, 'JPY', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement"]', true, NOW(), NOW()),
('JPN', 'business', 90, 15, 0.0, 'JPY', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, NOW(), NOW());

INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
('DEU', 'tourist', 90, 15, 80.0, 'EUR', false, true, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', true, NOW(), NOW()),
('DEU', 'business', 90, 20, 80.0, 'EUR', false, true, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', true, NOW(), NOW());

INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
('FRA', 'tourist', 90, 15, 80.0, 'EUR', false, true, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', true, NOW(), NOW()),
('FRA', 'business', 90, 20, 80.0, 'EUR', false, true, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', true, NOW(), NOW());

INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
('ITA', 'tourist', 90, 15, 80.0, 'EUR', false, true, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', true, NOW(), NOW()),
('ITA', 'business', 90, 20, 80.0, 'EUR', false, true, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', true, NOW(), NOW());

INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
('ESP', 'tourist', 90, 15, 80.0, 'EUR', false, true, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', true, NOW(), NOW()),
('ESP', 'business', 90, 20, 80.0, 'EUR', false, true, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', true, NOW(), NOW());

INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
('SAU', 'tourist', 30, 5, 150.0, 'SAR', false, true, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', true, NOW(), NOW()),
('SAU', 'business', 90, 10, 300.0, 'SAR', false, true, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, NOW(), NOW());

INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
('THA', 'tourist', 60, 7, 40.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', true, NOW(), NOW()),
('THA', 'business', 90, 15, 80.0, 'USD', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, NOW(), NOW());

INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
('SGP', 'tourist', 30, 3, 30.0, 'SGD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement"]', true, NOW(), NOW()),
('SGP', 'business', 30, 5, 30.0, 'SGD', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, NOW(), NOW());

INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
('IND', 'tourist', 90, 10, 50.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement"]', true, NOW(), NOW()),
('IND', 'business', 180, 15, 100.0, 'USD', false, true, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, NOW(), NOW());

INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
('CHN', 'tourist', 30, 10, 140.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof", "Travel insurance"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement", "insurance"]', true, NOW(), NOW()),
('CHN', 'business', 90, 15, 140.0, 'USD', false, true, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary", "Travel insurance"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking", "insurance"]', true, NOW(), NOW());

-- Insert visa types translations
-- Note: visa_type_id should start from 3 since we already have 2 from the previous migration

-- Use subqueries to fetch visa_type_id for translations
INSERT INTO "visa_types_i18n" ("visa_type_id", "locale", "name", "description", "created_at", "updated_at") VALUES
-- Japan Tourist visa translations
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'tourist' AND duration = 90), 'en', 'Tourist Visa', '90-day tourist visa for leisure travel to Japan', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'tourist' AND duration = 90), 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 90 يوم للسفر الترفيهي إلى اليابان', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'tourist' AND duration = 90), 'es', 'Visa de Turista', 'Visa de turista de 90 días para viajes de ocio a Japón', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'tourist' AND duration = 90), 'fr', 'Visa de Tourisme', 'Visa touristique de 90 jours pour les voyages de loisir au Japon', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'tourist' AND duration = 90), 'pt', 'Visto de Turismo', 'Visto de turismo de 90 dias para viagens de lazer ao Japão', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'tourist' AND duration = 90), 'ru', 'Туристическая виза', '90-дневная туристическая виза для отдыха в Японии', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'tourist' AND duration = 90), 'de', 'Touristenvisum', '90-tägiges Touristenvisum für Freizeitreisen nach Japan', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'tourist' AND duration = 90), 'it', 'Visto Turistico', 'Visto turistico di 90 giorni per viaggi di piacere in Giappone', NOW(), NOW()),

-- Japan Business visa translations
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'business' AND duration = 90), 'en', 'Business Visa', '90-day business visa for commercial activities in Japan', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'business' AND duration = 90), 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في اليابان', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'business' AND duration = 90), 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en Japón', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'business' AND duration = 90), 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales au Japon', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'business' AND duration = 90), 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais no Japão', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'business' AND duration = 90), 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Японии', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'business' AND duration = 90), 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Japan', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'business' AND duration = 90), 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Giappone', NOW(), NOW()),

-- Germany Tourist visa translations
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'tourist' AND duration = 90), 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to Germany', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'tourist' AND duration = 90), 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى ألمانيا', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'tourist' AND duration = 90), 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a Alemania', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'tourist' AND duration = 90), 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en Allemagne', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'tourist' AND duration = 90), 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à Alemanha', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'tourist' AND duration = 90), 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха в Германии', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'tourist' AND duration = 90), 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Deutschland', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'tourist' AND duration = 90), 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Germania', NOW(), NOW()),

-- Germany Business visa translations
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'business' AND duration = 90), 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in Germany', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'business' AND duration = 90), 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في ألمانيا', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'business' AND duration = 90), 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en Alemania', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'business' AND duration = 90), 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en Allemagne', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'business' AND duration = 90), 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na Alemanha', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'business' AND duration = 90), 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности в Германии', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'business' AND duration = 90), 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Deutschland', NOW(), NOW()),
((SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'business' AND duration = 90), 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Germania', NOW(), NOW());

-- ...existing code...

-- Insert visa eligibility rules for these destinations
-- Note: visa_eligibility_id should start from 5 since we already have 4 from the previous migration
INSERT INTO "visa_eligibility" ("destination_code", "passport_code", "visa_type_id", "eligibility_status", "max_stay_days", "last_updated", "is_active", "created_at", "updated_at") VALUES
-- Japan eligibility rules
('JPN', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'tourist' AND duration = 90), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- USA -> Japan Tourist
('JPN', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'business' AND duration = 90), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- USA -> Japan Business  
('JPN', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'tourist' AND duration = 90), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- UK -> Japan Tourist
('JPN', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'JPN' AND type = 'business' AND duration = 90), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- UK -> Japan Business

-- Germany eligibility rules (Schengen)
('DEU', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'tourist' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- USA -> Germany Tourist
('DEU', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'business' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- USA -> Germany Business
('DEU', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'tourist' AND duration = 90), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- UK -> Germany Tourist (post-Brexit)
('DEU', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'DEU' AND type = 'business' AND duration = 90), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- UK -> Germany Business

-- France eligibility rules (Schengen)
('FRA', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'FRA' AND type = 'tourist' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- USA -> France Tourist
('FRA', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'FRA' AND type = 'business' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- USA -> France Business
('FRA', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'FRA' AND type = 'tourist' AND duration = 90), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- UK -> France Tourist
('FRA', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'FRA' AND type = 'business' AND duration = 90), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- UK -> France Business

-- Italy eligibility rules (Schengen)
('ITA', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'ITA' AND type = 'tourist' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- USA -> Italy Tourist
('ITA', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'ITA' AND type = 'business' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- USA -> Italy Business
('ITA', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'ITA' AND type = 'tourist' AND duration = 90), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- UK -> Italy Tourist
('ITA', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'ITA' AND type = 'business' AND duration = 90), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- UK -> Italy Business

-- Spain eligibility rules (Schengen)
('ESP', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'ESP' AND type = 'tourist' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- USA -> Spain Tourist
('ESP', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'ESP' AND type = 'business' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- USA -> Spain Business
('ESP', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'ESP' AND type = 'tourist' AND duration = 90), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- UK -> Spain Tourist
('ESP', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'ESP' AND type = 'business' AND duration = 90), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- UK -> Spain Business

-- Saudi Arabia eligibility rules
('SAU', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'SAU' AND type = 'tourist' AND duration = 30), 'on_arrival', 30, NOW(), true, NOW(), NOW()), -- USA -> Saudi Arabia Tourist
('SAU', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'SAU' AND type = 'business' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- USA -> Saudi Arabia Business
('SAU', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'SAU' AND type = 'tourist' AND duration = 30), 'on_arrival', 30, NOW(), true, NOW(), NOW()), -- UK -> Saudi Arabia Tourist
('SAU', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'SAU' AND type = 'business' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- UK -> Saudi Arabia Business

-- Thailand eligibility rules
('THA', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'THA' AND type = 'tourist' AND duration = 60), 'visa_free', 30, NOW(), true, NOW(), NOW()), -- USA -> Thailand Tourist
('THA', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'THA' AND type = 'business' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- USA -> Thailand Business
('THA', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'THA' AND type = 'tourist' AND duration = 60), 'visa_free', 30, NOW(), true, NOW(), NOW()), -- UK -> Thailand Tourist
('THA', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'THA' AND type = 'business' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- UK -> Thailand Business

-- Singapore eligibility rules
('SGP', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'SGP' AND type = 'tourist' AND duration = 30), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- USA -> Singapore Tourist
('SGP', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'SGP' AND type = 'business' AND duration = 30), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- USA -> Singapore Business
('SGP', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'SGP' AND type = 'tourist' AND duration = 30), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- UK -> Singapore Tourist
('SGP', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'SGP' AND type = 'business' AND duration = 30), 'visa_free', 90, NOW(), true, NOW(), NOW()), -- UK -> Singapore Business

-- India eligibility rules
('IND', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'IND' AND type = 'tourist' AND duration = 90), 'eta', 90, NOW(), true, NOW(), NOW()), -- USA -> India Tourist (e-Visa)
('IND', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'IND' AND type = 'business' AND duration = 180), 'eta', 180, NOW(), true, NOW(), NOW()), -- USA -> India Business (e-Visa)
('IND', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'IND' AND type = 'tourist' AND duration = 90), 'eta', 90, NOW(), true, NOW(), NOW()), -- UK -> India Tourist (e-Visa)
('IND', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'IND' AND type = 'business' AND duration = 180), 'eta', 180, NOW(), true, NOW(), NOW()), -- UK -> India Business (e-Visa)

-- China eligibility rules
('CHN', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'CHN' AND type = 'tourist' AND duration = 30), 'required', NULL, NOW(), true, NOW(), NOW()), -- USA -> China Tourist
('CHN', 'USA', (SELECT id FROM visa_types WHERE destination_code = 'CHN' AND type = 'business' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()), -- USA -> China Business
('CHN', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'CHN' AND type = 'tourist' AND duration = 30), 'required', NULL, NOW(), true, NOW(), NOW()), -- UK -> China Tourist
('CHN', 'GBR', (SELECT id FROM visa_types WHERE destination_code = 'CHN' AND type = 'business' AND duration = 90), 'required', NULL, NOW(), true, NOW(), NOW()); -- UK -> China Business


-- Insert visa eligibility translations using correct eligibility IDs
INSERT INTO "visa_eligibility_i18n" ("visa_eligibility_id", "locale", "notes", "created_at", "updated_at")
SELECT e.id, t.locale, t.notes, NOW(), NOW()
FROM (
	VALUES
		-- USA -> Japan Tourist visa-free
		('JPN', 'USA', 'tourist', 'visa_free', 90, 'en', 'US passport holders can enter Japan visa-free for tourism up to 90 days'),
		('JPN', 'USA', 'tourist', 'visa_free', 90, 'ar', 'يمكن لحاملي الجواز الأمريكي دخول اليابان بدون تأشيرة للسياحة لمدة تصل إلى 90 يوم'),
		('JPN', 'USA', 'tourist', 'visa_free', 90, 'es', 'Los titulares de pasaporte estadounidense pueden entrar إلى اليابان sin visa para turismo hasta 90 días'),
		('JPN', 'USA', 'tourist', 'visa_free', 90, 'fr', 'Les détenteurs de passeport américain peuvent entrer au Japon sans visa pour le tourisme jusqu''à 90 jours'),
		('JPN', 'USA', 'tourist', 'visa_free', 90, 'pt', 'Portadores de passaporte americano podem entrar no Japão sem visto para turismo até 90 dias'),
		('JPN', 'USA', 'tourist', 'visa_free', 90, 'ru', 'Владельцы американского паспорта могут въезжать в Японию без визы для туризма до 90 дней'),
		('JPN', 'USA', 'tourist', 'visa_free', 90, 'de', 'US-Passinhaber können ohne Visum zu touristischen Zwecken bis zu 90 Tage in Japan einreisen'),
		('JPN', 'USA', 'tourist', 'visa_free', 90, 'it', 'I titolari di passaporto americano possono entrare in Giappone senza visto per turismo fino a 90 giorni'),
		-- UK -> Germany Tourist visa-free
		('DEU', 'GBR', 'tourist', 'visa_free', 90, 'en', 'UK passport holders can enter Germany visa-free for tourism up to 90 days'),
		('DEU', 'GBR', 'tourist', 'visa_free', 90, 'ar', 'يمكن لحاملي الجواز البريطاني دخول ألمانيا بدون تأشيرة للسياحة لمدة تصل إلى 90 يوم'),
		('DEU', 'GBR', 'tourist', 'visa_free', 90, 'es', 'Los titulares de pasaporte británico pueden entrar a Alemania sin visa para turismo hasta 90 días'),
		('DEU', 'GBR', 'tourist', 'visa_free', 90, 'fr', 'Les détenteurs de passeport britannique peuvent entrer en Allemagne sans visa pour le tourisme jusqu''à 90 jours'),
		('DEU', 'GBR', 'tourist', 'visa_free', 90, 'pt', 'Portadores de passaporte britânico podem entrar na Alemanha sem visto para turismo até 90 dias'),
		('DEU', 'GBR', 'tourist', 'visa_free', 90, 'ru', 'Владельцы британского паспорта могут въезжать в Германию без визы для туризма до 90 дней'),
		('DEU', 'GBR', 'tourist', 'visa_free', 90, 'de', 'UK-Passinhaber können ohne Visum zu touristischen Zwecken bis zu 90 Tage in Deutschland einreisen'),
		('DEU', 'GBR', 'tourist', 'visa_free', 90, 'it', 'I titolari di passaporto britannico possono entrare in Germania senza visto per turismo fino a 90 giorni'),
		-- USA -> Saudi Arabia Tourist on-arrival
		('SAU', 'USA', 'tourist', 'on_arrival', 30, 'en', 'Tourist visa available on arrival for US passport holders'),
		('SAU', 'USA', 'tourist', 'on_arrival', 30, 'ar', 'تأشيرة سياحية متاحة عند الوصول لحاملي الجواز الأمريكي'),
		('SAU', 'USA', 'tourist', 'on_arrival', 30, 'es', 'Visa de turista disponible a la llegada para titulares de pasaporte estadounidense'),
		('SAU', 'USA', 'tourist', 'on_arrival', 30, 'fr', 'Visa touristique disponible à l''arrivée pour les détenteurs de passeport américain'),
		('SAU', 'USA', 'tourist', 'on_arrival', 30, 'pt', 'Visto de turismo disponível na chegada para portadores de passaporte americano'),
		('SAU', 'USA', 'tourist', 'on_arrival', 30, 'ru', 'Туристическая виза доступна по прибытии для владельцев американского паспорта'),
		('SAU', 'USA', 'tourist', 'on_arrival', 30, 'de', 'Touristenvisum bei Ankunft für US-Passinhaber verfügbar'),
		('SAU', 'USA', 'tourist', 'on_arrival', 30, 'it', 'Visto turistico disponibile all''arrivo per titolari di passaporto americano'),
		-- USA -> India Tourist e-Visa
		('IND', 'USA', 'tourist', 'eta', 90, 'en', 'e-Tourist visa required for US passport holders, apply online'),
		('IND', 'USA', 'tourist', 'eta', 90, 'ar', 'تأشيرة سياحية إلكترونية مطلوبة لحاملي الجواز الأمريكي، تقدم عبر الإنترنت'),
		('IND', 'USA', 'tourist', 'eta', 90, 'es', 'E-visa de turista requerida para titulares de pasaporte estadounidense, solicitar en línea'),
		('IND', 'USA', 'tourist', 'eta', 90, 'fr', 'E-visa touristique requis pour les détenteurs de passeport américain, demander en ligne'),
		('IND', 'USA', 'tourist', 'eta', 90, 'pt', 'E-visto de turismo necessário para portadores de passaporte americano, solicitar online'),
		('IND', 'USA', 'tourist', 'eta', 90, 'ru', 'Электронная туристическая виза требуется для владельцев американского паспорта, подавать онлайн'),
		('IND', 'USA', 'tourist', 'eta', 90, 'de', 'E-Touristenvisum für US-Passinhaber erforderlich, online beantragen'),
		('IND', 'USA', 'tourist', 'eta', 90, 'it', 'E-visto turistico richiesto per titolari di passaporto americano, richiedere online')
	) AS t(destination_code, passport_code, visa_type, eligibility_status, max_stay_days, locale, notes)
JOIN "visa_types" vt ON vt."destination_code" = t.destination_code AND vt."type" = t.visa_type
JOIN "visa_eligibility" e ON e."destination_code" = t.destination_code AND e."passport_code" = t.passport_code AND e."visa_type_id" = vt.id AND e."eligibility_status" = t.eligibility_status AND (e."max_stay_days" = t.max_stay_days OR (e."max_stay_days" IS NULL AND t.max_stay_days IS NULL))
ON CONFLICT ("visa_eligibility_id", "locale") DO NOTHING;