-- Reset script for eVisa database
-- This script drops all tables and recreates them

DROP TABLE IF EXISTS visa_eligibility;
DROP TABLE IF EXISTS visa_types;
DROP TABLE IF EXISTS countries;

-- Note: Tables will be recreated by running migrations after reset