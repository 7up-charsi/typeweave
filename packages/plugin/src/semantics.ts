import * as colors from '@radix-ui/colors';
import { createColorScale } from './utils';
import { ThemeColors } from './types';

const lightMuted = colors.gray;
const lightBg = '#ffffff';

export const lightThemeColors: ThemeColors = {
  background: lightBg,
  foreground: lightMuted.gray11,
  primary: createColorScale(colors.violet),
  secondary: createColorScale(colors.plum),
  success: createColorScale(colors.green),
  warning: createColorScale(colors.orange),
  danger: createColorScale(colors.red),
  info: createColorScale(colors.blue),
  muted: createColorScale(lightMuted),
  overlay: colors.blackA.blackA6,
  focus: colors.blue.blue8,
  paper: lightBg,
};

const darkMuted = colors.grayDark;
const darkBg = colors.grayDark.gray1;

export const darkThemeColors: ThemeColors = {
  background: darkBg,
  foreground: darkMuted.gray11,
  primary: createColorScale(colors.violetDark),
  secondary: createColorScale(colors.plumDark),
  success: createColorScale(colors.greenDark),
  warning: createColorScale(colors.orangeDark),
  danger: createColorScale(colors.redDark),
  info: createColorScale(colors.blueDark),
  muted: createColorScale(colors.grayDark),
  overlay: colors.blackA.blackA3,
  focus: colors.blueDark.blue8,
  paper: darkMuted.gray5,
};
