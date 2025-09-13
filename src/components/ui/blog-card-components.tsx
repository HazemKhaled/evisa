import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BlogPostData } from "@/lib/services/blog-service";

/**
 * Shared styling constants for blog card components
 * Organized into logical groups for better maintainability
 */
export const blogCardStyles = {
  card: {
    base: "overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
    content: "p-6",
  },

  image: {
    container: "relative overflow-hidden",
    image: "object-cover transition-transform duration-300 hover:scale-105",
    overlay:
      "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100",
    aspectRatios: {
      video: "aspect-video",
      square: "aspect-square",
      landscape: "aspect-[4/3]",
    } as const,
  },

  badges: {
    container: "mb-3 flex flex-wrap gap-2",
    destination:
      "inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 transition-colors hover:bg-blue-200",
    tag: "inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200",
  },

  content: {
    title: "mb-3 line-clamp-2 text-xl font-semibold text-gray-900",
    titleLink: "transition-colors hover:text-blue-600",
    description: "mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600",
  },

  meta: {
    container: "flex items-center space-x-4 text-sm text-gray-500",
    author: "font-medium",
    time: "flex items-center",
  },
} as const;

export type ImageAspectRatio = keyof typeof blogCardStyles.image.aspectRatios;

// Shared Badge Components
interface DestinationBadgesProps {
  destinations?: string[];
  locale: string;
  showDestinations: boolean;
  ariaLabelFunction?: (destination: string) => string;
}

export function DestinationBadges({
  destinations,
  locale,
  showDestinations,
  ariaLabelFunction,
}: DestinationBadgesProps) {
  if (!showDestinations || !destinations || destinations.length === 0) {
    return null;
  }

  return (
    <>
      {destinations.slice(0, 2).map(destination => (
        <Link
          key={destination}
          href={`/${locale}/d/${destination.toLowerCase()}/blog`}
          className={blogCardStyles.badges.destination}
          aria-label={
            ariaLabelFunction
              ? ariaLabelFunction(destination)
              : `View blog posts for ${destination}`
          }
        >
          📍 {destination}
        </Link>
      ))}
    </>
  );
}

interface TagBadgesProps {
  tags?: string[];
  locale: string;
  showTags: boolean;
  ariaLabelFunction?: (tag: string) => string;
}

export function TagBadges({
  tags,
  locale,
  showTags,
  ariaLabelFunction,
}: TagBadgesProps) {
  if (!showTags || !tags || tags.length === 0) {
    return null;
  }

  return (
    <>
      {tags.slice(0, 3).map(tag => (
        <Link
          key={tag}
          href={`/${locale}/blog/t/${encodeURIComponent(tag)}`}
          className={blogCardStyles.badges.tag}
          aria-label={
            ariaLabelFunction
              ? ariaLabelFunction(tag)
              : `View blog posts tagged with ${tag}`
          }
        >
          #{tag}
        </Link>
      ))}
    </>
  );
}

// Shared Image Component
interface BlogCardImageProps {
  post: BlogPostData;
  locale: string;
  imageAspectRatio: ImageAspectRatio;
  ariaLabel?: string;
}

export function BlogCardImage({
  post,
  locale,
  imageAspectRatio,
  ariaLabel,
}: BlogCardImageProps) {
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      aria-label={ariaLabel || `Read article: ${post.frontmatter.title}`}
      className="block"
    >
      <div
        className={cn(
          blogCardStyles.image.container,
          blogCardStyles.image.aspectRatios[imageAspectRatio]
        )}
      >
        <Image
          src={post.frontmatter.image}
          alt={post.frontmatter.title}
          fill
          className={blogCardStyles.image.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Overlay gradient for better text readability */}
        <div className={blogCardStyles.image.overlay} />
      </div>
    </Link>
  );
}

// Shared Title Component
interface BlogCardTitleProps {
  post: BlogPostData;
  locale: string;
  ariaLabel?: string;
  headingLevel?: "h1" | "h2" | "h3";
}

export function BlogCardTitle({
  post,
  locale,
  ariaLabel,
  headingLevel = "h2",
}: BlogCardTitleProps) {
  const HeadingTag = headingLevel;

  return (
    <HeadingTag
      id={`post-title-${post.slug}`}
      className={blogCardStyles.content.title}
    >
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className={blogCardStyles.content.titleLink}
        aria-label={ariaLabel || `Read full article: ${post.frontmatter.title}`}
      >
        {post.frontmatter.title}
      </Link>
    </HeadingTag>
  );
}

// Shared Description Component
interface BlogCardDescriptionProps {
  post: BlogPostData;
}

export function BlogCardDescription({ post }: BlogCardDescriptionProps) {
  return (
    <p
      id={`post-description-${post.slug}`}
      className={blogCardStyles.content.description}
    >
      {post.frontmatter.description}
    </p>
  );
}

// Shared Meta Component
interface BlogCardMetaProps {
  post: BlogPostData;
  locale: string;
}

export function BlogCardMeta({ post, locale }: BlogCardMetaProps) {
  return (
    <div className={blogCardStyles.meta.container}>
      <span className={blogCardStyles.meta.author}>
        {post.frontmatter.author}
      </span>
      <time
        dateTime={post.frontmatter.publishedAt}
        className={blogCardStyles.meta.time}
      >
        {new Date(post.frontmatter.publishedAt).toLocaleDateString(locale, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </time>
    </div>
  );
}

// Shared Badge Container Component
interface BlogCardBadgesProps {
  post: BlogPostData;
  locale: string;
  showDestinations: boolean;
  showTags: boolean;
  destinationAriaLabel?: (destination: string) => string;
  tagAriaLabel?: (tag: string) => string;
}

export function BlogCardBadges({
  post,
  locale,
  showDestinations,
  showTags,
  destinationAriaLabel,
  tagAriaLabel,
}: BlogCardBadgesProps) {
  return (
    <div className={blogCardStyles.badges.container}>
      <DestinationBadges
        destinations={post.frontmatter.destinations}
        locale={locale}
        showDestinations={showDestinations}
        ariaLabelFunction={destinationAriaLabel}
      />
      <TagBadges
        tags={post.frontmatter.tags}
        locale={locale}
        showTags={showTags}
        ariaLabelFunction={tagAriaLabel}
      />
    </div>
  );
}
