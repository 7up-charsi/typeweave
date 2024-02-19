import type { Config } from 'tailwindcss';
import { webboUi, fullLibraryStyles } from '@webbo-ui/theme';
import typographyPlugin from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    ...fullLibraryStyles,
  ],
  plugins: [webboUi(), typographyPlugin],
};

export default config;

