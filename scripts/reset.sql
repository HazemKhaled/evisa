-- Reset script for GetTravelVisa.com database
-- This script drops all tables in the correct order to handle foreign key constraints

-- Disable foreign key constraints temporarily
PRAGMA foreign_keys = OFF;

-- Drop all tables (order doesn't matter with foreign keys disabled)
DROP TABLE IF EXISTS visa_eligibility_i18n;
DROP TABLE IF EXISTS visa_eligibility;
DROP TABLE IF EXISTS visa_types_i18n;
DROP TABLE IF EXISTS visa_types;
DROP TABLE IF EXISTS countries_i18n;
DROP TABLE IF EXISTS countries;

-- Re-enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Note: Tables will be recreated by running migrations after reset