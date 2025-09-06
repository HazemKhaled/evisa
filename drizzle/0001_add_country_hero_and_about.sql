ALTER TABLE `countries` ADD `hero_image` text;--> statement-breakpoint
ALTER TABLE `countries_i18n` RENAME COLUMN `description` TO `name_long`;--> statement-breakpoint
ALTER TABLE `countries_i18n` ADD `about` text;