import React from 'react';
import { useTooltipCtx } from './tooltip-root';
import { TooltipVariantProps, tooltipStyles } from './tooltip.styles';
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
import { createContextScope } from '../context';
import { mergeRefs } from '@typeweave/react-utils/merge-refs';
import { FloatingArrowCtx } from '../floating-arrow';

export interface TooltipContentProps
  extends TooltipVariantProps,
    React.HTMLAttributes<HTMLDivElement> {
  disableInteractive?: boolean;
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

const displayName = 'TooltipContent';

const [TooltipStyles, useTooltipStyles] =
  createContextScope<ReturnType<typeof tooltipStyles>>(displayName);

export { useTooltipStyles };

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  TooltipContentProps
>((props, ref) => {
  const {
    disableInteractive,
    children,
    className,
    offset = 5,
    arrowPadding = 10,
    placement = 'bottom',
    strategy = 'absolute',
    ...restProps
  } = props;

  const tooltipCtx = useTooltipCtx(displayName);

  const styles = React.useMemo(() => tooltipStyles({ className }), [className]);

  const [floatingArrow, setFloatingArrow] = React.useState<
    HTMLElement | SVGSVGElement | null
  >(null);

  const floatingReturn = useFloating<HTMLButtonElement>({
    open: tooltipCtx.open,
    placement,
    elements: { reference: tooltipCtx.triggerEle },
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
    <div
      {...restProps}
      data-hide={!!floatingReturn.middlewareData.hide?.referenceHidden}
      style={{
        ...restProps.style,
        ...floatingReturn.floatingStyles,
      }}
      ref={mergeRefs(ref, floatingReturn.refs.setFloating)}
      role="tooltip"
      className={styles.content({ className })}
      onMouseEnter={(e) => {
        restProps.onMouseEnter?.(e);

        if (disableInteractive) return;
        tooltipCtx.showTooltip(true);
      }}
      onMouseLeave={(e) => {
        restProps.onMouseLeave?.(e);

        if (disableInteractive) return;
        tooltipCtx.hideTooltip(false);
      }}
    >
      <TooltipStyles {...styles}>
        <FloatingArrowCtx {...floatingArrowProps}>{children}</FloatingArrowCtx>
      </TooltipStyles>
    </div>
  );
});

TooltipContent.displayName = displayName;
