import { WebboUi } from '@webbo-ui/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../packages/react/src/**/*.stories.tsx',
    '../../packages/theme/src/**/*.ts',
    './.storybook/**/*.{ts,tsx}',
  ],
  plugins: [WebboUi()],
};
