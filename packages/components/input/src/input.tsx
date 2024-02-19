'use client';

import { input, InputClassNames, InputVariantProps } from '@webbo-ui/theme';
import { mergeProps, mergeRefs } from '@webbo-ui/react-utils';
import { useFocusRing } from '@react-aria/focus';
import { useFocus, useHover } from '@react-aria/interactions';
import { forwardRef, useEffect, useId, useRef } from 'react';

export interface InputProps extends Omit<InputVariantProps, 'error'> {
  defaultValue?: string;
  value?: string;
  label?: string;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  hideLabel?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  classNames?: InputClassNames;
  placeholder?: string;
  /**
   * When error prop is true, its value is used in "errorMessage" aria-live attribute
   * @default polite
   */
  a11yFeedback?: 'polite' | 'assertive';
  inputProps?: Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'defaultValue'
    | 'value'
    | 'onChange'
    | 'id'
    | 'onBlur'
    | 'onFocus'
    | 'required'
  >;
  baseProps?: React.HTMLAttributes<HTMLDivElement>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  helperTextProps?: React.HTMLAttributes<HTMLDivElement>;
  inputWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  baseRef?: React.ForwardedRef<HTMLDivElement>;
  inputRef?: React.ForwardedRef<HTMLInputElement>;
}

const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const {
    label,
    id,
    helperText,
    errorMessage,
    startContent,
    endContent,
    value,
    defaultValue,
    onBlur,
    onFocus,
    classNames,
    required,
    onChange,
    error,
    hideLabel,
    placeholder,
    baseRef,
    inputRef,
    baseProps = {},
    inputProps = {},
    labelProps = {},
    helperTextProps = {},
    inputWrapperProps = {},
    a11yFeedback = 'polite',
    fullWidth = false,
    isDisabled = false,
    size = 'md',
    variant = 'filled',
  } = props;

  const labelId = useId();
  const helperTextId = useId();
  const errorMessageId = useId();
  const inputId = id || labelId;

  const innerInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !label) {
      console.warn(
        '`Input` "label" prop is optional but recommended. if you want to hide label then pass "hideLabel" prop as well',
      );
    }
  }, [label]);

  const {
    focusProps: focusRingProps,
    isFocusVisible,
    isFocused,
  } = useFocusRing({ isTextInput: true });

  const { hoverProps, isHovered } = useHover({ isDisabled });

  const { focusProps } = useFocus<HTMLInputElement>({ onFocus, onBlur });

  const styles = input({
    isDisabled,
    fullWidth,
    size,
    variant,
    required: !!required,
    error: !!error,
  });

  return (
    <div
      {...baseProps}
      ref={baseRef}
      className={styles.base({ className: classNames?.base })}
      data-focused={isFocused}
      data-focus-visible={isFocusVisible && isFocused}
      data-hovered={isHovered}
      data-disabled={isDisabled}
    >
      {!hideLabel && !!label && (
        <label
          {...labelProps}
          htmlFor={inputId}
          className={styles.label({ className: classNames?.label })}
        >
          {label}
        </label>
      )}

      <div
        {...mergeProps(hoverProps, inputWrapperProps, {
          onPointerDown: (e: React.PointerEvent) => {
            if (isDisabled) return;
            if (e.button !== 0) return;

            if (e.target !== innerInputRef.current) {
              e.preventDefault();
              innerInputRef.current?.focus();
              return;
            }
          },
        })}
        ref={ref}
        className={styles.inputWrapper({ className: classNames?.inputWrapper })}
      >
        {startContent}

        <input
          {...mergeProps(focusProps, focusRingProps, inputProps)}
          ref={mergeRefs(innerInputRef, inputRef)}
          value={value}
          defaultValue={defaultValue}
          aria-label={hideLabel ? label : undefined}
          aria-describedby={helperText ? helperTextId : undefined}
          aria-errormessage={error && errorMessage ? errorMessageId : undefined}
          aria-required={required}
          aria-invalid={error}
          id={inputId}
          disabled={isDisabled}
          placeholder={placeholder}
          onChange={onChange}
          className={styles.input({ className: classNames?.input })}
          autoComplete="off"
        />

        {endContent}
      </div>

      {!error && helperText && (
        <div
          {...helperTextProps}
          id={helperTextId}
          className={styles.helperText({ className: classNames?.helperText })}
        >
          {helperText}
        </div>
      )}

      {error && errorMessage && (
        <div
          {...helperTextProps}
          id={errorMessageId}
          aria-live={a11yFeedback}
          className={styles.helperText({ className: classNames?.helperText })}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'webbo-ui.Input';

export default Input;
