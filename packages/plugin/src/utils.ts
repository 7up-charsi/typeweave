import { ColorScale } from './types';

export const createColorScale = (color: ColorScale) =>
  Object.entries(color).reduce<ColorScale>(
    (acc, [key, value]) => ((acc[key.replace(/[a-zA-Z]+/, '')] = value), acc),
    {},
  );
