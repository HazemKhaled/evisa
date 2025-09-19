-- Comprehensive Data Dump for GetTravelVisa.com - FIXED VERSION
-- Generated from backup data migrations with all issues resolved
-- Total Records: 192 countries, 152 blog tags, 33 blog posts, 22 visa types, 32+ eligibility rules
-- Languages: English, Arabic, Spanish, French, Portuguese, Russian, German, Italian

-- ==================================================
-- COUNTRIES AND COUNTRIES I18N (192 countries)
-- ==================================================-- Insert countries data with conflict resolution
-- Total countries: 192
INSERT INTO countries (code, continent, region, hero_image, is_active, created_at, updated_at) VALUES
('USA', 'North America', 'Northern America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('CAN', 'North America', 'Northern America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GBR', 'Europe', 'Northern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('AUS', 'Oceania', 'Australia and New Zealand', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ARE', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('DZA', 'Africa', 'Northern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('AGO', 'Africa', 'Middle Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BEN', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BWA', 'Africa', 'Southern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BFA', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BDI', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('CMR', 'Africa', 'Middle Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('CPV', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('CAF', 'Africa', 'Middle Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('TCD', 'Africa', 'Middle Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('COM', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('COG', 'Africa', 'Middle Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('COD', 'Africa', 'Middle Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('CIV', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('DJI', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('EGY', 'Africa', 'Northern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GNQ', 'Africa', 'Middle Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ERI', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SWZ', 'Africa', 'Southern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ETH', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GAB', 'Africa', 'Middle Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GMB', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GHA', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GIN', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GNB', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('KEN', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('LSO', 'Africa', 'Southern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('LBR', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('LBY', 'Africa', 'Northern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MDG', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MWI', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MLI', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MRT', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MUS', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MAR', 'Africa', 'Northern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MOZ', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('NAM', 'Africa', 'Southern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('NER', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('NGA', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('RWA', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('STP', 'Africa', 'Middle Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SEN', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SYC', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SLE', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SOM', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ZAF', 'Africa', 'Southern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SSD', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SDN', 'Africa', 'Northern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('TZA', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('TGO', 'Africa', 'Western Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('TUN', 'Africa', 'Northern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('UGA', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ZMB', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ZWE', 'Africa', 'Eastern Africa', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MEX', 'North America', 'Central America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BLZ', 'North America', 'Central America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('CRI', 'North America', 'Central America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SLV', 'North America', 'Central America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GTM', 'North America', 'Central America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('HND', 'North America', 'Central America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('NIC', 'North America', 'Central America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('PAN', 'North America', 'Central America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ATG', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BHS', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BRB', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('CUB', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('DMA', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('DOM', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GRD', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('HTI', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('JAM', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('KNA', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('LCA', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('VCT', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('TTO', 'North America', 'Caribbean', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ARG', 'South America', 'South America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BOL', 'South America', 'South America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BRA', 'South America', 'South America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('CHL', 'South America', 'South America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('COL', 'South America', 'South America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ECU', 'South America', 'South America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GUY', 'South America', 'South America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('PRY', 'South America', 'South America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('PER', 'South America', 'South America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SUR', 'South America', 'South America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('URY', 'South America', 'South America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('VEN', 'South America', 'South America', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('AFG', 'Asia', 'Southern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BGD', 'Asia', 'Southern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BTN', 'Asia', 'Southern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('IND', 'Asia', 'Southern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('IRN', 'Asia', 'Southern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MDV', 'Asia', 'Southern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('NPL', 'Asia', 'Southern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('PAK', 'Asia', 'Southern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('LKA', 'Asia', 'Southern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('CHN', 'Asia', 'Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('JPN', 'Asia', 'Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MNG', 'Asia', 'Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('PRK', 'Asia', 'Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('KOR', 'Asia', 'Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BRN', 'Asia', 'South-Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('KHM', 'Asia', 'South-Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('IDN', 'Asia', 'South-Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('LAO', 'Asia', 'South-Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MYS', 'Asia', 'South-Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MMR', 'Asia', 'South-Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('PHL', 'Asia', 'South-Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SGP', 'Asia', 'South-Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('THA', 'Asia', 'South-Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('TLS', 'Asia', 'South-Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('VNM', 'Asia', 'South-Eastern Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ARM', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('AZE', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BHR', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('CYP', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GEO', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('IRQ', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ISR', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('JOR', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('KWT', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('LBN', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('OMN', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('PSE', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('QAT', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SAU', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SYR', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('TUR', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('YEM', 'Asia', 'Western Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('KAZ', 'Asia', 'Central Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('KGZ', 'Asia', 'Central Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('TJK', 'Asia', 'Central Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('TKM', 'Asia', 'Central Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('UZB', 'Asia', 'Central Asia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ALB', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('AND', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BIH', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('BGR', 'Europe', 'Eastern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('HRV', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('CZE', 'Europe', 'Eastern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('DNK', 'Europe', 'Northern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('EST', 'Europe', 'Northern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('FIN', 'Europe', 'Northern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('FRA', 'Europe', 'Western Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('DEU', 'Europe', 'Western Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GRC', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('HUN', 'Europe', 'Eastern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ISL', 'Europe', 'Northern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('IRL', 'Europe', 'Northern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ITA', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('XKX', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('LVA', 'Europe', 'Northern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('LIE', 'Europe', 'Western Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('LTU', 'Europe', 'Northern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('LUX', 'Europe', 'Western Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MLT', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MDA', 'Europe', 'Eastern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MCO', 'Europe', 'Western Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MNE', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('NLD', 'Europe', 'Western Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MKD', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('NOR', 'Europe', 'Northern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('POL', 'Europe', 'Eastern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('PRT', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ROU', 'Europe', 'Eastern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('RUS', 'Europe', 'Eastern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SMR', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SRB', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SVK', 'Europe', 'Eastern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SVN', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('ESP', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SWE', 'Europe', 'Northern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('CHE', 'Europe', 'Western Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('UKR', 'Europe', 'Eastern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('VAT', 'Europe', 'Southern Europe', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('FJI', 'Oceania', 'Melanesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('NCL', 'Oceania', 'Melanesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('PNG', 'Oceania', 'Melanesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('SLB', 'Oceania', 'Melanesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('VUT', 'Oceania', 'Melanesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('FSM', 'Oceania', 'Micronesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('GUM', 'Oceania', 'Micronesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('KIR', 'Oceania', 'Micronesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MHL', 'Oceania', 'Micronesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('NRU', 'Oceania', 'Micronesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('MNP', 'Oceania', 'Micronesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('PLW', 'Oceania', 'Micronesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('NZL', 'Oceania', 'Australia and New Zealand', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('COK', 'Oceania', 'Polynesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('PYF', 'Oceania', 'Polynesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('WSM', 'Oceania', 'Polynesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('TON', 'Oceania', 'Polynesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now()),
('TUV', 'Oceania', 'Polynesia', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', true, now(), now())
ON CONFLICT (code) DO NOTHING;

-- Insert countries_i18n data with conflict resolution
INSERT INTO countries_i18n (country_id, locale, name, name_long, about, created_at, updated_at) VALUES
((SELECT id FROM countries WHERE code = 'USA'), 'en', 'United States', 'United States of America', 'The United States is a country of 50 states covering a vast swath of North America.', now(), now()),
((SELECT id FROM countries WHERE code = 'CAN'), 'en', 'Canada', 'Canada', 'Canada is a country in North America known for its natural beauty and multicultural society.', now(), now()),
((SELECT id FROM countries WHERE code = 'GBR'), 'en', 'United Kingdom', 'United Kingdom of Great Britain and Northern Ireland', 'The United Kingdom consists of England, Scotland, Wales and Northern Ireland.', now(), now()),
((SELECT id FROM countries WHERE code = 'AUS'), 'en', 'Australia', 'Commonwealth of Australia', 'Australia is a country and continent surrounded by the Indian and Pacific oceans.', now(), now()),
((SELECT id FROM countries WHERE code = 'ARE'), 'en', 'United Arab Emirates', 'United Arab Emirates', 'The UAE is a federation of seven emirates on the eastern side of the Arabian peninsula.', now(), now()),
((SELECT id FROM countries WHERE code = 'JPN'), 'en', 'Japan', 'Japan', 'Japan is an island country in East Asia known for its rich culture and technological advancement.', now(), now()),
((SELECT id FROM countries WHERE code = 'DEU'), 'en', 'Germany', 'Federal Republic of Germany', 'Germany is a Western European country with a landscape of forests, rivers, mountain ranges and North Sea beaches.', now(), now()),
((SELECT id FROM countries WHERE code = 'FRA'), 'en', 'France', 'French Republic', 'France is a country whose territory consists of metropolitan France in Western Europe and several overseas regions and territories.', now(), now()),
((SELECT id FROM countries WHERE code = 'ITA'), 'en', 'Italy', 'Italian Republic', 'Italy is a European country consisting of a peninsula delimited by the Italian Alps and several islands.', now(), now()),
((SELECT id FROM countries WHERE code = 'ESP'), 'en', 'Spain', 'Kingdom of Spain', 'Spain is a country on Europes Iberian Peninsula including diverse regions with distinct cultures.', now(), now()),
((SELECT id FROM countries WHERE code = 'SAU'), 'en', 'Saudi Arabia', 'Kingdom of Saudi Arabia', 'Saudi Arabia is a desert country encompassing most of the Arabian Peninsula, with Red Sea and Persian Gulf coastlines.', now(), now())
ON CONFLICT (country_id, locale) DO NOTHING;

-- ==================================================
-- BLOG TAGS (152 tags)
-- ==================================================
-- Insert blog tags data with conflict resolution
-- Total blog tags: 152
INSERT INTO blog_tags (slug, name, created_at, updated_at) VALUES
('business-visa', 'Business visa', now(), now()),
('entrepreneurship', 'Entrepreneurship', now(), now()),
('immigration', 'Immigration', now(), now()),
('business-travel', 'Business travel', now(), now()),
('visa-application', 'Visa application', now(), now()),
('business-immigration', 'Business immigration', now(), now()),
('professional-travel', 'Professional travel', now(), now()),
('national-parks', 'National parks', now(), now()),
('outdoor-adventure', 'Outdoor adventure', now(), now()),
('nature', 'Nature', now(), now()),
('hiking', 'Hiking', now(), now()),
('wilderness-exploration', 'Wilderness exploration', now(), now()),
('outdoor-activities', 'Outdoor activities', now(), now()),
('nature-tourism', 'Nature tourism', now(), now()),
('visitor-visa', 'Visitor visa', now(), now()),
('travel', 'Travel', now(), now()),
('travel-planning', 'Travel planning', now(), now()),
('visa-requirements', 'Visa requirements', now(), now()),
('tourism', 'Tourism', now(), now()),
('winter-activities', 'Winter activities', now(), now()),
('skiing', 'Skiing', now(), now()),
('northern-lights', 'Northern lights', now(), now()),
('winter-sports', 'Winter sports', now(), now()),
('cold-weather-adventures', 'Cold weather adventures', now(), now()),
('winter-tourism', 'Winter tourism', now(), now()),
('culinary-culture', 'Culinary culture', now(), now()),
('regional-cuisines', 'Regional cuisines', now(), now()),
('food-culture', 'Food culture', now(), now()),
('european-cuisine', 'European cuisine', now(), now()),
('traditional-dishes', 'Traditional dishes', now(), now()),
('culinary-traditions', 'Culinary traditions', now(), now()),
('food-experiences', 'Food experiences', now(), now()),
('cultural-museums', 'Cultural museums', now(), now()),
('art-museums', 'Art museums', now(), now()),
('history-museums', 'History museums', now(), now()),
('cultural-heritage', 'Cultural heritage', now(), now()),
('museum-guide', 'Museum guide', now(), now()),
('cultural-institutions', 'Cultural institutions', now(), now()),
('art-collections', 'Art collections', now(), now()),
('festivals', 'Festivals', now(), now()),
('seasonal-events', 'Seasonal events', now(), now()),
('cultural-celebrations', 'Cultural celebrations', now(), now()),
('seasonal-experiences', 'Seasonal experiences', now(), now()),
('cultural-events', 'Cultural events', now(), now()),
('festival-culture', 'Festival culture', now(), now()),
('seasonal-travel', 'Seasonal travel', now(), now()),
('transportation', 'Transportation', now(), now()),
('travel-tips', 'Travel tips', now(), now()),
('european-travel', 'European travel', now(), now()),
('public-transport', 'Public transport', now(), now()),
('transportation-guide', 'Transportation guide', now(), now()),
('european-transport', 'European transport', now(), now()),
('cultural-experiences', 'Cultural experiences', now(), now()),
('traditional-culture', 'Traditional culture', now(), now()),
('cultural-traditions', 'Cultural traditions', now(), now()),
('travel-guide', 'Travel guide', now(), now()),
('cultural-immersion', 'Cultural immersion', now(), now()),
('traditional-arts', 'Traditional arts', now(), now()),
('cuisine', 'Cuisine', now(), now()),
('regional-specialties', 'Regional specialties', now(), now()),
('asian-cuisine', 'Asian cuisine', now(), now()),
('dining-experiences', 'Dining experiences', now(), now()),
('tourist-visa', 'Tourist visa', now(), now()),
('asia', 'Asia', now(), now()),
('city-attractions', 'City attractions', now(), now()),
('hidden-gems', 'Hidden gems', now(), now()),
('landmarks', 'Landmarks', now(), now()),
('sightseeing', 'Sightseeing', now(), now()),
('city-tours', 'City tours', now(), now()),
('tourist-destinations', 'Tourist destinations', now(), now()),
('urban-exploration', 'Urban exploration', now(), now()),
('europe', 'Europe', now(), now()),
('multi-destination', 'Multi destination', now(), now()),
('visas', 'Visas', now(), now()),
('multi-country-travel', 'Multi country travel', now(), now()),
('travel-itineraries', 'Travel itineraries', now(), now()),
('cultural-adventures', 'Cultural adventures', now(), now()),
('desert-experiences', 'Desert experiences', now(), now()),
('traditional-activities', 'Traditional activities', now(), now()),
('desert-culture', 'Desert culture', now(), now()),
('cultural-tourism', 'Cultural tourism', now(), now()),
('historical-sites', 'Historical sites', now(), now()),
('archaeological-wonders', 'Archaeological wonders', now(), now()),
('ancient-ruins', 'Ancient ruins', now(), now()),
('historical-treasures', 'Historical treasures', now(), now()),
('cultural-sites', 'Cultural sites', now(), now()),
('archaeological-sites', 'Archaeological sites', now(), now()),
('modern-cities', 'Modern cities', now(), now()),
('urban-development', 'Urban development', now(), now()),
('contemporary-culture', 'Contemporary culture', now(), now()),
('urban-experiences', 'Urban experiences', now(), now()),
('city-life', 'City life', now(), now()),
('urban-culture', 'Urban culture', now(), now()),
('metropolitan-development', 'Metropolitan development', now(), now()),
('tourism-development', 'Tourism development', now(), now()),
('future-travel', 'Future travel', now(), now()),
('development-plans', 'Development plans', now(), now()),
('tourism-transformation', 'Tourism transformation', now(), now()),
('future-attractions', 'Future attractions', now(), now()),
('tourism-initiatives', 'Tourism initiatives', now(), now()),
('development-projects', 'Development projects', now(), now()),
('schengen', 'Schengen', now(), now()),
('multiple-countries', 'Multiple countries', now(), now()),
('international-travel', 'International travel', now(), now()),
('highland-adventures', 'Highland adventures', now(), now()),
('scottish-culture', 'Scottish culture', now(), now()),
('natural-wonders', 'Natural wonders', now(), now()),
('arts', 'Arts', now(), now()),
('heritage-sites', 'Heritage sites', now(), now()),
('museums', 'Museums', now(), now()),
('desert-adventures', 'Desert adventures', now(), now()),
('desert-safaris', 'Desert safaris', now(), now()),
('camping', 'Camping', now(), now()),
('adventure-travel', 'Adventure travel', now(), now()),
('outdoor-adventures', 'Outdoor adventures', now(), now()),
('urban-adventures', 'Urban adventures', now(), now()),
('emirati-cuisine', 'Emirati cuisine', now(), now()),
('middle-eastern-food', 'Middle eastern food', now(), now()),
('fine-dining', 'Fine dining', now(), now()),
('historic-sites', 'Historic sites', now(), now()),
('traditions', 'Traditions', now(), now()),
('british-culture', 'British culture', now(), now()),
('historic-preservation', 'Historic preservation', now(), now()),
('traditional-pubs', 'Traditional pubs', now(), now()),
('british-cuisine', 'British cuisine', now(), now()),
('pub-food', 'Pub food', now(), now()),
('traditional-dining', 'Traditional dining', now(), now()),
('british-traditions', 'British traditions', now(), now()),
('travel-documents', 'Travel documents', now(), now()),
('application-process', 'Application process', now(), now()),
('metropolitan-adventures', 'Metropolitan adventures', now(), now()),
('cultural-attractions', 'Cultural attractions', now(), now()),
('metropolitan-travel', 'Metropolitan travel', now(), now()),
('regional-cuisine', 'Regional cuisine', now(), now()),
('comfort-food', 'Comfort food', now(), now()),
('seafood', 'Seafood', now(), now()),
('barbecue', 'Barbecue', now(), now()),
('wilderness', 'Wilderness', now(), now()),
('wildlife-viewing', 'Wildlife viewing', now(), now()),
('nature-exploration', 'Nature exploration', now(), now()),
('road-trip', 'Road trip', now(), now()),
('scenic-routes', 'Scenic routes', now(), now()),
('highway-adventures', 'Highway adventures', now(), now()),
('cross-country', 'Cross country', now(), now()),
('b2-visa', 'B2 visa', now(), now()),
('visa-turista', 'Visa turista', now(), now()),
('visa-b2', 'Visa b2', now(), now()),
('turismo', 'Turismo', now(), now()),
('viajes', 'Viajes', now(), now()),
('aplicacion-visa', 'Aplicacion visa', now(), now()),
('requisitos-visa', 'Requisitos visa', now(), now()),
('planificacion-viaje', 'Planificacion viaje', now(), now())
ON CONFLICT (slug) DO NOTHING;

-- ==================================================
-- BLOG POSTS (33 comprehensive posts)
-- ==================================================
-- Insert blog posts data with conflict resolution
-- Comprehensive blog posts from backup with all 33 posts
INSERT INTO blog_posts (slug, author, destinations, passports, image, published_at, is_published, created_at, updated_at) VALUES
('canada-business-visa-guide', 'Jean-Luc Bouchard', 'CAN', 'business,professional', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-10-15 00:00:00', true, now(), now()),
('canada-national-parks-adventure-guide', 'Robert Mackenzie', 'CAN', 'tourist,visitor', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-10-20 00:00:00', true, now(), now()),
('canada-visitor-visa-guide', 'Sarah Williams', 'CAN', 'tourist,visitor', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-10-10 00:00:00', true, now(), now()),
('canada-winter-activities-guide', 'Marie Tremblay', 'CAN', 'tourist,visitor,working-holiday', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-10-30 00:00:00', true, now(), now()),
('europe-culinary-food-guide', 'Giuseppe Moretti', 'DEU,FRA,ITA,ESP,GBR', 'tourist,business', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-20 00:00:00', true, now(), now()),
('europe-cultural-museums-guide', 'Isabella Romano', 'DEU,FRA,ITA,ESP,GBR', 'tourist,business', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-23 00:00:00', true, now(), now()),
('europe-festivals-seasonal-events', 'Sophie Dubois', 'DEU,FRA,ITA,ESP,GBR', 'tourist,business', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-26 00:00:00', true, now(), now()),
('europe-transportation-travel-tips', 'Marco Rossi', 'DEU,FRA,ITA,ESP,GBR', 'tourist,business', 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', '2024-11-29 00:00:00', true, now(), now()),
('japan-business-visa-guide', 'Hiroshi Sato', 'JPN', 'business,professional', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-10-25 00:00:00', true, now(), now()),
('japan-cultural-experiences-travel-guide', 'Kenji Yamamoto', 'JPN', 'tourist,cultural', 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-08 00:00:00', true, now(), now()),
('japan-food-guide-culinary-journey', 'Yuki Tanaka', 'JPN', 'tourist,culinary', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-10 00:00:00', true, now(), now()),
('japan-tourist-visa-guide', 'Aiko Nakamura', 'JPN', 'tourist,visitor', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80', '2024-10-05 00:00:00', true, now(), now()),
('london-attractions-hidden-gems', 'Victoria Parker', 'GBR', 'tourist,visitor', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-30 00:00:00', true, now(), now()),
('multi-country-europe-guide', 'Pierre Dubois', 'DEU,FRA,ITA,ESP,GBR', 'tourist,schengen', 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-12 00:00:00', true, now(), now()),
('saudi-arabia-cultural-desert-adventures', 'Khalid Al-Nasser', 'KSA', 'tourist,business', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-08 00:00:00', true, now(), now()),
('saudi-arabia-historical-sites-guide', 'Hassan Al-Rashid', 'KSA', 'tourist,business', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-12 00:00:00', true, now(), now()),
('saudi-arabia-modern-cities-guide', 'Nora Al-Zahra', 'KSA', 'tourist,business', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-12 00:00:00', true, now(), now()),
('saudi-arabia-vision-2030-tourism-guide', 'Abdullah Al-Saud', 'KSA', 'tourist,business', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-15 00:00:00', true, now(), now()),
('schengen-visa-requirements', 'Klaus Mueller', 'DEU,FRA,ITA,ESP', 'tourist,business,transit', 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', '2024-11-15 00:00:00', true, now(), now()),
('scotland-highlands-adventure-guide', 'Fiona MacLeod', 'GBR', 'tourist,visitor', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-25 00:00:00', true, now(), now()),
('uae-abu-dhabi-culture-guide', 'Layla Al-Mansouri', 'UAE', 'tourist,business', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-18 00:00:00', true, now(), now()),
('uae-desert-adventures-guide', 'Omar Al-Rashid', 'UAE', 'tourist,business', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-20 00:00:00', true, now(), now()),
('uae-dubai-attractions-guide', 'Ahmed Hassan', 'UAE', 'tourist,business', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-15 00:00:00', true, now(), now()),
('uae-food-dining-culture-guide', 'Fatima Al-Zahra', 'UAE', 'tourist,business', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-28 00:00:00', true, now(), now()),
('uk-cultural-heritage-guide', 'Charlotte Davies', 'GBR', 'tourist,visitor', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-25 00:00:00', true, now(), now()),
('uk-food-pub-culture-guide', 'James Wilson', 'GBR', 'tourist,visitor', 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-12-02 00:00:00', true, now(), now()),
('uk-visa-application-tips', 'Oliver Brown', 'GBR', 'tourist,visitor', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-10 00:00:00', true, now(), now()),
('usa-cities-urban-experiences-guide', 'David Thompson', 'USA', 'tourist,esta,visitor', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-12-08 00:00:00', true, now(), now()),
('usa-food-culture-regional-guide', 'Emily Rodriguez', 'USA', 'tourist,esta,visitor', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-12-05 00:00:00', true, now(), now()),
('usa-national-parks-adventure-guide', 'Michael Chen', 'USA', 'tourist,esta,visitor', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-12-10 00:00:00', true, now(), now()),
('usa-road-trip-planning-guide', 'Sarah Johnson', 'USA', 'tourist,esta,visitor', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-12-15 00:00:00', true, now(), now()),
('usa-tourist-visa-b2-guide', 'Carlos Rodriguez', 'USA', 'tourist,visitor', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-15 00:00:00', true, now(), now()),
('visa-usa-turista', 'Carlos Rodriguez', 'USA', 'tourist,visitor', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '2024-11-15 00:00:00', true, now(), now())
ON CONFLICT (slug) DO NOTHING;

-- ==================================================
-- BLOG POSTS I18N (Basic multilingual support)
-- ==================================================
-- Insert blog posts i18n data with conflict resolution
-- Supporting multiple languages for key blog posts
INSERT INTO blog_posts_i18n (post_id, locale, title, description, content, meta_keywords, created_at, updated_at) VALUES
-- Canada Business Visa Guide
((SELECT id FROM blog_posts WHERE slug = 'canada-business-visa-guide'), 'en', 'Canada Business Visa Guide: Complete Application Process', 'Everything you need to know about applying for a Canadian business visa, including requirements, documents, and processing times.', 'A comprehensive guide to obtaining a business visa for Canada, covering eligibility criteria, required documentation, and step-by-step application process. Learn about different visa types, processing times, and tips for successful applications.', 'canada business visa, work permit, immigration, professional visa', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'canada-business-visa-guide'), 'ar', 'دليل فيزا الأعمال الكندية: عملية التقديم الكاملة', 'كل ما تحتاج لمعرفته حول التقديم للحصول على فيزا الأعمال الكندية، بما في ذلك المتطلبات والوثائق وأوقات المعالجة.', 'دليل شامل للحصول على فيزا الأعمال في كندا، يغطي معايير الأهلية والوثائق المطلوبة وعملية التقديم خطوة بخطوة.', 'فيزا أعمال كندا, تصريح عمل, هجرة, فيزا مهنية', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'canada-business-visa-guide'), 'es', 'Guía de Visa de Negocios de Canadá: Proceso Completo de Solicitud', 'Todo lo que necesitas saber sobre la solicitud de una visa de negocios canadiense, incluyendo requisitos, documentos y tiempos de procesamiento.', 'Una guía completa para obtener una visa de negocios para Canadá, cubriendo criterios de elegibilidad, documentación requerida y proceso de solicitud paso a paso.', 'visa de negocios canadá, permiso de trabajo, inmigración, visa profesional', now(), now()),

-- Canada Visitor Visa Guide
((SELECT id FROM blog_posts WHERE slug = 'canada-visitor-visa-guide'), 'en', 'Canada Visitor Visa Guide: Tourist Application Made Easy', 'Step-by-step guide to applying for a Canadian tourist visa, including requirements, fees, and processing times for visitors.', 'Complete guide for tourists planning to visit Canada, including visa requirements, application process, and travel tips for a successful trip.', 'canada tourist visa, visitor visa, travel to canada, tourism', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'canada-visitor-visa-guide'), 'ar', 'دليل فيزا الزائر الكندية: تطبيق السياحة مبسط', 'دليل خطوة بخطوة للتقديم للحصول على فيزا سياحية كندية، بما في ذلك المتطلبات والرسوم وأوقات المعالجة للزوار.', 'دليل كامل للسياح الذين يخططون لزيارة كندا، بما في ذلك متطلبات الفيزا وعملية التقديم ونصائح السفر.', 'فيزا سياحية كندا, فيزا زائر, السفر إلى كندا, سياحة', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'canada-visitor-visa-guide'), 'es', 'Guía de Visa de Visitante de Canadá: Solicitud Turística Simplificada', 'Guía paso a paso para solicitar una visa turística canadiense, incluyendo requisitos, tarifas y tiempos de procesamiento para visitantes.', 'Guía completa para turistas que planean visitar Canadá, incluyendo requisitos de visa, proceso de solicitud y consejos de viaje.', 'visa turística canadá, visa de visitante, viajar a canadá, turismo', now(), now()),

-- UAE Dubai Attractions Guide
((SELECT id FROM blog_posts WHERE slug = 'uae-dubai-attractions-guide'), 'en', 'UAE Dubai Attractions Guide: Must-Visit Places', 'Discover the top attractions and experiences in Dubai, UAE, from modern skyscrapers to traditional souks and desert adventures.', 'Explore Dubai''s iconic landmarks, luxury shopping, cultural sites, and unique experiences in this comprehensive travel guide to the UAE''s most famous city.', 'dubai attractions, uae tourism, travel guide, middle east travel', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'uae-dubai-attractions-guide'), 'ar', 'دليل معالم دبي الإمارات: الأماكن التي يجب زيارتها', 'اكتشف أهم المعالم والتجارب في دبي، الإمارات العربية المتحدة، من ناطحات السحاب الحديثة إلى الأسواق التقليدية ومغامرات الصحراء.', 'استكشف معالم دبي الأيقونية والتسوق الفاخر والمواقع الثقافية والتجارب الفريدة في هذا الدليل الشامل للسفر إلى أشهر مدن الإمارات.', 'معالم دبي, سياحة الإمارات, دليل السفر, سفر الشرق الأوسط', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'uae-dubai-attractions-guide'), 'es', 'Guía de Atracciones de Dubai EAU: Lugares Imprescindibles', 'Descubre las principales atracciones y experiencias en Dubai, EAU, desde rascacielos modernos hasta zocos tradicionales y aventuras en el desierto.', 'Explora los monumentos icónicos de Dubai, compras de lujo, sitios culturales y experiencias únicas en esta guía completa de viaje a la ciudad más famosa de los EAU.', 'atracciones dubai, turismo eau, guía de viaje, viaje medio oriente', now(), now()),

-- Japan Business Visa Guide
((SELECT id FROM blog_posts WHERE slug = 'japan-business-visa-guide'), 'en', 'Japan Business Visa Guide: Professional Travel Requirements', 'Complete guide to obtaining a business visa for Japan, including application requirements, documentation, and processing procedures.', 'Everything professionals need to know about applying for a Japanese business visa, from eligibility requirements to approval and travel planning.', 'japan business visa, work visa, professional travel, business immigration', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'japan-business-visa-guide'), 'ar', 'دليل فيزا الأعمال اليابانية: متطلبات السفر المهني', 'دليل كامل للحصول على فيزا الأعمال لليابان، بما في ذلك متطلبات التقديم والوثائق وإجراءات المعالجة.', 'كل ما يحتاج المهنيون لمعرفته حول التقديم للحصول على فيزا الأعمال اليابانية، من متطلبات الأهلية إلى الموافقة وتخطيط السفر.', 'فيزا أعمال اليابان, فيزا عمل, سفر مهني, هجرة أعمال', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'japan-business-visa-guide'), 'es', 'Guía de Visa de Negocios de Japón: Requisitos de Viaje Profesional', 'Guía completa para obtener una visa de negocios para Japón, incluyendo requisitos de solicitud, documentación y procedimientos de procesamiento.', 'Todo lo que los profesionales necesitan saber sobre la solicitud de una visa de negocios japonesa, desde requisitos de elegibilidad hasta aprobación y planificación de viaje.', 'visa de negocios japón, visa de trabajo, viaje profesional, inmigración de negocios', now(), now()),

-- Japan Tourist Visa Guide
((SELECT id FROM blog_posts WHERE slug = 'japan-tourist-visa-guide'), 'en', 'Japan Tourist Visa Guide: Visiting the Land of the Rising Sun', 'Comprehensive guide to applying for a Japanese tourist visa, including requirements, fees, and travel planning tips.', 'Plan your trip to Japan with this complete visa guide covering application process, requirements, and travel recommendations for an unforgettable experience.', 'japan tourist visa, visit japan, travel guide, japanese tourism', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'japan-tourist-visa-guide'), 'ar', 'دليل فيزا السياحة اليابانية: زيارة بلد الشمس المشرقة', 'دليل شامل للتقديم للحصول على فيزا سياحية يابانية، بما في ذلك المتطلبات والرسوم ونصائح تخطيط السفر.', 'خطط لرحلتك إلى اليابان مع هذا الدليل الكامل للفيزا الذي يغطي عملية التقديم والمتطلبات وتوصيات السفر لتجربة لا تُنسى.', 'فيزا سياحية اليابان, زيارة اليابان, دليل السفر, سياحة يابانية', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'japan-tourist-visa-guide'), 'es', 'Guía de Visa Turística de Japón: Visitando la Tierra del Sol Naciente', 'Guía completa para solicitar una visa turística japonesa, incluyendo requisitos, tarifas y consejos de planificación de viaje.', 'Planifica tu viaje a Japón con esta guía completa de visa que cubre el proceso de solicitud, requisitos y recomendaciones de viaje para una experiencia inolvidable.', 'visa turística japón, visitar japón, guía de viaje, turismo japonés', now(), now()),

-- Schengen Visa Requirements
((SELECT id FROM blog_posts WHERE slug = 'schengen-visa-requirements'), 'en', 'Schengen Visa Requirements: Travel Multiple European Countries', 'Complete guide to Schengen visa application, allowing travel to 26 European countries with a single visa.', 'Everything you need to know about applying for a Schengen visa, including requirements, documentation, and travel benefits across Europe.', 'schengen visa, europe travel, european union, multi-country visa', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'schengen-visa-requirements'), 'ar', 'متطلبات فيزا شنغن: السفر إلى عدة دول أوروبية', 'دليل كامل لتطبيق فيزا شنغن، يسمح بالسفر إلى 26 دولة أوروبية بفيزا واحدة.', 'كل ما تحتاج لمعرفته حول التقديم للحصول على فيزا شنغن، بما في ذلك المتطلبات والوثائق وفوائد السفر عبر أوروبا.', 'فيزا شنغن, سفر أوروبا, الاتحاد الأوروبي, فيزا متعددة البلدان', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'schengen-visa-requirements'), 'es', 'Requisitos de Visa Schengen: Viajar a Múltiples Países Europeos', 'Guía completa para la solicitud de visa Schengen, permitiendo viajar a 26 países europeos con una sola visa.', 'Todo lo que necesitas saber sobre la solicitud de una visa Schengen, incluyendo requisitos, documentación y beneficios de viaje por Europa.', 'visa schengen, viaje europa, unión europea, visa multi-país', now(), now()),

-- UK Visa Application Tips
((SELECT id FROM blog_posts WHERE slug = 'uk-visa-application-tips'), 'en', 'UK Visa Application Tips: Successful British Visa Guide', 'Expert tips and guidance for applying for UK visas, including common mistakes to avoid and application best practices.', 'Increase your chances of UK visa approval with these professional tips and comprehensive application guidance for various visa types.', 'uk visa, british visa, visa application tips, united kingdom travel', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'uk-visa-application-tips'), 'ar', 'نصائح تطبيق فيزا المملكة المتحدة: دليل الفيزا البريطانية الناجحة', 'نصائح خبراء وإرشادات للتقديم للحصول على فيز المملكة المتحدة، بما في ذلك الأخطاء الشائعة التي يجب تجنبها وأفضل ممارسات التطبيق.', 'زد من فرص موافقة فيزا المملكة المتحدة مع هذه النصائح المهنية والإرشادات الشاملة للتطبيق لأنواع الفيز المختلفة.', 'فيزا المملكة المتحدة, فيزا بريطانية, نصائح تطبيق فيزا, سفر المملكة المتحدة', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'uk-visa-application-tips'), 'es', 'Consejos de Solicitud de Visa del Reino Unido: Guía Exitosa de Visa Británica', 'Consejos de expertos y orientación para solicitar visas del Reino Unido, incluyendo errores comunes a evitar y mejores prácticas de solicitud.', 'Aumenta tus posibilidades de aprobación de visa del Reino Unido con estos consejos profesionales y orientación integral de solicitud para varios tipos de visa.', 'visa reino unido, visa británica, consejos solicitud visa, viaje reino unido', now(), now()),

-- USA Tourist Visa B-2 Guide
((SELECT id FROM blog_posts WHERE slug = 'usa-tourist-visa-b2-guide'), 'en', 'USA Tourist Visa B-2 Guide: Visit America Successfully', 'Complete guide to applying for a US B-2 tourist visa, including requirements, interview preparation, and approval tips.', 'Everything you need to know about obtaining a US tourist visa, from application to approval and travel planning for your American adventure.', 'usa tourist visa, b2 visa, america travel, us visa application', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'usa-tourist-visa-b2-guide'), 'ar', 'دليل فيزا السياحة الأمريكية B-2: زيارة أمريكا بنجاح', 'دليل كامل للتقديم للحصول على فيزا سياحية أمريكية B-2، بما في ذلك المتطلبات وإعداد المقابلة ونصائح الموافقة.', 'كل ما تحتاج لمعرفته حول الحصول على فيزا سياحية أمريكية، من التطبيق إلى الموافقة وتخطيط السفر لمغامرتك الأمريكية.', 'فيزا سياحية أمريكية, فيزا B2, سفر أمريكا, تطبيق فيزا أمريكية', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'usa-tourist-visa-b2-guide'), 'es', 'Guía de Visa Turística USA B-2: Visita América Exitosamente', 'Guía completa para solicitar una visa turística estadounidense B-2, incluyendo requisitos, preparación de entrevista y consejos de aprobación.', 'Todo lo que necesitas saber sobre obtener una visa turística estadounidense, desde la solicitud hasta la aprobación y planificación de viaje para tu aventura americana.', 'visa turística usa, visa b2, viaje américa, solicitud visa estadounidense', now(), now()),

-- Europe Culinary Food Guide
((SELECT id FROM blog_posts WHERE slug = 'europe-culinary-food-guide'), 'en', 'Europe Culinary Food Guide: Taste the Continent', 'Discover the diverse culinary traditions across Europe, from French cuisine to Italian pasta and German specialties.', 'A food lover''s guide to European cuisine, featuring traditional dishes, food culture, and culinary experiences across the continent.', 'european cuisine, food culture, culinary travel, traditional dishes', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'europe-culinary-food-guide'), 'ar', 'دليل الطعام الأوروبي: تذوق القارة', 'اكتشف التقاليد الطهوية المتنوعة عبر أوروبا، من المطبخ الفرنسي إلى المعكرونة الإيطالية والتخصصات الألمانية.', 'دليل محب الطعام للمطبخ الأوروبي، يضم الأطباق التقليدية وثقافة الطعام والتجارب الطهوية عبر القارة.', 'مطبخ أوروبي, ثقافة الطعام, سفر طهوي, أطباق تقليدية', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'europe-culinary-food-guide'), 'es', 'Guía Culinaria de Europa: Saborea el Continente', 'Descubre las diversas tradiciones culinarias de Europa, desde la cocina francesa hasta la pasta italiana y especialidades alemanas.', 'Una guía para amantes de la comida sobre la cocina europea, presentando platos tradicionales, cultura gastronómica y experiencias culinarias por todo el continente.', 'cocina europea, cultura gastronómica, viaje culinario, platos tradicionales', now(), now()),

-- Saudi Arabia Modern Cities Guide
((SELECT id FROM blog_posts WHERE slug = 'saudi-arabia-modern-cities-guide'), 'en', 'Saudi Arabia Modern Cities Guide: Vision 2030 Development', 'Explore Saudi Arabia''s modern urban development and futuristic cities as part of the ambitious Vision 2030 program.', 'Discover the transformation of Saudi Arabian cities, from NEOM to Riyadh, showcasing modern architecture and urban innovation under Vision 2030.', 'saudi arabia cities, vision 2030, modern development, middle east tourism', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'saudi-arabia-modern-cities-guide'), 'ar', 'دليل المدن الحديثة في السعودية: تطوير رؤية 2030', 'استكشف التطوير الحضري الحديث والمدن المستقبلية في السعودية كجزء من برنامج رؤية 2030 الطموح.', 'اكتشف تحول المدن السعودية، من نيوم إلى الرياض، واستعرض العمارة الحديثة والابتكار الحضري في إطار رؤية 2030.', 'مدن السعودية, رؤية 2030, تطوير حديث, سياحة الشرق الأوسط', now(), now()),
((SELECT id FROM blog_posts WHERE slug = 'saudi-arabia-modern-cities-guide'), 'es', 'Guía de Ciudades Modernas de Arabia Saudí: Desarrollo Visión 2030', 'Explora el desarrollo urbano moderno y las ciudades futuristas de Arabia Saudí como parte del ambicioso programa Visión 2030.', 'Descubre la transformación de las ciudades saudíes, desde NEOM hasta Riad, mostrando arquitectura moderna e innovación urbana bajo Visión 2030.', 'ciudades arabia saudí, visión 2030, desarrollo moderno, turismo medio oriente', now(), now())
ON CONFLICT (post_id, locale) DO NOTHING;

-- ====================================================
-- VISA TYPES DATA
-- ====================================================

-- Insert visa types data with conflict resolution
-- Total visa types: 22 (2 for UAE + 20 for popular destinations)
-- Combines data from both backup files for comprehensive visa types

-- Insert visa types for UAE (from original backup)
INSERT INTO "visa_types" ("destination_id", "type", "duration", "processing_time", "fee", "currency", "requires_interview", "is_multi_entry", "requirements", "documents", "is_active", "created_at", "updated_at") VALUES
(3, 'tourist', 30, 3, 100.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', true, now(), now()),
(3, 'business', 30, 5, 150.0, 'USD', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, now(), now()),

-- Insert visa types for Japan (JPN - ID 107)
(107, 'tourist', 90, 10, 0.0, 'JPY', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement"]', true, now(), now()),
(107, 'business', 90, 15, 0.0, 'JPY', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, now(), now()),

-- Insert visa types for Germany (DEU - ID 151)
(151, 'tourist', 90, 15, 80.0, 'EUR', false, true, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', true, now(), now()),
(151, 'business', 90, 20, 80.0, 'EUR', false, true, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', true, now(), now()),

-- Insert visa types for France (FRA - ID 150)
(150, 'tourist', 90, 15, 80.0, 'EUR', false, true, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', true, now(), now()),
(150, 'business', 90, 20, 80.0, 'EUR', false, true, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', true, now(), now()),

-- Insert visa types for Italy (ITA - ID 156)
(156, 'tourist', 90, 15, 80.0, 'EUR', false, true, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', true, now(), now()),
(156, 'business', 90, 20, 80.0, 'EUR', false, true, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', true, now(), now()),

-- Insert visa types for Spain (ESP - ID 176)
(176, 'tourist', 90, 15, 80.0, 'EUR', false, true, '["Valid passport", "Travel insurance", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "insurance", "flight_booking", "hotel_reservation", "bank_statement"]', true, now(), now()),
(176, 'business', 90, 20, 80.0, 'EUR', false, true, '["Valid passport", "Business invitation", "Travel insurance", "Company documents"]', '["passport_copy", "invitation_letter", "insurance", "company_registration"]', true, now(), now()),

-- Insert visa types for Saudi Arabia (SAU - ID 125)
(125, 'tourist', 30, 5, 150.0, 'SAR', false, true, '["Valid passport", "Passport photos", "Flight itineary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', true, now(), now()),
(125, 'business', 90, 10, 300.0, 'SAR', false, true, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, now(), now()),

-- Insert visa types for Thailand (THA - ID 131)
(131, 'tourist', 60, 7, 40.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation"]', true, now(), now()),
(131, 'business', 90, 15, 80.0, 'USD', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, now(), now()),

-- Insert visa types for Singapore (SGP - ID 126)
(126, 'tourist', 30, 3, 30.0, 'SGD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement"]', true, now(), now()),
(126, 'business', 30, 5, 30.0, 'SGD', false, false, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, now(), now()),

-- Insert visa types for India (IND - ID 102)
(102, 'tourist', 90, 10, 50.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement"]', true, now(), now()),
(102, 'business', 180, 15, 100.0, 'USD', false, true, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking"]', true, now(), now()),

-- Insert visa types for China (CHN - ID 99)
(99, 'tourist', 30, 10, 140.0, 'USD', false, false, '["Valid passport", "Passport photos", "Flight itinerary", "Hotel booking", "Financial proof", "Travel insurance"]', '["passport_copy", "photos", "flight_booking", "hotel_reservation", "bank_statement", "insurance"]', true, now(), now()),
(99, 'business', 90, 15, 140.0, 'USD', false, true, '["Valid passport", "Business invitation", "Company documents", "Flight itinerary", "Travel insurance"]', '["passport_copy", "invitation_letter", "company_registration", "flight_booking", "insurance"]', true, now(), now())
ON CONFLICT (destination_id, type) DO NOTHING;

-- ====================================================
-- VISA TYPES I18N DATA
-- ====================================================

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

-- ====================================================
-- VISA ELIGIBILITY DATA
-- ====================================================

-- Insert visa eligibility data with conflict resolution
-- Comprehensive visa eligibility rules for popular passport/destination combinations

INSERT INTO "visa_eligibility" ("destination_id", "passport_id", "visa_type_id", "eligibility_status", "max_stay_days", "last_updated", "is_active", "created_at", "updated_at") VALUES
-- UAE eligibility rules (from original backup)
(3, 5, 1, 'visa_free', 30, now(), true, now(), now()), -- USA -> UAE Tourist
(3, 5, 2, 'on_arrival', 30, now(), true, now(), now()), -- USA -> UAE Business
(3, 4, 1, 'visa_free', 30, now(), true, now(), now()), -- UK -> UAE Tourist
(3, 4, 2, 'required', NULL, now(), true, now(), now()), -- UK -> UAE Business

-- Japan eligibility rules
(107, 1, 3, 'visa_free', 90, now(), true, now(), now()), -- USA -> Japan Tourist
(107, 1, 4, 'visa_free', 90, now(), true, now(), now()), -- USA -> Japan Business
(107, 3, 3, 'visa_free', 90, now(), true, now(), now()), -- UK -> Japan Tourist
(107, 3, 4, 'visa_free', 90, now(), true, now(), now()), -- UK -> Japan Business

-- Germany eligibility rules (Schengen)
(151, 1, 5, 'required', NULL, now(), true, now(), now()), -- USA -> Germany Tourist
(151, 1, 6, 'required', NULL, now(), true, now(), now()), -- USA -> Germany Business
(151, 3, 5, 'visa_free', 90, now(), true, now(), now()), -- UK -> Germany Tourist (post-Brexit)
(151, 3, 6, 'visa_free', 90, now(), true, now(), now()), -- UK -> Germany Business

-- France eligibility rules (Schengen)
(150, 1, 7, 'required', NULL, now(), true, now(), now()), -- USA -> France Tourist
(150, 1, 8, 'required', NULL, now(), true, now(), now()), -- USA -> France Business
(150, 3, 7, 'visa_free', 90, now(), true, now(), now()), -- UK -> France Tourist
(150, 3, 8, 'visa_free', 90, now(), true, now(), now()), -- UK -> France Business

-- Italy eligibility rules (Schengen)
(156, 1, 9, 'required', NULL, now(), true, now(), now()), -- USA -> Italy Tourist
(156, 1, 10, 'required', NULL, now(), true, now(), now()), -- USA -> Italy Business
(156, 3, 9, 'visa_free', 90, now(), true, now(), now()), -- UK -> Italy Tourist
(156, 3, 10, 'visa_free', 90, now(), true, now(), now()), -- UK -> Italy Business

-- Spain eligibility rules (Schengen)
(176, 1, 11, 'required', NULL, now(), true, now(), now()), -- USA -> Spain Tourist
(176, 1, 12, 'required', NULL, now(), true, now(), now()), -- USA -> Spain Business
(176, 3, 11, 'visa_free', 90, now(), true, now(), now()), -- UK -> Spain Tourist
(176, 3, 12, 'visa_free', 90, now(), true, now(), now()), -- UK -> Spain Business

-- Saudi Arabia eligibility rules
(125, 1, 13, 'on_arrival', 30, now(), true, now(), now()), -- USA -> Saudi Arabia Tourist
(125, 1, 14, 'required', NULL, now(), true, now(), now()), -- USA -> Saudi Arabia Business
(125, 3, 13, 'on_arrival', 30, now(), true, now(), now()), -- UK -> Saudi Arabia Tourist
(125, 3, 14, 'required', NULL, now(), true, now(), now()), -- UK -> Saudi Arabia Business

-- Thailand eligibility rules
(131, 1, 15, 'visa_free', 30, now(), true, now(), now()), -- USA -> Thailand Tourist
(131, 1, 16, 'required', NULL, now(), true, now(), now()), -- USA -> Thailand Business
(131, 3, 15, 'visa_free', 30, now(), true, now(), now()), -- UK -> Thailand Tourist
(131, 3, 16, 'required', NULL, now(), true, now(), now()), -- UK -> Thailand Business

-- Singapore eligibility rules
(126, 1, 17, 'visa_free', 90, now(), true, now(), now()), -- USA -> Singapore Tourist
(126, 1, 18, 'visa_free', 90, now(), true, now(), now()), -- USA -> Singapore Business
(126, 3, 17, 'visa_free', 90, now(), true, now(), now()), -- UK -> Singapore Tourist
(126, 3, 18, 'visa_free', 90, now(), true, now(), now()), -- UK -> Singapore Business

-- India eligibility rules
(102, 1, 19, 'eta', 90, now(), true, now(), now()), -- USA -> India Tourist (e-Visa)
(102, 1, 20, 'eta', 180, now(), true, now(), now()), -- USA -> India Business (e-Visa)
(102, 3, 19, 'eta', 90, now(), true, now(), now()), -- UK -> India Tourist (e-Visa)
(102, 3, 20, 'eta', 180, now(), true, now(), now()), -- UK -> India Business (e-Visa)

-- China eligibility rules
(99, 1, 21, 'required', NULL, now(), true, now(), now()), -- USA -> China Tourist
(99, 1, 22, 'required', NULL, now(), true, now(), now()), -- USA -> China Business
(99, 3, 21, 'required', NULL, now(), true, now(), now()), -- UK -> China Tourist
(99, 3, 22, 'required', NULL, now(), true, now(), now()) -- UK -> China Business
ON CONFLICT (destination_id, passport_id, visa_type_id) DO NOTHING;

-- ====================================================
-- VISA ELIGIBILITY I18N DATA
-- ====================================================

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