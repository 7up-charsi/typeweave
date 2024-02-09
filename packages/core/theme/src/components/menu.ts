import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const menu = tv({
  slots: {
    menu: 'min-w-[150px] bg-white border rounded-md py-2 outline-none',
    item: 'px-2 h-8 cursor-pointer select-none flex items-center gap-1 text-neutral-800 outline-none data-[disabled=true]:cursor-default data-[disabled=true]:opacity-50 data-[focused=true]:bg-neutral-200 relative [--rippleBg:theme(colors.neutral-800/20%)] overflow-hidden',
    itemIcon:
      'w-[15px] h-full overflow-hidden flex items-center justify-center',
    itemContent: 'first-letter:uppercase',
    label: 'px-4 py-1 text-sm text-neutral-700 first-letter:uppercase',
    group: '',
    separator: 'h-px bg-neutral-300 my-1',
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
  './node_modules/@gist-ui/theme/src/components/menu.ts',
];
