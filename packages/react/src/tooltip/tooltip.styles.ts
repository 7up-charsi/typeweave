import { VariantProps, tv } from 'tailwind-variants';

export const tooltipStyles = tv({
  base: 'z-[99999] px-2 py-1 text-sm rounded bg-paper shadow-depth-elevation [--arrowFill:theme(colors.muted-9)]',
  variants: {},
});

export type TooltipVariantProps = VariantProps<typeof tooltipStyles>;
