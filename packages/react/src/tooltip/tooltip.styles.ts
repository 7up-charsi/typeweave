import { VariantProps, tv } from 'tailwind-variants';

export const tooltipStyles = tv({
  slots: {
    content:
      'relative z-[99999] px-2 py-1 text-sm rounded bg-paper shadow-depth-elevation',
  },
});

export type TooltipVariantProps = VariantProps<typeof tooltipStyles>;
