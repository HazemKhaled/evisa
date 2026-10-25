-- Affiliate partners seeding migration
-- This migration seeds the database with iVisa, Veeza.ai, and Airalo affiliate partners

WITH inserted_ivisa AS (
  INSERT INTO "affiliate_partners" (name, domain, base_url, slug, logo_url, commission_rate, is_active, is_available, priority, country_restrictions, created_at, updated_at)
  VALUES ('iVisa', 'www.visa.com', 'https://www.ivisa.com', 'iVisa', 'https://www.ivisa.com/favicon.ico', 5.0, true, true, 10, '*', NOW(), NOW())
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    domain = EXCLUDED.domain,
    base_url = EXCLUDED.base_url,
    logo_url = EXCLUDED.logo_url,
    commission_rate = EXCLUDED.commission_rate,
    is_active = EXCLUDED.is_active,
    is_available = EXCLUDED.is_available,
    priority = EXCLUDED.priority,
    country_restrictions = EXCLUDED.country_restrictions,
    updated_at = EXCLUDED.updated_at
  RETURNING id
),
inserted_veezaportal AS (
  INSERT INTO "affiliate_partners" (name, domain, base_url, slug, logo_url, commission_rate, is_active, is_available, priority, country_restrictions, created_at, updated_at)
  VALUES ('Veeza.ai', 'veezaportal.com', 'https://veezaportal.com', 'veezaportal', 'https://veezaportal.com/favicon.ico', 3.5, true, true, 20, '*', NOW(), NOW())
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    domain = EXCLUDED.domain,
    base_url = EXCLUDED.base_url,
    logo_url = EXCLUDED.logo_url,
    commission_rate = EXCLUDED.commission_rate,
    is_active = EXCLUDED.is_active,
    is_available = EXCLUDED.is_available,
    priority = EXCLUDED.priority,
    country_restrictions = EXCLUDED.country_restrictions,
    updated_at = EXCLUDED.updated_at
  RETURNING id
),
inserted_airalo AS (
  INSERT INTO "affiliate_partners" (name, domain, base_url, slug, logo_url, commission_rate, is_active, is_available, priority, country_restrictions, created_at, updated_at)
  VALUES ('Airalo', 'airalo.com', 'https://airalo.com', 'airalo', 'https://airalo.com/favicon.ico', 2.5, true, true, 30, '*', NOW(), NOW())
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    domain = EXCLUDED.domain,
    base_url = EXCLUDED.base_url,
    logo_url = EXCLUDED.logo_url,
    commission_rate = EXCLUDED.commission_rate,
    is_active = EXCLUDED.is_active,
    is_available = EXCLUDED.is_available,
    priority = EXCLUDED.priority,
    country_restrictions = EXCLUDED.country_restrictions,
    updated_at = EXCLUDED.updated_at
  RETURNING id
)
-- Insert visa type to affiliate partner relationships
-- These define which visa types are associated with which partners
INSERT INTO "visa_type_affiliate_partners" (
  visa_type_id,
  affiliate_partner_id,
  is_available,
  is_primary,
  created_at,
  updated_at
)
-- Link iVisa as primary partner for tourist visas
WITH ivisa_id AS (SELECT id FROM inserted_ivisa)
SELECT
  vt.id AS visa_type_id,
  ip.id AS affiliate_partner_id,
  true AS is_available,
  true AS is_primary,
  NOW() AS created_at,
  NOW() AS updated_at
FROM "visa_types" vt
CROSS JOIN ivisa_id ip
WHERE vt.type = 'tourist' AND vt.is_active = true

UNION ALL

-- Link Veeza.ai as secondary partner for business visas
WITH veezaportal_id AS (SELECT id FROM inserted_veezaportal)
SELECT
  vt.id AS visa_type_id,
  vp.id AS affiliate_partner_id,
  true AS is_available,
  false AS is_primary,
  NOW() AS created_at,
  NOW() AS updated_at
FROM "visa_types" vt
CROSS JOIN veezaportal_id vp
WHERE vt.type = 'business' AND vt.is_active = true

UNION ALL

-- Link Airalo as fallback partner for all visa types
WITH airalo_id AS (SELECT id FROM inserted_airalo)
SELECT
  vt.id AS visa_type_id,
  al.id AS affiliate_partner_id,
  true AS is_available,
  false AS is_primary,
  NOW() AS created_at,
  NOW() AS updated_at
FROM "visa_types" vt
CROSS JOIN airalo_id al
WHERE vt.is_active = true