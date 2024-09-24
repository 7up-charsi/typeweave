import { readdir } from 'fs/promises';
import path from 'path';

export const getMdxFiles = async (dir: string) => {
  const files = await readdir(path.resolve(`content/${dir}`), {
    recursive: true,
  });

  const onlyFiles = files.reduce<string[][]>(
    (acc, file) =>
      file.endsWith('.mdx')
        ? [...acc, file.replace('.mdx', '').split('\\')]
        : acc,
    [],
  );

  return onlyFiles;
};
