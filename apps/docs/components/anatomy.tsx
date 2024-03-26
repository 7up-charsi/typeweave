import { access, readFile } from 'fs/promises';
import path from 'path';
import { Code } from './code';

export interface AnatomyProps {
  source?: string;
}

export const Anatomy = async (props: AnatomyProps) => {
  const { source } = props;

  if (!source) return;

  const filePath = path.resolve(
    `content/docs/components/${source}/anatomy.html`,
  );

  try {
    await access(filePath);
  } catch (err) {
    return null;
  }

  const file = await readFile(filePath, { encoding: 'utf-8' });

  return (
    <>
      <p>The anatomy refers to the way a component is structured.</p>

      <pre>
        <Code className="language-html">{file}</Code>
      </pre>
    </>
  );
};

Anatomy.displayName = 'Anatomy';
