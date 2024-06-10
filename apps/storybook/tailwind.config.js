import { typeweave } from '@typeweave/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../packages/react/src/**/*.stories.tsx',
    '../../packages/react/src/**/*.styles.ts',
    './.storybook/**/*.{ts,tsx}',
  ],
  plugins: [typeweave()],
};
