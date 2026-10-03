import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['node_modules/', 'html-report/']),

  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
    },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        before: 'readonly',
        afterEach: 'readonly',
        after: 'readonly',
        context: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'no-console': 'off',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },

  eslintConfigPrettier,
]);
