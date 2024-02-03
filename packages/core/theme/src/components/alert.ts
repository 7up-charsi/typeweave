import { tv, VariantProps } from 'tailwind-variants';

const alert = tv({
  base: 'inline-flex gap-4 p-4 rounded',
  variants: {
    variant: {
      solid: '',
      flat: '',
      shadow: 'shadow-lg',
      border: 'border bg-transparent',
      text: 'bg-transparent',
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
      class:
        'bg-success text-success-foreground [--rippleBg:theme(colors.success-foreground/30%)]',
    },
    {
      variant: 'solid',
      color: 'info',
      class:
        'bg-info text-info-foreground [--rippleBg:theme(colors.info-foreground/30%)]',
    },
    {
      variant: 'solid',
      color: 'warning',
      class:
        'bg-warning text-warning-foreground [--rippleBg:theme(colors.warning-foreground/30%)]',
    },
    {
      variant: 'solid',
      color: 'danger',
      class:
        'bg-danger text-danger-foreground [--rippleBg:theme(colors.danger-foreground/40%)]',
    },

    // color / shadow
    {
      variant: 'shadow',
      color: 'success',
      class:
        'bg-success text-success-foreground [--rippleBg:theme(colors.success-foreground/30%)] shadow-success-400/80',
    },
    {
      variant: 'shadow',
      color: 'info',
      class:
        'bg-info text-info-foreground [--rippleBg:theme(colors.info-foreground/30%)] shadow-info-400/80',
    },
    {
      variant: 'shadow',
      color: 'warning',
      class:
        'bg-warning text-warning-foreground [--rippleBg:theme(colors.warning-foreground/30%)] shadow-warning-400/80',
    },
    {
      variant: 'shadow',
      color: 'danger',
      class:
        'bg-danger text-danger-foreground [--rippleBg:theme(colors.danger-foreground/40%)] shadow-danger-400/80',
    },

    // color / flat
    {
      variant: 'flat',
      color: 'success',
      class:
        'bg-success-100 text-success-800 [--rippleBg:theme(colors.success-800/20%)]',
    },
    {
      variant: 'flat',
      color: 'info',
      class:
        'bg-info-100 text-info-800 [--rippleBg:theme(colors.info-800/20%)]',
    },
    {
      variant: 'flat',
      color: 'warning',
      class:
        'bg-warning-100 text-warning-800 [--rippleBg:theme(colors.warning-800/20%)]',
    },
    {
      variant: 'flat',
      color: 'danger',
      class:
        'bg-danger-100 text-danger-800 [--rippleBg:theme(colors.danger-800/20%)]',
    },

    // color / text
    {
      variant: 'text',
      color: 'success',
      class:
        'data-[hovered=true]:bg-success-100 text-success-700 [--rippleBg:theme(colors.success-700/20%)]',
    },
    {
      variant: 'text',
      color: 'info',
      class:
        'data-[hovered=true]:bg-info-100 text-info-700 [--rippleBg:theme(colors.info-700/20%)]',
    },
    {
      variant: 'text',
      color: 'warning',
      class:
        'data-[hovered=true]:bg-warning-100 text-warning-700 [--rippleBg:theme(colors.warning-700/20%)]',
    },
    {
      variant: 'text',
      color: 'danger',
      class:
        'data-[hovered=true]:bg-danger-100 text-danger-700 [--rippleBg:theme(colors.danger-700/20%)]',
    },

    // color / border
    {
      variant: 'border',
      color: 'success',
      class:
        'border-success-700 text-success-800 [--rippleBg:theme(colors.success-800/20%)]',
    },
    {
      variant: 'border',
      color: 'info',
      class:
        'border-info-700 text-info-800 [--rippleBg:theme(colors.info-800/20%)]',
    },
    {
      variant: 'border',
      color: 'warning',
      class:
        'border-warning-700 text-warning-800 [--rippleBg:theme(colors.warning-800/20%)]',
    },
    {
      variant: 'border',
      color: 'danger',
      class:
        'border-danger-700 text-danger-800 [--rippleBg:theme(colors.danger-800/20%)]',
    },
  ],
});

export type AlertVariantProps = VariantProps<typeof alert>;

export { alert };
