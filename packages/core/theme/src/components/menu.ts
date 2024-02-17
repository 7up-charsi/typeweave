import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const menu = tv({
  slots: {
    menu: 'min-w-[150px] bg-muted-2 dark:bg-mutedDark-2 border border-muted-6 dark:border-mutedDark-6 rounded-md py-2 outline-none [--arrowFill:theme(colors.muted.9)] dark:[--arrowFill:theme(colors.mutedDark.9)]',
    item: 'px-2 h-8 cursor-pointer select-none flex items-center gap-1 text-muted-11 dark:text-mutedDark-11 outline-none data-[disabled=true]:cursor-default data-[disabled=true]:opacity-50 data-[focused=true]:bg-muted-4 dark:data-[focused=true]:bg-mutedDark-4 relative overflow-hidden',
    itemIcon:
      'w-[15px] h-full overflow-hidden flex items-center justify-center',
    itemContent: 'first-letter:uppercase',
    label:
      'px-4 py-1 text-sm text-muted-11 dark:text-mutedDark-11 first-letter:uppercase',
    group: '',
    separator: 'h-px bg-muted-6 my-1 dark:bg-mutedDark-6',
  },
  variants: {
    shadow: {
      none: { menu: 'shadow-none' },
      sm: { menu: 'shadow-sm' },
      md: { menu: 'shadow-md' },
      lg: { menu: 'shadow-lg' },
    },
  },
});

export type MenuVariantProps = VariantProps<typeof menu>;
export type MenuClassNames = ClassNames<typeof menu.slots>;

export const menuStyles = [
  './node_modules/@webbo-ui/theme/src/components/menu.ts',
];
