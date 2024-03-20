import { VariantProps, tv } from 'tailwind-variants';
import { focusVisible } from '../classes';
import { ClassNames } from '../types';

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
  slots: {
    base: [
      'z-0 group relative inline-flex items-center justify-center box-border rounded appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transition-colors [&>span]:first-letter:uppercase disabled:disabled',
      focusVisible,
    ],
    content: 'first-letter:uppercase',
    startContent: '',
    endContent: '',
  },
  variants: {
    variant: {
      solid: { base: '' },
      flat: { base: '' },
      border: { base: 'border bg-transparent' },
      text: { base: 'bg-transparent' },
    },
    color: {
      default: { base: '' },
      primary: { base: '' },
      secondary: { base: '' },
      success: { base: '' },
      info: { base: '' },
      warning: { base: '' },
      danger: { base: '' },
    },
    size: {
      sm: { startContent: 'text-lg', endContent: 'text-lg' },
      md: { startContent: 'text-xl', endContent: 'text-xl' },
      lg: { startContent: 'text-2xl', endContent: 'text-2xl' },
    },
    fullWidth: {
      true: { base: 'w-full' },
    },
    isIconOnly: {
      true: { base: '[&>svg]:pointer-events-none rounded' },
    },
    isInGroup: {
      true: { base: '' },
    },
  },
  compoundVariants: [
    {
      isIconOnly: false,
      size: 'sm',
      className: {
        base: 'px-3 h-8 min-w-[64px] gap-2',
        content: 'text-sm',
      },
    },
    {
      isIconOnly: false,
      size: 'md',
      className: {
        base: 'px-4 h-10 min-w-[80px] gap-2',
        content: 'text-base',
      },
    },
    {
      isIconOnly: false,
      size: 'lg',
      className: {
        base: 'px-6 h-12 min-w-[96px] gap-3',
        content: 'text-lg',
      },
    },

    // isIconOnly
    {
      isIconOnly: true,
      isInGroup: false,
      size: 'sm',
      className: { base: 'w-8 h-8', content: 'text-lg' },
    },
    {
      isIconOnly: true,
      isInGroup: false,
      size: 'md',
      className: { base: 'w-10 h-10', content: 'text-xl' },
    },
    {
      isIconOnly: true,
      isInGroup: false,
      size: 'lg',
      className: { base: 'w-12 h-12', content: 'text-2xl' },
    },

    // isIconOnly in group
    {
      isIconOnly: true,
      isInGroup: true,
      size: 'sm',
      className: { base: 'min-w-8 w-full h-8' },
    },
    {
      isIconOnly: true,
      isInGroup: true,
      size: 'md',
      className: { base: 'min-w-10 w-full h-10' },
    },
    {
      isIconOnly: true,
      isInGroup: true,
      size: 'lg',
      className: { base: 'min-w-12 w-full h-12' },
    },

    // color / solid
    {
      variant: 'solid',
      color: 'default',
      className: { base: 'bg-muted-9 hover:bg-muted-10 text-white' },
    },
    {
      variant: 'solid',
      color: 'primary',
      className: { base: 'bg-primary-9 hover:bg-primary-10 text-white' },
    },
    {
      variant: 'solid',
      color: 'secondary',
      className: { base: 'bg-secondary-9 hover:bg-secondary-10 text-white' },
    },
    {
      variant: 'solid',
      color: 'success',
      className: { base: 'bg-success-9 hover:bg-success-10 text-white' },
    },
    {
      variant: 'solid',
      color: 'info',
      className: { base: 'bg-info-9 hover:bg-info-10 text-white' },
    },
    {
      variant: 'solid',
      color: 'warning',
      className: { base: 'bg-warning-9 hover:bg-warning-10 text-white' },
    },
    {
      variant: 'solid',
      color: 'danger',
      className: { base: 'bg-danger-9 hover:bg-danger-10 text-white' },
    },

    // color / flat
    {
      variant: 'flat',
      color: 'default',
      className: {
        base: 'bg-muted-3 hover:bg-muted-4 active:bg-muted-5 text-muted-11',
      },
    },
    {
      variant: 'flat',
      color: 'primary',
      className: {
        base: 'bg-primary-3 hover:bg-primary-4 active:bg-primary-5 text-primary-11',
      },
    },
    {
      variant: 'flat',
      color: 'secondary',
      className: {
        base: 'bg-secondary-3 hover:bg-secondary-4 active:bg-secondary-5 text-secondary-11',
      },
    },
    {
      variant: 'flat',
      color: 'success',
      className: {
        base: 'bg-success-3 hover:bg-success-4 active:bg-success-5 text-success-11',
      },
    },
    {
      variant: 'flat',
      color: 'info',
      className: 'bg-info-3 hover:bg-info-4 active:bg-info-5 text-info-11',
    },
    {
      variant: 'flat',
      color: 'warning',
      className: {
        base: 'bg-warning-3 hover:bg-warning-4 active:bg-warning-5 text-warning-11',
      },
    },
    {
      variant: 'flat',
      color: 'danger',
      className: {
        base: 'bg-danger-3 hover:bg-danger-4 active:bg-danger-5 text-danger-11',
      },
    },

    // color / text
    {
      variant: 'text',
      color: 'default',
      className: 'hover:bg-muted-4 active:bg-muted-5 text-muted-11',
    },
    {
      variant: 'text',
      color: 'primary',
      className: 'hover:bg-primary-4 active:bg-primary-5 text-primary-11',
    },
    {
      variant: 'text',
      color: 'secondary',
      className: 'hover:bg-secondary-4 active:bg-secondary-5 text-secondary-11',
    },
    {
      variant: 'text',
      color: 'success',
      className: 'hover:bg-success-4 active:bg-success-5 text-success-11',
    },
    {
      variant: 'text',
      color: 'info',
      className: 'hover:bg-info-4 active:bg-info-5 text-info-11',
    },
    {
      variant: 'text',
      color: 'warning',
      className: 'hover:bg-warning-4 active:bg-warning-5 text-warning-11',
    },
    {
      variant: 'text',
      color: 'danger',
      className: 'hover:bg-danger-4 active:bg-danger-5 text-danger-11',
    },

    // color / border
    {
      variant: 'border',
      color: 'default',
      className: {
        base: 'border-muted-6 hover:border-muted-7 active:border-muted-8 text-muted-11',
      },
    },
    {
      variant: 'border',
      color: 'primary',
      className: {
        base: 'border-primary-6 hover:border-primary-7 active:border-primary-8 text-primary-11',
      },
    },
    {
      variant: 'border',
      color: 'secondary',
      className: {
        base: 'border-secondary-6 hover:border-secondary-7 active:border-secondary-8 text-secondary-11',
      },
    },
    {
      variant: 'border',
      color: 'success',
      className: {
        base: 'border-success-6 hover:border-success-7 active:border-success-8 text-success-11',
      },
    },
    {
      variant: 'border',
      color: 'info',
      className: {
        base: 'border-info-6 hover:border-info-7 active:border-info-8 text-info-11',
      },
    },
    {
      variant: 'border',
      color: 'warning',
      className: {
        base: 'border-warning-6 hover:border-warning-7 active:border-warning-8 text-warning-11',
      },
    },
    {
      variant: 'border',
      color: 'danger',
      className: {
        base: 'border-danger-6 hover:border-danger-7 active:border-danger-8 text-danger-11',
      },
    },
  ],
});

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>;
export type ButtonVariantProps = VariantProps<typeof button>;
export type ButtonClassNames = ClassNames<typeof button.slots>;
