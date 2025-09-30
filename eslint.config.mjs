import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const baseIgnores = [
  "**/node_modules/**",
  "**/.next/**",
  "**/.turbo/**",
  "**/dist/**",
  "**/build/**",
  "**/coverage/**",
  "**/out/**",
  "**/.wrangler/**",
  "**/.vercel/**",
  "**/public/**",
];

const tsConfigs = compat
  .extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic"
  )
  .map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  }));

const reactConfigs = compat
  .extends("plugin:react/recommended", "plugin:react-hooks/recommended")
  .map(config => ({
    ...config,
    files: ["**/*.tsx", "**/*.jsx"],
  }));

const nextConfigs = compat
  .extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:i18next/recommended"
  )
  .map(config => ({
    ...config,
    files: ["apps/website/**/*.{ts,tsx,js,jsx}"],
  }));

export default [
  {
    ignores: baseIgnores,
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  js.configs.recommended,
  ...tsConfigs,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  ...reactConfigs,
  {
    files: ["**/*.tsx", "**/*.jsx"],
    rules: {
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["cmdk-input-wrapper"],
        },
      ],
    },
  },
  ...nextConfigs,
  ...compat.extends("prettier"),
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
      "prefer-const": "error",
      "no-var": "error",
      "no-debugger": "error",
      "no-duplicate-imports": "error",
    },
  },
  {
    files: ["**/*.test.{ts,tsx,js,jsx}"],
    rules: {
      "i18next/no-literal-string": "off",
    },
  },
  {
    files: ["**/*.config.*", "**/next.config.*"],
    rules: {
      "no-console": "off",
    },
  },
  {
    files: ["scripts/**/*"],
    rules: {
      "no-console": "off",
    },
  },
];
