import { type Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogPost,
  getAllBlogPosts,
  getBlogPostsForLocale,
} from "@/lib/blog";
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
import { BlogPostDetail } from "@/components/ui/blog-post-detail";

interface BlogPostProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const blogPosts = getAllBlogPosts();

  return blogPosts.map(({ locale, slug }) => ({
    locale,
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const blogPost = await getBlogPost(slug, locale);

    return {
      title: blogPost.frontmatter.title,
      description: blogPost.frontmatter.description,
      keywords: blogPost.frontmatter.tags?.join(", "),
      authors: blogPost.frontmatter.author
        ? [{ name: blogPost.frontmatter.author }]
        : undefined,
      openGraph: {
        title: blogPost.frontmatter.title,
        description: blogPost.frontmatter.description,
        images: blogPost.frontmatter.image
          ? [blogPost.frontmatter.image]
          : undefined,
        type: "article",
        publishedTime: blogPost.frontmatter.publishedAt,
        modifiedTime: blogPost.frontmatter.lastUpdated,
        tags: blogPost.frontmatter.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: blogPost.frontmatter.title,
        description: blogPost.frontmatter.description,
        images: blogPost.frontmatter.image
          ? [blogPost.frontmatter.image]
          : undefined,
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

  try {
    const blogPost = await getBlogPost(slug, locale);

    // Get related posts (same destination or tags)
    const allPosts = await getBlogPostsForLocale(locale);
    const relatedPosts = allPosts
      .filter(
        post =>
          post.slug !== slug &&
          (post.frontmatter.destinations?.some(dest =>
            blogPost.frontmatter.destinations?.includes(dest)
          ) ||
            post.frontmatter.tags?.some(tag =>
              blogPost.frontmatter.tags?.includes(tag)
            ))
      )
      .slice(0, 3);

    const baseUrl = env.baseUrl;
    const postUrl = `${baseUrl}/${locale}/blog/${slug}`;

    // Generate JSON-LD for the blog post
    const articleData = generateBlogPostJsonLd(blogPost, locale, baseUrl, t);
    const articleJsonLd = generateArticleJsonLd(articleData);

    const breadcrumbData = generateBreadcrumbData([
      { name: tNav("breadcrumb.home"), url: `${baseUrl}/${locale}` },
      { name: tNav("breadcrumb.blog"), url: `${baseUrl}/${locale}/blog` },
      { name: blogPost.frontmatter.title, url: postUrl },
    ]);
    const breadcrumbJsonLd = generateBreadcrumbListJsonLd(breadcrumbData);

    return (
      <>
        <JsonLd data={articleJsonLd} />
        <JsonLd data={breadcrumbJsonLd} />
        <StaticPageLayout>
          <main
            role="main"
            aria-label={`Blog Post - ${blogPost.frontmatter.title}`}
          >
            <BlogPostDetail
              post={blogPost}
              locale={locale}
              relatedPosts={relatedPosts}
            />
          </main>
        </StaticPageLayout>
      </>
    );
  } catch {
    notFound();
  }
}
