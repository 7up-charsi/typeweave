import { useRef } from 'react';
import { useCallbackRef } from '@webbo-ui/use-callback-ref';

export interface UsePointerEventsProps {
  onPointerDown?: React.PointerEventHandler;
  onPointerUp?: React.PointerEventHandler;
  onPress?: React.PointerEventHandler;
}

const usePointerEvents = (props: UsePointerEventsProps = {}) => {
  const {
    onPointerDown: onPointerDownProp,
    onPointerUp: onPointerUpProp,
    onPress,
  } = props;

  const pointerRef = useRef(false);

  const onPointerDown = useCallbackRef((e: React.PointerEvent) => {
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

  const onPointerUp = useCallbackRef((e: React.PointerEvent) => {
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
