import { baseEslintConfig } from '@repo/eslint-config/base';
import globals from 'globals';

export default baseEslintConfig([
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]);
