import { tv, VariantProps } from 'tailwind-variants';
import { focusVisible } from '../classes';
import { ClassNames } from '../types';

export const checkbox = tv({
  slots: {
    base: 'inline-flex gap-2',
    checkbox: 'relative',
    input: [
      'peer/input outline-none rounded appearance-none cursor-pointer transition-colors border border-muted-8 disabled:disabled absolute inset-0',
      ...focusVisible,
    ],
    icon: 'pointer-events-none absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-11 block peer-indeterminate/input:hidden peer-checked/input:hidden',
    checkedIcon:
      'pointer-events-none absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-checked/input:block',
    indeterminate:
      'pointer-events-none absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-indeterminate/input:block',
    label: 'cursor-pointer select-none text-muted-11 first-letter:uppercase',
  },
  variants: {
    color: {
      default: {
        input: 'checked:bg-muted-9 checked:border-muted-9',
        checkedIcon: 'text-white',
        indeterminate: 'text-default-11',
      },
      primary: {
        input: 'checked:bg-primary-9 checked:border-primary-9',
        checkedIcon: 'text-white',
        indeterminate: 'text-primary-11',
      },
      secondary: {
        input: 'checked:bg-secondary-9 checked:border-secondary-9',
        checkedIcon: 'text-white',
        indeterminate: 'text-secondary-11',
      },
      success: {
        input: 'checked:bg-success-9 checked:border-success-9',
        checkedIcon: 'text-white',
        indeterminate: 'text-success-11',
      },
      info: {
        input: 'checked:bg-info-9 checked:border-info-9',
        checkedIcon: 'text-white',
        indeterminate: 'text-info-11',
      },
      warning: {
        input: 'checked:bg-warning-9 checked:border-warning-9',
        checkedIcon: 'text-white',
        indeterminate: 'text-warning-11',
      },
      danger: {
        input: 'checked:bg-danger-9 checked:border-danger-9',
        checkedIcon: 'text-white',
        indeterminate: 'text-danger-11',
      },
    },
    size: {
      sm: {
        checkbox: 'w-4 h-4',
      },
      md: {
        checkbox: 'w-5 h-5 ',
      },
    },
    labelPlacement: {
      top: { base: 'flex-col items-center', label: '-order-1' },
      bottom: { base: 'flex-col items-center', label: 'order-1' },
      left: { base: 'items-center', label: '-order-1' },
      right: { base: 'items-center', label: 'order-1' },
    },
  },
});

export type CheckboxVariantProps = VariantProps<typeof checkbox>;
export type CheckboxClassNames = ClassNames<typeof checkbox.slots>;
