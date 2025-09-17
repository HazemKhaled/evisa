-- Insert visa types data with conflict resolution
-- Total visa types: 22 (2 for UAE + 20 for popular destinations)
-- Combines data from both backup files for comprehensive visa types

-- Insert visa types for UAE (from original backup)
INSERT INTO "visa_types" ("destination_id", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
(3, 'tourist', 30, 3, 100.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(3, 'business', 30, 5, 150.0, 'USD', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Insert visa types for Japan (JPN - ID 107)
(107, 'tourist', 90, 10, 0.0, 'JPY', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(107, 'business', 90, 15, 0.0, 'JPY', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Insert visa types for Germany (DEU - ID 151)
(151, 'tourist', 90, 15, 80.0, 'EUR', false, true, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(151, 'business', 90, 20, 80.0, 'EUR', false, true, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Insert visa types for France (FRA - ID 150)
(150, 'tourist', 90, 15, 80.0, 'EUR', false, true, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(150, 'business', 90, 20, 80.0, 'EUR', false, true, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Insert visa types for Italy (ITA - ID 156)
(156, 'tourist', 90, 15, 80.0, 'EUR', false, true, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(156, 'business', 90, 20, 80.0, 'EUR', false, true, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Insert visa types for Spain (ESP - ID 176)
(176, 'tourist', 90, 15, 80.0, 'EUR', false, true, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(176, 'business', 90, 20, 80.0, 'EUR', false, true, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Insert visa types for Saudi Arabia (SAU - ID 125)
(125, 'tourist', 30, 5, 150.0, 'SAR', false, true, '["Valid passport", "Passport photos", "Flight itineary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(125, 'business', 90, 10, 300.0, 'SAR', false, true, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Insert visa types for Thailand (THA - ID 131)
(131, 'tourist', 60, 7, 40.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(131, 'business', 90, 15, 80.0, 'USD', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Insert visa types for Singapore (SGP - ID 126)
(126, 'tourist', 30, 3, 30.0, 'SGD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(126, 'business', 30, 5, 30.0, 'SGD', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Insert visa types for India (IND - ID 102)
(102, 'tourist', 90, 10, 50.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(102, 'business', 180, 15, 100.0, 'USD', false, true, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),

-- Insert visa types for China (CHN - ID 99)
(99, 'tourist', 30, 10, 140.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof", "Travel insurance"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement", "insurance"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())),
(99, 'business', 90, 15, 140.0, 'USD', false, true, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary", "Travel insurance"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking", "insurance"]', true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW()))
ON CONFLICT (destination_id, type) DO NOTHING;