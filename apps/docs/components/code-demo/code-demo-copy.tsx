import { Button } from '@webbo-ui/button';
import { Icon } from '@webbo-ui/icon';
import React from 'react';
import * as Tooltip from '@webbo-ui/tooltip';
import { useCodeDemoContext } from './code-demo-provider';

export const CodeDemoCopy = () => {
  const [isCopied, setIsCopied] = React.useState(false);
  const resetTimer = React.useRef<NodeJS.Timeout | undefined>(undefined);

  const { onCopy } = useCodeDemoContext('CodeDemoCopy');

  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button
          isIconOnly
          size="sm"
          aria-label="copy code"
          onPress={() => {
            clearTimeout(resetTimer.current);

            onCopy();
            setIsCopied(true);
            resetTimer.current = setTimeout(() => {
              setIsCopied(false);
              resetTimer.current = undefined;
            }, 1000);
          }}
        >
          {isCopied ? copied_svg : copy_svg}
        </Button>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content>
          <Tooltip.Arrow />
          {isCopied ? 'copied' : 'Copy code'}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

CodeDemoCopy.displayName = 'CodeDemoCopy';

const copy_svg = (
  <Icon>
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M7 9v6a4 4 0 0 0 4 4h4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1v2Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M13 3.054V7H9.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 13 3.054ZM15 3v4a2 2 0 0 1-2 2H9v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3Z"
        clipRule="evenodd"
      />
    </svg>
  </Icon>
);

const copied_svg = (
  <Icon>
    <svg fill="none" viewBox="0 0 24 24">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  </Icon>
);
