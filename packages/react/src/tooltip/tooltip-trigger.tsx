import React from 'react';
import { useTooltipCtx } from './tooltip-root';
import { Slot } from '../slot';
import { mergeRefs } from '@typeweave/react-utils/merge-refs';

export interface TooltipTriggerProps
  extends React.HTMLAttributes<HTMLElement> {}

const displayName = 'TooltipTrigger';

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  TooltipTriggerProps
>((props, ref) => {
  const { ...restProps } = props;

  const tooltipCtx = useTooltipCtx(displayName);

  const isMouseRef = React.useRef(false);

  return (
    <Slot<HTMLElement, React.HTMLAttributes<HTMLElement>>
      {...restProps}
      ref={mergeRefs(ref, tooltipCtx.setTriggerEle)}
      tabIndex={0}
      data-open={tooltipCtx.open}
      onMouseDown={(e) => {
        restProps.onMouseDown?.(e);

        isMouseRef.current = true;
        tooltipCtx.hideTooltip(true);
      }}
      onMouseEnter={(e) => {
        restProps.onMouseEnter?.(e);

        if (tooltipCtx.trigger === 'focus') return;

        tooltipCtx.showTooltip(false);
      }}
      onMouseLeave={(e) => {
        restProps.onMouseLeave?.(e);

        isMouseRef.current = false;

        if (tooltipCtx.trigger === 'focus') return;

        tooltipCtx.hideTooltip(false);
      }}
      onKeyDown={(e) => {
        restProps.onKeyDown?.(e);

        const key = e.key;

        if (key === 'Tab' || (key === 'Tab' && e.shiftKey))
          isMouseRef.current = false;
      }}
      onFocus={(e) => {
        restProps?.onFocus?.(e);

        if (tooltipCtx.trigger === 'hover' || isMouseRef.current) return;

        tooltipCtx.showTooltip(true);
      }}
      onBlur={(e) => {
        restProps.onBlur?.(e);

        if (tooltipCtx.trigger === 'hover' || isMouseRef.current) return;

        tooltipCtx.hideTooltip(true);
      }}
    />
  );
});

TooltipTrigger.displayName = displayName;
