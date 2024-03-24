import path from 'path';
import { Code } from './code';
import { access, readFile } from 'fs/promises';
import { CollapsibleCode } from './collapsible-code';
import { ReactRunner } from './react-runner';
import * as React from 'react';

interface Props {
  source?: string;
  language?: string;
}

export const CodeDemo = async (props: Props) => {
  const { source, language = 'tsx' } = props;

  if (!source) return;

  const filePath = path.resolve(`content/docs/components/${source}.tsx`);

  try {
    await access(filePath);
  } catch (err) {
    return null;
  }

  const file = await readFile(filePath, { encoding: 'utf-8' });

  return (
    <>
      <div className="mt-4 rounded border border-muted-6 p-3">
        <ReactRunner code={file} />
      </div>

      <CollapsibleCode code={file}>
        <Code children={file} className={`language-${language}`} />
      </CollapsibleCode>
    </>
  );
};
