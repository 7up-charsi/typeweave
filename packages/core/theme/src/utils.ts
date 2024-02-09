export const genVariables = (theme: Record<string, string>) =>
  Object.entries(theme).reduce<Record<string, string>>(
    (acc, [key, value]) => ((acc[`--${key}`] = value), acc),
    {},
  );

export const genColorScale = (color: Record<string, string>, name: string) =>
  Object.entries(color).reduce<Record<string, string>>(
    (acc, [key, value]) => ((acc[`${name}-${key}`] = value), acc),
    {},
  );

export const genDarkScale = (color: Record<string, string>) => {
  const swapped: Record<string, string> = {};
  const keys = Object.keys(color);
  const length = keys.length;

  for (let i = 0; i < Math.floor(length / 2); i++) {
    const first = keys[i];
    const last = keys[length - 1 - i];

    swapped[first] = color[last];
    swapped[last] = color[first];
  }

  return swapped;
};
