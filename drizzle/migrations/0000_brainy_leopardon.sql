CREATE TABLE `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`destination_id` integer NOT NULL,
	`title` text NOT NULL,
	`title_ar` text,
	`slug` text NOT NULL,
	`content` text NOT NULL,
	`content_ar` text,
	`excerpt` text,
	`excerpt_ar` text,
	`featured_image` text,
	`author` text,
	`is_published` integer DEFAULT false,
	`published_at` text,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `destinations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`name_ar` text,
	`flag` text,
	`region` text,
	`capital` text,
	`capital_ar` text,
	`description` text,
	`description_ar` text,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `destinations_code_unique` ON `destinations` (`code`);--> statement-breakpoint
CREATE TABLE `passport_countries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`name_ar` text,
	`flag` text,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `passport_countries_code_unique` ON `passport_countries` (`code`);--> statement-breakpoint
CREATE TABLE `visa_eligibility` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`visa_type_id` integer NOT NULL,
	`passport_country_id` integer NOT NULL,
	`is_eligible` integer DEFAULT false,
	`special_requirements` text,
	`special_requirements_ar` text,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`visa_type_id`) REFERENCES `visa_types`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`passport_country_id`) REFERENCES `passport_countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `visa_provider_mappings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`visa_type_id` integer NOT NULL,
	`provider_id` integer NOT NULL,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`visa_type_id`) REFERENCES `visa_types`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`provider_id`) REFERENCES `visa_service_providers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `visa_service_providers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`website` text,
	`apply_url_template` text NOT NULL,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE TABLE `visa_types` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`destination_id` integer NOT NULL,
	`name` text NOT NULL,
	`name_ar` text,
	`slug` text NOT NULL,
	`description` text,
	`description_ar` text,
	`fee` real,
	`currency` text DEFAULT 'USD',
	`processing_time` text,
	`processing_time_ar` text,
	`validity` text,
	`validity_ar` text,
	`entry_type` text,
	`requirements` text,
	`requirements_ar` text,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT (datetime('now')),
	`updated_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`destination_id`) REFERENCES `destinations`(`id`) ON UPDATE no action ON DELETE no action
);
