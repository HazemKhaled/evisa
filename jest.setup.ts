import "@testing-library/jest-dom";
import * as React from "react";

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
