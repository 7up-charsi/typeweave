import path from 'path';
import { Code } from './code';
import { readFile } from 'fs/promises';
import { CollapsibleCode } from './collapsible-code';

interface Props {
  source?: string;
  preview?: React.ReactNode;
  language?: string;
}

export const CodeDemo = async (props: Props) => {
  const { preview, source, language = 'tsx' } = props;

  if (!source) return;

  const file = await readFile(path.resolve(`./components/demos/${source}`), {
    encoding: 'utf-8',
  });

  return (
    <div>
      {preview && (
        <div className="rounded border border-muted-6 p-3">{preview}</div>
      )}

      <CollapsibleCode code={file}>
        <Code children={file} className={`language-${language}`} />
      </CollapsibleCode>
    </div>
  );
};
