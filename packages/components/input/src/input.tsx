import { input, InputClassNames, InputVariantProps } from '@gist-ui/theme';
import { mergeProps, mergeRefs } from '@gist-ui/react-utils';
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
  inputWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  baseRef?: React.RefObject<HTMLDivElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
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
    isDisabled,
    error,
    fullWidth,
    hideLabel,
    size,
    placeholder,
    variant,
    baseRef,
    inputRef,
    inputProps = {},
    inputWrapperProps = {},
    a11yFeedback = 'polite',
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
      ref={baseRef}
      className={styles.base({ className: classNames?.base })}
      data-focused={!isFocusVisible && isFocused}
      data-focus-visible={isFocusVisible && isFocused}
      data-hovered={isHovered}
      data-disabled={isDisabled}
    >
      {!hideLabel && !!label && (
        <label
          htmlFor={inputId}
          className={styles.label({ className: classNames?.label })}
        >
          {label}
        </label>
      )}

      <div
        ref={ref}
        className={styles.inputWrapper({ className: classNames?.inputWrapper })}
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
      >
        {startContent}

        <input
          ref={mergeRefs(innerInputRef, inputRef)}
          {...mergeProps(focusProps, focusRingProps, inputProps)}
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
          id={helperTextId}
          className={styles.helperText({ className: classNames?.helperText })}
        >
          {helperText}
        </div>
      )}

      {error && errorMessage && (
        <div
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

Input.displayName = 'gist-ui.Input';

export default Input;
