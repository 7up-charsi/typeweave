import path from 'path';
import { access, readFile } from 'fs/promises';
import { Code } from './code';
import { CodeContainer } from './code-container';

interface CodeDemoProps {
  source?: string;
  preview?: string;
}

export const CodeDemo = async (props: CodeDemoProps) => {
  const { source, preview } = props;

  if (!source) return;

  const filePath = path.resolve(`components/demos/${source}.tsx`);

  try {
    await access(filePath);
  } catch (err) {
    return null;
  }

  const code = await readFile(filePath, { encoding: 'utf-8' });

  return (
    <div className="border-muted-6">
      <div className="mt-4 flex min-h-48 items-center justify-center rounded-t border border-b-0 border-inherit p-5">
        {preview}
      </div>

      <CodeContainer code={code} language="tsx" />
    </div>
  );
};

CodeDemo.displayName = 'CodeDemo';
