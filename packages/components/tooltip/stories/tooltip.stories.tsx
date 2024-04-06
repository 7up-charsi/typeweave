import React from 'react';
import * as Tooltip from '../src';

const meta = {
  title: 'Components/Tooltip',
};

export default meta;

const Template = (args: Tooltip.RootProps & Tooltip.ContentProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'instant',
      block: 'center',
      inline: 'center',
    });
  }, []);

  return (
    <div className="w-[300vw] h-[300vh] flex items-center justify-center">
      <div ref={ref} className="flex items-center justify-center gap-4">
        {Array.from({ length: 4 }).map((_ele, i) => (
          <Tooltip.Root key={i} defaultOpen={i === 0 ? true : undefined}>
            <Tooltip.Trigger>
              <button
                className="p-10 border disabled:disabled"
                disabled={i === 2}
              >
                button
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content disableInteractive={args.disableInteractive}>
                i am tooltip
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
      </div>
    </div>
  );
};

export const Default = {
  render: Template,
};
