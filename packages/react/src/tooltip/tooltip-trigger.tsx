import React from 'react';
import { PopperReference } from '../popper';
import { useTooltipCtx } from './tooltip-root';
import { Slot } from '../slot';

export interface TooltipTriggerProps
  extends React.HTMLAttributes<HTMLElement> {}

const displayName = 'TooltipTrigger';

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  TooltipTriggerProps
>((props, ref) => {
  const { ...restProps } = props;

  const context = useTooltipCtx(displayName);

  const isMouseRef = React.useRef(false);

  return (
    <PopperReference>
      <Slot<HTMLElement, React.HTMLAttributes<HTMLElement>>
        {...restProps}
        ref={ref}
        tabIndex={0}
        data-open={context.open}
        onMouseDown={(e) => {
          restProps.onMouseDown?.(e);

          isMouseRef.current = true;
          context.hideTooltip(true);
        }}
        onMouseEnter={(e) => {
          restProps.onMouseEnter?.(e);

          if (context.trigger === 'focus') return;

          context.showTooltip(false);
        }}
        onMouseLeave={(e) => {
          restProps.onMouseLeave?.(e);

          isMouseRef.current = false;

          if (context.trigger === 'focus') return;

          context.hideTooltip(false);
        }}
        onKeyDown={(e) => {
          restProps.onKeyDown?.(e);

          const key = e.key;

          if (key === 'Tab' || (key === 'Tab' && e.shiftKey))
            isMouseRef.current = false;
        }}
        onFocus={(e) => {
          restProps?.onFocus?.(e);

          if (context.trigger === 'hover' || isMouseRef.current) return;

          context.showTooltip(true);
        }}
        onBlur={(e) => {
          restProps.onBlur?.(e);

          if (context.trigger === 'hover' || isMouseRef.current) return;

          context.hideTooltip(true);
        }}
      />
    </PopperReference>
  );
});

TooltipTrigger.displayName = displayName;
