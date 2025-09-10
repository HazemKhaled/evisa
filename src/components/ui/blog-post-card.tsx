import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BlogPostData } from "@/lib/blog";
import { getTranslation } from "@/app/i18n";

interface BlogPostCardProps {
  post: BlogPostData;
  locale: string;
  className?: string;
  showDestinations?: boolean;
  showTags?: boolean;
  imageAspectRatio?: "video" | "square" | "landscape";
}

export async function BlogPostCard({
  post,
  locale,
  className,
  showDestinations = true,
  showTags = true,
  imageAspectRatio = "video",
}: BlogPostCardProps) {
  const { t } = await getTranslation(locale, "blog");
  const imageClasses = {
    video: "aspect-video",
    square: "aspect-square",
    landscape: "aspect-[4/3]",
  };

  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
      aria-labelledby={`post-title-${post.slug}`}
      aria-describedby={`post-description-${post.slug}`}
    >
      <Link
        href={`/${locale}/blog/${post.slug}`}
        aria-label={t("aria.readArticle", { title: post.frontmatter.title })}
        className="block"
      >
        <div
          className={cn(
            "relative overflow-hidden",
            imageClasses[imageAspectRatio]
          )}
        >
          <Image
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
        </div>
      </Link>

      <div className="p-6">
        {/* Destinations and Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {/* Destination badges */}
          {showDestinations &&
            post.frontmatter.destinations
              ?.slice(0, 2)
              .map((destination, index) => (
                <Link
                  key={destination}
                  href={`/${locale}/d/${destination.toLowerCase()}/blog`}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 transition-colors hover:bg-blue-200"
                  aria-label={t("aria.viewPostsFor", {
                    destination: post.destinationNames?.[index] || destination,
                  })}
                >
                  📍 {post.destinationNames?.[index] || destination}
                </Link>
              ))}

          {/* Tag badges */}
          {showTags &&
            post.frontmatter.tags?.slice(0, 3).map(tag => (
              <Link
                key={tag}
                href={`/${locale}/blog/t/${encodeURIComponent(tag)}`}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
                aria-label={t("aria.viewPostsTagged", { tag })}
              >
                #{tag}
              </Link>
            ))}
        </div>

        {/* Title */}
        <h2
          id={`post-title-${post.slug}`}
          className="mb-3 line-clamp-2 text-xl font-semibold text-gray-900"
        >
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="transition-colors hover:text-blue-600"
            aria-label={t("aria.readFullArticle", {
              title: post.frontmatter.title,
            })}
          >
            {post.frontmatter.title}
          </Link>
        </h2>

        {/* Description */}
        <p
          id={`post-description-${post.slug}`}
          className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600"
        >
          {post.frontmatter.description}
        </p>

        {/* Meta information */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="font-medium">{post.frontmatter.author}</span>
          <time
            dateTime={post.frontmatter.publishedAt}
            className="flex items-center"
          >
            {new Date(post.frontmatter.publishedAt).toLocaleDateString(locale, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>
      </div>
    </article>
  );
}
