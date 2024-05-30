import {
  Button,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@typeweave/react';
import { TextIcon, WrapTextIcon } from 'lucide-react';

export interface WrapLinesProps {
  isWrapped?: boolean;
  toggleWrap?: () => void;
}

export const WrapLines = (props: WrapLinesProps) => {
  const { isWrapped, toggleWrap } = props;

  return (
    <TooltipRoot>
      <TooltipTrigger>
        <Button
          size="sm"
          isIconOnly
          aria-label="wrap lines"
          onPress={toggleWrap}
        >
          {isWrapped ? <TextIcon /> : <WrapTextIcon />}
        </Button>
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent>
          <TooltipArrow />

          {isWrapped ? 'unwrap lines' : 'wrap lines'}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  );
};

WrapLines.displayName = 'WrapLines';
