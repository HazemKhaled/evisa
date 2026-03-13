import {
  createHeadingId,
  getHeadingData,
  getMarkdownLinkAttributes,
  parseExplicitHeadingAnchor,
  toSlug,
} from "../blog-markdown-helpers";

describe("blog-markdown-helpers", () => {
  describe("toSlug", () => {
    it("normalizes heading text into URL-safe slugs", () => {
      expect(toSlug("  Canada Visitor Visa 2026!  ")).toBe(
        "canada-visitor-visa-2026"
      );
    });

    it("supports non-latin letters", () => {
      expect(toSlug("مرحبا بالعالم")).toBe("مرحبا-بالعالم");
    });
  });

  describe("createHeadingId", () => {
    it("returns unique ids for repeated heading text", () => {
      const headingCounts = new Map<string, number>();

      expect(createHeadingId("Section", headingCounts)).toBe("section");
      expect(createHeadingId("Section", headingCounts)).toBe("section-2");
    });

    it("returns undefined for empty slug content", () => {
      const headingCounts = new Map<string, number>();

      expect(createHeadingId("***", headingCounts)).toBeUndefined();
    });

    it("uses explicit heading ids as authored", () => {
      const headingCounts = new Map<string, number>();

      expect(createHeadingId("Title {#destinations}", headingCounts)).toBe(
        "destinations"
      );
      expect(createHeadingId("Another {#destinations}", headingCounts)).toBe(
        "destinations"
      );
    });
  });

  describe("parseExplicitHeadingAnchor", () => {
    it("extracts explicit heading id and strips marker", () => {
      expect(
        parseExplicitHeadingAnchor(
          "The Big Winter Destinations {#destinations}"
        )
      ).toEqual({
        cleanedText: "The Big Winter Destinations",
        explicitId: "destinations",
      });
    });

    it("returns trimmed text without explicit id when marker is missing", () => {
      expect(parseExplicitHeadingAnchor("  Plain heading  ")).toEqual({
        cleanedText: "Plain heading",
      });
    });
  });

  describe("getHeadingData", () => {
    it("keeps explicit heading id and exposes cleaned text", () => {
      const headingCounts = new Map<string, number>();

      expect(
        getHeadingData(
          "The Big Winter Destinations {#destinations}",
          headingCounts
        )
      ).toEqual({
        id: "destinations",
        cleanedText: "The Big Winter Destinations",
        hasExplicitAnchor: true,
      });
    });

    it("falls back to generated heading id when explicit marker is absent", () => {
      const headingCounts = new Map<string, number>();

      expect(getHeadingData("Top Destinations", headingCounts)).toEqual({
        id: "top-destinations",
        cleanedText: "Top Destinations",
        hasExplicitAnchor: false,
      });
    });
  });

  describe("getMarkdownLinkAttributes", () => {
    it("returns internal link metadata for local href", () => {
      expect(getMarkdownLinkAttributes("/en/blog")).toEqual({
        href: "/en/blog",
        isInternal: true,
      });
    });

    it("returns external link metadata with SEO/security rel", () => {
      expect(getMarkdownLinkAttributes("https://example.com/docs")).toEqual({
        href: "https://example.com/docs",
        isInternal: false,
        target: "_blank",
        rel: "nofollow noopener noreferrer",
      });
    });
  });
});
