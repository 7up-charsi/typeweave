import { gistui, fullLibraryStyles } from '@gist-ui/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../packages/components/**/*.stories.tsx',
    './.storybook/**/*.{ts,tsx}',
    ...fullLibraryStyles,
  ],
  plugins: [gistui],
};
