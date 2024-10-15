import { mergeRefs } from '@typeweave/react-utils/merge-refs';
import React from 'react';
import { InputVariantProps, inputStyles } from './input.styles';

type InputBaseProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  classNames?: Partial<{
    base: string;
    label: string;
    inputWrapper: string;
    input: string;
    helperText: string;
    required: string;
  }>;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
};

type TextareaBaseProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  classNames?: Partial<{
    base: string;
    label: string;
    inputWrapper: string;
    helperText: string;
    textarea: string;
    required: string;
  }>;
};

type BaseProps = InputVariantProps & {
  defaultValue?: string;
  value?: string;
  label?: string;
  id?: string;
  required?: boolean;
  helperText?: string;
  hideLabel?: boolean;
  className?: string;
  placeholder?: string;
  baseProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;
  labelProps?: Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'className'>;
  helperTextProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;
  inputWrapperProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'className'>;
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
    startContent,
    endContent,
    classNames,
    className,
    required,
    error = false,
    hideLabel,
    baseRef,
    baseProps = {},
    labelProps = {},
    helperTextProps = {},
    inputWrapperProps = {},
    fullWidth = false,
    disabled = false,
    inputWrapperRef,
    readOnly,
    multiline = false,
    ...restProps
  } = props;

  const labelId = React.useId();
  const helperTextId = React.useId();
  const inputId = id || labelId;

  const innerInputRef = React.useRef<HTMLInputElement | null>(null);
  const innerTextareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !label) {
      console.warn(
        'Typeweave: For accessible Input, provide `label` prop for screen readers to describe its purpose. If you want to hide the label visually, use the `hideLabel` prop',
      );
    }
  }, [label]);

  const styles = React.useMemo(() => inputStyles({ fullWidth }), [fullWidth]);

  const sharedProps = {
    'aria-label': hideLabel ? label : undefined,
    'aria-describedby': helperText ? helperTextId : undefined,
    'aria-required': required,
    'aria-invalid': error,
    id: inputId,
    disabled,
    readOnly,
    autoComplete: 'off',
  };

  const sharedDataAttributes = {
    'data-disabled': disabled,
    'data-multiline': multiline,
    'data-error': error,
  };

  return (
    <div
      {...baseProps}
      ref={baseRef}
      className={styles.base({ className: classNames?.base ?? className })}
      {...sharedDataAttributes}
    >
      {!hideLabel && !!label && (
        <label
          {...labelProps}
          htmlFor={inputId}
          className={styles.label({ className: classNames?.label })}
          {...sharedDataAttributes}
        >
          {label}

          {!required ? null : (
            <span
              aria-hidden={true}
              className={styles.required({ className: classNames?.required })}
            >
              *
            </span>
          )}
        </label>
      )}

      <div
        {...inputWrapperProps}
        onMouseDown={(e) => {
          inputWrapperProps.onMouseDown?.(e);

          if (e.currentTarget !== e.target || disabled || readOnly) return;
          e.preventDefault();
          innerInputRef.current?.focus();
          innerTextareaRef.current?.focus();
        }}
        ref={inputWrapperRef}
        className={styles.inputWrapper({ className: classNames?.inputWrapper })}
        {...sharedDataAttributes}
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
            {...sharedDataAttributes}
          ></textarea>
        )}

        {multiline ? null : (
          <input
            {...restProps}
            className={styles.input({ className: classNames?.input })}
            ref={mergeRefs(ref, innerInputRef)}
            {...sharedProps}
            {...sharedDataAttributes}
          />
        )}

        {!!endContent && !multiline && endContent}
      </div>

      {!helperText ? null : (
        <div
          {...helperTextProps}
          id={helperTextId}
          className={styles.helperText({ className: classNames?.helperText })}
          {...sharedDataAttributes}
        >
          {helperText}
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
