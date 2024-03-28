import path from 'path';
import { access, readFile } from 'fs/promises';
import { DemoCode } from './demo-code';
import { DemoPreview } from './demo-preview';

interface DemoProps {
  source?: string;
  preview?: string;
}

export const Demo = async (props: DemoProps) => {
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
      <DemoPreview>{preview}</DemoPreview>
      <DemoCode code={code} />
    </div>
  );
};

Demo.displayName = 'Demo';
