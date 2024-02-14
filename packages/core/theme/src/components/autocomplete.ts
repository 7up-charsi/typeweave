import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const autocomplete = tv({
  slots: {
    listbox:
      'w-[--reference-width] bg-neutral1 border border-neutral6 overflow-y-auto rounded max-h-[300px]',
    option:
      'h-10 flex items-center px-2 select-none truncate cursor-pointer data-[disabled=true]:opacity-50 data-[selected=true]:bg-neutral5 data-[focused=true]:data-[selected=false]:bg-neutral4 data-[focused=true]:data-[selected=true]:bg-neutral5 data-[hovered=true]:data-[selected=false]:bg-neutral4 data-[hovered=true]:data-[selected=true]:bg-neutral5 text-neutral11',
    noOptions:
      'h-10 flex items-center justify-center capitalize text-neutral11',
    loading: 'h-10 flex items-center justify-center capitalize text-neutral11',
    group: 'relative isolate',
    groupHeader:
      'sticky top-0 bg-neutral2 px-2 py-2 z-50 text-sm font-semibold text-neutral11',
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
    openIndecator: 'text-neutral11',
    clearButton: 'text-neutral11',
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
