import { WebboUi } from '@webbo-ui/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../packages/components/**/*.stories.tsx',
    '../../packages/core/theme/src/**/*.ts',
    './.storybook/**/*.{ts,tsx}',
  ],
  plugins: [WebboUi()],
};
