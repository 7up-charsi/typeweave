import { statSync } from 'fs';
import { readdir, writeFile } from 'fs/promises';
import path from 'path';
import prettier from 'prettier';

const excludes: string[] = [];

(async () => {
  console.log('*** auto imports started');

  const dirContent = await readdir(path.resolve('./src'));

  const componentsNames = dirContent.filter((name) => {
    if (excludes.includes(name)) return;

    const stats = statSync(path.resolve(`./src/${name}`));

    if (stats.isFile()) return;

    return true;
  });

  const data = componentsNames
    .map((name) => `export * from './${name}'`)
    .join(';');

  const prettierConfig = await prettier.resolveConfig(
    path.resolve('../../.prettierrc.json '),
  );

  if (!prettierConfig) throw new Error('prettier config not found');

  const formatedData = await prettier.format(data, {
    ...prettierConfig,
    parser: 'typescript',
  });

  await writeFile(path.resolve('./src/index.ts'), formatedData, 'utf-8');

  console.log('*** auto imports completed');
})();
