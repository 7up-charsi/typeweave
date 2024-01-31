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
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="19"
      height="19"
      rx="2.5"
      stroke="currentColor"
    />
  </svg>
);

const checkIcon_svg = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_4_6" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 0C1.34315 0 0 1.34315 0 3V17C0 18.6569 1.34315 20 3 20H17C18.6569 20 20 18.6569 20 17V3C20 1.34315 18.6569 0 17 0H3ZM15.711 6.70319C16.0994 6.31051 16.0959 5.67736 15.7032 5.289C15.3105 4.90064 14.6774 4.90413 14.289 5.29681L8.07693 11.5779L5.711 9.18569C5.32264 8.79302 4.68949 8.78952 4.29681 9.17788C3.90413 9.56624 3.90064 10.1994 4.289 10.5921L7.36592 13.7032C7.55377 13.8931 7.80979 14 8.07693 14C8.34406 14 8.60008 13.8931 8.78793 13.7032L15.711 6.70319Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 0C1.34315 0 0 1.34315 0 3V17C0 18.6569 1.34315 20 3 20H17C18.6569 20 20 18.6569 20 17V3C20 1.34315 18.6569 0 17 0H3ZM15.711 6.70319C16.0994 6.31051 16.0959 5.67736 15.7032 5.289C15.3105 4.90064 14.6774 4.90413 14.289 5.29681L8.07693 11.5779L5.711 9.18569C5.32264 8.79302 4.68949 8.78952 4.29681 9.17788C3.90413 9.56624 3.90064 10.1994 4.289 10.5921L7.36592 13.7032C7.55377 13.8931 7.80979 14 8.07693 14C8.34406 14 8.60008 13.8931 8.78793 13.7032L15.711 6.70319Z"
      fill="currentColor"
    />
    <path
      d="M15.7032 5.289L15 6L15 6L15.7032 5.289ZM15.711 6.70319L15 6L15 6L15.711 6.70319ZM14.289 5.29681L15 6L15 6L14.289 5.29681ZM8.07693 11.5779L7.36592 12.2811L8.07692 13L8.78793 12.2811L8.07693 11.5779ZM5.711 9.18569L5 9.88888L5 9.88888L5.711 9.18569ZM4.29681 9.17788L5 9.88888L5 9.88888L4.29681 9.17788ZM4.289 10.5921L3.57799 11.2953L3.57799 11.2953L4.289 10.5921ZM7.36592 13.7032L6.65492 14.4064L6.65492 14.4064L7.36592 13.7032ZM8.78793 13.7032L8.07692 13L8.07692 13L8.78793 13.7032ZM1 3C1 1.89543 1.89543 1 3 1V-1C0.790862 -1 -1 0.79086 -1 3H1ZM1 17V3H-1V17H1ZM3 19C1.89543 19 1 18.1046 1 17H-1C-1 19.2091 0.790861 21 3 21V19ZM17 19H3V21H17V19ZM19 17C19 18.1046 18.1046 19 17 19V21C19.2091 21 21 19.2091 21 17H19ZM19 3V17H21V3H19ZM17 1C18.1046 1 19 1.89543 19 3H21C21 0.790861 19.2091 -1 17 -1V1ZM3 1H17V-1H3V1ZM15 6L15 6L16.422 7.40638C17.1987 6.62103 17.1917 5.35472 16.4064 4.57799L15 6ZM15 6L15 6L16.4064 4.57799C15.621 3.80127 14.3547 3.80827 13.578 4.59362L15 6ZM8.78793 12.2811L15 6L13.578 4.59362L7.36592 10.8747L8.78793 12.2811ZM5 9.88888L7.36592 12.2811L8.78793 10.8747L6.42201 8.4825L5 9.88888ZM5 9.88888L5 9.88888L6.42201 8.48251C5.64529 7.69715 4.37897 7.69016 3.59362 8.46688L5 9.88888ZM5 9.88888L5 9.88888L3.59362 8.46688C2.80827 9.2436 2.80127 10.5099 3.57799 11.2953L5 9.88888ZM8.07693 13L5 9.88888L3.57799 11.2953L6.65492 14.4064L8.07693 13ZM8.07693 13L8.07692 13L6.65492 14.4064C7.03061 14.7862 7.54266 15 8.07693 15V13ZM8.07692 13L8.07693 13V15C8.61119 15 9.12324 14.7862 9.49893 14.4064L8.07692 13ZM15 6L8.07692 13L9.49893 14.4064L16.422 7.40638L15 6Z"
      fill="currentColor"
      mask="url(#path-1-inside-1_4_6)"
    />
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
    resetStateValue: false,
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
