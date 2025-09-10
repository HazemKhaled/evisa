"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPostData } from "@/lib/blog";

interface ClientBlogPostCardProps {
  post: BlogPostData;
  locale: string;
}

/**
 * Client-side version of BlogPostCard for use in interactive components
 * Used specifically in BlogSearch component which requires client-side rendering
 * This maintains the same visual design as the server BlogPostCard
 */
export function ClientBlogPostCard({ post, locale }: ClientBlogPostCardProps) {
  const { slug, frontmatter, destinationNames } = post;
  const href = `/${locale}/blog/${slug}`;

  return (
    <article className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-200 hover:border-gray-300 hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={frontmatter.image}
          alt={frontmatter.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Destinations */}
        {destinationNames && destinationNames.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {destinationNames.map((destination, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
              >
                {destination}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
          <Link href={href} className="stretched-link">
            {frontmatter.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mb-3 line-clamp-3 text-sm text-gray-600">
          {frontmatter.description}
        </p>

        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {frontmatter.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
              >
                {tag}
              </span>
            ))}
            {frontmatter.tags.length > 3 && (
              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                +{frontmatter.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="font-medium">{frontmatter.author}</span>
          <time dateTime={frontmatter.publishedAt}>
            {new Date(frontmatter.publishedAt).toLocaleDateString(locale, {
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
