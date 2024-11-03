import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  resolvePluginsRelativeTo: import.meta.dirname,
});

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  {
    ignores: ['.next', 'dist', 'node_modules'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends('plugin:react-hooks/recommended'),

  {
    files: ['./packages/src/**/*.tsx'],
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  prettierRecommended,
];
