import { mergeRefs } from '@typeweave/react-utils';
import { usePointerEvents } from '../use-pointer-events';
import React from 'react';

export interface OptionProps {
  onSelect: () => void;
  onHover: () => void;
  id: string;
  className: string;
  children: React.ReactNode;
  state: {
    selected: boolean;
    disabled: boolean;
    focused: boolean;
  };
}

const displayName = 'Option';

export const Option = React.forwardRef<HTMLLIElement, OptionProps>(
  (props, ref) => {
    const {
      onSelect,
      onHover,
      state: { disabled, focused, selected },
      children,
      id,
      className,
    } = props;

    const innerRef = React.useRef<HTMLLIElement>(null);
    const isHovered = React.useRef(false);

    const pointerEvents = usePointerEvents({
      onPress: () => {
        if (disabled) return;
        onSelect();
      },
    });

    React.useEffect(() => {
      if (focused && !isHovered.current)
        innerRef.current?.scrollIntoView({
          behavior: 'instant',
          block: 'nearest',
        });
    }, [focused]);

    return (
      <li
        ref={mergeRefs(ref, innerRef)}
        onPointerEnter={() => {
          isHovered.current = true;
          onHover();
        }}
        onPointerLeave={() => {
          isHovered.current = false;
        }}
        className={className}
        id={id}
        role="option"
        aria-selected={disabled ? undefined : selected}
        data-disabled={disabled}
        data-selected={selected}
        data-focused={focused}
        {...pointerEvents}
      >
        {children}
      </li>
    );
  },
);

Option.displayName = displayName;
