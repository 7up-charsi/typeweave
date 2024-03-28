import path from 'path';
import { access, readFile } from 'fs/promises';
import { CodeDemoCode } from './code-demo-code';
import { CodeDemoPreview } from './code-demo-preview';

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
      <CodeDemoPreview>{preview}</CodeDemoPreview>
      <CodeDemoCode code={code} />
    </div>
  );
};

CodeDemo.displayName = 'CodeDemo';
