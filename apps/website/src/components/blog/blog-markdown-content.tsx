import { cn } from "@repo/utils";
import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  getHeadingData,
  getMarkdownLinkAttributes,
} from "./blog-markdown-helpers";

interface BlogMarkdownContentProps {
  content: string;
  className?: string;
}

export function BlogMarkdownContent({
  content,
  className,
}: BlogMarkdownContentProps) {
  const headingCounts = new Map<string, number>();

  return (
    <div className={cn("prose prose-lg blog-prose max-w-none", className)}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => {
            const headingData = getHeadingData(children, headingCounts);
            return (
              <h1 id={headingData.id} {...props}>
                {headingData.hasExplicitAnchor
                  ? headingData.cleanedText
                  : children}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            const headingData = getHeadingData(children, headingCounts);
            return (
              <h2 id={headingData.id} {...props}>
                {headingData.hasExplicitAnchor
                  ? headingData.cleanedText
                  : children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const headingData = getHeadingData(children, headingCounts);
            return (
              <h3 id={headingData.id} {...props}>
                {headingData.hasExplicitAnchor
                  ? headingData.cleanedText
                  : children}
              </h3>
            );
          },
          h4: ({ children, ...props }) => {
            const headingData = getHeadingData(children, headingCounts);
            return (
              <h4 id={headingData.id} {...props}>
                {headingData.hasExplicitAnchor
                  ? headingData.cleanedText
                  : children}
              </h4>
            );
          },
          h5: ({ children, ...props }) => {
            const headingData = getHeadingData(children, headingCounts);
            return (
              <h5 id={headingData.id} {...props}>
                {headingData.hasExplicitAnchor
                  ? headingData.cleanedText
                  : children}
              </h5>
            );
          },
          h6: ({ children, ...props }) => {
            const headingData = getHeadingData(children, headingCounts);
            return (
              <h6 id={headingData.id} {...props}>
                {headingData.hasExplicitAnchor
                  ? headingData.cleanedText
                  : children}
              </h6>
            );
          },
          a: ({ href, children }) => {
            if (!href) {
              return <span>{children}</span>;
            }

            const linkAttributes = getMarkdownLinkAttributes(href);

            if (linkAttributes.isInternal) {
              return (
                <Link href={linkAttributes.href} className="blog-markdown-link">
                  {children}
                </Link>
              );
            }

            return (
              <Link
                href={linkAttributes.href}
                target={linkAttributes.target}
                rel={linkAttributes.rel}
                className="blog-markdown-link"
              >
                {children}
              </Link>
            );
          },
          table: ({ children, ...props }) => (
            <div className="blog-table-wrapper">
              <table {...props}>{children}</table>
            </div>
          ),
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") {
              return null;
            }

            return (
              <span className="blog-image-wrapper">
                <Image
                  src={src}
                  alt={alt ?? ""}
                  width={1200}
                  height={675}
                  className="blog-image"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </span>
            );
          },
          pre: ({ children, ...props }: ComponentPropsWithoutRef<"pre">) => (
            <pre {...props}>{children}</pre>
          ),
          code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => (
            <code {...props}>{children}</code>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
