import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const dialog = tv({
  slots: {
    content:
      'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex flex-col bg-paper max-w-md w-[calc(100%-16px)] outline-none overflow-hidden rounded p-4 shadow-modal',
    title: 'text-lg font-semibold text-muted-11 mb-2',
    description: 'text-normal text-muted-11',
  },
});

export type DialogVariantProps = VariantProps<typeof dialog>;
export type DialogClassNames = ClassNames<typeof dialog.slots>;
