import * as Popper from '../popper';
import { useControllableState } from '../use-controllable-state';
import { CustomError } from '../error';
import React from 'react';
import { Option } from './option';
import lodashGroupBy from 'lodash.groupby';
import { SelectClassNames, SelectVariantProps, select } from '@webbo-ui/theme';
import { mergeRefs } from '@webbo-ui/react-utils';
import { createPortal } from 'react-dom';
import { getNext, getPrevious } from './utils';

export type SelectReason = 'select' | 'clear';

export interface SelectRenderInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  popperReferenceRef: (instance: HTMLDivElement | null) => void;
  disabled: boolean;
  isOpen: boolean;
  multiple: boolean;
  inputValue: string;
  readOnly: true;
  showClearButton: boolean;
  onBlur: () => void;
  onOpen: () => void;
  clearButtonProps: {
    onClear: (e: React.PointerEvent) => void;
    onPointerDown: (e: React.PointerEvent) => void;
    tabIndex: number;
    'aria-label': string;
  };
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  ariaProps: {
    'aria-expanded': boolean;
    'aria-controls': string;
    'aria-haspopup': 'listbox';
    'aria-autocomplete': 'list';
    'aria-activedescendant': string | undefined;
    role: 'combobox';
  };
  loading: boolean;
}

type RenderOptionProps<Value> = {
  option: Value;
  label: string;
  state: { disabled: boolean; selected: boolean; focused: boolean };
};

export type SelectProps<Value, Multiple, DisableClearable> =
  (SelectVariantProps &
    Omit<
      React.HTMLAttributes<HTMLUListElement>,
      'defaultValue' | 'children' | 'onChange'
    > & {
      disabled?: boolean;
      classNames?: SelectClassNames;
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
      disablePortal?: boolean;
      disablePopper?: boolean;
      renderInput: (props: SelectRenderInputProps) => React.ReactNode;
      renderOption?: (props: RenderOptionProps<Value>) => React.ReactNode;
    }) &
    (Multiple extends true
      ? {
          multiple: Multiple;
          defaultValue?: Value[];
          value?: Value[];
          onChange?: (
            event: { target: { value: Value[] } },
            reason: SelectReason,
            value: Value[],
          ) => void;
          disableClearable?: DisableClearable;
        }
      : DisableClearable extends true
        ? {
            multiple?: Multiple;
            defaultValue?: Value;
            value?: Value;
            onChange?: (
              event: { target: { value: Value } },
              reason: SelectReason,
              value: Value,
            ) => void;
            disableClearable: DisableClearable;
          }
        : {
            multiple?: Multiple;
            defaultValue?: Value;
            value?: Value | null;
            onChange?: (
              event: { target: { value: Value | null } },
              reason: SelectReason,
              value: Value | null,
            ) => void;
            disableClearable?: DisableClearable;
          });

const SelectImpl = React.forwardRef<
  HTMLUListElement,
  SelectProps<object, false, false>
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
    options = [],
    disabled,
    multiple,
    disableClearable,
    disableCloseOnSelect = true,
    getOptionDisabled,
    noOptionsText = 'no options',
    loading,
    loadingText = 'loading ...',
    getOptionLabel: getOptionLabelProp,
    getOptionKey,
    groupBy,
    renderInput,
    disablePortal,
    disablePopper,
    renderOption,
    ...restProps
  } = props;

  const getOptionLabel = (option: object) => {
    if (loading) return '';

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
    SelectReason
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

  const groupedOptions = React.useMemo(() => {
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

  const inputRef = React.useRef<HTMLInputElement>(null);
  const popperReferenceRef = React.useRef<HTMLElement>(null);
  const [focused, setFocused] = React.useState<object | null>(null);
  const lisboxId = React.useId();

  const searchState = React.useRef<{
    timer?: ReturnType<typeof setTimeout>;
    chars: string;
  }>({ chars: '' }).current;

  const [isOpen, setIsOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    value: openProp,
    onChange: onOpenChange,
  });

  const handleClose = () => {
    setIsOpen(false);
    setFocused(null);
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
      if (!disableCloseOnSelect) handleClose();
      return;
    }

    if (!Array.isArray(value)) {
      setValue(option, 'select');
      setFocused(option);
      handleClose();
    }
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

  const handleCharSearch = (e: React.KeyboardEvent) => {
    const char = e.key;

    if (char.length !== 1 || e.repeat || !options.length) return;

    setIsOpen(true);

    clearTimeout(searchState.timer);

    searchState.timer = setTimeout(() => {
      searchState.chars = '';
    }, 500);

    searchState.chars += char;

    const startIndex = focused ? options.indexOf(focused) + 1 : 0;

    const orderedOptions = [
      ...options.slice(startIndex),
      ...options.slice(0, startIndex),
    ];

    const filter = searchState.chars.toLowerCase();

    const excatMatch = orderedOptions.find((ele) =>
      getOptionDisabled?.(ele)
        ? false
        : getOptionLabel(ele).toLowerCase().startsWith(filter),
    );

    if (excatMatch) {
      setFocused(excatMatch);
      return;
    }

    const sameLetters = filter
      .split('')
      .every((letter) => letter.toLowerCase() === filter[0]);

    if (sameLetters) {
      const matched = orderedOptions.find((ele) =>
        getOptionDisabled?.(ele)
          ? false
          : getOptionLabel(ele).toLowerCase().startsWith(filter[0]),
      );

      if (matched) setFocused(matched);
    }
  };

  const onClear = (e: React.PointerEvent) => {
    e.preventDefault();
    inputRef.current?.focus();
    setFocused(null);
    setIsOpen(true);

    if (multiple) {
      setValue([], 'clear');
    } else {
      setValue(null, 'clear');
    }
  };

  const getInputValue = (value: object | null | object[]) => {
    if (loading) return '';

    if (!value) return '';

    if (Array.isArray(value))
      return value.map((ele) => getOptionLabel(ele)).join(', ');

    if (!Array.isArray(value)) return getOptionLabel(value);

    return '';
  };

  const getOptionId = (ele: object) =>
    getOptionKey?.(ele) ?? getOptionLabel(ele).replaceAll(' ', '-');

  const styles = React.useMemo(() => select({ shadow }), [shadow]);

  const getOptionProps = (ele: object) => ({
    key: getOptionId(ele),
    option: ele,
    onHover: () => onHover(ele),
    onSelect: () => onSelect(ele),
    id: getOptionId(ele),
    className: styles.option({ className: classNames?.option }),
    state: {
      focused: ele === focused,
      selected: Array.isArray(value)
        ? !!value.find((val) => val === ele)
        : ele === value,
      disabled: getOptionDisabled?.(ele) ?? false,
    },
  });

  if (multiple && !Array.isArray(value))
    throw new CustomError(
      'Select',
      'value must be an Array when multiple is true',
    );

  if (!multiple && Array.isArray(value))
    throw new CustomError(
      'Select',
      'value must not be an Array when multiple is false',
    );

  if (!renderInput)
    throw new CustomError('Autocomplete', '`renderInput` prop is required');

  const listBox = (
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
      onPointerDown={(e) => e.preventDefault()}
    >
      {!loading && options.length && !groupBy
        ? options.map((option) => {
            const label = getOptionLabel(option);
            const props = getOptionProps(option);

            return (
              <Option {...props} key={props.key}>
                {renderOption?.({
                  option,
                  label,
                  state: props.state,
                }) ?? label}
              </Option>
            );
          })
        : null}

      {!loading && options.length && groupBy && groupedOptions
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
                {grouped.map((option) => {
                  const label = getOptionLabel(option);
                  const props = getOptionProps(option);

                  return (
                    <Option {...props} key={props.key}>
                      {renderOption?.({
                        option,
                        label,
                        state: props.state,
                      }) ?? label}
                    </Option>
                  );
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

      {loading ? (
        <div
          className={styles.loading({
            className: classNames?.noOptions,
          })}
        >
          {loadingText}
        </div>
      ) : null}
    </ul>
  );

  const withPopper = disablePopper ? (
    listBox
  ) : (
    <Popper.Floating sticky="always" mainOffset={offset || 5}>
      {listBox}
    </Popper.Floating>
  );

  return (
    <Popper.Root>
      <Popper.Reference>
        {({ referenceRef }) =>
          renderInput({
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
            inputValue: getInputValue(value),
            disabled: !!disabled,
            onKeyDown: (e) => {
              handleKeyDown(e);
              handleCharSearch(e);
            },
            readOnly: true,
            loading: !!loading,
            ariaProps: {
              role: 'combobox',
              'aria-expanded': isOpen,
              'aria-controls': lisboxId,
              'aria-haspopup': 'listbox',
              'aria-autocomplete': 'list',
              'aria-activedescendant':
                isOpen && focused ? getOptionId(focused) : undefined,
            },
          })
        }
      </Popper.Reference>

      {isOpen
        ? disablePortal
          ? withPopper
          : createPortal(withPopper, document.body)
        : null}
    </Popper.Root>
  );
});

SelectImpl.displayName = 'Select';

export const Select = SelectImpl as unknown as <
  Value extends object,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
>(
  props: SelectProps<Value, Multiple, DisableClearable> &
    React.RefAttributes<HTMLUListElement>,
) => React.ReactNode;
