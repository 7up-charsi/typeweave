import { TooltipVariantProps, tooltip } from '@webbo-ui/theme';
import { PopperFloating, PopperFloatingProps } from '../popper';
import React from 'react';
import { useTooltipCtx } from './tooltip-root';

export interface TooltipContentProps
  extends TooltipVariantProps,
    Omit<PopperFloatingProps, 'children'>,
    React.HTMLAttributes<HTMLDivElement> {
  disableInteractive?: boolean;
}

const displayName = 'TooltipContent';

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps
>((props, ref) => {
  const {
    disableInteractive,
    className,
    placement,
    updatePositionStrategy,
    mainOffset,
    alignOffset,
    arrow,
    sticky,
    hideWhenDetached,
    fallbackPlacements,
    allowMainAxisFlip,
    allowCrossAxisFlip,
    clippingBoundary,
    arrowPadding = 10,
    boundaryPadding = 10,
    ...restProps
  } = props;

  const context = useTooltipCtx(displayName);

  const styles = tooltip({ className });

  return (
    <PopperFloating
      placement={placement}
      updatePositionStrategy={updatePositionStrategy}
      mainOffset={mainOffset}
      alignOffset={alignOffset}
      arrow={arrow}
      sticky={sticky}
      hideWhenDetached={hideWhenDetached}
      fallbackPlacements={fallbackPlacements}
      allowMainAxisFlip={allowMainAxisFlip}
      allowCrossAxisFlip={allowCrossAxisFlip}
      clippingBoundary={clippingBoundary}
      arrowPadding={arrowPadding}
      boundaryPadding={boundaryPadding}
    >
      <div
        {...restProps}
        ref={ref}
        role="tooltip"
        className={styles}
        onPointerEnter={() => {
          if (disableInteractive) return;
          context.showTooltip(true);
        }}
        onPointerLeave={() => {
          if (disableInteractive) return;
          context.hideTooltip(false);
        }}
      />
    </PopperFloating>
  );
});

TooltipContent.displayName = displayName;
