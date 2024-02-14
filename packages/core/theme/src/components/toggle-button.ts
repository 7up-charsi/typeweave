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
      neutral: '',
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
      color: 'primary',
      className: { button: 'data-[selected=true]:bg-primary-200' },
    },
    {
      variant: 'border',
      color: 'secondary',
      className: { button: 'data-[selected=true]:bg-secondary-200' },
    },
    {
      variant: 'border',
      color: 'success',
      className: { button: 'data-[selected=true]:bg-success-200' },
    },
    {
      variant: 'border',
      color: 'warning',
      className: { button: 'data-[selected=true]:bg-warning-200' },
    },
    {
      variant: 'border',
      color: 'info',
      className: { button: 'data-[selected=true]:bg-info-200' },
    },
    {
      variant: 'border',
      color: 'danger',
      className: { button: 'data-[selected=true]:bg-danger-200' },
    },
    {
      variant: 'border',
      color: 'neutral',
      className: { button: 'data-[selected=true]:bg-neutral-200' },
    },

    // flat
    {
      variant: 'flat',
      color: 'primary',
      className: { button: 'data-[selected=true]:bg-primary-200' },
    },
    {
      variant: 'flat',
      color: 'secondary',
      className: { button: 'data-[selected=true]:bg-secondary-200' },
    },
    {
      variant: 'flat',
      color: 'success',
      className: { button: 'data-[selected=true]:bg-success-200' },
    },
    {
      variant: 'flat',
      color: 'warning',
      className: { button: 'data-[selected=true]:bg-warning-200' },
    },
    {
      variant: 'flat',
      color: 'info',
      className: { button: 'data-[selected=true]:bg-info-200' },
    },
    {
      variant: 'flat',
      color: 'danger',
      className: { button: 'data-[selected=true]:bg-danger-200' },
    },
    {
      variant: 'flat',
      color: 'neutral',
      className: { button: 'data-[selected=true]:bg-neutral-200' },
    },
  ],
});

export type ToggleButtonVariantProps = VariantProps<typeof toggleButton>;
export type ToggleButtonClassNames = ClassNames<typeof toggleButton.slots>;

export const toggleButtonStyles = [
  './node_modules/@gist-ui/theme/src/components/toggle-button.ts',
];
