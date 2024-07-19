import chalk from 'chalk';
import depcheck from 'depcheck';
import { readdirSync } from 'fs';
import path from 'path';

const pathArg = process.argv
  .find((ele) => ele.includes('path='))
  ?.split('=')[1];

(() => {
  if (!pathArg) return;

  const resolvedPath = path.resolve(pathArg);
  const packages = readdirSync(resolvedPath);

  packages.forEach((pkg) => {
    const fullPath = `${resolvedPath}\\${pkg}`;

    depcheck(fullPath, {}).then((unused) => {
      const deps = unused.dependencies.length;
      const devDeps = unused.devDependencies.length;
      const missing = Object.keys(unused.missing).length;

      if (!deps && !devDeps && !missing) return;

      console.log('\n');

      console.log(chalk.bold(`*-*-*-*-* ${pkg} *-*-*-*-*`));

      if (deps) {
        console.log('\n');

        console.log(chalk.yellow('unused dependencies'));
        console.log(unused.dependencies);
      }

      if (devDeps) {
        console.log('\n');

        console.log(chalk.yellow('** unused devDependencies'));
        console.log(unused.devDependencies);
      }

      if (missing) {
        console.log('\n');

        console.log(chalk.red('** missing dependencies'));
        console.log(unused.missing);
      }
    });
  });
})();
