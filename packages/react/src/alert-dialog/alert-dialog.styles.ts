import { tv, VariantProps } from 'tailwind-variants';

export const alertDialogStyles = tv({
  slots: {
    content:
      'fixed z-50 bg-paper outline-none overflow-hidden shadow-depth-elevation top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-sm w-full rounded p-5',
    title: 'text-lg text-muted-12 first-letter:uppercase font-semibold',
    description: 'mt-2',
    actions: 'flex items-center justify-end gap-2 mt-5',
  },
});

export type AlertDialogVariantProps = VariantProps<typeof alertDialogStyles>;
