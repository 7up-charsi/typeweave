import type { Config } from 'tailwindcss';
import { createTheme, registerAllStyles } from '@typeweave/theme';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components/**/*.{js,ts,jsx,tsx,mdx}',
    registerAllStyles(),
  ],
  plugins: [createTheme(), typography],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans, 'Nunito Sans')"],
        code: ['var(--font-code)'],
      },
    },
  },
};

export default config;
