'use client';

import { CheckIcon, Copy } from 'lucide-react';
import React from 'react';

interface CopyCodeButtonProps {
  code: string;
}

export const CopyCodeButton = (props: CopyCodeButtonProps) => {
  const { code } = props;

  const [isCopied, setIsCopied] = React.useState(false);

  const resetTimer = React.useRef<NodeJS.Timeout | undefined>(
    undefined,
  );

  return (
    <button
      aria-label="copy"
      onClick={() => {
        clearTimeout(resetTimer.current);

        navigator.clipboard.writeText(code);
        setIsCopied(true);
        resetTimer.current = setTimeout(() => {
          setIsCopied(false);
          resetTimer.current = undefined;
        }, 1000);
      }}
      className="absolute right-2 top-2 hidden size-7 items-center justify-center rounded bg-white/20 text-base backdrop-blur-sm dynamic-icon group-hover/code-block:flex hover:bg-white/30"
    >
      {isCopied ? <CheckIcon /> : <Copy />}
    </button>
  );
};

CopyCodeButton.displayName = 'CopyCodeButton';
