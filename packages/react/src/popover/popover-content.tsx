import { PopoverVariantProps, popover } from '@typeweave/theme';
import { PopperFloating, PopperFloatingProps } from '../popper';
import { VisuallyHidden } from '../visually-hidden';
import React from 'react';
import { usePopoverCtx } from './popover-root';
import { useClickOutside } from '../use-click-outside';
import { createContextScope } from '../context';
import { FocusTrap } from '../focus-trap';
import { mergeRefs } from '@typeweave/react-utils';

export interface PopoverContentProps
  extends Omit<PopperFloatingProps, 'children'>,
    PopoverVariantProps,
    React.HTMLAttributes<HTMLDivElement> {
  noA11yTitle?: boolean;
  noA11yDescription?: boolean;
  loop?: boolean;
  trapped?: boolean;
}

const displayName = 'PopoverContent';

const [PopoverStyles, usePopoverStyles] =
  createContextScope<ReturnType<typeof popover>>(displayName);

export { usePopoverStyles };

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>((props, ref) => {
  const {
    children,
    className,
    noA11yDescription,
    noA11yTitle,
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

  const popoverCtx = usePopoverCtx(displayName);

  const setOutsideEle = useClickOutside({
    callback: (e) => {
      if (popoverCtx.triggerRef.current?.contains(e.target as Node)) return;
      if ((e.target as HTMLElement).closest('[role=dialog]')) return;

      popoverCtx.handleClose();
    },
  });

  const styles = React.useMemo(() => popover(), []);

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
            aria-labelledby={noA11yTitle ? undefined : popoverCtx.titleId}
            aria-describedby={
              noA11yDescription ? undefined : popoverCtx.descriptionId
            }
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
