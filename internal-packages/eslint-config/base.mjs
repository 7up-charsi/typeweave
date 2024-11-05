import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

const tseslintConfig = tseslint.configs.recommended.map((ele) => {
  delete ele.files;

  return ele;
});

/**
 * @param {import('eslint').Linter.Config[]} configs
 * @returns {import('eslint').Linter.Config[]}
 */
export function baseEslintConfig(configs) {
  return [
    {
      ignores: ['**/.next/**', '**/dist/**'],
    },

    js.configs.recommended,
    ...tseslintConfig,

    {
      linterOptions: {
        noInlineConfig: true,
        reportUnusedDisableDirectives: 'error',
      },
      languageOptions: {
        ecmaVersion: 'latest',
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },

    ...configs,

    prettierRecommended,
  ];
}
