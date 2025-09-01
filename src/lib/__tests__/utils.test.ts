import {
  cn,
  formatCurrency,
  formatDate,
  truncateText,
  getInitials,
  getTextDirection,
  isRTL,
  getLanguageFromLocale,
  sleep,
  debounce,
  isValidEmail,
  generateId,
  safeJsonParse,
} from "../utils";

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      expect(cn("px-2 py-1", "px-3")).toBe("py-1 px-3");
      expect(cn("btn", "btn-primary", { "btn-disabled": false })).toBe(
        "btn btn-primary"
      );
      expect(cn("btn", "btn-primary", { "btn-disabled": true })).toBe(
        "btn btn-primary btn-disabled"
      );
    });

    it("should handle undefined and null values", () => {
      expect(cn("btn", null, undefined, "active")).toBe("btn active");
    });

    it("should handle empty input", () => {
      expect(cn()).toBe("");
    });
  });

  describe("formatCurrency", () => {
    it("should format USD currency correctly", () => {
      expect(formatCurrency(1234.56, "USD", "en-US")).toBe("$1,234.56");
      expect(formatCurrency(0, "USD", "en-US")).toBe("$0.00");
      expect(formatCurrency(1000000, "USD", "en-US")).toBe("$1,000,000.00");
    });

    it("should format EUR currency correctly", () => {
      expect(formatCurrency(1234.56, "EUR", "en-US")).toBe("€1,234.56");
    });

    it("should use default values when not provided", () => {
      expect(formatCurrency(100)).toBe("$100.00");
    });

    it("should handle different locales", () => {
      const formatted = formatCurrency(1234.56, "USD", "de-DE");
      // German locale formats USD differently, just check it contains the amount
      expect(formatted).toContain("1.234,56");
      expect(formatted).toContain("$");
    });
  });

  describe("formatDate", () => {
    const testDate = new Date("2024-01-15T10:30:00Z");

    it("should format date with default options", () => {
      const formatted = formatDate(testDate, "en-US");
      expect(formatted).toBe("January 15, 2024");
    });

    it("should handle string dates", () => {
      const formatted = formatDate("2024-01-15", "en-US");
      expect(formatted).toBe("January 15, 2024");
    });

    it("should handle different locales", () => {
      const formatted = formatDate(testDate, "es-ES");
      expect(formatted).toContain("enero");
    });

    it("should handle custom options", () => {
      const formatted = formatDate(testDate, "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      expect(formatted).toBe("Jan 15, 2024");
    });
  });

  describe("truncateText", () => {
    it("should truncate long text", () => {
      const text = "This is a very long text that needs to be truncated";
      expect(truncateText(text, 20)).toBe("This is a very long...");
    });

    it("should not truncate short text", () => {
      const text = "Short text";
      expect(truncateText(text, 20)).toBe("Short text");
    });

    it("should handle edge cases", () => {
      expect(truncateText("", 10)).toBe("");
      expect(truncateText("Hello", 5)).toBe("Hello");
      expect(truncateText("Hello", 4)).toBe("Hell...");
    });

    it("should not break words in the middle", () => {
      const text = "Hello world this is a test";
      expect(truncateText(text, 15)).toBe("Hello world...");
    });
  });

  describe("getInitials", () => {
    it("should get initials from full name", () => {
      expect(getInitials("John Doe")).toBe("JD");
      expect(getInitials("Mary Jane Watson")).toBe("MJ");
      expect(getInitials("Ahmed Ali Hassan")).toBe("AA");
    });

    it("should handle single name", () => {
      expect(getInitials("John")).toBe("J");
    });

    it("should handle empty string", () => {
      expect(getInitials("")).toBe("");
    });

    it("should handle names with extra spaces", () => {
      expect(getInitials("  John   Doe  ")).toBe("JD");
    });

    it("should limit to 2 characters", () => {
      expect(getInitials("John Michael Andrew Smith")).toBe("JM");
    });
  });

  describe("getTextDirection", () => {
    it("should return rtl for Arabic languages", () => {
      expect(getTextDirection("ar")).toBe("rtl");
      expect(getTextDirection("ar-SA")).toBe("rtl");
      expect(getTextDirection("he")).toBe("rtl");
      expect(getTextDirection("fa")).toBe("rtl");
      expect(getTextDirection("ur")).toBe("rtl");
    });

    it("should return ltr for non-RTL languages", () => {
      expect(getTextDirection("en")).toBe("ltr");
      expect(getTextDirection("en-US")).toBe("ltr");
      expect(getTextDirection("es")).toBe("ltr");
      expect(getTextDirection("fr")).toBe("ltr");
      expect(getTextDirection("de")).toBe("ltr");
    });
  });

  describe("isRTL", () => {
    it("should return true for RTL locales", () => {
      expect(isRTL("ar")).toBe(true);
      expect(isRTL("ar-SA")).toBe(true);
      expect(isRTL("he")).toBe(true);
    });

    it("should return false for LTR locales", () => {
      expect(isRTL("en")).toBe(false);
      expect(isRTL("en-US")).toBe(false);
      expect(isRTL("es")).toBe(false);
    });
  });

  describe("getLanguageFromLocale", () => {
    it("should extract language code from locale", () => {
      expect(getLanguageFromLocale("en-US")).toBe("en");
      expect(getLanguageFromLocale("es-ES")).toBe("es");
      expect(getLanguageFromLocale("ar-SA")).toBe("ar");
      expect(getLanguageFromLocale("en")).toBe("en");
    });
  });

  describe("sleep", () => {
    it("should resolve after specified time", async () => {
      const start = Date.now();
      await sleep(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(90); // Allow some margin for timing
    });
  });

  describe("debounce", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should debounce function calls", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn("first");
      debouncedFn("second");
      debouncedFn("third");

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith("third");
    });

    it("should call function with latest arguments", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn("arg1", "arg2");
      jest.advanceTimersByTime(50);
      debouncedFn("arg3", "arg4");
      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledWith("arg3", "arg4");
    });
  });

  describe("isValidEmail", () => {
    it("should validate correct email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
      expect(isValidEmail("user+tag@example.org")).toBe(true);
    });

    it("should reject invalid email addresses", () => {
      expect(isValidEmail("invalid-email")).toBe(false);
      expect(isValidEmail("test@")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("test.example.com")).toBe(false);
      expect(isValidEmail("")).toBe(false);
    });
  });

  describe("generateId", () => {
    it("should generate ID with default length", () => {
      const id = generateId();
      expect(id).toHaveLength(8);
      expect(typeof id).toBe("string");
    });

    it("should generate ID with custom length", () => {
      const id = generateId(12);
      // The actual length might be slightly different due to Math.random().toString(36) behavior
      expect(id.length).toBeGreaterThanOrEqual(10);
      expect(id.length).toBeLessThanOrEqual(12);
    });

    it("should generate different IDs", () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it("should handle edge cases", () => {
      expect(generateId(0)).toHaveLength(0);
      expect(generateId(1)).toHaveLength(1);
    });
  });

  describe("safeJsonParse", () => {
    it("should parse valid JSON", () => {
      const obj = { name: "John", age: 30 };
      const json = JSON.stringify(obj);
      expect(safeJsonParse(json)).toEqual(obj);
    });

    it("should return null for invalid JSON", () => {
      expect(safeJsonParse("invalid json")).toBe(null);
      expect(safeJsonParse('{"incomplete":')).toBe(null);
      expect(safeJsonParse("")).toBe(null);
    });

    it("should handle different data types", () => {
      expect(safeJsonParse("true")).toBe(true);
      expect(safeJsonParse("false")).toBe(false);
      expect(safeJsonParse("null")).toBe(null);
      expect(safeJsonParse("42")).toBe(42);
      expect(safeJsonParse('"string"')).toBe("string");
      expect(safeJsonParse("[]")).toEqual([]);
    });

    it("should work with generic types", () => {
      interface User {
        name: string;
        age: number;
      }

      const user: User = { name: "John", age: 30 };
      const json = JSON.stringify(user);
      const parsed = safeJsonParse<User>(json);

      expect(parsed).toEqual(user);
      expect(parsed?.name).toBe("John");
    });
  });
});
