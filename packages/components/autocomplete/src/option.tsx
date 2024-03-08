'use client';

import { useEffect, useRef } from 'react';
import { useHover } from '@react-aria/interactions';

export interface OptionProps<V> {
  option: V;
  label: string;
  state: { isSelected: boolean; isDisabled: boolean; isFocused: boolean };
  onSelect: () => void;
  onHover: () => void;
  props: React.LiHTMLAttributes<HTMLLIElement>;
  key: string;
}

export const Option = (
  _props: OptionProps<object> & { children?: React.ReactNode },
) => {
  const {
    label,
    props,
    onSelect,
    onHover,
    state: { isDisabled, isFocused, isSelected },
    children,
  } = _props;

  const ref = useRef<HTMLLIElement>(null);

  const { hoverProps, isHovered } = useHover({
    isDisabled: isDisabled,
    onHoverStart: () => onHover(),
  });

  useEffect(() => {
    if (isSelected)
      ref.current?.scrollIntoView({ behavior: 'instant', block: 'center' });
  }, [isSelected]);

  useEffect(() => {
    if (isFocused && !isHovered)
      ref.current?.scrollIntoView({ behavior: 'instant', block: 'nearest' });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <li
      ref={ref}
      {...hoverProps}
      onClick={() => {
        if (isDisabled) return;
        onSelect();
      }}
      {...props}
    >
      {children ?? label}
    </li>
  );
};

Option.displayName = 'webbo-ui.Select';
