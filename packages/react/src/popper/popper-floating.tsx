import {
  Boundary,
  DetectOverflowOptions,
  FlipOptions,
  Padding,
  Side,
  Strategy,
  UseFloatingOptions,
  UseFloatingReturn,
  autoUpdate,
  flip,
  hide,
  limitShift,
  offset,
  shift,
  useFloating,
  arrow as arrowMiddleware,
} from '@floating-ui/react-dom';
import { Slot } from '../slot';
import { mergeRefs } from '@webbo-ui/react-utils';
import React from 'react';
import { usePopperCtx } from './popper-root';
import { useSize } from '../use-size';
import { createContextScope } from '../context';

export interface PopperFloatingProps {
  children?:
    | React.ReactNode
    | ((props: {
        floatingRef: UseFloatingReturn['refs']['setFloating'];
        style: React.CSSProperties;
      }) => React.ReactNode);
  /**
   * The strategy to use when positioning the floating element.
   * @default fixed
   */
  strategy?: Strategy;
  placement?: UseFloatingOptions['placement'];
  updatePositionStrategy?: 'optimized' | 'always';
  /**
   * Represents the distance (gutter or margin) between the floating element and the reference element
   *
   * @see {@link https://floating-ui.com/docs/offset#mainaxis mainaxis}
   * @default 0
   */
  mainOffset?: number;
  /**
   * Represents the skidding between the floating element and the reference element
   *
   * @see {@link https://floating-ui.com/docs/offset#alignmentaxis alignmentaxis}
   * @default 0
   */
  alignOffset?: number;
  arrow?: boolean;
  /**
   * This describes the padding between the arrow and the edges of the floating element. If your floating element has border-radius, this will prevent it from overflowing the corners.
   *
   * @see {@link https://floating-ui.com/docs/arrow#padding padding}
   * @default 0
   */
  arrowPadding?: number;
  sticky?: 'partial' | 'always';
  hideWhenDetached?: boolean;
  /**
   * @see {@link https://floating-ui.com/docs/flip#fallbackplacements fallbackPlacements}
   */
  fallbackPlacements?: FlipOptions['fallbackPlacements'];
  /**
   * @see {@link https://floating-ui.com/docs/flip#mainaxis mainAxis}
   * @default true
   */
  allowMainAxisFlip?: boolean;
  /**
   * when "sticky" prop is "partial" then its value will be false and it will not effect
   *
   * @see {@link https://floating-ui.com/docs/flip#crossaxis crossAxis}
   * @default true
   */
  allowCrossAxisFlip?: boolean;
  /**
   * This describes the virtual padding around the boundary to check for overflow.
   *
   * @see {@link https://floating-ui.com/docs/detectoverflow#padding padding}
   * @default 0
   */
  boundaryPadding?: Padding;
  /**
   * This describes the clipping element(s) or area that overflow will be checked relative to.
   *
   * @see {@link https://floating-ui.com/docs/detectoverflow#boundary boundary}
   * @default clippingAncestors
   */
  clippingBoundary?: Boundary;
}

const Comp_Name = 'PopperFloating';

interface ArrowCtxProps {
  side: Side;
  arrowX?: number;
  arrowY?: number;
  setArrow: React.Dispatch<React.SetStateAction<HTMLSpanElement | null>>;
  shouldHideArrow: boolean;
}

const [ArrowCtx, useArrowCtx] = createContextScope<ArrowCtxProps>(Comp_Name);

export { useArrowCtx };

export const PopperFloating = React.forwardRef<
  HTMLElement,
  PopperFloatingProps
>((props, ref) => {
  const {
    children,
    strategy = 'fixed',
    placement: placementProp,
    updatePositionStrategy = 'optimized',
    mainOffset = 0,
    alignOffset = 0,
    arrow: arrowProp = true,
    arrowPadding = 0,
    sticky = 'partial',
    hideWhenDetached = true,
    fallbackPlacements,
    allowCrossAxisFlip = true,
    allowMainAxisFlip = true,
    boundaryPadding = 0,
    clippingBoundary = 'clippingAncestors',
  } = props;

  const popperCtx = usePopperCtx(Comp_Name);
  const [arrow, setArrow] = React.useState<HTMLSpanElement | null>(null);
  const arrowSize = useSize(arrow);
  const referenceSize = useSize(popperCtx.reference);

  const detectOverflow: DetectOverflowOptions = {
    padding:
      typeof boundaryPadding === 'number'
        ? boundaryPadding
        : { top: 0, left: 0, right: 0, bottom: 0, ...boundaryPadding },
    boundary: clippingBoundary,
  };

  const { middlewareData, placement, floatingStyles, refs } = useFloating({
    strategy,
    placement: placementProp,
    elements: { reference: popperCtx.reference },
    whileElementsMounted: (...args) =>
      autoUpdate(...args, {
        animationFrame: updatePositionStrategy === 'always',
      }),
    middleware: [
      offset({
        mainAxis: mainOffset + (arrowSize?.height ?? 0),
        alignmentAxis: alignOffset,
      }),
      !allowMainAxisFlip && !allowCrossAxisFlip
        ? false
        : flip({
            fallbackPlacements,
            mainAxis: allowMainAxisFlip,
            crossAxis: sticky === 'partial' ? false : allowCrossAxisFlip,
            ...detectOverflow,
          }),
      sticky === 'partial' &&
        shift({
          ...detectOverflow,
          limiter: limitShift({
            offset: ({ placement, elements }) =>
              placement.includes('top') || placement.includes('bottom')
                ? elements.reference.offsetWidth / 2
                : elements.reference.offsetHeight / 2,
          }),
        }),
      arrowProp && arrowMiddleware({ padding: arrowPadding, element: arrow }),
      hideWhenDetached &&
        hide({ strategy: 'referenceHidden', ...detectOverflow }),
    ],
  });

  const arrowData = middlewareData.arrow;
  const hideData = middlewareData.hide;

  const childrenProps = {
    floatingRef: refs.setFloating,
    style: {
      ...floatingStyles,
      visibility: (hideData?.referenceHidden
        ? 'hidden'
        : 'visible') as React.CSSProperties['visibility'],
      '--reference-width': `${referenceSize?.width}px`,
      '--reference-height': `${referenceSize?.height}px`,
    },
  };

  return (
    <ArrowCtx
      arrowX={arrowData?.x}
      arrowY={arrowData?.y}
      side={placement.split('-')[0] as Side}
      setArrow={setArrow}
      shouldHideArrow={!!hideData?.referenceHidden}
    >
      {typeof children === 'function' ? (
        children(childrenProps)
      ) : (
        <Slot<HTMLElement, React.HTMLAttributes<HTMLElement>>
          ref={mergeRefs(refs.setFloating, ref)}
          style={childrenProps.style}
        >
          {children}
        </Slot>
      )}
    </ArrowCtx>
  );
});

PopperFloating.displayName = 'PopperFloating';
