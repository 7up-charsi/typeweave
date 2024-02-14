import { VariantProps, tv } from 'tailwind-variants';
import { dataFocusVisible } from '../classes';

export const buttonGroup = tv({
  base: 'inline-flex gap-0 [&>button]:rounded-none',
  variants: {
    direction: {
      horizontal:
        'items-center [&>button:first-of-type]:rounded-l [&>button:last-of-type]:rounded-r [&>button:first-of-type]:border-r-0 [&>button:last-of-type]:border-l-0 [&>button:not(:first-of-type,_:last-of-type)]:border-x-0',
      verticle:
        'flex-col [&>button:first-of-type]:rounded-t [&>button:last-of-type]:rounded-b [&>button]:grow [&>button:first-of-type]:border-b-0 [&>button:last-of-type]:border-t-0 [&>button:not(:first-of-type,_:last-of-type)]:border-y-0',
    },
  },
});

export const button = tv({
  base: [
    'z-0 group relative inline-flex items-center justify-center box-border rounded appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transition-colors outline-none',
    ...dataFocusVisible,
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
      true: '[&>svg]:pointer-events-none rounded-full',
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
      class: 'bg-muted-500 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'primary',
      class: 'bg-primary-500 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: 'bg-secondary-500 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'success',
      class: 'bg-success-500 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'info',
      class: 'bg-info-500 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'warning',
      class: 'bg-warning-500 text-black [--rippleBg:theme(colors.black/10%)]',
    },
    {
      variant: 'solid',
      color: 'danger',
      class: 'bg-danger-500 text-white [--rippleBg:theme(colors.white/30%)]',
    },

    // color / flat
    {
      variant: 'flat',
      color: 'default',
      class:
        'bg-muted-100 text-muted-700 [--rippleBg:theme(colors.muted.700/10%)] dark:bg-muted-950 dark:text-muted-100 dark:[--rippleBg:theme(colors.muted.100/20%)]',
    },
    {
      variant: 'flat',
      color: 'primary',
      class:
        'bg-primary-100 text-primary-700 [--rippleBg:theme(colors.primary.700/10%)] dark:bg-primary-950 dark:text-primary-100 dark:[--rippleBg:theme(colors.primary.100/20%)]',
    },
    {
      variant: 'flat',
      color: 'secondary',
      class:
        'bg-secondary-100 text-secondary-700 [--rippleBg:theme(colors.secondary.700/10%)] dark:bg-secondary-950 dark:text-secondary-100 dark:[--rippleBg:theme(colors.secondary.100/20%)]',
    },
    {
      variant: 'flat',
      color: 'success',
      class:
        'bg-success-100 text-success-700 [--rippleBg:theme(colors.success.700/10%)] dark:bg-success-950 dark:text-success-100 dark:[--rippleBg:theme(colors.success.100/20%)]',
    },
    {
      variant: 'flat',
      color: 'info',
      class:
        'bg-info-100 text-info-700 [--rippleBg:theme(colors.info.700/10%)] dark:bg-info-950 dark:text-info-100 dark:[--rippleBg:theme(colors.info.100/20%)]',
    },
    {
      variant: 'flat',
      color: 'warning',
      class:
        'bg-warning-100 text-warning-700 [--rippleBg:theme(colors.warning.700/10%)] dark:bg-warning-950 dark:text-warning-100 dark:[--rippleBg:theme(colors.warning.100/20%)]',
    },
    {
      variant: 'flat',
      color: 'danger',
      class:
        'bg-danger-100 text-danger-700 [--rippleBg:theme(colors.danger.700/10%)] dark:bg-danger-950 dark:text-danger-100 dark:[--rippleBg:theme(colors.danger.100/20%)]',
    },

    // color / text
    {
      variant: 'text',
      color: 'default',
      class:
        'data-[hovered=true]:bg-muted-100 text-muted-700 [--rippleBg:theme(colors.muted.700/10%)] dark:data-[hovered=true]:bg-muted-950 dark:text-muted-100 dark:[--rippleBg:theme(colors.muted.100/20%)]',
    },
    {
      variant: 'text',
      color: 'primary',
      class:
        'data-[hovered=true]:bg-primary-100 text-primary-700 [--rippleBg:theme(colors.primary.700/10%)] dark:data-[hovered=true]:bg-primary-950 dark:text-primary-300 dark:[--rippleBg:theme(colors.primary.100/20%)]',
    },
    {
      variant: 'text',
      color: 'secondary',
      class:
        'data-[hovered=true]:bg-secondary-100 text-secondary-700 [--rippleBg:theme(colors.secondary.700/10%)] dark:data-[hovered=true]:bg-secondary-950 dark:text-secondary-300 dark:[--rippleBg:theme(colors.secondary.100/20%)]',
    },
    {
      variant: 'text',
      color: 'success',
      class:
        'data-[hovered=true]:bg-success-100 text-success-700 [--rippleBg:theme(colors.success.700/10%)] dark:data-[hovered=true]:bg-success-950 dark:text-success-300 dark:[--rippleBg:theme(colors.success.100/20%)]',
    },
    {
      variant: 'text',
      color: 'info',
      class:
        'data-[hovered=true]:bg-info-100 text-info-700 [--rippleBg:theme(colors.info.700/10%)] dark:data-[hovered=true]:bg-info-950 dark:text-info-300 dark:[--rippleBg:theme(colors.info.100/20%)]',
    },
    {
      variant: 'text',
      color: 'warning',
      class:
        'data-[hovered=true]:bg-warning-100 text-warning-700 [--rippleBg:theme(colors.warning.700/10%)] dark:data-[hovered=true]:bg-warning-950 dark:text-warning-300 dark:[--rippleBg:theme(colors.warning.100/20%)]',
    },
    {
      variant: 'text',
      color: 'danger',
      class:
        'data-[hovered=true]:bg-danger-100 text-danger-700 [--rippleBg:theme(colors.danger.700/10%)] dark:data-[hovered=true]:bg-danger-950 dark:text-danger-300 dark:[--rippleBg:theme(colors.danger.100/20%)]',
    },

    // color / border
    {
      variant: 'border',
      color: 'default',
      class:
        'border-neutral-400 text-neutral-700 [--rippleBg:theme(colors.neutral.700/10%)] dark:border-neutral-700 dark:text-neutral-300 dark:[--rippleBg:theme(colors.neutral.300/20%)]',
    },
    {
      variant: 'border',
      color: 'primary',
      class:
        'border-primary-400 text-primary-700 [--rippleBg:theme(colors.primary.700/10%)] dark:border-primary-700 dark:text-primary-300 dark:[--rippleBg:theme(colors.primary.300/20%)]',
    },
    {
      variant: 'border',
      color: 'secondary',
      class:
        'border-secondary-400 text-secondary-700 [--rippleBg:theme(colors.secondary.700/10%)] dark:border-secondary-700 dark:text-secondary-300 dark:[--rippleBg:theme(colors.secondary.300/20%)]',
    },
    {
      variant: 'border',
      color: 'success',
      class:
        'border-success-400 text-success-700 [--rippleBg:theme(colors.success.700/10%)] dark:border-success-700 dark:text-success-300 dark:[--rippleBg:theme(colors.success.300/20%)]',
    },
    {
      variant: 'border',
      color: 'info',
      class:
        'border-info-400 text-info-700 [--rippleBg:theme(colors.info.700/10%)] dark:border-info-700 dark:text-info-300 dark:[--rippleBg:theme(colors.info.300/20%)]',
    },
    {
      variant: 'border',
      color: 'warning',
      class:
        'border-warning-400 text-warning-700 [--rippleBg:theme(colors.warning.700/10%)] dark:border-warning-700 dark:text-warning-300 dark:[--rippleBg:theme(colors.warning.300/20%)]',
    },
    {
      variant: 'border',
      color: 'danger',
      class:
        'border-danger-400 text-danger-700 [--rippleBg:theme(colors.danger.700/10%)] dark:border-danger-700 dark:text-danger-300 dark:[--rippleBg:theme(colors.danger.300/20%)]',
    },
  ],
});

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>;
export type ButtonVariantProps = VariantProps<typeof button>;

export const buttonStyles = [
  './node_modules/@gist-ui/theme/src/components/button.ts',
  './node_modules/@gist-ui/theme/src/classes.ts',
];
