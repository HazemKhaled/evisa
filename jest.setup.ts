import "@testing-library/jest-dom";
import * as React from "react";

// Polyfill for Web APIs used by Next.js
global.Request = global.Request || class Request {};
global.Response = global.Response || class Response {};
global.Headers = global.Headers || class Headers {};
global.fetch = global.fetch || jest.fn();

// Mock cookies for NextRequest
(global as any).cookies = (global as any).cookies || {
  get: jest.fn(),
  set: jest.fn(),
  delete: jest.fn(),
  has: jest.fn(),
  getAll: jest.fn(),
};

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return "";
  },
  useParams() {
    return {};
  },
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & { alt: string }
  ) => {
    return React.createElement("img", {
      ...props,
      alt: props.alt || "Mock image",
    });
  },
}));

// Mock environment variables
process.env = {
  ...process.env,
  NODE_ENV: "test",
};
