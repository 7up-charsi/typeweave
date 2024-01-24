import {
  ClassValue,
  SlotsClassValue,
  tv,
  VariantProps,
} from 'tailwind-variants';

const pagination = tv({
  slots: {
    base: 'flex gap-2 group',
    item: 'data-[selected=false]:text-neutral-700 data-[selected=false]:data-[hovered=true]:bg-neutral-200 data-[selected=false]:[--rippleBg:theme(colors.neutral-700/20%)]',
  },
  variants: {},
  defaultVariants: {},
});

export type PaginationVariantProps = VariantProps<typeof pagination>;
export type PaginationClassNames = SlotsClassValue<
  typeof pagination.slots,
  ClassValue
>;

export { pagination };
