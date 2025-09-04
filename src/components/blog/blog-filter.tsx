import { Suspense } from "react";
import {
  getGeneratedAllUniqueTags,
  getGeneratedBlogPostsForLocale,
} from "@/lib/generated-blog-data";
import { BlogTags } from "./blog-tags";

interface BlogFilterProps {
  locale: string;
  currentTag?: string;
  className?: string;
}

function BlogFilterContent({ locale, currentTag, className }: BlogFilterProps) {
  const allTags = getGeneratedAllUniqueTags();
  const localePosts = getGeneratedBlogPostsForLocale(locale);

  // Get tags that have posts in the current locale
  const availableTags = allTags.filter(tag =>
    localePosts.some(post =>
      post.frontmatter.tags?.some(
        postTag => postTag.toLowerCase() === tag.toLowerCase()
      )
    )
  );

  if (availableTags.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Filter by Topic
      </h3>
      <BlogTags tags={availableTags} currentTag={currentTag} locale={locale} />
    </div>
  );
}

export function BlogFilter({ locale, currentTag, className }: BlogFilterProps) {
  return (
    <Suspense
      fallback={<div className="h-8 animate-pulse rounded bg-gray-200"></div>}
    >
      <BlogFilterContent
        locale={locale}
        currentTag={currentTag}
        className={className}
      />
    </Suspense>
  );
}
