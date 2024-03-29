import { access, readFile } from 'fs/promises';
import path from 'path';
import { Code } from './code';

export interface AnatomyProps {
  component?: string;
}

export const Anatomy = async (props: AnatomyProps) => {
  const { component } = props;

  if (!component) return;

  const filePath = path.resolve(
    `content/docs/components/${component}/anatomy.tsx`,
  );

  try {
    await access(filePath);
  } catch (err) {
    return null;
  }

  let file = await readFile(filePath, { encoding: 'utf-8' });

  file = file.replace('// @ts-nocheck', '');

  return (
    <>
      <p>The anatomy refers to the way a component is structured.</p>

      <pre>
        <Code className="language-tsx">{file.trim()}</Code>
      </pre>
    </>
  );
};

Anatomy.displayName = 'Anatomy';
