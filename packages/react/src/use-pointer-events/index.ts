import React from 'react';
import { useCallbackRef } from '../use-callback-ref';

export interface UsePointerEventsProps<E> {
  onPointerDown?: React.PointerEventHandler<E>;
  onPointerUp?: React.PointerEventHandler<E>;
  onPress?: React.PointerEventHandler<E>;
}

export const usePointerEvents = <E extends HTMLElement = HTMLElement>(
  props: UsePointerEventsProps<E> = {},
) => {
  const {
    onPointerDown: onPointerDownProp,
    onPointerUp: onPointerUpProp,
    onPress,
  } = props;

  const pointerRef = React.useRef(false);

  const onPointerDown = useCallbackRef((e: React.PointerEvent<E>) => {
    onPointerDownProp?.(e);

    if (
      (e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement) &&
      e.target.disabled
    )
      return;

    pointerRef.current = true;

    ['pointerup', 'pointercancel', 'keydown'].forEach((event) =>
      document.addEventListener(
        event,
        () => {
          pointerRef.current = false;
        },
        { once: true },
      ),
    );
  });

  const onPointerUp = useCallbackRef((e: React.PointerEvent<E>) => {
    onPointerUpProp?.(e);

    if (e.target instanceof HTMLButtonElement && e.target.disabled) return;

    if (pointerRef.current && e.button === 0) {
      onPress?.(e);
    }
  });

  const onMouseDown = (e: React.MouseEvent) => e.preventDefault();

  return { onPointerDown, onPointerUp, onMouseDown };
};
