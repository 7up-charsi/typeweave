import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const popover = tv({
  slots: {
    content:
      'bg-paper max-w-sm w-full rounded [--arrowFill:theme(colors.muted-9)] shadow-depth-elevation',
    header: 'py-2 px-4 space-y-1 border-b border-b-muted-6',
    title: 'first-letter:uppercase font-semibold',
    description: 'first-letter:uppercase text-sm',
  },
});

export type PopoverVariantProps = VariantProps<typeof popover>;
export type PopoverClassNames = ClassNames<typeof popover.slots>;
