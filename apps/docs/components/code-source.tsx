import { readFileSync } from 'fs';
import path from 'path';
import { SyntaxHighlight } from './syntax-highlight';

interface Props {
  source?: string;
}

export const CodeSource = ({ source }: Props) => {
  const file = readFileSync(path.resolve(`./components/demos/${source}`), {
    encoding: 'utf-8',
  });

  return (
    <pre className="language-tsx min-h-40 max-h-[400px]">
      <code className="language-tsx">
        <SyntaxHighlight code={file} language="tsx" />
      </code>
    </pre>
  );
};
