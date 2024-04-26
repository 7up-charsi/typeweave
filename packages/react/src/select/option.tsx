import { mergeRefs } from '@webbo-ui/react-utils';
import { usePointerEvents } from '../use-pointer-events';
import React from 'react';
import { useStylesContext } from './select';

const Option_Name = 'Option';

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

    const styles = useStylesContext(Option_Name);

    const innerRef = React.useRef<HTMLLIElement>(null);
    const isHovered = React.useRef(false);

    const pointerEvents = usePointerEvents({
      onPress: () => {
        if (disabled) return;
        onSelect();
      },
    });

    React.useEffect(() => {
      if (selected)
        innerRef.current?.scrollIntoView({
          behavior: 'instant',
          block: 'center',
        });
    }, [selected]);

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
        className={styles.option({ className })}
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

Option.displayName = 'webbo-ui.' + Option_Name;
