import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const alertDialog = tv({
  slots: {
    content:
      'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex flex-col max-w-sm w-full outline-none rounded p-4 bg-white dark:bg-muted-900',
    title: 'text-lg font-semibold text-neutral-700 dark:text-neutral-200',
    description: 'mt-2 text-neutral-600 dark:text-neutral-300',
    actions: 'flex gap-2 items-center justify-end mt-3',
  },
  variants: {
    shadow: {
      none: { content: 'shadow-none' },
      sm: { content: 'shadow-sm' },
      md: { content: 'shadow-md' },
      lg: { content: 'shadow-lg' },
    },
  },
});

export type AlertDialogVariantProps = VariantProps<typeof alertDialog>;
export type AlertDialogClassNames = ClassNames<typeof alertDialog.slots>;

export const alertDialogStyles = [
  './node_modules/@gist-ui/theme/src/components/alert-dialog.ts',
];
