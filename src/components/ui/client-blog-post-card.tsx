"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { BlogPostData } from "@/lib/blog";
import {
  blogCardStyles,
  type ImageAspectRatio,
  BlogCardImage,
  BlogCardTitle,
  BlogCardDescription,
  BlogCardMeta,
  BlogCardBadges,
} from "./blog-card-components";

interface ClientBlogPostCardProps {
  post: BlogPostData;
  locale: string;
  className?: string;
  showDestinations?: boolean;
  showTags?: boolean;
  imageAspectRatio?: ImageAspectRatio;
}

/**
 * Client-side version of BlogPostCard for use in interactive components
 * Used specifically in BlogSearch component which requires client-side rendering
 * This maintains the same visual design as the server BlogPostCard
 */
export function ClientBlogPostCard({
  post,
  locale,
  className,
  showDestinations = true,
  showTags = true,
  imageAspectRatio = "video",
}: ClientBlogPostCardProps) {
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
      />

      <div className={blogCardStyles.card.content}>
        <BlogCardBadges
          post={post}
          locale={locale}
          showDestinations={showDestinations}
          showTags={showTags}
        />

        <BlogCardTitle post={post} locale={locale} />

        <BlogCardDescription post={post} />

        <BlogCardMeta post={post} locale={locale} />
      </div>
    </article>
  );
}
