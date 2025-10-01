-- Visa data seeding migration
-- This migration seeds the database with visa types and eligibility data


WITH inserted_tourist AS (
	INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at")
	VALUES ('ARE', 'tourist', 30, 3, 100.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', true, NOW(), NOW())
	ON CONFLICT ("destination_code", "type") DO UPDATE SET "updated_at" = EXCLUDED."updated_at"
	RETURNING id
),
inserted_business AS (
	INSERT INTO "visa_types" ("destination_code", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at")
	VALUES ('ARE', 'business', 30, 5, 150.0, 'USD', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, NOW(), NOW())
	ON CONFLICT ("destination_code", "type") DO UPDATE SET "updated_at" = EXCLUDED."updated_at"
	RETURNING id
)
-- Insert visa types translations using the correct IDs
INSERT INTO "visa_types_i18n" ("visa_type_id", "locale", "name", "description", "created_at", "updated_at")
SELECT t.id, v.locale, v.name, v.description, NOW(), NOW()
FROM (
	SELECT id FROM inserted_tourist
	UNION ALL
	SELECT id FROM inserted_business
) t
JOIN (
	VALUES
		-- Tourist visa translations
		('tourist', 'en', 'Tourist Visa', '30-day tourist visa for leisure travel'),
		('tourist', 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي'),
		('tourist', 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio'),
		('tourist', 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir'),
		('tourist', 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer'),
		('tourist', 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха'),
		('tourist', 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen'),
		('tourist', 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere'),
		-- Business visa translations
		('business', 'en', 'Business Visa', '30-day business visa for commercial activities'),
		('business', 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 30 يوم للأنشطة التجارية'),
		('business', 'es', 'Visa de Negocios', 'Visa de negocios de 30 días para actividades comerciales'),
		('business', 'fr', 'Visa d''Affaires', 'Visa d''affaires de 30 jours pour activités commerciales'),
		('business', 'pt', 'Visto de Negócios', 'Visto de negócios de 30 dias para atividades comerciais'),
		('business', 'ru', 'Деловая виза', '30-дневная деловая виза для коммерческой деятельности'),
		('business', 'de', 'Geschäftsvisum', '30-tägiges Geschäftsvisum für kommerzielle Aktivitäten'),
		('business', 'it', 'Visto d''Affari', 'Visto d''affari di 30 giorni per attività commerciali')
	) AS v(type, locale, name, description)
	ON t.id = (
		SELECT id FROM "visa_types" WHERE "destination_code" = 'ARE' AND "type" = v.type
	)
ON CONFLICT ("visa_type_id", "locale") DO NOTHING;

-- ...existing code...

INSERT INTO "visa_eligibility" ("destination_code", "passport_code", "visa_type_id", "eligibility_status", "max_stay_days", "last_updated", "is_active", "created_at", "updated_at") VALUES
('ARE', 'USA', (SELECT id FROM "visa_types" WHERE "destination_code" = 'ARE' AND "type" = 'tourist'), 'visa_free', 30, NOW(), true, NOW(), NOW()), -- USA -> UAE Tourist
('ARE', 'USA', (SELECT id FROM "visa_types" WHERE "destination_code" = 'ARE' AND "type" = 'business'), 'on_arrival', 30, NOW(), true, NOW(), NOW()), -- USA -> UAE Business
('ARE', 'GBR', (SELECT id FROM "visa_types" WHERE "destination_code" = 'ARE' AND "type" = 'tourist'), 'visa_free', 30, NOW(), true, NOW(), NOW()), -- UK -> UAE Tourist
('ARE', 'GBR', (SELECT id FROM "visa_types" WHERE "destination_code" = 'ARE' AND "type" = 'business'), 'required', NULL, NOW(), true, NOW(), NOW()); -- UK -> UAE Business


-- Insert visa eligibility translations using correct eligibility IDs
INSERT INTO "visa_eligibility_i18n" ("visa_eligibility_id", "locale", "notes", "created_at", "updated_at")
SELECT e.id, t.locale, t.notes, NOW(), NOW()
FROM (
	VALUES
		-- USA -> UAE Tourist visa-free
		('ARE', 'USA', 'tourist', 'visa_free', 'en', 'US passport holders can enter UAE visa-free for tourism'),
		('ARE', 'USA', 'tourist', 'visa_free', 'ar', 'يمكن لحاملي الجواز الأمريكي دخول الإمارات بدون تأشيرة للسياحة'),
		('ARE', 'USA', 'tourist', 'visa_free', 'es', 'Los titulares de pasaporte estadounidense pueden entrar a los EAU sin visa para turismo'),
		('ARE', 'USA', 'tourist', 'visa_free', 'fr', 'Les détenteurs de passeport américain peuvent entrer aux EAU sans visa pour le tourisme'),
		('ARE', 'USA', 'tourist', 'visa_free', 'pt', 'Portadores de passaporte americano podem entrar nos EAU sem visto para turismo'),
		('ARE', 'USA', 'tourist', 'visa_free', 'ru', 'Владельцы американского паспорта могут въезжать в ОАЭ без визы для туризма'),
		('ARE', 'USA', 'tourist', 'visa_free', 'de', 'US-Passinhaber können ohne Visum zu touristischen Zwecken in die VAE einreisen'),
		('ARE', 'USA', 'tourist', 'visa_free', 'it', 'I titolari di passaporto americano possono entrare negli EAU senza visto per turismo'),
		-- USA -> UAE Business on arrival
		('ARE', 'USA', 'business', 'on_arrival', 'en', 'Business visa available on arrival for US passport holders'),
		('ARE', 'USA', 'business', 'on_arrival', 'ar', 'تأشيرة العمل متاحة عند الوصول لحاملي الجواز الأمريكي'),
		('ARE', 'USA', 'business', 'on_arrival', 'es', 'Visa de negocios disponible a la llegada para titulares de pasaporte estadounidense'),
		('ARE', 'USA', 'business', 'on_arrival', 'fr', 'Visa d''affaires disponible à l''arrivée pour les détenteurs de passeport américain'),
		('ARE', 'USA', 'business', 'on_arrival', 'pt', 'Visto de negócios disponível na chegada para portadores de passaporte americano'),
		('ARE', 'USA', 'business', 'on_arrival', 'ru', 'Деловая виза доступна по прибытии для владельцев американского паспорта'),
		('ARE', 'USA', 'business', 'on_arrival', 'de', 'Geschäftsvisum bei Ankunft für US-Passinhaber verfügbar'),
		('ARE', 'USA', 'business', 'on_arrival', 'it', 'Visto d''affari disponibile all''arrivo per titolari di passaporte americano'),
		-- UK -> UAE Tourist visa-free
		('ARE', 'GBR', 'tourist', 'visa_free', 'en', 'UK passport holders can enter UAE visa-free for tourism'),
		('ARE', 'GBR', 'tourist', 'visa_free', 'ar', 'يمكن لحاملي الجواز البريطاني دخول الإمارات بدون تأشيرة للسياحة'),
		('ARE', 'GBR', 'tourist', 'visa_free', 'es', 'Los titulares de pasaporte británico pueden entrar a los EAU sin visa para turismo'),
		('ARE', 'GBR', 'tourist', 'visa_free', 'fr', 'Les détenteurs de passeport britannique peuvent entrer aux EAU sans visa pour le tourisme'),
		('ARE', 'GBR', 'tourist', 'visa_free', 'pt', 'Portadores de passaporte britânico podem entrar nos EAU sem visto para turismo'),
		('ARE', 'GBR', 'tourist', 'visa_free', 'ru', 'Владельцы британского паспорта могут въезжать в ОАЭ без визы для туризма'),
		('ARE', 'GBR', 'tourist', 'visa_free', 'de', 'UK-Passinhaber können ohne Visum zu touristischen Zwecken in die VAE einreisen'),
		('ARE', 'GBR', 'tourist', 'visa_free', 'it', 'I titolari di passaporto britannico possono entrare negli EAU senza visto per turismo'),
		-- UK -> UAE Business required
		('ARE', 'GBR', 'business', 'required', 'en', 'Business visa required for UK passport holders'),
		('ARE', 'GBR', 'business', 'required', 'ar', 'تأشيرة العمل مطلوبة لحاملي الجواز البريطاني'),
		('ARE', 'GBR', 'business', 'required', 'es', 'Visa de negocios requerida para titulares de pasaporte británico'),
		('ARE', 'GBR', 'business', 'required', 'fr', 'Visa d''affaires requis pour les détenteurs de passeport britannique'),
		('ARE', 'GBR', 'business', 'required', 'pt', 'Visto de negócios necessário para portadores de passaporte britânico'),
		('ARE', 'GBR', 'business', 'required', 'ru', 'Деловая виза требуется для владельцев британского паспорта'),
		('ARE', 'GBR', 'business', 'required', 'de', 'Geschäftsvisum für UK-Passinhaber erforderlich'),
		('ARE', 'GBR', 'business', 'required', 'it', 'Visto d''affari richiesto per titolari di passaporto britannico')
	) AS t(destination_code, passport_code, visa_type, eligibility_status, locale, notes)
JOIN "visa_types" vt ON vt."destination_code" = t.destination_code AND vt."type" = t.visa_type
JOIN "visa_eligibility" e ON e."destination_code" = t.destination_code AND e."passport_code" = t.passport_code AND e."visa_type_id" = vt.id AND e."eligibility_status" = t.eligibility_status
ON CONFLICT ("visa_eligibility_id", "locale") DO NOTHING;
