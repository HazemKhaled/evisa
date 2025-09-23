-- Visa data seeding migration
-- This migration seeds the database with visa types and eligibility data

-- Insert visa types (for UAE destination)
INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
('ARE', 'tourist', 30, 3, 100.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', true, NOW(), NOW()),
('ARE', 'business', 30, 5, 150.0, 'USD', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, NOW(), NOW());

-- Insert visa types translations
INSERT INTO "visa_types_i18n" ("visa_type_id", "locale", "name", "description", "created_at", "updated_at") VALUES
-- Tourist visa translations
(1, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel', NOW(), NOW()),
(1, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي', NOW(), NOW()),
(1, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio', NOW(), NOW()),
(1, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir', NOW(), NOW()),
(1, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer', NOW(), NOW()),
(1, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха', NOW(), NOW()),
(1, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen', NOW(), NOW()),
(1, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere', NOW(), NOW()),

-- Business visa translations
(2, 'en', 'Business Visa', '30-day business visa for commercial activities', NOW(), NOW()),
(2, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 30 يوم للأنشطة التجارية', NOW(), NOW()),
(2, 'es', 'Visa de Negocios', 'Visa de negocios de 30 días para actividades comerciales', NOW(), NOW()),
(2, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 30 jours pour activités commerciales', NOW(), NOW()),
(2, 'pt', 'Visto de Negócios', 'Visto de negócios de 30 dias para atividades comerciais', NOW(), NOW()),
(2, 'ru', 'Деловая виза', '30-дневная деловая виза для коммерческой деятельности', NOW(), NOW()),
(2, 'de', 'Geschäftsvisum', '30-tägiges Geschäftsvisum für kommerzielle Aktivitäten', NOW(), NOW()),
(2, 'it', 'Visto d''Affari', 'Visto d''affari di 30 giorni per attività commerciali', NOW(), NOW());

-- Insert visa eligibility rules
INSERT INTO "visa_eligibility" ("destination_code", "passport_code", "visa_type_id", "eligibility_status", "max_stay_days", "last_updated", "is_active", "created_at", "updated_at") VALUES
('ARE', 'USA', 1, 'visa_free', 30, NOW(), true, NOW(), NOW()), -- USA -> UAE Tourist
('ARE', 'USA', 2, 'on_arrival', 30, NOW(), true, NOW(), NOW()), -- USA -> UAE Business
('ARE', 'GBR', 1, 'visa_free', 30, NOW(), true, NOW(), NOW()), -- UK -> UAE Tourist
('ARE', 'GBR', 2, 'required', NULL, NOW(), true, NOW(), NOW()); -- UK -> UAE Business

-- Insert visa eligibility translations
INSERT INTO "visa_eligibility_i18n" ("visa_eligibility_id", "locale", "notes", "created_at", "updated_at") VALUES
-- USA -> UAE Tourist visa-free
(1, 'en', 'US passport holders can enter UAE visa-free for tourism', NOW(), NOW()),
(1, 'ar', 'يمكن لحاملي الجواز الأمريكي دخول الإمارات بدون تأشيرة للسياحة', NOW(), NOW()),
(1, 'es', 'Los titulares de pasaporte estadounidense pueden entrar a los EAU sin visa para turismo', NOW(), NOW()),
(1, 'fr', 'Les détenteurs de passeport américain peuvent entrer aux EAU sans visa pour le tourisme', NOW(), NOW()),
(1, 'pt', 'Portadores de passaporte americano podem entrar nos EAU sem visto para turismo', NOW(), NOW()),
(1, 'ru', 'Владельцы американского паспорта могут въезжать в ОАЭ без визы для туризма', NOW(), NOW()),
(1, 'de', 'US-Passinhaber können ohne Visum zu touristischen Zwecken in die VAE einreisen', NOW(), NOW()),
(1, 'it', 'I titolari di passaporto americano possono entrare negli EAU senza visto per turismo', NOW(), NOW()),

-- USA -> UAE Business on arrival
(2, 'en', 'Business visa available on arrival for US passport holders', NOW(), NOW()),
(2, 'ar', 'تأشيرة العمل متاحة عند الوصول لحاملي الجواز الأمريكي', NOW(), NOW()),
(2, 'es', 'Visa de negocios disponible a la llegada para titulares de pasaporte estadounidense', NOW(), NOW()),
(2, 'fr', 'Visa d''affaires disponible à l''arrivée pour les détenteurs de passeport américain', NOW(), NOW()),
(2, 'pt', 'Visto de negócios disponível na chegada para portadores de passaporte americano', NOW(), NOW()),
(2, 'ru', 'Деловая виза доступна по прибытии для владельцев американского паспорта', NOW(), NOW()),
(2, 'de', 'Geschäftsvisum bei Ankunft für US-Passinhaber verfügbar', NOW(), NOW()),
(2, 'it', 'Visto d''affari disponibile all''arrivo per titolari di passaporte americano', NOW(), NOW()),

-- UK -> UAE Tourist visa-free
(3, 'en', 'UK passport holders can enter UAE visa-free for tourism', NOW(), NOW()),
(3, 'ar', 'يمكن لحاملي الجواز البريطاني دخول الإمارات بدون تأشيرة للسياحة', NOW(), NOW()),
(3, 'es', 'Los titulares de pasaporte británico pueden entrar a los EAU sin visa para turismo', NOW(), NOW()),
(3, 'fr', 'Les détenteurs de passeport britannique peuvent entrer aux EAU sans visa pour le tourisme', NOW(), NOW()),
(3, 'pt', 'Portadores de passaporte britânico podem entrar nos EAU sem visto para turismo', NOW(), NOW()),
(3, 'ru', 'Владельцы британского паспорта могут въезжать в ОАЭ без визы для туризма', NOW(), NOW()),
(3, 'de', 'UK-Passinhaber können ohne Visum zu touristischen Zwecken in die VAE einreisen', NOW(), NOW()),
(3, 'it', 'I titolari di passaporto britannico possono entrare negli EAU senza visto per turismo', NOW(), NOW()),

-- UK -> UAE Business required
(4, 'en', 'Business visa required for UK passport holders', NOW(), NOW()),
(4, 'ar', 'تأشيرة العمل مطلوبة لحاملي الجواز البريطاني', NOW(), NOW()),
(4, 'es', 'Visa de negocios requerida para titulares de pasaporte británico', NOW(), NOW()),
(4, 'fr', 'Visa d''affaires requis pour les détenteurs de passeport britannique', NOW(), NOW()),
(4, 'pt', 'Visto de negócios necessário para portadores de passaporte britânico', NOW(), NOW()),
(4, 'ru', 'Деловая виза требуется для владельцев британского паспорта', NOW(), NOW()),
(4, 'de', 'Geschäftsvisum für UK-Passinhaber erforderlich', NOW(), NOW()),
(4, 'it', 'Visto d''affari richiesto per titolari di passaporto britannico', NOW(), NOW());
