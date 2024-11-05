import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import { baseEslintConfig } from '@repo/eslint-config/base';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  resolvePluginsRelativeTo: import.meta.dirname,
});

export default baseEslintConfig([
  ...compat.extends('plugin:react-hooks/recommended'),

  {
    files: ['src/**/*.tsx', 'src/**/*.ts'],
    languageOptions: {
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
    rules: {
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'with-single-extends',
        },
      ],
    },
  },
]);
