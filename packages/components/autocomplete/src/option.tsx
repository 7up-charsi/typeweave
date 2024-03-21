'use client';

import { mergeRefs } from '@webbo-ui/react-utils';
import { usePointerEvents } from '@webbo-ui/use-pointer-events';
import { forwardRef, useEffect, useRef } from 'react';

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

export const Option = forwardRef<
  HTMLLIElement,
  OptionProps<object> & { children?: React.ReactNode }
>((props, ref) => {
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

  const innerRef = useRef<HTMLLIElement>(null);
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
      innerRef.current?.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      });
  }, [selected]);

  useEffect(() => {
    if (focused && !isHovered.current)
      innerRef.current?.scrollIntoView({
        behavior: 'instant',
        block: 'nearest',
      });
  }, [focused]);

  return (
    <li
      ref={mergeRefs(ref, innerRef)}
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
});

Option.displayName = 'webbo-ui.Option';
