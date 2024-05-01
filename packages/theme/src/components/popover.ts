import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const popover = tv({
  slots: {
    content:
      'bg-paper max-w-sm w-full rounded p-4 [--arrowFill:theme(colors.muted-9)] shadow-modal',
    title: 'text-lg font-semibold text-muted-11 mb-2',
    description: 'text-normal text-muted-11',
  },
});

export type PopoverVariantProps = VariantProps<typeof popover>;
export type PopoverClassNames = ClassNames<typeof popover.slots>;
