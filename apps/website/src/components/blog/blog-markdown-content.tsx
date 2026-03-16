import { cn } from "@repo/utils";
import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  getHeadingData,
  getMarkdownLinkAttributes,
} from "@/lib/blog-markdown-helpers";

/**
 * Props for `BlogMarkdownContent`.
 *
 * @property content Markdown source content.
 * @property className Optional class name for the wrapper container.
 */
interface BlogMarkdownContentProps {
  content: string;
  className?: string;
}

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

function createHeadingRenderer(
  level: HeadingTag,
  headingCounts: Map<string, number>
) {
  return function HeadingRenderer({
    children,
    ...props
  }: ComponentPropsWithoutRef<HeadingTag> & { children?: ReactNode }) {
    const headingData = getHeadingData(children, headingCounts);
    const Tag = level;

    return (
      <Tag id={headingData.id} {...props}>
        {headingData.hasExplicitAnchor ? headingData.cleanedText : children}
      </Tag>
    );
  };
}

/**
 * Renders blog markdown content with custom typography and element mapping.
 *
 * @param props Markdown content and optional wrapper class.
 * @returns Rendered markdown React element.
 */
export function BlogMarkdownContent({
  content,
  className,
}: BlogMarkdownContentProps) {
  const headingCounts = new Map<string, number>();
  const headingRenderers = {
    h1: createHeadingRenderer("h1", headingCounts),
    h2: createHeadingRenderer("h2", headingCounts),
    h3: createHeadingRenderer("h3", headingCounts),
    h4: createHeadingRenderer("h4", headingCounts),
    h5: createHeadingRenderer("h5", headingCounts),
    h6: createHeadingRenderer("h6", headingCounts),
  };

  return (
    <div className={cn("prose prose-lg blog-prose max-w-none", className)}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          ...headingRenderers,
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
              <a
                href={linkAttributes.href}
                target={linkAttributes.target}
                rel={linkAttributes.rel}
                className="blog-markdown-link"
              >
                {children}
              </a>
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
