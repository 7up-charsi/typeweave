import React from 'react';
import { useCallbackRef } from '../use-callback-ref';

export interface UseClickOutsideProps {
  /**
   * This will execute when user click outside of `ref`
   */
  callback?: (e: MouseEvent) => void;
  disabled?: boolean;
  /**
   * Indicates which button was pressed on the mouse to execute the `callback`
   *
   * 0: Main button pressed, usually the left button or the un-initialized state
   * 1: Auxiliary button pressed, usually the wheel button or the middle button (if present)
   * 2: Secondary button pressed, usually the right button
   * 3: Fourth button, typically the Browser Back button
   * 4: Fifth button, typically the Browser Forward button
   *
   * @default 0
   */
  closeButton?: number;
  /**
   * @default "mouseup"
   */
  onEvent?: 'mouseup' | 'mousedown';
}

const useClickOutside = <R extends HTMLElement>(
  props: UseClickOutsideProps,
) => {
  const { callback, disabled, closeButton = 0, onEvent = 'mouseup' } = props;

  const callbackRef = useCallbackRef(callback);

  const [element, setElement] = React.useState<R | null>(null);

  React.useEffect(() => {
    if (!element || disabled) return;

    const handler = (e: MouseEvent) => {
      if (e.button !== closeButton) return;
      if (element.contains(e.target as Node)) return;

      callbackRef(e);
    };

    document.addEventListener(onEvent, handler);

    return () => {
      document.removeEventListener(onEvent, handler);
    };
  }, [callbackRef, closeButton, element, disabled, onEvent]);

  return setElement;
};

export type UseClickOutsideReturn = ReturnType<typeof useClickOutside>;

export { useClickOutside };
