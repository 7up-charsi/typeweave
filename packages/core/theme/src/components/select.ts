import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const select = tv({
  slots: {
    listbox:
      'w-[--reference-width] bg-muted-2 border border-muted-6 overflow-y-auto rounded max-h-[300px] dark:bg-mutedDark-2 dark:border-mutedDark-6',
    option:
      'h-10 flex items-center px-2 select-none truncate cursor-pointer data-[disabled=true]:opacity-50 text-muted-11 dark:text-mutedDark-11 data-[selected=true]:bg-muted-5 data-[focused=true]:data-[selected=false]:bg-muted-4 data-[focused=true]:data-[selected=true]:bg-muted-5 dark:data-[selected=true]:bg-mutedDark-5 dark:data-[focused=true]:data-[selected=false]:bg-mutedDark-4 dark:data-[focused=true]:data-[selected=true]:bg-mutedDark-5',
    noOptions:
      'h-10 flex items-center justify-center capitalize text-muted-11 dark:text-mutedDark-11',
    loading:
      'h-10 flex items-center justify-center capitalize text-muted-11 dark:text-mutedDark-11',
    group: 'relative isolate',
    groupHeader:
      'sticky top-0 bg-muted-2 dark:bg-mutedDark-2 px-2 py-2 z-50 text-sm font-semibold text-muted-11 dark:text-mutedDark-11',
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
    endContent: 'flex items-center',
    openIndecator: 'text-muted-11 dark:text-mutedDark-11',
    clearButton: 'text-muted-11 dark:text-mutedDark-11',
  },
});

export type SelectVariantProps = VariantProps<typeof select>;
export type SelectClassNames = ClassNames<typeof select.slots>;

export type SelectInputVariantProps = VariantProps<typeof selectInput>;
export type SelectInputClassNames = ClassNames<typeof selectInput.slots>;

export const selectStyles = [
  './node_modules/@gist-ui/theme/src/components/select.ts',
];
