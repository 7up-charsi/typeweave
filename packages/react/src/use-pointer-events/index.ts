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

    if (pointerRef.current === true && e.button === 0) {
      onPress?.(e);
    }

    pointerRef.current = false;
  });

  return { onPointerDown, onPointerUp };
};

export type UsePointerEventsReturn = ReturnType<typeof usePointerEvents>;

export { usePointerEvents };
