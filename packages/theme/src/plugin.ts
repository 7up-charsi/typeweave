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

const defaultThemes = {
  light: defaultLightTheme,
  dark: defaultDarkTheme,
};

export const createTheme = (config: PluginConfig = {}) => {
  const {
    themes: userThemes = {},
    defaultTheme = 'light',
    colorMode = 'hsl',
  } = config;

  if (colorMode !== 'hsl' && colorMode !== 'rgb')
    throw new Error('createTheme, `colorMode` must be either `hsl` or `rgb`');

  const themes: Themes = {
    ...userThemes,
    light: deepmerge(defaultLightTheme, userThemes.light || {}),
    dark: deepmerge(defaultDarkTheme, userThemes.dark || {}),
  };

  Object.entries(themes).forEach(([themeName, theme]) => {
    if (themeName === 'light' || themeName === 'dark') return;

    const baseTheme = theme.base === 'dark' ? 'dark' : 'light';

    themes[themeName] = deepmerge(defaultThemes[baseTheme], theme);
  });

  const pluginColors: Record<string, string> = {};
  const pluginLayout: Record<string, Record<string, string>> = {};
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

    // generate colors css variables
    Object.entries(flatColors).forEach(([_colorName, colorValue]) => {
      const colorName = kebabcase(_colorName);

      const rgb = Color(colorValue).rgb().round().array();
      const hsl = Color(colorValue).hsl().round().array();

      const color = colorMode === 'hsl' ? hsl : rgb;

      pluginColors[colorName] =
        `${colorMode}(var(--${colorName}) / ${color[3] ?? '<alpha-value>'})`;

      utilities[cssSelector][`--${colorName}`] =
        `${color[0]} ${color[1]} ${color[2]}`;
    });

    // generate layout css variables
    Object.entries(layout || {}).forEach(([key, value]) => {
      const kebabcaseKey = kebabcase(key);

      if (!pluginLayout[key]) pluginLayout[key] = {};

      if (typeof value === 'object') {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          const kebabcaseNestedKey = kebabcase(nestedKey);

          const variable = `--${kebabcaseKey}-${kebabcaseNestedKey}`;

          utilities[cssSelector][variable] = nestedValue;
          pluginLayout[key][kebabcaseNestedKey] = `var(${variable})`;
        });

        return;
      }

      const variable = `--${kebabcaseKey}`;
      utilities[cssSelector][variable] = value;
      pluginLayout[key].DEFAULT = `var(${variable})`;
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
          colors: pluginColors,
          ...pluginLayout,
          fontFamily: { sans: 'Segoe UI' },
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
