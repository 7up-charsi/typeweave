import { mergeRefs } from '@typeweave/react-utils';
import React from 'react';
import { PointerEventsProps } from '../pointer-events/pointer-events';
import { usePointerEvents } from '../use-pointer-events';
import { InputVariantProps, inputStyles } from './input.styles';

type InputBaseProps = React.InputHTMLAttributes<HTMLInputElement> &
  PointerEventsProps<HTMLInputElement> & {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    classNames?: Partial<{
      base: string;
      label: string;
      inputWrapper: string;
      input: string;
      helperText: string;
      errorMessage: string;
    }>;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
  };

type TextareaBaseProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  PointerEventsProps<HTMLTextAreaElement> & {
    classNames?: Partial<{
      base: string;
      label: string;
      inputWrapper: string;
      helperText: string;
      errorMessage: string;
      textarea: string;
    }>;
  };

type BaseProps = InputVariantProps & {
  defaultValue?: string;
  value?: string;
  label?: string;
  id?: string;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  hideLabel?: boolean;
  className?: string;
  placeholder?: string;
  baseProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;
  labelProps?: Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'className'>;
  helperTextProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;
  errorMessageProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;
  inputWrapperProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> &
    PointerEventsProps<HTMLDivElement>;
  baseRef?: React.ForwardedRef<HTMLDivElement>;
  inputWrapperRef?: React.ForwardedRef<HTMLDivElement>;
  error?: boolean;
};

export type InputProps<Multiline> = BaseProps &
  (Multiline extends true
    ? TextareaBaseProps & {
        multiline: Multiline;
      }
    : InputBaseProps & {
        multiline?: false;
      });

type InputImplProps = BaseProps & { multiline?: boolean } & InputBaseProps &
  TextareaBaseProps;

const displayName = 'Input';

const InputImpl = (
  props: InputImplProps,
  ref: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const {
    label,
    id,
    helperText,
    errorMessage,
    startContent,
    endContent,
    classNames,
    className,
    required,
    error,
    hideLabel,
    baseRef,
    baseProps = {},
    labelProps = {},
    helperTextProps = {},
    inputWrapperProps: inputWrapperPropsProp = {},
    errorMessageProps = {},
    fullWidth = false,
    disabled = false,
    inputWrapperRef,
    multiline,
    onPointerDown,
    onPointerUp,
    onPress,
    ...restProps
  } = props;

  const {
    onPointerDown: inputWrapperOnPointerDown,
    onPointerUp: inputWrapperOnPointerUp,
    onPress: inputWrapperOnPress,
    ...inputWrapperProps
  } = inputWrapperPropsProp as Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'className'
  > &
    PointerEventsProps<HTMLDivElement>;

  const labelId = React.useId();
  const helperTextId = React.useId();
  const errorMessageId = React.useId();
  const inputId = id || labelId;

  const innerInputRef = React.useRef<HTMLInputElement | null>(null);
  const innerTextareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const inputWrapperPointerEvents = usePointerEvents({
    onPointerUp: inputWrapperOnPointerUp,
    onPress: inputWrapperOnPress,
    onPointerDown: (e) => {
      inputWrapperOnPointerDown?.(e);

      if (e.currentTarget !== e.target) return;
      if (e.button !== 0 || disabled) return;
      if (!multiline && e.target instanceof HTMLInputElement) return;
      if (multiline && e.target instanceof HTMLTextAreaElement) return;

      e.preventDefault();
      innerInputRef.current?.focus();
      innerTextareaRef.current?.focus();
    },
  });

  const pointerEvents = usePointerEvents<
    HTMLInputElement | HTMLTextAreaElement
  >({
    onPointerDown,
    onPointerUp,
    onPress,
  });

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !label) {
      console.warn(
        'Typeweave: For accessible Input, provide `label` prop for screen readers to describe its purpose. If you want to hide the label visually, use the `hideLabel` prop',
      );
    }
  }, [label]);

  const styles = React.useMemo(
    () =>
      inputStyles({
        disabled,
        fullWidth,
        required: !!required,
        multiline,
      }),
    [disabled, fullWidth, multiline, required],
  );

  const sharedProps = {
    'aria-label': hideLabel ? label : undefined,
    'aria-describedby': helperText ? helperTextId : undefined,
    'aria-errormessage': error && errorMessage ? errorMessageId : undefined,
    'aria-required': required,
    'aria-invalid': error,
    id: inputId,
    disabled,
    autoComplete: 'off',
    ...pointerEvents,
  };

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
        {...inputWrapperPointerEvents}
        ref={inputWrapperRef}
        className={styles.inputWrapper({ className: classNames?.inputWrapper })}
      >
        {!!startContent && !multiline && startContent}

        {!multiline ? null : (
          <textarea
            rows={5}
            {...restProps}
            className={styles.textarea({
              className: classNames?.textarea,
            })}
            ref={mergeRefs(ref, innerTextareaRef)}
            {...sharedProps}
          ></textarea>
        )}

        {multiline ? null : (
          <input
            {...restProps}
            className={styles.input({ className: classNames?.input })}
            ref={mergeRefs(ref, innerInputRef)}
            {...sharedProps}
          />
        )}

        {!!endContent && !multiline && endContent}
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
          {...errorMessageProps}
          id={errorMessageId}
          aria-live="polite"
          className={styles.errorMessage({
            className: classNames?.errorMessage,
          })}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

InputImpl.displayName = displayName;

export const Input = React.forwardRef(InputImpl) as unknown as <
  Multiline extends boolean = false,
>(
  props: InputProps<Multiline> &
    React.RefAttributes<
      Multiline extends true ? HTMLTextAreaElement : HTMLInputElement
    >,
) => React.ReactNode;
