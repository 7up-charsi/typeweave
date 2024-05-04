import { readFile, readdir, stat, writeFile } from 'fs/promises';
import * as path from 'path';
import prettier from 'prettier';

const excludeImportsFrom: string[] = [
  '../context',
  '../popper',
  '../slot',
  '../focus-trap',
  '../visually-hidden',
  '../stack-manager',
];

const srcDir = path.resolve('../react/src');

async function extractImports(dir: string): Promise<Record<string, string[]>> {
  const allImports: { name: string; imports: string[] }[] = [];

  await traverseDirectory(dir);

  return allImports.reduce((acc, { name, imports }) => {
    if (!imports.length) return acc;

    if (acc[name]) {
      acc[name] = [...new Set([...acc[name], ...imports])];
      return acc;
    }

    acc[name] = [...imports];
    return acc;
  }, {});

  async function traverseDirectory(currentDir: string) {
    const dirs = await readdir(currentDir);

    for (const subdir of dirs) {
      const filePath = path.join(currentDir, subdir);
      const stats = await stat(filePath);

      if (stats.isDirectory()) {
        await traverseDirectory(filePath);
      } else if (filePath.endsWith('.tsx')) {
        const fileContent = await readFile(filePath, 'utf8');

        const importRegex =
          /import\s+{(?<components>[^}]+)} from '(?<module>\.\.\/.+)'/g;

        const dirname = path.dirname(filePath);
        const imports: string[] = [];

        [...fileContent.matchAll(importRegex)].forEach((match) => {
          const module = match.groups?.module;
          const components = match.groups?.components;

          if (!module || !components) return;
          if (module.includes('../use-')) return;

          if (excludeImportsFrom.includes(module)) return;

          const importedComponents = components
            .trim()
            .split(', ')
            .map((ele) => ele.trim())
            .filter((ele) => !ele.endsWith('Props') && !!ele.match(/^[A-Z]/));

          if (!importedComponents.length) return;

          imports.push(module.replace('../', ''));
        });

        allImports.push({
          name: dirname.substring(dirname.lastIndexOf('\\') + 1),
          imports,
        });
      }
    }
  }
}

async function main() {
  const allImports = await extractImports(srcDir);

  const data = `
    export const importsMap: Record<string, string[]> = ${JSON.stringify(allImports)}
  `;

  const prettierConfig = await prettier.resolveConfig(
    path.resolve('../../.prettierrc.json '),
  );

  if (!prettierConfig) throw new Error('prettier config not found');

  const formatedData = await prettier.format(data, {
    ...prettierConfig,
    parser: 'typescript',
  });

  await writeFile(path.resolve('./src/imports-map.ts'), formatedData, 'utf-8');
}

main();
