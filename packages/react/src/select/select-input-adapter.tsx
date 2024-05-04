import { Button } from '../button';
import { SelectRenderInputProps } from './select';
import {
  InputClassNames,
  SelectInputClassNames,
  selectInput,
} from '@typeweave/theme';
import { type InputProps } from '../input';
import React from 'react';
import { ChevronDownIcon, XIcon } from 'lucide-react';

export const selectInputAdapter = (
  inputProps: SelectRenderInputProps,
  props?: {
    classNames?: SelectInputClassNames & InputClassNames;
    disableOpenIndicator?: boolean;
    clearIcon?: React.ReactNode;
    openIndicatorIcon?: React.ReactNode;
    loader?: React.ReactNode;
  },
): InputProps<false> => {
  const {
    ariaProps,
    clearButtonProps: { onClear, ...clearButtonProps },
    onOpen,
    inputRef,
    disabled,
    onBlur,
    onKeyDown,
    popperReferenceRef,
    showClearButton,
    open,
    inputValue,
    readOnly,
    loading,
  } = inputProps;

  const {
    classNames,
    disableOpenIndicator,
    loader,
    clearIcon = <XIcon />,
    openIndicatorIcon = <ChevronDownIcon />,
  } = props ?? {};

  const styles = selectInput();

  return {
    classNames: {
      input: styles.input({ className: classNames?.input }),
      base: classNames?.base,
      endContent: classNames?.endContent,
      errorMessage: classNames?.errorMessage,
      helperText: classNames?.helperText,
      inputWrapper: classNames?.inputWrapper,
      label: classNames?.label,
      startContent: classNames?.startContent,
    },
    endContent: (
      <>
        {!loading && showClearButton && (
          <Button
            {...clearButtonProps}
            isIconOnly
            variant="text"
            onPress={onClear}
            size="sm"
            classNames={{
              base: styles.clearButton({
                className: classNames?.clearButton,
              }),
            }}
          >
            {clearIcon}
          </Button>
        )}

        {loading &&
          (loader ?? (
            <div
              className={styles.loader({ className: classNames?.loader })}
              role="status"
              aria-label="loading"
            ></div>
          ))}

        {disableOpenIndicator ? null : (
          <span
            style={{ rotate: open ? '180deg' : '0deg' }}
            className={styles.openIndecator({
              className: classNames?.openIndecator,
            })}
          >
            {openIndicatorIcon}
          </span>
        )}
      </>
    ),
    inputWrapperProps: {
      onPointerDown: (e) => {
        if (e.button !== 0 || disabled) return;

        if ((e.target as HTMLElement).closest('button')) {
          e.preventDefault();
          return;
        }

        onOpen();
      },
    },
    // @ts-expect-error ----
    ref: popperReferenceRef,
    inputRef,
    onBlur,
    value: inputValue,
    disabled: !!disabled,
    onKeyDown,
    ...ariaProps,
    readOnly,
  };
};
