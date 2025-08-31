module.exports = {
  // TypeScript and JavaScript files
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix --max-warnings=0', 'prettier --write'],

  // JSON files
  '**/*.{json}': ['prettier --write'],

  // CSS and style files
  '**/*.{css,scss,sass}': ['prettier --write'],

  // Markdown files
  '**/*.{md,mdx}': ['prettier --write'],

  // Configuration files
  '**/*.{yml,yaml}': ['prettier --write'],

  // Note: Type checking disabled for staged files due to Next.js generated files
  // Run 'pnpm type-check' manually or in CI/CD pipeline
};
