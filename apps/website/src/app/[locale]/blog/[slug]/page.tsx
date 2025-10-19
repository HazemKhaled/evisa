import { type Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogPost,
  getAllBlogPostSlugs,
  getRelatedBlogPostsOptimized,
} from "@/lib/services/blog-service";
import { env } from "@/lib/consts";
import { StaticPageLayout } from "@/components/static-page-layout";
import { getTranslation } from "@/app/i18n";
import { JsonLd } from "@/components/json-ld";
import {
  generateArticleJsonLd,
  generateBreadcrumbListJsonLd,
  generateBlogPostJsonLd,
  generateBreadcrumbData,
} from "@/lib/json-ld";
import { BlogPostDetail } from "@/components/blog/blog-post-detail";
import { generateAlternatesMetadata } from "@/lib/utils";

interface BlogPostProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const revalidate = 2592000; // Revalidate every 30 days

// Generate static params for all blog posts across all locales
export async function generateStaticParams(): Promise<
  { locale: string; slug: string }[]
> {
  try {
    return await getAllBlogPostSlugs();
  } catch (error) {
    console.error("Error generating static params for blog posts:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { t } = await getTranslation(locale, "pages");

  try {
    const blogPost = await getBlogPost(slug, locale);

    if (!blogPost) {
      return {
        title: t("blog.meta.post_not_found"),
        description: t("blog.meta.post_not_found_description"),
      };
    }

    const alternates = generateAlternatesMetadata(
      env.baseUrl,
      `blog/${slug}`,
      locale
    );

    return {
      title: blogPost.title,
      description: blogPost.description,
      keywords: blogPost.tags?.join(", "),
      authors: blogPost.author ? [{ name: blogPost.author }] : undefined,
      alternates,
      openGraph: {
        title: blogPost.title,
        description: blogPost.description,
        images: blogPost.image ? [blogPost.image] : undefined,
        type: "article",
        publishedTime: blogPost.publishedAt,
        modifiedTime: blogPost.lastUpdated,
        tags: blogPost.tags,
        url: alternates.canonical,
      },
      twitter: {
        card: "summary_large_image",
        title: blogPost.title,
        description: blogPost.description,
        images: blogPost.image ? [blogPost.image] : undefined,
      },
    };
  } catch {
    const { t } = await getTranslation(locale, "pages");
    return {
      title: t("blog.meta.post_not_found"),
      description: t("blog.meta.post_not_found_description"),
    };
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { locale, slug } = await params;
  const { t } = await getTranslation(locale, "pages");
  const { t: tNav } = await getTranslation(locale, "navigation");

  // Fetch blog post first
  const blogPost = await getBlogPost(slug, locale).catch(() => null);
  if (!blogPost) {
    notFound();
  }

  // Get related posts using optimized database query
  const relatedPosts = await getRelatedBlogPostsOptimized(
    slug,
    blogPost.destinations || [],
    blogPost.tags || [],
    locale,
    3
  );

  const baseUrl = env.baseUrl;
  const postUrl = `${baseUrl}/${locale}/blog/${slug}`;

  // Generate JSON-LD for the blog post
  const articleData = generateBlogPostJsonLd(blogPost, locale, baseUrl, t);
  const articleJsonLd = generateArticleJsonLd(articleData);

  const breadcrumbData = generateBreadcrumbData([
    { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
    { name: tNav("breadcrumb.blog"), url: `${baseUrl}/${locale}/blog` },
    { name: blogPost.title, url: postUrl },
  ]);
  const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <StaticPageLayout>
        <main role="main" aria-label={`Blog Post - ${blogPost.title}`}>
          <BlogPostDetail
            post={blogPost}
            locale={locale}
            relatedPosts={relatedPosts}
          />
        </main>
      </StaticPageLayout>
    </>
  );
}
