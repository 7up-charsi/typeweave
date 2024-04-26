import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const pagination = tv({
  slots: {
    base: 'flex gap-2 group',
    item: '',
  },
});

export type PaginationVariantProps = VariantProps<typeof pagination>;
export type PaginationClassNames = ClassNames<typeof pagination.slots>;
