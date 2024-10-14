import { PopperFloating, PopperFloatingProps } from '../popper';
import React from 'react';
import { usePopoverCtx } from './popover-root';
import { useClickOutside } from '../use-click-outside';
import { createContextScope } from '../context';
import { mergeRefs } from '@typeweave/react-utils/merge-refs';
import { PopoverVariantProps, popoverStyles } from './popover.styles';

export interface PopoverContentProps
  extends Omit<PopperFloatingProps, 'children'>,
    PopoverVariantProps,
    React.HTMLAttributes<HTMLDivElement> {
  loop?: boolean;
  trapped?: boolean;
}

const displayName = 'PopoverContent';

const [PopoverStyles, usePopoverStyles] =
  createContextScope<ReturnType<typeof popoverStyles>>(displayName);

export { usePopoverStyles };

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>((props, ref) => {
  const {
    children,
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
    loop = true,
    trapped = true,
    arrowPadding = 10,
    boundaryPadding = 10,
    ...restProps
  } = props;

  const [mounted, setMounted] = React.useState(false);

  const popoverCtx = usePopoverCtx(displayName);

  const setOutsideEle = useClickOutside({
    disabled: !mounted,
    callback: (e) => {
      if ((e.target as HTMLElement).closest('[role=dialog]')) return;
      if (e.target === popoverCtx.triggerRef.current) return;

      popoverCtx.handleClose();
    },
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const styles = React.useMemo(() => popoverStyles(), []);

  return (
    <PopoverStyles {...styles}>
      <PopperFloating
        arrowPadding={arrowPadding}
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
        boundaryPadding={boundaryPadding}
      >
        <div
          {...restProps}
          ref={mergeRefs(ref, setOutsideEle)}
          role="dialog"
          id={popoverCtx.contentId}
          className={styles.content({ className })}
        >
          {children}
        </div>
      </PopperFloating>
    </PopoverStyles>
  );
});

PopoverContent.displayName = displayName;
