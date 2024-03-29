import path from 'path';
import { access, readFile } from 'fs/promises';
import { Code } from './code';

interface Props {
  component?: string;
}

export const StylePaths = async (props: Props) => {
  const { component } = props;

  if (!component) return;

  const filePath = path.resolve(
    `content/docs/components/${component}/style-paths.txt`,
  );

  try {
    await access(filePath);
  } catch (err) {
    return null;
  }

  const file = await readFile(filePath, { encoding: 'utf-8' });

  return (
    <>
      <p>
        Copy and paste these <code data-highlight>style paths</code> in
        <code data-highlight>tailwind.config.ts</code> content array
      </p>

      <pre>
        <Code className="language-plaintext">{file.trim()}</Code>
      </pre>
    </>
  );
};
