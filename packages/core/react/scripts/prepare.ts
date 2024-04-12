import { readFile, readdir, writeFile } from 'fs/promises';
import path from 'path';

(async () => {
  const componentsPath = path.resolve('../../components');
  const components = await readdir(componentsPath, { encoding: 'utf-8' });

  const corePath = path.resolve('../');
  const core = (await readdir(corePath, { encoding: 'utf-8' })).filter(
    (ele) => ele !== 'react',
  );

  const hooksPath = path.resolve('../../hooks');
  const hooks = await readdir(hooksPath, { encoding: 'utf-8' });

  const utilitiesPath = path.resolve('../../utilities');
  const utilities = await readdir(utilitiesPath, { encoding: 'utf-8' });

  const publicComponents: string[] = await Promise.all(
    components
      .map(async (ele) => {
        const file = JSON.parse(
          await readFile(`${componentsPath}\\${ele}\\package.json`, {
            encoding: 'utf-8',
          }),
        );

        if (file.private) return;

        return file.name;
      })
      .filter(Boolean),
  );

  const publicCore: string[] = await Promise.all(
    core
      .map(async (ele) => {
        const file = JSON.parse(
          await readFile(`${corePath}\\${ele}\\package.json`, {
            encoding: 'utf-8',
          }),
        );

        if (file.private) return;

        return file.name;
      })
      .filter(Boolean),
  );

  const publicHooks: string[] = await Promise.all(
    hooks
      .map(async (ele) => {
        const file = JSON.parse(
          await readFile(`${hooksPath}\\${ele}\\package.json`, {
            encoding: 'utf-8',
          }),
        );

        if (file.private) return;

        return file.name;
      })
      .filter(Boolean),
  );

  const publicUtilities: string[] = await Promise.all(
    utilities
      .map(async (ele) => {
        const file = JSON.parse(
          await readFile(`${utilitiesPath}\\${ele}\\package.json`, {
            encoding: 'utf-8',
          }),
        );

        if (file.private) return;

        return file.name;
      })
      .filter(Boolean),
  );

  const reactPackageJsonPath = path.resolve('./package.json');
  const oldFile = JSON.parse(
    await readFile(reactPackageJsonPath, {
      encoding: 'utf-8',
    }),
  );

  const allPublicPackags = [
    ...publicComponents,
    ...publicCore,
    ...publicHooks,
    ...publicUtilities,
  ];

  const dependencies = allPublicPackags.reduce(
    (acc, name) => ((acc[name] = 'workspace:*'), acc),
    {},
  );

  await writeFile(
    reactPackageJsonPath,
    JSON.stringify({ ...oldFile, dependencies }, null, 2),
    { encoding: 'utf-8' },
  );

  // index.ts

  const indexFile = path.resolve('./src/index.ts');

  const data = allPublicPackags
    .map((pkg) => {
      const name = pkg.replace('@webbo-ui/', '');

      const camelCase = name.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
      const capitalize = camelCase[0].toUpperCase() + camelCase.slice(1);

      return `export * as ${capitalize} from '${pkg}';`;
    })
    .join('');

  await writeFile(indexFile, data, { encoding: 'utf-8' });
})();
