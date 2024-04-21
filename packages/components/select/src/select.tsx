import * as Popper from '@webbo-ui/popper';
import { useControllableState } from '@webbo-ui/use-controllable-state';
import { CustomError } from '@webbo-ui/error';
import React from 'react';
import { Option } from './option';
import lodashGroupBy from 'lodash.groupby';
import { SelectClassNames, SelectVariantProps, select } from '@webbo-ui/theme';
import { mergeRefs } from '@webbo-ui/react-utils';
import { createPortal } from 'react-dom';
import { createContextScope } from '@webbo-ui/context';

export type Reason = 'select' | 'clear';

export interface RenderInputProps<Value> {
  inputRef: React.RefObject<HTMLInputElement>;
  popperReferenceRef: (instance: HTMLDivElement | null) => void;
  disabled: boolean;
  isOpen: boolean;
  multiple: boolean;
  value: Value;
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
}

type ChildrenOption<V> = {
  option: V;
  key: string;
  label: string;
  selected: boolean;
  disabled: boolean;
  focused: boolean;
  onSelect: () => void;
  onHover: () => void;
  id: string;
};

export type SelectProps<Value, Multiple, DisableClearable> =
  (SelectVariantProps &
    Omit<
      React.HTMLAttributes<HTMLUListElement>,
      'defaultValue' | 'children'
    > & {
      disabled?: boolean;
      classNames?: Omit<SelectClassNames, 'option'>;
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
        groupedOptions: Record<string, ChildrenOption<Value>[]> | null;
        options: ChildrenOption<Value>[] | null;
      }) => React.ReactNode;
      portal?: boolean;
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

const Select_Name = 'Select';

const [StylesProvider, stylesHook] =
  createContextScope<ReturnType<typeof select>>(Select_Name);

export const useStylesContext: (
  consumerName: string,
) => ReturnType<typeof select> = stylesHook;

const SelectImp = React.forwardRef<
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
    disableCloseOnSelect,
    children,
    getOptionDisabled,
    noOptionsText = 'no options',
    loading,
    loadingText = 'loading ...',
    getOptionLabel: getOptionLabelProp,
    getOptionKey,
    groupBy,
    renderInput,
    portal = true,
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

  const getOptionId = (ele: object) =>
    getOptionKey?.(ele) ?? getOptionLabel(ele).replaceAll(' ', '-');

  const getOptionProps = (ele: object): ChildrenOption<object> => ({
    key: getOptionId(ele),
    option: ele,
    label: getOptionLabel(ele),
    onHover: () => onHover(ele),
    onSelect: () => onSelect(ele),
    id: getOptionId(ele),
    focused: ele === focused,
    selected: Array.isArray(value)
      ? !!value.find((val) => val === ele)
      : ele === value,
    disabled: getOptionDisabled?.(ele) ?? false,
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

  const styles = React.useMemo(() => select({ shadow }), [shadow]);

  const listBox = (
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
                Record<string, ChildrenOption<object>[]>
              >(
                (acc, [key, val]) => (
                  (acc[key] = val.map(getOptionProps)), acc
                ),
                {},
              ),
            })
          : null}

        {!children && options.length && !groupBy
          ? options.map((ele) => {
              const props = getOptionProps(ele);
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
                  {grouped.map((ele) => {
                    const props = getOptionProps(ele);
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
            value,
            inputValue: getInputValue(value),
            disabled: !!disabled,
            onKeyDown: (e) => {
              handleKeyDown(e);
              handleCharSearch(e);
            },
            readOnly: true,
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

      <StylesProvider {...styles}>
        {isOpen
          ? portal
            ? createPortal(listBox, document.body)
            : listBox
          : null}{' '}
      </StylesProvider>
    </Popper.Root>
  );
});

SelectImp.displayName = 'webbo-ui.' + Select_Name;

export const Select = SelectImp as unknown as <
  Value extends object,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
>(
  props: SelectProps<Value, Multiple, DisableClearable> &
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
