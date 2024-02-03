import { tv, VariantProps } from 'tailwind-variants';

const buttonGroup = tv({
  base: 'inline-flex gap-0 [&>button]:rounded-none',
  variants: {
    direction: {
      horizontal:
        'items-center [&>button:first-of-type]:rounded-l [&>button:last-of-type]:rounded-r [&>button:first-of-type]:border-r-0 [&>button:last-of-type]:border-l-0 [&>button:not(:first-of-type,_:last-of-type)]:border-x-0',
      verticle:
        'flex-col [&>button:first-of-type]:rounded-t [&>button:last-of-type]:rounded-b [&>button]:w-full [&>button:first-of-type]:border-b-0 [&>button:last-of-type]:border-t-0 [&>button:not(:first-of-type,_:last-of-type)]:border-y-0',
    },
  },
});

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>;

export { buttonGroup };
