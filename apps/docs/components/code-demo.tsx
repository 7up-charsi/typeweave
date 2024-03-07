import { readFileSync } from 'fs';
import path from 'path';
import { Code } from './code';

interface Props {
  source?: string;
}

export const CodeDemo = async ({ source }: Props) => {
  if (!source) return;

  const file = readFileSync(path.resolve(`./components/demos/${source}`), {
    encoding: 'utf-8',
  });

  return (
    <>
      <div className="border-test">
        {/* <CodeDemoPreview code={result.code} /> */}
      </div>

      <pre>
        <Code code={file} language="tsx" />
      </pre>
    </>
  );
};
