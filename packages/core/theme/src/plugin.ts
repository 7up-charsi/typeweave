import plugin from 'tailwindcss/plugin';
import animatePlugin from 'tailwindcss-animate';
import { fontFamily } from 'tailwindcss/defaultTheme';
import { genColorScale, genDarkScale, genVariables } from './utils';
import {
  primary,
  secondary,
  success,
  warning,
  danger,
  info,
  neutral,
} from './colors';

const light = {
  background: '0 0% 100%',
  foreground: '240 10% 3.9%',
  border: '240 5.9% 90%',
  ring: '240 5% 64.9%',
  radius: '0.5rem',
  ...genColorScale(primary, 'primary'),
  ...genColorScale(secondary, 'secondary'),
  ...genColorScale(success, 'success'),
  ...genColorScale(warning, 'warning'),
  ...genColorScale(danger, 'danger'),
  ...genColorScale(info, 'info'),
  ...genColorScale(neutral, 'neutral'),
  primary: primary[500],
  'primary-foreground': '0 0% 100%',
  secondary: secondary[500],
  'secondary-foreground': '0 0% 100%',
  success: success[500],
  'success-foreground': '0 0% 100%',
  warning: warning[500],
  'warning-foreground': '0 0% 100%',
  danger: danger[500],
  'danger-foreground': '0 0% 100%',
  info: info[500],
  'info-foreground': '0 0% 100%',
  neutral: neutral[500],
  'neutral-foreground': '0 0% 100%',
};

const dark = {
  background: '240 10% 3.9%',
  foreground: '0 0% 100%',
  border: '0 4% 35%',
  ring: '240 5% 64.9%',
  radius: '0.5rem',
  ...genColorScale(genDarkScale(primary), 'primary'),
  ...genColorScale(genDarkScale(secondary), 'secondary'),
  ...genColorScale(genDarkScale(success), 'success'),
  ...genColorScale(genDarkScale(warning), 'warning'),
  ...genColorScale(genDarkScale(danger), 'danger'),
  ...genColorScale(genDarkScale(info), 'info'),
  ...genColorScale(genDarkScale(neutral), 'neutral'),
  primary: primary[500],
  'primary-foreground': '0 0% 100%',
  secondary: secondary[500],
  'secondary-foreground': '0 0% 100%',
  success: success[500],
  'success-foreground': '0 0% 100%',
  warning: warning[500],
  'warning-foreground': '0 0% 100%',
  danger: danger[500],
  'danger-foreground': '0 0% 100%',
  info: info[500],
  'info-foreground': '0 0% 100%',
  neutral: neutral[500],
  'neutral-foreground': '0 0% 100%',
};

export const gistui = plugin(
  ({ addUtilities, addBase }) => {
    addBase([
      {
        body: {
          'background-color': 'var(--background)',
          color: 'var(--foreground)',
        },
        'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
          {
            '-webkit-appearance': 'none',
            margin: 'px',
          },
        'input[type="number"]': {
          '-moz-appearance': 'textfield',
        },
      },
      { ':root, :root[data-theme="light"]': genVariables(light) },
      {
        ':root.dark, :root[data-theme="dark"]': {
          'color-scheme': 'dark',
          ...genVariables(dark),
        },
      },
    ]);

    addUtilities([
      {
        '.disabled': {
          opacity: '0.5',
          pointerEvents: 'none',
        },
        '.border-test': {
          border: '1px solid red',
        },
      },
    ]);
  },
  {
    darkMode: 'class',
    safelist: ['dark'],
    theme: {
      extend: {
        colors: Object.keys(light).reduce<Record<string, string>>(
          (acc, key) => (
            (acc[key] = `hsl(var(--${key}) / <alpha-value>)`), acc
          ),
          {},
        ),
        borderRadius: {
          sm: 'calc(var(--radius) - 4px)',
          md: `calc(var(--radius) - 2px)`,
          lg: `var(--radius)`,
          xl: `calc(var(--radius) + 4px)`,
        },
        fontFamily: {
          sans: ["var(--font-geist-sans, 'Nunito Sans')", ...fontFamily.sans],
          mono: ['var(--font-geist-mono)', ...fontFamily.mono],
        },
        keyframes: {
          skeletonWave: {
            '100%': {
              transform: 'translateX(100%)',
            },
          },
        },
        animation: {
          skeletonWave: 'skeletonWave 2s linear 0.5s infinite',
        },
      },
    },
    plugins: [animatePlugin],
  },
);
