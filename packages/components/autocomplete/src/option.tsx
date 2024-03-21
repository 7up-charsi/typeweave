'use client';

import { usePointerEvents } from '@webbo-ui/use-pointer-events';
import { useEffect, useRef } from 'react';

export interface OptionProps<V> extends React.HTMLAttributes<HTMLLIElement> {
  option: V;
  label: string;
  state: { selected: boolean; disabled: boolean; focused: boolean };
  onSelect: () => void;
  onHover: () => void;
  'data-disabled': boolean;
  'data-selected': boolean;
  'data-focused': boolean;
}

export const Option = (
  props: OptionProps<object> & { children?: React.ReactNode },
) => {
  const {
    label,
    onSelect,
    onHover,
    state: { disabled, focused, selected },
    children,
    onPointerDown,
    onPointerUp,
    onPointerEnter,
    onPointerLeave,
    ...restProps
  } = props;

  const ref = useRef<HTMLLIElement>(null);
  const isHovered = useRef(false);

  const pointerEvents = usePointerEvents({
    onPointerDown: (e) => {
      onPointerDown?.(e);
      e.preventDefault();
    },
    onPointerUp,
    onPress: () => {
      if (disabled) return;
      onSelect();
    },
  });

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
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        isHovered.current = true;
        onHover();
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        isHovered.current = false;
      }}
      {...pointerEvents}
      {...restProps}
    >
      {children ?? label}
    </li>
  );
};

Option.displayName = 'webbo-ui.Option';
