import cypressPlugin from 'eslint-plugin-cypress';
import globals from 'globals';
import eslintRecommended from '@eslint/js';

export default [
  {
    // Define global environments and language options
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
    },
    // ESLint recommended rules
    ...eslintRecommended.configs.recommended,

    // Base ESLint rules
    rules: {
      'no-unused-vars': 'error',
    },
  },
  {
    // Override configuration specifically for Cypress test files
    files: ['**/*.cy.js'],
    languageOptions: {
      globals: {
        ...globals.cypress,
      },
    },
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      'cypress/no-unnecessary-waiting': 'off',
      'no-unused-vars': 'off',
    },
  },
];
