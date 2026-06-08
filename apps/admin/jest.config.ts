import type { Config } from "jest";
import nextJest from "next/jest.js";

const currentDir =
  typeof __dirname !== "undefined" ? __dirname : import.meta.dirname;

const createJestConfig = nextJest({
  dir: currentDir,
});

const config: Config = {
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  testTimeout: 10000,
};

export default createJestConfig(config);
