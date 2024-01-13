import {
  ClassValue,
  SlotsClassValue,
  tv,
  VariantProps,
} from 'tailwind-variants';

const dialog = tv({
  slots: {
    overlay: 'w-screen h-screen fixed inset-0 z-50',
    content:
      'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex flex-col bg-white max-w-md w-full outline-none overflow-hidden rounded p-5',
    title: 'text-lg font-semibold text-neutral-700 py-1',
    description: 'text-normal text-neutral-700',
  },
  variants: {
    overlay: {
      opaque: {
        overlay: 'bg-overlay/50 backdrop-opacity-50',
      },
      blur: {
        overlay: 'backdrop-blur-md backdrop-saturate-150 bg-overlay/30',
      },
      transparent: { overlay: 'hidden' },
    },
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
export type DialogClassNames = SlotsClassValue<typeof dialog.slots, ClassValue>;

export { dialog };
