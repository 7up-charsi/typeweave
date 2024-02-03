import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

const select = tv({
  slots: {
    listbox:
      'w-[--reference-width] bg-white border overflow-y-auto rounded max-h-[300px]',
    option:
      'h-10 flex items-center px-2 select-none truncate cursor-pointer data-[disabled=true]:opacity-50 data-[selected=true]:bg-info-200 data-[focused=true]:data-[selected=false]:bg-neutral-200 data-[focused=true]:data-[selected=true]:bg-info-300 data-[hovered=true]:data-[selected=false]:bg-neutral-200 data-[hovered=true]:data-[selected=true]:bg-info-300 text-neutral-800 ',
    noOptions: 'h-10 flex items-center justify-center capitalize text-neutral',
    loading: 'h-10 flex items-center justify-center capitalize text-neutral',
    group: 'relative isolate',
    groupHeader:
      'sticky top-0 bg-white px-2 py-2 z-50 text-sm font-medium text-neutral-600',
    groupItems: '',
    endContent: 'flex items-center',
    openIndecator: 'text-neutral',
    clearButton: 'text-neutral',
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

const selectInput = tv({
  slots: {
    endContent: 'flex items-center',
    openIndecator: 'text-neutral',
    clearButton: 'text-neutral',
  },
});

export type SelectVariantProps = VariantProps<typeof select>;
export type SelectClassNames = ClassNames<typeof select.slots>;

export type SelectInputVariantProps = VariantProps<typeof selectInput>;
export type SelectInputClassNames = ClassNames<typeof selectInput.slots>;

export { select, selectInput };
