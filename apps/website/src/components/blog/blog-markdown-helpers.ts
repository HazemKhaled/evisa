import type { ReactNode } from "react";

/**
 * Link metadata for markdown-rendered anchors.
 */
interface BlogMarkdownLinkAttributes {
  href: string;
  isInternal: boolean;
  rel?: string;
  target?: "_blank";
}

/**
 * Parsed heading anchor details extracted from markdown heading text.
 */
interface ParsedHeadingAnchor {
  cleanedText: string;
  explicitId?: string;
}

/**
 * Resolved heading payload used by markdown heading renderers.
 */
interface BlogMarkdownHeadingData {
  id?: string;
  cleanedText: string;
  hasExplicitAnchor: boolean;
}

const EXPLICIT_HEADING_ANCHOR_REGEX = /\s*\{#([^\s{}]+)\}\s*$/u;
const HREF_SCHEME_REGEX = /^[a-zA-Z][a-zA-Z\d+.-]*:/u;

const UNSAFE_HREF_PROTOCOLS = /^(javascript|data|vbscript):/iu;

function isSafeHref(href: string): boolean {
  return !UNSAFE_HREF_PROTOCOLS.test(href.trim());
}

function createUniqueId(
  baseId: string,
  headingCounts: Map<string, number>
): string {
  const currentCount = headingCounts.get(baseId) ?? 0;
  headingCounts.set(baseId, currentCount + 1);

  return currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`;
}

function getHeadingIdFromParsed(
  parsedAnchor: ParsedHeadingAnchor,
  headingCounts: Map<string, number>
): string | undefined {
  const baseId = parsedAnchor.explicitId ?? toSlug(parsedAnchor.cleanedText);

  if (!baseId) {
    return undefined;
  }

  return createUniqueId(baseId, headingCounts);
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

/**
 * Parses optional explicit heading anchors in markdown text (for example: `Heading {#custom-id}`).
 *
 * @param value Raw heading text.
 * @returns Parsed anchor object containing cleaned heading text and optional explicit id.
 */
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

/**
 * Converts heading text to a URL-safe slug while preserving Unicode letters and numbers.
 *
 * @param value Input heading text.
 * @returns Normalized slug without leading or trailing hyphens.
 */
export function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Creates a unique heading id from markdown heading children.
 * Explicit anchors are respected and deduplicated via numeric suffixes.
 *
 * @param children React node heading content.
 * @param headingCounts Mutable heading id counter map for uniqueness.
 * @returns A unique heading id or `undefined` when no slug can be produced.
 */
export function createHeadingId(
  children: ReactNode,
  headingCounts: Map<string, number>
): string | undefined {
  const text = getNodeText(children);
  const parsedAnchor = parseExplicitHeadingAnchor(text);

  return getHeadingIdFromParsed(parsedAnchor, headingCounts);
}

/**
 * Resolves heading metadata used by heading renderers.
 *
 * @param children React node heading content.
 * @param headingCounts Mutable heading id counter map for uniqueness.
 * @returns Heading data including generated id and cleaned text.
 */
export function getHeadingData(
  children: ReactNode,
  headingCounts: Map<string, number>
): BlogMarkdownHeadingData {
  const text = getNodeText(children);
  const parsedAnchor = parseExplicitHeadingAnchor(text);

  return {
    id: getHeadingIdFromParsed(parsedAnchor, headingCounts),
    cleanedText: parsedAnchor.cleanedText || text,
    hasExplicitAnchor: Boolean(parsedAnchor.explicitId),
  };
}

/**
 * Resolves markdown link attributes for safe rendering.
 *
 * Internal links include hash links, root-relative links, dot-relative links,
 * and bare relative paths without a URL scheme. Unsafe protocols are neutralized.
 *
 * @param href Raw markdown href.
 * @returns Link attributes with internal/external classification and security metadata.
 */
export function getMarkdownLinkAttributes(
  href: string
): BlogMarkdownLinkAttributes {
  const normalizedHref = href.trim();

  if (!isSafeHref(normalizedHref)) {
    return { href: "#", isInternal: true };
  }

  const isHash = normalizedHref.startsWith("#");
  const isRootRelative = normalizedHref.startsWith("/");
  const isDotRelative =
    normalizedHref.startsWith("./") || normalizedHref.startsWith("../");
  const isProtocolRelative = normalizedHref.startsWith("//");
  const hasScheme = HREF_SCHEME_REGEX.test(normalizedHref);
  const isPlainRelative =
    !hasScheme && !isProtocolRelative && !isRootRelative && !isHash;
  const isInternal =
    isHash || isRootRelative || isDotRelative || isPlainRelative;

  if (isInternal) {
    return {
      href: normalizedHref,
      isInternal,
    };
  }

  return {
    href: normalizedHref,
    isInternal,
    target: "_blank",
    rel: "nofollow noopener noreferrer",
  };
}
