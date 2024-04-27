import { Button } from '../button';
import { SelectRenderInputProps } from './select';
import { SelectInputClassNames, selectInput } from '@webbo-ui/theme';
import { type InputProps } from '../input';
import React from 'react';

export const mapInputProps = (
  inputProps: SelectRenderInputProps,
  props?: {
    classNames?: SelectInputClassNames;
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
    isOpen,
    inputValue,
    readOnly,
    loading,
  } = inputProps;

  const {
    classNames,
    disableOpenIndicator,
    loader,
    clearIcon,
    openIndicatorIcon,
  } = props ?? {};

  const styles = selectInput();

  return {
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
            style={{ rotate: isOpen ? '180deg' : '0deg' }}
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
