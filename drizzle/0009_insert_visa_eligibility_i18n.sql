-- Insert visa eligibility translations with conflict resolution
-- Multilingual notes for key visa eligibility scenarios

INSERT INTO "visa_eligibility_i18n" ("visa_eligibility_id", "locale", "notes", "created_at", "updated_at") VALUES
-- USA -> UAE Tourist visa-free (eligibility_id 1)
(1, 'en', 'US passport holders can enter UAE visa-free for tourism', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'ar', 'يمكن لحاملي الجواز الأمريكي دخول الإمارات بدون تأشيرة للسياحة', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'es', 'Los titulares de pasaporte estadounidense pueden entrar a los EAU sin visa para turismo', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'fr', 'Les détenteurs de passeport américain peuvent entrer aux EAU sans visa pour le tourisme', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'pt', 'Portadores de passaporte americano podem entrar nos EAU sem visto para turismo', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'ru', 'Владельцы американского паспорта могут въезжать в ОАЭ без визы для туризма', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'de', 'US-Passinhaber können ohne Visum zu touristischen Zwecken in die VAE einreisen', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'it', 'I titolari di passaporto americano possono entrare negli EAU senza visto per turismo', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- USA -> UAE Business on arrival (eligibility_id 2)
(2, 'en', 'Business visa available on arrival for US passport holders', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'ar', 'تأشيرة العمل متاحة عند الوصول لحاملي الجواز الأمريكي', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'es', 'Visa de negocios disponible a la llegada para titulares de pasaporte estadounidense', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'fr', 'Visa d''affaires disponible à l''arrivée pour les détenteurs de passeport américain', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'pt', 'Visto de negócios disponível na chegada para portadores de passaporte americano', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'ru', 'Деловая виза доступна по прибытии для владельцев американского паспорта', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'de', 'Geschäftsvisum bei Ankunft für US-Passinhaber verfügbar', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'it', 'Visto d''affari disponibile all''arrivo per titolari di passaporto americano', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- UK -> UAE Tourist visa-free (eligibility_id 3)
(3, 'en', 'UK passport holders can enter UAE visa-free for tourism', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'ar', 'يمكن لحاملي الجواز البريطاني دخول الإمارات بدون تأشيرة للسياحة', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'es', 'Los titulares de pasaporte británico pueden entrar a los EAU sin visa para turismo', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'fr', 'Les détenteurs de passeport britannique peuvent entrer aux EAU sans visa pour le tourisme', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'pt', 'Portadores de passaporte britânico podem entrar nos EAU sem visto para turismo', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'ru', 'Владельцы британского паспорта могут въезжать в ОАЭ без визы для туризма', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'de', 'UK-Passinhaber können ohne Visum zu touristischen Zwecken in die VAE einreisen', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'it', 'I titolari di passaporto britannico possono entrare negli EAU senza visto per turismo', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- UK -> UAE Business required (eligibility_id 4)
(4, 'en', 'Business visa required for UK passport holders', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'ar', 'تأشيرة العمل مطلوبة لحاملي الجواز البريطاني', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'es', 'Visa de negocios requerida para titulares de pasaporte británico', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'fr', 'Visa d''affaires requis pour les détenteurs de passeport britannique', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'pt', 'Visto de negócios necessário para portadores de passaporte britânico', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'ru', 'Деловая виза требуется для владельцев британского паспорта', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'de', 'Geschäftsvisum für UK-Passinhaber erforderlich', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'it', 'Visto d''affari richiesto per titolari di passaporto britannico', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- USA -> Japan Tourist visa-free (eligibility_id 5)
(5, 'en', 'US passport holders can enter Japan visa-free for tourism up to 90 days', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'ar', 'يمكن لحاملي الجواز الأمريكي دخول اليابان بدون تأشيرة للسياحة لمدة تصل إلى 90 يوم', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'es', 'Los titulares de pasaporte estadounidense pueden entrar a Japón sin visa para turismo hasta 90 días', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'fr', 'Les détenteurs de passeport américain peuvent entrer au Japon sans visa pour le tourisme jusqu''à 90 jours', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'pt', 'Portadores de passaporte americano podem entrar no Japão sem visto para turismo até 90 dias', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'ru', 'Владельцы американского паспорта могут въезжать в Японию без визы для туризма до 90 дней', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'de', 'US-Passinhaber können ohne Visum zu touristischen Zwecken bis zu 90 Tage in Japan einreisen', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'it', 'I titolari di passaporto americano possono entrare in Giappone senza visto per turismo fino a 90 giorni', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- UK -> Germany Tourist visa-free (eligibility_id 11)
(11, 'en', 'UK passport holders can enter Germany visa-free for tourism up to 90 days', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'ar', 'يمكن لحاملي الجواز البريطاني دخول ألمانيا بدون تأشيرة للسياحة لمدة تصل إلى 90 يوم', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'es', 'Los titulares de pasaporte británico pueden entrar a Alemania sin visa para turismo hasta 90 días', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'fr', 'Les détenteurs de passeport britannique peuvent entrer en Allemagne sans visa pour le tourisme jusqu''à 90 jours', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'pt', 'Portadores de passaporte britânico podem entrar na Alemanha sem visto para turismo até 90 dias', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'ru', 'Владельцы британского паспорта могут въезжать в Германию без визы для туризма до 90 дней', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'de', 'UK-Passinhaber können ohne Visum zu touristischen Zwecken bis zu 90 Tage in Deutschland einreisen', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'it', 'I titolari di passaporto britannico possono entrare in Germania senza visto per turismo fino a 90 giorni', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- USA -> Saudi Arabia Tourist on-arrival (eligibility_id 21)
(21, 'en', 'Tourist visa available on arrival for US passport holders', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'ar', 'تأشيرة سياحية متاحة عند الوصول لحاملي الجواز الأمريكي', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'es', 'Visa de turista disponible a la llegada para titulares de pasaporte estadounidense', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'fr', 'Visa touristique disponible à l''arrivée pour les détenteurs de passeport américain', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'pt', 'Visto de turismo disponível na chegada para portadores de passaporte americano', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'ru', 'Туристическая виза доступна по прибытии для владельцев американского паспорта', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'de', 'Touristenvisum bei Ankunft für US-Passinhaber verfügbar', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'it', 'Visto turistico disponibile all''arrivo per titolari di passaporto americano', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- USA -> India Tourist e-Visa (eligibility_id 29)
(29, 'en', 'e-Tourist visa required for US passport holders, apply online', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(29, 'ar', 'تأشيرة سياحية إلكترونية مطلوبة لحاملي الجواز الأمريكي، تقدم عبر الإنترنت', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(29, 'es', 'E-visa de turista requerida para titulares de pasaporte estadounidense, solicitar en línea', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(29, 'fr', 'E-visa touristique requis pour les détenteurs de passeport américain, demander en ligne', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(29, 'pt', 'E-visto de turismo necessário para portadores de passaporte americano, solicitar online', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(29, 'ru', 'Электронная туристическая виза требуется для владельцев американского паспорта, подавать онлайн', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(29, 'de', 'E-Touristenvisum für US-Passinhaber erforderlich, online beantragen', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(29, 'it', 'E-visto turistico richiesto per titolari di passaporto americano, richiedere online', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW()))
ON CONFLICT (visa_eligibility_id, locale) DO NOTHING;