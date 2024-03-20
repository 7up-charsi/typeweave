import type { Config } from 'tailwindcss';
import { WebboUi } from '@webbo-ui/theme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@webbo-ui/theme/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [WebboUi()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans, 'Nunito Sans')"],
        code: ['var(--Source_Code_Pro)'],
      },
    },
  },
};

export default config;
