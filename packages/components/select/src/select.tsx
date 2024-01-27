import * as Popper from '@gist-ui/popper';
import { Input, InputProps } from '@gist-ui/input';
import { useControllableState } from '@gist-ui/use-controllable-state';
import { useClickOutside } from '@gist-ui/use-click-outside';
import { Button } from '@gist-ui/button';
import { GistUiError } from '@gist-ui/error';
import { useFocusVisible } from '@react-aria/interactions';
import { useEffect, useId, useRef, useState } from 'react';
import {
  InputClassNames,
  SelectClassNames,
  SelectVariantProps,
  select,
} from '@gist-ui/theme';

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

export type Reason = 'select' | 'clear';

export type SelectProps<
  Value,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
> = (SelectVariantProps &
  Omit<InputProps, 'defaultValue' | 'value' | 'onChange' | 'classNames'> & {
    classNames?: InputClassNames & SelectClassNames;
    offset?: Popper.FloatingProps['mainOffset'];
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    openIndicator?: React.ReactNode;
    clearIcon?: React.ReactNode;
    children?: React.ReactNode;
  }) &
  (Multiple extends true
    ? {
        multiple: Multiple;
        defaultValue?: Value[];
        value?: Value[];
        onChange?: (value: Value[], reason: Reason) => void;
        disableClearable?: DisableClearable;
      }
    : DisableClearable extends true
      ? {
          multiple?: Multiple;
          defaultValue?: Value;
          value?: Value;
          onChange?: (value: Value, reason: Reason) => void;
          disableClearable: DisableClearable;
        }
      : {
          multiple?: Multiple;
          defaultValue?: Value;
          value?: Value | null;
          onChange?: (value: Value | null, reason: Reason) => void;
          disableClearable?: DisableClearable;
        });

type OptionState = {
  index: number;
  isDisabled: boolean;
  callback: () => void;
  value: string;
  id: string;
};

interface _SelectProps
  extends SelectVariantProps,
    Omit<InputProps, 'defaultValue' | 'value' | 'onChange' | 'classNames'> {
  classNames?: InputClassNames & SelectClassNames;
  offset?: Popper.FloatingProps['mainOffset'];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  openIndicator?: React.ReactNode;
  clearIcon?: React.ReactNode;
  children?: React.ReactNode;
  multiple?: boolean;
  defaultValue?: string | string[];
  value?: string | null | string[];
  onChange?: (value: string | null | string[], reason: Reason) => void;
  disableClearable?: undefined;
}

const Select = (props: _SelectProps) => {
  const {
    classNames,
    offset,
    isOpen: openProp,
    onOpenChange,
    defaultOpen = false,
    defaultValue,
    value: valueProp,
    onChange,
    shadow,
    isDisabled,
    multiple,
    startContent,
    endContent,
    clearIcon = clearIcon_svg,
    openIndicator = openIndicator_svg,
    disableClearable,
    children,
    ...inputProps
  } = props;

  const [value, setValue] = useControllableState<
    string | string[] | null,
    Reason
  >({
    defaultValue,
    value: valueProp,
    resetStateValue: undefined,
    onChange: (value, reason) => {
      if (!reason)
        throw new GistUiError(
          'Autocomplete',
          'internal Error, reason is not defined',
        );

      onChange?.(value, reason);
    },
  });

  const inputRef = useRef<HTMLDivElement>(null);

  const options = useRef<Record<string, OptionState>>({}).current;

  const optionsLength = Object.keys(options).length;

  const [focused, setFocused] = useState<OptionState | null>(null);

  const { isFocusVisible } = useFocusVisible({ isTextInput: true });

  const lisboxId = useId();

  const state = useRef<{
    searchedString: string;
    searchedStringTimer?: ReturnType<typeof setTimeout>;
  }>({
    searchedString: '',
  }).current;

  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    value: openProp,
    onChange: onOpenChange,
    resetStateValue: false,
  });

  const handleListboxClose = () => {
    setIsOpen(false);
    setFocused(null);
  };

  const setListboxOutsideEle = useClickOutside<HTMLUListElement>({
    isDisabled: !isOpen,
    onEvent: 'pointerdown',
    callback: (e) => {
      if (inputRef.current?.contains(e.target as Node)) return;
      handleListboxClose();
    },
  });

  const handleListboxOpen = () => {
    if (isOpen) return;

    setIsOpen(true);

    if (!optionsLength) return;

    if (!value) {
      setFocused(getNext(createCustomItem(0), options));
      return;
    }

    if (multiple && Array.isArray(value) && value.length) {
      setFocused(options[flatString(value[value.length - 1])]);
      return;
    }

    if (!multiple && !Array.isArray(value)) {
      setFocused(options[flatString(value)]);
      return;
    }
  };

  // const handleOptionSelect = (option: string) => () => {
  //   //

  //   if (multiple && Array.isArray(value)) {
  //     const val = value.find((ele) => ele === option)
  //       ? value.filter((ele) => ele !== option)
  //       : [...value, option];

  //     setValue(val, 'select');
  //     setFocused(options[option]);
  //   }

  //   if (!multiple && !Array.isArray(value)) {
  //     setValue(option, 'select');
  //     handleListboxClose();
  //   }
  // };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    const ArrowDown = e.key === 'ArrowDown';
    const ArrowUp = e.key === 'ArrowUp';
    const Escape = e.key === 'Escape';
    const Enter = e.key === 'Enter';
    const Home = e.key === 'Home';
    const End = e.key === 'End';

    if (ArrowDown && !isOpen) {
      handleListboxOpen();
      return;
    }

    if (!optionsLength || !isOpen) return;

    if (Escape) {
      handleListboxClose();
      return;
    }

    if (Enter && focused) {
      e.preventDefault();
      focused.callback();
      return;
    }

    if ((ArrowDown || ArrowUp) && !focused) {
      setFocused(getNext(createCustomItem(0), options) ?? focused);
      return;
    }

    if (ArrowDown && focused && focused.index < optionsLength) {
      setFocused(getNext(focused, options) ?? focused);
      return;
    }

    if (ArrowUp && focused && focused.index > 1) {
      setFocused(getPrevious(focused, options) ?? focused);
      return;
    }

    if (Home) {
      setFocused(getNext(createCustomItem(0), options) ?? focused);
      return;
    }

    if (End) {
      setFocused(
        getPrevious(createCustomItem(optionsLength + 1), options) ?? focused,
      );
      return;
    }
  };

  const handleClearValue = () => {
    setIsOpen(true);
    inputRef.current?.focus();

    if (multiple) {
      setValue([], 'clear');
    } else {
      setValue(null, 'clear');
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(state.searchedStringTimer);
    };
  }, [state]);

  const startContentSelected =
    multiple && Array.isArray(value) && value.length
      ? `${value.length} selected ${isOpen ? ' -' : ''}`
      : null;

  const styles = select({ shadow });

  return (
    <Popper.Root>
      <Popper.Reference>
        <Input
          {...inputProps}
          value={!multiple && !Array.isArray(value) && value ? value : ''}
          isDisabled={isDisabled}
          ref={inputRef}
          onFocus={() => {
            if (!isFocusVisible) handleListboxOpen();
          }}
          onBlur={() => {
            if (isFocusVisible) handleListboxClose();
          }}
          classNames={classNames}
          onKeyDown={handleInputKeyDown}
          aria-expanded={isOpen}
          aria-controls={lisboxId}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-activedescendant={focused?.id || undefined}
          role="combobox"
          autoComplete="none"
          readOnly={true}
          startContent={
            startContent ? (
              <>
                {startContent}
                {startContentSelected}
              </>
            ) : (
              startContentSelected
            )
          }
          endContent={
            <>
              {value?.length && !disableClearable && (
                <Button
                  isIconOnly
                  size="sm"
                  variant="text"
                  preventFocusOnPress
                  aria-label="clear value"
                  tabIndex={-1}
                  onPress={handleClearValue}
                  className={styles.clearButton({
                    className: classNames?.clearButton,
                  })}
                >
                  {clearIcon}
                </Button>
              )}

              <div
                data-open={isOpen}
                className={styles.openIndicator({
                  className: classNames?.openIndicator,
                })}
              >
                {openIndicator}
              </div>

              {endContent}
            </>
          }
        />
      </Popper.Reference>

      {isOpen && (
        <Popper.Floating sticky="always" mainOffset={offset || 5}>
          <ul
            ref={setListboxOutsideEle}
            id={lisboxId}
            className={styles.listbox({
              className: classNames?.listbox,
            })}
            role="listbox"
            aria-roledescription={
              multiple ? 'multiple select list' : 'single select list'
            }
            aria-multiselectable={multiple}
          >
            {children}
          </ul>
        </Popper.Floating>
      )}
    </Popper.Root>
  );
};

Select.displayName = 'gist-ui.Select';

export default Select as <
  Value extends string,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
>(
  props: SelectProps<Value, Multiple, DisableClearable>,
) => React.ReactNode;

// *-*-*-*-* Utils *-*-*-*-*

const flatString = (value: string) => value.replaceAll(' ', '-');

const getNext = (current: OptionState, items: Record<string, OptionState>) => {
  for (let i = current.index + 1; i <= Object.keys(items).length; i++) {
    const focused = items[i];
    if (!focused.isDisabled) return focused;
  }

  return null;
};

const getPrevious = (
  current: OptionState,
  items: Record<string, OptionState>,
) => {
  for (let i = current.index - 1; i > 0; i--) {
    const focused = items[i];
    if (!focused.isDisabled) return focused;
  }

  return null;
};

const createCustomItem = (index: number): OptionState => ({
  index,
  isDisabled: false,
  callback: () => {},
  value: '',
  id: '',
});

// {loading && !options?.length ? (
//   <div
//     className={styles.loading({ className: classNames?.loading })}
//   >
//     {loadingText}
//   </div>
// ) : null}

// {!loading && !options?.length ? (
//   <div
//     className={styles.noOptions({
//       className: classNames?.noOptions,
//     })}
//   >
//     {noOptionsText}
//   </div>
// ) : null}
