import { VariantProps, tv } from 'tailwind-variants';

export const tooltip = tv({
  base: 'z-[99999] px-2 py-1 text-sm rounded bg-paper shadow-modal [--arrowFill:theme(colors.muted-9)]',
  variants: {},
});

export type TooltipVariantProps = VariantProps<typeof tooltip>;
