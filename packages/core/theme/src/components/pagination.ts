import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const pagination = tv({
  slots: {
    base: 'flex gap-2 group',
    item: 'data-[selected=false]:text-neutral-700 data-[selected=false]:data-[hovered=true]:bg-neutral-200 data-[selected=false]:[--rippleBg:theme(colors.neutral-700/20%)]',
  },
  variants: {},
});

export type PaginationVariantProps = VariantProps<typeof pagination>;
export type PaginationClassNames = ClassNames<typeof pagination.slots>;

export const paginationStyles = [
  './node_modules/@gist-ui/theme/src/components/pagination.ts',
];
