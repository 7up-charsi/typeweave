import React from 'react';
import { useArrowCtx } from './popper-floating';
import { Side } from '@floating-ui/react-dom';

export interface PopperArrowProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, 'children'> {}

const displayName = 'PopperArrow';

const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

export const PopperArrow = React.forwardRef<SVGSVGElement, PopperArrowProps>(
  (props, ref) => {
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
        <svg
          {...props}
          width={props.width || 9}
          height={props.height || 5}
          ref={ref}
          viewBox="0 0 30 10"
          preserveAspectRatio="none"
          style={{ ...props.style, fill: 'var(--arrowFill)' }}
        >
          <polygon points="0,0 30,0 15,10" />
        </svg>
      </span>
    );
  },
);

PopperArrow.displayName = displayName;
