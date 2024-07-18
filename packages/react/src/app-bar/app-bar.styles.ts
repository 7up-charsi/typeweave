import { tv, VariantProps } from 'tailwind-variants';

export const appBarStyles = tv({
  slots: {
    base: 'fixed top-0 left-0 right-0 transition-transform data-[hide=true]:-translate-y-full',
  },
  variants: {
    shadow: {
      true: { base: 'data-[hide=false]:data-[scrolled=true]:shadow-md' },
    },
  },
});

export type AppBarVariantProps = VariantProps<typeof appBarStyles>;
