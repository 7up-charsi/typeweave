'use client';

import { Button } from '@typeweave/react';
import React from 'react';
import { Copy, CopyCheck } from 'lucide-react';

interface CopyButtonProps {
  code: string;
  className?: string;
}

export const CopyButton = (props: CopyButtonProps) => {
  const { code, className } = props;

  const [isCopied, setIsCopied] = React.useState(false);
  const resetTimer = React.useRef<NodeJS.Timeout | undefined>(
    undefined,
  );

  return (
    <Button
      isIconOnly
      size="sm"
      aria-label="copy"
      className={className}
      color={isCopied ? 'success' : 'default'}
      onPress={() => {
        clearTimeout(resetTimer.current);

        navigator.clipboard.writeText(code);
        setIsCopied(true);
        resetTimer.current = setTimeout(() => {
          setIsCopied(false);
          resetTimer.current = undefined;
        }, 1000);
      }}
    >
      {isCopied ? <CopyCheck /> : <Copy />}
    </Button>
  );
};

CopyButton.displayName = 'CopyButton';
