import { cn } from "@/lib/utils";
import type { BlogPostData } from "@/lib/services/blog-service";
import { getTranslation } from "@/app/i18n";
import {
  blogCardStyles,
  type ImageAspectRatio,
  BlogCardImage,
  BlogCardTitle,
  BlogCardDescription,
  BlogCardMeta,
  BlogCardBadges,
} from "./blog-card-components";

interface BlogPostCardProps {
  post: BlogPostData;
  locale: string;
  className?: string;
  showDestinations?: boolean;
  showTags?: boolean;
  imageAspectRatio?: ImageAspectRatio;
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

  return (
    <article
      className={cn(blogCardStyles.card.base, className)}
      aria-labelledby={`post-title-${post.slug}`}
      aria-describedby={`post-description-${post.slug}`}
    >
      <BlogCardImage
        post={post}
        locale={locale}
        imageAspectRatio={imageAspectRatio}
        ariaLabel={t("aria.readArticle", { title: post.title })}
      />

      <div className={blogCardStyles.card.content}>
        <BlogCardBadges
          post={post}
          locale={locale}
          showDestinations={showDestinations}
          showTags={showTags}
          destinationAriaLabel={destination =>
            t("aria.viewPostsFor", { destination })
          }
          tagAriaLabel={tag => t("aria.viewPostsTagged", { tag })}
        />

        <BlogCardTitle
          post={post}
          locale={locale}
          ariaLabel={t("aria.readFullArticle", {
            title: post.title,
          })}
        />

        <BlogCardDescription post={post} />

        <BlogCardMeta post={post} locale={locale} />
      </div>
    </article>
  );
}
