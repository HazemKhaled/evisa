CREATE TABLE "blog_post_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_post_tags_post_id_tag_id_unique" UNIQUE("post_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"author" text NOT NULL,
	"destinations" text,
	"passports" text,
	"image" text,
	"published_at" timestamp NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "blog_posts_i18n" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer NOT NULL,
	"locale" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"content" text NOT NULL,
	"meta_keywords" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_posts_i18n_post_id_locale_unique" UNIQUE("post_id","locale")
);
--> statement-breakpoint
CREATE TABLE "blog_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blog_tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"continent" text NOT NULL,
	"region" text,
	"hero_image" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "countries_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "countries_i18n" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer NOT NULL,
	"locale" text NOT NULL,
	"name" text NOT NULL,
	"name_long" text,
	"about" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "countries_i18n_country_id_locale_unique" UNIQUE("country_id","locale")
);
--> statement-breakpoint
CREATE TABLE "visa_eligibility" (
	"id" serial PRIMARY KEY NOT NULL,
	"destination_id" integer NOT NULL,
	"passport_id" integer NOT NULL,
	"visa_type_id" integer NOT NULL,
	"eligibility_status" text NOT NULL,
	"max_stay_days" integer,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "visa_eligibility_destination_id_passport_id_visa_type_id_unique" UNIQUE("destination_id","passport_id","visa_type_id")
);
--> statement-breakpoint
CREATE TABLE "visa_eligibility_i18n" (
	"id" serial PRIMARY KEY NOT NULL,
	"visa_eligibility_id" integer NOT NULL,
	"locale" text NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "visa_eligibility_i18n_visa_eligibility_id_locale_unique" UNIQUE("visa_eligibility_id","locale")
);
--> statement-breakpoint
CREATE TABLE "visa_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"destination_id" integer NOT NULL,
	"type" text NOT NULL,
	"duration" integer NOT NULL,
	"max_stay" integer,
	"processing_time" integer NOT NULL,
	"fee" real NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"requires_interview" boolean DEFAULT false NOT NULL,
	"is_multi_entry" boolean DEFAULT false NOT NULL,
	"requirements" json,
	"documents" json,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "visa_types_i18n" (
	"id" serial PRIMARY KEY NOT NULL,
	"visa_type_id" integer NOT NULL,
	"locale" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "visa_types_i18n_visa_type_id_locale_unique" UNIQUE("visa_type_id","locale")
);
--> statement-breakpoint
ALTER TABLE "blog_post_tags" ADD CONSTRAINT "blog_post_tags_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_post_tags" ADD CONSTRAINT "blog_post_tags_tag_id_blog_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."blog_tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts_i18n" ADD CONSTRAINT "blog_posts_i18n_post_id_blog_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "countries_i18n" ADD CONSTRAINT "countries_i18n_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visa_eligibility" ADD CONSTRAINT "visa_eligibility_destination_id_countries_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visa_eligibility" ADD CONSTRAINT "visa_eligibility_passport_id_countries_id_fk" FOREIGN KEY ("passport_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visa_eligibility" ADD CONSTRAINT "visa_eligibility_visa_type_id_visa_types_id_fk" FOREIGN KEY ("visa_type_id") REFERENCES "public"."visa_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visa_eligibility_i18n" ADD CONSTRAINT "visa_eligibility_i18n_visa_eligibility_id_visa_eligibility_id_fk" FOREIGN KEY ("visa_eligibility_id") REFERENCES "public"."visa_eligibility"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visa_types" ADD CONSTRAINT "visa_types_destination_id_countries_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visa_types_i18n" ADD CONSTRAINT "visa_types_i18n_visa_type_id_visa_types_id_fk" FOREIGN KEY ("visa_type_id") REFERENCES "public"."visa_types"("id") ON DELETE no action ON UPDATE no action;