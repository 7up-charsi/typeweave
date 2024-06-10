import { tv, VariantProps } from 'tailwind-variants';

export const overlayStyles = tv({
  base: 'w-screen h-screen fixed inset-0 z-50',
  variants: {
    variant: {
      transparent: 'bg-transparent',
      blur: 'bg-overlay backdrop-blur-sm',
      opaque: 'bg-overlay',
    },
  },
});

export type OverlayVariantProps = VariantProps<typeof overlayStyles>;
