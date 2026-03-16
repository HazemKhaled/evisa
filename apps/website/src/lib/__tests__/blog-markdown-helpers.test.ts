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

    it("trims leading and trailing hyphens after normalization", () => {
      expect(toSlug("Hello -")).toBe("hello");
      expect(toSlug("- Hello")).toBe("hello");
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

    it("deduplicates repeated explicit heading ids", () => {
      const headingCounts = new Map<string, number>();

      expect(createHeadingId("Title {#destinations}", headingCounts)).toBe(
        "destinations"
      );
      expect(createHeadingId("Another {#destinations}", headingCounts)).toBe(
        "destinations-2"
      );
    });

    it("reserves explicit heading ids to prevent later generated collisions", () => {
      const headingCounts = new Map<string, number>();

      expect(createHeadingId("Overview {#overview}", headingCounts)).toBe(
        "overview"
      );
      expect(createHeadingId("Overview", headingCounts)).toBe("overview-2");
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

      expect(
        getHeadingData("Another destination {#destinations}", headingCounts)
      ).toEqual({
        id: "destinations-2",
        cleanedText: "Another destination",
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

    it("treats hash-only anchor as internal", () => {
      expect(getMarkdownLinkAttributes("#introduction")).toEqual({
        href: "#introduction",
        isInternal: true,
      });
    });

    it("treats dot-relative href as internal", () => {
      expect(getMarkdownLinkAttributes("./visa")).toEqual({
        href: "./visa",
        isInternal: true,
      });
    });

    it("treats parent-relative href as internal", () => {
      expect(getMarkdownLinkAttributes("../guide")).toEqual({
        href: "../guide",
        isInternal: true,
      });
    });

    it("treats bare relative href as internal", () => {
      expect(getMarkdownLinkAttributes("guide/visa")).toEqual({
        href: "guide/visa",
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

    it("strips javascript: protocol to safe anchor", () => {
      expect(getMarkdownLinkAttributes("javascript:alert('xss')")).toEqual({
        href: "#",
        isInternal: true,
      });
    });

    it("strips data: protocol to safe anchor", () => {
      expect(getMarkdownLinkAttributes("data:text/html,<h1>xss</h1>")).toEqual({
        href: "#",
        isInternal: true,
      });
    });

    it("strips vbscript: protocol to safe anchor", () => {
      expect(getMarkdownLinkAttributes("vbscript:msgbox('xss')")).toEqual({
        href: "#",
        isInternal: true,
      });
    });

    it("strips unsafe protocol regardless of casing", () => {
      expect(getMarkdownLinkAttributes("JAVASCRIPT:void(0)")).toEqual({
        href: "#",
        isInternal: true,
      });
    });
  });
});
