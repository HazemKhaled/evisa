-- Insert visa eligibility translations with conflict resolution
-- Multilingual notes for key visa eligibility scenarios

INSERT INTO "visa_eligibility_i18n" ("visa_eligibility_id", "locale", "notes", "created_at", "updated_at") VALUES
-- USA -> UAE Tourist visa-free (eligibility_id 1)
(1, 'en', 'US passport holders can enter UAE visa-free for tourism', now(), now()),
(1, 'ar', 'يمكن لحاملي الجواز الأمريكي دخول الإمارات بدون تأشيرة للسياحة', now(), now()),
(1, 'es', 'Los titulares de pasaporte estadounidense pueden entrar a los EAU sin visa para turismo', now(), now()),
(1, 'fr', 'Les détenteurs de passeport américain peuvent entrer aux EAU sans visa pour le tourisme', now(), now()),
(1, 'pt', 'Portadores de passaporte americano podem entrar nos EAU sem visto para turismo', now(), now()),
(1, 'ru', 'Владельцы американского паспорта могут въезжать в ОАЭ без визы для туризма', now(), now()),
(1, 'de', 'US-Passinhaber können ohne Visum zu touristischen Zwecken in die VAE einreisen', now(), now()),
(1, 'it', 'I titolari di passaporto americano possono entrare negli EAU senza visto per turismo', now(), now()),

-- USA -> UAE Business on arrival (eligibility_id 2)
(2, 'en', 'Business visa available on arrival for US passport holders', now(), now()),
(2, 'ar', 'تأشيرة العمل متاحة عند الوصول لحاملي الجواز الأمريكي', now(), now()),
(2, 'es', 'Visa de negocios disponible a la llegada para titulares de pasaporte estadounidense', now(), now()),
(2, 'fr', 'Visa d''affaires disponible à l''arrivée pour les détenteurs de passeport américain', now(), now()),
(2, 'pt', 'Visto de negócios disponível na chegada para portadores de passaporte americano', now(), now()),
(2, 'ru', 'Деловая виза доступна по прибытии для владельцев американского паспорта', now(), now()),
(2, 'de', 'Geschäftsvisum bei Ankunft für US-Passinhaber verfügbar', now(), now()),
(2, 'it', 'Visto d''affari disponibile all''arrivo per titolari di passaporto americano', now(), now()),

-- UK -> UAE Tourist visa-free (eligibility_id 3)
(3, 'en', 'UK passport holders can enter UAE visa-free for tourism', now(), now()),
(3, 'ar', 'يمكن لحاملي الجواز البريطاني دخول الإمارات بدون تأشيرة للسياحة', now(), now()),
(3, 'es', 'Los titulares de pasaporte británico pueden entrar a los EAU sin visa para turismo', now(), now()),
(3, 'fr', 'Les détenteurs de passeport britannique peuvent entrer aux EAU sans visa pour le tourisme', now(), now()),
(3, 'pt', 'Portadores de passaporte britânico podem entrar nos EAU sem visto para turismo', now(), now()),
(3, 'ru', 'Владельцы британского паспорта могут въезжать в ОАЭ без визы для туризма', now(), now()),
(3, 'de', 'UK-Passinhaber können ohne Visum zu touristischen Zwecken in die VAE einreisen', now(), now()),
(3, 'it', 'I titolari di passaporto britannico possono entrare negli EAU senza visto per turismo', now(), now()),

-- UK -> UAE Business required (eligibility_id 4)
(4, 'en', 'Business visa required for UK passport holders', now(), now()),
(4, 'ar', 'تأشيرة العمل مطلوبة لحاملي الجواز البريطاني', now(), now()),
(4, 'es', 'Visa de negocios requerida para titulares de pasaporte británico', now(), now()),
(4, 'fr', 'Visa d''affaires requis pour les détenteurs de passeport britannique', now(), now()),
(4, 'pt', 'Visto de negócios necessário para portadores de passaporte britânico', now(), now()),
(4, 'ru', 'Деловая виза требуется для владельцев британского паспорта', now(), now()),
(4, 'de', 'Geschäftsvisum für UK-Passinhaber erforderlich', now(), now()),
(4, 'it', 'Visto d''affari richiesto per titolari di passaporto britannico', now(), now()),

-- USA -> Japan Tourist visa-free (eligibility_id 5)
(5, 'en', 'US passport holders can enter Japan visa-free for tourism up to 90 days', now(), now()),
(5, 'ar', 'يمكن لحاملي الجواز الأمريكي دخول اليابان بدون تأشيرة للسياحة لمدة تصل إلى 90 يوم', now(), now()),
(5, 'es', 'Los titulares de pasaporte estadounidense pueden entrar a Japón sin visa para turismo hasta 90 días', now(), now()),
(5, 'fr', 'Les détenteurs de passeport américain peuvent entrer au Japon sans visa pour le tourisme jusqu''à 90 jours', now(), now()),
(5, 'pt', 'Portadores de passaporte americano podem entrar no Japão sem visto para turismo até 90 dias', now(), now()),
(5, 'ru', 'Владельцы американского паспорта могут въезжать в Японию без визы для туризма до 90 дней', now(), now()),
(5, 'de', 'US-Passinhaber können ohne Visum zu touristischen Zwecken bis zu 90 Tage in Japan einreisen', now(), now()),
(5, 'it', 'I titolari di passaporto americano possono entrare in Giappone senza visto per turismo fino a 90 giorni', now(), now()),

-- UK -> Germany Tourist visa-free (eligibility_id 11)
(11, 'en', 'UK passport holders can enter Germany visa-free for tourism up to 90 days', now(), now()),
(11, 'ar', 'يمكن لحاملي الجواز البريطاني دخول ألمانيا بدون تأشيرة للسياحة لمدة تصل إلى 90 يوم', now(), now()),
(11, 'es', 'Los titulares de pasaporte británico pueden entrar a Alemania sin visa para turismo hasta 90 días', now(), now()),
(11, 'fr', 'Les détenteurs de passeport britannique peuvent entrer en Allemagne sans visa pour le tourisme jusqu''à 90 jours', now(), now()),
(11, 'pt', 'Portadores de passaporte britânico podem entrar na Alemanha sem visto para turismo até 90 dias', now(), now()),
(11, 'ru', 'Владельцы британского паспорта могут въезжать в Германию без визы для туризма до 90 дней', now(), now()),
(11, 'de', 'UK-Passinhaber können ohne Visum zu touristischen Zwecken bis zu 90 Tage in Deutschland einreisen', now(), now()),
(11, 'it', 'I titolari di passaporto britannico possono entrare in Germania senza visto per turismo fino a 90 giorni', now(), now()),

-- USA -> Saudi Arabia Tourist on-arrival (eligibility_id 21)
(21, 'en', 'Tourist visa available on arrival for US passport holders', now(), now()),
(21, 'ar', 'تأشيرة سياحية متاحة عند الوصول لحاملي الجواز الأمريكي', now(), now()),
(21, 'es', 'Visa de turista disponible a la llegada para titulares de pasaporte estadounidense', now(), now()),
(21, 'fr', 'Visa touristique disponible à l''arrivée pour les détenteurs de passeport américain', now(), now()),
(21, 'pt', 'Visto de turismo disponível na chegada para portadores de passaporte americano', now(), now()),
(21, 'ru', 'Туристическая виза доступна по прибытии для владельцев американского паспорта', now(), now()),
(21, 'de', 'Touristenvisum bei Ankunft für US-Passinhaber verfügbar', now(), now()),
(21, 'it', 'Visto turistico disponibile all''arrivo per titolari di passaporto americano', now(), now()),

-- USA -> India Tourist e-Visa (eligibility_id 29)
(29, 'en', 'e-Tourist visa required for US passport holders, apply online', now(), now()),
(29, 'ar', 'تأشيرة سياحية إلكترونية مطلوبة لحاملي الجواز الأمريكي، تقدم عبر الإنترنت', now(), now()),
(29, 'es', 'E-visa de turista requerida para titulares de pasaporte estadounidense, solicitar en línea', now(), now()),
(29, 'fr', 'E-visa touristique requis pour les détenteurs de passeport américain, demander en ligne', now(), now()),
(29, 'pt', 'E-visto de turismo necessário para portadores de passaporte americano, solicitar online', now(), now()),
(29, 'ru', 'Электронная туристическая виза требуется для владельцев американского паспорта, подавать онлайн', now(), now()),
(29, 'de', 'E-Touristenvisum für US-Passinhaber erforderlich, online beantragen', now(), now()),
(29, 'it', 'E-visto turistico richiesto per titolari di passaporto americano, richiedere online', now(), now())
ON CONFLICT (visa_eligibility_id, locale) DO NOTHING;