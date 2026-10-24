-- OpenNext Cloudflare D1 tag-cache schema (Next mode, SWR support added in @opennextjs/cloudflare v1.19+).
-- Target database: gtv-opennext-cache (NEXT_TAG_CACHE_D1).
-- For existing databases created before v1.19, apply:
--   ALTER TABLE revalidations ADD COLUMN stale INTEGER;
--   ALTER TABLE revalidations ADD COLUMN expire INTEGER default NULL;

CREATE TABLE IF NOT EXISTS revalidations (
  tag TEXT NOT NULL,
  revalidatedAt INTEGER NOT NULL,
  stale INTEGER,
  expire INTEGER default NULL,
  UNIQUE(tag) ON CONFLICT REPLACE
);
