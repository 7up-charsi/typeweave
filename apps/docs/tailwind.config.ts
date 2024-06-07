import type { Config } from 'tailwindcss';
import { typeweave } from '@typeweave/plugin';
import typography from '@tailwindcss/typography';
import tailwindScrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@typeweave/react/dist/**/*-styles.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans, 'Nunito Sans')"],
        code: ['var(--font-code)'],
      },
    },
  },
  plugins: [typeweave(), typography, tailwindScrollbar],
};

export default config;
