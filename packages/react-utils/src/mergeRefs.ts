import React from 'react';

export const mergeRefs = <T>(
  ...refs: (
    | React.ForwardedRef<T>
    | React.RefObject<T>
    | React.Dispatch<React.SetStateAction<T>>
    | undefined
    | null
  )[]
): React.RefCallback<T> => {
  return (node: T) => {
    const filtered = refs.filter(Boolean);

    filtered.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(node);
      } else if (ref !== null) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
  };
};
