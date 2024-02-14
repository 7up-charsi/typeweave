import type { Config } from 'tailwindcss';
import { gistui, fullLibraryStyles } from '@gist-ui/theme';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', ...fullLibraryStyles],
  plugins: [gistui],
};

export default config;

