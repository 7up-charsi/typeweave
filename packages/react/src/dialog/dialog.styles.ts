import { tv, VariantProps } from 'tailwind-variants';

export const dialogStyles = tv({
  slots: {
    content:
      'fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 bg-paper outline-none overflow-hidden rounded shadow-depth-elevation',
  },
});

export type DialogVariantProps = VariantProps<typeof dialogStyles>;
