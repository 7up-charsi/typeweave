import * as select from './select';
import * as option from './option';

// export types
export type { SelectProps, Reason } from './select';
export type { OptionProps } from './option';

// export component
export const Select = select.Select;
export const Option = option.Option;

export { mapInputProps } from './map-input-props';
