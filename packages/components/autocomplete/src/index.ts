import * as autocomplete from './autocomplete';
import * as option from './option';

// export types
export type { AutocompleteProps, Reason } from './autocomplete';
export type { OptionProps } from './option';

// export component
export const Autocomplete = autocomplete.Autocomplete;
export const Option = option.Option;

export { mapInputProps } from './map-input-props';
