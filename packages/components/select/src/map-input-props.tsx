'use client';

import { Button } from '@webbo-ui/button';
import { RenderInputProps } from './select';
import { selectInput } from '@webbo-ui/theme';
import { InputProps } from '@webbo-ui/input';

const clearIcon_svg = (
  <svg
    width={18}
    height={18}
    viewBox="-2.4 -2.4 28.80 28.80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
);

const openIndicator_svg = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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
);

export const mapInputProps = ({
  ariaProps,
  handleClear,
  handleOpen,
  inputRef,
  disabled,
  onBlur,
  onKeyDown,
  popperReferenceRef,
  showClearButton,
  isOpen,
  inputValue,
  readOnly,
}: RenderInputProps<unknown>): InputProps => {
  const styles = selectInput();

  return {
    endContent: (
      <div className={styles.endContent()}>
        {showClearButton && (
          <Button
            isIconOnly
            variant="text"
            onPress={handleClear}
            size="sm"
            tabIndex={-1}
            aria-label="clear value"
            className={styles.clearButton()}
          >
            {clearIcon_svg}
          </Button>
        )}

        <span
          style={{ rotate: isOpen ? '180deg' : '0deg' }}
          className={styles.openIndecator()}
        >
          {openIndicator_svg}
        </span>
      </div>
    ),
    inputWrapperProps: {
      onPointerDown: (e: React.PointerEvent) => {
        if (e.button !== 0) return;
        if (disabled) return;
        handleOpen();
      },
    },
    // @ts-expect-error ----
    ref: popperReferenceRef,
    inputRef,
    onBlur,
    value: inputValue,
    disabled: !!disabled,
    inputProps: { onKeyDown, ...ariaProps, readOnly },
  };
};
