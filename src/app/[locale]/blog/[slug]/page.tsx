import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPost, getAllBlogPosts, getBlogPostsForLocale } from "@/lib/mdx";
import { MDXContent } from "@/components/mdx-content";
import { isRTL, cn } from "@/lib/utils";
import { StaticPageLayout } from "@/components/static-page-layout";

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
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { locale, slug } = await params;
  const isCurrentRTL = isRTL(locale);

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

    return (
      <StaticPageLayout>
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
            <div
              className={cn(
                "mb-4 flex flex-wrap gap-2",
                isCurrentRTL && "flex-row-reverse"
              )}
            >
              {blogPost.frontmatter.destinations?.map((destination, index) => (
                <Link
                  key={destination}
                  href={`/${locale}/blog?destination=${encodeURIComponent(destination)}`}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200"
                >
                  📍 {blogPost.destinationNames?.[index] || destination}
                </Link>
              ))}
              {blogPost.frontmatter.tags?.map(tag => (
                <Link
                  key={tag}
                  href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 hover:bg-gray-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1
              className={cn(
                "mb-6 text-4xl font-bold text-gray-900 sm:text-5xl",
                isCurrentRTL && "text-right"
              )}
            >
              {blogPost.frontmatter.title}
            </h1>

            {/* Meta Information */}
            <div
              className={cn(
                "flex flex-wrap items-center gap-4 text-gray-600",
                isCurrentRTL && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "flex items-center",
                  isCurrentRTL && "flex-row-reverse"
                )}
              >
                <span
                  className={cn("font-medium", isCurrentRTL && "mr-0 ml-2")}
                >
                  {blogPost.frontmatter.author}
                </span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-4",
                  isCurrentRTL && "flex-row-reverse"
                )}
              >
                <time dateTime={blogPost.frontmatter.publishedAt}>
                  Published:{" "}
                  {new Date(
                    blogPost.frontmatter.publishedAt
                  ).toLocaleDateString(locale)}
                </time>
                {blogPost.frontmatter.lastUpdated && (
                  <time dateTime={blogPost.frontmatter.lastUpdated}>
                    Updated:{" "}
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
              <div
                className={cn(
                  "mt-4 flex flex-wrap gap-4",
                  isCurrentRTL && "flex-row-reverse"
                )}
              >
                {blogPost.frontmatter.passport && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">🛂 Passport: </span>
                    <span className={cn("ml-1", isCurrentRTL && "mr-1 ml-0")}>
                      {blogPost.frontmatter.passport.toUpperCase()}
                    </span>
                  </div>
                )}
                {blogPost.frontmatter.related_visas && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">📋 Related Visas: </span>
                    <span className={cn("ml-1", isCurrentRTL && "mr-1 ml-0")}>
                      {blogPost.frontmatter.related_visas.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div
            className={cn(
              "prose prose-lg mb-12 max-w-none",
              isCurrentRTL && "rtl prose-headings:text-right prose-p:text-right"
            )}
          >
            <MDXContent
              data={{
                content: blogPost.content,
                frontmatter: blogPost.frontmatter,
              }}
              isRTL={isCurrentRTL}
            />
          </div>

          {/* Tags Section */}
          {blogPost.frontmatter.tags && (
            <div
              className={cn(
                "mb-8 border-t border-gray-200 pt-8",
                isCurrentRTL && "text-right"
              )}
            >
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Tags</h3>
              <div
                className={cn(
                  "flex flex-wrap gap-2",
                  isCurrentRTL && "flex-row-reverse"
                )}
              >
                {blogPost.frontmatter.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div
            className={cn(
              "mb-8 border-t border-gray-200 pt-8",
              isCurrentRTL && "text-right"
            )}
          >
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800"
            >
              {isCurrentRTL ? <>العودة للمدونة ←</> : <>← Back to Blog</>}
            </Link>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mx-auto mt-16 max-w-7xl border-t border-gray-200 pt-16">
            <h2
              className={cn(
                "mb-8 text-3xl font-bold text-gray-900",
                isCurrentRTL && "text-right"
              )}
            >
              Related Articles
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map(post => (
                <article
                  key={post.slug}
                  className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
                >
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="p-6">
                    <div
                      className={cn(
                        "mb-3 flex flex-wrap gap-2",
                        isCurrentRTL && "flex-row-reverse"
                      )}
                    >
                      {post.frontmatter.destinations
                        ?.slice(0, 2)
                        .map((destination, index) => (
                          <span
                            key={destination}
                            className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                          >
                            📍 {post.destinationNames?.[index] || destination}
                          </span>
                        ))}
                    </div>

                    <h3
                      className={cn(
                        "mb-2 line-clamp-2 text-lg font-bold text-gray-900",
                        isCurrentRTL && "text-right"
                      )}
                    >
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="hover:text-blue-600"
                      >
                        {post.frontmatter.title}
                      </Link>
                    </h3>

                    <p
                      className={cn(
                        "line-clamp-2 text-sm text-gray-600",
                        isCurrentRTL && "text-right"
                      )}
                    >
                      {post.frontmatter.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </StaticPageLayout>
    );
  } catch {
    notFound();
  }
}
