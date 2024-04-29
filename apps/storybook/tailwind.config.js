import { createTheme } from '@typeweave/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../packages/react/stories/**/*.stories.tsx',
    '../../packages/theme/src/**/*.ts',
    './.storybook/**/*.{ts,tsx}',
  ],
  plugins: [createTheme()],
};
