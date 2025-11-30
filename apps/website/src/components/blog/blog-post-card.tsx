import { BlurFade, Card, CardContent, MagicCard } from "@repo/ui";
import { cn } from "@repo/utils";

import { getTranslation } from "@/app/i18n";
import type { BlogPostData } from "@/lib/services/blog-service";

import {
  BlogCardBadges,
  BlogCardDescription,
  BlogCardImage,
  BlogCardMeta,
  BlogCardTitle,
  type ImageAspectRatio,
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
    <BlurFade delay={0.25} inView>
      <MagicCard className="cursor-pointer transition-all duration-300 hover:scale-[1.01]">
        <Card className={cn("overflow-hidden border-0 shadow-none", className)}>
          <article
            aria-labelledby={`post-title-${post.slug}`}
            aria-describedby={`post-description-${post.slug}`}
          >
            <BlogCardImage
              post={post}
              locale={locale}
              imageAspectRatio={imageAspectRatio}
              ariaLabel={t("aria.readArticle", { title: post.title })}
            />

            <CardContent className="p-4">
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
            </CardContent>
          </article>
        </Card>
      </MagicCard>
    </BlurFade>
  );
}
