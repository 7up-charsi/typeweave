'use client';

import { forwardRef, useId, useRef } from 'react';
import { useControllableState } from '@gist-ui/use-controllable-state';
import { UseRippleProps, useRipple } from '@gist-ui/use-ripple';
import { mergeProps } from '@gist-ui/react-utils';
import { createContextScope } from '@gist-ui/context';
import { useHover } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { RadioClassNames, RadioVariantProps, radio } from '@gist-ui/theme';

const icon_svg = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const checkIcon_svg = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="10" cy="10" r="5" fill="currentColor" />
  </svg>
);

// *-*-*-*-* Group *-*-*-*-*

const Group_Name = 'Radio.Group';

interface GroupContext {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const [RootProvider, useRootContext] =
  createContextScope<GroupContext>(Group_Name);

export interface GroupProps {
  value?: string;
  onChange?: (event: { target: { value: string } }, value: string) => void;
  defaultValue?: string;
  children?: React.ReactNode;
  name: string;
}

export const Group = (props: GroupProps) => {
  const { children, defaultValue, value: valueProp, onChange, name } = props;

  const [value, setValue] = useControllableState({
    defaultValue: defaultValue ?? '',
    value: valueProp,
    onChange: (value) => {
      onChange?.({ target: { value } }, value);
    },
    resetStateValue: '',
  });

  return (
    <RootProvider value={value} onChange={setValue} name={name}>
      {children}
    </RootProvider>
  );
};

Group.displayName = 'gist-ui.' + Group_Name;

// *-*-*-*-* Radio *-*-*-*-*

const Radio_Name = 'Radio.Radio';

export interface RadioProps extends RadioVariantProps {
  classNames?: Omit<RadioClassNames, 'input'>;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  checkIcon?: React.ReactNode;
  label?: string;
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right';
  rippleDuration?: UseRippleProps['duration'];
  rippleTimingFunction?: UseRippleProps['timingFunction'];
  rippleCompletedFactor?: UseRippleProps['completedFactor'];
  value: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    classNames,
    icon = icon_svg,
    checkIcon = checkIcon_svg,
    label,
    value,
    rippleDuration = 450,
    rippleTimingFunction,
    rippleCompletedFactor,
    size = 'md',
    labelPlacement = 'right',
    isDisabled = false,
    color = 'primary',
  } = props;

  const rootContext = useRootContext(Radio_Name);

  const id = useId();
  const radioRef = useRef(null);

  const { isFocusVisible, focusProps, isFocused } = useFocusRing();

  const { hoverProps, isHovered } = useHover({ isDisabled });

  const { rippleKeyboardProps, ripplePointerProps } = useRipple({
    containerRef: radioRef,
    duration: rippleDuration,
    timingFunction: rippleTimingFunction,
    completedFactor: rippleCompletedFactor,
  });

  const styles = radio({ size, isDisabled, labelPlacement, color });

  const selected = rootContext.value === value;

  return (
    <div
      data-hovered={isHovered}
      data-focus-visible={isFocusVisible && isFocused}
      data-disabled={isDisabled}
      data-selected={selected}
      className={styles.base()}
    >
      <div
        ref={radioRef}
        className={styles.radio({ className: classNames?.radio })}
        onPointerDown={() => ripplePointerProps.onPointerDown()}
      >
        <input
          id={id}
          ref={ref}
          type="radio"
          value={value}
          name={rootContext.name}
          className={styles.nativeInput()}
          disabled={isDisabled}
          {...mergeProps(focusProps, hoverProps)}
          onChange={(e) => {
            rootContext.onChange(e.target.value);
          }}
          {...rippleKeyboardProps}
        />

        {selected ? checkIcon : icon}
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

Radio.displayName = 'gist-ui.' + Radio_Name;
