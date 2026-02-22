import "@testing-library/jest-dom";

import * as React from "react";
import { TextDecoder, TextEncoder } from "util";

// Polyfill TextEncoder and TextDecoder for Node.js environment (required by @neondatabase/serverless v1.0+)
if (typeof globalThis.TextEncoder === "undefined") {
  globalThis.TextEncoder =
    TextEncoder as unknown as typeof globalThis.TextEncoder;
}

if (typeof globalThis.TextDecoder === "undefined") {
  globalThis.TextDecoder =
    TextDecoder as unknown as typeof globalThis.TextDecoder;
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
