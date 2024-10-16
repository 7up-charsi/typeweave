import { tv, VariantProps } from 'tailwind-variants';

export const floatingArrowStyles = tv({
  slots: {
    base: 'border-[length:var(--arrow-size)] border-transparent border-b-muted-9 data-[hide=true]:hidden',
  },
});

export type FloatingArrowVariantProps = VariantProps<
  typeof floatingArrowStyles
>;
