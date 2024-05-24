import { Slot } from '../slot';
import { UsePointerEventsProps, usePointerEvents } from '../use-pointer-events';

export interface PointerEventsProps<E> extends UsePointerEventsProps<E> {
  children?: React.ReactNode;
}

const displayName = 'PointerEvents';

export const PointerEvents = <E extends HTMLElement>(
  props: PointerEventsProps<E>,
) => {
  const { children, onPointerDown, onPointerUp, onPress, ...restProps } = props;

  const pointerEvents = usePointerEvents<E>({
    onPointerDown,
    onPointerUp,
    onPress,
  });

  return (
    <Slot {...pointerEvents} {...restProps}>
      {children}
    </Slot>
  );
};

PointerEvents.displayName = displayName;
