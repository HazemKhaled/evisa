import { FlatCompat } from "@eslint/eslintrc";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next",
      "next/core-web-vitals",
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

      "@next/next/no-img-element": "error",
      "@next/next/no-html-link-for-pages": "error",
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
    ],
  },
];

export default eslintConfig;
