import Link from "next/link";
import Image from "next/image";
import { MDXContent } from "@/components/mdx-content";
import { cn } from "@/lib/utils";
import type { BlogPostData } from "@/lib/services/blog-service";
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
  return (
    <article
      className={cn("mx-auto max-w-4xl", className)}
      aria-labelledby="article-title"
      aria-describedby="article-description"
    >
      {/* Back navigation */}
      <nav className="mb-6" aria-label={t("aria.articleNavigation")}>
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center text-blue-600 transition-colors hover:text-blue-700"
          aria-label={t("aria.returnToBlogListing")}
        >
          {t("navigation.backToBlog")}
        </Link>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        {/* Featured image */}
        <div className="relative mb-6 aspect-video overflow-hidden rounded-lg">
          <Image
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        {/* Meta badges */}
        <div className="mb-6 flex flex-wrap gap-3">
          {/* Destinations */}
          {post.frontmatter.destinations &&
            post.frontmatter.destinations.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.destinations.map((destination, index) => (
                  <Link
                    key={destination}
                    href={`/${locale}/d/${destination.toLowerCase()}/blog`}
                    className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-200"
                    aria-label={`View blog posts for ${post.destinationNames?.[index] || destination}`}
                  >
                    📍 {post.destinationNames?.[index] || destination}
                  </Link>
                ))}
              </div>
            )}
        </div>

        {/* Title */}
        <h1
          id="article-title"
          className="mb-4 text-4xl leading-tight font-bold text-gray-900 sm:text-5xl"
        >
          {post.frontmatter.title}
        </h1>

        {/* Description */}
        <p
          id="article-description"
          className="mb-6 text-xl leading-relaxed text-gray-600"
        >
          {post.frontmatter.description}
        </p>

        {/* Author and date info */}
        <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6 text-sm text-gray-500">
          <div className="flex items-center">
            <span className="font-medium">{post.frontmatter.author}</span>
          </div>

          <div className="flex items-center">
            <time dateTime={post.frontmatter.publishedAt}>
              📅{" "}
              {new Date(post.frontmatter.publishedAt).toLocaleDateString(
                locale,
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </time>
          </div>

          {/* Last updated */}
          {post.frontmatter.lastUpdated &&
            post.frontmatter.lastUpdated !== post.frontmatter.publishedAt && (
              <div className="flex items-center">
                <span>
                  {t("metadata.updated")}:{" "}
                  {new Date(post.frontmatter.lastUpdated).toLocaleDateString(
                    locale,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
            )}
        </div>
      </header>

      {/* Article content */}
      <div className="prose prose-lg mb-12 max-w-none">
        <MDXContent
          data={{
            content: post.content,
            frontmatter: post.frontmatter,
          }}
        />
      </div>

      {/* Article footer */}
      <footer className="border-t border-gray-200 pt-8">
        {/* Tags */}
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {t("content.tags")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/${locale}/blog/t/${encodeURIComponent(tag)}`}
                  className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  aria-label={`View blog posts tagged with ${tag}`}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              {t("content.relatedArticles")}
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map(post => (
                <RelatedArticleCard
                  key={post.slug}
                  post={post}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        )}

        {/* Navigation back */}
        <div className="text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            aria-label="Return to blog listing"
          >
            {t("navigation.backToBlog")}
          </Link>
        </div>
      </footer>
    </article>
  );
}
