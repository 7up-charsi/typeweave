import { readFileSync } from 'fs';
import path from 'path';
import { SyntaxHighlight } from './syntax-highlight';
import { CollapsibleCodeSource } from './collapsible-code-source';

interface Props {
  source?: string;
}

export const CodeSource = ({ source }: Props) => {
  const file = readFileSync(path.resolve(`./components/demos/${source}`), {
    encoding: 'utf-8',
  });

  return (
    <CollapsibleCodeSource>
      <code className="language-tsx">
        <SyntaxHighlight code={file} language="tsx" />
      </code>
    </CollapsibleCodeSource>
  );
};
