-- Insert visa types translations with conflict resolution
-- Comprehensive multilingual support for all visa types

INSERT INTO "visa_types_i18n" ("visa_type_id", "locale", "name", "description", "created_at", "updated_at") VALUES
-- UAE Tourist visa translations (visa_type_id 1)
(1, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(1, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- UAE Business visa translations (visa_type_id 2)
(2, 'en', 'Business Visa', '30-day business visa for commercial activities', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 30 يوم للأنشطة التجارية', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'es', 'Visa de Negocios', 'Visa de negocios de 30 días para actividades comerciales', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 30 jours pour activités commerciales', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'pt', 'Visto de Negócios', 'Visto de negócios de 30 dias para atividades comerciais', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'ru', 'Деловая виза', '30-дневная деловая виза для коммерческой деятельности', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'de', 'Geschäftsvisum', '30-tägiges Geschäftsvisum für kommerzielle Aktivitäten', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(2, 'it', 'Visto d''Affari', 'Visto d''affari di 30 giorni per attività commerciali', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Japan Tourist visa translations (visa_type_id 3)
(3, 'en', 'Tourist Visa', '90-day tourist visa for leisure travel to Japan', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 90 يوم للسفر الترفيهي إلى اليابان', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'es', 'Visa de Turista', 'Visa de turista de 90 días para viajes de ocio a Japón', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'fr', 'Visa de Tourisme', 'Visa touristique de 90 jours pour les voyages de loisir au Japon', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'pt', 'Visto de Turismo', 'Visto de turismo de 90 dias para viagens de lazer ao Japão', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'ru', 'Туристическая виза', '90-дневная туристическая виза для отдыха в Японии', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'de', 'Touristenvisum', '90-tägiges Touristenvisum für Freizeitreisen nach Japan', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'it', 'Visto Turistico', 'Visto turistico di 90 giorni per viaggi di piacere in Giappone', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Japan Business visa translations (visa_type_id 4)
(4, 'en', 'Business Visa', '90-day business visa for commercial activities in Japan', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في اليابان', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en Japón', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales au Japon', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais no Japão', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Японии', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Japan', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(4, 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Giappone', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Germany Tourist visa translations (visa_type_id 5)
(5, 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to Germany', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى ألمانيا', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a Alemania', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en Allemagne', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à Alemanha', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха в Германии', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Deutschland', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(5, 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Germania', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Germany Business visa translations (visa_type_id 6)
(6, 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in Germany', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(6, 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في ألمانيا', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(6, 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en Alemania', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(6, 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en Allemagne', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(6, 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na Alemanha', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(6, 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности в Германии', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(6, 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Deutschland', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(6, 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Germania', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- France Tourist visa translations (visa_type_id 7)
(7, 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to France', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(7, 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى فرنسا', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(7, 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a Francia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(7, 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en France', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(7, 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à França', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(7, 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха во Франции', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(7, 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Frankreich', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(7, 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Francia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- France Business visa translations (visa_type_id 8)
(8, 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in France', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(8, 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في فرنسا', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(8, 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en Francia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(8, 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en France', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(8, 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na França', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(8, 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности во Франции', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(8, 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Frankreich', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(8, 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Francia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Italy Tourist visa translations (visa_type_id 9)
(9, 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to Italy', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(9, 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى إيطاليا', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(9, 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a Italia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(9, 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en Italie', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(9, 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à Itália', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(9, 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха в Италии', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(9, 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Italien', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(9, 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Italia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Italy Business visa translations (visa_type_id 10)
(10, 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in Italy', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(10, 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في إيطاليا', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(10, 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en Italia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(10, 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en Italie', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(10, 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na Itália', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(10, 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности в Италии', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(10, 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Italien', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(10, 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Italia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Spain Tourist visa translations (visa_type_id 11)
(11, 'en', 'Tourist Visa', '90-day Schengen tourist visa for leisure travel to Spain', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'ar', 'تأشيرة سياحية', 'تأشيرة شنغن السياحية لمدة 90 يوم للسفر الترفيهي إلى إسبانيا', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'es', 'Visa de Turista', 'Visa Schengen de turista de 90 días para viajes de ocio a España', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'fr', 'Visa de Tourisme', 'Visa Schengen touristique de 90 jours pour les voyages de loisir en Espagne', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'pt', 'Visto de Turismo', 'Visto Schengen de turismo de 90 dias para viagens de lazer à Espanha', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'ru', 'Туристическая виза', '90-дневная туристическая виза Шенген для отдыха в Испании', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'de', 'Touristenvisum', '90-tägiges Schengen-Touristenvisum für Freizeitreisen nach Spanien', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(11, 'it', 'Visto Turistico', 'Visto Schengen turistico di 90 giorni per viaggi di piacere in Spagna', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Spain Business visa translations (visa_type_id 12)
(12, 'en', 'Business Visa', '90-day Schengen business visa for commercial activities in Spain', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(12, 'ar', 'تأشيرة عمل', 'تأشيرة شنغن للعمل لمدة 90 يوم للأنشطة التجارية في إسبانيا', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(12, 'es', 'Visa de Negocios', 'Visa Schengen de negocios de 90 días para actividades comerciales en España', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(12, 'fr', 'Visa d''Affaires', 'Visa Schengen d''affaires de 90 jours pour activités commerciales en Espagne', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(12, 'pt', 'Visto de Negócios', 'Visto Schengen de negócios de 90 dias para atividades comerciais na Espanha', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(12, 'ru', 'Деловая виза', '90-дневная деловая виза Шенген для коммерческой деятельности в Испании', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(12, 'de', 'Geschäftsvisum', '90-tägiges Schengen-Geschäftsvisum für kommerzielle Aktivitäten in Spanien', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(12, 'it', 'Visto d''Affari', 'Visto Schengen d''affari di 90 giorni per attività commerciali in Spagna', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Saudi Arabia Tourist visa translations (visa_type_id 13)
(13, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel to Saudi Arabia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(13, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي إلى المملكة العربية السعودية', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(13, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio a Arabia Saudí', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(13, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir en Arabie Saoudite', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(13, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer à Arábia Saudita', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(13, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха в Саудовской Аравии', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(13, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen nach Saudi-Arabien', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(13, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere in Arabia Saudita', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Saudi Arabia Business visa translations (visa_type_id 14)
(14, 'en', 'Business Visa', '90-day business visa for commercial activities in Saudi Arabia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(14, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في المملكة العربية السعودية', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(14, 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en Arabia Saudí', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(14, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales en Arabie Saoudite', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(14, 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais na Arábia Saudita', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(14, 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Саудовской Аравии', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(14, 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Saudi-Arabien', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(14, 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Arabia Saudita', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Thailand Tourist visa translations (visa_type_id 15)
(15, 'en', 'Tourist Visa', '60-day tourist visa for leisure travel to Thailand', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(15, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 60 يوم للسفر الترفيهي إلى تايلاند', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(15, 'es', 'Visa de Turista', 'Visa de turista de 60 días para viajes de ocio a Tailandia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(15, 'fr', 'Visa de Tourisme', 'Visa touristique de 60 jours pour les voyages de loisir en Thaïlande', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(15, 'pt', 'Visto de Turismo', 'Visto de turismo de 60 dias para viagens de lazer à Tailândia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(15, 'ru', 'Туристическая виза', '60-дневная туристическая виза для отдыха в Таиланде', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(15, 'de', 'Touristenvisum', '60-tägiges Touristenvisum für Freizeitreisen nach Thailand', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(15, 'it', 'Visto Turistico', 'Visto turistico di 60 giorni per viaggi di piacere in Tailandia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Thailand Business visa translations (visa_type_id 16)
(16, 'en', 'Business Visa', '90-day business visa for commercial activities in Thailand', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(16, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في تايلاند', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(16, 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en Tailandia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(16, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales en Thaïlande', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(16, 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais na Tailândia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(16, 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Таиланде', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(16, 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Thailand', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(16, 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Tailandia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Singapore Tourist visa translations (visa_type_id 17)
(17, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel to Singapore', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(17, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي إلى سنغافورة', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(17, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio a Singapur', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(17, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir à Singapour', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(17, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer a Singapura', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(17, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха в Сингапуре', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(17, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen nach Singapur', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(17, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere a Singapore', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Singapore Business visa translations (visa_type_id 18)
(18, 'en', 'Business Visa', '30-day business visa for commercial activities in Singapore', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(18, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 30 يوم للأنشطة التجارية في سنغافورة', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(18, 'es', 'Visa de Negocios', 'Visa de negocios de 30 días para actividades comerciales en Singapur', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(18, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 30 jours pour activités commerciales à Singapour', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(18, 'pt', 'Visto de Negócios', 'Visto de negócios de 30 dias para atividades comerciais em Singapura', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(18, 'ru', 'Деловая виза', '30-дневная деловая виза для коммерческой деятельности в Сингапуре', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(18, 'de', 'Geschäftsvisum', '30-tägiges Geschäftsvisum für kommerzielle Aktivitäten in Singapur', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(18, 'it', 'Visto d''Affari', 'Visto d''affari di 30 giorni per attività commerciali a Singapore', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- India Tourist visa translations (visa_type_id 19)
(19, 'en', 'Tourist Visa', '90-day e-tourist visa for leisure travel to India', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(19, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية إلكترونية لمدة 90 يوم للسفر الترفيهي إلى الهند', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(19, 'es', 'Visa de Turista', 'E-visa de turista de 90 días para viajes de ocio a India', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(19, 'fr', 'Visa de Tourisme', 'E-visa touristique de 90 jours pour les voyages de loisir en Inde', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(19, 'pt', 'Visto de Turismo', 'E-visto de turismo de 90 dias para viagens de lazer à Índia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(19, 'ru', 'Туристическая виза', '90-дневная электронная туристическая виза для отдыха в Индии', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(19, 'de', 'Touristenvisum', '90-tägiges E-Touristenvisum für Freizeitreisen nach Indien', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(19, 'it', 'Visto Turistico', 'E-visto turistico di 90 giorni per viaggi di piacere in India', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- India Business visa translations (visa_type_id 20)
(20, 'en', 'Business Visa', '180-day e-business visa for commercial activities in India', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(20, 'ar', 'تأشيرة عمل', 'تأشيرة عمل إلكترونية لمدة 180 يوم للأنشطة التجارية في الهند', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(20, 'es', 'Visa de Negocios', 'E-visa de negocios de 180 días para actividades comerciales en India', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(20, 'fr', 'Visa d''Affaires', 'E-visa d''affaires de 180 jours pour activités commerciales en Inde', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(20, 'pt', 'Visto de Negócios', 'E-visto de negócios de 180 dias para atividades comerciais na Índia', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(20, 'ru', 'Деловая виза', '180-дневная электронная деловая виза для коммерческой деятельности в Индии', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(20, 'de', 'Geschäftsvisum', '180-tägiges E-Geschäftsvisum für kommerzielle Aktivitäten in Indien', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(20, 'it', 'Visto d''Affari', 'E-visto d''affari di 180 giorni per attività commerciali in India', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- China Tourist visa translations (visa_type_id 21)
(21, 'en', 'Tourist Visa', '30-day tourist visa for leisure travel to China', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'ar', 'تأشيرة سياحية', 'تأشيرة سياحية لمدة 30 يوم للسفر الترفيهي إلى الصين', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'es', 'Visa de Turista', 'Visa de turista de 30 días para viajes de ocio a China', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'fr', 'Visa de Tourisme', 'Visa touristique de 30 jours pour les voyages de loisir en Chine', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'pt', 'Visto de Turismo', 'Visto de turismo de 30 dias para viagens de lazer à China', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'ru', 'Туристическая виза', '30-дневная туристическая виза для отдыха в Китае', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'de', 'Touristenvisum', '30-tägiges Touristenvisum für Freizeitreisen nach China', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(21, 'it', 'Visto Turistico', 'Visto turistico di 30 giorni per viaggi di piacere in Cina', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- China Business visa translations (visa_type_id 22)
(22, 'en', 'Business Visa', '90-day business visa for commercial activities in China', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(22, 'ar', 'تأشيرة عمل', 'تأشيرة عمل لمدة 90 يوم للأنشطة التجارية في الصين', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(22, 'es', 'Visa de Negocios', 'Visa de negocios de 90 días para actividades comerciales en China', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(22, 'fr', 'Visa d''Affaires', 'Visa d''affaires de 90 jours pour activités commerciales en Chine', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(22, 'pt', 'Visto de Negócios', 'Visto de negócios de 90 dias para atividades comerciais na China', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(22, 'ru', 'Деловая виза', '90-дневная деловая виза для коммерческой деятельности в Китае', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(22, 'de', 'Geschäftsvisum', '90-tägiges Geschäftsvisum für kommerzielle Aktivitäten in China', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(22, 'it', 'Visto d''Affari', 'Visto d''affari di 90 giorni per attività commerciali in Cina', EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW()))
ON CONFLICT (visa_type_id, locale) DO NOTHING;