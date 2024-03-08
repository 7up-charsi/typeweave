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
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;
