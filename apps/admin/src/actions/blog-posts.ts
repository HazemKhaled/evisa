"use server";

import {
  blogPosts,
  blogPostsI18n,
  blogTags,
  blogPostTags,
  getDb,
  eq,
  isNull,
  type NewBlogPost,
  type NewBlogPostI18n,
  type BlogPost,
} from "@repo/database";
import { revalidatePath } from "next/cache";

interface BlogPostI18nData {
  locale: string;
  title: string;
  description: string;
  content: string;
  metaKeywords?: string;
}

interface CreateBlogPostInput {
  slug: string;
  author: string;
  destinations?: string;
  passports?: string;
  image?: string;
  publishedAt: Date;
  isPublished?: boolean;
  i18n: BlogPostI18nData[];
  tagIds?: number[];
}

interface UpdateBlogPostInput extends CreateBlogPostInput {
  id: number;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const db = getDb();
  const result = await db
    .select()
    .from(blogPosts)
    .where(isNull(blogPosts.deletedAt))
    .orderBy(blogPosts.publishedAt);
  return result;
}

export async function getBlogPostWithI18n(id: number): Promise<{
  post: typeof blogPosts.$inferSelect;
  i18n: (typeof blogPostsI18n.$inferSelect)[];
  tagIds: number[];
} | null> {
  const db = getDb();

  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);

  if (!post) {
    return null;
  }

  const i18nData = await db
    .select()
    .from(blogPostsI18n)
    .where(eq(blogPostsI18n.postId, id));

  const tags = await db
    .select()
    .from(blogPostTags)
    .where(eq(blogPostTags.postId, id));

  return {
    post,
    i18n: i18nData,
    tagIds: tags.map(t => t.tagId),
  };
}

export async function createBlogPost(
  input: CreateBlogPostInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = getDb();

    const newPost: NewBlogPost = {
      slug: input.slug,
      author: input.author,
      destinations: input.destinations ?? null,
      passports: input.passports ?? null,
      image: input.image ?? null,
      publishedAt: input.publishedAt,
      isPublished: input.isPublished ?? false,
    };

    const [created] = await db
      .insert(blogPosts)
      .values(newPost)
      .returning({ id: blogPosts.id });

    if (!created) {
      throw new Error("Failed to create blog post");
    }

    if (input.i18n.length > 0) {
      const i18nRecords: NewBlogPostI18n[] = input.i18n.map(item => ({
        postId: created.id,
        locale: item.locale,
        title: item.title,
        description: item.description,
        content: item.content,
        metaKeywords: item.metaKeywords ?? null,
      }));

      await db.insert(blogPostsI18n).values(i18nRecords);
    }

    if (input.tagIds && input.tagIds.length > 0) {
      const tagRecords = input.tagIds.map(tagId => ({
        postId: created.id,
        tagId,
      }));
      await db.insert(blogPostTags).values(tagRecords);
    }

    revalidatePath("/blog-posts");
    return { success: true };
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create blog post",
    };
  }
}

export async function updateBlogPost(
  input: UpdateBlogPostInput
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = getDb();

    await db
      .update(blogPosts)
      .set({
        slug: input.slug,
        author: input.author,
        destinations: input.destinations ?? null,
        passports: input.passports ?? null,
        image: input.image ?? null,
        publishedAt: input.publishedAt,
        isPublished: input.isPublished ?? false,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, input.id));

    await db.delete(blogPostsI18n).where(eq(blogPostsI18n.postId, input.id));

    if (input.i18n.length > 0) {
      const i18nRecords: NewBlogPostI18n[] = input.i18n.map(item => ({
        postId: input.id,
        locale: item.locale,
        title: item.title,
        description: item.description,
        content: item.content,
        metaKeywords: item.metaKeywords ?? null,
      }));

      await db.insert(blogPostsI18n).values(i18nRecords);
    }

    await db.delete(blogPostTags).where(eq(blogPostTags.postId, input.id));

    if (input.tagIds && input.tagIds.length > 0) {
      const tagRecords = input.tagIds.map(tagId => ({
        postId: input.id,
        tagId,
      }));
      await db.insert(blogPostTags).values(tagRecords);
    }

    revalidatePath("/blog-posts");
    return { success: true };
  } catch (error) {
    console.error("Failed to update blog post:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update blog post",
    };
  }
}

export async function deleteBlogPost(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = getDb();

    await db
      .update(blogPosts)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, id));

    revalidatePath("/blog-posts");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete blog post:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete blog post",
    };
  }
}

export async function getAllTags(): Promise<(typeof blogTags.$inferSelect)[]> {
  const db = getDb();
  return await db.select().from(blogTags).orderBy(blogTags.name);
}
