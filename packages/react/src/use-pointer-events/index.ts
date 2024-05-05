import React from 'react';
import { useCallbackRef } from '../use-callback-ref';

export interface UsePointerEventsProps<E> {
  onPointerDown?: React.PointerEventHandler<E>;
  onPointerUp?: React.PointerEventHandler<E>;
  onPress?: React.PointerEventHandler<E>;
}

const usePointerEvents = <E extends HTMLElement = HTMLElement>(
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

    if (e.target instanceof HTMLButtonElement && e.target.disabled) return;

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

  return { onPointerDown, onPointerUp };
};

export type UsePointerEventsReturn = ReturnType<typeof usePointerEvents>;

export { usePointerEvents };
