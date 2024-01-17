import {
  ClassValue,
  SlotsClassValue,
  tv,
  VariantProps,
} from 'tailwind-variants';

const pagination = tv({
  slots: { base: 'flex gap-2', button: '' },
  variants: {},
  defaultVariants: {},
});

export type PaginationVariantProps = VariantProps<typeof pagination>;
export type PaginationClassNames = SlotsClassValue<
  typeof pagination.slots,
  ClassValue
>;

export { pagination };
