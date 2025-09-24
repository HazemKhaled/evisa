/* eslint-disable @typescript-eslint/no-require-imports*/
import "@testing-library/jest-dom";
import * as React from "react";

// Polyfill TextDecoder for Node.js environment (required by @neondatabase/serverless v1.0+)
if (typeof globalThis.TextDecoder === "undefined") {
  const { TextDecoder } = require("util");
  globalThis.TextDecoder = TextDecoder;
}

if (typeof globalThis.TextEncoder === "undefined") {
  const { TextEncoder } = require("util");
  globalThis.TextEncoder = TextEncoder;
}

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
