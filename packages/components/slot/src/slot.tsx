

import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { CustomError } from '@webbo-ui/error';
import { mergeProps, mergeRefs } from '@webbo-ui/react-utils';

export interface SlotProps {
  children?: React.ReactNode;
}

const _Slot = <E extends HTMLElement>(
  props: SlotProps,
  ref: React.ForwardedRef<E>,
) => {
  const { children, ...slotProps } = props;

  const count = Children.count(children);
  if (!count) return;
  if (count > 1) throw new CustomError('Slot', 'must have only one child');
  if (!isValidElement(children))
    throw new CustomError('Slot', 'child must be valid element');

  return cloneElement(children, {
    ...mergeProps(slotProps, children.props),
    ref: ref
      ? mergeRefs(
          ref,
          (children as unknown as { ref: React.ForwardedRef<E> }).ref,
        )
      : (children as unknown as { ref: React.ForwardedRef<E> }).ref,
  } as Partial<unknown>);
};

_Slot.displayName = 'webbo-ui.Slot';

export const Slot = forwardRef(_Slot) as <T, P>(
  props: SlotProps & P & { ref?: React.ForwardedRef<T> },
) => ReturnType<typeof _Slot>;
