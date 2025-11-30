"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type BlogPost } from "@repo/database";
import { FormCheckbox, FormInput, FormTextarea } from "@repo/ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  createBlogPost,
  getBlogPostWithI18n,
  updateBlogPost,
} from "@/actions/blog-posts";
import { I18nTabs, type Locale } from "@/components/forms/i18n-tabs";

const LOCALES: Locale[] = ["en", "es", "ar", "pt", "ru", "de", "fr", "it"];

const blogPostI18nSchema = z.object({
  locale: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  metaKeywords: z.string().optional(),
});

const blogPostSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  author: z.string().min(1, "Author is required"),
  destinations: z.string().optional(),
  passports: z.string().optional(),
  image: z.string().optional(),
  publishedAt: z.string().min(1, "Published date is required"),
  isPublished: z.boolean(),
  i18n: z.array(blogPostI18nSchema),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

interface BlogPostDialogProps {
  open: boolean;
  onClose: () => void;
  post?: BlogPost | null;
}

export function BlogPostDialog({
  open,
  onClose,
  post,
}: BlogPostDialogProps): React.JSX.Element | null {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      slug: "",
      author: "",
      destinations: "",
      passports: "",
      image: "",
      publishedAt: new Date().toISOString().split("T")[0],
      isPublished: false,
      i18n: LOCALES.map(code => ({
        locale: code,
        title: "",
        description: "",
        content: "",
        metaKeywords: "",
      })),
    },
  });

  // Note: React Hook Form's watch() is incompatible with React Compiler memoization.
  // This is expected behavior and doesn't affect functionality.
  const i18nData = watch("i18n");

  useEffect(() => {
    if (open && post) {
      setIsLoading(true);
      getBlogPostWithI18n(post.id)
        .then(data => {
          if (data) {
            const publishedDate = data.post.publishedAt
              ? new Date(data.post.publishedAt).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0];

            reset({
              slug: data.post.slug,
              author: data.post.author,
              destinations: data.post.destinations || "",
              passports: data.post.passports || "",
              image: data.post.image || "",
              publishedAt: publishedDate,
              isPublished: data.post.isPublished,
              i18n: LOCALES.map(code => {
                const existingI18n = data.i18n.find(i => i.locale === code);
                return {
                  locale: code,
                  title: existingI18n?.title || "",
                  description: existingI18n?.description || "",
                  content: existingI18n?.content || "",
                  metaKeywords: existingI18n?.metaKeywords || "",
                };
              }),
            });
          }
        })
        .catch(error => {
          console.error("Failed to load blog post:", error);
          alert("Failed to load blog post data");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (open && !post) {
      reset({
        slug: "",
        author: "",
        destinations: "",
        passports: "",
        image: "",
        publishedAt: new Date().toISOString().split("T")[0],
        isPublished: false,
        i18n: LOCALES.map(code => ({
          locale: code,
          title: "",
          description: "",
          content: "",
          metaKeywords: "",
        })),
      });
    }
  }, [open, post, reset]);

  const onSubmit = async (data: BlogPostFormData): Promise<void> => {
    setIsLoading(true);

    const input = {
      slug: data.slug,
      author: data.author,
      destinations: data.destinations || undefined,
      passports: data.passports || undefined,
      image: data.image || undefined,
      publishedAt: new Date(data.publishedAt),
      isPublished: data.isPublished,
      i18n: data.i18n.filter(i => i.title || i.description || i.content),
      tagIds: [],
    };

    let result;
    if (post) {
      result = await updateBlogPost({
        ...input,
        destinations: data.destinations || undefined,
        passports: data.passports || undefined,
        image: data.image || undefined,
        id: post.id,
      });
    } else {
      result = await createBlogPost(input);
    }

    setIsLoading(false);

    if (result.success) {
      alert(
        post
          ? "Blog post updated successfully"
          : "Blog post created successfully"
      );
      onClose();
    } else {
      alert(`Failed to save: ${result.error}`);
    }
  };

  const updateI18nField = (
    locale: Locale,
    field: keyof Omit<z.infer<typeof blogPostI18nSchema>, "locale">,
    value: string
  ): void => {
    const currentI18n = [...i18nData];
    const index = currentI18n.findIndex(i => i.locale === locale);
    if (index !== -1) {
      currentI18n[index] = { ...currentI18n[index], [field]: value };
      setValue("i18n", currentI18n);
    }
  };

  const getCurrentI18n = (locale: Locale) => {
    return (
      i18nData.find(i => i.locale === locale) || {
        locale,
        title: "",
        description: "",
        content: "",
        metaKeywords: "",
      }
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold">
          {post ? "Edit Blog Post" : "Create Blog Post"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">Basic Information</h3>

            <FormInput
              label="Slug"
              {...register("slug")}
              error={errors.slug?.message}
              placeholder="my-blog-post-slug"
            />

            <FormInput
              label="Author"
              {...register("author")}
              error={errors.author?.message}
              placeholder="John Doe"
            />

            <FormInput
              label="Image URL"
              {...register("image")}
              error={errors.image?.message}
              placeholder="https://example.com/image.jpg"
            />

            <FormInput
              label="Destinations (comma-separated codes)"
              {...register("destinations")}
              error={errors.destinations?.message}
              placeholder="USA,CAN,FRA"
            />

            <FormInput
              label="Passports (comma-separated codes)"
              {...register("passports")}
              error={errors.passports?.message}
              placeholder="USA,CAN"
            />

            <FormInput
              label="Published Date"
              type="date"
              {...register("publishedAt")}
              error={errors.publishedAt?.message}
            />

            <FormCheckbox
              label="Published"
              checked={watch("isPublished")}
              onCheckedChange={checked =>
                setValue("isPublished", checked as boolean)
              }
            />
          </div>

          {/* Multilingual Content */}
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">Content (Multilingual)</h3>

            <I18nTabs>
              {locale => {
                const currentI18n = getCurrentI18n(locale);
                const localeIndex = LOCALES.indexOf(locale);
                const localeErrors = errors.i18n?.[localeIndex];

                return (
                  <div className="space-y-4">
                    <FormInput
                      label={`Title (${locale.toUpperCase()})`}
                      value={currentI18n.title}
                      onChange={e =>
                        updateI18nField(locale, "title", e.target.value)
                      }
                      error={localeErrors?.title?.message}
                      placeholder="Enter blog post title"
                    />

                    <FormTextarea
                      label={`Description (${locale.toUpperCase()})`}
                      value={currentI18n.description}
                      onChange={e =>
                        updateI18nField(locale, "description", e.target.value)
                      }
                      error={localeErrors?.description?.message}
                      placeholder="Enter blog post description"
                      rows={3}
                    />

                    <FormTextarea
                      label={`Content (${locale.toUpperCase()})`}
                      value={currentI18n.content}
                      onChange={e =>
                        updateI18nField(locale, "content", e.target.value)
                      }
                      error={localeErrors?.content?.message}
                      placeholder="Enter blog post content (Markdown supported)"
                      rows={10}
                    />

                    <FormInput
                      label={`Meta Keywords (${locale.toUpperCase()})`}
                      value={currentI18n.metaKeywords || ""}
                      onChange={e =>
                        updateI18nField(locale, "metaKeywords", e.target.value)
                      }
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                );
              }}
            </I18nTabs>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : post ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
