import { useControllableState } from '../use-controllable-state';
import { Option } from './option';
import lodashGroupBy from 'lodash.groupby';
import {
  AutocompleteClassNames,
  AutocompleteVariantProps,
  autocomplete,
} from '@typeweave/theme';
import React from 'react';
import { createPortal } from 'react-dom';
import { getNext, getPrevious } from './utils';
import {
  PopperFloating,
  PopperFloatingProps,
  PopperReference,
  PopperRoot,
} from '../popper';
import { ButtonPressEvent } from '../button';
import { createAutocompleteFilter } from './create-autocomplete-filter';

export type AutocompleteReason = 'select' | 'clear' | 'remove' | 'create';

export interface AutocompleteRenderInputProps {
  selected: { label: string; onDelete: () => void }[] | null;
  inputRef: React.RefObject<HTMLInputElement>;
  inputWrapperRef: React.RefObject<HTMLDivElement>;
  popperReferenceRef: (instance: HTMLDivElement | null) => void;
  disabled: boolean;
  open: boolean;
  multiple: boolean;
  inputValue: string;
  showClearButton: boolean;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onOpen: () => void;
  loading: boolean;
  clearButtonProps: {
    onClear: (e: ButtonPressEvent) => void;
    onPointerDown: (e: React.PointerEvent) => void;
    tabIndex: number;
    'aria-label': string;
  };
  ariaProps: {
    'aria-expanded': boolean;
    'aria-controls': string;
    'aria-haspopup': 'listbox';
    'aria-autocomplete': 'list';
    'aria-activedescendant': string | undefined;
    role: 'combobox';
  };
}

interface Creatable {
  creatable?: boolean;
  onCreate?: (value: string) => void;
}

export type AutocompleteProps<Value, Multiple, DisableClearable> =
  (AutocompleteVariantProps &
    Omit<
      React.HTMLAttributes<HTMLUListElement>,
      'defaultValue' | 'children' | 'onChange'
    > & {
      disabled?: boolean;
      classNames?: AutocompleteClassNames;
      offset?: PopperFloatingProps['mainOffset'];
      options: Value[];
      open?: boolean;
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
      inputValue?: string;
      onInputChange?: (val: string) => void;
      filterOptions?: ReturnType<typeof createAutocompleteFilter<Value>>;
      disablePortal?: boolean;
      disablePopper?: boolean;
      renderInput: (props: AutocompleteRenderInputProps) => React.ReactNode;
      renderOption?: (props: {
        option: Value;
        label: string;
        state: { disabled: boolean; selected: boolean; focused: boolean };
      }) => React.ReactNode;
    }) &
    (Multiple extends true
      ? {
          multiple: Multiple;
          defaultValue?: Value[];
          value?: Value[];
          onChange?: (
            event: { target: { value: Value[] } },
            reason: AutocompleteReason,
            value: Value[],
          ) => void;
          disableClearable?: DisableClearable;
        } & Creatable
      : DisableClearable extends true
        ? {
            multiple?: Multiple;
            defaultValue?: Value;
            value?: Value;
            onChange?: (
              event: { target: { value: Value } },
              reason: AutocompleteReason,
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
              reason: AutocompleteReason,
              value: Value | null,
            ) => void;
            disableClearable?: DisableClearable;
          } & Creatable);

const defaultOptionsFilter = createAutocompleteFilter<object>();

const displayName = 'Autocomplete';

const AutocompleteImpl = React.forwardRef<
  HTMLUListElement,
  AutocompleteProps<object, false, false>
>((props, ref) => {
  const {
    classNames,
    className,
    offset,
    open: openProp,
    onOpenChange,
    defaultOpen = false,
    defaultValue,
    value: valueProp,
    onChange,
    shadow = true,
    options: optionsProp = [],
    disabled,
    multiple,
    disableClearable,
    disableCloseOnSelect,
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
    disablePortal,
    disablePopper,
    renderOption,
    creatable,
    onCreate,
    ...restProps
  } = props;

  const getOptionLabel = (option: object) => {
    if (loading) return '';

    if (
      'creatableOption' in option &&
      'inputValue' in option &&
      typeof option.inputValue === 'string'
    )
      return option.inputValue;

    if (getOptionLabelProp) {
      return getOptionLabelProp(option);
    }

    if (!('label' in option))
      throw new Error(
        `${displayName}, consider to add \`label\` property in all options or use \`getOptionLabel\` prop to get option label`,
      );

    if (typeof option.label !== 'string')
      throw new Error(`${displayName}, \`label\` must be \`string\``);

    return option.label;
  };

  const [value, setValue] = useControllableState<
    object | object[] | null,
    AutocompleteReason
  >({
    defaultValue,
    value: valueProp,
    onChange: (value, reason) => {
      if (!reason)
        throw new Error(
          `${displayName}, \`internal Error\` reason is not defined`,
        );

      onChange?.({ target: { value } } as never, reason, value);
    },
  });

  const inputDefaultValue =
    !Array.isArray(value) && value ? getOptionLabel(value) : '';

  const prevSelectedValue = React.useRef(inputDefaultValue);

  const [inputValue, setInputValue] = useControllableState({
    defaultValue: inputDefaultValue,
    value: inputValueProp,
    onChange: onInputChangeProp,
  });

  const [options, setOptions] = React.useState(optionsProp);

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

  const inputWrapperRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState<object | null>(null);
  const lisboxId = React.useId();

  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen ?? false,
    value: openProp,
    onChange: onOpenChange,
  });

  const handleClose = () => {
    setOpen(false);
    setFocused(null);
    setOptions(optionsProp);

    if (Array.isArray(value)) setInputValue('');

    if (!Array.isArray(value) && prevSelectedValue.current !== inputValue)
      setInputValue(prevSelectedValue.current);
  };

  const onOpen = () => {
    if (open) return;

    setOpen(true);

    if (!options.length) return;

    if (!value) {
      setFocused(getNext(options[0], options, getOptionDisabled));
      return;
    }

    setFocused(Array.isArray(value) ? value.at(-1) : value);
  };

  const onSelect = (option: object) => {
    if (disableCloseOnSelect) {
      setOptions(optionsProp);
      setFocused(option);
    } else {
      handleClose();
    }

    if ('creatableOption' in option && creatable && !disableClearable) {
      setInputValue('');
      if (Array.isArray(value)) setValue([], 'create');
      if (!Array.isArray(value)) setValue(null, 'create');
      prevSelectedValue.current = '';

      if ('inputValue' in option && typeof option.inputValue === 'string')
        onCreate?.(option.inputValue);

      return;
    }

    if (Array.isArray(value)) {
      const val = value.find((ele) => ele === option)
        ? value.filter((ele) => ele !== option)
        : [...value, option];

      setValue(val, 'select');
      setInputValue('');
      return;
    }

    if (!Array.isArray(value)) {
      setValue(option, 'select');

      const val = getOptionLabel(option);

      setInputValue(val);
      prevSelectedValue.current = val;
    }
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

    if (ArrowDown && !open) {
      onOpen();
      return;
    }

    if (!options.length || !open) return;

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
    if (loading) return;

    const val = e.target.value;

    setInputValue(val);
    setOpen(true);

    if (!val) {
      setOptions(optionsProp);
      setFocused(null);
      return;
    }

    const filter = filterOptions || defaultOptionsFilter;

    const filtered = filter(optionsProp, { getOptionLabel, inputValue: val });

    if (val !== '' && !filtered.length && creatable) {
      filtered.push({
        label: `Create "${val}"`,
        inputValue: val,
        creatableOption: true,
      });
    }

    setOptions(filtered);
  };

  const getOptionId = (ele: object) =>
    getOptionKey?.(ele) ?? getOptionLabel(ele).replaceAll(' ', '-');

  const handleInputFocus = () => {
    inputRef.current?.select();
  };

  const styles = React.useMemo(() => autocomplete({ shadow }), [shadow]);

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
    throw new Error(
      `${displayName}, value must be an Array when multiple is true`,
    );

  if (!multiple && Array.isArray(value))
    throw new Error(
      `${displayName}, value must not be an Array when multiple is false`,
    );

  if (!renderInput)
    throw new Error(`${displayName}, \`renderInput\` prop is required`);

  const listBox = (
    <div
      className={styles.listboxWrapper({
        className: classNames?.listboxWrapper ?? className,
      })}
    >
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
              const props = getOptionProps(option);

              const label =
                'creatableOption' in option &&
                'label' in option &&
                typeof option.label === 'string'
                  ? option.label
                  : getOptionLabel(option);

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
                className={styles.group({
                  className: classNames?.group,
                })}
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
                    const props = getOptionProps(option);

                    const label =
                      'creatableOption' in option &&
                      'label' in option &&
                      typeof option.label === 'string'
                        ? option.label
                        : getOptionLabel(option);

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
    </div>
  );

  const withPopper = disablePopper ? (
    listBox
  ) : (
    <PopperFloating sticky="always" mainOffset={offset || 5}>
      {listBox}
    </PopperFloating>
  );

  return (
    <PopperRoot>
      <PopperReference>
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
            onFocus: handleInputFocus,
            open,
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
            popperReferenceRef: referenceRef,
            inputWrapperRef,
            inputRef,
            inputValue,
            onChange: handleInputChange,
            disabled: !!disabled,
            onKeyDown: handleKeyDown,
            loading: !!loading,
            ariaProps: {
              role: 'combobox',
              'aria-expanded': open,
              'aria-controls': lisboxId,
              'aria-haspopup': 'listbox',
              'aria-autocomplete': 'list',
              'aria-activedescendant':
                open && focused ? getOptionId(focused) : undefined,
            },
          })
        }
      </PopperReference>

      {open
        ? disablePortal
          ? withPopper
          : createPortal(withPopper, globalThis?.document.body)
        : null}
    </PopperRoot>
  );
});

AutocompleteImpl.displayName = displayName;

export const Autocomplete = AutocompleteImpl as unknown as <
  Value extends object,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
>(
  props: AutocompleteProps<Value, Multiple, DisableClearable> &
    React.RefAttributes<HTMLUListElement>,
) => React.ReactNode;
