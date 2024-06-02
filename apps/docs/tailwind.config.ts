import type { Config } from 'tailwindcss';
import { createTheme, registerAllStyles } from '@typeweave/theme';
import typography from '@tailwindcss/typography';
import tailwindScrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components/**/*.{js,ts,jsx,tsx,mdx}',
    registerAllStyles(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans, 'Nunito Sans')"],
        code: ['var(--font-code)'],
      },
    },
  },
  plugins: [createTheme(), typography, tailwindScrollbar],
};

export default config;
