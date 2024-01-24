import { VariantProps, tv } from 'tailwind-variants';
import { dataFocusVisible } from '../classes';
import { ClassNames } from '../types';

const chip = tv({
  slots: {
    base: 'inline-flex items-center gap-1 px-2 rounded-full select-none',
    deleteIcon: [
      'cursor-pointer opacity-80 data-[hovered=true]:opacity-100 outline-none transition',
      ...dataFocusVisible,
    ],
  },
  variants: {
    variant: {
      solid: { base: '' },
      flat: { base: '' },
      shadow: { base: 'shadow-lg' },
      border: { base: 'border bg-transparent' },
      text: { base: 'bg-transparent' },
    },
    color: {
      primary: { base: '' },
      secondary: { base: '' },
      success: { base: '' },
      info: { base: '' },
      warning: { base: '' },
      danger: { base: '' },
    },
    size: {
      sm: { base: 'text-xs h-6' },
      md: { base: 'text-sm h-7' },
      lg: { base: 'h-8' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    color: 'primary',
  },
  compoundVariants: [
    // color / solid
    {
      variant: 'solid',
      color: 'primary',
      class: {
        base: 'bg-primary text-primary-foreground [--rippleBg:theme(colors.primary-foreground/30%)]',
      },
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: {
        base: 'bg-secondary text-secondary-foreground [--rippleBg:theme(colors.secondary-foreground/30%)]',
      },
    },
    {
      variant: 'solid',
      color: 'success',
      class: {
        base: 'bg-success text-success-foreground [--rippleBg:theme(colors.success-foreground/30%)]',
      },
    },
    {
      variant: 'solid',
      color: 'info',
      class: {
        base: 'bg-info text-info-foreground [--rippleBg:theme(colors.info-foreground/30%)]',
      },
    },
    {
      variant: 'solid',
      color: 'warning',
      class: {
        base: 'bg-warning text-warning-foreground [--rippleBg:theme(colors.warning-foreground/30%)]',
      },
    },
    {
      variant: 'solid',
      color: 'danger',
      class: {
        base: 'bg-danger text-danger-foreground [--rippleBg:theme(colors.danger-foreground/40%)]',
      },
    },

    // color / shadow
    {
      variant: 'shadow',
      color: 'primary',
      class: {
        base: 'bg-primary text-primary-foreground [--rippleBg:theme(colors.primary-foreground/30%)] shadow-primary-400/80',
      },
    },
    {
      variant: 'shadow',
      color: 'secondary',
      class: {
        base: 'bg-secondary text-secondary-foreground [--rippleBg:theme(colors.secondary-foreground/30%)] shadow-secondary-400/80',
      },
    },
    {
      variant: 'shadow',
      color: 'success',
      class: {
        base: 'bg-success text-success-foreground [--rippleBg:theme(colors.success-foreground/30%)] shadow-success-400/80',
      },
    },
    {
      variant: 'shadow',
      color: 'info',
      class: {
        base: 'bg-info text-info-foreground [--rippleBg:theme(colors.info-foreground/30%)] shadow-info-400/80',
      },
    },
    {
      variant: 'shadow',
      color: 'warning',
      class: {
        base: 'bg-warning text-warning-foreground [--rippleBg:theme(colors.warning-foreground/30%)] shadow-warning-400/80',
      },
    },
    {
      variant: 'shadow',
      color: 'danger',
      class: {
        base: 'bg-danger text-danger-foreground [--rippleBg:theme(colors.danger-foreground/40%)] shadow-danger-400/80',
      },
    },

    // color / flat
    {
      variant: 'flat',
      color: 'primary',
      class: {
        base: 'bg-primary-100 text-primary-800 [--rippleBg:theme(colors.primary-800/20%)]',
      },
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: {
        base: 'bg-secondary-100 text-secondary-800 [--rippleBg:theme(colors.secondary-800/20%)]',
      },
    },
    {
      variant: 'flat',
      color: 'success',
      class: {
        base: 'bg-success-100 text-success-800 [--rippleBg:theme(colors.success-800/20%)]',
      },
    },
    {
      variant: 'flat',
      color: 'info',
      class: {
        base: 'bg-info-100 text-info-800 [--rippleBg:theme(colors.info-800/20%)]',
      },
    },
    {
      variant: 'flat',
      color: 'warning',
      class: {
        base: 'bg-warning-100 text-warning-800 [--rippleBg:theme(colors.warning-800/20%)]',
      },
    },
    {
      variant: 'flat',
      color: 'danger',
      class: {
        base: 'bg-danger-100 text-danger-800 [--rippleBg:theme(colors.danger-800/20%)]',
      },
    },

    // color / text
    {
      variant: 'text',
      color: 'primary',
      class: {
        base: 'data-[hovered=true]:bg-primary-100 text-primary-700 [--rippleBg:theme(colors.primary-700/20%)]',
      },
    },
    {
      variant: 'text',
      color: 'secondary',
      class: {
        base: 'data-[hovered=true]:bg-secondary-100 text-secondary-700 [--rippleBg:theme(colors.secondary-700/20%)]',
      },
    },
    {
      variant: 'text',
      color: 'success',
      class: {
        base: 'data-[hovered=true]:bg-success-100 text-success-700 [--rippleBg:theme(colors.success-700/20%)]',
      },
    },
    {
      variant: 'text',
      color: 'info',
      class: {
        base: 'data-[hovered=true]:bg-info-100 text-info-700 [--rippleBg:theme(colors.info-700/20%)]',
      },
    },
    {
      variant: 'text',
      color: 'warning',
      class: {
        base: 'data-[hovered=true]:bg-warning-100 text-warning-700 [--rippleBg:theme(colors.warning-700/20%)]',
      },
    },
    {
      variant: 'text',
      color: 'danger',
      class: {
        base: 'data-[hovered=true]:bg-danger-100 text-danger-700 [--rippleBg:theme(colors.danger-700/20%)]',
      },
    },

    // color / border
    {
      variant: 'border',
      color: 'primary',
      class: {
        base: 'border-primary-700 text-primary-800 [--rippleBg:theme(colors.primary-800/20%)]',
      },
    },
    {
      variant: 'border',
      color: 'secondary',
      class: {
        base: 'border-secondary-700 text-secondary-800 [--rippleBg:theme(colors.secondary-800/20%)]',
      },
    },
    {
      variant: 'border',
      color: 'success',
      class: {
        base: 'border-success-700 text-success-800 [--rippleBg:theme(colors.success-800/20%)]',
      },
    },
    {
      variant: 'border',
      color: 'info',
      class: {
        base: 'border-info-700 text-info-800 [--rippleBg:theme(colors.info-800/20%)]',
      },
    },
    {
      variant: 'border',
      color: 'warning',
      class: {
        base: 'border-warning-700 text-warning-800 [--rippleBg:theme(colors.warning-800/20%)]',
      },
    },
    {
      variant: 'border',
      color: 'danger',
      class: {
        base: 'border-danger-700 text-danger-800 [--rippleBg:theme(colors.danger-800/20%)]',
      },
    },
  ],
});

export type ChipVariantProps = VariantProps<typeof chip>;
export type ChipClassNames = ClassNames<typeof chip.slots>;

export { chip };
