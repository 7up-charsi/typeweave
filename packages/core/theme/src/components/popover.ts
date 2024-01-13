import {
  ClassValue,
  SlotsClassValue,
  tv,
  VariantProps,
} from 'tailwind-variants';

const popover = tv({
  slots: {
    content: 'border bg-white max-w-sm w-full rounded p-4',
    title: 'text-lg font-semibold text-neutral-700 mb-1',
    description: 'text-normal text-neutral-700',
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
export type PopoverClassNames = SlotsClassValue<
  typeof popover.slots,
  ClassValue
>;

export { popover };
