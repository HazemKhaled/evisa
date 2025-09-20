import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(), // Globally unique slug for blog posts
  author: text("author").notNull(),
  destinations: text("destinations"), // Comma-separated country codes like "USA,CAN,FRA"
  passports: text("passports"), // Comma-separated country codes like "USA,CAN"
  image: text("image"), // Single image URL for the post
  publishedAt: timestamp("published_at").notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`now()`)
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at"),
});

export const blogPostsI18n = pgTable(
  "blog_posts_i18n",
  {
    id: serial("id").primaryKey(),
    postId: integer("post_id")
      .references(() => blogPosts.id)
      .notNull(),
    locale: text("locale").notNull(), // e.g., "en", "ar", "es"
    title: text("title").notNull(),
    description: text("description").notNull(),
    content: text("content").notNull(), // Full markdown/HTML content
    metaKeywords: text("meta_keywords"), // SEO keywords
    createdAt: timestamp("created_at")
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`now()`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => ({
    // Ensure slug is unique per locale
    uniquePostLocale: unique().on(table.postId, table.locale),
  })
);

export const blogTags = pgTable("blog_tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`now()`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const blogPostTags = pgTable(
  "blog_post_tags",
  {
    id: serial("id").primaryKey(),
    postId: integer("post_id")
      .references(() => blogPosts.id)
      .notNull(),
    tagId: integer("tag_id")
      .references(() => blogTags.id)
      .notNull(),
    createdAt: timestamp("created_at")
      .default(sql`now()`)
      .notNull(),
  },
  table => ({
    // Ensure unique post-tag combinations
    uniquePostTag: unique().on(table.postId, table.tagId),
  })
);
