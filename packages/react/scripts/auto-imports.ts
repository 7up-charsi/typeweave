import { statSync } from 'fs';
import { readdir, writeFile } from 'fs/promises';
import path from 'path';
import prettier from 'prettier';

const excludePackages: string[] = ['stack-manager'];

(async () => {
  console.log('*** React: auto imports started');

  const dirContent = await readdir(path.resolve('./src'));

  const components = dirContent.filter((name) => {
    if (excludePackages.includes(name)) return;

    const stats = statSync(path.resolve(`./src/${name}`));

    if (stats.isFile()) return;

    return true;
  });

  const data = components.map((name) => `export * from './${name}'`).join(';');

  const prettierConfig = await prettier.resolveConfig(
    path.resolve('../../.prettierrc.json '),
  );

  if (!prettierConfig) throw new Error('prettier config not found');

  const formatedData = await prettier.format(data, {
    ...prettierConfig,
    parser: 'typescript',
  });

  await writeFile(path.resolve('./src/index.ts'), formatedData, 'utf-8');

  console.log('*** React: auto imports completed');
})();
