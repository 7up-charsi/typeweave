import { VariantProps, tv } from 'tailwind-variants';

export const chipStyles = tv({
  slots: {
    base: 'relative inline-flex items-center gap-2 px-2 rounded select-none whitespace-nowrap max-w-full outline-none focus-visible:ring-2 focus-visible:ring-focus',
    content: 'truncate',
    avatar: '',
    icon: 'dynamic-icon',
    deleteIcon: 'cursor-pointer transition-colors dynamic-icon',
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
      sm: { base: 'text-xs h-6', deleteIcon: 'text-sm' },
      md: { base: 'text-sm h-7', deleteIcon: 'text-base' },
      lg: { base: 'text-base h-8', deleteIcon: 'text-lg' },
    },
    pressable: {
      true: { base: 'cursor-pointer' },
      false: { base: 'cursor-auto' },
    },
  },
  compoundVariants: [
    // color / solid
    {
      variant: 'solid',
      color: 'default',
      class: {
        base: 'bg-muted-9 text-white',
        deleteIcon: 'text-white/70 hover:text-white',
      },
    },
    {
      variant: 'solid',
      color: 'primary',
      class: {
        base: 'bg-primary-9 text-white',
        deleteIcon: 'text-white/70 hover:text-white',
      },
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: {
        base: 'bg-secondary-9 text-white',
        deleteIcon: 'text-white/70 hover:text-white',
      },
    },
    {
      variant: 'solid',
      color: 'success',
      class: {
        base: 'bg-success-9 text-white',
        deleteIcon: 'text-white/70 hover:text-white',
      },
    },
    {
      variant: 'solid',
      color: 'info',
      class: {
        base: 'bg-info-9 text-white',
        deleteIcon: 'text-white/70 hover:text-white',
      },
    },
    {
      variant: 'solid',
      color: 'warning',
      class: {
        base: 'bg-warning-9 text-white',
        deleteIcon: 'text-white/70 hover:text-white',
      },
    },
    {
      variant: 'solid',
      color: 'danger',
      class: {
        base: 'bg-danger-9 text-white',
        deleteIcon: 'text-white/70 hover:text-white',
      },
    },

    // color / flat
    {
      variant: 'flat',
      color: 'default',
      class: {
        base: 'bg-muted-3 text-muted-11',
        deleteIcon: 'text-muted-11/70 hover:text-muted-11',
      },
    },
    {
      variant: 'flat',
      color: 'primary',
      class: {
        base: 'bg-primary-3 text-primary-11',
        deleteIcon: 'text-primary-11/70 hover:text-primary-11',
      },
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: {
        base: 'bg-secondary-3 text-secondary-11',
        deleteIcon: 'text-secondary-11/70 hover:text-secondary-11',
      },
    },
    {
      variant: 'flat',
      color: 'success',
      class: {
        base: 'bg-success-3 text-success-11',
        deleteIcon: 'text-success-11/70 hover:text-success-11',
      },
    },
    {
      variant: 'flat',
      color: 'info',
      class: {
        base: 'bg-info-3 text-info-11',
        deleteIcon: 'text-info-11/70 hover:text-info-11',
      },
    },
    {
      variant: 'flat',
      color: 'warning',
      class: {
        base: 'bg-warning-3 text-warning-11',
        deleteIcon: 'text-warning-11/70 hover:text-warning-11',
      },
    },
    {
      variant: 'flat',
      color: 'danger',
      class: {
        base: 'bg-danger-3 text-danger-11',
        deleteIcon: 'text-danger-11/70 hover:text-danger-11',
      },
    },

    // color / text
    {
      variant: 'text',
      color: 'default',
      class: {
        base: 'text-muted-11',
        deleteIcon: 'text-muted-11/70 hover:text-muted-11',
      },
    },
    {
      variant: 'text',
      color: 'primary',
      class: {
        base: 'text-primary-11',
        deleteIcon: 'text-primary-11/70 hover:text-primary-11',
      },
    },
    {
      variant: 'text',
      color: 'secondary',
      class: {
        base: 'text-secondary-11',
        deleteIcon: 'text-secondary-11/70 hover:text-secondary-11 ',
      },
    },
    {
      variant: 'text',
      color: 'success',
      class: {
        base: 'text-success-11',
        deleteIcon: 'text-success-11/70 hover:text-success-11',
      },
    },
    {
      variant: 'text',
      color: 'info',
      class: {
        base: 'text-info-11',
        deleteIcon: 'text-info-11/70 hover:text-info-11',
      },
    },
    {
      variant: 'text',
      color: 'warning',
      class: {
        base: 'text-warning-11',
        deleteIcon: 'text-warning-11/70 hover:text-warning-11',
      },
    },
    {
      variant: 'text',
      color: 'danger',
      class: {
        base: 'text-danger-11',
        deleteIcon: 'text-danger-11/70 hover:text-danger-11',
      },
    },

    // color / border
    {
      variant: 'border',
      color: 'default',
      class: {
        base: 'border-muted-7 text-muted-11',
        deleteIcon: 'text-muted-11/70 hover:text-muted-11',
      },
    },
    {
      variant: 'border',
      color: 'primary',
      class: {
        base: 'border-primary-7 text-primary-11',
        deleteIcon: 'text-primary-11/70 hover:text-primary-11',
      },
    },
    {
      variant: 'border',
      color: 'secondary',
      class: {
        base: 'border-secondary-7 text-secondary-11',
        deleteIcon: 'text-secondary-11/70 hover:text-secondary-11',
      },
    },
    {
      variant: 'border',
      color: 'success',
      class: {
        base: 'border-success-7 text-success-11',
        deleteIcon: 'text-success-11/70 hover:text-success-11',
      },
    },
    {
      variant: 'border',
      color: 'info',
      class: {
        base: 'border-info-7 text-info-11',
        deleteIcon: 'text-info-11/70 hover:text-info-11',
      },
    },
    {
      variant: 'border',
      color: 'warning',
      class: {
        base: 'border-warning-7 text-warning-11',
        deleteIcon: 'text-warning-11/70 hover:text-warning-11',
      },
    },
    {
      variant: 'border',
      color: 'danger',
      class: {
        base: 'border-danger-7 text-danger-11',
        deleteIcon: 'text-danger-11/70 hover:text-danger-11',
      },
    },
  ],
});

export type ChipVariantProps = VariantProps<typeof chipStyles>;
