import { readdir, writeFile } from 'fs/promises';
import path from 'path';
import prettier from 'prettier';

(async () => {
  console.log('*** generate tsup config started');

  const dirContent = await readdir(path.resolve('./src'));

  const entries: string[][] = [];

  let index = 0;
  dirContent.forEach((name, i) => {
    if (i > 0 && i % 5 === 0) index++;

    if (!entries[index]) entries[index] = [];
    entries[index].push(`./src/${name}`);
  });

  const data = `
import { defineConfig, Options } from 'tsup';

const options: Options = {
  dts: true,
  target: 'es2022',
  format: ['cjs', 'esm'],
  banner: { js: '"use client";' },
};

export default [${entries
    .map(
      (entry, i) => `
    defineConfig({
      ...options,
      ${i === 0 ? `clean: true,` : ''}
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
