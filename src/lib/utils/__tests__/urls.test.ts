import {
  buildLocalePath,
  buildBlogUrl,
  buildBlogPostUrl,
  buildTagUrl,
  buildDestinationFilterUrl,
  buildNavUrls,
  parseBlogSearchParams,
} from "../urls";

describe("URL utilities", () => {
  describe("buildLocalePath", () => {
    it("builds locale path without trailing path", () => {
      expect(buildLocalePath("en")).toBe("/en");
      expect(buildLocalePath("ar")).toBe("/ar");
    });

    it("builds locale path with trailing path", () => {
      expect(buildLocalePath("en", "blog")).toBe("/en/blog");
      expect(buildLocalePath("ar", "blog/post")).toBe("/ar/blog/post");
    });

    it("handles paths with leading slash", () => {
      expect(buildLocalePath("en", "/blog")).toBe("/en/blog");
      expect(buildLocalePath("ar", "/blog/post")).toBe("/ar/blog/post");
    });

    it("handles empty path", () => {
      expect(buildLocalePath("en", "")).toBe("/en");
    });
  });

  describe("buildBlogUrl", () => {
    it("builds basic blog URL without search params", () => {
      expect(buildBlogUrl("en")).toBe("/en/blog");
      expect(buildBlogUrl("ar")).toBe("/ar/blog");
    });

    it("builds blog URL with page parameter", () => {
      expect(buildBlogUrl("en", { page: 2 })).toBe("/en/blog?page=2");
      expect(buildBlogUrl("en", { page: "3" })).toBe("/en/blog?page=3");
    });

    it("ignores page 1 in URL", () => {
      expect(buildBlogUrl("en", { page: 1 })).toBe("/en/blog");
      expect(buildBlogUrl("en", { page: "1" })).toBe("/en/blog");
    });

    it("builds blog URL with tag parameter", () => {
      expect(buildBlogUrl("en", { tag: "travel" })).toBe("/en/blog?tag=travel");
    });

    it("builds blog URL with destination parameter", () => {
      expect(buildBlogUrl("en", { destination: "usa" })).toBe(
        "/en/blog?destination=usa"
      );
    });

    it("builds blog URL with multiple parameters", () => {
      const result = buildBlogUrl("en", {
        page: 2,
        tag: "travel",
        destination: "usa",
      });
      expect(result).toBe("/en/blog?page=2&tag=travel&destination=usa");
    });

    it("handles empty search params", () => {
      expect(buildBlogUrl("en", {})).toBe("/en/blog");
    });
  });

  describe("buildBlogPostUrl", () => {
    it("builds blog post URL", () => {
      expect(buildBlogPostUrl("en", "my-post")).toBe("/en/blog/my-post");
      expect(buildBlogPostUrl("ar", "travel-guide")).toBe(
        "/ar/blog/travel-guide"
      );
    });
  });

  describe("buildTagUrl", () => {
    it("builds tag filter URL", () => {
      expect(buildTagUrl("en", "travel")).toBe("/en/blog/t/travel");
      expect(buildTagUrl("ar", "visa")).toBe("/ar/blog/t/visa");
    });

    it("encodes special characters in tags", () => {
      expect(buildTagUrl("en", "travel & tourism")).toBe(
        "/en/blog/t/travel%20%26%20tourism"
      );
    });
  });

  describe("buildDestinationFilterUrl", () => {
    it("builds destination filter URL", () => {
      expect(buildDestinationFilterUrl("en", "usa")).toBe(
        "/en/blog?destination=usa"
      );
      expect(buildDestinationFilterUrl("ar", "france")).toBe(
        "/ar/blog?destination=france"
      );
    });
  });

  describe("buildNavUrls", () => {
    it("builds all navigation URLs for a locale", () => {
      const urls = buildNavUrls("en");

      expect(urls.home).toBe("/en");
      expect(urls.destinations).toBe("/en/destinations");
      expect(urls.blog).toBe("/en/blog");
      expect(urls.contact).toBe("/en/contact");
      expect(urls.visaChecker).toBe("/en/visa-checker");
      expect(urls.about).toBe("/en/p/about-us");
      expect(urls.terms).toBe("/en/p/terms-n-conditions");
      expect(urls.privacy).toBe("/en/p/privacy-policy");
    });

    it("builds navigation URLs for different locales", () => {
      const arUrls = buildNavUrls("ar");
      expect(arUrls.home).toBe("/ar");
      expect(arUrls.blog).toBe("/ar/blog");
    });
  });

  describe("parseBlogSearchParams", () => {
    it("parses empty search params", () => {
      expect(parseBlogSearchParams({})).toEqual({});
    });

    it("parses page parameter", () => {
      expect(parseBlogSearchParams({ page: "2" })).toEqual({ page: "2" });
    });

    it("parses tag parameter", () => {
      expect(parseBlogSearchParams({ tag: "travel" })).toEqual({
        tag: "travel",
      });
    });

    it("parses destination parameter", () => {
      expect(parseBlogSearchParams({ destination: "usa" })).toEqual({
        destination: "usa",
      });
    });

    it("parses multiple parameters", () => {
      expect(
        parseBlogSearchParams({
          page: "2",
          tag: "travel",
          destination: "usa",
        })
      ).toEqual({
        page: "2",
        tag: "travel",
        destination: "usa",
      });
    });

    it("ignores non-string parameters", () => {
      expect(
        parseBlogSearchParams({
          page: ["1", "2"],
          tag: "travel",
        })
      ).toEqual({ tag: "travel" });
    });

    it("ignores undefined parameters", () => {
      expect(
        parseBlogSearchParams({
          page: undefined,
          tag: "travel",
        })
      ).toEqual({ tag: "travel" });
    });
  });
});
