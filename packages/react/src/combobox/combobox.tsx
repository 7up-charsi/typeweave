import React from 'react';
import { createPortal } from 'react-dom';
import { createComboboxFilter } from './create-combobox-filter';
import { useControlled } from '../use-controlled';
import { useCallbackRef } from '../use-callback-ref';
import usePreviousProps from '../use-previous-props';
import { mergeRefs } from '@typeweave/react-utils/merge-refs';
import { Chip } from '../chip';
import { Button } from '../button';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { InputProps } from '../input';
import { ComboboxVariantProps, comboboxStyles } from './combobox.styles';
import {
  flip as flipMiddleware,
  offset as offsetMiddleware,
  size as sizeMiddleware,
  hide as hideMiddleware,
  useFloating,
  autoUpdate,
} from '@floating-ui/react-dom';

export type ComboboxOnChangeReason =
  | 'selectOption'
  | 'removeOption'
  | 'blur'
  | 'clear';

export type ComboboxOnCloseReason =
  | 'toggleInput'
  | 'escape'
  | 'selectOption'
  | 'removeOption'
  | 'blur';

export interface ComboboxRenderOptionState {
  inputValue: string;
  index: number;
  selected: boolean;
}

export interface ComboboxRenderGroupParams {
  key: string;
  group: string;
  children?: React.ReactNode;
}

type OptionsGroup = {
  key: string;
  index: number;
  group: string;
  options: (string | object)[];
};

export interface ComboboxRenderOptionProps {
  key: string;
  tabIndex: number;
  role: string;
  id: string;
  onMouseEnter: (e: React.MouseEvent<HTMLLIElement>) => void;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  'data-option-index': number;
  'aria-disabled': boolean;
  'aria-selected': boolean;
  'data-selected': boolean;
  'data-disabled': boolean;
  className: string;
}

export interface ComboboxRenderTagsProps
  extends React.HTMLAttributes<HTMLElement> {}

export interface ComboboxRenderInputProps extends InputProps<false> {
  ref: React.RefObject<HTMLInputElement>;
}

type BaseProps<Value> = {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  disabled?: boolean;
  /** distance between combobox and listbox
   * @default 5
   */
  offset?: number;
  options: Value[];
  open?: boolean;
  onOpen?: () => void;
  onClose?: (reason: ComboboxOnCloseReason) => void;
  defaultOpen?: boolean;
  getOptionDisabled?: (option: Value) => boolean;
  includeInputInList?: boolean;
  disableListWrap?: boolean;
  clearOnEscape?: boolean;
  readOnly?: boolean;
  disableCloseOnSelect?: boolean;
  openOnFocus?: boolean;
  pageSize?: number;
  getOptionLabel?: (option: Value) => string;
  autoHighlight?: boolean;
  getOptionKey?: (options: Value) => string;
  renderGroup?: (params: ComboboxRenderGroupParams) => React.ReactNode;
  noOptionsText?: string;
  clearText?: string;
  openText?: string;
  closeText?: string;
  loadingText?: string;
  loading?: boolean;
  handleHomeEndKeys?: boolean;
  filterSelectedOptions?: boolean;
  hasOpenIndicator?: boolean;
  groupBy?: (option: Value) => string;
  disablePortal?: boolean;
  disablePopper?: boolean;
  endContent?: React.ReactNode;
  renderInput: (props: ComboboxRenderInputProps) => React.ReactNode;
  renderOption?: (
    props: ComboboxRenderOptionProps,
    option: Value,
    state: ComboboxRenderOptionState,
  ) => React.ReactNode;
  isOptionEqualToValue?: (option: Value, value: Value) => boolean;
};

type ClassNames = Partial<{
  listboxWrapper: string;
  listbox: string;
  option: string;
  noOptions: string;
  loading: string;
  group: string;
  groupHeader: string;
  groupItems: string;
  startContent: string;
  endContent: string;
  inputWrapper: string;
  input: string;
  clearIndicator: string;
  openIndicator: string;
}>;

type EditableProps<Value, Editable> = {
  editable: Editable;
  classNames?: ClassNames;
  clearInputOnBlur?: boolean;
  selectOnFocus?: boolean;
  inputValue?: string;
  onInputChange?: (
    newValue: string,
    reason: 'reset' | 'clear' | 'input',
  ) => void;
  filterOptions?: ReturnType<typeof createComboboxFilter<Value>>;
};

type NotEditableProps<Editable> = {
  editable?: Editable;
  classNames?: Omit<
    ClassNames,
    'startContent' | 'endContent' | 'inputWrapper' | 'input'
  >;
};

type MultipleAndEditableProps<Value> = {
  renderTags?: (
    tags: Value[],
    props: (index: number) => ComboboxRenderTagsProps,
  ) => React.ReactNode;
};

type MultipleProps<Value, Multiple, DisableClearable> = {
  multiple: Multiple;
  defaultValue?: Value[];
  value?: Value[];
  onChange?: (
    newValue: Value[],
    reason: DisableClearable extends true
      ? Exclude<ComboboxOnChangeReason, 'removeOption'>
      : ComboboxOnChangeReason,
    option: Value,
  ) => void;
  disableClearable?: DisableClearable;
};

type DisableClearableProps<Value, Multiple, DisableClearable> = {
  multiple?: Multiple;
  defaultValue?: Value;
  value?: Value;
  onChange?: (
    newValue: Value,
    reason: Exclude<ComboboxOnChangeReason, 'removeOption'>,
  ) => void;
  disableClearable: DisableClearable;
};

type ClearableProps<Value, Multiple, DisableClearable> = {
  multiple?: Multiple;
  defaultValue?: Value;
  value?: Value | null;
  onChange?: (newValue: Value | null, reason: ComboboxOnChangeReason) => void;
  disableClearable?: DisableClearable;
  isOptionEqualToValue?: (option: Value, value: Value | null) => boolean;
};

export type ComboboxProps<Value, Multiple, DisableClearable, Editable> = (Omit<
  ComboboxVariantProps,
  'hasClearButton' | 'hasOpenIndicator' | 'multiple' | 'editable'
> &
  Omit<
    React.HTMLAttributes<HTMLUListElement>,
    'defaultValue' | 'children' | 'onChange'
  >) &
  BaseProps<Value> &
  (Editable extends true
    ? EditableProps<Value, Editable>
    : NotEditableProps<Editable>) &
  (Multiple extends true
    ? Editable extends true
      ? MultipleAndEditableProps<Value>
      : object
    : object) &
  (Multiple extends true
    ? MultipleProps<Value, Multiple, DisableClearable>
    : DisableClearable extends true
      ? DisableClearableProps<Value, Multiple, DisableClearable>
      : ClearableProps<Value, Multiple, DisableClearable>);

type Value = string | object;

type Props = Omit<
  ComboboxVariantProps,
  'hasClearButton' | 'hasOpenIndicator' | 'multiple' | 'editable'
> &
  Omit<
    React.HTMLAttributes<HTMLUListElement>,
    'defaultValue' | 'children' | 'onChange'
  > &
  BaseProps<Value> &
  // i didn't used NotEditableProps because this `Props` type purpose is to merge all above props for component internal props and NotEditableProps have only 2 props and they are available in EditableProps
  Omit<EditableProps<Value, true>, 'editable'> & {
    editable?: boolean;
    renderTags?: (
      tags: Value[],
      props: (index: number) => ComboboxRenderTagsProps,
    ) => React.ReactNode;

    multiple?: boolean;
    defaultValue?: Value | Value[];
    value?: Value | null | Value[];
    onChange?: (
      newValue: Value | null | Value[],
      reason: ComboboxOnChangeReason,
      option?: Value,
    ) => void;
    disableClearable?: boolean;

    isOptionEqualToValue?: (option: Value, value: Value | null) => boolean;
  };

// i defined array outside of component because this prevents console warnings from occurring as useControlled keeps track of the default value using strict equality comparison.
const defaultEmptyArray: [] = [];

const defaultOptionsFilter = createComboboxFilter<Value>();

const displayName = 'Combobox';

/*
---- NOTE ----
i reset highlighlited index on:
- when listbox opens, to highlight the selected option
_ when user clear values ( handleClear ), i need to reset index because on reset listbox does not close and index stays same so need to reset it.
- in editable combobox, when user either search for any option or when user press Backspace
*/

const ComboboxImpl = React.forwardRef<HTMLUListElement, Props>((props, ref) => {
  const {
    classNames,
    className,
    offset = 5,
    open: openProp,
    onOpen,
    onClose,
    autoHighlight = false,
    defaultOpen = false,
    defaultValue,
    value: valueProp,
    onChange,
    openOnFocus,
    handleHomeEndKeys = true,
    shadow = true,
    options = [],
    renderGroup: renderGroupProp,
    filterSelectedOptions = false,
    includeInputInList,
    clearOnEscape = true,
    disableListWrap,
    disabled,
    endContent: endContentProp,
    selectOnFocus = true,
    hasOpenIndicator = true,
    multiple,
    readOnly,
    pageSize = 5,
    disableClearable,
    clearInputOnBlur = true,
    disableCloseOnSelect,
    getOptionDisabled,
    noOptionsText = 'no options',
    loadingText = 'loading ...',
    openText = 'open',
    closeText = 'close',
    clearText = 'clear',
    loading,
    getOptionLabel: getOptionLabelProp,
    isOptionEqualToValue: isOptionEqualToValueProp,
    getOptionKey,
    groupBy,
    inputValue: inputValueProp,
    onInputChange,
    filterOptions = defaultOptionsFilter,
    renderInput,
    disablePortal,
    disablePopper,
    renderOption: renderOptionProp,
    renderTags,
    editable = false,
    wrapperProps = {},
    wrapperRef,
    ...restProps
  } = props;

  const isOptionEqualToValue = (option: Value, value: Value) => {
    if (isOptionEqualToValueProp)
      return isOptionEqualToValueProp(option, value);

    return option === value;
  };

  const getOptionLabel = useCallbackRef((option: Value) => {
    if (
      typeof option === 'object' &&
      'label' in option &&
      typeof option.label === 'string' &&
      !getOptionLabelProp
    )
      return option.label;

    if (typeof option === 'string' && !getOptionLabelProp) return option;

    const optionLabel = getOptionLabelProp?.(option);

    if (
      typeof optionLabel !== 'string' &&
      process.env.NODE_ENV !== 'production'
    ) {
      const erroneousReturn =
        optionLabel === undefined
          ? 'undefined'
          : `${typeof optionLabel} (${optionLabel})`;

      console.error(
        `Typeweave: The \`getOptionLabel\` method of ${displayName} returned ${erroneousReturn} instead of a string for ${JSON.stringify(
          option,
        )}.`,
      );
    }

    return String(optionLabel);
  });

  const inputId = React.useId();

  const [value, setValue] = useControlled<Value | null | Value[]>({
    name: displayName,
    state: 'value',
    controlled: valueProp,
    default: multiple
      ? (defaultValue ?? defaultEmptyArray)
      : (defaultValue ?? null),
  });

  const [inputValue, setInputValue] = useControlled({
    name: displayName,
    state: 'inputValue',
    controlled: inputValueProp,
    default: '',
  });

  /** this is used to check whether listbox open first time after input got focus, if it is then it will prevent to run useEffect on again listbox open while focus on input */
  const listboxOpenFirstTimeRef = React.useRef(true);

  /** this is used to prevent listbox open when `openOnFoucs` and `editable` both are true and user clear value with clear button */
  const ignoreListBoxOpenOnClearRef = React.useRef(false);

  /** this is used to select input value if user focused input first time */
  const isFirstFocusRef = React.useRef(true);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const listboxRef = React.useRef<HTMLUListElement>(null);

  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = React.useRef(defaultHighlighted);

  const [focused, setFocused] = React.useState(false);

  const searchState = React.useRef<{
    timer?: ReturnType<typeof setTimeout>;
    chars: string;
  }>({ chars: '' }).current;

  const [open, setOpen] = useControlled({
    name: displayName,
    state: 'open',
    controlled: openProp,
    default: defaultOpen,
  });

  const floatingReturn = useFloating({
    open,
    whileElementsMounted: autoUpdate,
    middleware: [
      offsetMiddleware({ mainAxis: offset }),
      flipMiddleware(),
      sizeMiddleware({
        apply({ rects, elements }) {
          elements.floating.style.setProperty(
            '--reference-width',
            `${rects.reference.width}px`,
          );
        },
      }),
      hideMiddleware({ strategy: 'referenceHidden' }),
    ],
  });

  const [keepUnfiltered, setKeepUnfiltered] = React.useState(true);

  const inputValueIsSelectedValue =
    !multiple && value && inputValue === getOptionLabel(value);

  const listBoxOpen = open && !readOnly;

  const __options = filterSelectedOptions
    ? options.filter((option) => {
        if (
          (Array.isArray(value) ? value : [value]).some(
            (value2) => value2 !== null && isOptionEqualToValue(option, value2),
          )
        ) {
          return false;
        }
        return true;
      })
    : options;

  const filteredOptions = listBoxOpen
    ? editable
      ? filterOptions(__options, {
          inputValue:
            inputValueIsSelectedValue && keepUnfiltered ? '' : inputValue,
          getOptionLabel,
        })
      : __options
    : [];

  let groupedOptions = filteredOptions;

  if (groupBy) {
    // used to keep track of key and indexes in the result array
    // this will only occur if option are not sorted. Combobox expects sorted options
    const indexBy = new Map();
    let warn = false;

    groupedOptions = filteredOptions.reduce<OptionsGroup[]>(
      (acc, option, index) => {
        const group = groupBy(option);

        if (acc.length > 0 && acc[acc.length - 1]?.group === group) {
          acc[acc.length - 1]?.options.push(option);
        } else {
          if (process.env.NODE_ENV !== 'production') {
            if (indexBy.get(group) && !warn) {
              console.warn(
                `Typeweave: The options provided combined with the \`groupBy\` method of ${displayName} returns duplicated headers.`,
                'You can solve the issue by sorting the options with the output of `groupBy`.',
              );
              warn = true;
            }
            indexBy.set(group, true);
          }

          acc.push({
            key: `${index}`,
            index,
            group,
            options: [option],
          });
        }

        return acc;
      },
      [],
    );
  }

  const previousProps = usePreviousProps({
    filteredOptions,
    value,
    inputValue,
  });

  const updateInputValue = React.useCallback(
    (newValue: Value | null | Value[]) => {
      const isMoreOptionsSelected = multiple
        ? Array.isArray(value) &&
          Array.isArray(newValue) &&
          value.length < newValue.length
        : newValue !== null;

      if (!isMoreOptionsSelected && !clearInputOnBlur) return;

      let newInputValue;

      if (editable) {
        if (multiple && Array.isArray(newValue)) {
          newInputValue = '';
        } else if (!newValue) {
          newInputValue = '';
        } else {
          const optionLabel = getOptionLabel(newValue);
          newInputValue = typeof optionLabel === 'string' ? optionLabel : '';
        }
      } else {
        if (multiple && Array.isArray(newValue)) {
          newInputValue = newValue
            .map((val) => {
              const optionLabel = getOptionLabel(val);
              return typeof optionLabel === 'string' ? optionLabel : '';
            })
            .join(', ');
        } else if (!newValue) {
          newInputValue = '';
        } else {
          const optionLabel = getOptionLabel(newValue);
          newInputValue = typeof optionLabel === 'string' ? optionLabel : '';
        }
      }

      if (inputValue === newInputValue) return;

      setInputValue(newInputValue);

      if (editable) onInputChange?.(newInputValue, 'reset');
    },
    [
      clearInputOnBlur,
      editable,
      getOptionLabel,
      inputValue,
      multiple,
      onInputChange,
      setInputValue,
      value,
    ],
  );

  // change input value when Combobox is not focused. its mean when value changed with controlled state
  React.useEffect(() => {
    if (focused) return;

    if (previousProps.value === value) return;

    updateInputValue(value);
  }, [focused, previousProps.value, updateInputValue, value]);

  if (process.env.NODE_ENV !== 'production') {
    if (value !== null && options.length > 0) {
      const missingValue = (Array.isArray(value) ? value : [value]).filter(
        (value2) =>
          !options.some((option) => isOptionEqualToValue(option, value2)),
      );

      if (missingValue.length > 0) {
        console.warn(
          [
            `Typeweave: The value provided to ${displayName} is invalid.`,
            `None of the options match with \`${
              missingValue.length > 1
                ? JSON.stringify(missingValue)
                : JSON.stringify(missingValue[0])
            }\`.`,
            'You can use the `isOptionEqualToValue` prop to customize the equality test.',
          ].join('\n'),
        );
      }
    }
  }

  const getValidIndex = (
    diff: 'start' | 'end' | 'reset' | number,
    direction: 'next' | 'previous' = 'next',
  ) => {
    const maxIndex = filteredOptions.length - 1;

    if (diff === 'reset') {
      return defaultHighlighted;
    }

    if (diff === 'start') {
      return 0;
    }

    if (diff === 'end') {
      return maxIndex;
    }

    let newIndex = highlightedIndexRef.current + diff;

    if (newIndex < 0) {
      if (newIndex === -1 && includeInputInList) {
        newIndex = -1;
      }

      if (disableListWrap && highlightedIndexRef.current === -1) {
        newIndex = -1;
      }

      if (
        (disableListWrap && highlightedIndexRef.current !== -1) ||
        Math.abs(diff) > 1
      ) {
        newIndex = 0;
      }

      newIndex = maxIndex;
    }

    if (newIndex > maxIndex) {
      if (newIndex === maxIndex + 1 && includeInputInList) {
        newIndex = -1;
      }

      if (disableListWrap || Math.abs(diff) > 1) {
        newIndex = maxIndex;
      }

      newIndex = 0;
    }

    if (
      !listboxRef.current ||
      newIndex < 0 ||
      newIndex >= filteredOptions.length
    ) {
      return -1;
    }

    let nextFocus = newIndex;

    while (true) {
      const option = listboxRef.current.querySelector(
        `[data-option-index="${nextFocus}"]`,
      );

      if (
        option &&
        option.hasAttribute('tabindex') &&
        option.getAttribute('aria-disabled') === 'false'
      ) {
        return nextFocus;
      }

      // The next option is disabled, move to the next element.
      // with looped index
      if (direction === 'next') {
        // The index is zero-based, which means that when nextFocus + 1 equals
        // filteredOptions.length, all remaining options are disabled. In this case, set
        // nextFocus to 0 and start checking from the beginning
        nextFocus = (nextFocus + 1) % filteredOptions.length;
      } else {
        nextFocus =
          (nextFocus - 1 + filteredOptions.length) % filteredOptions.length;
      }

      // We end up with initial index, that means we don't have available options.
      // All of them are disabled
      if (nextFocus === newIndex) {
        return -1;
      }
    }
  };

  const setHighlightedIndex = useCallbackRef(
    (index: number, reason: 'click' | 'keyboard' | 'auto') => {
      highlightedIndexRef.current = index;

      if (!inputRef.current) return;
      if (!listboxRef.current) return;

      // does the index exist?
      if (index === -1) {
        inputRef.current.removeAttribute('aria-activedescendant');
      } else {
        inputRef.current.setAttribute(
          'aria-activedescendant',
          `${inputId}-option-${index}`,
        );
      }

      const prev = listboxRef.current.querySelector(
        `[role="option"][data-focused="true"]`,
      ) as HTMLElement;

      if (prev) {
        delete prev.dataset.focused;
        delete prev.dataset.focusVisible;
      }

      const listboxNode = listboxRef.current;

      if (index === -1) {
        listboxNode.scrollTop = 0;
        return;
      }

      const option = listboxRef.current.querySelector(
        `[data-option-index="${index}"]`,
      ) as HTMLElement;

      if (!option) return;

      option.dataset.focused = 'true';

      if (reason === 'keyboard') {
        option.dataset.focusVisible = 'true';
      }

      if (
        listboxNode.scrollHeight > listboxNode.clientHeight &&
        reason !== 'click'
      ) {
        const element = option;

        const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
        const elementBottom = element.offsetTop + element.offsetHeight;
        if (elementBottom > scrollBottom) {
          listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
        } else if (
          /*
           The height of the group header is 48px. When scrolling upwards, it is
           necessary to ensure that the options do not get hidden behind the group header. 
           Therefore, if the groupBy option is enabled, the top of the scroll container 
           should align with the bottom of the group header. Otherwise, the top of the 
           scroll container remains unchanged.
            */
          element.offsetTop - (groupBy ? 48 : 0) <
          listboxNode.scrollTop
        ) {
          listboxNode.scrollTop = element.offsetTop - (groupBy ? 48 : 0);
        }
      }
    },
  );

  // on open, highlight selected option
  // i dont reset highlighted option on close as it will highlight correct option on next open and if multiple it will reset to defaultHighlighted
  React.useEffect(() => {
    if (!listBoxOpen) return;
    if (!listboxOpenFirstTimeRef.current) return;

    listboxOpenFirstTimeRef.current = false;

    if (multiple || filteredOptions.length === 0 || value === null) {
      setHighlightedIndex(getValidIndex('reset'), 'auto');
      return;
    }

    if (!multiple && value && filteredOptions.length) {
      const index = filteredOptions.findIndex((option) =>
        isOptionEqualToValue(option, value),
      );

      if (index === -1) {
        setHighlightedIndex(getValidIndex('reset'), 'auto');
      } else {
        setHighlightedIndex(index, 'auto');
      }
    }
  }, [listBoxOpen]);

  const handleOpen = () => {
    if (open) return;

    setOpen(true);
    setKeepUnfiltered(true);
    onOpen?.();
  };

  const handleClose = (reason: ComboboxOnCloseReason) => {
    if (!open) return;

    listboxOpenFirstTimeRef.current = true;
    setOpen(false);

    onClose?.(reason);
  };

  const handleSelectNewValue = (
    selectedOption: Value,
    isCtrlKeyDown = false,
  ) => {
    let reason: ComboboxOnCloseReason = 'selectOption';

    let newValue: Value | Value[] = selectedOption;

    // when user clicks on same selected option more than once
    if (!multiple && value === newValue) return;

    if (multiple) {
      const newMultipleValue = Array.isArray(value) ? value.slice() : [];

      if (process.env.NODE_ENV !== 'production') {
        const matches = newMultipleValue.filter((val) =>
          isOptionEqualToValue(selectedOption, val),
        );

        if (matches.length > 1) {
          console.error(
            [
              `Typeweave: The \`isOptionEqualToValue\` method of ${displayName} does not handle the arguments correctly.`,
              `The component expects a single value to match a given option but found ${matches.length} matches.`,
            ].join('\n'),
          );
        }
      }

      const itemIndex = newMultipleValue.findIndex((valueItem) =>
        isOptionEqualToValue(selectedOption, valueItem),
      );

      if (itemIndex === -1) {
        newMultipleValue.push(selectedOption);
      } else {
        newMultipleValue.splice(itemIndex, 1);
        reason = 'removeOption';
      }

      newValue = newMultipleValue;
    }

    onChange?.(newValue, reason, selectedOption);
    setValue(newValue);
    updateInputValue(newValue);

    if (!disableCloseOnSelect && (multiple ? !isCtrlKeyDown : true)) {
      handleClose(reason);
    }
  };

  const handleClear = () => {
    if (disabled || readOnly) return;

    ignoreListBoxOpenOnClearRef.current = true;

    inputRef.current?.focus();

    setInputValue('');
    onInputChange?.('', 'clear');

    const newValue = multiple ? [] : null;

    onChange?.(newValue, 'clear');
    setValue(newValue);

    setHighlightedIndex(getValidIndex('reset'), 'auto');

    if (!editable) {
      handleOpen();
    }
  };

  const handleCharSearch = (e: React.KeyboardEvent) => {
    const char = e.key;

    if (char.length !== 1 || e.repeat || !filteredOptions.length) return;

    clearTimeout(searchState.timer);

    searchState.timer = setTimeout(() => {
      searchState.chars = '';
    }, 500);

    searchState.chars += char;

    const startIndex =
      highlightedIndexRef.current <= 0 ? 0 : highlightedIndexRef.current + 1;

    const orderedOptions =
      startIndex === 0
        ? filteredOptions
        : [
            ...filteredOptions.slice(startIndex),
            ...filteredOptions.slice(0, startIndex),
          ];

    const filter = searchState.chars.toLowerCase();

    const excatMatch = orderedOptions.find((ele) =>
      getOptionDisabled?.(ele)
        ? false
        : getOptionLabel(ele).toLowerCase().startsWith(filter),
    );

    if (excatMatch) {
      setHighlightedIndex(
        filteredOptions.findIndex((opt) => opt === excatMatch),
        'auto',
      );
      return;
    }

    const sameLetters = filter
      .split('')
      .every((letter) => letter === filter[0]);

    if (sameLetters) {
      const matched = orderedOptions.find((ele) =>
        getOptionDisabled?.(ele)
          ? false
          : getOptionLabel(ele)
              .toLowerCase()
              .startsWith(filter[0] ?? ''),
      );

      if (matched)
        setHighlightedIndex(
          filteredOptions.findIndex((opt) => opt === matched),
          'auto',
        );
    }
  };

  const onInputWrapperKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    if (event.key.length === 1 && !editable) {
      handleCharSearch(event);
      return;
    }

    if (
      editable &&
      (event.key.length === 1 || (event.key === 'Backspace' && inputValue))
    ) {
      setHighlightedIndex(getValidIndex('reset'), 'auto');
    }

    if (event.key === 'Escape') {
      // Avoid Opera to exit fullscreen mode.
      event.preventDefault();
      // Avoid the Modal to handle the event.
      event.stopPropagation();

      if (listBoxOpen) {
        handleClose('escape');
      } else if (
        clearOnEscape &&
        (inputValue !== '' || (Array.isArray(value) && value.length > 0))
      ) {
        handleClear();
      }

      return;
    }

    if (
      !listBoxOpen &&
      ['PageUp', 'PageDown', 'ArrowDown', 'ArrowUp'].includes(event.key)
    ) {
      event.preventDefault();
      handleOpen();
      return;
    }

    if (!listBoxOpen) return;

    if (event.key === 'Home' && handleHomeEndKeys) {
      // Prevent scroll of the page
      event.preventDefault();
      setHighlightedIndex(getValidIndex('start', 'next'), 'keyboard');
      return;
    }

    if (event.key === 'End' && handleHomeEndKeys) {
      // Prevent scroll of the page
      event.preventDefault();
      setHighlightedIndex(getValidIndex('end', 'next'), 'keyboard');
      return;
    }

    if (event.key === 'PageUp') {
      // Prevent scroll of the page
      event.preventDefault();
      setHighlightedIndex(getValidIndex(-pageSize, 'previous'), 'keyboard');
      return;
    }

    if (event.key === 'PageDown') {
      // Prevent scroll of the page
      event.preventDefault();
      setHighlightedIndex(getValidIndex(pageSize, 'next'), 'keyboard');
      return;
    }

    if (event.key === 'ArrowDown') {
      // Prevent cursor move
      event.preventDefault();
      setHighlightedIndex(getValidIndex(1, 'next'), 'keyboard');
      return;
    }

    if (event.key === 'ArrowUp') {
      // Prevent cursor move
      event.preventDefault();
      setHighlightedIndex(getValidIndex(-1, 'next'), 'keyboard');
      return;
    }

    if (event.key === 'Enter') {
      // Avoid early form validation, let the end-users continue filling the form.
      event.preventDefault();

      if (highlightedIndexRef.current === -1) return;

      const option = filteredOptions[highlightedIndexRef.current];

      if (!option) return;

      const optionDisabled = getOptionDisabled
        ? getOptionDisabled(option)
        : false;

      if (optionDisabled) return;

      const isCtrlKeyDown = event.ctrlKey || event.metaKey;

      handleSelectNewValue(option, isCtrlKeyDown);

      return;
    }
  };

  const handleFocus = () => {
    setFocused(true);

    if (openOnFocus && !ignoreListBoxOpenOnClearRef.current) {
      handleOpen();
    }
  };

  const handleBlur = () => {
    setFocused(false);
    isFirstFocusRef.current = true;
    ignoreListBoxOpenOnClearRef.current = false;

    handleClose('blur');
    updateInputValue(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (inputValue !== newValue) {
      setInputValue(newValue);
      setKeepUnfiltered(false);

      onInputChange?.(newValue, 'input');
    }

    if (newValue) handleOpen();
  };

  const handleOptionMouseEnter = (e: React.MouseEvent) => {
    const index = Number(e.currentTarget.getAttribute('data-option-index'));
    if (highlightedIndexRef.current !== index) {
      setHighlightedIndex(index, 'click');
    }
  };

  const handleOptionClick = (e: React.MouseEvent) => {
    const index = Number(e.currentTarget.getAttribute('data-option-index'));

    if (!filteredOptions[index]) return;

    handleSelectNewValue(filteredOptions[index]);
  };

  const handleListBoxToggle = () => {
    if (disabled || readOnly) return;

    inputRef.current?.focus();

    if (open) {
      handleClose('toggleInput');
    } else {
      handleOpen();
    }
  };

  const handleOpenListBox = (e: React.MouseEvent) => {
    if (
      (e.currentTarget === e.target || e.target instanceof HTMLInputElement) &&
      !open
    ) {
      handleListBoxToggle();
    }
  };

  const onInputWrapperMouseDown = (e: React.MouseEvent) => {
    if (disabled || readOnly) return;

    if (!(e.target instanceof HTMLInputElement)) {
      e.preventDefault();
    }

    handleOpenListBox(e);
  };

  const onInputWrapperClick = () => {
    if (disabled || readOnly) return;

    if (!inputRef.current) return;

    if (
      editable &&
      selectOnFocus &&
      isFirstFocusRef.current &&
      (inputRef.current.selectionEnd || 0) -
        (inputRef.current.selectionStart || 0) ===
        0
    ) {
      inputRef.current.select();
    }

    isFirstFocusRef.current = false;
  };

  const getOptionProps = ({
    index,
    option,
  }: {
    index: number;
    option: Value;
  }): ComboboxRenderOptionProps => {
    const selected = (Array.isArray(value) ? value : [value]).some(
      (value2) => value2 != null && isOptionEqualToValue(option, value2),
    );
    const disabled = getOptionDisabled ? getOptionDisabled(option) : false;

    return {
      key: getOptionKey?.(option) ?? getOptionLabel(option),
      tabIndex: -1,
      role: 'option',
      id: `${inputId}-option-${index}`,
      onMouseEnter: handleOptionMouseEnter,
      onClick: handleOptionClick,
      className: '',
      'data-option-index': index,
      'aria-disabled': !!disabled,
      'aria-selected': selected,
      'data-selected': selected,
      'data-disabled': !!disabled,
    };
  };

  const handleTagDelete = (index: number) => () => {
    if (!Array.isArray(value)) return;

    const newValue = value.slice();
    newValue.splice(index, 1);

    onChange?.(newValue, 'removeOption');
    setValue(newValue);
  };

  if (disabled && focused) {
    handleBlur();
  }

  const styles = React.useMemo(
    () =>
      comboboxStyles({
        shadow,
        multiple,
        hasClearButton: !disableClearable,
        hasOpenIndicator,
        editable,
      }),
    [shadow, multiple, disableClearable, hasOpenIndicator, editable],
  );

  const defaultRenderGroup = (params: ComboboxRenderGroupParams) => (
    <li
      key={params.key}
      className={styles.group({ className: classNames?.group })}
    >
      <div
        className={styles.groupHeader({ className: classNames?.groupHeader })}
      >
        {params.group}
      </div>
      <ul className={styles.groupItems({ className: classNames?.groupItems })}>
        {params.children}
      </ul>
    </li>
  );

  const renderGroup = renderGroupProp || defaultRenderGroup;

  const defaultRenderOption = (
    props: ComboboxRenderOptionProps & { key: string },
    option: Value,
  ) => {
    const { key, ...otherProps } = props;

    return (
      <li key={key} {...otherProps}>
        {getOptionLabel(option)}
      </li>
    );
  };

  const renderOption = renderOptionProp || defaultRenderOption;

  const renderListOption = (option: Value, index: number) => {
    const optionProps = getOptionProps({ option, index });

    return renderOption(
      {
        ...optionProps,
        className: styles.option({ className: classNames?.option }),
      },
      option,
      {
        selected: optionProps['aria-selected'],
        index,
        inputValue,
      },
    );
  };

  let startContent: React.ReactNode | undefined = undefined;

  if (editable && Array.isArray(value) && value.length > 0) {
    const getTagProps = (index: number) => ({
      className: styles.startContent({
        className: editable && classNames?.startContent,
      }),
      disabled,
      key: index,
      'data-tag-index': index,
      tabIndex: -1,
      ...(!readOnly && { onDelete: handleTagDelete(index) }),
    });

    if (renderTags) {
      startContent = renderTags(value, getTagProps);
    } else {
      startContent = value.map((option, index) => {
        const { key, ...tagProps } = getTagProps(index);

        return (
          <Chip
            key={key}
            label={getOptionLabel(option)}
            size="sm"
            color="default"
            variant="flat"
            {...tagProps}
          />
        );
      });
    }
  }

  const endContent = (!disableClearable || hasOpenIndicator) && (
    <div
      className={styles.endContent({
        className: editable && classNames?.endContent,
      })}
    >
      {endContentProp}

      {(Array.isArray(value)
        ? !disableClearable && !!value.length
        : disableClearable
          ? false
          : !!value) && (
        <Button
          isIconOnly
          variant="text"
          size="sm"
          aria-label={clearText}
          excludeFromTabOrder
          className={styles.clearIndicator({
            className: classNames?.clearIndicator,
          })}
          onClick={handleClear}
          disabled={disabled || readOnly}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          type="button"
        >
          <XIcon />
        </Button>
      )}

      {hasOpenIndicator && (
        <Button
          isIconOnly
          variant="text"
          size="sm"
          aria-label={listBoxOpen ? closeText : openText}
          excludeFromTabOrder
          className={styles.openIndicator({
            className: classNames?.openIndicator,
          })}
          disabled={disabled || readOnly}
          onClick={handleListBoxToggle}
          data-open={listBoxOpen}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          type="button"
        >
          <ChevronDownIcon />
        </Button>
      )}
    </div>
  );

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

  const list = (
    <div
      {...wrapperProps}
      ref={mergeRefs(
        wrapperRef,
        disablePopper ? undefined : floatingReturn.refs.setFloating,
      )}
      style={{
        ...wrapperProps.style,
        ...(disablePopper ? {} : floatingReturn.floatingStyles),
      }}
      data-hide={
        disablePopper
          ? false
          : !!floatingReturn.middlewareData.hide?.referenceHidden
      }
      className={styles.listboxWrapper({
        className: classNames?.listboxWrapper ?? className,
      })}
    >
      {groupedOptions.length === 0 ? null : (
        <ul
          {...restProps}
          ref={mergeRefs(ref, listboxRef)}
          className={styles.listbox({
            className: classNames?.listbox ?? className,
          })}
          role="listbox"
          id={`${inputId}-listbox`}
          aria-labelledby={`${inputId}-label`}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          {groupedOptions.map((option, index) => {
            if (groupBy) {
              const groupedOption = option as OptionsGroup;

              return renderGroup({
                key: groupedOption.key,
                group: groupedOption.group,
                children: groupedOption.options.map((option2, index2) =>
                  renderListOption(option2, groupedOption.index + index2),
                ),
              });
            }

            return renderListOption(option, index);
          })}
        </ul>
      )}

      {loading && groupedOptions.length === 0 ? (
        <div
          className={styles.loading({
            className: classNames?.noOptions,
          })}
        >
          {loadingText}
        </div>
      ) : null}

      {groupedOptions.length === 0 && !loading ? (
        <div
          className={styles.noOptions({
            className: classNames?.noOptions,
          })}
        >
          {noOptionsText}
        </div>
      ) : null}
    </div>
  );

  const listboxAvailable = open && filteredOptions.length > 0 && !readOnly;

  return (
    <>
      {renderInput({
        inputWrapperProps: {
          'aria-owns': listBoxOpen ? `${inputId}-listbox` : undefined,
          onKeyDown: onInputWrapperKeyDown,
          onMouseDown: onInputWrapperMouseDown,
          onClick: onInputWrapperClick,
        },
        classNames: {
          inputWrapper: styles.inputWrapper({
            className: editable && classNames?.inputWrapper,
          }),
          input: styles.input({
            className: editable && classNames?.input,
          }),
        },
        inputWrapperRef: floatingReturn.refs.setReference,
        startContent,
        endContent,
        id: inputId,
        value: inputValue,
        onBlur: handleBlur,
        onFocus: handleFocus,
        onChange: handleInputChange,
        // if open then this is handled imperatively in setHighlightedIndex so don't let react override
        // only have an opinion about this when closed
        'aria-activedescendant': listBoxOpen ? '' : undefined,
        'aria-autocomplete': 'list',
        'aria-controls': listboxAvailable ? `${inputId}-listbox` : undefined,
        'aria-expanded': listboxAvailable,
        // Disable browser's suggestion that might overlap with the popup.
        // Handle autocomplete but not autofill.
        autoComplete: 'off',
        ref: inputRef,
        autoCapitalize: 'none',
        spellCheck: 'false',
        role: 'combobox',
        disabled,
        readOnly: !editable ? true : readOnly,
      })}

      {listBoxOpen
        ? disablePortal
          ? list
          : createPortal(list, globalThis?.document.body)
        : null}
    </>
  );
});

ComboboxImpl.displayName = displayName;

export const Combobox = ComboboxImpl as unknown as <
  Value extends string | object,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  Editable extends boolean = false,
>(
  props: ComboboxProps<Value, Multiple, DisableClearable, Editable> &
    React.RefAttributes<HTMLUListElement>,
) => React.ReactNode;
