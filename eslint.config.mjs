import cypressPlugin from "eslint-plugin-cypress";
import globals from "globals";
import eslintRecommended from "@eslint/js";

export default [
  {
    // Define global environments and language options
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
    },
    plugins: {
      // Include Jest plugin here if needed
    },
    // Include ESLint recommended rules
    ...eslintRecommended.configs.recommended,

    // Base ESLint rules
    rules: {
      "no-unused-vars": "error",
    },
  },
  {
    // Configuration specific to Cypress files
    files: ["**/*.cy.js"],
    languageOptions: {
      globals: {
        ...globals.cypress,
      },
    },
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      "cypress/no-unnecessary-waiting": "off",
      "no-unused-vars": "off",
    },
  },
];
