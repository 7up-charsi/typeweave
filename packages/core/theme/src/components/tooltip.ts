import { VariantProps, tv } from 'tailwind-variants';

export const tooltip = tv({
  base: 'z-[99999] px-2 py-1 cursor-pointer text-sm relative group rounded bg-muted-9 text-white [--arrowFill:theme(colors.muted-9)]',
  variants: {},
});

export type TooltipVariantProps = VariantProps<typeof tooltip>;
