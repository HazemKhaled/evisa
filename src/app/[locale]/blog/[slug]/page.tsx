import { type Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getBlogPost,
  getAllBlogPosts,
  getBlogPostsForLocale,
} from "@/lib/blog";
import { MDXContent } from "@/components/mdx-content";
import { isRTL, cn } from "@/lib/utils";
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
import { RelatedArticleCard } from "@/components/ui/related-article-card";

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
  const isCurrentRTL = isRTL(locale);
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
            <article className="mx-auto max-w-4xl">
              {/* Hero Image */}
              <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
                <Image
                  src={blogPost.frontmatter.image}
                  alt={blogPost.frontmatter.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Article Header */}
              <header className="mb-8">
                {/* Tags and Destinations */}
                <div className={cn("mb-4 flex flex-wrap gap-2")}>
                  {blogPost.frontmatter.destinations?.map(
                    (destination, index) => (
                      <Link
                        key={destination}
                        href={`/${locale}/blog?destination=${encodeURIComponent(destination)}`}
                        className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200"
                        aria-label={`Filter blog posts by destination: ${blogPost.destinationNames?.[index] || destination}`}
                      >
                        📍 {blogPost.destinationNames?.[index] || destination}
                      </Link>
                    )
                  )}
                  {blogPost.frontmatter.tags?.map(tag => (
                    <Link
                      key={tag}
                      href={`/${locale}/blog/t/${encodeURIComponent(tag)}`}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800 hover:bg-blue-200"
                      aria-label={`Filter blog posts by tag: ${tag}`}
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>

                {/* Title */}
                <h1
                  className={cn(
                    "mb-6 text-4xl font-bold text-gray-900 sm:text-5xl"
                  )}
                >
                  {blogPost.frontmatter.title}
                </h1>

                {/* Meta Information */}
                <div
                  className={cn(
                    "flex flex-wrap items-center gap-4 text-gray-600"
                  )}
                >
                  <div className={cn("flex items-center")}>
                    <span
                      className={cn("font-medium", isCurrentRTL && "mr-0 ml-2")}
                      aria-label={`Author: ${blogPost.frontmatter.author}`}
                    >
                      {blogPost.frontmatter.author}
                    </span>
                  </div>
                  <div className={cn("flex items-center gap-4")}>
                    <time
                      dateTime={blogPost.frontmatter.publishedAt}
                      aria-label={`Published on ${new Date(blogPost.frontmatter.publishedAt).toLocaleDateString(locale)}`}
                    >
                      {t("blog.post.published")}{" "}
                      {new Date(
                        blogPost.frontmatter.publishedAt
                      ).toLocaleDateString(locale)}
                    </time>
                    {blogPost.frontmatter.lastUpdated && (
                      <time
                        dateTime={blogPost.frontmatter.lastUpdated}
                        aria-label={`Last updated on ${new Date(blogPost.frontmatter.lastUpdated).toLocaleDateString(locale)}`}
                      >
                        {t("blog.post.updated")}{" "}
                        {new Date(
                          blogPost.frontmatter.lastUpdated
                        ).toLocaleDateString(locale)}
                      </time>
                    )}
                  </div>
                </div>

                {/* Passport and Related Visas */}
                {(blogPost.frontmatter.passport ||
                  blogPost.frontmatter.related_visas) && (
                  <div className={cn("mt-4 flex flex-wrap gap-4")}>
                    {blogPost.frontmatter.passport && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">
                          🛂 {t("blog.post.passport")}:{" "}
                        </span>
                        <span
                          className={cn("ml-1", isCurrentRTL && "mr-1 ml-0")}
                        >
                          {blogPost.frontmatter.passport.toUpperCase()}
                        </span>
                      </div>
                    )}
                    {blogPost.frontmatter.related_visas && (
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">
                          📋 {t("blog.post.related_visas")}:{" "}
                        </span>
                        <span
                          className={cn("ml-1", isCurrentRTL && "mr-1 ml-0")}
                        >
                          {blogPost.frontmatter.related_visas.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </header>

              {/* Article Content */}
              <div className={cn("prose prose-lg mb-12 max-w-none")}>
                <MDXContent
                  data={{
                    content: blogPost.content,
                    frontmatter: blogPost.frontmatter,
                  }}
                />
              </div>

              {/* Tags Section */}
              {blogPost.frontmatter.tags && (
                <section
                  className={cn("mb-8 border-t border-gray-200 pt-8")}
                  aria-label={t("blog.post.tags")}
                >
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    {t("blog.post.tags")}
                  </h3>
                  <div className={cn("flex flex-wrap gap-2")}>
                    {blogPost.frontmatter.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/${locale}/blog/t/${encodeURIComponent(tag)}`}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200"
                        aria-label={`Filter blog posts by tag: ${tag}`}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Navigation */}
              <nav
                className={cn("mb-8 border-t border-gray-200 pt-8")}
                aria-label={t("blog.aria.blog_navigation")}
              >
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800"
                  aria-label={t("blog.aria.return_to_listing")}
                >
                  {t("blog.post.back_to_blog")}
                </Link>
              </nav>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section
                className="mx-auto mt-16 max-w-7xl border-t border-gray-200 pt-16"
                aria-label={`${t("blog.aria.related_articles")} - ${relatedPosts.length} similar posts`}
              >
                <h2 className={cn("mb-8 text-3xl font-bold text-gray-900")}>
                  {t("blog.post.related_articles")}
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map(post => (
                    <RelatedArticleCard
                      key={post.slug}
                      post={post}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>
            )}
          </main>
        </StaticPageLayout>
      </>
    );
  } catch {
    notFound();
  }
}
