import React from 'react';
import { Button, ButtonProps } from '../button';
import {
  useToggleButtonCtx,
  useToggleButtonStyles,
} from './toggle-button-group';

export interface ToggleButtonProps extends ButtonProps {
  value: string;
}

const displayName = 'ToggleButton';

export const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>((props, ref) => {
  const {
    value: valueProp,
    onClick,
    classNames,
    className,
    ...restProps
  } = props;

  const { setValue, value, exclusive } = useToggleButtonCtx(displayName);
  const styles = useToggleButtonStyles(displayName);

  let selected: boolean | undefined = undefined;

  if (exclusive) {
    selected = valueProp === value;
  }

  if (!exclusive && Array.isArray(value)) {
    selected = valueProp ? value.includes(valueProp) : false;
  }

  return (
    <Button
      ref={ref}
      {...restProps}
      classNames={{
        ...classNames,
        base: styles.button({ className: classNames?.base ?? className }),
      }}
      data-selected={selected}
      aria-pressed={selected}
      onClick={(e) => {
        onClick?.(e);

        if (!valueProp) return;

        if (!exclusive) {
          setValue((prev) => {
            if (!Array.isArray(prev)) return null;

            return selected
              ? prev.filter((ele) => ele !== valueProp)
              : [...prev, valueProp];
          });

          return;
        }

        if (exclusive) {
          setValue(selected ? null : valueProp);

          return;
        }
      }}
    />
  );
});

ToggleButton.displayName = displayName;
