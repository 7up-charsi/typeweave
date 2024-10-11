import { tv, VariantProps } from 'tailwind-variants';

export const dialogStyles = tv({
  slots: {
    content:
      'fixed z-50 bg-paper outline-none overflow-hidden shadow-depth-elevation',
  },
  variants: {
    placement: {
      left: { content: 'top-0 left-0 h-full' },
      top: { content: 'top-0 left-0 w-full' },
      bottom: { content: 'bottom-0 left-0' },
      right: { content: 'top-0 right-0 h-full' },
      center: { content: 'top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2' },
    },
  },
});

export type DialogVariantProps = VariantProps<typeof dialogStyles>;
