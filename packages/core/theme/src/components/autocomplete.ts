import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const autocomplete = tv({
  slots: {
    listbox:
      'w-[--reference-width] bg-muted-2 border border-muted-6 overflow-y-auto rounded max-h-[300px] z-50',
    option:
      'flex items-center px-2 py-2 select-none truncate cursor-pointer data-[disabled=true]:opacity-50 text-muted-11 data-[selected=true]:bg-muted-5 data-[focused=true]:data-[selected=false]:bg-muted-4 data-[focused=true]:data-[selected=true]:bg-muted-5 text-wrap',
    noOptions: 'h-10 flex items-center justify-center capitalize text-muted-11',
    loading: 'h-10 flex items-center justify-center capitalize text-muted-11',
    group: 'relative isolate',
    groupHeader:
      'sticky top-0 bg-muted-2 px-2 py-2 z-50 text-sm font-semibold text-muted-11',
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
    openIndecator: 'text-muted-9 text-lg',
    clearButton: 'text-muted-9 h-[28px] w-[28px]',
    endContent: '',
    startContent: '',
    inputWrapper: '',
    input: '',
    loader:
      'animate-spin inline-block size-4 border-2 border-muted-9 border-t-transparent rounded-full',
  },
  variants: {
    multiple: {
      true: {
        inputWrapper: 'group/inputWrapper grid grid-cols-[1fr_auto] gap-0',
        startContent:
          'col-start-1 col-end-3 row-start-2 row-end-3 flex flex-wrap gap-1 group-data-[chips=true]/inputWrapper:border-t group-data-[chips=true]/inputWrapper:border-t-muted-6 group-data-[chips=true]/inputWrapper:py-2',
        input: 'w-full col-start-1 col-end-2 ',
        endContent: 'max-w-max h-full col-start-2 col-end-3',
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
