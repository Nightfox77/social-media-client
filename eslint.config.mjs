import cypressPlugin from 'eslint-plugin-cypress';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
      cypress: cypressPlugin,
    },
    rules: {
      'no-unused-vars': 'off',
      'cypress/no-unnecessary-waiting': 'off',
    },
  },
];
