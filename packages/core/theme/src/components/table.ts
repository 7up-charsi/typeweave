import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const table = tv({
  slots: {
    table: '',
    thead: '',
    tbody: '',
    tr: 'h-10',
    th: 'px-3 text-muted-11 dark:text-mutedDark-11 font-normal first-letter:uppercase',
    td: 'text-center text-muted-11 dark:text-mutedDark-11',
  },
  variants: {
    variant: {
      strip: {
        tr: 'even:bg-muted-3 [thead>&]:bg-muted-3 dark:even:bg-mutedDark-3 dark:[thead>&]:bg-mutedDark-3',
      },
      grid: {
        th: 'border border-muted-6',
        td: 'border border-muted-6',
      },
    },
  },
});

export type TableVariantProps = VariantProps<typeof table>;
export type TableClassNames = ClassNames<typeof table.slots>;

export const tableStyles = [
  './node_modules/@gist-ui/theme/src/components/table.ts',
];
