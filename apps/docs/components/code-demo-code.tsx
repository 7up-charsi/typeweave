'use client';

import React from 'react';
import { CopyCode } from './copy-code';
import { Button } from '@webbo-ui/button';
import { Code } from './code';
import { WrapLines } from './wrap-lines';

interface Props {
  code: string;
}

export const CodeDemoCode = (props: Props) => {
  const { code } = props;

  const [isCodeHide, setIsCodeHide] = React.useState(true);
  const [isWrapped, setIsWrapped] = React.useState(false);

  return (
    <>
      <div
        data-rounded={isCodeHide}
        className="flex h-14 items-center justify-end gap-3 border border-inherit px-5 data-[rounded=true]:rounded-b"
      >
        {isCodeHide ? null : (
          <WrapLines
            isWrapped={isWrapped}
            toggleWrap={() => setIsWrapped((prev) => !prev)}
          />
        )}

        <div className="grow"></div>

        <Button onPress={() => setIsCodeHide((prev) => !prev)} size="sm">
          {isCodeHide ? 'show code' : 'hide code'}
        </Button>

        <CopyCode code={code} />
      </div>

      {isCodeHide ? null : (
        <div className="overflow-hidden rounded-b border border-t-0 border-inherit">
          <div className="max-h-[70vh] min-w-full max-w-full overflow-auto">
            <pre
              data-wrap-lines={isWrapped}
              className="mt-0 rounded-none border-0 data-[wrap-lines=true]:whitespace-pre-wrap"
            >
              <Code className="language-tsx">{code}</Code>
            </pre>
          </div>
        </div>
      )}
    </>
  );
};

CodeDemoCode.displayName = 'CodeDemoCode';
