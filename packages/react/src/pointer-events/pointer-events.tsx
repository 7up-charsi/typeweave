import React from 'react';
import { Slot } from '../slot';
import { UsePointerEventsProps, usePointerEvents } from '../use-pointer-events';

export interface PointerEventsProps<E> extends UsePointerEventsProps<E> {
  children?: React.ReactNode;
}

const displayName = 'PointerEvents';

const PointerEventsImpl = <E extends HTMLElement>(
  props: PointerEventsProps<E>,
  ref: React.ForwardedRef<E>,
) => {
  const { children, onPointerDown, onPointerUp, onPress, ...restProps } = props;

  const pointerEvents = usePointerEvents<E>({
    onPointerDown,
    onPointerUp,
    onPress,
  });

  return (
    <Slot ref={ref} {...pointerEvents} {...restProps}>
      {children}
    </Slot>
  );
};

PointerEventsImpl.displayName = displayName;

export const PointerEvents = React.forwardRef(PointerEventsImpl) as <
  E extends HTMLElement,
>(
  props: PointerEventsProps<E> & React.RefAttributes<E>,
) => React.ReactNode;
