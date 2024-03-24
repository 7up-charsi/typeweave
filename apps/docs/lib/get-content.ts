import path from 'path';
import { access, readFile } from 'fs/promises';

export const getContent = async (slug: string) => {
  const filePath = path.resolve(`content/${slug}/content.mdx`);

  try {
    await access(filePath);
  } catch (err) {
    return null;
  }

  const fileContent = await readFile(filePath, { encoding: 'utf8' });
  return fileContent;
};
