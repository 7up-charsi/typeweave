import path from 'path';
import { access, readFile } from 'fs/promises';
import { CodeDemoContainer } from './code-demo-container';

interface CodeDemoProps {
  source?: string;
  language?: string;
}

export const CodeDemo = async (props: CodeDemoProps) => {
  const { source, language = 'tsx' } = props;

  if (!source) return;

  const filePath = path.resolve(`content/docs/components/${source}.tsx`);

  try {
    await access(filePath);
  } catch (err) {
    return null;
  }

  const file = await readFile(filePath, { encoding: 'utf-8' });

  return <CodeDemoContainer code={file} language={language} />;
};

CodeDemo.displayName = 'CodeDemo';
