import { VariantProps, tv } from 'tailwind-variants';
import { dataFocusVisible } from '../classes';
import { ClassNames } from '../types';

export const chip = tv({
  slots: {
    base: 'relative inline-flex items-center gap-1 px-2 rounded-full select-none max-w-full whitespace-nowrap ',
    content: 'truncate',
    deleteIcon: ['cursor-pointer outline-none transition', ...dataFocusVisible],
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
      neutral: { base: '' },
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
  compoundVariants: [
    // color / solid
    {
      variant: 'solid',
      color: 'neutral',
      class: {
        base: 'bg-neutral text-neutral-foreground ',
        deleteIcon: 'text-neutral-300 data-[hovered=true]:text-neutral-100',
      },
    },
    {
      variant: 'solid',
      color: 'primary',
      class: {
        base: 'bg-primary text-primary-foreground',
        deleteIcon: 'text-primary-200 data-[hovered=true]:text-primary-100',
      },
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: {
        base: 'bg-secondary text-secondary-foreground',
        deleteIcon: 'text-secondary-200 data-[hovered=true]:text-secondary-100',
      },
    },
    {
      variant: 'solid',
      color: 'success',
      class: {
        base: 'bg-success text-success-foreground',
        deleteIcon: 'text-success-200 data-[hovered=true]:text-success-100',
      },
    },
    {
      variant: 'solid',
      color: 'info',
      class: {
        base: 'bg-info text-info-foreground',
        deleteIcon: 'text-info-200 data-[hovered=true]:text-info-100',
      },
    },
    {
      variant: 'solid',
      color: 'warning',
      class: {
        base: 'bg-warning text-warning-foreground',
        deleteIcon: 'text-warning-200 data-[hovered=true]:text-warning-100',
      },
    },
    {
      variant: 'solid',
      color: 'danger',
      class: {
        base: 'bg-danger text-danger-foreground',
        deleteIcon: 'text-danger-200 data-[hovered=true]:text-danger-100',
      },
    },

    // color / shadow
    {
      variant: 'shadow',
      color: 'neutral',
      class: {
        base: 'bg-neutral text-neutral-foreground ',
        deleteIcon:
          'text-neutral-300 data-[hovered=true]:text-neutral-100 shadow-neutral-400/80',
      },
    },
    {
      variant: 'shadow',
      color: 'primary',
      class: {
        base: 'bg-primary text-primary-foreground',
        deleteIcon:
          'text-primary-200 data-[hovered=true]:text-primary-100 shadow-neutral-400/80',
      },
    },
    {
      variant: 'shadow',
      color: 'secondary',
      class: {
        base: 'bg-secondary text-secondary-foreground',
        deleteIcon:
          'text-secondary-200 data-[hovered=true]:text-secondary-100 shadow-neutral-400/80',
      },
    },
    {
      variant: 'shadow',
      color: 'success',
      class: {
        base: 'bg-success text-success-foreground',
        deleteIcon:
          'text-success-200 data-[hovered=true]:text-success-100 shadow-neutral-400/80',
      },
    },
    {
      variant: 'shadow',
      color: 'info',
      class: {
        base: 'bg-info text-info-foreground',
        deleteIcon:
          'text-info-200 data-[hovered=true]:text-info-100 shadow-neutral-400/80',
      },
    },
    {
      variant: 'shadow',
      color: 'warning',
      class: {
        base: 'bg-warning text-warning-foreground',
        deleteIcon:
          'text-warning-200 data-[hovered=true]:text-warning-100 shadow-neutral-400/80',
      },
    },
    {
      variant: 'shadow',
      color: 'danger',
      class: {
        base: 'bg-danger text-danger-foreground',
        deleteIcon:
          'text-danger-200 data-[hovered=true]:text-danger-100 shadow-neutral-400/80',
      },
    },

    // color / flat
    {
      variant: 'flat',
      color: 'neutral',
      class: {
        base: 'bg-neutral-200 text-neutral-700',
        deleteIcon: 'text-neutral-400 data-[hovered=true]:text-neutral',
      },
    },
    {
      variant: 'flat',
      color: 'primary',
      class: {
        base: 'bg-primary-200 text-primary-700',
        deleteIcon: 'text-primary-400 data-[hovered=true]:text-primary',
      },
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: {
        base: 'bg-secondary-200 text-secondary-700',
        deleteIcon: 'text-secondary-400 data-[hovered=true]:text-secondary',
      },
    },
    {
      variant: 'flat',
      color: 'success',
      class: {
        base: 'bg-success-200 text-success-700',
        deleteIcon: 'text-success-400 data-[hovered=true]:text-success',
      },
    },
    {
      variant: 'flat',
      color: 'info',
      class: {
        base: 'bg-info-200 text-info-700',
        deleteIcon: 'text-info-400 data-[hovered=true]:text-info',
      },
    },
    {
      variant: 'flat',
      color: 'warning',
      class: {
        base: 'bg-warning-200 text-warning-700',
        deleteIcon: 'text-warning-400 data-[hovered=true]:text-warning',
      },
    },
    {
      variant: 'flat',
      color: 'danger',
      class: {
        base: 'bg-danger-200 text-danger-700',
        deleteIcon: 'text-danger-400 data-[hovered=true]:text-danger',
      },
    },

    // color / text
    {
      variant: 'text',
      color: 'neutral',
      class: {
        base: 'text-neutral-700',
        deleteIcon: 'text-neutral-400 data-[hovered=true]:text-neutral',
      },
    },
    {
      variant: 'text',
      color: 'primary',
      class: {
        base: 'text-primary-700',
        deleteIcon: 'text-primary-400 data-[hovered=true]:text-primary',
      },
    },
    {
      variant: 'text',
      color: 'secondary',
      class: {
        base: 'text-secondary-700',
        deleteIcon: 'text-secondary-400 data-[hovered=true]:text-secondary',
      },
    },
    {
      variant: 'text',
      color: 'success',
      class: {
        base: 'text-success-700',
        deleteIcon: 'text-success-400 data-[hovered=true]:text-success',
      },
    },
    {
      variant: 'text',
      color: 'info',
      class: {
        base: 'text-info-700',
        deleteIcon: 'text-info-400 data-[hovered=true]:text-info',
      },
    },
    {
      variant: 'text',
      color: 'warning',
      class: {
        base: 'text-warning-700',
        deleteIcon: 'text-warning-400 data-[hovered=true]:text-warning',
      },
    },
    {
      variant: 'text',
      color: 'danger',
      class: {
        base: 'text-danger-700',
        deleteIcon: 'text-danger-400 data-[hovered=true]:text-danger',
      },
    },

    // color / border
    {
      variant: 'border',
      color: 'neutral',
      class: {
        base: 'border-neutral text-neutral-700',
        deleteIcon: 'text-neutral-400 data-[hovered=true]:text-neutral',
      },
    },
    {
      variant: 'border',
      color: 'primary',
      class: {
        base: 'border-primary text-primary-700',
        deleteIcon: 'text-primary-400 data-[hovered=true]:text-primary',
      },
    },
    {
      variant: 'border',
      color: 'secondary',
      class: {
        base: 'border-secondary text-secondary-700',
        deleteIcon: 'text-secondary-400 data-[hovered=true]:text-secondary',
      },
    },
    {
      variant: 'border',
      color: 'success',
      class: {
        base: 'border-success text-success-700',
        deleteIcon: 'text-success-400 data-[hovered=true]:text-success',
      },
    },
    {
      variant: 'border',
      color: 'info',
      class: {
        base: 'border-info text-info-700',
        deleteIcon: 'text-info-400 data-[hovered=true]:text-info',
      },
    },
    {
      variant: 'border',
      color: 'warning',
      class: {
        base: 'border-warning text-warning-700',
        deleteIcon: 'text-warning-400 data-[hovered=true]:text-warning',
      },
    },
    {
      variant: 'border',
      color: 'danger',
      class: {
        base: 'border-danger text-danger-700',
        deleteIcon: 'text-danger-400 data-[hovered=true]:text-danger',
      },
    },
  ],
});

export type ChipVariantProps = VariantProps<typeof chip>;
export type ChipClassNames = ClassNames<typeof chip.slots>;

export const chipStyles = [
  './node_modules/@gist-ui/theme/src/components/chip.ts',
  './node_modules/@gist-ui/theme/src/classes.ts',
];
