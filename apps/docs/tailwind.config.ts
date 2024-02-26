import type { Config } from 'tailwindcss';
import { webboUi } from '@webbo-ui/theme';
import typographyPlugin from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@webbo-ui/theme/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [webboUi(), typographyPlugin],
};

export default config;

