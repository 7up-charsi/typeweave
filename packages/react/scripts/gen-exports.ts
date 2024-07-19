import chalk from 'chalk';
import { statSync } from 'fs';
import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import prettier from 'prettier';

const excludePackages: string[] = ['stack-manager'];

(async () => {
  try {
    console.log(chalk.green('Exports generation started'));

    const dirContent = await readdir(path.resolve('./src'));

    const components = dirContent.filter((name) => {
      if (excludePackages.includes(name)) return;

      const stats = statSync(path.resolve(`./src/${name}`));

      if (stats.isFile()) return;

      return true;
    });

    const exports = components.reduce(
      (acc, comp) => (
        (acc[`/${comp}`] = {
          import: `./dist/${comp}/index.js`,
          types: `./dist/${comp}/index.d.ts`,
        }),
        acc
      ),
      {},
    );

    const configContent = await readFile(
      path.resolve('./clean-package.config.json'),
      'utf-8',
    );

    const config = JSON.parse(configContent);

    config.replace.exports = { ...config.replace.exports, ...exports };

    const prettierConfig = await prettier.resolveConfig(
      path.resolve('../../.prettierrc.json '),
    );

    if (!prettierConfig) throw new Error('prettier config not found');

    const formatedData = await prettier.format(JSON.stringify(config), {
      ...prettierConfig,
      parser: 'json',
    });

    await writeFile(
      path.resolve('./clean-package.config.json'),
      formatedData,
      'utf-8',
    );

    console.log(chalk.green('Exports generation Completed'));
  } catch (error) {
    console.log(chalk.red(error));
  }
})();
