'use client';

import { useEffect, useRef } from 'react';

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
  const isHovered = useRef(false);

  useEffect(() => {
    if (isSelected)
      ref.current?.scrollIntoView({ behavior: 'instant', block: 'center' });
  }, [isSelected]);

  useEffect(() => {
    if (isFocused && !isHovered.current)
      ref.current?.scrollIntoView({ behavior: 'instant', block: 'nearest' });
  }, [isFocused]);

  return (
    <li
      ref={ref}
      onMouseDown={(e) => e.preventDefault()}
      onMouseEnter={() => {
        isHovered.current = true;
        onHover();
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
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

Option.displayName = 'webbo-ui.Option';
