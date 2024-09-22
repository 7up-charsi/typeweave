import { createColorScale, typeweave } from '@typeweave/plugin';
import tailwindScrollbar from 'tailwind-scrollbar';
import { gray, grayDark } from '@radix-ui/colors';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components/**/*.{js,ts,jsx,tsx,mdx}',
    './demos/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@typeweave/react/src/**/*.styles.ts',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans, 'Nunito Sans')"],
        code: ['var(--font-code)'],
      },
    },
  },
  plugins: [
    typeweave({
      colorMode: 'rgb',
      themes: {
        light: { colors: { primary: createColorScale(gray) } },
        dark: { colors: { primary: createColorScale(grayDark) } },
      },
    }),
    typography,
    tailwindScrollbar,
  ],
};

export default config;
