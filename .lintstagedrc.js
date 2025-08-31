module.exports = {
  // TypeScript and JavaScript files
  '**/*.{js,jsx,ts,tsx}': [
    'eslint --fix --max-warnings=0',
    'prettier --write',
    'git add',
  ],

  // JSON files
  '**/*.{json}': ['prettier --write', 'git add'],

  // CSS and style files
  '**/*.{css,scss,sass}': ['prettier --write', 'git add'],

  // Markdown files
  '**/*.{md,mdx}': ['prettier --write', 'git add'],

  // Configuration files
  '**/*.{yml,yaml}': ['prettier --write', 'git add'],

  // Note: Type checking disabled for staged files due to Next.js generated files
  // Run 'pnpm type-check' manually or in CI/CD pipeline
};
