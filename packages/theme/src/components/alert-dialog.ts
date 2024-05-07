import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const alertDialog = tv({
  slots: {
    content:
      'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex flex-col w-[calc(100%-16px)] max-w-sm outline-none rounded p-4 bg-paper shadow-modal',
    title: 'font-semibold mb-2 first-letter:uppercase',
    description: 'text-sm first-letter:uppercase',
    actions: 'flex gap-2 items-center justify-end mt-3',
  },
});

export type AlertDialogVariantProps = VariantProps<typeof alertDialog>;
export type AlertDialogClassNames = ClassNames<typeof alertDialog.slots>;
