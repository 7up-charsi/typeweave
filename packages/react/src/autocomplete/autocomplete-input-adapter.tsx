import { Button } from '../button';
import { Chip } from '../chip';
import { AutocompleteRenderInputProps } from './autocomplete';
import { type InputProps } from '../input';
import {
  AutocompleteInputClassNames,
  InputClassNames,
  autocompleteInput,
} from '@typeweave/theme';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { mergeRefs } from '@typeweave/react-utils';

export const autocompleteInputAdapter = (
  inputProps: AutocompleteRenderInputProps,
  props?: {
    classNames?: AutocompleteInputClassNames & InputClassNames;
    disableOpenIndicator?: boolean;
    clearIcon?: React.ReactNode;
    openIndicatorIcon?: React.ReactNode;
    loader?: React.ReactNode;
  },
): InputProps<false> => {
  const {
    ariaProps,
    onOpen,
    clearButtonProps: { onClear, ...clearButtonProps },
    inputRef,
    disabled,
    onBlur,
    onChange,
    onKeyDown,
    popperReferenceRef,
    showClearButton,
    inputWrapperRef,
    selected,
    open,
    multiple,
    inputValue,
    loading,
    onFocus,
  } = inputProps;

  const styles = autocompleteInput({ multiple });

  const {
    classNames,
    disableOpenIndicator,
    loader,
    clearIcon = <XIcon />,
    openIndicatorIcon = <ChevronDownIcon />,
  } = props ?? {};

  return {
    classNames: {
      inputWrapper: styles.inputWrapper({
        className: classNames?.inputWrapper,
      }),
      input: styles.input({ className: classNames?.input }),
      startContent: styles.startContent({
        className: classNames?.startContent,
      }),
      endContent: styles.endContent({
        className: classNames?.endContent,
      }),
      base: classNames?.base,
      errorMessage: classNames?.errorMessage,
      helperText: classNames?.helperText,
      label: classNames?.label,
    },
    startContent: selected?.map((opt, i) => (
      <Chip
        key={i}
        color="default"
        label={opt.label}
        onDelete={opt.onDelete}
        tabIndex={-1}
      />
    )),
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
      // @ts-expect-error ----
      'data-chips': !!selected?.length,
      onPointerDown: (e) => {
        if (e.button !== 0 || disabled) return;

        if (
          (e.target as HTMLElement).closest('button') ||
          (e.target as HTMLElement).closest('[role=button]')
        ) {
          e.preventDefault();
          return;
        }

        onOpen();
      },
    },
    ref: mergeRefs(popperReferenceRef, inputWrapperRef),
    inputRef,
    onBlur,
    onFocus,
    value: inputValue,
    onChange,
    disabled,
    onKeyDown,
    ...ariaProps,
  };
};
