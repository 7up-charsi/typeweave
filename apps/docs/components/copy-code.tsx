import {
  Button,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@typeweave/react';
import React from 'react';
import { Copy, CopyCheck } from 'lucide-react';

interface CopyCodeProps {
  code: string;
}

export const CopyCode = (props: CopyCodeProps) => {
  const { code } = props;

  const [isCopied, setIsCopied] = React.useState(false);
  const resetTimer = React.useRef<NodeJS.Timeout | undefined>(
    undefined,
  );

  return (
    <TooltipRoot>
      <TooltipTrigger>
        <Button
          isIconOnly
          size="sm"
          aria-label="copy code"
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
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent>
          <TooltipArrow />

          {isCopied ? 'copied' : 'Copy code'}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  );
};

CopyCode.displayName = 'CopyCode';
