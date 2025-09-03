import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],
  // Transform ES modules from OpenNext Cloudflare
  transformIgnorePatterns: ["node_modules/(?!(@opennextjs/cloudflare)/)"],
  // Mock ES modules that Jest can't handle
  moduleNameMapper: {
    "^@opennextjs/cloudflare$":
      "<rootDir>/src/lib/__mocks__/opennextjs-cloudflare.js",
  },
  collectCoverageFrom: [
    "src/lib/**/*.{ts,tsx}",
    "src/app/i18n/settings.ts",
    "!src/**/*.d.ts",
    "!src/lib/db/**/*", // Exclude database schemas and configs
    "!src/components/**/*", // Exclude UI components
    "!src/app/**/*.tsx", // Exclude Next.js app router pages
    "!src/app/i18n/client.ts", // Exclude client-side i18n
    "!src/app/i18n/index.ts", // Exclude server-side i18n initialization
    "!src/middleware.ts", // Exclude Next.js middleware
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  coverageReporters: ["text", "lcov", "html"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  testTimeout: 10000, // 10 seconds
  forceExit: true, // Force Jest to exit after tests complete
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
