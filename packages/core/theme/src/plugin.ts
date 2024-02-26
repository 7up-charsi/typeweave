import plugin from 'tailwindcss/plugin';
import animatePlugin from 'tailwindcss-animate';
import tailwindcssForms from '@tailwindcss/forms';
import { fontFamily } from 'tailwindcss/defaultTheme';
import deepmerge from 'deepmerge';
import * as colors from '@radix-ui/colors';

type ColorScale = Record<string, string>;

type Colors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'muted'
  | 'overlay'
  | 'focus';

type Theme = Record<Colors, ColorScale>;

type PluginConfig = {
  lightTheme?: Theme;
  darkTheme?: Theme;
};

const genColorScale = (color: ColorScale) =>
  Object.values(color).reduce<ColorScale>(
    (acc, value, i) => ((acc[i + 1] = value), acc),
    {},
  );

const defaultLightTheme: Theme = {
  primary: genColorScale(colors.violet),
  secondary: genColorScale(colors.plum),
  success: genColorScale(colors.green),
  warning: genColorScale(colors.orange),
  danger: genColorScale(colors.red),
  info: genColorScale(colors.blue),
  muted: genColorScale(colors.gray),
  focus: genColorScale(colors.sky),
  overlay: genColorScale(colors.blackA),
};

const defaultDarkTheme: Theme = {
  primary: genColorScale(colors.violetDark),
  secondary: genColorScale(colors.plumDark),
  success: genColorScale(colors.greenDark),
  warning: genColorScale(colors.orangeDark),
  danger: genColorScale(colors.redDark),
  info: genColorScale(colors.blueDark),
  muted: genColorScale(colors.grayDark),
  focus: genColorScale(colors.skyDark),
  overlay: genColorScale(colors.whiteA),
};

export const webboUi = ({ lightTheme, darkTheme }: PluginConfig = {}) => {
  const userLightTheme = deepmerge(lightTheme ?? {}, defaultLightTheme);
  const userDarkTheme = deepmerge(darkTheme ?? {}, defaultDarkTheme);

  return plugin(
    ({ addUtilities, addBase }) => {
      addBase([
        {
          ':root.dark': {
            'color-scheme': 'dark',
          },
        },
        {
          'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
            {
              '-webkit-appearance': 'none',
              margin: 'px',
            },
          'input[type="number"]': {
            '-moz-appearance': 'textfield',
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
      theme: {
        extend: {
          colors: {
            ...userLightTheme,
            ...Object.entries(userDarkTheme).reduce<Record<string, ColorScale>>(
              (acc, [key, value]) => ((acc[`${key}Dark`] = value), acc),
              {},
            ),
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
      plugins: [animatePlugin, tailwindcssForms],
    },
  );
};
