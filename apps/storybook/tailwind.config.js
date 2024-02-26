import { webboUi } from '@webbo-ui/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../packages/components/**/*.stories.tsx',
    './.storybook/**/*.{ts,tsx}',
    '../../packages/core/theme/src/**/*.ts',
  ],
  plugins: [webboUi()],
};
