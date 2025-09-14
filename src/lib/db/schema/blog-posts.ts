import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull(), // Not globally unique, unique per locale
  author: text("author").notNull(),
  destinations: text("destinations"), // Comma-separated country codes like "USA,CAN,FRA"
  passports: text("passports"), // Comma-separated country codes like "USA,CAN"
  image: text("image"), // Single image URL for the post
  publishedAt: integer("published_at", { mode: "timestamp" }).notNull(),
  isPublished: integer("is_published", { mode: "boolean" })
    .default(true)
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const blogPostsI18n = sqliteTable(
  "blog_posts_i18n",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    postId: integer("post_id")
      .references(() => blogPosts.id)
      .notNull(),
    locale: text("locale", { length: 2 }).notNull(), // e.g., "en", "ar", "es"
    title: text("title").notNull(),
    description: text("description").notNull(),
    content: text("content").notNull(), // Full markdown/HTML content
    metaKeywords: text("meta_keywords"), // SEO keywords
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => ({
    // Ensure slug is unique per locale
    uniquePostLocale: unique().on(table.postId, table.locale),
  })
);

export const blogTags = sqliteTable("blog_tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const blogPostTags = sqliteTable(
  "blog_post_tags",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    postId: integer("post_id")
      .references(() => blogPosts.id)
      .notNull(),
    tagId: integer("tag_id")
      .references(() => blogTags.id)
      .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  table => ({
    // Ensure unique post-tag combinations
    uniquePostTag: unique().on(table.postId, table.tagId),
  })
);
