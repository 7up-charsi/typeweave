// copied from mui

export interface CreateComboboxFilterConfig<Value> {
  ignoreAccents?: boolean;
  ignoreCase?: boolean;
  limit?: number;
  matchFrom?: 'any' | 'start';
  stringify?: (option: Value) => string;
  trim?: boolean;
}

export interface ComboboxFilterState<Value> {
  inputValue: string;
  getOptionLabel: (option: Value) => string;
}

const stripDiacritics = (string: string) => {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const createComboboxFilter = <Value,>(
  config: CreateComboboxFilterConfig<Value> = {},
) => {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = 'any',
    stringify,
    trim = false,
  } = config;

  return (
    options: Value[],
    { inputValue, getOptionLabel }: ComboboxFilterState<Value>,
  ) => {
    let input = trim ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }

    const filteredOptions = !input
      ? options
      : options.filter((option) => {
          let candidate = (stringify || getOptionLabel)(option);
          if (ignoreCase) {
            candidate = candidate.toLowerCase();
          }
          if (ignoreAccents) {
            candidate = stripDiacritics(candidate);
          }

          return matchFrom === 'start'
            ? candidate.indexOf(input) === 0
            : candidate.indexOf(input) > -1;
        });

    return typeof limit === 'number'
      ? filteredOptions.slice(0, limit)
      : filteredOptions;
  };
};
