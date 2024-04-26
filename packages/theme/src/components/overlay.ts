import { tv, VariantProps } from 'tailwind-variants';

export const overlay = tv({
  base: 'w-screen h-screen fixed inset-0 z-50',
  variants: {
    variant: {
      transparent: 'bg-transparent',
      blur: 'bg-overlay-3 backdrop-blur-sm',
      opaque: 'bg-overlay-3',
    },
  },
});

export type OverlayVariantProps = VariantProps<typeof overlay>;
