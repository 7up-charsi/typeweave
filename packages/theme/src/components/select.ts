import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const select = tv({
  slots: {
    listboxWrapper:
      'bg-paper border border-muted-6 rounded z-50 overflow-hidden',
    listbox: 'max-h-[300px] w-[var(--reference-width)] overflow-y-auto',
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

export const selectInput = tv({
  slots: {
    input: 'truncate',
    openIndecator: 'text-muted-11 text-lg dynamic-icon',
    clearButton: 'w-6 h-6 text-lg',
    loader:
      'animate-spin inline-block size-4 border-2 border-muted-8 border-t-transparent rounded-full',
  },
});

export type SelectVariantProps = VariantProps<typeof select>;
export type SelectClassNames = ClassNames<typeof select.slots>;

export type SelectInputVariantProps = VariantProps<typeof selectInput>;
export type SelectInputClassNames = ClassNames<typeof selectInput.slots>;
