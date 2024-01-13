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

const icon_svg = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
  >
    <g strokeWidth="0"></g>
    <g strokeLinecap="round" strokeLinejoin="round"></g>
    <g>
      <title>Close</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g>
          <rect fillRule="nonzero" x="0" y="0" width="24" height="24"></rect>
          <line
            x1="16.9999"
            y1="7"
            x2="7.00001"
            y2="16.9999"
            stroke="#0C0310"
            strokeWidth="2"
            strokeLinecap="round"
          ></line>
          <line
            x1="7.00006"
            y1="7"
            x2="17"
            y2="16.9999"
            stroke="#0C0310"
            strokeWidth="2"
            strokeLinecap="round"
          ></line>
        </g>
      </g>
    </g>
  </svg>
);

const check_svg = (
  <svg
    fill="#000000"
    width={16}
    height={16}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g strokeWidth="0"></g>
    <g strokeLinecap="round" strokeLinejoin="round"></g>
    <g>
      <path d="M103.99951,196.00012a11.9627,11.9627,0,0,1-8.48535-3.51465l-56-55.99511a12.00044,12.00044,0,0,1,16.9707-16.97168l47.51465,47.51123L207.51416,63.51916a12.0001,12.0001,0,0,1,16.9707,16.97071l-112,111.9956A11.9627,11.9627,0,0,1,103.99951,196.00012Z"></path>
    </g>
  </svg>
);

export interface SwitchProps extends SwitchVariantProps {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  classNames?: Omit<SwitchClassNames, 'input'>;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  checkIcon?: React.ReactNode;
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
    icon = icon_svg,
    checkIcon = check_svg,
    label,
    color,
    labelPlacement = 'right',
    size = 'md',
  } = props;

  const id = useId();

  const [checked, setChecked] = useControllableState({
    defaultValue: defaultChecked ?? false,
    value: checkedProp,
    onChange,
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

        <div className={styles.indicator({ className: classNames?.indicator })}>
          {checked ? checkIcon : icon}
        </div>
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
