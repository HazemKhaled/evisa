CREATE TABLE `countries_i18n` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`country_id` integer NOT NULL,
	`locale` text(5) NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `countries_i18n_country_id_locale_unique` ON `countries_i18n` (`country_id`,`locale`);--> statement-breakpoint
CREATE TABLE `visa_eligibility_i18n` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`visa_eligibility_id` integer NOT NULL,
	`locale` text(5) NOT NULL,
	`notes` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`visa_eligibility_id`) REFERENCES `visa_eligibility`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `visa_eligibility_i18n_visa_eligibility_id_locale_unique` ON `visa_eligibility_i18n` (`visa_eligibility_id`,`locale`);--> statement-breakpoint
CREATE TABLE `visa_types_i18n` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`visa_type_id` integer NOT NULL,
	`locale` text(5) NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`visa_type_id`) REFERENCES `visa_types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `visa_types_i18n_visa_type_id_locale_unique` ON `visa_types_i18n` (`visa_type_id`,`locale`);--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `name_en`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `name_ar`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `name_es`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `name_pt`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `name_ru`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `name_de`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `name_fr`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `name_it`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `description_en`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `description_ar`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `description_es`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `description_pt`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `description_ru`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `description_de`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `description_fr`;--> statement-breakpoint
ALTER TABLE `countries` DROP COLUMN `description_it`;--> statement-breakpoint
ALTER TABLE `visa_eligibility` DROP COLUMN `notes_en`;--> statement-breakpoint
ALTER TABLE `visa_eligibility` DROP COLUMN `notes_ar`;--> statement-breakpoint
ALTER TABLE `visa_eligibility` DROP COLUMN `notes_es`;--> statement-breakpoint
ALTER TABLE `visa_eligibility` DROP COLUMN `notes_pt`;--> statement-breakpoint
ALTER TABLE `visa_eligibility` DROP COLUMN `notes_ru`;--> statement-breakpoint
ALTER TABLE `visa_eligibility` DROP COLUMN `notes_de`;--> statement-breakpoint
ALTER TABLE `visa_eligibility` DROP COLUMN `notes_fr`;--> statement-breakpoint
ALTER TABLE `visa_eligibility` DROP COLUMN `notes_it`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `name_en`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `name_ar`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `name_es`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `name_pt`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `name_ru`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `name_de`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `name_fr`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `name_it`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `description_en`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `description_ar`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `description_es`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `description_pt`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `description_ru`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `description_de`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `description_fr`;--> statement-breakpoint
ALTER TABLE `visa_types` DROP COLUMN `description_it`;