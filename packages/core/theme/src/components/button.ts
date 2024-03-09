import { VariantProps, tv } from 'tailwind-variants';
import { focusVisible } from '../classes';

export const buttonGroup = tv({
  base: 'inline-flex gap-0 [&>button]:rounded-none',
  variants: {
    direction: {
      horizontal:
        '[&>button:first-of-type]:rounded-l [&>button:last-of-type]:rounded-r [&>button:not(:last-of-type)]:border-r-0 [&>button:not(:first-of-type)]:border-l [&>button:not(:first-of-type)]:border-l-muted-8',
      vertical:
        'flex-col [&>button:first-of-type]:rounded-t [&>button:last-of-type]:rounded-b [&>button:not(:last-of-type)]:border-b-0 [&>button:not(:first-of-type)]:border-t [&>button:not(:first-of-type)]:border-t-muted-8',
    },
  },
});

export const button = tv({
  base: [
    'z-0 group relative inline-flex items-center justify-center box-border rounded appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transition-colors outline-none [&>span]:first-letter:uppercase',
    ...focusVisible,
  ],
  variants: {
    variant: {
      solid: '',
      flat: '',
      border: 'border bg-transparent',
      text: 'bg-transparent',
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
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    fullWidth: {
      true: 'w-full',
    },
    isDisabled: {
      true: 'disabled',
    },
    isIconOnly: {
      true: '[&>svg]:pointer-events-none rounded',
    },
    isInGroup: {
      true: '',
    },
  },
  compoundVariants: [
    {
      isIconOnly: false,
      size: 'sm',
      className: 'px-3 h-8 min-w-[64px] text-sm gap-2',
    },
    {
      isIconOnly: false,
      size: 'md',
      className: 'px-4 h-10 min-w-[80px] gap-2',
    },
    {
      isIconOnly: false,
      size: 'lg',
      className: 'px-6 h-12 min-w-[96px] text-lg gap-3',
    },

    // isIconOnly
    {
      isIconOnly: true,
      isInGroup: false,
      size: 'sm',
      class: 'w-8 h-8',
    },
    {
      isIconOnly: true,
      isInGroup: false,
      size: 'md',
      class: 'w-10 h-10',
    },
    {
      isIconOnly: true,
      isInGroup: false,
      size: 'lg',
      class: 'w-12 h-12',
    },
    {
      isIconOnly: true,
      isInGroup: true,
      size: 'sm',
      class: 'min-w-8 w-full h-8',
    },
    {
      isIconOnly: true,
      isInGroup: true,
      size: 'md',
      class: 'min-w-10 w-full h-10',
    },
    {
      isIconOnly: true,
      isInGroup: true,
      size: 'lg',
      class: 'min-w-12 w-full h-12',
    },

    // color / solid
    {
      variant: 'solid',
      color: 'default',
      class: 'bg-muted-9 hover:bg-muted-10 text-white',
    },
    {
      variant: 'solid',
      color: 'primary',
      class: 'bg-primary-9 hover:bg-primary-10 text-white',
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: 'bg-secondary-9 hover:bg-secondary-10 text-white',
    },
    {
      variant: 'solid',
      color: 'success',
      class: 'bg-success-9 hover:bg-success-10 text-white',
    },
    {
      variant: 'solid',
      color: 'info',
      class: 'bg-info-9 hover:bg-info-10 text-white',
    },
    {
      variant: 'solid',
      color: 'warning',
      class: 'bg-warning-9 hover:bg-warning-10 text-white',
    },
    {
      variant: 'solid',
      color: 'danger',
      class: 'bg-danger-9 hover:bg-danger-10 text-white',
    },

    // color / flat
    {
      variant: 'flat',
      color: 'default',
      class: 'bg-muted-3 hover:bg-muted-4 active:bg-muted-5 text-muted-11',
    },
    {
      variant: 'flat',
      color: 'primary',
      class:
        'bg-primary-3 hover:bg-primary-4 active:bg-primary-5 text-primary-11',
    },
    {
      variant: 'flat',
      color: 'secondary',
      class:
        'bg-secondary-3 hover:bg-secondary-4 active:bg-secondary-5 text-secondary-11',
    },
    {
      variant: 'flat',
      color: 'success',
      class:
        'bg-success-3 hover:bg-success-4 active:bg-success-5 text-success-11',
    },
    {
      variant: 'flat',
      color: 'info',
      class: 'bg-info-3 hover:bg-info-4 active:bg-info-5 text-info-11',
    },
    {
      variant: 'flat',
      color: 'warning',
      class:
        'bg-warning-3 hover:bg-warning-4 active:bg-warning-5 text-warning-11',
    },
    {
      variant: 'flat',
      color: 'danger',
      class: 'bg-danger-3 hover:bg-danger-4 active:bg-danger-5 text-danger-11',
    },

    // color / text
    {
      variant: 'text',
      color: 'default',
      class: 'hover:bg-muted-4 active:bg-muted-5 text-muted-11',
    },
    {
      variant: 'text',
      color: 'primary',
      class: 'hover:bg-primary-4 active:bg-primary-5 text-primary-11',
    },
    {
      variant: 'text',
      color: 'secondary',
      class: 'hover:bg-secondary-4 active:bg-secondary-5 text-secondary-11',
    },
    {
      variant: 'text',
      color: 'success',
      class: 'hover:bg-success-4 active:bg-success-5 text-success-11',
    },
    {
      variant: 'text',
      color: 'info',
      class: 'hover:bg-info-4 active:bg-info-5 text-info-11',
    },
    {
      variant: 'text',
      color: 'warning',
      class: 'hover:bg-warning-4 active:bg-warning-5 text-warning-11',
    },
    {
      variant: 'text',
      color: 'danger',
      class: 'hover:bg-danger-4 active:bg-danger-5 text-danger-11',
    },

    // color / border
    {
      variant: 'border',
      color: 'default',
      class:
        'border-muted-6 hover:border-muted-7 active:border-muted-8 text-muted-11',
    },
    {
      variant: 'border',
      color: 'primary',
      class:
        'border-primary-6 hover:border-primary-7 active:border-primary-8 text-primary-11',
    },
    {
      variant: 'border',
      color: 'secondary',
      class:
        'border-secondary-6 hover:border-secondary-7 active:border-secondary-8 text-secondary-11',
    },
    {
      variant: 'border',
      color: 'success',
      class:
        'border-success-6 hover:border-success-7 active:border-success-8 text-success-11',
    },
    {
      variant: 'border',
      color: 'info',
      class:
        'border-info-6 hover:border-info-7 active:border-info-8 text-info-11',
    },
    {
      variant: 'border',
      color: 'warning',
      class:
        'border-warning-6 hover:border-warning-7 active:border-warning-8 text-warning-11',
    },
    {
      variant: 'border',
      color: 'danger',
      class:
        'border-danger-6 hover:border-danger-7 active:border-danger-8 text-danger-11',
    },
  ],
});

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>;
export type ButtonVariantProps = VariantProps<typeof button>;
