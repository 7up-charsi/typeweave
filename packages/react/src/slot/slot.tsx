import React from 'react';
import { mergeProps, mergeRefs } from '@ux-weaver/react-utils';

export interface SlotProps {
  children?: React.ReactNode;
}

const displayName = 'Slot';

const _Slot = <E extends HTMLElement>(
  props: SlotProps,
  ref: React.ForwardedRef<E>,
) => {
  const { children, ...slotProps } = props;

  const count = React.Children.count(children);
  if (!count) return;
  if (count > 1) throw new Error(`${displayName}, must have only one child`);
  if (!React.isValidElement(children))
    throw new Error(`${displayName}, child must be valid element`);

  return React.cloneElement(children, {
    ...mergeProps(slotProps, children.props),
    ref: ref
      ? mergeRefs(
          ref,
          (children as unknown as { ref: React.ForwardedRef<E> }).ref,
        )
      : (children as unknown as { ref: React.ForwardedRef<E> }).ref,
  } as Partial<unknown>);
};

_Slot.displayName = displayName;

export const Slot = React.forwardRef(_Slot) as <T, P>(
  props: SlotProps & P & { ref?: React.ForwardedRef<T> },
) => ReturnType<typeof _Slot>;
