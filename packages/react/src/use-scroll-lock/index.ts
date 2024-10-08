import React from 'react';

type Direction = 'horizontal' | 'vertical' | 'both';

export interface UseScrollLockProps<E> {
  /**
   * Ref of element on which scroll will be locked
   * @default document?.body
   */
  ref?: React.RefObject<E | null>;
  disabled?: boolean;
  /**
   * Which scroll dirction to lock
   * @default both
   */
  direction?: Direction;
}

export const useScrollLock = <E extends HTMLElement>(
  props: UseScrollLockProps<E> = {},
) => {
  const { ref, disabled, direction = 'both' } = props;

  React.useEffect(() => {
    if (disabled) return;

    const isBody = !(ref && ref.current);
    const ele = ref?.current || document.body;

    const computedStyles = getComputedStyle(ele);

    const originalPaddingRight = computedStyles.paddingRight;
    const originalPaddingBottom = computedStyles.paddingBottom;

    const stylePaddingRight = ele.style.paddingRight;
    const stylePaddingBottom = ele.style.paddingBottom;
    const styleOverflowY = ele.style.overflowY;
    const styleOverflowX = ele.style.overflowX;

    const verticalScrollBarWidth = isBody
      ? innerWidth - document?.documentElement.offsetWidth
      : ele.offsetWidth - ele.clientWidth;

    const horizontalScrollBarHeight = isBody
      ? innerHeight - document?.documentElement.offsetHeight
      : ele.offsetHeight - ele.clientHeight;

    const paddingRight = `${
      parseInt(originalPaddingRight, 10) + verticalScrollBarWidth
    }px`;
    const paddingBottom = `${
      parseInt(originalPaddingBottom, 10) + horizontalScrollBarHeight
    }px`;

    if (direction === 'both') {
      ele.style.overflowY = 'hidden';
      ele.style.overflowX = 'hidden';
      ele.style.paddingRight = paddingRight;
      ele.style.paddingBottom = paddingBottom;
    }
    if (direction === 'vertical') {
      ele.style.overflowY = 'hidden';
      ele.style.paddingRight = paddingRight;
    }
    if (direction === 'horizontal') {
      ele.style.overflowX = 'hidden';
      ele.style.paddingBottom = paddingBottom;
    }

    return () => {
      if (direction === 'both') {
        ele.style.overflowY = styleOverflowY;
        ele.style.overflowX = styleOverflowX;
        ele.style.paddingRight = stylePaddingRight;
        ele.style.paddingBottom = stylePaddingBottom;
      }
      if (direction === 'vertical') {
        ele.style.overflowY = styleOverflowY;
        ele.style.paddingRight = stylePaddingRight;
      }
      if (direction === 'horizontal') {
        ele.style.overflowX = styleOverflowX;
        ele.style.paddingBottom = stylePaddingBottom;
      }
    };
  }, [direction, disabled, ref]);
};
