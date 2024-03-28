import { Button } from '@webbo-ui/button';
import * as Tooltip from '@webbo-ui/tooltip';
import { Icon } from '@webbo-ui/icon';

export interface WrapLinesProps {
  isWrapped?: boolean;
  toggleWrap?: () => void;
}

export const WrapLines = (props: WrapLinesProps) => {
  const { isWrapped, toggleWrap } = props;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button
          size="sm"
          isIconOnly
          aria-label="wrap lines"
          onPress={toggleWrap}
        >
          {isWrapped ? (
            <Icon>
              <svg fill="none" viewBox="0 0 15 15">
                <path
                  stroke="currentColor"
                  d="M0 3.5h15m-15 8h15m-15-4h15"
                ></path>
              </svg>
            </Icon>
          ) : (
            <Icon>
              <svg fill="none" viewBox="0 0 24 24">
                <g fill="currentColor">
                  <path d="M2.75 5a.75.75 0 000 1.5h18.5a.75.75 0 000-1.5H2.75zM2.75 11.5a.75.75 0 000 1.5H19a2.5 2.5 0 010 5h-4.44l.72-.72a.75.75 0 10-1.06-1.06l-2 2a.75.75 0 000 1.06l2 2a.75.75 0 101.06-1.06l-.72-.72H19a4 4 0 000-8H2.75z"></path>
                  <path d="M2 18.75a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75z"></path>
                </g>
              </svg>
            </Icon>
          )}
        </Button>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content>
          <Tooltip.Arrow />
          {isWrapped ? 'unwrap lines' : 'wrap lines'}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

WrapLines.displayName = 'WrapLines';
