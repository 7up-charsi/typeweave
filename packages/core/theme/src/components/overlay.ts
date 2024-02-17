import { tv, VariantProps } from 'tailwind-variants';

export const overlay = tv({
  base: 'w-screen h-screen fixed inset-0 z-50 bg-overlay-5 dark:bg-overlayDark-5 backdrop-blur-sm',
});

export type OverlayVariantProps = VariantProps<typeof overlay>;

export const overlayStyles = [
  './node_modules/@webbo-ui/theme/src/components/overlay.ts',
];
