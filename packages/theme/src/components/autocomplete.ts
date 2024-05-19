import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const autocomplete = tv({
  slots: {
    listboxWrapper:
      'bg-paper border border-muted-6 rounded z-50 overflow-hidden',
    listbox: 'max-h-[300px] w-[var(--reference-width)] overflow-y-auto py-2',
    option:
      'px-2 py-2 select-none cursor-pointer data-[disabled=true]:disabled data-[selected=true]:bg-info-3 data-[focused=true]:data-[selected=true]:bg-info-4 data-[focused=true]:data-[selected=false]:bg-muted-3 dark:data-[selected=true]:bg-info-6 dark:data-[focused=true]:data-[selected=true]:bg-info-7 dark:data-[focused=true]:data-[selected=false]:bg-muted-6',
    noOptions: 'h-10 flex items-center justify-center capitalize',
    loading: 'h-10 flex items-center justify-center capitalize',
    group: 'relative isolate',
    groupHeader: 'sticky top-0 bg-muted-2 px-2 py-2 z-50 text-sm font-semibold',
    groupItems: '',
  },
  variants: {
    shadow: {
      true: { listboxWrapper: 'shadow-md' },
      false: { listboxWrapper: 'shadow-none' },
    },
  },
});

export const autocompleteInput = tv({
  slots: {
    openIndecator: 'text-muted-11 text-lg dynamic-icon',
    clearButton: 'w-6 h-6 text-lg',
    endContent: '',
    startContent: '',
    inputWrapper: '',
    input: 'truncate',
    loader:
      'animate-spin inline-block size-4 border-2 border-muted-8 border-t-transparent rounded-full',
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
