import React from 'react';
import { Coords, Placement, Side } from '@floating-ui/react-dom';
import { createContextScope } from '../context';
import { floatingArrowStyles } from './floating-arrow.styles';

export interface FloatingArrowProps {
  className?: string;
  /** size of default arrow in px
   * @default 5
   */
  size?: number;
  children?: (
    props: {
      style: React.CSSProperties;
      side: Side;
      isInCenter: boolean;
    } & React.RefAttributes<HTMLElement | SVGSVGElement>,
  ) => React.ReactNode;
}

const displayName = 'FloatingArrow';

interface FloatingArrowCtxProps extends Partial<Coords> {
  placement: Placement;
  centerOffset?: number;
  alignmentOffset?: number;
  setFloatingArrow: React.Dispatch<
    React.SetStateAction<HTMLElement | SVGSVGElement | null>
  >;
}

const [FloatingArrowCtx, useFloatingArrowCtx] =
  createContextScope<FloatingArrowCtxProps>(displayName);

export { FloatingArrowCtx };

export const FloatingArrow = (props: FloatingArrowProps) => {
  const { children, className, size = 5 } = props;

  const ctx = useFloatingArrowCtx(displayName);

  const styles = React.useMemo(() => floatingArrowStyles(), []);

  const side = (ctx.placement.split('-')[0] as Side) ?? '';

  const style: React.CSSProperties = {
    position: 'absolute',
    top:
      (side === 'top' && '100%') || (ctx?.y !== undefined ? `${ctx.y}px` : ''),
    bottom: side === 'bottom' ? '100%' : '',
    left:
      (side === 'left' && '100%') || (ctx?.x !== undefined ? `${ctx.x}px` : ''),
    right: side === 'right' ? '100%' : '',
    rotate:
      (side === 'top' && '180deg') ||
      (side === 'bottom' && '0deg') ||
      (side === 'left' && '90deg') ||
      (side === 'right' && '-90deg') ||
      'none', // none is only to satisfy ts
  };

  const isInCenter =
    ctx.centerOffset !== undefined ? ctx.centerOffset !== 0 : false;

  if (!children) {
    return (
      <div
        data-hide={isInCenter}
        style={{ ...style, ...{ '--arrow-size': `${size}px` } }}
        ref={ctx.setFloatingArrow}
        className={styles.base({ className })}
      />
    );
  }

  if (typeof children !== 'function')
    throw new Error(
      `${displayName}: \`children\` must be type of \`function\``,
    );

  return (
    <>
      {children({
        ref: ctx.setFloatingArrow,
        style,
        side,
        isInCenter,
      })}
    </>
  );
};

FloatingArrow.displayName = displayName;
