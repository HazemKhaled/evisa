import Link from "next/link";
import Image from "next/image";
import { MDXContent } from "@/components/mdx-content";
import { cn, isRTL } from "@/lib/utils";
import type { BlogPostData } from "@/lib/blog";
import { getTranslation } from "@/app/i18n";
import { RelatedArticleCard } from "./related-article-card";

interface BlogPostDetailProps {
  post: BlogPostData;
  locale: string;
  className?: string;
  relatedPosts?: BlogPostData[];
}

export async function BlogPostDetail({
  post,
  locale,
  className,
  relatedPosts = [],
}: BlogPostDetailProps) {
  const { t } = await getTranslation(locale, "blog");
  const isCurrentRTL = isRTL(locale);

  return (
    <>
      <article className={cn("mx-auto max-w-4xl", className)}>
        {/* Hero Image - First position for maximum impact */}
        <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
          <Image
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Header */}
        <header className="mb-8">
          {/* Tags and Destinations - Before title for context */}
          <div className={cn("mb-4 flex flex-wrap gap-2")}>
            {post.frontmatter.destinations?.map((destination, index) => (
              <Link
                key={destination}
                href={`/${locale}/d/${destination.toLowerCase()}/blog`}
                className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200"
                aria-label={`View blog posts for destination: ${post.destinationNames?.[index] || destination}`}
              >
                📍 {post.destinationNames?.[index] || destination}
              </Link>
            ))}
            {post.frontmatter.tags?.map(tag => (
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
            className={cn("mb-6 text-4xl font-bold text-gray-900 sm:text-5xl")}
          >
            {post.frontmatter.title}
          </h1>

          {/* Meta Information */}
          <div
            className={cn("flex flex-wrap items-center gap-4 text-gray-600")}
          >
            <div className={cn("flex items-center")}>
              <span
                className={cn("font-medium", isCurrentRTL && "mr-0 ml-2")}
                aria-label={`Author: ${post.frontmatter.author}`}
              >
                {post.frontmatter.author}
              </span>
            </div>
            <div className={cn("flex items-center gap-4")}>
              <time
                dateTime={post.frontmatter.publishedAt}
                aria-label={`Published on ${new Date(post.frontmatter.publishedAt).toLocaleDateString(locale)}`}
              >
                {t("blog.post.published")}{" "}
                {new Date(post.frontmatter.publishedAt).toLocaleDateString(
                  locale
                )}
              </time>
              {post.frontmatter.lastUpdated && (
                <time
                  dateTime={post.frontmatter.lastUpdated}
                  aria-label={`Last updated on ${new Date(post.frontmatter.lastUpdated).toLocaleDateString(locale)}`}
                >
                  {t("blog.post.updated")}{" "}
                  {new Date(post.frontmatter.lastUpdated).toLocaleDateString(
                    locale
                  )}
                </time>
              )}
            </div>
          </div>

          {/* Passport and Related Visas - Business critical features */}
          {(post.frontmatter.passport || post.frontmatter.related_visas) && (
            <div className={cn("mt-4 flex flex-wrap gap-4")}>
              {post.frontmatter.passport && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">
                    🛂 {t("blog.post.passport")}:{" "}
                  </span>
                  <span className={cn("ml-1", isCurrentRTL && "mr-1 ml-0")}>
                    {post.frontmatter.passport.toUpperCase()}
                  </span>
                </div>
              )}
              {post.frontmatter.related_visas && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">
                    📋 {t("blog.post.related_visas")}:{" "}
                  </span>
                  <span className={cn("ml-1", isCurrentRTL && "mr-1 ml-0")}>
                    {post.frontmatter.related_visas.join(", ")}
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
              content: post.content,
              frontmatter: post.frontmatter,
            }}
          />
        </div>

        {/* Tags Section */}
        {post.frontmatter.tags && (
          <section
            className={cn("mb-8 border-t border-gray-200 pt-8")}
            aria-label={t("blog.post.tags")}
          >
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              {t("blog.post.tags")}
            </h3>
            <div className={cn("flex flex-wrap gap-2")}>
              {post.frontmatter.tags.map(tag => (
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

      {/* Related Posts - Separate section with proper spacing */}
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
              <RelatedArticleCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
