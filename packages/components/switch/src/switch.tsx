import { forwardRef, useId } from 'react';
import { useControllableState } from '@gist-ui/use-controllable-state';
import { mergeProps } from '@gist-ui/react-utils';
import { useHover, usePress } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import {
  SwitchClassNames,
  SwitchVariantProps,
  switch as switchStyles,
} from '@gist-ui/theme';

export interface SwitchProps extends SwitchVariantProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent) => void;
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
    isDisabled,
    classNames,
    label,
    color,
    labelPlacement = 'right',
    size = 'md',
  } = props;

  const id = useId();

  const [checked, setChecked] = useControllableState({
    defaultValue: defaultChecked ?? false,
    value: checkedProp,
    onChange: (value) => {
      onChange?.({ target: { value } } as unknown as React.ChangeEvent);
    },
    resetStateValue: false,
  });

  const { isFocusVisible, focusProps, isFocused } = useFocusRing();

  const { pressProps, isPressed } = usePress({
    isDisabled,
    onPressStart: (e) => e.continuePropagation(),
    onPressEnd: (e) => e.continuePropagation(),
    onPress: (e) => e.continuePropagation(),
  });

  const { hoverProps, isHovered } = useHover({ isDisabled });

  const styles = switchStyles({ size, isDisabled, labelPlacement, color });

  return (
    <div
      data-pressed={isPressed}
      data-hovered={isHovered}
      data-focus-visible={isFocusVisible && isFocused}
      data-disabled={isDisabled}
      data-checked={checked}
      className={styles.base({ className: classNames?.base })}
    >
      <div
        {...pressProps}
        className={styles.switch({ className: classNames?.switch })}
      >
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

Switch.displayName = 'gist-ui.Switch';

export default Switch;
