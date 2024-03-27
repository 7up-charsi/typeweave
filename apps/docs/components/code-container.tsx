'use client';

import React from 'react';
import { CopyCode } from './copy-code';
import { Button } from '@webbo-ui/button';
import { Code } from './code';

interface Props {
  code: string;
  language: string;
}

export const CodeContainer = (props: Props) => {
  const { code, language } = props;

  const [isCodeHide, setIsCodeHide] = React.useState(true);

  return (
    <>
      <div
        data-rounded={isCodeHide}
        className="flex h-14 items-center justify-end gap-3 border border-inherit px-5 data-[rounded=true]:rounded-b"
      >
        <CopyCode code={code} />

        <Button onPress={() => setIsCodeHide((prev) => !prev)} size="sm">
          {isCodeHide ? 'show code' : 'hide code'}
        </Button>
      </div>

      {isCodeHide ? null : (
        <div className="min-w-full rounded-b border border-t-0 border-inherit">
          <pre className="mt-0 rounded-none border-0">
            <Code className="language-tsx">{code}</Code>
          </pre>
        </div>
      )}
    </>
  );
};

CodeContainer.displayName = 'CodeContainer';
