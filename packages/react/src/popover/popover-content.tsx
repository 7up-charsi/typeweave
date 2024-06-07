import { PopperFloating, PopperFloatingProps } from '../popper';
import { VisuallyHidden } from '../visually-hidden';
import React from 'react';
import { usePopoverCtx } from './popover-root';
import { useClickOutside } from '../use-click-outside';
import { createContextScope } from '../context';
import { FocusTrap } from '../focus-trap';
import { mergeRefs } from '@typeweave/react-utils';
import { PopoverVariantProps, popoverStyles } from './popover-styles';

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
        <FocusTrap loop={loop} trapped={trapped} asChild>
          <div
            {...restProps}
            ref={mergeRefs(ref, setOutsideEle)}
            role="dialog"
            id={popoverCtx.contentId}
            className={styles.content({ className })}
          >
            <VisuallyHidden>
              <button onPointerUp={popoverCtx.handleClose}>close </button>
            </VisuallyHidden>

            {children}

            <VisuallyHidden>
              <button onPointerUp={popoverCtx.handleClose}>close </button>
            </VisuallyHidden>
          </div>
        </FocusTrap>
      </PopperFloating>
    </PopoverStyles>
  );
});

PopoverContent.displayName = displayName;
