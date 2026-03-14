import type { ReactNode } from "react";

interface BlogMarkdownLinkAttributes {
  href: string;
  isInternal: boolean;
  rel?: string;
  target?: "_blank";
}

interface ParsedHeadingAnchor {
  cleanedText: string;
  explicitId?: string;
}

interface BlogMarkdownHeadingData {
  id?: string;
  cleanedText: string;
  hasExplicitAnchor: boolean;
}

const EXPLICIT_HEADING_ANCHOR_REGEX = /\s*\{#([^\s{}]+)\}\s*$/u;

const UNSAFE_HREF_PROTOCOLS = /^(javascript|data|vbscript):/iu;

function isSafeHref(href: string): boolean {
  return !UNSAFE_HREF_PROTOCOLS.test(href.trim());
}

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join(" ");
  }

  if (node && typeof node === "object" && "props" in node) {
    const props = node.props as { children?: ReactNode };
    return getNodeText(props.children ?? "");
  }

  return "";
}

export function parseExplicitHeadingAnchor(value: string): ParsedHeadingAnchor {
  const match = value.match(EXPLICIT_HEADING_ANCHOR_REGEX);

  if (!match || !match[1]) {
    return {
      cleanedText: value.trim(),
    };
  }

  return {
    cleanedText: value.replace(EXPLICIT_HEADING_ANCHOR_REGEX, "").trim(),
    explicitId: match[1],
  };
}

export function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function createHeadingId(
  children: ReactNode,
  headingCounts: Map<string, number>
): string | undefined {
  const text = getNodeText(children);
  const parsedAnchor = parseExplicitHeadingAnchor(text);

  if (parsedAnchor.explicitId) {
    return parsedAnchor.explicitId;
  }

  const baseSlug = toSlug(parsedAnchor.cleanedText);

  if (!baseSlug) {
    return undefined;
  }

  const currentCount = headingCounts.get(baseSlug) ?? 0;
  headingCounts.set(baseSlug, currentCount + 1);

  return currentCount === 0 ? baseSlug : `${baseSlug}-${currentCount + 1}`;
}

export function getHeadingData(
  children: ReactNode,
  headingCounts: Map<string, number>
): BlogMarkdownHeadingData {
  const text = getNodeText(children);
  const parsedAnchor = parseExplicitHeadingAnchor(text);

  return {
    id: createHeadingId(children, headingCounts),
    cleanedText: parsedAnchor.cleanedText || text,
    hasExplicitAnchor: Boolean(parsedAnchor.explicitId),
  };
}

export function getMarkdownLinkAttributes(
  href: string
): BlogMarkdownLinkAttributes {
  if (!isSafeHref(href)) {
    return { href: "#", isInternal: true };
  }

  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return {
      href,
      isInternal,
    };
  }

  return {
    href,
    isInternal,
    target: "_blank",
    rel: "nofollow noopener noreferrer",
  };
}
