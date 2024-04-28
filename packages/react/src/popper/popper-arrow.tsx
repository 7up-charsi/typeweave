import React from 'react';
import { useArrowCtx } from './popper-floating';
import { Side } from '@floating-ui/react-dom';
import { Slot } from '../slot';

export interface PopperArrowProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, 'children'> {
  icon?: React.ReactNode;
}

const displayName = 'PopperArrow';

const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

export const PopperArrow = React.forwardRef<SVGSVGElement, PopperArrowProps>(
  (props, ref) => {
    const { icon, ...restProps } = props;

    const arrowCtx = useArrowCtx(displayName);
    const baseSide = OPPOSITE_SIDE[arrowCtx.side];

    return (
      <span
        ref={arrowCtx.setArrow}
        style={{
          position: 'absolute',
          left: arrowCtx.arrowX,
          top: arrowCtx.arrowY,
          [baseSide]: 0,
          transformOrigin: {
            top: '',
            right: '0 0',
            bottom: 'center 0',
            left: '100% 0',
          }[arrowCtx.side],
          transform: {
            top: 'translateY(100%)',
            right: 'translateY(50%) rotate(90deg) translateX(-50%)',
            bottom: `rotate(180deg)`,
            left: 'translateY(50%) rotate(-90deg) translateX(50%)',
          }[arrowCtx.side],
          visibility: arrowCtx.shouldHideArrow ? 'hidden' : 'visible',
        }}
      >
        <Slot
          ref={ref}
          {...restProps}
          style={{ ...props.style, fill: 'var(--arrowFill)' }}
        >
          {icon ?? (
            <svg
              width={9}
              height={5}
              viewBox="0 0 30 10"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 30,0 15,10" />
            </svg>
          )}
        </Slot>
      </span>
    );
  },
);

PopperArrow.displayName = displayName;
