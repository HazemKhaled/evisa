import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js and TypeScript configs (these include recommended configs)
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Prettier config to avoid conflicts
  ...compat.extends('prettier'),

  // Custom rules for better code quality
  {
    rules: {
      // TypeScript specific rules (only if @typescript-eslint is available)
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // General code quality
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',

      // Next.js specific (already included in next/core-web-vitals)
      '@next/next/no-img-element': 'error',
      '@next/next/no-html-link-for-pages': 'error',
    },
  },

  // File-specific overrides
  {
    files: ['**/*.config.*', '**/next.config.*'],
    rules: {
      'no-console': 'off',
    },
  },
];

export default eslintConfig;
