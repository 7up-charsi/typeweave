export const genColors = (theme: Record<string, string>) =>
  Object.entries(theme).reduce<Record<string, string>>(
    (acc, [key, value]) => ((acc[`--${key}`] = value), acc),
    {},
  );

export const genColorScale = (
  color: Record<string, string>,
  toReplace: string,
  replaceWith: string,
) =>
  Object.entries(color).reduce<Record<string, string>>(
    (acc, [key, value]) => (
      (acc[key.replace(toReplace, replaceWith)] = value), acc
    ),
    {},
  );
