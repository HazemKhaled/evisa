CREATE TABLE `countries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text(3) NOT NULL,
	`continent` text NOT NULL,
	`region` text,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `countries_code_unique` ON `countries` (`code`);--> statement-breakpoint
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
CREATE TABLE `visa_eligibility` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`destination_id` integer NOT NULL,
	`passport_id` integer NOT NULL,
	`visa_type_id` integer NOT NULL,
	`eligibility_status` text NOT NULL,
	`max_stay_days` integer,
	`last_updated` integer DEFAULT (unixepoch()) NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`destination_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`passport_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`visa_type_id`) REFERENCES `visa_types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `visa_eligibility_destination_id_passport_id_visa_type_id_unique` ON `visa_eligibility` (`destination_id`,`passport_id`,`visa_type_id`);--> statement-breakpoint
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
CREATE TABLE `visa_types` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`destination_id` integer NOT NULL,
	`type` text NOT NULL,
	`duration` integer NOT NULL,
	`max_stay` integer,
	`processing_time` integer NOT NULL,
	`fee` real NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`requires_interview` integer DEFAULT false NOT NULL,
	`is_multi_entry` integer DEFAULT false NOT NULL,
	`requirements` text,
	`documents` text,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`destination_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
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
CREATE UNIQUE INDEX `visa_types_i18n_visa_type_id_locale_unique` ON `visa_types_i18n` (`visa_type_id`,`locale`);