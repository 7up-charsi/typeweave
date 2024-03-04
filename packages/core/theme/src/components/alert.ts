import { tv, VariantProps } from 'tailwind-variants';

export const alert = tv({
  base: 'inline-flex gap-4 p-4 rounded',
  variants: {
    variant: {
      solid: '',
      flat: '',
      border: 'border bg-transparent',
    },
    color: {
      success: '',
      info: '',
      warning: '',
      danger: '',
    },
    fullWidth: {
      true: 'w-full',
      false: 'max-w-max',
    },
  },
  compoundVariants: [
    // color / solid
    {
      variant: 'solid',
      color: 'success',
      class: 'bg-success-9 text-white',
    },
    {
      variant: 'solid',
      color: 'info',
      class: 'bg-info-9 text-white',
    },
    {
      variant: 'solid',
      color: 'warning',
      class: 'bg-warning-9 text-white',
    },
    {
      variant: 'solid',
      color: 'danger',
      class: 'bg-danger-9 text-white',
    },

    // color / flat
    {
      variant: 'flat',
      color: 'success',
      class: 'bg-success-3 text-success-11',
    },
    {
      variant: 'flat',
      color: 'info',
      class: 'bg-info-3 text-info-11',
    },
    {
      variant: 'flat',
      color: 'warning',
      class: 'bg-warning-3 text-warning-11',
    },
    {
      variant: 'flat',
      color: 'danger',
      class: 'bg-danger-3 text-danger-11',
    },

    // color / border
    {
      variant: 'border',
      color: 'success',
      class: 'border-success-6 text-success-11',
    },
    {
      variant: 'border',
      color: 'info',
      class: 'border-info-6 text-info-11',
    },
    {
      variant: 'border',
      color: 'warning',
      class: 'border-warning-6 text-warning-11',
    },
    {
      variant: 'border',
      color: 'danger',
      class: 'border-danger-6 text-danger-11',
    },
  ],
});

export type AlertVariantProps = VariantProps<typeof alert>;
