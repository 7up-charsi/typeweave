import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const pagination = tv({
  slots: {
    base: 'flex gap-2 group',
    item: 'data-[selected=false]:text-muted-11 data-[selected=false]:data-[hovered=true]:bg-muted-3 data-[selected=false]:[--rippleBg:theme(colors.muted.11/20%)] dark:data-[selected=false]:text-mutedDark-11 dark:data-[selected=false]:data-[hovered=true]:bg-mutedDark-3 dark:data-[selected=false]:[--rippleBg:theme(colors.mutedDark.11/20%)]',
  },
});

export type PaginationVariantProps = VariantProps<typeof pagination>;
export type PaginationClassNames = ClassNames<typeof pagination.slots>;

export const paginationStyles = [
  './node_modules/@gist-ui/theme/src/components/pagination.ts',
];
