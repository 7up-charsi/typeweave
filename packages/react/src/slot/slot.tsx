import React from 'react';
import { CustomError } from '../custom-error';
import { mergeProps, mergeRefs } from '@webbo-ui/react-utils';

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
  if (count > 1) throw new CustomError('Slot', 'must have only one child');
  if (!React.isValidElement(children))
    throw new CustomError('Slot', 'child must be valid element');

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
