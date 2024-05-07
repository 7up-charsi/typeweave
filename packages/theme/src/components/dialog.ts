import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const dialog = tv({
  slots: {
    content:
      'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex flex-col bg-paper max-w-md w-[calc(100%-16px)] outline-none overflow-hidden rounded shadow-modal',
    header: 'py-2 px-4 space-y-1 border-b border-b-muted-6',
    title: 'font-semibold',
    description: 'text-sm',
  },
});

export type DialogVariantProps = VariantProps<typeof dialog>;
export type DialogClassNames = ClassNames<typeof dialog.slots>;
