import plugin from 'tailwindcss/plugin';
import animatePlugin from 'tailwindcss-animate';
import { fontFamily } from 'tailwindcss/defaultTheme';
import { genColorScale, genColors } from './utils';
import * as colors from './colors';

const primary = genColorScale(colors.violet, 'violet', 'primary');
const secondary = genColorScale(colors.pink, 'pink', 'secondary');
const success = genColorScale(colors.green, 'green', 'success');
const warning = genColorScale(colors.amber, 'amber', 'warning');
const danger = genColorScale(colors.red, 'red', 'danger');
const info = genColorScale(colors.blue, 'blue', 'info');
const neutral = genColorScale(colors.gray, 'gray', 'neutral');
const overlay = genColorScale(colors.blackA, 'blackA', 'overlay');

const primaryDark = genColorScale(colors.violetDark, 'violet', 'primary');
const secondaryDark = genColorScale(colors.pinkDark, 'pink', 'secondary');
const successDark = genColorScale(colors.greenDark, 'green', 'success');
const warningDark = genColorScale(colors.amberDark, 'amber', 'warning');
const dangerDark = genColorScale(colors.redDark, 'red', 'danger');
const infoDark = genColorScale(colors.blueDark, 'blue', 'info');
const neutralDark = genColorScale(colors.grayDark, 'gray', 'neutral');
const overlayDark = genColorScale(colors.whiteA, 'whiteA', 'overlay');

const light = {
  background: neutral.neutral1,
  foreground: neutral.neutral11,
  ring: neutral.neutral7,
  radius: '0.5rem',
  ...primary,
  ...secondary,
  ...success,
  ...warning,
  ...danger,
  ...info,
  ...neutral,
};

const dark = {
  background: neutralDark.neutral8,
  foreground: neutralDark.neutral12,
  ring: neutralDark.neutral7,
  radius: '0.5rem',
  ...primaryDark,
  ...secondaryDark,
  ...successDark,
  ...warningDark,
  ...dangerDark,
  ...infoDark,
  ...neutralDark,
};

export const gistui = plugin(
  ({ addUtilities, addBase }) => {
    addBase([
      {
        body: {
          'background-color': 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
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
      {
        ':root, :root[data-theme="light"]': genColors({ ...light, ...overlay }),
      },
      {
        ':root.dark, :root[data-theme="dark"]': {
          'color-scheme': 'dark',
          ...genColors({ ...dark, ...overlayDark }),
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
        colors: {
          ...Object.keys(light).reduce<Record<string, string>>(
            (acc, key) => (
              (acc[key] = `hsl(var(--${key}) / <alpha-value>)`), acc
            ),
            {},
          ),

          overlay1: 'var(--overlay1)',
          overlay2: 'var(--overlay2)',
          overlay3: 'var(--overlay3)',
          overlay4: 'var(--overlay4)',
          overlay5: 'var(--overlay5)',
          overlay6: 'var(--overlay6)',
          overlay7: 'var(--overlay7)',
          overlay8: 'var(--overlay8)',
          overlay9: 'var(--overlay9)',
          overlay10: 'var(--overlay10)',
          overlay11: 'var(--overlay11)',
          overlay12: 'var(--overlay12)',
        },
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
