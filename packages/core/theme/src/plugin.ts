import plugin from 'tailwindcss/plugin';
import animatePlugin from 'tailwindcss-animate';
import tailwindcssForms from '@tailwindcss/forms';
import { fontFamily } from 'tailwindcss/defaultTheme';
import deepmerge from 'deepmerge';
import {
  amber,
  violet,
  fuchsia,
  emerald,
  sky,
  rose,
  neutral,
} from 'tailwindcss/colors';

type ColorScale = {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  950?: string;
};

type PluginConfig = {
  layout?: {
    radius?: {
      sm?: string;
      md?: string;
      lg?: string;
      xl?: string;
    };
  };
  colors?: {
    primary?: ColorScale;
    secondary?: ColorScale;
    success?: ColorScale;
    warning?: ColorScale;
    danger?: ColorScale;
    info?: ColorScale;
    muted?: ColorScale;
  };
};

const defaultColors = {
  primary: violet,
  secondary: fuchsia,
  success: emerald,
  warning: amber,
  danger: rose,
  info: sky,
  muted: neutral,
};

const defaultLayout = {
  radius: {
    sm: 'calc(0.5rem - 4px)',
    md: 'calc(0.5rem - 2px)',
    lg: '0.5rem',
    xl: 'calc(0.5rem + 2px)',
  },
};

export const gistui = ({ colors, layout }: PluginConfig = {}) => {
  const mergedColors = deepmerge(colors ?? {}, defaultColors);
  const mergedLayout = deepmerge(layout ?? {}, defaultLayout);

  return plugin(
    ({ addUtilities, addBase }) => {
      addBase([
        {
          'html.dark body': {
            'background-color': mergedColors.muted[900]!,
            color: mergedColors.muted[50]!,
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
          colors: mergedColors,
          borderRadius: mergedLayout.radius,
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
