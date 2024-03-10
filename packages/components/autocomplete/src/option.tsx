'use client';

import { useEffect, useRef } from 'react';

export interface OptionProps<V> {
  option: V;
  label: string;
  state: { selected: boolean; disabled: boolean; focused: boolean };
  onSelect: () => void;
  onHover: () => void;
  props: React.LiHTMLAttributes<HTMLLIElement> & {
    'data-disabled': boolean;
    'data-selected': boolean;
    'data-focused': boolean;
  };
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
    state: { disabled, focused, selected },
    children,
  } = _props;

  const ref = useRef<HTMLLIElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    if (selected)
      ref.current?.scrollIntoView({ behavior: 'instant', block: 'center' });
  }, [selected]);

  useEffect(() => {
    if (focused && !isHovered.current)
      ref.current?.scrollIntoView({ behavior: 'instant', block: 'nearest' });
  }, [focused]);

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
        if (disabled) return;
        onSelect();
      }}
      {...props}
    >
      {children ?? label}
    </li>
  );
};

Option.displayName = 'webbo-ui.Option';
