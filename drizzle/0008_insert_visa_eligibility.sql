-- Insert visa eligibility data with conflict resolution
-- Comprehensive visa eligibility rules for popular passport/destination combinations

INSERT INTO "visa_eligibility" ("destination_id", "passport_id", "visa_type_id", "eligibility_status", "max_stay_days", "last_updated", "is_active", "created_at", "updated_at") VALUES
-- UAE eligibility rules (from original backup)
(3, 5, 1, 'visa_free', 30, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> UAE Tourist
(3, 5, 2, 'on_arrival', 30, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> UAE Business
(3, 4, 1, 'visa_free', 30, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> UAE Tourist
(3, 4, 2, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> UAE Business

-- Japan eligibility rules
(107, 1, 3, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Japan Tourist
(107, 1, 4, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Japan Business
(107, 3, 3, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Japan Tourist
(107, 3, 4, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Japan Business

-- Germany eligibility rules (Schengen)
(151, 1, 5, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Germany Tourist
(151, 1, 6, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Germany Business
(151, 3, 5, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Germany Tourist (post-Brexit)
(151, 3, 6, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Germany Business

-- France eligibility rules (Schengen)
(150, 1, 7, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> France Tourist
(150, 1, 8, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> France Business
(150, 3, 7, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> France Tourist
(150, 3, 8, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> France Business

-- Italy eligibility rules (Schengen)
(156, 1, 9, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Italy Tourist
(156, 1, 10, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Italy Business
(156, 3, 9, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Italy Tourist
(156, 3, 10, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Italy Business

-- Spain eligibility rules (Schengen)
(176, 1, 11, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Spain Tourist
(176, 1, 12, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Spain Business
(176, 3, 11, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Spain Tourist
(176, 3, 12, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Spain Business

-- Saudi Arabia eligibility rules
(125, 1, 13, 'on_arrival', 30, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Saudi Arabia Tourist
(125, 1, 14, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Saudi Arabia Business
(125, 3, 13, 'on_arrival', 30, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Saudi Arabia Tourist
(125, 3, 14, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Saudi Arabia Business

-- Thailand eligibility rules
(131, 1, 15, 'visa_free', 30, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Thailand Tourist
(131, 1, 16, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Thailand Business
(131, 3, 15, 'visa_free', 30, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Thailand Tourist
(131, 3, 16, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Thailand Business

-- Singapore eligibility rules
(126, 1, 17, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Singapore Tourist
(126, 1, 18, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> Singapore Business
(126, 3, 17, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Singapore Tourist
(126, 3, 18, 'visa_free', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> Singapore Business

-- India eligibility rules
(102, 1, 19, 'eta', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> India Tourist (e-Visa)
(102, 1, 20, 'eta', 180, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> India Business (e-Visa)
(102, 3, 19, 'eta', 90, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> India Tourist (e-Visa)
(102, 3, 20, 'eta', 180, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> India Business (e-Visa)

-- China eligibility rules
(99, 1, 21, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> China Tourist
(99, 1, 22, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- USA -> China Business
(99, 3, 21, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())), -- UK -> China Tourist
(99, 3, 22, 'required', NULL, EXTRACT(EPOCH FROM NOW()), true, EXTRACT(EPOCH FROM NOW()), EXTRACT(EPOCH FROM NOW())) -- UK -> China Business
ON CONFLICT (destination_id, passport_id, visa_type_id) DO NOTHING;