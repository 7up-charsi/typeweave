import React from 'react';
import { useArrowCtx, useMenuStyles } from './menu-content';
import { Side } from '@floating-ui/react-dom';

export interface MenuArrowProps {
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

const displayName = 'MenuArrow';

const STYLES: React.CSSProperties = {
  position: 'absolute',
  top: 'var(--arrow-top)',
  bottom: 'var(--arrow-bottom)',
  left: 'var(--arrow-left)',
  right: 'var(--arrow-right)',
  rotate: 'var(--arrow-rotate)',
};

export const MenuArrow = (props: MenuArrowProps) => {
  const { children, className, size = 5 } = props;

  const arrowCtx = useArrowCtx(displayName);
  const styles = useMenuStyles(displayName);

  if (!children) {
    return (
      <div
        data-hide={!arrowCtx.isInCenter}
        style={{ ...STYLES, ...{ '--arrow-size': `${size}px` } }}
        ref={arrowCtx.setArrowEle}
        className={styles.arrow({ className })}
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
        ref: arrowCtx.setArrowEle,
        style: STYLES,
        side: arrowCtx.side as Side,
        isInCenter: arrowCtx.isInCenter,
      })}
    </>
  );
};

MenuArrow.displayName = displayName;
