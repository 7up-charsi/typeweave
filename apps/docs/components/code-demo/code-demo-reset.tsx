import { useCodeDemoContext } from './code-demo-provider';
import * as Tooltip from '@webbo-ui/tooltip';
import { Button } from '@webbo-ui/button';
import { Icon } from '@webbo-ui/icon';

export const CodeDemoReset = () => {
  const { onReset } = useCodeDemoContext('CodeDemoReset');

  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Button isIconOnly size="sm" onPress={onReset} aria-label="reset demo">
          <Icon>
            <svg fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
              />
            </svg>
          </Icon>
        </Button>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content>
          <Tooltip.Arrow />
          Reset demo
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

CodeDemoReset.displayName = 'CodeDemoReset';
