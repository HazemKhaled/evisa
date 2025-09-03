import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js and TypeScript configs (these include recommended configs)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Prettier config to avoid conflicts
  ...compat.extends("prettier"),

  // Custom rules for better code quality
  {
    rules: {
      // TypeScript specific rules (only if @typescript-eslint is available)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

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
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // // Ignore generated files
  // {
  //   ignores: ["cloudflare-env.d.ts"],
  // },

  // Allow var in TypeScript declare blocks for global extensions
  {
    files: ["src/lib/db/index.ts"],
    rules: {
      "no-var": "off",
    },
  },
];

export default eslintConfig;
