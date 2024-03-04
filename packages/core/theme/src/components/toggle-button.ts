import { tv, VariantProps } from 'tailwind-variants';
import { ClassNames } from '../types';

export const toggleButton = tv({
  slots: { button: '' },
  variants: {
    variant: {
      border: {},
      flat: {},
    },
    color: {
      default: '',
      primary: '',
      secondary: '',
      success: '',
      info: '',
      warning: '',
      danger: '',
    },
  },
  compoundVariants: [
    // border
    {
      variant: 'border',
      color: 'default',
      className: {
        button: 'data-[selected=true]:bg-muted-5',
      },
    },
    {
      variant: 'border',
      color: 'primary',
      className: {
        button: 'data-[selected=true]:bg-primary-5',
      },
    },
    {
      variant: 'border',
      color: 'secondary',
      className: {
        button: 'data-[selected=true]:bg-secondary-5',
      },
    },
    {
      variant: 'border',
      color: 'success',
      className: {
        button: 'data-[selected=true]:bg-success-5',
      },
    },
    {
      variant: 'border',
      color: 'warning',
      className: {
        button: 'data-[selected=true]:bg-warning-5',
      },
    },
    {
      variant: 'border',
      color: 'info',
      className: {
        button: 'data-[selected=true]:bg-info-5',
      },
    },
    {
      variant: 'border',
      color: 'danger',
      className: {
        button: 'data-[selected=true]:bg-danger-5',
      },
    },

    // flat
    {
      variant: 'flat',
      color: 'default',
      className: {
        button: 'data-[selected=true]:bg-muted-5',
      },
    },
    {
      variant: 'flat',
      color: 'primary',
      className: {
        button: 'data-[selected=true]:bg-primary-5',
      },
    },
    {
      variant: 'flat',
      color: 'secondary',
      className: {
        button: 'data-[selected=true]:bg-secondary-5',
      },
    },
    {
      variant: 'flat',
      color: 'success',
      className: {
        button: 'data-[selected=true]:bg-success-5',
      },
    },
    {
      variant: 'flat',
      color: 'warning',
      className: {
        button: 'data-[selected=true]:bg-warning-5',
      },
    },
    {
      variant: 'flat',
      color: 'info',
      className: {
        button: 'data-[selected=true]:bg-info-5',
      },
    },
    {
      variant: 'flat',
      color: 'danger',
      className: {
        button: 'data-[selected=true]:bg-danger-5',
      },
    },
  ],
});

export type ToggleButtonVariantProps = VariantProps<typeof toggleButton>;
export type ToggleButtonClassNames = ClassNames<typeof toggleButton.slots>;
