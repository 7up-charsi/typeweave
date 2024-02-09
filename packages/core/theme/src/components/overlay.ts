import { tv, VariantProps } from 'tailwind-variants';

export const overlay = tv({
  base: 'w-screen h-screen fixed inset-0 z-50',
  variants: {
    variant: {
      opaque: 'bg-overlay/50 backdrop-opacity-50',
      blur: 'backdrop-blur-md backdrop-saturate-150 bg-overlay/30',
      transparent: 'hidden',
    },
  },
});

export type OverlayVariantProps = VariantProps<typeof overlay>;

export const overlayStyles = [
  './node_modules/@gist-ui/theme/src/components/overlay.ts',
];
