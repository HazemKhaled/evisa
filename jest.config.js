/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require("next/jest");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],
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
module.exports = createJestConfig(config);
