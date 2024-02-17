import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const popover = tv({
  slots: {
    content:
      'border border-muted-6 dark:border-mutedDark-6 bg-muted-2 dark:bg-mutedDark-2 max-w-sm w-full rounded p-4 [--arrowFill:theme(colors.muted.9)] dark:[--arrowFill:theme(colors.mutedDark.9)]',
    title: 'text-lg font-semibold text-muted-11 dark:text-mutedDark-11',
    description: 'mt-2 text-normal text-muted-11 dark:text-mutedDark-11',
  },
  variants: {
    shadow: {
      none: { content: 'shadow-none' },
      sm: { content: 'shadow-sm' },
      md: { content: 'shadow-md' },
      lg: { content: 'shadow-lg' },
    },
  },
  defaultVariants: {
    shadow: 'md',
  },
});

export type PopoverVariantProps = VariantProps<typeof popover>;
export type PopoverClassNames = ClassNames<typeof popover.slots>;

export const popoverStyles = [
  './node_modules/@webbo-ui/theme/src/components/popover.ts',
];
