import { tv, VariantProps } from 'tailwind-variants';

export const popoverStyles = tv({
  slots: {
    content:
      'relative data-[hide=true]:invisible z-50 bg-paper outline-none shadow-depth-elevation',
  },
});

export type PopoverVariantProps = VariantProps<typeof popoverStyles>;
