-- Insert visa types translations with conflict resolution
-- Comprehensive multilingual support for all visa types

INSERT INTO "visa_types_i18n" ("visa_type_id", "locale", "name", "description", "created_at", "updated_at") VALUES
-- UAE Tourist visa translations (visa_type_id 1)
(1, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel', now(), now()),
(1, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي', now(), now()),
(1, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio', now(), now()),
(1, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir', now(), now()),
(1, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer', now(), now()),
(1, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха', now(), now()),
(1, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen', now(), now()),
(1, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere', now(), now()),

-- UAE Business visa translations (visa_type_id 2)
(2, 'en', 'Business Visa', '30-day business visa for commercial activities', now(), now()),
(2, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 30 يوم للأنشطة التجارية', now(), now()),
(2, 'es', 'Visa de Negocios', 'Visa de negocios de 30 días para actividades comerciales', now(), now()),
(2, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 30 jours pour activités commerciales', now(), now()),
(2, 'pt', 'Visto de Negócios', 'Visto de negócios de 30 dias para atividades comerciais', now(), now()),
(2, 'ru', 'Деловая виза', '30-дневная деловая виза для коммерческой деятельности', now(), now()),
(2, 'de', 'Geschäftsvisum', '30-tägiges Geschäftsvisum für kommerzielle Aktivitäten', now(), now()),
(2, 'it', 'Visto d''Affari', 'Visto d''affari di 30 giorni per attività commerciali', now(), now()),

-- Japan Tourist visa translations (visa_type_id 3)
(3, 'en', 'Tourist Visa', '90-day tourist visa for leisure travel to Japan', now(), now()),
(3, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 90 يوم للسفر الترفيهي إلى اليابان', now(), now()),
(3, 'es', 'Visa de Turista', 'Visa de turista de 90 días para viajes de ocio a Japón', now(), now()),
(3, 'fr', 'Visa de Tourisme', 'Visa touristique de 90 jours pour les voyages de loisir au Japon', now(), now()),
(3, 'pt', 'Visto de Turismo', 'Visto de turismo de 90 dias para viagens de lazer ao Japão', now(), now()),
(3, 'ru', 'Туристическая виза', '90-дневная туристическая виза для отдыха в Японии', now(), now()),
(3, 'de', 'Touristenvisum', '90-tägiges Touristenvisum für Freizeitreisen nach Japan', now(), now()),
(3, 'it', 'Visto Turistico', 'Visto turistico di 90 giorni per viaggi di piacere in Giappone', now(), now()),

-- Japan Business visa translations (visa_type_id 4)
(4, 'en', 'Business Visa', '90-day business visa for commercial activities in Japan', now(), now()),
(4, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في اليابان', now(), now()),
(4, 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en Japón', now(), now()),
(4, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales au Japon', now(), now()),
(4, 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais no Japão', now(), now()),
(4, 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Японии', now(), now()),
(4, 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Japan', now(), now()),
(4, 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Giappone', now(), now()),

-- Germany Tourist visa translations (visa_type_id 5)
(5, 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to Germany', now(), now()),
(5, 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى ألمانيا', now(), now()),
(5, 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a Alemania', now(), now()),
(5, 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en Allemagne', now(), now()),
(5, 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à Alemanha', now(), now()),
(5, 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха в Германии', now(), now()),
(5, 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Deutschland', now(), now()),
(5, 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Germania', now(), now()),

-- Germany Business visa translations (visa_type_id 6)
(6, 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in Germany', now(), now()),
(6, 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في ألمانيا', now(), now()),
(6, 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en Alemania', now(), now()),
(6, 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en Allemagne', now(), now()),
(6, 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na Alemanha', now(), now()),
(6, 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности в Германии', now(), now()),
(6, 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Deutschland', now(), now()),
(6, 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Germania', now(), now()),

-- France Tourist visa translations (visa_type_id 7)
(7, 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to France', now(), now()),
(7, 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى فرنسا', now(), now()),
(7, 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a Francia', now(), now()),
(7, 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en France', now(), now()),
(7, 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à França', now(), now()),
(7, 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха во Франции', now(), now()),
(7, 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Frankreich', now(), now()),
(7, 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Francia', now(), now()),

-- France Business visa translations (visa_type_id 8)
(8, 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in France', now(), now()),
(8, 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في فرنسا', now(), now()),
(8, 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en Francia', now(), now()),
(8, 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en France', now(), now()),
(8, 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na França', now(), now()),
(8, 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности во Франции', now(), now()),
(8, 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Frankreich', now(), now()),
(8, 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Francia', now(), now()),

-- Italy Tourist visa translations (visa_type_id 9)
(9, 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to Italy', now(), now()),
(9, 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى إيطاليا', now(), now()),
(9, 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a Italia', now(), now()),
(9, 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en Italie', now(), now()),
(9, 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à Itália', now(), now()),
(9, 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха в Италии', now(), now()),
(9, 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Italien', now(), now()),
(9, 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Italia', now(), now()),

-- Italy Business visa translations (visa_type_id 10)
(10, 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in Italy', now(), now()),
(10, 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في إيطاليا', now(), now()),
(10, 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en Italia', now(), now()),
(10, 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en Italie', now(), now()),
(10, 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na Itália', now(), now()),
(10, 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности в Италии', now(), now()),
(10, 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Italien', now(), now()),
(10, 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Italia', now(), now()),

-- Spain Tourist visa translations (visa_type_id 11)
(11, 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to Spain', now(), now()),
(11, 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى إسبانيا', now(), now()),
(11, 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a España', now(), now()),
(11, 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en Espagne', now(), now()),
(11, 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à Espanha', now(), now()),
(11, 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха в Испании', now(), now()),
(11, 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Spanien', now(), now()),
(11, 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Spagna', now(), now()),

-- Spain Business visa translations (visa_type_id 12)
(12, 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in Spain', now(), now()),
(12, 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في إسبانيا', now(), now()),
(12, 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en España', now(), now()),
(12, 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en Espagne', now(), now()),
(12, 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na Espanha', now(), now()),
(12, 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности в Испании', now(), now()),
(12, 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Spanien', now(), now()),
(12, 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Spagna', now(), now()),

-- Saudi Arabia Tourist visa translations (visa_type_id 13)
(13, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel to Saudi Arabia', now(), now()),
(13, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي إلى المملكة العربية السعودية', now(), now()),
(13, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio a Arabia Saudí', now(), now()),
(13, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir en Arabie Saoudite', now(), now()),
(13, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer à Arábia Saudita', now(), now()),
(13, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха в Саудовской Аравии', now(), now()),
(13, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen nach Saudi-Arabien', now(), now()),
(13, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere in Arabia Saudita', now(), now()),

-- Saudi Arabia Business visa translations (visa_type_id 14)
(14, 'en', 'Business Visa', '90-day business visa for commercial activities in Saudi Arabia', now(), now()),
(14, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في المملكة العربية السعودية', now(), now()),
(14, 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en Arabia Saudí', now(), now()),
(14, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales en Arabie Saoudite', now(), now()),
(14, 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais na Arábia Saudita', now(), now()),
(14, 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Саудовской Аравии', now(), now()),
(14, 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Saudi-Arabien', now(), now()),
(14, 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Arabia Saudita', now(), now()),

-- Thailand Tourist visa translations (visa_type_id 15)
(15, 'en', 'Tourist Visa', '60-day tourist visa for leisure travel to Thailand', now(), now()),
(15, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 60 يوم للسفر الترفيهي إلى تايلاند', now(), now()),
(15, 'es', 'Visa de Turista', 'Visa de turista de 60 días para viajes de ocio a Tailandia', now(), now()),
(15, 'fr', 'Visa de Tourisme', 'Visa touristique de 60 jours pour les voyages de loisir en Thaïlande', now(), now()),
(15, 'pt', 'Visto de Turismo', 'Visto de turismo de 60 dias para viagens de lazer à Tailândia', now(), now()),
(15, 'ru', 'Туристическая виза', '60-дневная туристическая виза для отдыха в Таиланде', now(), now()),
(15, 'de', 'Touristenvisum', '60-tägiges Touristenvisum für Freizeitreisen nach Thailand', now(), now()),
(15, 'it', 'Visto Turistico', 'Visto turistico di 60 giorni per viaggi di piacere in Tailandia', now(), now()),

-- Thailand Business visa translations (visa_type_id 16)
(16, 'en', 'Business Visa', '90-day business visa for commercial activities in Thailand', now(), now()),
(16, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في تايلاند', now(), now()),
(16, 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en Tailandia', now(), now()),
(16, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales en Thaïlande', now(), now()),
(16, 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais na Tailândia', now(), now()),
(16, 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Таиланде', now(), now()),
(16, 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Thailand', now(), now()),
(16, 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Tailandia', now(), now()),

-- Singapore Tourist visa translations (visa_type_id 17)
(17, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel to Singapore', now(), now()),
(17, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي إلى سنغافورة', now(), now()),
(17, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio a Singapur', now(), now()),
(17, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir à Singapour', now(), now()),
(17, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer a Singapura', now(), now()),
(17, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха в Сингапуре', now(), now()),
(17, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen nach Singapur', now(), now()),
(17, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere a Singapore', now(), now()),

-- Singapore Business visa translations (visa_type_id 18)
(18, 'en', 'Business Visa', '30-day business visa for commercial activities in Singapore', now(), now()),
(18, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 30 يوم للأنشطة التجارية في سنغافورة', now(), now()),
(18, 'es', 'Visa de Negocios', 'Visa de negocios de 30 días para actividades comerciales en Singapur', now(), now()),
(18, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 30 jours pour activités commerciales à Singapour', now(), now()),
(18, 'pt', 'Visto de Negócios', 'Visto de negócios de 30 dias para atividades comerciais em Singapura', now(), now()),
(18, 'ru', 'Деловая виза', '30-дневная деловая виза для коммерческой деятельности в Сингапуре', now(), now()),
(18, 'de', 'Geschäftsvisum', '30-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Singapur', now(), now()),
(18, 'it', 'Visto d''Affari', 'Visto d''affari di 30 giorni per attività commerciali a Singapore', now(), now()),

-- India Tourist visa translations (visa_type_id 19)
(19, 'en', 'Tourist Visa', '90-day e-tourist visa for leisure travel to India', now(), now()),
(19, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية إلكترونية لمدة 90 يوم للسفر الترفيهي إلى الهند', now(), now()),
(19, 'es', 'Visa de Turista', 'E-visa de turista de 90 días para viajes de ocio a India', now(), now()),
(19, 'fr', 'Visa de Tourisme', 'E-visa touristique de 90 jours pour les voyages de loisir en Inde', now(), now()),
(19, 'pt', 'Visto de Turismo', 'E-visto de turismo de 90 dias para viagens de lazer à Índia', now(), now()),
(19, 'ru', 'Туристическая виза', '90-дневная электронная туристическая виза для отдыха в Индии', now(), now()),
(19, 'de', 'Touristenvisum', '90-tägiges E-Touristenvisum für Freizeitreisen nach Indien', now(), now()),
(19, 'it', 'Visto Turistico', 'E-visto turistico di 90 giorni per viaggi di piacere in India', now(), now()),

-- India Business visa translations (visa_type_id 20)
(20, 'en', 'Business Visa', '180-day e-business visa for commercial activities in India', now(), now()),
(20, 'ar', 'تأشيرة عمل', 'تأشيرة عمل إلكترونية لمدة 180 يوم للأنشطة التجارية في الهند', now(), now()),
(20, 'es', 'Visa de Negocios', 'E-visa de negocios de 180 días para actividades comerciales en India', now(), now()),
(20, 'fr', 'Visa d''Affaires', 'E-visa d''affaires de 180 jours pour activités commerciales en Inde', now(), now()),
(20, 'pt', 'Visto de Negócios', 'E-visto de negócios de 180 dias para atividades comerciais na Índia', now(), now()),
(20, 'ru', 'Деловая виза', '180-дневная электронная деловая виза для коммерческой деятельности в Индии', now(), now()),
(20, 'de', 'Geschäftsvisum', '180-tägiges E-Geschäftsvisum für kommerzielle Aktivitäten in Indien', now(), now()),
(20, 'it', 'Visto d''Affari', 'E-visto d''affari di 180 giorni per attività commerciali in India', now(), now()),

-- China Tourist visa translations (visa_type_id 21)
(21, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel to China', now(), now()),
(21, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي إلى الصين', now(), now()),
(21, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio a China', now(), now()),
(21, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir en Chine', now(), now()),
(21, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer à China', now(), now()),
(21, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха в Китае', now(), now()),
(21, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen nach China', now(), now()),
(21, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere in Cina', now(), now()),

-- China Business visa translations (visa_type_id 22)
(22, 'en', 'Business Visa', '90-day business visa for commercial activities in China', now(), now()),
(22, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في الصين', now(), now()),
(22, 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en China', now(), now()),
(22, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales en Chine', now(), now()),
(22, 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais na China', now(), now()),
(22, 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Китае', now(), now()),
(22, 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in China', now(), now()),
(22, 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Cina', now(), now())
ON CONFLICT (visa_type_id, locale) DO NOTHING;