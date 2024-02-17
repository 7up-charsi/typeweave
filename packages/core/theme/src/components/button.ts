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
      class:
        'bg-muted-9 dark:bg-mutedDark-9 data-[hovered=true]:bg-muted-10 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'primary',
      class:
        'bg-primary-9 dark:bg-primaryDark-9 data-[hovered=true]:bg-primary-10 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'secondary',
      class:
        'bg-secondary-9 dark:bg-secondaryDark-9 data-[hovered=true]:bg-secondary-10 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'success',
      class:
        'bg-success-9 dark:bg-successDark-9 data-[hovered=true]:bg-success-10 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'info',
      class:
        'bg-info-9 dark:bg-infoDark-9 data-[hovered=true]:bg-info-10 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'warning',
      class:
        'bg-warning-9 dark:bg-warningDark-9 data-[hovered=true]:bg-warning-10 text-white [--rippleBg:theme(colors.white/10%)]',
    },
    {
      variant: 'solid',
      color: 'danger',
      class:
        'bg-danger-9 dark:bg-dangerDark-9 data-[hovered=true]:bg-danger-10 text-white [--rippleBg:theme(colors.white/30%)]',
    },

    // color / flat
    {
      variant: 'flat',
      color: 'default',
      class:
        'bg-muted-3 data-[hovered=true]:bg-muted-4 text-muted-11 [--rippleBg:theme(colors.muted.11/10%)] dark:bg-mutedDark-3 dark:data-[hovered=true]:bg-mutedDark-4 dark:text-mutedDark-11 dark:[--rippleBg:theme(colors.mutedDark.11/10%)]',
    },
    {
      variant: 'flat',
      color: 'primary',
      class:
        'bg-primary-3 data-[hovered=true]:bg-primary-4 text-primary-11 [--rippleBg:theme(colors.primary.11/10%)] dark:bg-primaryDark-3 dark:data-[hovered=true]:bg-primaryDark-4 dark:text-primaryDark-11 dark:[--rippleBg:theme(colors.primaryDark.11/10%)]',
    },
    {
      variant: 'flat',
      color: 'secondary',
      class:
        'bg-secondary-3 data-[hovered=true]:bg-secondary-4 text-secondary-11 [--rippleBg:theme(colors.secondary.11/10%)] dark:bg-secondaryDark-3 dark:data-[hovered=true]:bg-secondaryDark-4 dark:text-secondaryDark-11 dark:[--rippleBg:theme(colors.secondaryDark.11/10%)]',
    },
    {
      variant: 'flat',
      color: 'success',
      class:
        'bg-success-3 data-[hovered=true]:bg-success-4 text-success-11 [--rippleBg:theme(colors.success.11/10%)] dark:bg-successDark-3 dark:data-[hovered=true]:bg-successDark-4 dark:text-successDark-11 dark:[--rippleBg:theme(colors.successDark.11/10%)]',
    },
    {
      variant: 'flat',
      color: 'info',
      class:
        'bg-info-3 data-[hovered=true]:bg-info-4 text-info-11 [--rippleBg:theme(colors.info.11/10%)] dark:bg-infoDark-3 dark:data-[hovered=true]:bg-infoDark-4 dark:text-infoDark-11 dark:[--rippleBg:theme(colors.infoDark.11/10%)]',
    },
    {
      variant: 'flat',
      color: 'warning',
      class:
        'bg-warning-3 data-[hovered=true]:bg-warning-4 text-warning-11 [--rippleBg:theme(colors.warning.11/10%)] dark:bg-warningDark-3 dark:data-[hovered=true]:bg-warningDark-4 dark:text-warningDark-11 dark:[--rippleBg:theme(colors.warningDark.11/10%)]',
    },
    {
      variant: 'flat',
      color: 'danger',
      class:
        'bg-danger-3 data-[hovered=true]:bg-danger-4 text-danger-11 [--rippleBg:theme(colors.danger.11/10%)] dark:bg-dangerDark-3 dark:data-[hovered=true]:bg-dangerDark-4 dark:text-dangerDark-11 dark:[--rippleBg:theme(colors.dangerDark.11/10%)]',
    },

    // color / text
    {
      variant: 'text',
      color: 'default',
      class:
        'data-[hovered=true]:bg-muted-3 text-muted-11 [--rippleBg:theme(colors.muted.11/10%)] dark:data-[hovered=true]:bg-mutedDark-3 dark:text-mutedDark-11 dark:[--rippleBg:theme(colors.mutedDark.11/10%)]',
    },
    {
      variant: 'text',
      color: 'primary',
      class:
        'data-[hovered=true]:bg-primary-3 text-primary-11 [--rippleBg:theme(colors.primary.11/10%)] dark:data-[hovered=true]:bg-primaryDark-3 dark:text-primaryDark-11 dark:[--rippleBg:theme(colors.primaryDark.11/10%)]',
    },
    {
      variant: 'text',
      color: 'secondary',
      class:
        'data-[hovered=true]:bg-secondary-3 text-secondary-11 [--rippleBg:theme(colors.secondary.11/10%)] dark:data-[hovered=true]:bg-secondaryDark-3 dark:text-secondaryDark-11 dark:[--rippleBg:theme(colors.secondaryDark.11/10%)]',
    },
    {
      variant: 'text',
      color: 'success',
      class:
        'data-[hovered=true]:bg-success-3 text-success-11 [--rippleBg:theme(colors.success.11/10%)] dark:data-[hovered=true]:bg-successDark-3 dark:text-successDark-11 dark:[--rippleBg:theme(colors.successDark.11/10%)]',
    },
    {
      variant: 'text',
      color: 'info',
      class:
        'data-[hovered=true]:bg-info-3 text-info-11 [--rippleBg:theme(colors.info.11/10%)] dark:data-[hovered=true]:bg-infoDark-3 dark:text-infoDark-11 dark:[--rippleBg:theme(colors.infoDark.11/10%)]',
    },
    {
      variant: 'text',
      color: 'warning',
      class:
        'data-[hovered=true]:bg-warning-3 text-warning-11 [--rippleBg:theme(colors.warning.11/10%)] dark:data-[hovered=true]:bg-warningDark-3 dark:text-warningDark-11 dark:[--rippleBg:theme(colors.warningDark.11/10%)]',
    },
    {
      variant: 'text',
      color: 'danger',
      class:
        'data-[hovered=true]:bg-danger-3 text-danger-11 [--rippleBg:theme(colors.danger.11/10%)] dark:data-[hovered=true]:bg-dangerDark-3 dark:text-dangerDark-11 dark:[--rippleBg:theme(colors.dangerDark.11/10%)]',
    },

    // color / border
    {
      variant: 'border',
      color: 'default',
      class:
        'border-muted-7 data-[hovered=true]:border-muted-8 text-muted-11 [--rippleBg:theme(colors.muted.11/10%)] dark:border-mutedDark-7 dark:data-[hovered=true]:border-mutedDark-8 dark:text-mutedDark-11 [--rippleBg:theme(colors.mutedDark.11/10%)]',
    },
    {
      variant: 'border',
      color: 'primary',
      class:
        'border-primary-7 data-[hovered=true]:border-primary-8 text-primary-11 [--rippleBg:theme(colors.primary.11/10%)] dark:border-primaryDark-7 dark:data-[hovered=true]:border-primaryDark-8 dark:text-primaryDark-11 [--rippleBg:theme(colors.primaryDark.11/10%)]',
    },
    {
      variant: 'border',
      color: 'secondary',
      class:
        'border-secondary-7 data-[hovered=true]:border-secondary-8 text-secondary-11 [--rippleBg:theme(colors.secondary.11/10%)] dark:border-secondaryDark-7 dark:data-[hovered=true]:border-secondaryDark-8 dark:text-secondaryDark-11 [--rippleBg:theme(colors.secondaryDark.11/10%)]',
    },
    {
      variant: 'border',
      color: 'success',
      class:
        'border-success-7 data-[hovered=true]:border-success-8 text-success-11 [--rippleBg:theme(colors.success.11/10%)] dark:border-successDark-7 dark:data-[hovered=true]:border-successDark-8 dark:text-successDark-11 [--rippleBg:theme(colors.successDark.11/10%)]',
    },
    {
      variant: 'border',
      color: 'info',
      class:
        'border-info-7 data-[hovered=true]:border-info-8 text-info-11 [--rippleBg:theme(colors.info.11/10%)] dark:border-infoDark-7 dark:data-[hovered=true]:border-infoDark-8 dark:text-infoDark-11 [--rippleBg:theme(colors.infoDark.11/10%)]',
    },
    {
      variant: 'border',
      color: 'warning',
      class:
        'border-warning-7 data-[hovered=true]:border-warning-8 text-warning-11 [--rippleBg:theme(colors.warning.11/10%)] dark:border-warningDark-7 dark:data-[hovered=true]:border-warningDark-8 dark:text-warningDark-11 [--rippleBg:theme(colors.warningDark.11/10%)]',
    },
    {
      variant: 'border',
      color: 'danger',
      class:
        'border-danger-7 data-[hovered=true]:border-danger-8 text-danger-11 [--rippleBg:theme(colors.danger.11/10%)] dark:border-dangerDark-7 dark:data-[hovered=true]:border-dangerDark-8 dark:text-dangerDark-11 [--rippleBg:theme(colors.dangerDark.11/10%)]',
    },
  ],
});

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>;
export type ButtonVariantProps = VariantProps<typeof button>;

export const buttonStyles = [
  './node_modules/@webbo-ui/theme/src/components/button.ts',
  './node_modules/@webbo-ui/theme/src/classes.ts',
];
