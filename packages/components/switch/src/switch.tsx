'use client';

import { forwardRef, useId } from 'react';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { mergeProps } from '@webbo-ui/react-utils';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import {
  SwitchClassNames,
  SwitchVariantProps,
  switch as switchStyles,
} from '@webbo-ui/theme';

export interface SwitchProps extends SwitchVariantProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (event: { target: { value: boolean } }, value: boolean) => void;
  classNames?: Omit<SwitchClassNames, 'input'>;
  isDisabled?: boolean;
  label?: string;
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right';
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const {
    defaultChecked,
    checked: checkedProp,
    onChange,
    classNames,
    label,
    size = 'sm',
    labelPlacement = 'right',
    isDisabled = false,
    color = 'primary',
  } = props;

  const id = useId();

  const [checked, setChecked] = useControllableState({
    defaultValue: defaultChecked ?? false,
    value: checkedProp,
    onChange: (value) => {
      onChange?.({ target: { value } }, value);
    },
    resetStateValue: false,
  });

  const { isFocusVisible, focusProps, isFocused } = useFocusRing();

  const { hoverProps, isHovered } = useHover({ isDisabled });

  const styles = switchStyles({ size, isDisabled, labelPlacement, color });

  return (
    <div
      data-hovered={isHovered}
      data-focus-visible={isFocusVisible && isFocused}
      data-disabled={isDisabled}
      data-checked={checked}
      className={styles.base({ className: classNames?.base })}
    >
      <div className={styles.switch({ className: classNames?.switch })}>
        <input
          id={id}
          ref={ref}
          type="checkbox"
          checked={checked}
          className={styles.nativeInput()}
          disabled={isDisabled}
          {...mergeProps(focusProps, hoverProps)}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />

        <div
          className={styles.indicator({ className: classNames?.indicator })}
        />
      </div>

      {label && (
        <label
          htmlFor={id}
          className={styles.label({ className: classNames?.label })}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Switch.displayName = 'webbo-ui.Switch';

export default Switch;
