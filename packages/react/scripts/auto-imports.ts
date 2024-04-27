import { statSync } from 'fs';
import { readdir, writeFile } from 'fs/promises';
import path from 'path';

const excludes = ['custom-error'];

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

  await writeFile(path.resolve('./src/index.ts'), data, 'utf-8');

  console.log('*** auto imports completed');
})();
