import React from 'react';

export type Ref<T> =
  | React.ForwardedRef<T>
  | React.RefObject<T>
  | React.Dispatch<React.SetStateAction<T>>
  | undefined
  | null;

export const mergeRefs = <T>(...refs: Ref<T>[]): React.RefCallback<T> => {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref !== null) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
  };
};
