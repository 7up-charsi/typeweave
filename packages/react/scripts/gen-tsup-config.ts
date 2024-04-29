import { statSync } from 'fs';
import { readdir, writeFile } from 'fs/promises';
import path from 'path';
import prettier from 'prettier';

(async () => {
  console.log('*** generate tsup config started');

  const dirContent = await readdir(path.resolve('./src'));

  const names = dirContent.filter((name) => {
    const stats = statSync(path.resolve(`./src/${name}`));

    if (stats.isFile()) return;

    return true;
  });

  const entries: string[][] = [];

  let index = 0;
  names.forEach((name, i) => {
    if (i > 0 && i % 5 === 0) index++;

    if (!entries[index]) entries[index] = [];
    entries[index].push(`./src/${name}`);
  });

  const data = `
import { defineConfig, Options } from 'tsup';

const options: Options = {
  dts: true,
  clean: true,
  target: 'es2022',
  format: ['cjs', 'esm'],
  banner: { js: '"use client";' },
};

export default [${entries
    .map(
      (entry) => `
    defineConfig({
      ...options,
      entry: ${JSON.stringify(entry)}
    })
  `,
    )
    .join(',')}];
`;

  const prettierConfig = await prettier.resolveConfig(
    path.resolve('../../.prettierrc.json '),
  );

  if (!prettierConfig) throw new Error('prettier config not found');

  const formatedData = await prettier.format(data, {
    ...prettierConfig,
    parser: 'typescript',
  });

  await writeFile(path.resolve('./tsup.config.ts'), formatedData, 'utf-8');

  console.log('*** generate tsup config completed');
})();
