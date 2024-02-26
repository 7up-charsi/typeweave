import { VariantProps, tv } from 'tailwind-variants';

export const tooltip = tv({
  base: 'z-50 px-2 py-1 cursor-pointer text-sm relative group rounded-full bg-muted-9 text-white [--arrowFill:theme(colors.muted.9)] dark:bg-mutedDark-9 dark:[--arrowFill:theme(colors.mutedDark.9)]',
  variants: {},
});

export type TooltipVariantProps = VariantProps<typeof tooltip>;
