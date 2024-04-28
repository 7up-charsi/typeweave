import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const select = tv({
  slots: {
    listbox:
      'w-[--reference-width] bg-background border border-muted-6 overflow-y-auto rounded max-h-[300px] z-50',
    option:
      'flex items-center px-2 py-2 select-none truncate cursor-pointer data-[disabled=true]:opacity-50 text-muted-11 data-[selected=true]:bg-info-4 data-[focused=true]:data-[selected=false]:bg-info-3 data-[focused=true]:data-[selected=true]:bg-info-5 text-wrap',
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

export const selectInput = tv({
  slots: {
    input: 'truncate',
    openIndecator: 'text-muted-9 text-lg',
    clearButton: 'text-muted-9 w-6 h-6 text-lg',
    loader:
      'animate-spin inline-block size-4 border-2 border-muted-9 border-t-transparent rounded-full',
  },
});

export type SelectVariantProps = VariantProps<typeof select>;
export type SelectClassNames = ClassNames<typeof select.slots>;

export type SelectInputVariantProps = VariantProps<typeof selectInput>;
export type SelectInputClassNames = ClassNames<typeof selectInput.slots>;
