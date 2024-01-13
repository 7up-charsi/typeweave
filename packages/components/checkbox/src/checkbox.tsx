import { forwardRef, useId, useRef } from 'react';
import { useControllableState } from '@gist-ui/use-controllable-state';
import { UseRippleProps, useRipple } from '@gist-ui/use-ripple';
import { mergeProps } from '@gist-ui/react-utils';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import {
  CheckboxClassNames,
  CheckboxVariantProps,
  checkbox,
} from '@gist-ui/theme';

const icon_svg = (
  <svg
    aria-hidden="true"
    width={23}
    height={23}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
  </svg>
);

const checkIcon_svg = (
  <svg
    aria-hidden="true"
    width={23}
    height={23}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
  </svg>
);

export interface CheckboxProps extends CheckboxVariantProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  classNames?: Omit<CheckboxClassNames, 'input'>;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  checkIcon?: React.ReactNode;
  label?: string;
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right';
  rippleDuration?: UseRippleProps['duration'];
  rippleTimingFunction?: UseRippleProps['timingFunction'];
  rippleCompletedFactor?: UseRippleProps['completedFactor'];
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    defaultChecked,
    checked: checkedProp,
    onChange,
    isDisabled,
    classNames,
    icon = icon_svg,
    checkIcon = checkIcon_svg,
    label,
    color,
    rippleDuration = 450,
    rippleTimingFunction,
    rippleCompletedFactor,
    labelPlacement = 'right',
    size = 'md',
  } = props;

  const id = useId();
  const checkboxRef = useRef<HTMLDivElement>(null);

  const [checked, setChecked] = useControllableState({
    defaultValue: defaultChecked ?? false,
    value: checkedProp,
    onChange,
  });

  const { isFocusVisible, focusProps, isFocused } = useFocusRing();

  const { hoverProps, isHovered } = useHover({ isDisabled });

  const { rippleKeyboardProps, ripplePointerProps } = useRipple({
    containerRef: checkboxRef,
    isDisabled,
    duration: rippleDuration,
    timingFunction: rippleTimingFunction,
    completedFactor: rippleCompletedFactor,
  });

  const styles = checkbox({ size, isDisabled, labelPlacement, color });

  return (
    <div
      data-hovered={isHovered}
      data-focus-visible={isFocusVisible && isFocused}
      data-disabled={isDisabled}
      data-checked={checked}
      className={styles.base()}
    >
      <div
        ref={checkboxRef}
        className={styles.checkbox({ className: classNames?.checkbox })}
        onPointerDown={() => ripplePointerProps.onPointerDown()}
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
          {...rippleKeyboardProps}
        />

        {checked ? checkIcon : icon}
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

Checkbox.displayName = 'gist-ui.Checkbox';

export default Checkbox;
