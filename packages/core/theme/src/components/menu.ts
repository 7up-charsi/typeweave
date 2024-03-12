import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const menu = tv({
  slots: {
    menu: 'min-w-[150px] bg-muted-2 border border-muted-6 rounded py-2 outline-none [--arrowFill:theme(colors.muted-9)]',
    item: 'px-2 h-8 cursor-pointer select-none flex items-center gap-1 text-muted-11 outline-none data-[disabled=true]:cursor-default data-[disabled=true]:disabled data-[focused=true]:bg-muted-4 relative overflow-hidden',
    itemIcon:
      'w-[15px] h-full overflow-hidden flex items-center justify-center',
    itemContent: 'grow first-letter:uppercase',
    label: 'px-4 py-1 text-sm text-muted-11 first-letter:uppercase',
    group: '',
    separator: 'h-px bg-muted-6 my-1',
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
