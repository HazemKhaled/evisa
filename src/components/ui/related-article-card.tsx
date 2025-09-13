import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BlogPostData } from "@/lib/services/blog-service";
import { getTranslation } from "@/app/i18n";

interface RelatedArticleCardProps {
  post: BlogPostData;
  locale: string;
  className?: string;
}

export async function RelatedArticleCard({
  post,
  locale,
  className,
}: RelatedArticleCardProps) {
  const { t } = await getTranslation(locale, "blog");
  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg",
        className
      )}
      aria-labelledby={`post-title-${post.slug}`}
      aria-describedby={`post-description-${post.slug}`}
    >
      <Link
        href={`/${locale}/blog/${post.slug}`}
        aria-label={t("aria.readArticle", { title: post.frontmatter.title })}
      >
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
        <div className={cn("mb-3 flex flex-wrap gap-2")}>
          {post.frontmatter.destinations?.slice(0, 2).map(destination => (
            <span
              key={destination}
              className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
            >
              📍 {destination}
            </span>
          ))}
        </div>

        <h3
          id={`post-title-${post.slug}`}
          className={cn("mb-2 line-clamp-2 text-lg font-bold text-gray-900")}
        >
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="hover:text-blue-600"
            aria-label={t("aria.readFullArticle", {
              title: post.frontmatter.title,
            })}
          >
            {post.frontmatter.title}
          </Link>
        </h3>

        <p
          id={`post-description-${post.slug}`}
          className={cn("line-clamp-2 text-sm text-gray-600")}
        >
          {post.frontmatter.description}
        </p>
      </div>
    </article>
  );
}
