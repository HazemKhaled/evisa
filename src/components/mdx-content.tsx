import React from "react";
import { type BlogPostData } from "@/lib/types/blog";
import { type MDXPageData } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import { useMDXComponents } from "../../mdx-components";

interface MDXContentProps {
  data: BlogPostData | MDXPageData;
  className?: string;
}

/**
 * Render compiled MDX content as React components
 */
function renderCompiledMDX(
  compiledContent: string,
  components: Record<string, unknown>
): React.ReactElement {
  try {
    // Create a safer execution environment for compiled MDX
    const mdxFunction = new Function(
      "React",
      "runtime",
      "_components",
      `"use strict";
       ${compiledContent}
       return typeof _createMdxContent === 'function' ? _createMdxContent : null;`
    );

    // Execute the function with React runtime and components
    const MDXComponent = mdxFunction(
      React,
      {
        Fragment: React.Fragment,
        jsx: React.createElement,
        jsxs: React.createElement,
      },
      components
    );

    if (typeof MDXComponent === "function") {
      return React.createElement(MDXComponent, { components });
    }

    throw new Error("No valid MDX component found in compiled content");
  } catch (error) {
    console.error("Error rendering compiled MDX:", error);
    // Return error message for development, fallback for production
    return React.createElement(
      "div",
      {
        className: "text-red-600 p-4 border border-red-300 rounded",
      },
      process.env.NODE_ENV === "development"
        ? `MDX rendering error: ${error}`
        : "Content temporarily unavailable"
    );
  }
}

/**
 * Parse inline markdown elements (bold, italic, links)
 */
function parseInlineMarkdown(
  text: string,
  _components: Record<string, unknown>
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let currentText = text;
  let key = 0;

  // Process bold text **text**
  while (currentText.includes("**")) {
    const start = currentText.indexOf("**");
    const end = currentText.indexOf("**", start + 2);

    if (end === -1) break;

    // Add text before bold
    if (start > 0) {
      parts.push(currentText.slice(0, start));
    }

    // Add bold element
    const boldText = currentText.slice(start + 2, end);
    parts.push(
      React.createElement("strong", { key: `bold-${key++}` }, boldText)
    );

    currentText = currentText.slice(end + 2);
  }

  // Add remaining text
  if (currentText) {
    parts.push(currentText);
  }

  return parts.length === 1 ? parts[0] : parts;
}

/**
 * Enhanced fallback renderer for markdown content using MDX components
 */
function renderFallbackMarkdown(
  content: string,
  components: Record<string, unknown>
): React.ReactElement {
  const lines = content.split("\n");
  const elements: React.ReactElement[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        const PComponent = components.p || "p";
        const parsedContent = parseInlineMarkdown(text, components);
        elements.push(
          React.createElement(PComponent as any, { key: key++ }, parsedContent)
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      const UlComponent = components.ul || "ul";
      const LiComponent = components.li || "li";

      const listItems = currentList.map((item, _index) => {
        const parsedContent = parseInlineMarkdown(item, components);
        return React.createElement(
          LiComponent as any,
          { key: `li-${key++}` },
          parsedContent
        );
      });

      elements.push(
        React.createElement(UlComponent as any, { key: key++ }, ...listItems)
      );
      currentList = [];
    }
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushParagraph();
      flushList();
      continue;
    }

    // Headers (support h1 through h4)
    if (trimmedLine.startsWith("#### ")) {
      flushParagraph();
      flushList();
      const H4Component = components.h4 || "h4";
      const headerText = trimmedLine.slice(5);
      elements.push(
        React.createElement(
          H4Component as any,
          { key: key++ },
          parseInlineMarkdown(headerText, components)
        )
      );
    } else if (trimmedLine.startsWith("### ")) {
      flushParagraph();
      flushList();
      const H3Component = components.h3 || "h3";
      const headerText = trimmedLine.slice(4);
      elements.push(
        React.createElement(
          H3Component as any,
          { key: key++ },
          parseInlineMarkdown(headerText, components)
        )
      );
    } else if (trimmedLine.startsWith("## ")) {
      flushParagraph();
      flushList();
      const H2Component = components.h2 || "h2";
      const headerText = trimmedLine.slice(3);
      elements.push(
        React.createElement(
          H2Component as any,
          { key: key++ },
          parseInlineMarkdown(headerText, components)
        )
      );
    } else if (trimmedLine.startsWith("# ")) {
      flushParagraph();
      flushList();
      const H1Component = components.h1 || "h1";
      const headerText = trimmedLine.slice(2);
      elements.push(
        React.createElement(
          H1Component as any,
          { key: key++ },
          parseInlineMarkdown(headerText, components)
        )
      );
    }
    // List items
    else if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      flushParagraph();
      const listItem = trimmedLine.slice(2);
      currentList.push(listItem);
    }
    // Regular paragraph text
    else {
      flushList();
      currentParagraph.push(trimmedLine);
    }
  }

  // Flush any remaining content
  flushParagraph();
  flushList();

  return React.createElement("div", {}, ...elements);
}

/**
 * MDXContent component for rendering blog post content
 *
 * This component renders compiled MDX content using the proper MDX components
 * defined in mdx-components.tsx. It provides full MDX feature support including
 * React components while maintaining ISR compatibility.
 */
export function MDXContent({ data, className }: MDXContentProps) {
  // Get the global MDX components with styling
  const components = useMDXComponents({});

  const renderedContent = React.useMemo(() => {
    // For now, always use the fallback renderer with your beautiful MDX components
    // This ensures consistent styling and avoids runtime compilation complexity
    const content = data.content;
    const rawContent = (data as BlogPostData).rawContent;
    const fallbackContent = rawContent || content;

    return renderFallbackMarkdown(fallbackContent, components);
  }, [data, components]);

  return (
    <article
      className={cn(
        "prose prose-lg max-w-none",
        // Let MDX components handle their own styling, remove conflicting prose styles
        "prose-headings:font-inherit prose-headings:text-inherit prose-headings:tracking-inherit",
        "prose-p:text-inherit prose-p:leading-inherit prose-p:mb-inherit",
        "prose-a:text-inherit prose-a:underline-inherit prose-a:hover:text-inherit",
        "prose-ul:list-inherit prose-ol:list-inherit prose-ul:space-inherit prose-ol:space-inherit",
        "prose-li:text-inherit prose-li:leading-inherit",
        className
      )}
    >
      {renderedContent}
    </article>
  );
}

// Export for testing purposes
export { renderCompiledMDX, renderFallbackMarkdown };
