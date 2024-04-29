import { Components } from './components-names-type';
import { ColorScale } from './types';

export const registerStyles = (components: Components[]) => {
  const unique = new Set(components);

  return Array.from(unique).map(
    (comp) => `./node_modules/@typeweave/theme/dist/components/${comp}`,
  );
};

export const registerAllStyles = () => {
  return `./node_modules/@typeweave/theme/dist/components/**/*.{js,mjs}`;
};

export const createColorScale = (color: ColorScale) =>
  Object.entries(color).reduce<ColorScale>(
    (acc, [key, value]) => ((acc[key.replace(/[a-zA-Z]+/, '')] = value), acc),
    {},
  );
