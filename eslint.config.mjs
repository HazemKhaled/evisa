import { FlatCompat } from "@eslint/eslintrc";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  {
    files: [
      "apps/website/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "apps/admin/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],
    ...nextPlugin.configs["core-web-vitals"],
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "error",
      "@next/next/no-html-link-for-pages": "error",
    },
    settings: {
      next: {
        rootDir: [".", "apps/website", "apps/admin"],
      },
    },
  },
  ...compat.config({
    extends: [
      "prettier",
      "plugin:prettier/recommended",
      "plugin:@typescript-eslint/strict",
      "plugin:@typescript-eslint/stylistic",
    ],
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // REQUIREMENT: Prefer interfaces over types
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      // REQUIREMENT: Prefer const assertions over type annotations where possible
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // REQUIREMENT: Avoid enums; use maps instead
      // REQUIREMENT: Do not export types unless needed across multiple components
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSEnumDeclaration",
          message: "Avoid using enums. Use maps or const objects instead.",
        },
      ],

      "object-shorthand": ["error", "always"],
    },
  }),
  // React Hooks v7.0.1 with flat config and enhanced React 19.2 support
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    plugins: {
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },
  },
  {
    ignores: [
      "**/node_modules/**",
      "**/.*/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/out/**",
      "**/public/**",
      "cloudflare-env.d.ts",
      "apps/**/next-env.d.ts",
    ],
  },
];

export default eslintConfig;
