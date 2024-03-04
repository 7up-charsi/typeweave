import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const dialog = tv({
  slots: {
    content:
      'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex flex-col bg-muted-2 max-w-md w-full outline-none overflow-hidden rounded p-4',
    title: 'text-lg font-semibold text-muted-11 mb-2',
    description: 'text-normal text-muted-11',
  },
  variants: {
    shadow: {
      none: { content: 'shadow-none' },
      sm: { content: 'shadow-sm' },
      md: { content: 'shadow-md' },
      lg: { content: 'shadow-lg' },
    },
  },
  defaultVariants: {
    shadow: 'md',
    overlay: 'opaque',
  },
});

export type DialogVariantProps = VariantProps<typeof dialog>;
export type DialogClassNames = ClassNames<typeof dialog.slots>;
