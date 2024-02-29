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
    <div className="mt-5">
      <pre className="language-tsx">
        <code className="language-tsx">
          <SyntaxHighlight code={file} language="tsx" />
        </code>
      </pre>
    </div>
  );
};
