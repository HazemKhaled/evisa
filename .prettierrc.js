/** @type {import('prettier').Config} */
module.exports = {
  // Core formatting rules
  semi: true,
  trailingComma: "es5",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,

  // JSX and React specific
  jsxSingleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "avoid",

  // File specific overrides
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
  ],

  // Plugin configurations
  plugins: ["prettier-plugin-tailwindcss"],
};
