import { Components } from './components-names-type';
import { importsMap } from './imports-map';
import { ColorScale } from './types';

const stylesBasePath = './node_modules/@typeweave/theme/dist/components';

export const registerStyles = (components: Components[]) => {
  const uniqueNames = new Set(components);

  const arr: string[] = [];

  uniqueNames.forEach((name) => {
    if (importsMap[name])
      arr.push(
        ...importsMap[name].map((ele) => `${stylesBasePath}/${ele}.{js,mjs}`),
      );

    arr.push(`${stylesBasePath}/${name}.{js,mjs}`);
  });

  return arr;
};

export const registerAllStyles = () => `${stylesBasePath}/**/*.{js,mjs}`;

export const createColorScale = (color: ColorScale) =>
  Object.entries(color).reduce<ColorScale>(
    (acc, [key, value]) => ((acc[key.replace(/[a-zA-Z]+/, '')] = value), acc),
    {},
  );
