import plugin from 'tailwindcss/plugin';
import deepmerge from 'deepmerge';
import * as colors from '@radix-ui/colors';
import { flatten } from 'flat';
import Color from 'color';
import kebabcase from 'lodash.kebabcase';

type ColorScale = Record<string, string>;

type ThemeColors = {
  background?: string;
  foreground?: string;
  primary?: ColorScale;
  secondary?: ColorScale;
  success?: ColorScale;
  warning?: ColorScale;
  danger?: ColorScale;
  info?: ColorScale;
  muted?: ColorScale;
  overlay?: ColorScale;
  focus?: string;
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

export const createColorScale = (color: ColorScale) =>
  Object.entries(color).reduce<ColorScale>(
    (acc, [key, value]) => ((acc[key.replace(/[a-zA-Z]+/, '')] = value), acc),
    {},
  );

const defaultLightTheme: Theme = {
  base: 'light',
  colors: {
    background: '#ffffff',
    foreground: colors.gray.gray11,
    primary: createColorScale(colors.violet),
    secondary: createColorScale(colors.plum),
    success: createColorScale(colors.green),
    warning: createColorScale(colors.orange),
    danger: createColorScale(colors.red),
    info: createColorScale(colors.blue),
    muted: createColorScale(colors.gray),
    overlay: createColorScale(colors.blackA),
    focus: colors.blue.blue8,
  },
  layout: { borderRadius: '4px' },
};

const defaultDarkTheme: Theme = {
  base: 'dark',
  colors: {
    background: colors.grayDark.gray1,
    foreground: colors.grayDark.gray11,
    primary: createColorScale(colors.violetDark),
    secondary: createColorScale(colors.plumDark),
    success: createColorScale(colors.greenDark),
    warning: createColorScale(colors.orangeDark),
    danger: createColorScale(colors.redDark),
    info: createColorScale(colors.blueDark),
    muted: createColorScale(colors.grayDark),
    overlay: createColorScale(colors.whiteA),
    focus: colors.blueDark.blue8,
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
  const variants: { name: string; definition: string }[] = [];

  Object.entries(themes).forEach(([themeName, { base, colors, layout }]) => {
    let cssSelector = `:root.${themeName}, :root[data-theme="${themeName}"]`;

    const scheme = base === 'dark' ? 'dark' : 'light';

    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`;
    }

    variants.push({ name: themeName, definition: `:is(.${themeName} &)` });
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
    ({ addUtilities, addVariant }) => {
      addUtilities(utilities);

      variants.forEach((variant) =>
        addVariant(variant.name, variant.definition),
      );

      addUtilities([
        {
          '.lucide': {
            width: '1em',
            height: '1em',
            'vector-effect': 'non-scaling-stroke',
          },
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
          fontFamily: { sans: 'Segoe UI' },
          colors: pluginColors,
          borderRadius: {
            DEFAULT: 'var(--border-radius)',
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
      future: {
        hoverOnlyWhenSupported: true,
      },
    },
  );
};
