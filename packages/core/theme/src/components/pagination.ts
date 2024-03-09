import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const pagination = tv({
  slots: {
    base: 'flex gap-2 group',
    item: 'data-[selected=false]:text-muted-11 data-[selected=false]:hover:bg-muted-3 data-[selected=false]:[--rippleBg:theme(colors.muted-11/20%)]',
  },
});

export type PaginationVariantProps = VariantProps<typeof pagination>;
export type PaginationClassNames = ClassNames<typeof pagination.slots>;
