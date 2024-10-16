import React from 'react';
import { usePopoverCtx } from './popover-root';
import { useClickOutside } from '../use-click-outside';
import { createContextScope } from '../context';
import { mergeRefs } from '@typeweave/react-utils/merge-refs';
import { PopoverVariantProps, popoverStyles } from './popover.styles';
import {
  autoUpdate,
  useFloating,
  offset as offsetMiddleware,
  flip as flipMiddleware,
  hide as hideMiddleware,
  arrow as arrowMiddleware,
  shift as shiftMiddleware,
  Placement,
  limitShift,
  Strategy,
} from '@floating-ui/react-dom';
import { FloatingArrowCtx } from '../floating-arrow';

export interface PopoverContentProps
  extends PopoverVariantProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** distance between combobox and listbox
   * @default 5
   */
  offset?: number;
  /** padding used to prevent arrow to touch content edges. its usefull when content has rounded corners.
   * @default 10
   */
  arrowPadding?: number;
  /** @default bottom */
  placement?: Placement;
  /** @default absolute */
  strategy?: Strategy;
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
    offset = 5,
    arrowPadding = 10,
    placement = 'bottom',
    strategy = 'absolute',
    ...restProps
  } = props;

  const popoverCtx = usePopoverCtx(displayName);

  const innerRef = React.useRef<HTMLDivElement>(null);

  const [floatingArrow, setFloatingArrow] = React.useState<
    HTMLElement | SVGSVGElement | null
  >(null);

  const floatingReturn = useFloating<HTMLButtonElement>({
    open: popoverCtx.open,
    placement,
    elements: { reference: popoverCtx.trigger },
    whileElementsMounted: autoUpdate,
    strategy,
    middleware: [
      offsetMiddleware({ mainAxis: offset }),
      flipMiddleware(),
      shiftMiddleware({ limiter: limitShift() }),
      arrowMiddleware({
        element: floatingArrow,
        padding: arrowPadding,
      }),
      hideMiddleware({ strategy: 'referenceHidden' }),
    ],
  });

  React.useEffect(() => {
    if (!floatingReturn.isPositioned) return;

    innerRef.current?.focus();
  }, [floatingReturn.isPositioned]);

  const setOutsideEle = useClickOutside({
    callback: (e) => {
      // if ((e.target as HTMLElement).closest('[role=dialog]')) return;
      if (e.target === popoverCtx.trigger) return;

      popoverCtx.handleClose();
    },
  });

  const styles = React.useMemo(() => popoverStyles(), []);

  const arrowData = floatingReturn.middlewareData.arrow;

  const floatingArrowProps = {
    x: arrowData?.x,
    y: arrowData?.y,
    centerOffset: arrowData?.centerOffset,
    alignmentOffset: arrowData?.alignmentOffset,
    placement,
    setFloatingArrow,
  };

  return (
    <PopoverStyles {...styles}>
      <div
        {...restProps}
        data-hide={!!floatingReturn.middlewareData.hide?.referenceHidden}
        style={{
          ...restProps.style,
          ...floatingReturn.floatingStyles,
        }}
        ref={mergeRefs(
          setOutsideEle,
          ref,
          innerRef,
          floatingReturn.refs.setFloating,
        )}
        tabIndex={-1}
        role="dialog"
        id={popoverCtx.contentId}
        className={styles.content({ className })}
      >
        <FloatingArrowCtx {...floatingArrowProps}>{children}</FloatingArrowCtx>
      </div>
    </PopoverStyles>
  );
});

PopoverContent.displayName = displayName;
