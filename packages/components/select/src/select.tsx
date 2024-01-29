import * as Popper from '@gist-ui/popper';
import { Input, InputProps } from '@gist-ui/input';
import { useControllableState } from '@gist-ui/use-controllable-state';
import { useClickOutside } from '@gist-ui/use-click-outside';
import { Button } from '@gist-ui/button';
import { GistUiError } from '@gist-ui/error';
import { useFocusVisible } from '@react-aria/interactions';
import { useId, useMemo, useRef, useState } from 'react';
import { Option, OptionProps } from './option';
import lodashGroupBy from 'lodash.groupby';
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

export type SelectProps<Value, Multiple, DisableClearable> =
  (SelectVariantProps &
    Omit<
      InputProps,
      'defaultValue' | 'value' | 'onChange' | 'classNames' | 'multiline'
    > & {
      classNames?: InputClassNames & SelectClassNames;
      offset?: Popper.FloatingProps['mainOffset'];
      options: Value[];
      isOpen?: boolean;
      onOpenChange?: (open: boolean) => void;
      defaultOpen?: boolean;
      openIndicator?: React.ReactNode;
      clearIcon?: React.ReactNode;
      getOptionDisabled?: (option: Value) => boolean;
      disableCloseOnSelect?: boolean;
      getOptionLabel?: (option: Value) => string;
      noOptionsText?: string;
      loading?: boolean;
      loadingText?: string;
      groupBy?: (option: Value) => string;
      children?: (props: {
        groupedOptions: Record<string, OptionProps<Value>[]> | null;
        options: OptionProps<Value>[] | null;
      }) => React.ReactNode;
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

const _Select = (props: SelectProps<object, false, false>) => {
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
    options = [],
    isDisabled,
    multiple,
    endContent,
    clearIcon = clearIcon_svg,
    openIndicator = openIndicator_svg,
    disableClearable,
    disableCloseOnSelect,
    children,
    getOptionDisabled,
    noOptionsText = 'no options',
    loading,
    loadingText = 'loading ...',
    getOptionLabel: getOptionLabelProp,
    groupBy,
    ...inputProps
  } = props;

  const getOptionLabel = (option: object) => {
    if (getOptionLabelProp) {
      return getOptionLabelProp(option);
    }

    if (!('label' in option))
      throw new GistUiError(
        'Select',
        'consider to add `label` property in all options or use `getOptionLabel` prop to get option label',
      );

    return option.label as string;
  };

  const [value, setValue] = useControllableState<
    object | object[] | null,
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

  const groupedOptions = useMemo(() => {
    if (!groupBy) return null;

    const grouped = lodashGroupBy(options, (opt) => {
      const by = groupBy(opt);

      if (!isNaN(+by)) return '0-9';

      return by;
    });

    return Object.entries(grouped)
      .sort((a, b) => {
        const a_key = a[0];
        const b_key = b[0];

        if (a_key < b_key) return -1;
        if (a_key > b_key) return 1;
        return 0;
      })
      .reduce<Record<string, object[]>>(
        (acc, ele) => ((acc[ele[0]] = ele[1]), acc),
        {},
      );
  }, [groupBy, options]);

  const inputRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState<object | null>(null);
  const { isFocusVisible } = useFocusVisible({ isTextInput: true });
  const lisboxId = useId();

  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    value: openProp,
    onChange: onOpenChange,
    resetStateValue: false,
  });

  const handleClose = () => {
    setIsOpen(false);
    setFocused(null);
  };

  const setListboxOutsideEle = useClickOutside<HTMLUListElement>({
    isDisabled: !isOpen,
    onEvent: 'pointerdown',
    callback: (e) => {
      if (inputRef.current?.contains(e.target as Node)) return;
      handleClose();
    },
  });

  const handleOpen = () => {
    if (isOpen) return;

    setIsOpen(true);

    if (!options.length) return;

    if (!value) {
      setFocused(getNext(options[0], options, getOptionDisabled));
      return;
    }

    setFocused(Array.isArray(value) ? value[0] : value);
  };

  const onSelect = (option: object) => {
    if (Array.isArray(value)) {
      const val = value.find((ele) => ele === option)
        ? value.filter((ele) => ele !== option)
        : [...value, option];

      setValue(val, 'select');
      setFocused(option);
    }

    if (!Array.isArray(value)) {
      setValue(option, 'select');
      setFocused(option);
    }

    if (!disableCloseOnSelect) handleClose();
  };

  const onHover = (option: object) => {
    setFocused(option);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const ArrowDown = e.key === 'ArrowDown';
    const ArrowUp = e.key === 'ArrowUp';
    const Escape = e.key === 'Escape';
    const Enter = e.key === 'Enter';
    const Home = e.key === 'Home';
    const End = e.key === 'End';

    if (ArrowDown && !isOpen) {
      handleOpen();
      return;
    }

    if (!options.length || !isOpen) return;

    if (Escape) {
      handleClose();
      return;
    }

    if (Enter && focused) {
      e.preventDefault();
      onSelect(focused);
      return;
    }

    if ((ArrowDown || ArrowUp) && !focused) {
      setFocused(getNext(options[0], options, getOptionDisabled));
      return;
    }

    if (ArrowDown && focused && focused !== options[options.length - 1]) {
      setFocused(getNext(options[options.indexOf(focused) + 1], options));
      return;
    }

    if (ArrowUp && focused && focused !== options[0]) {
      setFocused(getPrevious(options[options.indexOf(focused) - 1], options));
      return;
    }

    if (Home) {
      setFocused(getNext(options[0], options));
      return;
    }

    if (End) {
      setFocused(getPrevious(options[options.length - 1], options));
      return;
    }
  };

  const handleClearValue = () => {
    inputRef.current?.focus();
    setFocused(null);

    if (multiple) {
      setValue([], 'clear');
    } else {
      setValue(null, 'clear');
    }
  };

  const getInputValue = (value: object | null | object[]) => {
    if (!value) return '';

    if (Array.isArray(value))
      return value.map((ele) => getOptionLabel?.(ele)).join(', ');

    if (!Array.isArray(value)) return getOptionLabel?.(value);

    return '';
  };

  const getOptionProps = (ele: object, i: number) => {
    const isFocused = ele === focused;
    const isDisabled = getOptionDisabled?.(ele) ?? false;
    const isSelected = Array.isArray(value)
      ? !!value.find((val) => val === ele)
      : ele === value;

    return {
      option: ele,
      label: getOptionLabel(ele),
      props: {
        className: styles.option({ className: classNames?.option }),
        id: `option-${i}`,
        role: 'option',
        'aria-selected': isDisabled ? undefined : isSelected,
        'data-disabled': isDisabled,
        'data-selected': isSelected,
        'data-focused': isFocused,
      },
      onHover: () => onHover(ele),
      onSelect: () => onSelect(ele),
      state: {
        isFocused,
        isSelected,
        isDisabled,
      },
    };
  };

  if (multiple && !Array.isArray(value))
    throw new GistUiError(
      'Select',
      'value must be an Array when multiple is true',
    );

  if (!multiple && Array.isArray(value))
    throw new GistUiError(
      'Select',
      'value must not be an Array when multiple is false',
    );

  const styles = select({ shadow });

  return (
    <Popper.Root>
      <Popper.Reference>
        <Input
          {...inputProps}
          value={getInputValue(value)}
          isDisabled={isDisabled}
          ref={inputRef}
          onBlur={() => {
            if (isFocusVisible) handleClose();
          }}
          classNames={classNames}
          inputProps={{
            onKeyDown: handleKeyDown,
            'aria-expanded': isOpen,
            'aria-controls': lisboxId,
            'aria-haspopup': 'listbox',
            'aria-autocomplete': 'list',
            'aria-activedescendant':
              isOpen && focused
                ? `option-${options.indexOf(focused)}`
                : undefined,
            role: 'combobox',
            autoComplete: 'none',
            readOnly: true,
          }}
          inputWrapperProps={{
            onPointerDown: (e) => {
              if (isDisabled) return;
              if (e.button !== 0) return;
              handleOpen();
            },
          }}
          endContent={
            <>
              {(Array.isArray(value) ? !!value?.length : value) &&
                !disableClearable && (
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
            className={styles.listbox({ className: classNames?.listbox })}
            role="listbox"
            aria-multiselectable={multiple}
            aria-roledescription={
              multiple ? 'multiple select list' : 'single select list'
            }
          >
            {children && options.length && !groupBy
              ? children({
                  options: options.map(getOptionProps),
                  groupedOptions: null,
                })
              : null}

            {children && options.length && groupBy && groupedOptions
              ? children({
                  options: null,
                  groupedOptions: Object.entries(groupedOptions).reduce<
                    Record<string, OptionProps<object>[]>
                  >(
                    (acc, [key, val]) => (
                      (acc[key] = val.map(getOptionProps)), acc
                    ),
                    {},
                  ),
                })
              : null}

            {!children && options.length && !groupBy
              ? options.map((ele, i) => (
                  <Option key={i} {...getOptionProps(ele, i)} />
                ))
              : null}

            {!children && options.length && groupBy && groupedOptions
              ? Object.entries(groupedOptions).map(([groupHeader, grouped]) => (
                  <li
                    key={groupHeader.replaceAll(' ', '-')}
                    className={styles.group({ className: classNames?.group })}
                  >
                    <div
                      className={styles.groupHeader({
                        className: classNames?.groupHeader,
                      })}
                    >
                      {groupHeader}
                    </div>
                    <ul
                      className={styles.groupItems({
                        className: classNames?.groupItems,
                      })}
                    >
                      {grouped.map((ele, i) => (
                        <Option key={i} {...getOptionProps(ele, i)} />
                      ))}
                    </ul>
                  </li>
                ))
              : null}

            {!loading && !options?.length ? (
              <div
                className={styles.noOptions({
                  className: classNames?.noOptions,
                })}
              >
                {noOptionsText}
              </div>
            ) : null}

            {loading && !options?.length ? (
              <div
                className={styles.loading({
                  className: classNames?.noOptions,
                })}
              >
                {loadingText}
              </div>
            ) : null}
          </ul>
        </Popper.Floating>
      )}
    </Popper.Root>
  );
};

_Select.displayName = 'gist-ui.Select';

export const Select = _Select as unknown as <
  Value extends object,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
>(
  props: SelectProps<Value, Multiple, DisableClearable>,
) => React.ReactNode;

// *-*-*-*-* Utils *-*-*-*-*

const getNext = (
  current: object,
  items: object[],
  isOptionDisabled?: (opt: object) => boolean,
) => {
  if (!isOptionDisabled) return current;

  for (let i = items.indexOf(current); i <= items.length; i++) {
    const option = items[i];
    if (!isOptionDisabled(option)) return option;
  }

  return current;
};

const getPrevious = (
  current: object,
  items: object[],
  isOptionDisabled?: (opt: object) => boolean,
) => {
  if (!isOptionDisabled) return current;

  for (let i = items.indexOf(current) - 1; i > 0; i--) {
    const option = items[i];
    if (!isOptionDisabled(option)) return option;
  }

  return current;
};
