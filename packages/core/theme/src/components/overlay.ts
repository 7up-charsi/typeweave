import { tv, VariantProps } from 'tailwind-variants';

export const overlay = tv({
  base: 'w-screen h-screen fixed inset-0 z-50',
  variants: {
    variant: {
      opaque: 'bg-overlay5',
      blur: 'backdrop-blur-sm bg-overlay5',
      transparent: 'hidden',
    },
  },
});

export type OverlayVariantProps = VariantProps<typeof overlay>;

export const overlayStyles = [
  './node_modules/@gist-ui/theme/src/components/overlay.ts',
];
