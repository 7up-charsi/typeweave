import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const radio = tv({
  slots: {
    base: 'inline-flex gap-2',
    radio: 'relative w-5 h-5',
    input:
      'peer/input rounded-full appearance-none cursor-pointer transition-colors disabled:disabled absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-focus',
    icon: 'pointer-events-none absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-11 block peer-checked/input:hidden dynamic-icon',
    checkedIcon:
      'pointer-events-none absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-checked/input:block dynamic-icon',
    label: 'cursor-pointer select-none text-muted-11 first-letter:uppercase',
  },
  variants: {
    color: {
      default: {
        checkedIcon: 'text-muted-9',
      },
      primary: {
        checkedIcon: 'text-primary-9',
      },
      secondary: {
        checkedIcon: 'text-secondary-9',
      },
      success: {
        checkedIcon: 'text-success-9',
      },
      info: {
        checkedIcon: 'text-info-9',
      },
      warning: {
        checkedIcon: 'text-warning-9',
      },
      danger: {
        checkedIcon: 'text-danger-9',
      },
    },
    size: {
      sm: { icon: 'text-base', checkedIcon: 'text-base' },
      md: { icon: 'text-lg', checkedIcon: 'text-lg' },
      lg: { icon: 'text-xl', checkedIcon: 'text-xl' },
    },
    labelPlacement: {
      top: { base: 'flex-col items-center', label: '-order-1' },
      bottom: { base: 'flex-col items-center', label: 'order-1' },
      left: { base: 'items-center', label: '-order-1' },
      right: { base: 'items-center', label: 'order-1' },
    },
  },
});

export type RadioVariantProps = VariantProps<typeof radio>;
export type RadioClassNames = ClassNames<typeof radio.slots>;
