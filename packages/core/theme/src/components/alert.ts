import { tv, VariantProps } from 'tailwind-variants';

export const alert = tv({
  base: 'inline-flex gap-4 p-4 rounded',
  variants: {
    variant: {
      solid: '',
      flat: '',
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
      class: 'bg-success-500 text-white',
    },
    {
      variant: 'solid',
      color: 'info',
      class: 'bg-info-500 text-white',
    },
    {
      variant: 'solid',
      color: 'warning',
      class: 'bg-warning-500 text-white',
    },
    {
      variant: 'solid',
      color: 'danger',
      class: 'bg-danger-500 text-white',
    },

    // color / flat
    {
      variant: 'flat',
      color: 'success',
      class:
        'bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-200',
    },
    {
      variant: 'flat',
      color: 'info',
      class: 'bg-info-100 text-info-700 dark:bg-info-900 dark:text-info-200',
    },
    {
      variant: 'flat',
      color: 'warning',
      class:
        'bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-200',
    },
    {
      variant: 'flat',
      color: 'danger',
      class:
        'bg-danger-100 text-danger-700 dark:bg-danger-900 dark:text-danger-200',
    },

    // color / text
    {
      variant: 'text',
      color: 'success',
      class: 'text-success-700 dark:text-success-200',
    },
    {
      variant: 'text',
      color: 'info',
      class: 'text-info-700 dark:text-info-200',
    },
    {
      variant: 'text',
      color: 'warning',
      class: 'text-warning-700 dark:text-warning-200',
    },
    {
      variant: 'text',
      color: 'danger',
      class: 'text-danger-700 dark:text-danger-200',
    },

    // color / border
    {
      variant: 'border',
      color: 'success',
      class:
        'border-success-300 text-success-700 dark:border-success-800 dark:text-success-200',
    },
    {
      variant: 'border',
      color: 'info',
      class:
        'border-info-300 text-info-700 dark:border-info-800 dark:text-info-200',
    },
    {
      variant: 'border',
      color: 'warning',
      class:
        'border-warning-300 text-warning-700 dark:border-warning-800 dark:text-warning-200',
    },
    {
      variant: 'border',
      color: 'danger',
      class:
        'border-danger-300 text-danger-700 dark:border-danger-800 dark:text-danger-200',
    },
  ],
});

export type AlertVariantProps = VariantProps<typeof alert>;

export const alertStyles = [
  './node_modules/@gist-ui/theme/src/components/alert.ts',
];
