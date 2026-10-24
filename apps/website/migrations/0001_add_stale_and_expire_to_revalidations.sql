-- Add stale and expire columns required by @opennextjs/cloudflare@1.20.1 D1NextModeTagCache.
ALTER TABLE revalidations ADD COLUMN stale INTEGER;
ALTER TABLE revalidations ADD COLUMN expire INTEGER default NULL;
