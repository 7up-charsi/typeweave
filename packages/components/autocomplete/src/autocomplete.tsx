

import * as Popper from '@webbo-ui/popper';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { CustomError } from '@webbo-ui/error';
import { forwardRef, useId, useMemo, useRef, useState } from 'react';
import { Option, OptionProps } from './option';
import lodashGroupBy from 'lodash.groupby';
import {
  AutocompleteClassNames,
  AutocompleteVariantProps,
  autocomplete,
} from '@webbo-ui/theme';
import { mergeRefs } from '@webbo-ui/react-utils';

export type Reason = 'select' | 'clear' | 'remove';

export interface RenderInputProps<Value> {
  selected: { label: string; onDelete: () => void }[] | null;
  inputRef: React.RefObject<HTMLInputElement>;
  popperReferenceRef: (instance: HTMLDivElement | null) => void;
  disabled: boolean;
  isOpen: boolean;
  multiple: boolean;
  value: Value;
  inputValue: string;
  showClearButton: boolean;
  onBlur: () => void;
  onOpen: () => void;
  clearButtonProps: {
    onClear: (e: React.PointerEvent) => void;
    onPointerDown: (e: React.PointerEvent) => void;
    tabIndex: number;
    'aria-label': string;
  };
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  ariaProps: {
    'aria-expanded': boolean;
    'aria-controls': string;
    'aria-haspopup': 'listbox';
    'aria-autocomplete': 'list';
    'aria-activedescendant': string | undefined;
    role: 'combobox';
  };
}

export type AutocompleteProps<Value, Multiple, DisableClearable> =
  (AutocompleteVariantProps &
    Omit<
      React.HTMLAttributes<HTMLUListElement>,
      'defaultValue' | 'children'
    > & {
      disabled?: boolean;
      classNames?: AutocompleteClassNames;
      offset?: Popper.FloatingProps['mainOffset'];
      options: Value[];
      isOpen?: boolean;
      onOpenChange?: (open: boolean) => void;
      defaultOpen?: boolean;
      getOptionDisabled?: (option: Value) => boolean;
      disableCloseOnSelect?: boolean;
      getOptionLabel?: (option: Value) => string;
      getOptionKey?: (options: Value) => string;
      noOptionsText?: string;
      loading?: boolean;
      loadingText?: string;
      groupBy?: (option: Value) => string;
      children?: (props: {
        groupedOptions: Record<string, OptionProps<Value>[]> | null;
        options: OptionProps<Value>[] | null;
      }) => React.ReactNode;
      inputValue?: string;
      onInputChange?: (val: string) => void;
      filterOptions?: (options: Value[], inputValue: string) => Value[];
    }) &
    (Multiple extends true
      ? {
          multiple: Multiple;
          defaultValue?: Value[];
          value?: Value[];
          onChange?: (
            event: { target: { value: Value[] } },
            reason: Reason,
            value: Value[],
          ) => void;
          disableClearable?: DisableClearable;
          renderInput: (props: RenderInputProps<Value[]>) => React.ReactNode;
        }
      : DisableClearable extends true
        ? {
            multiple?: Multiple;
            defaultValue?: Value;
            value?: Value;
            onChange?: (
              event: { target: { value: Value } },
              reason: Reason,
              value: Value,
            ) => void;
            disableClearable: DisableClearable;
            renderInput: (props: RenderInputProps<Value>) => React.ReactNode;
          }
        : {
            multiple?: Multiple;
            defaultValue?: Value;
            value?: Value | null;
            onChange?: (
              event: { target: { value: Value | null } },
              reason: Reason,
              value: Value | null,
            ) => void;
            disableClearable?: DisableClearable;
            renderInput: (
              props: RenderInputProps<Value | null>,
            ) => React.ReactNode;
          });

const AutocompleteImp = forwardRef<
  HTMLUListElement,
  AutocompleteProps<object, false, false>
>((props, ref) => {
  const {
    classNames,
    className,
    offset,
    isOpen: openProp,
    onOpenChange,
    defaultOpen = false,
    defaultValue,
    value: valueProp,
    onChange,
    shadow = 'md',
    options: optionsProp = [],
    disabled,
    multiple,
    disableClearable,
    disableCloseOnSelect,
    children,
    getOptionDisabled,
    noOptionsText = 'no options',
    loading,
    loadingText = 'loading ...',
    getOptionLabel: getOptionLabelProp,
    getOptionKey,
    groupBy,
    inputValue: inputValueProp,
    onInputChange: onInputChangeProp,
    filterOptions,
    renderInput,
    ...restProps
  } = props;

  const getOptionLabel = (option: object) => {
    if (getOptionLabelProp) {
      return getOptionLabelProp(option);
    }

    if (!('label' in option))
      throw new CustomError(
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
    onChange: (value, reason) => {
      if (!reason)
        throw new CustomError(
          'Autocomplete',
          'internal Error, reason is not defined',
        );

      onChange?.({ target: { value } } as never, reason, value);
    },
  });

  const inputDefaultValue =
    !Array.isArray(value) && value ? getOptionLabel(value) : '';

  const prevSelectedValue = useRef(inputDefaultValue);

  const [inputValue, setInputValue] = useControllableState({
    defaultValue: inputDefaultValue,
    value: inputValueProp,
    onChange: onInputChangeProp,
  });

  const [options, setOptions] = useState(optionsProp);

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

  const inputRef = useRef<HTMLInputElement>(null);
  const popperReferenceRef = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState<object | null>(null);
  const lisboxId = useId();

  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    value: openProp,
    onChange: onOpenChange,
  });

  const handleClose = () => {
    setIsOpen(false);
    setFocused(null);
    setOptions(optionsProp);

    if (Array.isArray(value)) setInputValue('');

    if (prevSelectedValue.current !== inputValue)
      setInputValue(prevSelectedValue.current);
  };

  const onOpen = () => {
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
      setInputValue('');
    }

    if (!Array.isArray(value)) {
      setValue(option, 'select');
      setFocused(option);

      const val = getOptionLabel(option);
      setInputValue(val);
      prevSelectedValue.current = val;
    }

    if (!disableCloseOnSelect) handleClose();
    setOptions(optionsProp);
  };

  const onHover = (option: object) => {
    setFocused(option);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const ArrowDown = e.key === 'ArrowDown';
    const ArrowUp = e.key === 'ArrowUp';
    const Escape = e.key === 'Escape';
    const Enter = e.key === 'Enter';
    const Home = e.key === 'Home';
    const End = e.key === 'End';

    if (ArrowDown || ArrowUp) e.preventDefault();

    if (ArrowDown && !isOpen) {
      onOpen();
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

  const onClear = () => {
    inputRef.current?.focus();
    setFocused(null);
    setInputValue('');
    prevSelectedValue.current = '';
    setOptions(optionsProp);

    if (multiple) {
      setValue([], 'clear');
    } else {
      setValue(null, 'clear');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setInputValue(val);
    setIsOpen(true);

    if (!val) {
      setOptions(optionsProp);
      setFocused(null);
      return;
    }

    const filter =
      filterOptions ||
      ((options, inputValue) =>
        options.filter((opt) =>
          getOptionLabel(opt)
            .toLowerCase()
            .startsWith(inputValue.toLowerCase()),
        ));

    setOptions(filter(optionsProp, val));
  };

  const getOptionProps = (ele: object, i: number): OptionProps<object> => {
    const isFocused = ele === focused;
    const optionDisabled = getOptionDisabled?.(ele) ?? false;
    const selected = Array.isArray(value)
      ? !!value.find((val) => val === ele)
      : ele === value;

    return {
      option: ele,
      label: getOptionLabel(ele),
      key: getOptionKey?.(ele) ?? getOptionLabel(ele).replaceAll(' ', '-'),
      onHover: () => onHover(ele),
      onSelect: () => onSelect(ele),
      state: {
        focused: isFocused,
        selected: selected,
        disabled: optionDisabled,
      },
      className: styles.option({ className: classNames?.option }),
      id: `option-${i}`,
      role: 'option',
      'aria-selected': optionDisabled ? undefined : selected,
      'data-disabled': optionDisabled,
      'data-selected': selected,
      'data-focused': isFocused,
    };
  };

  if (multiple && !Array.isArray(value))
    throw new CustomError(
      'Autocomplete',
      'value must be an Array when multiple is true',
    );

  if (!multiple && Array.isArray(value))
    throw new CustomError(
      'Autocomplete',
      'value must not be an Array when multiple is false',
    );

  if (!renderInput)
    throw new CustomError('Autocomplete', '`renderInput` prop is required');

  const styles = autocomplete({ shadow });

  return (
    <Popper.Root>
      <Popper.Reference>
        {({ referenceRef }) =>
          renderInput({
            selected: Array.isArray(value)
              ? value.map((opt) => ({
                  label: getOptionLabel(opt),
                  onDelete: () => {
                    setValue(
                      (prev) =>
                        Array.isArray(prev)
                          ? prev.filter((ele) => ele !== opt)
                          : null,
                      'remove',
                    );
                  },
                }))
              : null,
            onBlur: handleClose,
            isOpen,
            multiple: !!multiple,
            onOpen,
            clearButtonProps: {
              onClear,
              onPointerDown: (e) => e.preventDefault(),
              tabIndex: -1,
              'aria-label': 'clear value button',
            },
            showClearButton: disableClearable
              ? false
              : Array.isArray(value)
                ? !!value.length
                : !!value,
            popperReferenceRef: mergeRefs(referenceRef, popperReferenceRef),
            inputRef,
            value,
            inputValue,
            onChange: handleInputChange,
            disabled: !!disabled,
            onKeyDown: handleKeyDown,
            ariaProps: {
              role: 'combobox',
              'aria-expanded': isOpen,
              'aria-controls': lisboxId,
              'aria-haspopup': 'listbox',
              'aria-autocomplete': 'list',
              'aria-activedescendant':
                isOpen && focused
                  ? `option-${options.indexOf(focused)}`
                  : undefined,
            },
          })
        }
      </Popper.Reference>

      {isOpen && (
        <Popper.Floating sticky="always" mainOffset={offset || 5}>
          <ul
            {...restProps}
            ref={ref}
            id={lisboxId}
            className={styles.listbox({
              className: classNames?.listbox ?? className,
            })}
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
              ? options.map((ele, i) => {
                  const props = getOptionProps(ele, i);
                  return <Option {...props} key={props.key} />;
                })
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
                      {grouped.map((ele, i) => {
                        const props = getOptionProps(ele, i);
                        return <Option {...props} key={props.key} />;
                      })}
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
});

AutocompleteImp.displayName = 'webbo-ui.Select';

export const Autocomplete = AutocompleteImp as unknown as <
  Value extends object,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
>(
  props: AutocompleteProps<Value, Multiple, DisableClearable> &
    React.RefAttributes<HTMLUListElement>,
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
