import {
  containerStyles,
  textStyles,
  buttonStyles,
  cardStyles,
  formStyles,
  layoutStyles,
  rtlStyles,
  tagStyles,
  createResponsiveGrid,
  createSpacing,
} from "../styles";

// Mock the utils to avoid circular dependency
jest.mock("../../utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}));

describe("Styles utilities", () => {
  describe("containerStyles", () => {
    it("has all expected container styles", () => {
      expect(containerStyles.page).toContain("max-w-7xl");
      expect(containerStyles.content).toContain("max-w-4xl");
      expect(containerStyles.narrow).toContain("max-w-3xl");
      expect(containerStyles.wide).toContain("max-w-6xl");
    });

    it("includes responsive padding", () => {
      Object.values(containerStyles).forEach(style => {
        expect(style).toContain("px-4");
        expect(style).toContain("sm:px-6");
        expect(style).toContain("lg:px-8");
      });
    });
  });

  describe("textStyles", () => {
    it("has hierarchical heading styles", () => {
      expect(textStyles.heading.h1).toContain("text-4xl");
      expect(textStyles.heading.h2).toContain("text-3xl");
      expect(textStyles.heading.h3).toContain("text-xl");
      expect(textStyles.heading.h4).toContain("text-lg");
    });

    it("has consistent body text styles", () => {
      expect(textStyles.body.large).toContain("text-xl");
      expect(textStyles.body.medium).toContain("text-base");
      expect(textStyles.body.small).toContain("text-sm");
    });

    it("has meta text styles", () => {
      expect(textStyles.meta.large).toContain("text-sm");
      expect(textStyles.meta.small).toContain("text-xs");
    });
  });

  describe("buttonStyles", () => {
    it("includes focus states for accessibility", () => {
      Object.values(buttonStyles).forEach(style => {
        expect(style).toContain("focus:");
      });
    });

    it("includes hover states", () => {
      Object.values(buttonStyles).forEach(style => {
        expect(style).toContain("hover:");
      });
    });

    it("has consistent border radius", () => {
      Object.values(buttonStyles).forEach(style => {
        expect(style).toContain("rounded-md");
      });
    });
  });

  describe("cardStyles", () => {
    it("has base card style", () => {
      expect(cardStyles.base).toContain("bg-white");
      expect(cardStyles.base).toContain("shadow-md");
      expect(cardStyles.base).toContain("rounded-lg");
    });

    it("has hover variant", () => {
      expect(cardStyles.hover).toContain("transition-shadow");
      expect(cardStyles.hover).toContain("hover:shadow-lg");
    });

    it("has bordered variant", () => {
      expect(cardStyles.bordered).toContain("border");
    });
  });

  describe("formStyles", () => {
    it("has consistent form input styles", () => {
      expect(formStyles.input).toContain("border-gray-300");
      expect(formStyles.input).toContain("focus:border-blue-500");
      expect(formStyles.select).toContain("border-gray-300");
      expect(formStyles.select).toContain("focus:border-blue-500");
    });

    it("has label styles", () => {
      expect(formStyles.label).toContain("text-sm");
      expect(formStyles.label).toContain("font-medium");
    });
  });

  describe("layoutStyles", () => {
    it("has section padding", () => {
      expect(layoutStyles.section).toContain("py-16");
      expect(layoutStyles.sectionWithBackground).toContain("py-16");
    });

    it("has grid layouts", () => {
      expect(layoutStyles.grid.responsive).toContain("grid");
      expect(layoutStyles.grid.responsive).toContain("md:grid-cols-2");
      expect(layoutStyles.grid.responsive).toContain("lg:grid-cols-3");
    });
  });

  describe("rtlStyles", () => {
    it("returns correct RTL margin classes", () => {
      expect(rtlStyles.marginRight(true)).toBe("mr-0 ml-2");
      expect(rtlStyles.marginRight(false)).toBe("ml-0 mr-2");
      expect(rtlStyles.marginLeft(true)).toBe("ml-0 mr-2");
      expect(rtlStyles.marginLeft(false)).toBe("mr-0 ml-2");
    });

    it("returns correct RTL padding classes", () => {
      expect(rtlStyles.paddingRight(true)).toBe("pr-0 pl-2");
      expect(rtlStyles.paddingRight(false)).toBe("pl-0 pr-2");
      expect(rtlStyles.paddingLeft(true)).toBe("pl-0 pr-2");
      expect(rtlStyles.paddingLeft(false)).toBe("pr-0 pl-2");
    });

    it("returns correct RTL text alignment", () => {
      expect(rtlStyles.textAlign(true)).toBe("text-right");
      expect(rtlStyles.textAlign(false)).toBe("text-left");
    });
  });

  describe("tagStyles", () => {
    it("has color variants", () => {
      expect(tagStyles.primary).toContain("bg-blue-100");
      expect(tagStyles.primary).toContain("text-blue-800");
      expect(tagStyles.secondary).toContain("bg-gray-100");
      expect(tagStyles.secondary).toContain("text-gray-800");
      expect(tagStyles.success).toContain("bg-green-100");
      expect(tagStyles.success).toContain("text-green-800");
    });

    it("includes hover states", () => {
      expect(tagStyles.primary).toContain("hover:");
      expect(tagStyles.secondary).toContain("hover:");
      expect(tagStyles.success).toContain("hover:");
    });
  });

  describe("createResponsiveGrid", () => {
    it("creates basic grid", () => {
      const result = createResponsiveGrid({});
      expect(result).toBe("grid gap-8");
    });

    it("creates grid with responsive columns", () => {
      const result = createResponsiveGrid({
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
      });

      expect(result).toContain("grid gap-8");
      expect(result).toContain("sm:grid-cols-1");
      expect(result).toContain("md:grid-cols-2");
      expect(result).toContain("lg:grid-cols-3");
      expect(result).toContain("xl:grid-cols-4");
    });

    it("creates grid with partial responsive columns", () => {
      const result = createResponsiveGrid({
        md: 2,
        lg: 3,
      });

      expect(result).toContain("grid gap-8");
      expect(result).toContain("md:grid-cols-2");
      expect(result).toContain("lg:grid-cols-3");
      expect(result).not.toContain("sm:grid-cols");
      expect(result).not.toContain("xl:grid-cols");
    });
  });

  describe("createSpacing", () => {
    it("creates padding classes", () => {
      const result = createSpacing({ p: 4, px: 6, py: 8 });
      expect(result).toContain("p-4");
      expect(result).toContain("px-6");
      expect(result).toContain("py-8");
    });

    it("creates margin classes", () => {
      const result = createSpacing({ m: 4, mx: "auto", my: 8 });
      expect(result).toContain("m-4");
      expect(result).toContain("mx-auto");
      expect(result).toContain("my-8");
    });

    it("handles empty options", () => {
      const result = createSpacing({});
      expect(result).toBe("");
    });

    it("handles string values", () => {
      const result = createSpacing({ px: "4", mx: "auto" });
      expect(result).toContain("px-4");
      expect(result).toContain("mx-auto");
    });
  });
});
