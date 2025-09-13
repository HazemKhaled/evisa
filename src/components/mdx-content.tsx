import React from "react";
import { type BlogPostData } from "@/lib/types/blog";
import { type MDXPageData } from "@/lib/mdx";
import { cn } from "@/lib/utils";

interface MDXContentProps {
  data: BlogPostData | MDXPageData;
  className?: string;
}

/**
 * MDXContent component for rendering blog post content
 *
 * This component renders MDX content using the new runtime compilation approach.
 * Global MDX component styles are defined in the root mdx-components.tsx file.
 *
 * For ISR compatibility, this now renders pre-compiled MDX content.
 */
export function MDXContent({ data, className }: MDXContentProps) {
  return (
    <article
      className={cn(
        "prose prose-lg max-w-none",
        "prose-gray prose-headings:font-bold prose-headings:tracking-tight",
        "prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-a:no-underline hover:prose-a:underline",
        "prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:not-italic",
        "prose-ul:list-disc prose-ol:list-decimal",
        "prose-li:marker:text-blue-600",
        "prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
        "prose-pre:bg-gray-900 prose-pre:text-gray-100",
        className
      )}
    >
      {/* 
        For now, render as raw HTML. In a future iteration, we could 
        implement runtime MDX compilation here using the MDX service.
      */}
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </article>
  );
}
