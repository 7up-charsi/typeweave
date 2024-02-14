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
      class: 'bg-success9 text-success1',
    },
    {
      variant: 'solid',
      color: 'info',
      class: 'bg-info9 text-info1',
    },
    {
      variant: 'solid',
      color: 'warning',
      class: 'bg-warning9 text-warning12',
    },
    {
      variant: 'solid',
      color: 'danger',
      class: 'bg-danger9 text-danger1',
    },

    // color / flat
    {
      variant: 'flat',
      color: 'success',
      class: 'bg-success3 text-success11',
    },
    {
      variant: 'flat',
      color: 'info',
      class: 'bg-info3 text-info11',
    },
    {
      variant: 'flat',
      color: 'warning',
      class: 'bg-warning3 text-warning11',
    },
    {
      variant: 'flat',
      color: 'danger',
      class: 'bg-danger3 text-danger11',
    },

    // color / text
    {
      variant: 'text',
      color: 'success',
      class: 'text-success11',
    },
    {
      variant: 'text',
      color: 'info',
      class: 'text-info11',
    },
    {
      variant: 'text',
      color: 'warning',
      class: 'text-warning11',
    },
    {
      variant: 'text',
      color: 'danger',
      class: 'text-danger11',
    },

    // color / border
    {
      variant: 'border',
      color: 'success',
      class: 'border-success6 text-success11',
    },
    {
      variant: 'border',
      color: 'info',
      class: 'border-info6 text-info11',
    },
    {
      variant: 'border',
      color: 'warning',
      class: 'border-warning6 text-warning11',
    },
    {
      variant: 'border',
      color: 'danger',
      class: 'border-danger6 text-danger11',
    },
  ],
});

export type AlertVariantProps = VariantProps<typeof alert>;

export const alertStyles = [
  './node_modules/@gist-ui/theme/src/components/alert.ts',
];
