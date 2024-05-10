import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const drawer = tv({
  slots: {
    content:
      'max-h-full overflow-auto fixed z-50 w-[300px] bg-paper outline-none shadow-depth-elevation',
  },
  variants: {
    placement: {
      left: { content: 'top-0 left-0 h-full' },
      right: { content: 'top-0 right-0 h-full' },
      top: { content: 'top-0 left-0 w-full' },
      bottom: { content: 'bottom-0 left-0 w-full' },
    },
  },
});

export type DrawerVariantProps = VariantProps<typeof drawer>;
export type DrawerClassNames = ClassNames<typeof drawer.slots>;
