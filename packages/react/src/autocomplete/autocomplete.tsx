import {
  AutocompleteClassNames,
  AutocompleteVariantProps,
  autocomplete,
} from '@typeweave/theme';
import React from 'react';
import { createPortal } from 'react-dom';
import {
  PopperFloating,
  PopperFloatingProps,
  PopperReference,
  PopperRoot,
} from '../popper';
import { createAutocompleteFilter } from './create-autocomplete-filter';
import { useControlled } from '../use-controlled';
import { useCallbackRef } from '../use-callback-ref';
import usePreviousProps from '../use-previous-props';
import { mergeRefs } from '@typeweave/react-utils';
import { PointerEvents } from '../pointer-events/pointer-events';
import { Chip } from '../chip';
import { Button } from '../button';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { InputProps } from '../input';

export type AutocompleteOnChangeReason =
  | 'selectOption'
  | 'removeOption'
  | 'blur'
  | 'clear';

export type AutocompleteOnCloseReason =
  | 'toggleInput'
  | 'escape'
  | 'selectOption'
  | 'removeOption'
  | 'blur';

export interface AutocompleteRenderOptionState {
  inputValue: string;
  index: number;
  selected: boolean;
}

export interface AutocompleteRenderGroupParams {
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

export interface AutocompleteRenderOptionProps {
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

export interface AutocompleteRenderTagsProps {}

export interface AutocompleteRenderInputProps extends InputProps<false> {
  ref: React.RefObject<HTMLInputElement>;
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
      onOpen?: () => void;
      onClose?: (reason: AutocompleteOnCloseReason) => void;
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
      isOptionEqualToValue?: (option: Value, value: Value) => boolean;
      renderGroup?: (params: AutocompleteRenderGroupParams) => React.ReactNode;
      noOptionsText?: string;
      clearText?: string;
      openText?: string;
      closeText?: string;
      loadingText?: string;
      loading?: boolean;
      clearInputOnBlur?: boolean;
      selectOnFocus?: boolean;
      handleHomeEndKeys?: boolean;
      filterSelectedOptions?: boolean;
      hasClearButton?: boolean;
      hasOpenIndicator?: boolean;
      groupBy?: (option: Value) => string;
      inputValue?: string;
      onInputChange?: (
        newValue: string,
        reason: 'reset' | 'clear' | 'input',
      ) => void;
      filterOptions?: ReturnType<typeof createAutocompleteFilter<Value>>;
      disablePortal?: boolean;
      disablePopper?: boolean;
      renderInput: (props: AutocompleteRenderInputProps) => React.ReactNode;
      renderOption?: (
        props: AutocompleteRenderOptionProps,
        option: Value,
        state: AutocompleteRenderOptionState,
      ) => React.ReactNode;
      renderTags?: (
        tags: Value[],
        props: (index: number) => AutocompleteRenderTagsProps,
      ) => React.ReactNode;
    }) &
    (Multiple extends true
      ? {
          multiple: Multiple;
          defaultValue?: Value[];
          value?: Value[];
          onChange?: (
            newValue: Value[],
            reason: AutocompleteOnChangeReason,
          ) => void;
          disableClearable?: DisableClearable;
        }
      : DisableClearable extends true
        ? {
            multiple?: Multiple;
            defaultValue?: Value;
            value?: Value;
            onChange?: (
              newValue: Value,
              reason: AutocompleteOnChangeReason,
            ) => void;
            disableClearable: DisableClearable;
          }
        : {
            multiple?: Multiple;
            defaultValue?: Value;
            value?: Value | null;
            onChange?: (
              newValue: Value | null,
              reason: AutocompleteOnChangeReason,
            ) => void;
            disableClearable?: DisableClearable;
          });

const defaultOptionsFilter = createAutocompleteFilter<string | object>();

const displayName = 'Autocomplete';

const AutocompleteImpl = React.forwardRef<
  HTMLUListElement,
  AutocompleteProps<string | object, false, false>
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
    hasClearButton = true,
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

  const [value, setValue] = useControlled({
    name: displayName,
    state: 'value',
    controlled: valueProp,
    default: defaultValue,
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

  const [open, setOpen] = useControlled({
    name: displayName,
    state: 'open',
    controlled: openProp,
    default: defaultOpen,
  });

  const [keepUnfiltered, setKeepUnfiltered] = React.useState(true);

  const inputValueIsSelectedValue =
    !multiple && value && inputValue === getOptionLabel(value);

  const listOpen = open && !readOnly;

  const filteredOptions = listOpen
    ? filterOptions(
        options.filter((option) => {
          if (
            filterSelectedOptions &&
            (Array.isArray(value) ? value : [value]).some(
              (value2) =>
                value2 !== null && isOptionEqualToValue(option, value2),
            )
          ) {
            return false;
          }
          return true;
        }),
        {
          inputValue:
            inputValueIsSelectedValue && keepUnfiltered ? '' : inputValue,
          getOptionLabel,
        },
      )
    : [];

  let groupedOptions = filteredOptions;

  if (groupBy) {
    // used to keep track of key and indexes in the result array
    // this will only occur if option are not sorted. Autocomplete expects sorted options
    const indexBy = new Map();
    let warn = false;

    groupedOptions = filteredOptions.reduce<OptionsGroup[]>(
      (acc, option, index) => {
        const group = groupBy(option);

        if (acc.length > 0 && acc[acc.length - 1].group === group) {
          acc[acc.length - 1].options.push(option);
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
    (newValue: string | object | null) => {
      //

      let newInputValue;
      if (multiple) {
        newInputValue = '';
      } else if (newValue === null) {
        newInputValue = '';
      } else {
        const optionLabel = getOptionLabel(newValue);
        newInputValue = typeof optionLabel === 'string' ? optionLabel : '';
      }

      if (inputValue === newInputValue) {
        return;
      }

      setInputValue(newInputValue);
      onInputChange?.(newInputValue, 'reset');
    },
    [getOptionLabel, inputValue, multiple, onInputChange, setInputValue],
  );

  React.useEffect(() => {
    const valueChanged = previousProps.value !== value;

    if (!valueChanged) return;
    if (focused) return;
    if (!value) return;

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
    direction: 'next' | 'previous',
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
    (index: number, reason: 'pointer' | 'keyboard') => {
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
        reason === 'keyboard'
      ) {
        const element = option;

        const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
        const elementBottom = element.offsetTop + element.offsetHeight;
        if (elementBottom > scrollBottom) {
          listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
        } else if (
          element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) <
          listboxNode.scrollTop
        ) {
          listboxNode.scrollTop =
            element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
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

  const handleClose = (reason: AutocompleteOnCloseReason) => {
    if (!open) return;

    setOpen(false);

    onClose?.(reason);
  };

  const handleValue = (
    newValue: string | object | null | (string | object | null)[],
    reason: AutocompleteOnChangeReason,
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

    onChange?.(newValue, reason);

    setValue(newValue);
  };

  const selectNewValue = (
    e: React.SyntheticEvent,
    option: string | object,
    reasonProp = 'selectOption',
  ) => {
    let reason = reasonProp;

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

      setInputValue('');
      onInputChange?.('', 'reset');
      handleValue(newMultipleValue, reason as AutocompleteOnChangeReason);
    } else {
      const inputValue = getOptionLabel(option);
      setInputValue(inputValue);
      onInputChange?.(inputValue, 'reset');

      handleValue(option, reason as AutocompleteOnChangeReason);
    }

    const modifiedEvent = e as unknown as {
      ctrlKey: boolean;
      metaKey: boolean;
    };

    if (
      !disableCloseOnSelect &&
      !modifiedEvent.ctrlKey &&
      !modifiedEvent.metaKey
    ) {
      handleClose(reason as AutocompleteOnCloseReason);
    }
  };

  const handleClear = () => {
    if (disabled) return;

    ignoreListOpen.current = true;

    setInputValue('');
    onInputChange?.('', 'clear');

    handleValue(multiple ? [] : null, 'clear');
  };

  const onInputWrapperKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Escape') {
      // Avoid Opera to exit fullscreen mode.
      e.preventDefault();
      // Avoid the Modal to handle the event.
      e.stopPropagation();

      if (listOpen) {
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
      !listOpen &&
      ['PageUp', 'PageDown', 'ArrowDown', 'ArrowUp'].includes(e.key)
    ) {
      handleOpen();
      return;
    }

    if (!listOpen) return;

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

    // if multiple is true, user search option and clearInputOnBlur is
    // ture then left the inputValue as is otherwise change inputValue
    if (multiple && clearInputOnBlur) {
      setInputValue('');
      onInputChange?.('', 'reset');
      return;
    }

    if (!multiple && value === null && clearInputOnBlur) {
      setInputValue('');
      onInputChange?.('', 'reset');
      return;
    }

    if (!multiple && value) {
      const inputValue = getOptionLabel(value);
      setInputValue(inputValue);
      onInputChange?.(inputValue, 'reset');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (inputValue !== newValue) {
      setInputValue(newValue);
      setKeepUnfiltered(false);

      if (onInputChange) {
        onInputChange(newValue, 'input');
      }
    }

    if (newValue === '') {
      if (!disableClearable && !multiple) {
        handleValue(null, 'clear');
      }
    } else {
      handleOpen();
    }
  };

  const handleOptionPointerEnter = (e: React.PointerEvent) => {
    const index = Number(e.currentTarget.getAttribute('data-option-index'));
    if (highlightedIndexRef.current !== index) {
      setHighlightedIndex(index, 'pointer');
    }
  };

  const handleOptionPress = (e: React.PointerEvent) => {
    const index = Number(e.currentTarget.getAttribute('data-option-index'));
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

    // Prevent focusing the input if click is anywhere outside the Autocomplete
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

    // Prevent focusing the input if click is anywhere outside the Autocomplete
    if (!e.currentTarget.contains(target)) {
      return;
    }

    if (!inputRef.current) return;

    inputRef.current.focus();

    if (
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

  if (disabled && focused) {
    handleBlur();
  }

  const styles = React.useMemo(
    () => autocomplete({ shadow, multiple, hasClearButton, hasOpenIndicator }),
    [shadow, multiple, hasClearButton, hasOpenIndicator],
  );

  const defaultRenderGroup = (params: AutocompleteRenderGroupParams) => (
    <li key={params.key} className={styles.group()}>
      <div className={styles.groupHeader()}>{params.group}</div>
      <ul className={styles.groupItems()}>{params.children}</ul>
    </li>
  );

  const renderGroup = renderGroupProp || defaultRenderGroup;

  const defaultRenderOption = (
    props: AutocompleteRenderOptionProps & { key: string },
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
      { ...optionProps, className: styles.option() },
      option,
      {
        selected: optionProps['aria-selected'],
        index,
        inputValue,
      },
    );
  };

  let startContent: React.ReactNode | undefined = undefined;

  if (Array.isArray(value) && value.length > 0) {
    const getTagProps = (index: number) => ({
      className: styles.tag(),
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

  const endContent = (hasClearButton || hasOpenIndicator) && (
    <div className={styles.endContent()}>
      {hasClearButton && (Array.isArray(value) ? !!value.length : !!value) && (
        <Button
          isIconOnly
          variant="text"
          size="sm"
          aria-label={clearText}
          excludeFromTabOrder
          className={styles.clearIndicator()}
          onPress={handleClear}
        >
          <XIcon />
        </Button>
      )}

      {hasOpenIndicator && (
        <Button
          isIconOnly
          variant="text"
          size="sm"
          aria-label={listOpen ? closeText : openText}
          excludeFromTabOrder
          className={styles.openIndicator()}
          onPress={handleOpenIndicator}
          data-open={listOpen}
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
              'aria-owns': listOpen ? `${inputId}-listbox` : undefined,
              onKeyDown: onInputWrapperKeyDown,
              onPointerDown: onInputWrapperPoiterDown,
              onPress: onInputWrapperPress,
            },
            classNames: {
              inputWrapper: styles.inputWrapper(),
              input: styles.input(),
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
            'aria-activedescendant': listOpen ? '' : undefined,
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
            readOnly,
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
  Value extends string | object,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
>(
  props: AutocompleteProps<Value, Multiple, DisableClearable> &
    React.RefAttributes<HTMLUListElement>,
) => React.ReactNode;
