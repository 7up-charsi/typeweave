import type { Config } from 'tailwindcss';
import { webboUi, fullLibraryStyles } from '@webbo-ui/theme';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', ...fullLibraryStyles],
  plugins: [webboUi()],
};

export default config;

