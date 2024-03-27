import path from 'path';
import { Highlight } from './highlight';
import { access, readFile } from 'fs/promises';
import { Code } from './code';

interface Props {
  component?: string;
}

export const StylePaths = async (props: Props) => {
  const { component } = props;

  if (!component) return;

  const filePath = path.resolve(
    `components/demos/${component}/style-paths.txt`,
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
        Copy and paste these <Highlight>style paths</Highlight> in
        <Highlight>tailwind.config.js</Highlight> content array
      </p>

      <pre>
        <Code className="language-plaintext">{file}</Code>
      </pre>
    </>
  );
};
