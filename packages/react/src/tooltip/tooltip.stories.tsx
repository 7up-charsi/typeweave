import React from 'react';
import {
  TooltipContent,
  TooltipContentProps,
  TooltipPortal,
  TooltipRoot,
  TooltipRootProps,
  TooltipTrigger,
} from './';
import { FloatingArrow } from '../floating-arrow';

const meta = {
  title: 'Components/Tooltip',
};

export default meta;

const Template = (args: TooltipRootProps & TooltipContentProps) => {
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
          <TooltipRoot key={i} defaultOpen={i === 0 ? true : undefined}>
            <TooltipTrigger>
              <button
                className="p-10 rounded border disabled:disabled"
                disabled={i === 2}
              >
                button
              </button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent disableInteractive={args.disableInteractive}>
                i am tooltip
                <FloatingArrow />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        ))}
      </div>
    </div>
  );
};

export const Default = {
  render: Template,
};
