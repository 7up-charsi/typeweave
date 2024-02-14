import { VariantProps, tv } from 'tailwind-variants';
import { dataFocusVisible } from '../classes';
import { ClassNames } from '../types';

export const chip = tv({
  slots: {
    base: 'relative inline-flex items-center gap-2 px-2 rounded-full select-none whitespace-nowrap',
    content: 'truncate',
    deleteIcon: [
      'cursor-pointer outline-none transition-colors',
      ...dataFocusVisible,
    ],
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
      sm: { base: 'text-xs h-6' },
      md: { base: 'text-sm h-7' },
      lg: { base: 'h-8' },
    },
  },
  compoundVariants: [
    // color / solid
    {
      variant: 'solid',
      color: 'default',
      class: {
        base: 'bg-muted-500 text-white',
        deleteIcon: 'text-white/70 data-[hovered=true]:text-white',
      },
    },
    {
      variant: 'solid',
      color: 'primary',
      class: {
        base: 'bg-primary-500 text-white',
        deleteIcon: 'text-white/70 data-[hovered=true]:text-white',
      },
    },
    {
      variant: 'solid',
      color: 'secondary',
      class: {
        base: 'bg-secondary-500 text-white',
        deleteIcon: 'text-white/70 data-[hovered=true]:text-white',
      },
    },
    {
      variant: 'solid',
      color: 'success',
      class: {
        base: 'bg-success-500 text-white',
        deleteIcon: 'text-white/70 data-[hovered=true]:text-white',
      },
    },
    {
      variant: 'solid',
      color: 'info',
      class: {
        base: 'bg-info-500 text-white',
        deleteIcon: 'text-white/70 data-[hovered=true]:text-white',
      },
    },
    {
      variant: 'solid',
      color: 'warning',
      class: {
        base: 'bg-warning-500 text-black',
        deleteIcon: 'text-black/70 data-[hovered=true]:text-black',
      },
    },
    {
      variant: 'solid',
      color: 'danger',
      class: {
        base: 'bg-danger-500 text-white',
        deleteIcon: 'text-white/70 data-[hovered=true]:text-white',
      },
    },

    // color / flat
    {
      variant: 'flat',
      color: 'default',
      class: {
        base: 'bg-muted-100 text-muted-700 dark:bg-muted-800 dark:text-muted-200',
        deleteIcon:
          'text-muted-500 data-[hovered=true]:text-muted-700 dark:text-muted-400 dark:data-[hovered=true]:text-muted-300',
      },
    },
    {
      variant: 'flat',
      color: 'primary',
      class: {
        base: 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200',
        deleteIcon:
          'text-primary-500 data-[hovered=true]:text-primary-700 dark:text-primary-400 dark:data-[hovered=true]:text-primary-300',
      },
    },
    {
      variant: 'flat',
      color: 'secondary',
      class: {
        base: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-200',
        deleteIcon:
          'text-secondary-500 data-[hovered=true]:text-secondary-700 dark:text-secondary-400 dark:data-[hovered=true]:text-secondary-300',
      },
    },
    {
      variant: 'flat',
      color: 'success',
      class: {
        base: 'bg-success-100 text-success-700 dark:bg-success-800 dark:text-success-200',
        deleteIcon:
          'text-success-500 data-[hovered=true]:text-success-700 dark:text-success-400 dark:data-[hovered=true]:text-success-300',
      },
    },
    {
      variant: 'flat',
      color: 'info',
      class: {
        base: 'bg-info-100 text-info-700 dark:bg-info-800 dark:text-info-200',
        deleteIcon:
          'text-info-500 data-[hovered=true]:text-info-700 dark:text-info-400 dark:data-[hovered=true]:text-info-300',
      },
    },
    {
      variant: 'flat',
      color: 'warning',
      class: {
        base: 'bg-warning-100 text-warning-700 dark:bg-warning-800 dark:text-warning-200',
        deleteIcon:
          'text-warning-500 data-[hovered=true]:text-warning-700 dark:text-warning-400 dark:data-[hovered=true]:text-warning-300',
      },
    },
    {
      variant: 'flat',
      color: 'danger',
      class: {
        base: 'bg-danger-100 text-danger-700 dark:bg-danger-800 dark:text-danger-200',
        deleteIcon:
          'text-danger-500 data-[hovered=true]:text-danger-700 dark:text-danger-400 dark:data-[hovered=true]:text-danger-300',
      },
    },

    // color / text
    {
      variant: 'text',
      color: 'default',
      class: {
        base: 'text-muted-700 dark:text-muted-300',
        deleteIcon:
          'text-muted-500 data-[hovered=true]:text-muted-700 dark:text-muted-400 dark:data-[hovered=true]:text-muted-300',
      },
    },
    {
      variant: 'text',
      color: 'primary',
      class: {
        base: 'text-primary-700 dark:text-primary-300',
        deleteIcon:
          'text-primary-500 data-[hovered=true]:text-primary-700 dark:text-primary-400 dark:data-[hovered=true]:text-primary-300',
      },
    },
    {
      variant: 'text',
      color: 'secondary',
      class: {
        base: 'text-secondary-700 dark:text-secondary-300',
        deleteIcon:
          'text-secondary-500 data-[hovered=true]:text-secondary-700 dark:text-secondary-400 dark:data-[hovered=true]:text-secondary-300',
      },
    },
    {
      variant: 'text',
      color: 'success',
      class: {
        base: 'text-success-700 dark:text-success-300',
        deleteIcon:
          'text-success-500 data-[hovered=true]:text-success-700 dark:text-success-400 dark:data-[hovered=true]:text-success-300',
      },
    },
    {
      variant: 'text',
      color: 'info',
      class: {
        base: 'text-info-700 dark:text-info-300',
        deleteIcon:
          'text-info-500 data-[hovered=true]:text-info-700 dark:text-info-400 dark:data-[hovered=true]:text-info-300',
      },
    },
    {
      variant: 'text',
      color: 'warning',
      class: {
        base: 'text-warning-700 dark:text-warning-300',
        deleteIcon:
          'text-warning-500 data-[hovered=true]:text-warning-700 dark:text-warning-400 dark:data-[hovered=true]:text-warning-300',
      },
    },
    {
      variant: 'text',
      color: 'danger',
      class: {
        base: 'text-danger-700 dark:text-danger-300',
        deleteIcon:
          'text-danger-500 data-[hovered=true]:text-danger-700 dark:text-danger-400 dark:data-[hovered=true]:text-danger-300',
      },
    },

    // color / border
    {
      variant: 'border',
      color: 'default',
      class: {
        base: 'border-muted-400 text-muted-700 dark:border-muted-700 dark:text-muted-300',
        deleteIcon:
          'text-muted-500 data-[hovered=true]:text-muted-700 dark:text-muted-400 dark:data-[hovered=true]:text-muted-300',
      },
    },
    {
      variant: 'border',
      color: 'primary',
      class: {
        base: 'border-primary-400 text-primary-700 dark:border-primary-700 dark:text-primary-300',
        deleteIcon:
          'text-primary-500 data-[hovered=true]:text-primary-700 dark:text-primary-400 dark:data-[hovered=true]:text-primary-300',
      },
    },
    {
      variant: 'border',
      color: 'secondary',
      class: {
        base: 'border-secondary-400 text-secondary-700 dark:border-secondary-700 dark:text-secondary-300',
        deleteIcon:
          'text-secondary-500 data-[hovered=true]:text-secondary-700 dark:text-secondary-400 dark:data-[hovered=true]:text-secondary-300',
      },
    },
    {
      variant: 'border',
      color: 'success',
      class: {
        base: 'border-success-400 text-success-700 dark:border-success-700 dark:text-success-300',
        deleteIcon:
          'text-success-500 data-[hovered=true]:text-success-700 dark:text-success-400 dark:data-[hovered=true]:text-success-300',
      },
    },
    {
      variant: 'border',
      color: 'info',
      class: {
        base: 'border-info-400 text-info-700 dark:border-info-700 dark:text-info-300',
        deleteIcon:
          'text-info-500 data-[hovered=true]:text-info-700 dark:text-info-400 dark:data-[hovered=true]:text-info-300',
      },
    },
    {
      variant: 'border',
      color: 'warning',
      class: {
        base: 'border-warning-400 text-warning-700 dark:border-warning-700 dark:text-warning-300',
        deleteIcon:
          'text-warning-500 data-[hovered=true]:text-warning-700 dark:text-warning-400 dark:data-[hovered=true]:text-warning-300',
      },
    },
    {
      variant: 'border',
      color: 'danger',
      class: {
        base: 'border-danger-400 text-danger-700 dark:border-danger-700 dark:text-danger-300',
        deleteIcon:
          'text-danger-500 data-[hovered=true]:text-danger-700 dark:text-danger-400 dark:data-[hovered=true]:text-danger-300',
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
