import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const autocomplete = tv({
  slots: {
    listbox:
      'w-[--reference-width] bg-white border border-muted-300 overflow-y-auto rounded max-h-[300px] dark:bg-muted-700 dark:border-muted-500',
    option:
      'h-10 flex items-center px-2 select-none truncate cursor-pointer data-[disabled=true]:opacity-50 data-[selected=true]:bg-muted-300 data-[focused=true]:data-[selected=false]:bg-muted-200 data-[focused=true]:data-[selected=true]:bg-muted-300 dark:data-[selected=true]:bg-muted-500 dark:data-[focused=true]:data-[selected=false]:bg-muted-600 dark:data-[focused=true]:data-[selected=true]:bg-muted-500 text-muted-700 dark:text-white',
    noOptions:
      'h-10 flex items-center justify-center capitalize text-muted-700 dark:text-muted-200',
    loading:
      'h-10 flex items-center justify-center capitalize text-muted-700 dark:text-muted-200',
    group: 'relative isolate',
    groupHeader:
      'sticky top-0 bg-white dark:bg-muted-700 px-2 py-2 z-50 text-sm font-semibold text-muted-700 dark:text-white',
    groupItems: '',
  },
  variants: {
    shadow: {
      none: { listbox: 'shadow-none' },
      sm: { listbox: 'shadow-sm' },
      md: { listbox: 'shadow-md' },
      lg: { listbox: 'shadow-lg' },
    },
  },
});

export const autocompleteInput = tv({
  slots: {
    endContent: 'flex items-center',
    openIndecator: 'text-muted-500 dark:text-muted-400',
    clearButton: 'text-muted-500 dark:text-muted-400',
    inputWrapper: '',
    input: '',
  },
  variants: {
    multiple: {
      true: {
        inputWrapper: 'relative flex-wrap min-h-[48px] h-auto py-2 pr-[68px]',
        endContent: 'absolute right-2 h-full ',
        input: 'w-0 min-w-[60px]',
      },
    },
  },
});

export type AutocompleteVariantProps = VariantProps<typeof autocomplete>;
export type AutocompleteClassNames = ClassNames<typeof autocomplete.slots>;

export type AutocompleteInputVariantProps = VariantProps<
  typeof autocompleteInput
>;
export type AutocompleteInputClassNames = ClassNames<
  typeof autocompleteInput.slots
>;

export const autocompleteStyles = [
  './node_modules/@gist-ui/theme/src/components/autocomplete.ts',
];
