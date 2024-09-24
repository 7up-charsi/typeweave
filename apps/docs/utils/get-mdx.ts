import path from 'path';
import { access, readFile } from 'fs/promises';

export const getMdx = async (slug: string) => {
  const filePath = path.resolve(`content/${slug}.mdx`);

  try {
    await access(filePath);
  } catch (err) {
    return null;
  }

  const fileContent = await readFile(filePath, { encoding: 'utf8' });
  return fileContent;
};
