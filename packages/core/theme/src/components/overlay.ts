import { tv, VariantProps } from 'tailwind-variants';

export const overlay = tv({
  base: 'w-screen h-screen fixed inset-0 z-50 bg-overlay-3 backdrop-blur-sm',
});

export type OverlayVariantProps = VariantProps<typeof overlay>;
