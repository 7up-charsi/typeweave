import { Button } from '@webbo-ui/button';
import { Chip } from '@webbo-ui/chip';
import { RenderInputProps } from './autocomplete';
import { type InputProps } from '@webbo-ui/input';
import {
  AutocompleteInputClassNames,
  InputClassNames,
  autocompleteInput,
} from '@webbo-ui/theme';
import { Icon } from '@webbo-ui/icon';

const clearIcon_svg = (
  <Icon>
    <svg
      viewBox="-2.4 -2.4 28.80 28.80"
      fill="none"
      stroke="currentColor"
      transform="rotate(0)"
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  </Icon>
);

const openIndicator_svg = (
  <Icon>
    <svg viewBox="0 0 24 24" fill="none">
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.00003 8.5C6.59557 8.5 6.23093 8.74364 6.07615 9.11732C5.92137 9.49099 6.00692 9.92111 6.29292 10.2071L11.2929 15.2071C11.6834 15.5976 12.3166 15.5976 12.7071 15.2071L17.7071 10.2071C17.9931 9.92111 18.0787 9.49099 17.9239 9.11732C17.7691 8.74364 17.4045 8.5 17 8.5H7.00003Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  </Icon>
);

export const mapInputProps = (
  inputProps: RenderInputProps<unknown>,
  props?: {
    classNames?: AutocompleteInputClassNames & InputClassNames;
    disableIndicator?: boolean;
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
    selected,
    isOpen,
    multiple,
    inputValue,
  } = inputProps;

  const styles = autocompleteInput({ multiple });

  const { classNames, disableIndicator } = props ?? {};

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
        variant="border"
        label={opt.label}
        onDelete={opt.onDelete}
        aria-label={`selected ${opt.label}`}
        deleteIconA11yLabel={`remove ${opt.label}`}
        excludeFromTabOrder
      />
    )),
    endContent: (
      <>
        {showClearButton && (
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
            {clearIcon_svg}
          </Button>
        )}

        {disableIndicator ? null : (
          <span
            style={{ rotate: isOpen ? '180deg' : '0deg' }}
            className={styles.openIndecator({
              className: classNames?.openIndecator,
            })}
          >
            {openIndicator_svg}
          </span>
        )}
      </>
    ),
    inputWrapperProps: {
      // @ts-expect-error ----
      'data-chips': !!selected?.length,
      onPointerDown: (e: React.PointerEvent) => {
        e.preventDefault();
        if (
          (e.target as HTMLElement).closest('button') ||
          e.button !== 0 ||
          disabled
        )
          return;

        inputRef.current?.focus();
        onOpen();
      },
    },
    ref: popperReferenceRef,
    inputRef,
    onBlur,
    value: inputValue,
    onChange,
    disabled,
    onKeyDown,
    ...ariaProps,
  };
};
