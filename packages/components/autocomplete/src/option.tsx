import { mergeRefs } from '@webbo-ui/react-utils';
import { usePointerEvents } from '@webbo-ui/use-pointer-events';
import React from 'react';
import { useStylesContext } from './autocomplete';

const Option_Name = 'Option';

export interface OptionProps {
  label: string;
  selected: boolean;
  disabled: boolean;
  focused: boolean;
  onSelect: () => void;
  onHover: () => void;
  id: string;
  className: string;
}

export const Option = React.forwardRef<
  HTMLLIElement,
  OptionProps & { children?: React.ReactNode }
>((props, ref) => {
  const {
    label,
    onSelect,
    onHover,
    disabled,
    focused,
    selected,
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
      {children ?? label}
    </li>
  );
});

Option.displayName = 'webbo-ui.' + Option_Name;
