import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

const popover = tv({
  slots: {
    content: 'border bg-white max-w-sm w-full rounded p-4',
    title: 'text-lg font-semibold text-neutral-800 mb-2',
    description: 'text-normal text-neutral-600',
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
  },
});

export type PopoverVariantProps = VariantProps<typeof popover>;
export type PopoverClassNames = ClassNames<typeof popover.slots>;

export { popover };
