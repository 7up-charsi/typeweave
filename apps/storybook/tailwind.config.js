import { createTheme } from '@ux-weaver/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../packages/react/stories/**/*.stories.tsx',
    '../../packages/theme/src/**/*.ts',
    './.storybook/**/*.{ts,tsx}',
  ],
  plugins: [createTheme()],
};
