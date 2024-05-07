import plugin from 'tailwindcss/plugin';
import deepmerge from 'deepmerge';
import { flatten } from 'flat';
import Color from 'color';
import kebabcase from 'lodash.kebabcase';
import { PluginConfig, Theme, ThemeColors, Themes } from './types';
import { darkThemeColors, lightThemeColors } from './semantics';
import { darkThemeLayout, lightThemeLayout } from './layouts';

const defaultLightTheme: Theme = {
  base: 'light',
  colors: lightThemeColors,
  layout: lightThemeLayout,
};

const defaultDarkTheme: Theme = {
  base: 'dark',
  colors: darkThemeColors,
  layout: darkThemeLayout,
};

const baseThemes = {
  light: defaultLightTheme,
  dark: defaultDarkTheme,
};

export const createTheme = (config: PluginConfig = {}) => {
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
          '.dynamic-icon > svg': {
            width: '1em',
            height: '1em',
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
          boxShadow: {
            modal: 'var(--box-shadow-modal)',
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
      safelist: ['lucide'],
    },
  );
};
