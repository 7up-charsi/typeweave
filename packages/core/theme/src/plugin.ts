import plugin from 'tailwindcss/plugin';
import animatePlugin from 'tailwindcss-animate';
import tailwindcssForms from '@tailwindcss/forms';
import { fontFamily } from 'tailwindcss/defaultTheme';
import deepmerge from 'deepmerge';
import * as colors from '@radix-ui/colors';
import { flatten } from 'flat';
import Color from 'color';
import kebabcase from 'lodash.kebabcase';

type ColorScale = Record<string, string>;

type ThemeColors = {
  primary?: ColorScale;
  secondary?: ColorScale;
  success?: ColorScale;
  warning?: ColorScale;
  danger?: ColorScale;
  info?: ColorScale;
  muted?: ColorScale;
  overlay?: ColorScale;
  focus?: ColorScale;
};

type ThemeLayout = {
  borderRadius?: string;
};

type Theme = {
  base?: 'light' | 'dark';
  colors?: ThemeColors;
  layout?: ThemeLayout;
};

type Themes = Record<string, Theme>;

type PluginConfig = {
  defaultTheme?: string;
  themes?: Themes;
};

const genColorScale = (color: ColorScale) =>
  Object.values(color).reduce<ColorScale>(
    (acc, value, i) => ((acc[i + 1] = value), acc),
    {},
  );

const defaultLightTheme: Theme = {
  base: 'light',
  colors: {
    primary: genColorScale(colors.violet),
    secondary: genColorScale(colors.plum),
    success: genColorScale(colors.green),
    warning: genColorScale(colors.orange),
    danger: genColorScale(colors.red),
    info: genColorScale(colors.blue),
    muted: genColorScale(colors.gray),
    focus: genColorScale(colors.sky),
    overlay: genColorScale(colors.blackA),
  },
  layout: { borderRadius: '4px' },
};

const defaultDarkTheme: Theme = {
  base: 'dark',
  colors: {
    primary: genColorScale(colors.violetDark),
    secondary: genColorScale(colors.plumDark),
    success: genColorScale(colors.greenDark),
    warning: genColorScale(colors.orangeDark),
    danger: genColorScale(colors.redDark),
    info: genColorScale(colors.blueDark),
    muted: genColorScale(colors.grayDark),
    focus: genColorScale(colors.skyDark),
    overlay: genColorScale(colors.whiteA),
  },
  layout: { borderRadius: '4px' },
};

const baseThemes = {
  light: defaultLightTheme,
  dark: defaultDarkTheme,
};

export const WebboUi = (config: PluginConfig = {}) => {
  const { themes: userThemes = {}, defaultTheme = 'light' } = config;

  const themes: Themes = {
    ...userThemes,
    light: deepmerge(defaultLightTheme, userThemes.light || {}),
    dark: deepmerge(defaultDarkTheme, userThemes.dark || {}),
  };

  Object.entries(themes).forEach(([themeName, theme]) => {
    if (themeName === 'light' || themeName === 'dark') return;

    const baseTheme = theme.base === 'dark' ? 'dark' : 'light';

    themes[themeName] = deepmerge(baseThemes[baseTheme], theme);
  });

  const pluginColors: Record<string, string> = {};
  const utilities: Record<string, Record<string, string>> = {};

  Object.entries(themes).forEach(([themeName, { base, colors, layout }]) => {
    let cssSelector = `.${themeName}, [data-theme="${themeName}"]`;

    const scheme = base === 'dark' ? 'dark' : 'light';

    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`;
    }

    utilities[cssSelector] = { 'color-scheme': scheme };

    const flatColors = flatten<ThemeColors | undefined, Record<string, string>>(
      colors,
      { delimiter: '-' },
    );

    Object.entries(flatColors).forEach(([colorName, colorValue]) => {
      const color = Color(colorValue).hsl().round().array();

      pluginColors[colorName] =
        `hsl(var(--${colorName}) / ${color[3] ?? '<alpha-value>'})`;
      utilities[cssSelector][`--${colorName}`] =
        `${color[0]} ${color[1]} ${color[2]}`;
    });

    Object.entries(layout || {}).forEach(([key, value]) => {
      key = kebabcase(key);

      if (typeof value === 'object') {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          nestedKey = kebabcase(nestedKey);

          // @ts-expect-error Type 'unknown' is not assignable to type 'string'
          utilities[cssSelector][`--${key}-${nestedKey}`] = nestedValue;
        });

        return;
      }

      utilities[cssSelector][`--${key}`] = value;
    });
  });

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
              appearance: 'none',
              margin: '0px',
            },
          'input[type="number"]': {
            '-moz-appearance': 'textfield',
          },
        },
      ]);

      addUtilities(utilities);

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
          colors: pluginColors,
          borderRadius: {
            DEFAULT: 'var(--border-radius)',
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
      future: {
        hoverOnlyWhenSupported: true,
      },
    },
  );
};
