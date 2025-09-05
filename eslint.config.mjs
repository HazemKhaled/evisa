import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import i18next from "eslint-plugin-i18next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  // Next.js and TypeScript configs (these include recommended configs)
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
    "plugin:i18next/recommended"
  ),

  // Custom rules for better code quality
  {
    rules: {
      // TypeScript specific rules (only if @typescript-eslint is available)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],

      // General code quality
      "prefer-const": "error",
      "no-var": "error",
      "no-console": "warn",
      "no-debugger": "error",

      // Next.js specific rules are already included in next/core-web-vitals
    },
  },

  // File-specific overrides
  {
    files: ["**/*.config.*", "**/next.config.*"],
    rules: {
      "no-console": "off",
    },
  },

  // Allow console in scripts directory
  {
    files: ["scripts/**/*"],
    rules: {
      "no-console": "off",
    },
  },

  // Ignore i18next in test files
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    rules: {
      "i18next/no-literal-string": "off",
    },
  },

  // Allow var in TypeScript declare blocks for global extensions
  {
    files: ["src/lib/db/index.ts"],
    rules: {
      "no-var": "off",
    },
  },
];

export default eslintConfig;
