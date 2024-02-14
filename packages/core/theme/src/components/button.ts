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
      neutral: '',
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
      color: 'neutral',
      class:
        'bg-neutral9 data-[hovered=true]:bg-neutral10 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'primary',
      class:
        'bg-primary9 data-[hovered=true]:bg-primary10 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'secondary',
      class:
        'bg-secondary9 data-[hovered=true]:bg-secondary10 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'success',
      class:
        'bg-success9 data-[hovered=true]:bg-success10 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'info',
      class:
        'bg-info9 data-[hovered=true]:bg-info10 text-white [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'warning',
      class:
        'bg-warning9 data-[hovered=true]:bg-warning10 text-black [--rippleBg:theme(colors.white/30%)]',
    },
    {
      variant: 'solid',
      color: 'danger',
      class:
        'bg-danger9 data-[hovered=true]:bg-danger10 text-white [--rippleBg:theme(colors.white/30%)]',
    },

    // color / flat
    {
      variant: 'flat',
      color: 'neutral',
      class:
        'bg-neutral3 data-[hovered=true]:bg-neutral4 text-neutral11 [--rippleBg:theme(colors.neutral11/20%)]',
    },
    {
      variant: 'flat',
      color: 'primary',
      class:
        'bg-primary3 data-[hovered=true]:bg-primary4 text-primary11 [--rippleBg:theme(colors.primary11/20%)]',
    },
    {
      variant: 'flat',
      color: 'secondary',
      class:
        'bg-secondary3 data-[hovered=true]:bg-secondary4 text-secondary11 [--rippleBg:theme(colors.secondary11/20%)]',
    },
    {
      variant: 'flat',
      color: 'success',
      class:
        'bg-success3 data-[hovered=true]:bg-success4 text-success11 [--rippleBg:theme(colors.success11/20%)]',
    },
    {
      variant: 'flat',
      color: 'info',
      class:
        'bg-info3 data-[hovered=true]:bg-info4 text-info11 [--rippleBg:theme(colors.info11/20%)]',
    },
    {
      variant: 'flat',
      color: 'warning',
      class:
        'bg-warning3 data-[hovered=true]:bg-warning4 text-warning11 [--rippleBg:theme(colors.warning11/20%)]',
    },
    {
      variant: 'flat',
      color: 'danger',
      class:
        'bg-danger3 data-[hovered=true]:bg-danger4 text-danger11 [--rippleBg:theme(colors.danger11/20%)]',
    },

    // color / text
    {
      variant: 'text',
      color: 'neutral',
      class:
        'data-[hovered=true]:bg-neutral4 text-neutral11 [--rippleBg:theme(colors.neutral11/20%)]',
    },
    {
      variant: 'text',
      color: 'primary',
      class:
        'data-[hovered=true]:bg-primary4 text-primary11 [--rippleBg:theme(colors.primary11/20%)]',
    },
    {
      variant: 'text',
      color: 'secondary',
      class:
        'data-[hovered=true]:bg-secondary4 text-secondary11 [--rippleBg:theme(colors.secondary11/20%)]',
    },
    {
      variant: 'text',
      color: 'success',
      class:
        'data-[hovered=true]:bg-success4 text-success11 [--rippleBg:theme(colors.success11/20%)]',
    },
    {
      variant: 'text',
      color: 'info',
      class:
        'data-[hovered=true]:bg-info4 text-info11 [--rippleBg:theme(colors.info11/20%)]',
    },
    {
      variant: 'text',
      color: 'warning',
      class:
        'data-[hovered=true]:bg-warning4 text-warning11 [--rippleBg:theme(colors.warning11/20%)]',
    },
    {
      variant: 'text',
      color: 'danger',
      class:
        'data-[hovered=true]:bg-danger4 text-danger11 [--rippleBg:theme(colors.danger11/20%)]',
    },

    // color / border
    {
      variant: 'border',
      color: 'neutral',
      class:
        'border-neutral7 data-[hovered=true]:border-neutral8 text-neutral11 [--rippleBg:theme(colors.neutral11/20%)]',
    },
    {
      variant: 'border',
      color: 'primary',
      class:
        'border-primary7 data-[hovered=true]:border-primary8 text-primary11 [--rippleBg:theme(colors.primary11/20%)]',
    },
    {
      variant: 'border',
      color: 'secondary',
      class:
        'border-secondary7 data-[hovered=true]:border-secondary8 text-secondary11 [--rippleBg:theme(colors.secondary11/20%)]',
    },
    {
      variant: 'border',
      color: 'success',
      class:
        'border-success7 data-[hovered=true]:border-success8 text-success11 [--rippleBg:theme(colors.success11/20%)]',
    },
    {
      variant: 'border',
      color: 'info',
      class:
        'border-info7 data-[hovered=true]:border-info8 text-info11 [--rippleBg:theme(colors.info11/20%)]',
    },
    {
      variant: 'border',
      color: 'warning',
      class:
        'border-warning7 data-[hovered=true]:border-warning8 text-warning11 [--rippleBg:theme(colors.warning11/20%)]',
    },
    {
      variant: 'border',
      color: 'danger',
      class:
        'border-danger7 data-[hovered=true]:border-danger8 text-danger11 [--rippleBg:theme(colors.danger11/20%)]',
    },
  ],
});

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroup>;
export type ButtonVariantProps = VariantProps<typeof button>;

export const buttonStyles = [
  './node_modules/@gist-ui/theme/src/components/button.ts',
  './node_modules/@gist-ui/theme/src/classes.ts',
];
