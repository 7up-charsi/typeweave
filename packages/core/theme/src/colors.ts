import { mapKeys } from "@gist-ui/shared-utils";
import { blue, green, mauve, amber, plum, red, violet } from "@radix-ui/colors";
import { ColorScale } from "./types";

const neutral = mapKeys(mauve, (_key, _value, i) => i + 1) as ColorScale;
const primary = mapKeys(violet, (_key, _value, i) => i + 1) as ColorScale;
const secondary = mapKeys(plum, (_key, _value, i) => i + 1) as ColorScale;
const success = mapKeys(green, (_key, _value, i) => i + 1) as ColorScale;
const info = mapKeys(blue, (_key, _value, i) => i + 1) as ColorScale;
const warning = mapKeys(amber, (_key, _value, i) => i + 1) as ColorScale;
const danger = mapKeys(red, (_key, _value, i) => i + 1) as ColorScale;
const foreground = "#333333";
const background = "#ffffff";
const outline = blue.blue10;

export {
  neutral,
  primary,
  secondary,
  success,
  info,
  warning,
  danger,
  foreground,
  background,
  outline,
};
