import React from 'react';

type Direction = 'horizontal' | 'vertical' | 'both';

export interface UseScrollLockProps<E> {
  /**
   * Ref of element on which scroll will be locked
   * @default document?.body
   */
  ref?: React.RefObject<E | null>;
  /**
   * @default true
   */
  isLocked?: boolean;
  /**
   * Which scroll dirction to lock
   * @default both
   */
  direction?: Direction;
}

export const useScrollLock = <E extends HTMLElement>(
  props: UseScrollLockProps<E> = {},
) => {
  const { ref, isLocked = true, direction = 'both' } = props;

  const handleUnlock = React.useCallback(() => {
    const ele = ref?.current || document.body;

    const lockObj = lockManager.get(ele);

    lockManager.set(
      ele,
      lockObj
        ? {
            style: lockObj.style,
            lockCount: Math.max(0, lockObj.lockCount - 1),
          }
        : { lockCount: 0, style: undefined },
    );

    const updatedLockObject = lockManager.get(ele);

    if (
      updatedLockObject === undefined ||
      !updatedLockObject.style ||
      updatedLockObject.lockCount !== 0
    )
      return;

    lockManager.set(ele, {
      lockCount: 0,
      style: undefined,
    });

    const { paddingBottom, paddingRight, overflowY, overflowX } =
      updatedLockObject.style;

    if (direction === 'both') {
      ele.style.overflowY = overflowY;
      ele.style.overflowX = overflowX;
      ele.style.paddingRight = paddingRight;
      ele.style.paddingBottom = paddingBottom;
    }

    if (direction === 'vertical') {
      ele.style.overflowY = overflowY;
      ele.style.paddingRight = paddingRight;
    }

    if (direction === 'horizontal') {
      ele.style.overflowX = overflowX;
      ele.style.paddingBottom = paddingBottom;
    }
  }, [direction, ref]);

  React.useEffect(() => {
    return () => {
      handleUnlock();
    };
  }, [handleUnlock]);

  React.useEffect(() => {
    if (!isLocked) {
      handleUnlock();
      return;
    }

    const ele = ref?.current || document.body;

    const lockObj = lockManager.get(ele);

    // I'm updating the style object bellow to prevent repeated updates when this hook is called multiple times with the same element (e.g., nested dialogs). My goal is to store the initial style object when the hook is first called, regardless of subsequent calls with the same element. Later in handleUnlock, I'll reset the element's padding and overflow settings using the cached style object from the first call.
    lockManager.set(
      ele,
      // if lockObj is not true, its first time this element gets locked.
      lockObj
        ? { style: lockObj.style, lockCount: lockObj.lockCount + 1 }
        : { lockCount: 1, style: undefined },
    );

    const updatedLockObject = lockManager.get(ele);

    if (updatedLockObject === undefined || updatedLockObject.lockCount > 1)
      return;

    lockManager.set(ele, {
      lockCount: updatedLockObject.lockCount,
      // update style object here on 1st time lock, even if hook is called multiple times with same element
      style: {
        paddingBottom: ele.style.paddingBottom,
        paddingRight: ele.style.paddingRight,
        overflowY: ele.style.overflowY,
        overflowX: ele.style.overflowX,
      },
    });

    const isBody = !ref?.current;

    const verticalScrollBarWidth = isBody
      ? innerWidth - document?.documentElement.offsetWidth
      : ele.offsetWidth - ele.clientWidth;

    const horizontalScrollBarHeight = isBody
      ? innerHeight - document?.documentElement.offsetHeight
      : ele.offsetHeight - ele.clientHeight;

    const computedStyles = getComputedStyle(ele);

    const originalPaddingRight = computedStyles.paddingRight;
    const originalPaddingBottom = computedStyles.paddingBottom;

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
  }, [direction, isLocked, ref, handleUnlock]);
};

type LockObject = {
  lockCount: number;
  style?: {
    paddingBottom: string;
    paddingRight: string;
    overflowY: string;
    overflowX: string;
  };
};

const lockManager = new Map<HTMLElement, LockObject>();
