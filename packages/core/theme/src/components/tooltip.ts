import { VariantProps, tv } from 'tailwind-variants';

export const tooltip = tv({
  base: 'px-2 py-1 cursor-pointer text-sm relative group rounded-full bg-neutral text-neutral-foreground',
  variants: {},
});

export type TooltipVariantProps = VariantProps<typeof tooltip>;

export const tooltipStyles = [
  './node_modules/@gist-ui/theme/src/components/tooltip.ts',
];
