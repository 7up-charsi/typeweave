import { tv, VariantProps } from 'tailwind-variants';

export const paginationStyles = tv({
  slots: {
    base: 'flex gap-2 group',
    item: '',
  },
});

export type PaginationVariantProps = VariantProps<typeof paginationStyles>;
