import {
  ClassValue,
  SlotsClassValue,
  tv,
  VariantProps,
} from 'tailwind-variants';

const alertDialog = tv({
  slots: {
    content:
      'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex flex-col bg-white max-w-sm w-full outline-none rounded p-4',
    title: 'text-lg font-semibold text-neutral-800 mb-2',
    description: 'text-normal text-neutral-600',
    actions: 'flex gap-2 items-center justify-end mt-10',
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

export type AlertDialogVariantProps = VariantProps<typeof alertDialog>;
export type AlertDialogClassNames = SlotsClassValue<
  typeof alertDialog.slots,
  ClassValue
>;

export { alertDialog };
