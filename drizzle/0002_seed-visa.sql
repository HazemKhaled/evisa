-- Visa data seeding migration
-- This migration seeds the database with visa types and eligibility data

-- Insert visa types (for UAE destination)
INSERT INTO `visa_types` (`destination_id`, `type`, `duration`, `processing_time`, `fee`, `currency`, `requires_interview`, `is_multi_entry`, `requirements`, `documents`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 'tourist', 30, 3, 100.0, 'USD', 0, 0, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', 1, unixepoch(), unixepoch()),
(3, 'business', 30, 5, 150.0, 'USD', 0, 0, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', 1, unixepoch(), unixepoch());

-- Insert visa types translations
INSERT INTO `visa_types_i18n` (`visa_type_id`, `locale`, `name`, `description`, `created_at`, `updated_at`) VALUES
-- Tourist visa translations
(1, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel', unixepoch(), unixepoch()),
(1, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي', unixepoch(), unixepoch()),
(1, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio', unixepoch(), unixepoch()),
(1, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir', unixepoch(), unixepoch()),
(1, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer', unixepoch(), unixepoch()),
(1, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха', unixepoch(), unixepoch()),
(1, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen', unixepoch(), unixepoch()),
(1, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere', unixepoch(), unixepoch()),

-- Business visa translations
(2, 'en', 'Business Visa', '30-day business visa for commercial activities', unixepoch(), unixepoch()),
(2, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 30 يوم للأنشطة التجارية', unixepoch(), unixepoch()),
(2, 'es', 'Visa de Negocios', 'Visa de negocios de 30 días para actividades comerciales', unixepoch(), unixepoch()),
(2, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 30 jours pour activités commerciales', unixepoch(), unixepoch()),
(2, 'pt', 'Visto de Negócios', 'Visto de negócios de 30 dias para atividades comerciais', unixepoch(), unixepoch()),
(2, 'ru', 'Деловая виза', '30-дневная деловая виза для коммерческой деятельности', unixepoch(), unixepoch()),
(2, 'de', 'Geschäftsvisum', '30-tägiges Geschäftsvisum für kommerzielle Aktivitäten', unixepoch(), unixepoch()),
(2, 'it', 'Visto d''Affari', 'Visto d''affari di 30 giorni per attività commerciali', unixepoch(), unixepoch());

-- Insert visa eligibility rules
INSERT INTO `visa_eligibility` (`destination_id`, `passport_id`, `visa_type_id`, `eligibility_status`, `max_stay_days`, `last_updated`, `is_active`, `created_at`, `updated_at`) VALUES
(3, 5, 1, 'visa_free', 30, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> UAE Tourist
(3, 5, 2, 'on_arrival', 30, unixepoch(), 1, unixepoch(), unixepoch()), -- USA -> UAE Business
(3, 4, 1, 'visa_free', 30, unixepoch(), 1, unixepoch(), unixepoch()), -- UK -> UAE Tourist
(3, 4, 2, 'required', NULL, unixepoch(), 1, unixepoch(), unixepoch()); -- UK -> UAE Business

-- Insert visa eligibility translations
INSERT INTO `visa_eligibility_i18n` (`visa_eligibility_id`, `locale`, `notes`, `created_at`, `updated_at`) VALUES
-- USA -> UAE Tourist visa-free
(1, 'en', 'US passport holders can enter UAE visa-free for tourism', unixepoch(), unixepoch()),
(1, 'ar', 'يمكن لحاملي الجواز الأمريكي دخول الإمارات بدون تأشيرة للسياحة', unixepoch(), unixepoch()),
(1, 'es', 'Los titulares de pasaporte estadounidense pueden entrar a los EAU sin visa para turismo', unixepoch(), unixepoch()),
(1, 'fr', 'Les détenteurs de passeport américain peuvent entrer aux EAU sans visa pour le tourisme', unixepoch(), unixepoch()),
(1, 'pt', 'Portadores de passaporte americano podem entrar nos EAU sem visto para turismo', unixepoch(), unixepoch()),
(1, 'ru', 'Владельцы американского паспорта могут въезжать в ОАЭ без визы для туризма', unixepoch(), unixepoch()),
(1, 'de', 'US-Passinhaber können ohne Visum zu touristischen Zwecken in die VAE einreisen', unixepoch(), unixepoch()),
(1, 'it', 'I titolari di passaporto americano possono entrare negli EAU senza visto per turismo', unixepoch(), unixepoch()),

-- USA -> UAE Business on arrival
(2, 'en', 'Business visa available on arrival for US passport holders', unixepoch(), unixepoch()),
(2, 'ar', 'تأشيرة العمل متاحة عند الوصول لحاملي الجواز الأمريكي', unixepoch(), unixepoch()),
(2, 'es', 'Visa de negocios disponible a la llegada para titulares de pasaporte estadounidense', unixepoch(), unixepoch()),
(2, 'fr', 'Visa d''affaires disponible à l''arrivée pour les détenteurs de passeport américain', unixepoch(), unixepoch()),
(2, 'pt', 'Visto de negócios disponível na chegada para portadores de passaporte americano', unixepoch(), unixepoch()),
(2, 'ru', 'Деловая виза доступна по прибытии для владельцев американского паспорта', unixepoch(), unixepoch()),
(2, 'de', 'Geschäftsvisum bei Ankunft für US-Passinhaber verfügbar', unixepoch(), unixepoch()),
(2, 'it', 'Visto d''affari disponibile all''arrivo per titolari di passaporte americano', unixepoch(), unixepoch()),

-- UK -> UAE Tourist visa-free
(3, 'en', 'UK passport holders can enter UAE visa-free for tourism', unixepoch(), unixepoch()),
(3, 'ar', 'يمكن لحاملي الجواز البريطاني دخول الإمارات بدون تأشيرة للسياحة', unixepoch(), unixepoch()),
(3, 'es', 'Los titulares de pasaporte británico pueden entrar a los EAU sin visa para turismo', unixepoch(), unixepoch()),
(3, 'fr', 'Les détenteurs de passeport britannique peuvent entrer aux EAU sans visa pour le tourisme', unixepoch(), unixepoch()),
(3, 'pt', 'Portadores de passaporte britânico podem entrar nos EAU sem visto para turismo', unixepoch(), unixepoch()),
(3, 'ru', 'Владельцы британского паспорта могут въезжать в ОАЭ без визы для туризма', unixepoch(), unixepoch()),
(3, 'de', 'UK-Passinhaber können ohne Visum zu touristischen Zwecken in die VAE einreisen', unixepoch(), unixepoch()),
(3, 'it', 'I titolari di passaporto britannico possono entrare negli EAU senza visto per turismo', unixepoch(), unixepoch()),

-- UK -> UAE Business required
(4, 'en', 'Business visa required for UK passport holders', unixepoch(), unixepoch()),
(4, 'ar', 'تأشيرة العمل مطلوبة لحاملي الجواز البريطاني', unixepoch(), unixepoch()),
(4, 'es', 'Visa de negocios requerida para titulares de pasaporte británico', unixepoch(), unixepoch()),
(4, 'fr', 'Visa d''affaires requis pour les détenteurs de passeport britannique', unixepoch(), unixepoch()),
(4, 'pt', 'Visto de negócios necessário para portadores de passaporte britânico', unixepoch(), unixepoch()),
(4, 'ru', 'Деловая виза требуется для владельцев британского паспорта', unixepoch(), unixepoch()),
(4, 'de', 'Geschäftsvisum für UK-Passinhaber erforderlich', unixepoch(), unixepoch()),
(4, 'it', 'Visto d''affari richiesto per titolari di passaporto britannico', unixepoch(), unixepoch());
