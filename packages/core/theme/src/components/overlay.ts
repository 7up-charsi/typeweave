import { tv, VariantProps } from 'tailwind-variants';

export const overlay = tv({
  base: 'w-screen h-screen fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm dark:bg-gray-300/50',
});

export type OverlayVariantProps = VariantProps<typeof overlay>;

export const overlayStyles = [
  './node_modules/@gist-ui/theme/src/components/overlay.ts',
];
