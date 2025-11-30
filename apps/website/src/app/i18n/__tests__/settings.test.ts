import {
  cookieName,
  defaultNS,
  fallbackLng,
  getOptions,
  languages,
} from "../settings";

describe("i18n settings", () => {
  describe("constants", () => {
    it("should have correct fallback language", () => {
      expect(fallbackLng).toBe("en");
    });

    it("should have all required languages", () => {
      expect(languages).toEqual([
        "en",
        "es",
        "ar",
        "pt",
        "ru",
        "de",
        "fr",
        "it",
      ]);
      expect(languages).toContain("en");
      expect(languages).toContain("ar");
      expect(languages.length).toBe(8);
    });

    it("should have fallback language as first in languages array", () => {
      expect(languages[0]).toBe(fallbackLng);
    });

    it("should have correct default namespace", () => {
      expect(defaultNS).toBe("common");
    });

    it("should have correct cookie name", () => {
      expect(cookieName).toBe("i18next");
    });
  });

  describe("getOptions", () => {
    it("should return default options when no parameters provided", () => {
      const options = getOptions();

      expect(options).toEqual({
        supportedLngs: languages,
        fallbackLng: "en",
        lng: "en",
        fallbackNS: "common",
        defaultNS: "common",
        ns: "common",
      });
    });

    it("should return options with custom language", () => {
      const options = getOptions("es");

      expect(options.lng).toBe("es");
      expect(options.fallbackLng).toBe("en");
      expect(options.supportedLngs).toEqual(languages);
    });

    it("should return options with custom namespace", () => {
      const options = getOptions("en", "navigation");

      expect(options.ns).toBe("navigation");
      expect(options.defaultNS).toBe("common");
      expect(options.fallbackNS).toBe("common");
    });

    it("should return options with both custom language and namespace", () => {
      const options = getOptions("ar", "hero");

      expect(options.lng).toBe("ar");
      expect(options.ns).toBe("hero");
      expect(options.fallbackLng).toBe("en");
      expect(options.defaultNS).toBe("common");
    });

    it("should always include all supported languages", () => {
      const options1 = getOptions("es");
      const options2 = getOptions("ar", "features");

      expect(options1.supportedLngs).toEqual(languages);
      expect(options2.supportedLngs).toEqual(languages);
    });

    it("should maintain consistent fallback behavior", () => {
      const options1 = getOptions("fr");
      const options2 = getOptions("de", "navigation");

      expect(options1.fallbackLng).toBe(fallbackLng);
      expect(options1.fallbackNS).toBe(defaultNS);
      expect(options2.fallbackLng).toBe(fallbackLng);
      expect(options2.fallbackNS).toBe(defaultNS);
    });
  });

  describe("language validation", () => {
    it("should only contain valid language codes", () => {
      const validLanguageCodes = /^[a-z]{2}$/;

      languages.forEach(lang => {
        expect(lang).toMatch(validLanguageCodes);
      });
    });

    it("should not have duplicate languages", () => {
      const uniqueLanguages = new Set(languages);
      expect(uniqueLanguages.size).toBe(languages.length);
    });

    it("should include RTL and LTR languages", () => {
      // RTL languages
      expect(languages).toContain("ar");

      // LTR languages
      expect(languages).toContain("en");
      expect(languages).toContain("es");
      expect(languages).toContain("fr");
      expect(languages).toContain("de");
    });
  });
});
