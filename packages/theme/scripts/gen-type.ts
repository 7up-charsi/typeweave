import { statSync } from 'fs';
import { readdir, writeFile } from 'fs/promises';
import path from 'path';
import prettier from 'prettier';

const excludes: string[] = ['index.ts'];

(async () => {
  console.log('*** generate type started');

  const dirContent = await readdir(path.resolve('./src/components'), {
    encoding: 'utf-8',
  });

  const names = dirContent.filter((name) => {
    if (excludes.includes(name)) return;

    const stats = statSync(path.resolve(`./src/components/${name}`));

    if (stats.isDirectory()) return;

    return true;
  });

  const data = `
  export type Components = ${names.map((ele) => `'${ele.replace('.ts', '')}'`).join('|')}
  `;

  const prettierConfig = await prettier.resolveConfig(
    path.resolve('../../.prettierrc.json '),
  );

  if (!prettierConfig) throw new Error('prettier config not found');

  const formatedData = await prettier.format(data, {
    ...prettierConfig,
    parser: 'typescript',
  });

  await writeFile(
    path.resolve('./src/components-names-type.ts'),
    formatedData,
    'utf-8',
  );

  console.log('*** generate type completed');
})();
