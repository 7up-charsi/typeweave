import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

const table = tv({
  slots: {
    table: '',
    thead: '',
    tbody: '',
    tr: 'h-10',
    th: 'px-3 text-neutral-900 font-normal first-letter:uppercase',
    td: 'text-center text-neutral-700',
  },
  variants: {
    variant: {
      strip: {
        tr: ['even:bg-neutral-100', '[thead>&]:bg-neutral-100'],
      },
      grid: {
        th: 'border border-neutral-300',
        td: 'border border-neutral-300',
      },
    },
  },
  defaultVariants: {
    variant: 'grid',
  },
});

export type TableVariantProps = VariantProps<typeof table>;
export type TableClassNames = ClassNames<typeof table.slots>;

export { table };
