/** @type {import('jest').Config} */
module.exports = {
  projects: [
    "<rootDir>/apps/website",
    "<rootDir>/apps/admin",
    "<rootDir>/packages/database",
  ],
  forceExit: true,
};
