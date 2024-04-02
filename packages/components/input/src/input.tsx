import { input, InputClassNames, InputVariantProps } from '@webbo-ui/theme';
import { mergeRefs } from '@webbo-ui/react-utils';
import { forwardRef, useEffect, useId, useRef } from 'react';

export interface InputProps
  extends InputVariantProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string;
  value?: string;
  label?: string;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  hideLabel?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  classNames?: InputClassNames;
  className?: string;
  placeholder?: string;
  baseProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;
  labelProps?: Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'className'>;
  helperTextProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;
  inputWrapperProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;
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
    classNames,
    className,
    required,
    onChange,
    onFocus,
    onBlur,
    error,
    hideLabel,
    placeholder,
    baseRef,
    inputRef,
    baseProps = {},
    labelProps = {},
    helperTextProps = {},
    inputWrapperProps = {},
    fullWidth = false,
    disabled = false,
    ...restProps
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

  const styles = input({
    disabled,
    fullWidth,
    required: !!required,
    error: !!error,
  });

  return (
    <div
      {...baseProps}
      ref={baseRef}
      className={styles.base({ className: classNames?.base ?? className })}
      data-disabled={disabled}
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
        {...inputWrapperProps}
        onPointerDown={(e) => {
          inputWrapperProps?.onPointerDown?.(e);

          if (disabled) return;
          if (e.button !== 0) return;

          if (e.target === e.currentTarget) {
            e.preventDefault();
            innerInputRef.current?.focus();
            return;
          }
        }}
        ref={ref}
        className={styles.inputWrapper({ className: classNames?.inputWrapper })}
      >
        {!!startContent && (
          <span
            className={styles.startContent({
              className: classNames?.startContent,
            })}
          >
            {startContent}
          </span>
        )}

        <input
          {...restProps}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={mergeRefs(innerInputRef, inputRef)}
          value={value}
          defaultValue={defaultValue}
          aria-label={hideLabel ? label : undefined}
          aria-describedby={helperText ? helperTextId : undefined}
          aria-errormessage={error && errorMessage ? errorMessageId : undefined}
          aria-required={required}
          aria-invalid={error}
          id={inputId}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          className={styles.input({ className: classNames?.input })}
          autoComplete="off"
        />

        {!!endContent && (
          <span
            className={styles.endContent({
              className: classNames?.endContent,
            })}
          >
            {endContent}
          </span>
        )}
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
          aria-live="polite"
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
