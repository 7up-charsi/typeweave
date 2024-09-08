import { tv, VariantProps } from 'tailwind-variants';

export const checkboxStyles = tv({
  slots: {
    base: 'inline-flex gap-2 group/base',
    checkbox: 'relative shrink-0',
    input:
      'group-data-[error=true]/base:border-danger-9 peer/input rounded appearance-none cursor-pointer transition-colors border border-muted-8 disabled:disabled absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-focus',
    icon: 'pointer-events-none absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block peer-indeterminate/input:hidden peer-checked/input:hidden dynamic-icon',
    checkedIcon:
      'pointer-events-none absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-checked/input:block dynamic-icon',
    indeterminateIcon:
      'pointer-events-none absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-indeterminate/input:block dynamic-icon',
    label:
      'cursor-pointer select-none first-letter:uppercase group-data-[error=true]/base:text-danger-11',
  },
  variants: {
    color: {
      default: {
        input: 'checked:bg-muted-9 checked:border-muted-9',
        checkedIcon: 'text-white',
        indeterminateIcon: 'text-default-11',
      },
      primary: {
        input: 'checked:bg-primary-9 checked:border-primary-9',
        checkedIcon: 'text-white',
        indeterminateIcon: 'text-primary-11',
      },
      secondary: {
        input: 'checked:bg-secondary-9 checked:border-secondary-9',
        checkedIcon: 'text-white',
        indeterminateIcon: 'text-secondary-11',
      },
      success: {
        input: 'checked:bg-success-9 checked:border-success-9',
        checkedIcon: 'text-white',
        indeterminateIcon: 'text-success-11',
      },
      info: {
        input: 'checked:bg-info-9 checked:border-info-9',
        checkedIcon: 'text-white',
        indeterminateIcon: 'text-info-11',
      },
      warning: {
        input: 'checked:bg-warning-9 checked:border-warning-9',
        checkedIcon: 'text-white',
        indeterminateIcon: 'text-warning-11',
      },
      danger: {
        input: 'checked:bg-danger-9 checked:border-danger-9',
        checkedIcon: 'text-white',
        indeterminateIcon: 'text-danger-11',
      },
    },
    size: {
      sm: {
        checkbox: 'size-4',
        icon: 'text-base',
        checkedIcon: 'text-base',
        indeterminateIcon: 'text-xs',
      },
      md: {
        checkbox: 'size-5 ',
        icon: 'text-lg',
        checkedIcon: 'text-lg',
        indeterminateIcon: 'text-sm',
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

export type CheckboxVariantProps = VariantProps<typeof checkboxStyles>;
