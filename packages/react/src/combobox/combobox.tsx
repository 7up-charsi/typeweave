import React from 'react';
import { createPortal } from 'react-dom';
import { createComboboxFilter } from './create-combobox-filter';
import { useControlled } from '../use-controlled';
import { useCallbackRef } from '../use-callback-ref';
import usePreviousProps from '../use-previous-props';
import { mergeRefs } from '@typeweave/react-utils';
import { PointerEvents } from '../pointer-events/pointer-events';
import { Chip } from '../chip';
import { Button } from '../button';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { InputProps } from '../input';
import {
  PopperFloating,
  PopperFloatingProps,
  PopperReference,
  PopperRoot,
} from '../popper';
import { ComboboxVariantProps, comboboxStyles } from './combobox.styles';

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
  onPointerEnter: (e: React.PointerEvent<HTMLLIElement>) => void;
  onPress: (e: React.PointerEvent<HTMLLIElement>) => void;
  'data-option-index': number;
  'aria-disabled': boolean;
  'aria-selected': boolean;
  'data-selected': boolean;
  className: string;
}

export interface ComboboxRenderTagsProps {}

export interface ComboboxRenderInputProps extends InputProps<false> {
  ref: React.RefObject<HTMLInputElement>;
}

type BaseProps<Value> = {
  disabled?: boolean;
  offset?: PopperFloatingProps['mainOffset'];
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
  renderInput: (props: ComboboxRenderInputProps) => React.ReactNode;
  renderOption?: (
    props: ComboboxRenderOptionProps,
    option: Value,
    state: ComboboxRenderOptionState,
  ) => React.ReactNode;
};

export type ComboboxProps<Value, Multiple, DisableClearable, Editable> = (Omit<
  ComboboxVariantProps,
  'hasClearButton' | 'hasOpenIndicator' | 'multiple' | 'editable'
> &
  Omit<
    React.HTMLAttributes<HTMLUListElement>,
    'defaultValue' | 'children' | 'onChange'
  >) &
  (Editable extends true
    ? BaseProps<Value> & {
        editable: Editable;
        classNames?: Partial<{
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
        clearInputOnBlur?: boolean;
        selectOnFocus?: boolean;
        inputValue?: string;
        onInputChange?: (
          newValue: string,
          reason: 'reset' | 'clear' | 'input',
        ) => void;
        filterOptions?: ReturnType<typeof createComboboxFilter<Value>>;
        renderTags?: (
          tags: Value[],
          props: (index: number) => ComboboxRenderTagsProps,
        ) => React.ReactNode;
      }
    : BaseProps<Value> & {
        editable?: Editable;
        classNames?: Partial<{
          listboxWrapper: string;
          listbox: string;
          option: string;
          noOptions: string;
          loading: string;
          group: string;
          groupHeader: string;
          groupItems: string;
          clearIndicator: string;
          openIndicator: string;
        }>;
      }) &
  (Multiple extends true
    ? {
        multiple: Multiple;
        defaultValue?: Value[];
        value?: Value[];
        onChange?: (
          newValue: Value[],
          reason: ComboboxOnChangeReason,
          option: Value,
        ) => void;
        disableClearable?: DisableClearable;
        isOptionEqualToValue?: (option: Value, value: Value) => boolean;
      }
    : DisableClearable extends true
      ? {
          multiple?: Multiple;
          defaultValue?: Value;
          value?: Value;
          onChange?: (
            newValue: Value,
            reason: Exclude<ComboboxOnChangeReason, 'removeOption'>,
          ) => void;
          disableClearable: DisableClearable;
          isOptionEqualToValue?: (option: Value, value: Value) => boolean;
        }
      : {
          multiple?: Multiple;
          defaultValue?: Value;
          value?: Value | null;
          onChange?: (
            newValue: Value | null,
            reason: Exclude<ComboboxOnChangeReason, 'removeOption'>,
          ) => void;
          disableClearable?: DisableClearable;
          isOptionEqualToValue?: (
            option: Value,
            value: Value | null,
          ) => boolean;
        });

const defaultOptionsFilter = createComboboxFilter<string | object>();

const displayName = 'Combobox';

const ComboboxImpl = React.forwardRef<
  HTMLUListElement,
  ComboboxProps<string | object, false, false, true>
>((props, ref) => {
  const {
    classNames,
    className,
    offset,
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
    ...restProps
  } = props;

  const isOptionEqualToValue = (
    option: string | object,
    value: string | object,
  ) => {
    if (isOptionEqualToValueProp)
      return isOptionEqualToValueProp(option, value);

    return option === value;
  };

  const getOptionLabel = useCallbackRef((option: string | object) => {
    if (typeof option === 'string') return option;

    if ('label' in option && typeof option.label === 'string')
      return option.label;

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

  // I used React.memo to retain the array reference between re-renders.
  // This prevents console warnings from occurring because useControlled
  // keeps track of the default value using strict equality comparison.
  const defaultEmptyArray = React.useMemo(() => [], []);

  const [value, setValue] = useControlled({
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

  // this is used to not open listbox when user clear value with clear button
  const ignoreListOpen = React.useRef(false);

  // this is used to select input value if user focused input first time
  const firstFocus = React.useRef(true);

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

  const resetInputValue = React.useCallback(
    (newValue: string | object | null | undefined | (string | object)[]) => {
      //

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

  React.useEffect(() => {
    const valueChanged = previousProps.value !== value;

    if (!valueChanged) return;
    if (focused) return;

    resetInputValue(value);
  }, [focused, previousProps.value, resetInputValue, value]);

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

    // eslint-disable-next-line no-constant-condition
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
    (index: number, reason: 'pointer' | 'keyboard' | 'auto') => {
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
        reason !== 'pointer'
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

  const handleOpen = () => {
    if (open) return;

    setOpen(true);
    setKeepUnfiltered(true);
    onOpen?.();
  };

  const handleClose = (reason: ComboboxOnCloseReason) => {
    if (!open) return;

    setOpen(false);

    onClose?.(reason);
  };

  const handleValue = (
    newValue: string | object | null | (string | object | null)[],
    reason: ComboboxOnChangeReason,
    // check selectNewValue handler below to see details of this prop
    option?: string | object | null,
  ) => {
    if (Array.isArray(value) && Array.isArray(newValue)) {
      if (
        value.length === newValue.length &&
        value.every((val, i) => val === newValue[i])
      ) {
        return;
      }
    } else if (value === newValue) {
      return;
    }

    // @ts-ignore Expected 2 arguments, but got 3.
    onChange?.(newValue, reason as never, option);

    setValue(newValue);
  };

  const selectNewValue = (
    e: React.SyntheticEvent,
    option: string | object,
    reasonProp = 'selectOption',
  ) => {
    let reason = reasonProp;
    let newValue: string | object | (string | object)[] = option;

    if (multiple) {
      const newMultipleValue = Array.isArray(value) ? value.slice() : [];

      if (process.env.NODE_ENV !== 'production') {
        const matches = newMultipleValue.filter((val) =>
          isOptionEqualToValue(option, val),
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
        isOptionEqualToValue(option, valueItem),
      );

      if (itemIndex === -1) {
        newMultipleValue.push(option);
      } else {
        newMultipleValue.splice(itemIndex, 1);
        reason = 'removeOption';
      }

      newValue = newMultipleValue;
    }

    resetInputValue(newValue);

    handleValue(
      newValue,
      reason as ComboboxOnChangeReason,
      // pass selected/removed option when multiple is true. it allow developer to check which option is selected/removed among array of options
      multiple ? option : undefined,
    );

    const modifiedEvent = e as unknown as {
      ctrlKey: boolean;
      metaKey: boolean;
    };

    if (
      !disableCloseOnSelect &&
      !modifiedEvent.ctrlKey &&
      !modifiedEvent.metaKey
    ) {
      handleClose(reason as ComboboxOnCloseReason);
    }
  };

  const handleClear = () => {
    if (disabled) return;

    ignoreListOpen.current = true;

    setInputValue('');
    onInputChange?.('', 'clear');

    handleValue(multiple ? [] : null, 'clear');

    if (!editable) {
      handleOpen();
      setHighlightedIndex(getValidIndex('reset'), 'auto');
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

  const onInputWrapperKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key.length === 1 && !editable) {
      handleCharSearch(e);
      return;
    }

    if (e.key === 'Escape') {
      // Avoid Opera to exit fullscreen mode.
      e.preventDefault();
      // Avoid the Modal to handle the event.
      e.stopPropagation();

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
      ['PageUp', 'PageDown', 'ArrowDown', 'ArrowUp'].includes(e.key)
    ) {
      handleOpen();
      return;
    }

    if (!listBoxOpen) return;

    if (e.key === 'Home' && handleHomeEndKeys) {
      // Prevent scroll of the page
      e.preventDefault();
      setHighlightedIndex(getValidIndex('start', 'next'), 'keyboard');
      return;
    }

    if (e.key === 'End' && handleHomeEndKeys) {
      // Prevent scroll of the page
      e.preventDefault();
      setHighlightedIndex(getValidIndex('end', 'next'), 'keyboard');
      return;
    }

    if (e.key === 'PageUp') {
      // Prevent scroll of the page
      e.preventDefault();
      setHighlightedIndex(getValidIndex(-pageSize, 'previous'), 'keyboard');
      return;
    }

    if (e.key === 'PageDown') {
      // Prevent scroll of the page
      e.preventDefault();
      setHighlightedIndex(getValidIndex(pageSize, 'next'), 'keyboard');
      return;
    }

    if (e.key === 'ArrowDown') {
      // Prevent cursor move
      e.preventDefault();
      setHighlightedIndex(getValidIndex(1, 'next'), 'keyboard');
      return;
    }

    if (e.key === 'ArrowUp') {
      // Prevent cursor move
      e.preventDefault();
      setHighlightedIndex(getValidIndex(-1, 'next'), 'keyboard');
      return;
    }

    if (e.key === 'Enter') {
      // Avoid early form validation, let the end-users continue filling the form.
      e.preventDefault();

      if (highlightedIndexRef.current === -1) return;

      const option = filteredOptions[highlightedIndexRef.current];

      if (!option) return;

      const optionDisabled = getOptionDisabled
        ? getOptionDisabled(option)
        : false;

      if (optionDisabled) return;

      selectNewValue(e, option, 'selectOption');

      return;
    }
  };

  const handleFocus = () => {
    setFocused(true);

    if (openOnFocus && !ignoreListOpen.current) {
      handleOpen();
    }
  };

  const handleBlur = () => {
    setFocused(false);
    firstFocus.current = true;
    ignoreListOpen.current = false;

    handleClose('blur');
    resetInputValue(value);
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

  const handleOptionPointerEnter = (e: React.PointerEvent) => {
    const index = Number(e.currentTarget.getAttribute('data-option-index'));
    if (highlightedIndexRef.current !== index) {
      setHighlightedIndex(index, 'pointer');
    }
  };

  const handleOptionPress = (e: React.PointerEvent) => {
    const index = Number(e.currentTarget.getAttribute('data-option-index'));

    if (!filteredOptions[index]) return;

    selectNewValue(e, filteredOptions[index], 'selectOption');
  };

  const handleOpenIndicator = () => {
    if (disabled) return;

    if (open) {
      handleClose('toggleInput');
    } else {
      handleOpen();
    }
  };

  // Prevent input blur when interacting with the combobox
  const onInputWrapperPoiterDown = (e: React.PointerEvent) => {
    if (disabled) return;

    const target = e.target as HTMLElement;

    // Prevent focusing the input if click is anywhere outside the Combobox
    if (!e.currentTarget.contains(target)) {
      return;
    }

    if (e.currentTarget === e.target) {
      handleOpenIndicator();
    }

    if (target.getAttribute('id') !== inputId) {
      e.preventDefault();
    }
  };

  // Focus the input when interacting with the combobox
  const onInputWrapperPress = (e: React.PointerEvent) => {
    if (disabled) return;

    const target = e.target as HTMLElement;

    // Prevent focusing the input if click is anywhere outside the Combobox
    if (!e.currentTarget.contains(target)) {
      return;
    }

    if (!inputRef.current) return;

    inputRef.current.focus();

    if (
      editable &&
      selectOnFocus &&
      firstFocus.current &&
      (inputRef.current.selectionEnd || 0) -
        (inputRef.current.selectionStart || 0) ===
        0
    ) {
      inputRef.current.select();
    }

    firstFocus.current = false;
  };

  const onInputPointerDown = () => {
    if (disabled) return;

    if (inputValue === '' || !open) {
      handleOpenIndicator();
    }
  };

  const getOptionProps = ({
    index,
    option,
  }: {
    index: number;
    option: string | object;
  }) => {
    const selected = (Array.isArray(value) ? value : [value]).some(
      (value2) => value2 != null && isOptionEqualToValue(option, value2),
    );
    const disabled = getOptionDisabled ? getOptionDisabled(option) : false;

    return {
      key: getOptionKey?.(option) ?? getOptionLabel(option),
      tabIndex: -1,
      role: 'option',
      id: `${inputId}-option-${index}`,
      onPointerEnter: handleOptionPointerEnter,
      onPress: handleOptionPress,
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
    handleValue(newValue, 'removeOption');
  };

  // on open highlight selected option
  React.useEffect(() => {
    if (!listBoxOpen) return;

    if (multiple) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredOptions, listBoxOpen, multiple, value]);

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
    option: string | object,
  ) => {
    const { key, ...otherProps } = props;

    return (
      <PointerEvents key={key} {...otherProps}>
        <li>{getOptionLabel(option)}</li>
      </PointerEvents>
    );
  };

  const renderOption = renderOptionProp || defaultRenderOption;

  const renderListOption = (option: string | object, index: number) => {
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
          onPress={handleClear}
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
          onPress={handleOpenIndicator}
          data-open={listBoxOpen}
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
          onPointerDown={(e) => {
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

  const withPopper = disablePopper ? (
    list
  ) : (
    <PopperFloating sticky="always" mainOffset={offset || 5}>
      {list}
    </PopperFloating>
  );

  const listboxAvailable = open && filteredOptions.length > 0 && !readOnly;

  return (
    <PopperRoot>
      <PopperReference>
        {({ referenceRef }) =>
          renderInput({
            inputWrapperProps: {
              'aria-owns': listBoxOpen ? `${inputId}-listbox` : undefined,
              onKeyDown: onInputWrapperKeyDown,
              onPointerDown: onInputWrapperPoiterDown,
              onPress: onInputWrapperPress,
            },
            classNames: {
              inputWrapper: styles.inputWrapper({
                className: editable && classNames?.inputWrapper,
              }),
              input: styles.input({
                className: editable && classNames?.input,
              }),
            },
            inputWrapperRef: referenceRef,
            startContent,
            endContent,
            id: inputId,
            value: inputValue,
            onBlur: handleBlur,
            onFocus: handleFocus,
            onChange: handleInputChange,
            onPointerDown: onInputPointerDown,
            // if open then this is handled imperatively in setHighlightedIndex so don't let react override
            // only have an opinion about this when closed
            'aria-activedescendant': listBoxOpen ? '' : undefined,
            'aria-autocomplete': 'list',
            'aria-controls': listboxAvailable
              ? `${inputId}-listbox`
              : undefined,
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
